import { NextRequest, NextResponse } from "next/server";
import { MenuService } from "@/lib/services/menuService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await MenuService.getMenuItemById(params.id);
    if (!item) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "Menu item not found" },
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: item,
      message: "Menu item fetched successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "ITEM_FETCH_FAILED", message: error.message },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await MenuService.updateMenuItem(params.id, body);
    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "Menu item not found" },
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: updated,
      message: "Menu item updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "ITEM_UPDATE_FAILED", message: error.message },
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
    const deleted = await MenuService.deleteMenuItem(params.id);
    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "Menu item not found" },
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: deleted,
      message: "Menu item deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "ITEM_DELETE_FAILED", message: error.message },
      },
      { status: 500 }
    );
  }
}
