import mongoose, { Schema, Document, Model } from "mongoose";
import { DietaryType, OrderStatus, OrderType, SeatingArea, ReservationStatus } from "@/types";

// 1. User Model
export interface IUserDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin' | 'staff';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    role: { type: String, enum: ['customer', 'admin', 'staff'], default: 'customer' },
  },
  { timestamps: true }
);

// 2. MenuCategory Model
export interface IMenuCategoryDocument extends Document {
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuCategorySchema = new Schema<IMenuCategoryDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true, lowercase: true, index: true },
    description: { type: String, trim: true },
    displayOrder: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// 3. MenuItem Model
export interface IMenuItemDocument extends Document {
  name: string;
  description: string;
  price: number;
  category: string; // slug
  dietary: DietaryType;
  spicyLevel?: number;
  prepTimeMinutes?: number;
  ingredients?: string[];
  allergens?: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItemDocument>(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, lowercase: true, index: true },
    dietary: { type: String, enum: ['veg', 'non-veg'], required: true, index: true },
    spicyLevel: { type: Number, min: 1, max: 3, default: 1 },
    prepTimeMinutes: { type: Number, default: 20 },
    ingredients: [{ type: String, trim: true }],
    allergens: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false, index: true },
    isAvailable: { type: Boolean, default: true, index: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Text search index for menu items
MenuItemSchema.index({ name: 'text', description: 'text' });

// 4. Table Model
export interface ITableDocument extends Document {
  tableNumber: string;
  capacity: number;
  seatingArea: SeatingArea;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TableSchema = new Schema<ITableDocument>(
  {
    tableNumber: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true, min: 1 },
    seatingArea: { type: String, enum: ['Indoor', 'Outdoor', 'Private Dining'], required: true, index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// 5. Reservation Model
export interface IReservationDocument extends Document {
  reservationNumber: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: SeatingArea;
  customer: {
    name: string;
    phone: string;
    email: string;
    specialRequest?: string;
  };
  tableId?: mongoose.Types.ObjectId;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservationDocument>(
  {
    reservationNumber: { type: String, required: true, unique: true, index: true },
    date: { type: String, required: true, index: true },
    time: { type: String, required: true, index: true },
    guests: { type: Number, required: true, min: 1 },
    seatingArea: { type: String, enum: ['Indoor', 'Outdoor', 'Private Dining'], required: true },
    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      specialRequest: { type: String, trim: true },
    },
    tableId: { type: Schema.Types.ObjectId, ref: 'Table' },
    status: {
      type: String,
      enum: ['Confirmed', 'Completed', 'Cancelled'],
      default: 'Confirmed',
      index: true,
    },
  },
  { timestamps: true }
);

// Compound index to quickly find reservations by date & seating area
ReservationSchema.index({ date: 1, time: 1, seatingArea: 1 });

// 6. Order Model
export interface IOrderDocument extends Document {
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address?: string;
    landmark?: string;
    city?: string;
    pincode?: string;
    deliveryInstructions?: string;
  };
  orderType: OrderType;
  items: Array<{
    itemId: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'demo' | 'razorpay' | 'cash';
  paymentStatus: 'paid' | 'pending' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      address: { type: String, trim: true },
      landmark: { type: String, trim: true },
      city: { type: String, trim: true },
      pincode: { type: String, trim: true },
      deliveryInstructions: { type: String, trim: true },
    },
    orderType: { type: String, enum: ['delivery', 'pickup'], required: true },
    items: [
      {
        itemId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        total: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Placed', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Placed',
      index: true,
    },
    paymentMethod: { type: String, enum: ['demo', 'razorpay', 'cash'], default: 'demo' },
    paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'], default: 'paid' },
  },
  { timestamps: true }
);

// 7. ContactMessage Model
export interface IContactMessageDocument extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessageDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export const MenuCategory: Model<IMenuCategoryDocument> =
  mongoose.models.MenuCategory || mongoose.model<IMenuCategoryDocument>("MenuCategory", MenuCategorySchema);

export const MenuItem: Model<IMenuItemDocument> =
  mongoose.models.MenuItem || mongoose.model<IMenuItemDocument>("MenuItem", MenuItemSchema);

export const Table: Model<ITableDocument> =
  mongoose.models.Table || mongoose.model<ITableDocument>("Table", TableSchema);

export const Reservation: Model<IReservationDocument> =
  mongoose.models.Reservation || mongoose.model<IReservationDocument>("Reservation", ReservationSchema);

export const Order: Model<IOrderDocument> =
  mongoose.models.Order || mongoose.model<IOrderDocument>("Order", OrderSchema);

export const ContactMessage: Model<IContactMessageDocument> =
  mongoose.models.ContactMessage || mongoose.model<IContactMessageDocument>("ContactMessage", ContactMessageSchema);
