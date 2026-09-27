import { z } from "zod";

export const ReservationSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"),
  guests: z.number().int().min(1, "At least 1 guest is required").max(20, "For groups larger than 20, please contact us directly"),
  seatingArea: z.enum(["Indoor", "Outdoor", "Private Dining"]),
  customer: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
    email: z.string().trim().email("Invalid email address"),
    specialRequest: z.string().trim().max(500).optional(),
  }),
});

export const OrderItemSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const OrderSchema = z.object({
  orderType: z.enum(["delivery", "pickup"]),
  items: z.array(OrderItemSchema).min(1, "Order must contain at least one item"),
  customer: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
    email: z.string().trim().email("Invalid email address"),
    address: z.string().trim().optional(),
    landmark: z.string().trim().optional(),
    city: z.string().trim().optional(),
    pincode: z.string().trim().optional(),
    deliveryInstructions: z.string().trim().optional(),
  }).refine((data) => {
    // If delivery is chosen, address, city and pincode are required
    return true; // We do deeper check in service or conditional check
  }),
  paymentMethod: z.enum(["demo", "razorpay", "cash"]).default("demo"),
});

export const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export const MenuItemSchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().trim().min(5),
  price: z.number().positive("Price must be greater than 0"),
  category: z.string().min(1),
  dietary: z.enum(["veg", "non-veg"]),
  spicyLevel: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
  prepTimeMinutes: z.number().int().positive().optional(),
  ingredients: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  image: z.string().url("Valid image URL required"),
});
