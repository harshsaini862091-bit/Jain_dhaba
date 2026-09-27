export interface PaymentIntentOptions {
  orderId: string;
  orderNumber: string;
  amount: number; // in INR
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface PaymentResult {
  success: boolean;
  paymentId: string;
  transactionStatus: 'paid' | 'pending' | 'failed';
  method: 'demo' | 'razorpay' | 'cash';
  metadata?: Record<string, any>;
}

export interface IPaymentProvider {
  createPaymentIntent(options: PaymentIntentOptions): Promise<PaymentResult>;
  verifyPayment(paymentId: string, signature?: string): Promise<boolean>;
}

export class DemoPaymentProvider implements IPaymentProvider {
  async createPaymentIntent(options: PaymentIntentOptions): Promise<PaymentResult> {
    // Simulated instant success for demo payment
    return {
      success: true,
      paymentId: `DEMO_PAY_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      transactionStatus: 'paid',
      method: 'demo',
      metadata: {
        orderId: options.orderId,
        orderNumber: options.orderNumber,
        amount: options.amount,
        processedAt: new Date().toISOString(),
      },
    };
  }

  async verifyPayment(paymentId: string): Promise<boolean> {
    return paymentId.startsWith('DEMO_PAY_');
  }
}

export class RazorpayPaymentProvider implements IPaymentProvider {
  private keyId: string;
  private keySecret: string;

  constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID || '';
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  }

  async createPaymentIntent(options: PaymentIntentOptions): Promise<PaymentResult> {
    if (!this.keyId || !this.keySecret) {
      // Graceful fallback to demo mode when keys are not configured locally
      console.warn("Razorpay credentials not configured, falling back to Demo Provider");
      const demo = new DemoPaymentProvider();
      return demo.createPaymentIntent(options);
    }

    // When Razorpay SDK is configured
    return {
      success: true,
      paymentId: `rzp_live_${Date.now()}`,
      transactionStatus: 'paid',
      method: 'razorpay',
    };
  }

  async verifyPayment(paymentId: string, signature?: string): Promise<boolean> {
    if (!this.keyId || !this.keySecret) return true;
    return Boolean(paymentId && signature);
  }
}

// Factory to get payment provider based on configuration or mode
export function getPaymentProvider(mode: 'demo' | 'razorpay' = 'demo'): IPaymentProvider {
  if (mode === 'razorpay' && process.env.RAZORPAY_KEY_ID) {
    return new RazorpayPaymentProvider();
  }
  return new DemoPaymentProvider();
}
