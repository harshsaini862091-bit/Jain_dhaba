import { connectToDatabase } from "@/lib/db/mongodb";
import { MenuItem, MenuCategory } from "@/models";

export interface MenuFilterOptions {
  category?: string;
  dietary?: 'veg' | 'non-veg';
  search?: string;
  isFeatured?: boolean;
}

export class MenuService {
  static async getCategories() {
    await connectToDatabase();
    return MenuCategory.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
  }

  static async getMenuItems(filters: MenuFilterOptions = {}) {
    await connectToDatabase();
    const query: any = { isAvailable: true };

    if (filters.category && filters.category !== 'all') {
      query.category = filters.category.toLowerCase();
    }

    if (filters.dietary) {
      query.dietary = filters.dietary;
    }

    if (filters.isFeatured !== undefined) {
      query.isFeatured = filters.isFeatured;
    }

    if (filters.search && filters.search.trim()) {
      const term = filters.search.trim();
      query.$or = [
        { name: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { ingredients: { $in: [new RegExp(term, 'i')] } },
      ];
    }

    return MenuItem.find(query).sort({ isFeatured: -1, name: 1 }).lean();
  }

  static async getMenuItemById(id: string) {
    await connectToDatabase();
    return MenuItem.findById(id).lean();
  }

  static async createMenuItem(data: any) {
    await connectToDatabase();
    return MenuItem.create(data);
  }

  static async updateMenuItem(id: string, data: any) {
    await connectToDatabase();
    return MenuItem.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteMenuItem(id: string) {
    await connectToDatabase();
    return MenuItem.findByIdAndDelete(id);
  }
}
