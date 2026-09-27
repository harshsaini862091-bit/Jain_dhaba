"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/lib/utils";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setOpen,
    removeItem,
    updateQuantity,
    clearCart,
    orderType,
    setOrderType,
    getSubtotal,
    getEstimatedTax,
    getEstimatedDeliveryFee,
    getEstimatedTotal,
  } = useCartStore();

  const subtotal = getSubtotal();
  const tax = getEstimatedTax();
  const deliveryFee = getEstimatedDeliveryFee();
  const grandTotal = getEstimatedTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-charcoal-900 border-l border-gold-500/20 z-50 flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-charcoal-700/80 flex items-center justify-between bg-charcoal-800/80">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-gold-400" />
                <h2 className="font-serif text-xl font-bold tracking-wide text-ivory-100">
                  Your Dhaba Dawaat
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-ivory-muted hover:text-ivory-100 hover:bg-charcoal-700 rounded-full transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery / Pickup Toggle */}
            <div className="p-4 bg-charcoal-800/40 border-b border-charcoal-700/60">
              <div className="grid grid-cols-2 p-1 bg-charcoal-900 rounded-lg border border-gold-500/20">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                    orderType === "delivery"
                      ? "bg-gold-gradient text-charcoal-900 shadow-sm"
                      : "text-ivory-muted hover:text-ivory-100"
                  }`}
                >
                  Home Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("pickup")}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                    orderType === "pickup"
                      ? "bg-gold-gradient text-charcoal-900 shadow-sm"
                      : "text-ivory-muted hover:text-ivory-100"
                  }`}
                >
                  Self Pickup
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-ivory-muted">
                  <ShoppingBag className="w-16 h-16 text-charcoal-600 mb-4 stroke-[1]" />
                  <p className="font-serif text-lg text-ivory-100 mb-1">Your cart is empty</p>
                  <p className="text-xs text-ivory-muted max-w-xs mb-6">
                    Add handcrafted Punjabi kebabs, biryanis and breads to begin your culinary journey.
                  </p>
                  <Link
                    href="/menu"
                    onClick={() => setOpen(false)}
                    className="px-6 py-2.5 bg-gold-500/20 border border-gold-500/50 text-gold-400 text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-gold-500 hover:text-charcoal-900 transition-all"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3 bg-charcoal-800/80 rounded-lg border border-charcoal-700 flex gap-3 items-center"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 bg-charcoal-700">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5 mb-0.5">
                        <span
                          className={`w-2 h-2 rounded-full inline-block ${
                            item.dietary === "veg" ? "bg-indiangreen-400" : "bg-terracotta-500"
                          }`}
                        />
                        <h4 className="font-serif text-sm font-semibold text-ivory-100 truncate">
                          {item.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gold-400 font-medium">
                        {formatINR(item.price)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-charcoal-600 rounded bg-charcoal-900">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-gold-400 text-ivory-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-ivory-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-gold-400 text-ivory-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-ivory-muted hover:text-terracotta-400 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer with Calculations */}
            {items.length > 0 && (
              <div className="p-5 border-t border-charcoal-700 bg-charcoal-800/95 space-y-3">
                <div className="space-y-1.5 text-xs text-ivory-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-ivory-100 font-medium">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="text-ivory-100 font-medium">{formatINR(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Delivery Fee {orderType === "delivery" && subtotal >= 500 && "(Free above ₹500)"}
                    </span>
                    <span className="text-ivory-100 font-medium">
                      {orderType === "pickup" ? "Free (Pickup)" : deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-charcoal-700 flex justify-between text-sm font-semibold text-ivory-100">
                    <span>Estimated Total</span>
                    <span className="text-gold-400 text-base font-serif">{formatINR(grandTotal)}</span>
                  </div>
                  <p className="text-[10px] text-ivory-muted/70 italic text-right">
                    * Final totals securely recalculated on server
                  </p>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={clearCart}
                    className="px-3 py-3 border border-charcoal-600 hover:border-charcoal-500 rounded-sm text-xs text-ivory-muted hover:text-ivory-100 transition-colors"
                    title="Clear Cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="flex-1 py-3 bg-gold-gradient text-charcoal-900 font-bold text-xs uppercase tracking-wider rounded-sm shadow-gold hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
