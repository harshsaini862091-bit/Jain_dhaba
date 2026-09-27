import { NextRequest, NextResponse } from "next/server";
import { MenuService } from "@/lib/services/menuService";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const items = await MenuService.getMenuItems({ category: params.slug });
    return NextResponse.json({
      success: true,
      data: items,
      message: `Menu items for category ${params.slug} retrieved`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "CATEGORY_FETCH_FAILED", message: error.message },
      },
      { status: 500 }
    );
  }
}
