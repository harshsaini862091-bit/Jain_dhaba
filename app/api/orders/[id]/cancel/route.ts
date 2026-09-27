import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/lib/services/orderService";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cancelled = await OrderService.cancelOrder(params.id);
    if (!cancelled) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "Order not found" },
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: cancelled,
      message: "Order cancelled successfully",
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
