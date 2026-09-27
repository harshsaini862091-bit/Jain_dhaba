export type DietaryType = 'veg' | 'non-veg';

export interface IMenuCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  itemCount?: number;
}

export interface IMenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string; // Category slug or ID
  categoryName?: string;
  dietary: DietaryType;
  spicyLevel?: 1 | 2 | 3;
  prepTimeMinutes?: number;
  ingredients?: string[];
  allergens?: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  image: string;
}

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  dietary: DietaryType;
  quantity: number;
  category?: string;
}

export type OrderStatus =
  | 'Placed'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type OrderType = 'delivery' | 'pickup';

export interface IOrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface IOrderCustomer {
  name: string;
  phone: string;
  email: string;
  address?: string;
  landmark?: string;
  city?: string;
  pincode?: string;
  deliveryInstructions?: string;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  customer: IOrderCustomer;
  orderType: OrderType;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'demo' | 'razorpay' | 'cash';
  paymentStatus: 'paid' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export type SeatingArea = 'Indoor' | 'Outdoor' | 'Private Dining';
export type ReservationStatus = 'Confirmed' | 'Completed' | 'Cancelled';

export interface IReservation {
  _id: string;
  reservationNumber: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  seatingArea: SeatingArea;
  customer: {
    name: string;
    phone: string;
    email: string;
    specialRequest?: string;
  };
  status: ReservationStatus;
  createdAt: string;
}

export interface ITable {
  _id: string;
  tableNumber: string;
  capacity: number;
  seatingArea: SeatingArea;
  isActive: boolean;
}

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
