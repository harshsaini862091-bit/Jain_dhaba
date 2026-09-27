import { connectToDatabase } from "@/lib/db/mongodb";
import { Order, MenuItem } from "@/models";
import { generateOrderId } from "@/lib/utils";
import { getPaymentProvider } from "./payment";
import { getEmailProvider } from "./email";
import { IOrder, OrderStatus, OrderType } from "@/types";

export interface CreateOrderInput {
  orderType: OrderType;
  items: Array<{
    itemId: string;
    quantity: number;
  }>;
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
  paymentMethod?: 'demo' | 'razorpay' | 'cash';
}

export class OrderService {
  /**
   * Recalculates order subtotal, tax (5% GST), delivery fee, and total purely server-side
   */
  static async createOrder(input: CreateOrderInput) {
    await connectToDatabase();

    if (!input.items || input.items.length === 0) {
      throw new Error("Cannot place an order with zero items");
    }

    // Server-side lookup of item prices & availability
    const itemIds = input.items.map((i) => i.itemId);
    const dbItems = await MenuItem.find({ _id: { $in: itemIds } });

    if (dbItems.length === 0) {
      throw new Error("None of the specified items were found");
    }

    const dbItemMap = new Map(dbItems.map((item) => [item._id.toString(), item]));

    let subtotal = 0;
    const verifiedOrderItems = [];

    for (const requestedItem of input.items) {
      const dbItem = dbItemMap.get(requestedItem.itemId);
      if (!dbItem) {
        throw new Error(`Item ${requestedItem.itemId} is no longer available`);
      }
      if (!dbItem.isAvailable) {
        throw new Error(`"${dbItem.name}" is currently sold out`);
      }
      const qty = Math.max(1, Math.floor(requestedItem.quantity));
      const lineTotal = dbItem.price * qty;
      subtotal += lineTotal;

      verifiedOrderItems.push({
        itemId: dbItem._id.toString(),
        name: dbItem.name,
        price: dbItem.price,
        quantity: qty,
        total: lineTotal,
      });
    }

    // Calculate 5% GST for restaurant food
    const tax = Math.round(subtotal * 0.05);

    // Delivery fee: ₹50 for delivery under ₹500, free for ₹500+, 0 for pickup
    let deliveryFee = 0;
    if (input.orderType === 'delivery') {
      deliveryFee = subtotal >= 500 ? 0 : 50;
    }

    const discount = 0;
    const total = subtotal + tax + deliveryFee - discount;

    const orderNumber = generateOrderId();

    // Process payment through provider abstraction
    const paymentMethod = input.paymentMethod || 'demo';
    const paymentProvider = getPaymentProvider(paymentMethod === 'razorpay' ? 'razorpay' : 'demo');
    const paymentResult = await paymentProvider.createPaymentIntent({
      orderId: orderNumber,
      orderNumber,
      amount: total,
      customer: {
        name: input.customer.name,
        email: input.customer.email,
        phone: input.customer.phone,
      },
    });

    const newOrder = await Order.create({
      orderNumber,
      customer: input.customer,
      orderType: input.orderType,
      items: verifiedOrderItems,
      subtotal,
      tax,
      deliveryFee,
      discount,
      total,
      status: 'Placed',
      paymentMethod,
      paymentStatus: paymentResult.success ? 'paid' : 'pending',
    });

    // Send confirmation email
    const emailProvider = getEmailProvider();
    await emailProvider.sendEmail({
      to: input.customer.email,
      subject: `Your Jain Dhaba Order Confirmation [${orderNumber}]`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #161411;">
          <h2>Dhanyavaad, ${input.customer.name}!</h2>
          <p>Your order <strong>${orderNumber}</strong> has been received and is being prepared with desi swaad.</p>
          <p><strong>Total:</strong> ₹${total}</p>
          <p><strong>Type:</strong> ${input.orderType.toUpperCase()}</p>
        </div>
      `,
    });

    return newOrder;
  }

  static async getOrderByIdOrNumber(identifier: string) {
    await connectToDatabase();
    const query = identifier.startsWith("JD-")
      ? { orderNumber: identifier }
      : { _id: identifier };
    return Order.findOne(query);
  }

  static async updateOrderStatus(id: string, status: OrderStatus) {
    await connectToDatabase();
    return Order.findByIdAndUpdate(id, { status }, { new: true });
  }

  static async cancelOrder(id: string) {
    await connectToDatabase();
    return Order.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
  }
}
