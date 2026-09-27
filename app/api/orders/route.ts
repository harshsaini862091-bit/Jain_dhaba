import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/lib/services/orderService";
import { OrderSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = OrderSchema.parse(body);

    const order = await OrderService.createOrder(validated as any);

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: "Order placed successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    const isZod = Boolean(error.errors);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: isZod ? "VALIDATION_FAILED" : "ORDER_CREATION_FAILED",
          message: isZod ? error.errors[0].message : error.message,
        },
      },
      { status: 400 }
    );
  }
}
