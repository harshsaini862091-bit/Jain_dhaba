"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, ShoppingBag, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    orderType,
    setOrderType,
    clearCart,
    getSubtotal,
    getEstimatedTax,
    getEstimatedDeliveryFee,
    getEstimatedTotal,
  } = useCartStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    city: "New Delhi",
    pincode: "110001",
    deliveryInstructions: "",
    paymentMethod: "demo",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const subtotal = getSubtotal();
  const tax = getEstimatedTax();
  const deliveryFee = getEstimatedDeliveryFee();
  const estimatedTotal = getEstimatedTotal();

  if (items.length === 0 && !loading) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-charcoal-900 flex items-center justify-center">
        <div className="text-center p-8 bg-charcoal-800 rounded-2xl border border-charcoal-700 max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 text-gold-500/40 mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold text-ivory-100 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-xs text-ivory-muted mb-6">
            Please select delicacies from our menu before proceeding to checkout.
          </p>
          <Link
            href="/menu"
            className="inline-block px-6 py-2.5 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-wider text-xs shadow-gold"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg("Please complete your name, phone number, and email.");
      return;
    }

    if (orderType === "delivery" && !formData.address.trim()) {
      setErrorMsg("Please provide your delivery address.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        orderType,
        items: items.map((i) => ({ itemId: i.id, quantity: i.quantity })),
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: orderType === "delivery" ? formData.address : undefined,
          landmark: orderType === "delivery" ? formData.landmark : undefined,
          city: orderType === "delivery" ? formData.city : undefined,
          pincode: orderType === "delivery" ? formData.pincode : undefined,
          deliveryInstructions: formData.deliveryInstructions || undefined,
        },
        paymentMethod: formData.paymentMethod,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to process your order. Please try again.");
      }

      // Order created successfully!
      const order = data.data;
      clearCart();
      router.push(`/order-success?orderNumber=${order.orderNumber}`);
    } catch (err: any) {
      console.error("Order placement error:", err);
      setErrorMsg(err.message || "An unexpected error occurred while placing order.");
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-charcoal-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/menu"
          className="inline-flex items-center space-x-1.5 text-xs text-gold-400 hover:text-gold-300 uppercase tracking-wider font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-100 mb-8">
          Checkout & Feast Confirmation
        </h1>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-terracotta-500/20 border border-terracotta-500/50 flex items-center space-x-3 text-sm text-terracotta-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Customer & Delivery Form (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery / Pickup Choice */}
              <div className="bg-charcoal-800 p-6 rounded-xl border border-gold-500/20">
                <h2 className="font-serif text-lg font-bold text-ivory-100 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gold-400" />
                  <span>1. Fulfillment Mode</span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`py-3 px-4 rounded-lg border text-left transition-all ${
                      orderType === "delivery"
                        ? "bg-gold-500/15 border-gold-400 text-gold-400"
                        : "border-charcoal-700 text-ivory-muted hover:border-charcoal-600"
                    }`}
                  >
                    <p className="font-serif font-bold text-sm text-ivory-100">Home Delivery</p>
                    <p className="text-[11px] text-ivory-muted mt-0.5">Delivered piping hot</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("pickup")}
                    className={`py-3 px-4 rounded-lg border text-left transition-all ${
                      orderType === "pickup"
                        ? "bg-gold-500/15 border-gold-400 text-gold-400"
                        : "border-charcoal-700 text-ivory-muted hover:border-charcoal-600"
                    }`}
                  >
                    <p className="font-serif font-bold text-sm text-ivory-100">Self Pickup</p>
                    <p className="text-[11px] text-ivory-muted mt-0.5">Collect at restaurant</p>
                  </button>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="bg-charcoal-800 p-6 rounded-xl border border-gold-500/20 space-y-4">
                <h2 className="font-serif text-lg font-bold text-ivory-100 mb-2">
                  2. Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ivory-muted mb-1 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-xs sm:text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ivory-muted mb-1 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-xs sm:text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-muted mb-1 uppercase tracking-wider">
                    Email Address (for Receipt) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@example.com"
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-xs sm:text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Delivery Address (if Delivery) */}
              {orderType === "delivery" && (
                <div className="bg-charcoal-800 p-6 rounded-xl border border-gold-500/20 space-y-4">
                  <h2 className="font-serif text-lg font-bold text-ivory-100 mb-2">
                    3. Delivery Address
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold text-ivory-muted mb-1 uppercase tracking-wider">
                      Street Address & Flat / House No *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. Flat 402, Royal Palms, Barakhamba Road"
                      className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-xs sm:text-sm text-ivory-100 focus:outline-none focus:border-gold-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ivory-muted mb-1 uppercase tracking-wider">
                        Landmark
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="Near Metro Gate 3"
                        className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-xs sm:text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ivory-muted mb-1 uppercase tracking-wider">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-xs sm:text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ivory-muted mb-1 uppercase tracking-wider">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-xs sm:text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ivory-muted mb-1 uppercase tracking-wider">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      name="deliveryInstructions"
                      value={formData.deliveryInstructions}
                      onChange={handleChange}
                      placeholder="e.g. Ring doorbell, leave at door, don't blow horn"
                      className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-xs sm:text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="bg-charcoal-800 p-6 rounded-xl border border-gold-500/20">
                <h2 className="font-serif text-lg font-bold text-ivory-100 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold-400" />
                  <span>{orderType === "delivery" ? "4. Payment Mode" : "3. Payment Mode"}</span>
                </h2>

                <div className="space-y-2">
                  <label className="flex items-center p-3 rounded-lg border border-gold-500/30 bg-charcoal-900 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="demo"
                      checked={formData.paymentMethod === "demo"}
                      onChange={handleChange}
                      className="text-gold-500 focus:ring-gold-500"
                    />
                    <div className="ml-3">
                      <span className="text-xs sm:text-sm font-semibold text-ivory-100 block">
                        Instant Demo Payment (Zero Credentials Required)
                      </span>
                      <span className="text-[11px] text-ivory-muted block">
                        Simulates instant verified payment for seamless testing.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center p-3 rounded-lg border border-charcoal-700 bg-charcoal-900/60 cursor-pointer hover:border-charcoal-600">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleChange}
                      className="text-gold-500 focus:ring-gold-500"
                    />
                    <div className="ml-3">
                      <span className="text-xs sm:text-sm font-semibold text-ivory-100 block">
                        Pay on Delivery / Counter (Cash / UPI)
                      </span>
                      <span className="text-[11px] text-ivory-muted block">
                        Pay via cash or UPI QR on food arrival.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar (Right 5 Cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-charcoal-800 p-6 rounded-xl border border-gold-500/20 shadow-card space-y-5">
                <h2 className="font-serif text-xl font-bold text-ivory-100 pb-3 border-b border-charcoal-700">
                  Order Summary
                </h2>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded bg-charcoal-900 text-gold-400 font-semibold flex items-center justify-center text-[10px]">
                          {item.quantity}x
                        </span>
                        <span className="text-ivory-100 font-medium truncate max-w-[180px]">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-gold-400 font-medium">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-charcoal-700 space-y-2 text-xs text-ivory-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-ivory-100 font-medium">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="text-ivory-100 font-medium">{formatINR(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-ivory-100 font-medium">
                      {orderType === "pickup" ? "Free" : deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-charcoal-700 flex justify-between text-base font-bold text-ivory-100 font-serif">
                    <span>Grand Total</span>
                    <span className="text-gold-400 text-lg">{formatINR(estimatedTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-wider text-xs shadow-gold hover:brightness-110 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying & Placing Order...</span>
                    </>
                  ) : (
                    <span>Confirm & Place Order ({formatINR(estimatedTotal)})</span>
                  )}
                </button>

                <p className="text-[11px] text-center text-ivory-muted/70">
                  🔒 Safe & secure checkout. Order verified server-side.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
