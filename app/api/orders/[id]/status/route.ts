import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/lib/services/orderService";
import { OrderStatus } from "@/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const validStatuses: OrderStatus[] = [
      'Placed',
      'Confirmed',
      'Preparing',
      'Ready',
      'Out for Delivery',
      'Delivered',
      'Cancelled',
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "INVALID_STATUS", message: "Invalid order status value" },
        },
        { status: 400 }
      );
    }

    const updated = await OrderService.updateOrderStatus(params.id, status);
    if (!updated) {
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
      data: updated,
      message: "Order status updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "STATUS_UPDATE_FAILED", message: error.message },
      },
      { status: 500 }
    );
  }
}
