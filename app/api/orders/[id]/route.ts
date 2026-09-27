import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/lib/services/orderService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await OrderService.getOrderByIdOrNumber(params.id);
    if (!order) {
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
      data: order,
      message: "Order fetched successfully",
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
