import { NextRequest, NextResponse } from "next/server";
import { MenuService } from "@/lib/services/menuService";
import { MenuItemSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const dietary = (searchParams.get("dietary") as 'veg' | 'non-veg') || undefined;
    const search = searchParams.get("search") || undefined;
    const isFeatured = searchParams.get("featured") ? searchParams.get("featured") === "true" : undefined;

    const [items, categories] = await Promise.all([
      MenuService.getMenuItems({ category, dietary, search, isFeatured }),
      MenuService.getCategories(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        items,
        categories,
        total: items.length,
      },
      message: "Menu retrieved successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "MENU_FETCH_ERROR",
          message: error.message || "Failed to fetch menu items",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MenuItemSchema.parse(body);

    const created = await MenuService.createMenuItem(validated);
    return NextResponse.json(
      {
        success: true,
        data: created,
        message: "Menu item created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "MENU_CREATE_ERROR",
          message: error.errors ? error.errors[0].message : error.message,
        },
      },
      { status: 400 }
    );
  }
}
