"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

const timelineStages = [
  "Placed",
  "Confirmed",
  "Preparing",
  "Ready",
  "Out for Delivery",
  "Delivered",
];

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      fetch(`/api/orders/${orderNumber}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setOrder(data.data);
          }
        })
        .catch((err) => console.error("Could not fetch order:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderNumber]);

  return (
    <div className="pt-32 pb-24 bg-charcoal-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-charcoal-800 rounded-2xl border border-gold-500/30 p-6 sm:p-10 text-center shadow-card relative overflow-hidden mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-gold-400" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-gold-500 font-semibold block mb-1">
            Order Confirmed & Received
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-100 mb-2">
            Dhanyavaad, {order?.customer?.name || "Esteemed Guest"}!
          </h1>
          <p className="text-xs sm:text-sm text-ivory-muted max-w-lg mx-auto">
            Your feast is now in the hands of our chefs. Hand-ground spices are blooming and our tandoor is roaring.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-charcoal-900 border border-gold-500/40">
            <span className="text-xs text-ivory-muted">Order Identifier:</span>
            <span className="font-mono text-sm sm:text-base font-bold text-gold-400">
              {orderNumber || "JD-20260927-4821"}
            </span>
          </div>
        </motion.div>

        <div className="bg-charcoal-800 rounded-2xl border border-charcoal-700 p-6 sm:p-8 mb-8">
          <h2 className="font-serif text-lg font-bold text-ivory-100 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold-400" />
            <span>Preparation & Delivery Progress</span>
          </h2>

          <div className="relative">
            <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-charcoal-700 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
              {timelineStages.map((stage, idx) => {
                const currentStatus = order?.status || "Placed";
                const currentIndex = timelineStages.indexOf(currentStatus);
                const isPassed = idx <= (currentIndex === -1 ? 0 : currentIndex);
                const isCurrent = idx === (currentIndex === -1 ? 0 : currentIndex);

                return (
                  <div key={stage} className="flex flex-col items-center text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all mb-2 ${
                        isCurrent
                          ? "bg-gold-500 text-charcoal-900 ring-4 ring-gold-500/20 shadow-gold"
                          : isPassed
                          ? "bg-indiangreen-500 text-ivory-50"
                          : "bg-charcoal-900 text-ivory-muted border border-charcoal-600"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`text-[11px] font-semibold leading-tight ${
                        isCurrent
                          ? "text-gold-400"
                          : isPassed
                          ? "text-ivory-100"
                          : "text-ivory-muted/60"
                      }`}
                    >
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {order && (
          <div className="bg-charcoal-800 rounded-2xl border border-charcoal-700 p-6 sm:p-8 mb-8 space-y-6">
            <h2 className="font-serif text-lg font-bold text-ivory-100 border-b border-charcoal-700 pb-3">
              Order Receipt
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ivory-muted">
              <div>
                <p className="font-semibold text-ivory-100 mb-1">Customer Information</p>
                <p>{order.customer.name}</p>
                <p>{order.customer.phone}</p>
                <p>{order.customer.email}</p>
              </div>
              <div>
                <p className="font-semibold text-ivory-100 mb-1">Fulfillment Details</p>
                <p className="capitalize">Type: {order.orderType}</p>
                {order.orderType === "delivery" && order.customer.address && (
                  <p>Address: {order.customer.address}, {order.customer.city}</p>
                )}
                <p>Payment: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</p>
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-700 space-y-3">
              <p className="text-xs font-semibold text-ivory-100 uppercase tracking-wider">
                Dishes Ordered
              </p>
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded bg-charcoal-900 text-gold-400 font-bold flex items-center justify-center text-[10px]">
                      {item.quantity}x
                    </span>
                    <span className="text-ivory-100 font-medium">{item.name}</span>
                  </div>
                  <span className="text-gold-400 font-medium">{formatINR(item.total)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-charcoal-700 space-y-1.5 text-xs text-ivory-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-ivory-100 font-medium">{formatINR(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="text-ivory-100 font-medium">{formatINR(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-ivory-100 font-medium">
                  {order.deliveryFee === 0 ? "FREE" : formatINR(order.deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-charcoal-700 flex justify-between text-base font-bold text-ivory-100 font-serif">
                <span>Total Amount Paid</span>
                <span className="text-gold-400 text-lg">{formatINR(order.total)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-6 py-3 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-wider text-xs shadow-gold hover:brightness-110 text-center"
          >
            Order More Delicacies
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-sm border border-charcoal-600 text-ivory-muted hover:text-ivory-100 text-xs uppercase tracking-wider text-center"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 bg-charcoal-900 min-h-screen text-center text-ivory-muted">
          Loading Order Confirmation...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
