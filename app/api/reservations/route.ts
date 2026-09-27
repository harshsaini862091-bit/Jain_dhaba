import { NextRequest, NextResponse } from "next/server";
import { ReservationService } from "@/lib/services/reservationService";
import { ReservationSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ReservationSchema.parse(body);

    const reservation = await ReservationService.createReservation(validated);

    return NextResponse.json(
      {
        success: true,
        data: reservation,
        message: "Reservation confirmed successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    const isZod = Boolean(error.errors);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: isZod ? "VALIDATION_FAILED" : "RESERVATION_FAILED",
          message: isZod ? error.errors[0].message : error.message,
        },
      },
      { status: 400 }
    );
  }
}
