import { NextRequest, NextResponse } from "next/server";
import { ReservationService } from "@/lib/services/reservationService";
import { SeatingArea } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const guests = parseInt(searchParams.get("guests") || "2", 10);
    const seatingArea = (searchParams.get("seatingArea") as SeatingArea) || "Indoor";

    if (!date || !time) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_QUERY_PARAMS",
            message: "Date and time are required to check table availability.",
          },
        },
        { status: 400 }
      );
    }

    const availability = await ReservationService.checkAvailability(
      date,
      time,
      seatingArea,
      guests
    );

    return NextResponse.json({
      success: true,
      data: availability,
      message: availability.available
        ? "Table is available for reservation"
        : "Selected slot is currently fully booked",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "AVAILABILITY_CHECK_FAILED", message: error.message },
      },
      { status: 500 }
    );
  }
}
