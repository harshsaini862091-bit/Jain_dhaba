import { NextRequest, NextResponse } from "next/server";
import { ReservationService } from "@/lib/services/reservationService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reservation = await ReservationService.getReservationByIdOrNumber(params.id);
    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "Reservation not found" },
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: reservation,
      message: "Reservation fetched successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "FETCH_FAILED", message: error.message },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cancelled = await ReservationService.cancelReservation(params.id);
    if (!cancelled) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "Reservation not found" },
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: cancelled,
      message: "Reservation cancelled successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "CANCEL_FAILED", message: error.message },
      },
      { status: 500 }
    );
  }
}
