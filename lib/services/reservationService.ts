import { connectToDatabase } from "@/lib/db/mongodb";
import { Reservation, Table } from "@/models";
import { generateReservationId } from "@/lib/utils";
import { getEmailProvider } from "./email";
import { SeatingArea } from "@/types";

export interface CreateReservationInput {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  seatingArea: SeatingArea;
  customer: {
    name: string;
    phone: string;
    email: string;
    specialRequest?: string;
  };
}

export class ReservationService {
  /**
   * Check availability for a requested date, time slot, and guest count
   */
  static async checkAvailability(date: string, time: string, seatingArea: SeatingArea, guests: number) {
    await connectToDatabase();

    // Find all active tables in this seating area with enough capacity
    const availableTables = await Table.find({
      seatingArea,
      capacity: { $gte: guests },
      isActive: true,
    });

    if (availableTables.length === 0) {
      return {
        available: false,
        reason: `No tables accommodating ${guests} guests in ${seatingArea} section.`,
      };
    }

    // Check reservations on this date and time slot (exact or +/- 1 hour overlap window)
    const existingReservations = await Reservation.find({
      date,
      time,
      seatingArea,
      status: { $ne: 'Cancelled' },
    });

    const bookedTableIds = new Set(
      existingReservations
        .map((r) => r.tableId?.toString())
        .filter(Boolean)
    );

    // Filter tables that aren't booked
    const freeTables = availableTables.filter(
      (table) => !bookedTableIds.has(table._id.toString())
    );

    return {
      available: freeTables.length > 0,
      availableCount: freeTables.length,
      candidateTable: freeTables[0] || null,
    };
  }

  static async createReservation(input: CreateReservationInput) {
    await connectToDatabase();

    const availability = await this.checkAvailability(
      input.date,
      input.time,
      input.seatingArea,
      input.guests
    );

    if (!availability.available) {
      throw new Error(
        availability.reason || "Selected slot is fully booked for this seating area. Please pick an alternative time."
      );
    }

    const reservationNumber = generateReservationId();

    const reservation = await Reservation.create({
      reservationNumber,
      date: input.date,
      time: input.time,
      guests: input.guests,
      seatingArea: input.seatingArea,
      customer: input.customer,
      tableId: availability.candidateTable?._id,
      status: 'Confirmed',
    });

    const emailProvider = getEmailProvider();
    await emailProvider.sendEmail({
      to: input.customer.email,
      subject: `Table Confirmed at Jain Dhaba [${reservationNumber}]`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #161411;">
          <h2>Table Reserved, ${input.customer.name}!</h2>
          <p>We look forward to welcoming you to Jain Dhaba.</p>
          <p><strong>Reservation No:</strong> ${reservationNumber}</p>
          <p><strong>Date & Time:</strong> ${input.date} at ${input.time}</p>
          <p><strong>Guests:</strong> ${input.guests} (${input.seatingArea})</p>
        </div>
      `,
    });

    return reservation;
  }

  static async getReservationByIdOrNumber(identifier: string) {
    await connectToDatabase();
    const query = identifier.startsWith("RES-")
      ? { reservationNumber: identifier }
      : { _id: identifier };
    return Reservation.findOne(query).populate('tableId');
  }

  static async cancelReservation(id: string) {
    await connectToDatabase();
    return Reservation.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
  }
}
