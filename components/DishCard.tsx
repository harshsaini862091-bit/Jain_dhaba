"use client";

import { useState } from "react";
import Image from "next/image";
import { IMenuItem } from "@/types";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Plus, Check, Info, Flame, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DishCardProps {
  item: IMenuItem;
}

export function DishCard({ item }: DishCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      dietary: item.dietary,
      category: item.category,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <>
      <div className="group relative bg-charcoal-700/60 rounded-xl overflow-hidden border border-gold-500/15 hover:border-gold-500/50 transition-all duration-300 hover:shadow-card hover:-translate-y-1 flex flex-col justify-between">
        {/* Top Image Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-charcoal-800">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/30" />

          {/* Featured & Veg/Non-Veg Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-sm border flex items-center justify-center p-0.5 bg-charcoal-900/90 ${
                item.dietary === "veg" ? "border-indiangreen-400" : "border-terracotta-500"
              }`}
              title={item.dietary === "veg" ? "Pure Vegetarian" : "Non-Vegetarian"}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  item.dietary === "veg" ? "bg-indiangreen-400" : "bg-terracotta-500"
                }`}
              />
            </span>

            {item.isFeatured && (
              <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-gold-gradient text-charcoal-900 shadow-sm">
                Chef's Pride
              </span>
            )}
          </div>

          {/* Quick info trigger */}
          <button
            onClick={() => setShowDetails(true)}
            aria-label={`Details for ${item.name}`}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-charcoal-900/80 text-ivory-muted hover:text-gold-400 hover:bg-charcoal-900 transition-colors backdrop-blur-sm"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Spice and Time Badges */}
          <div className="absolute bottom-2.5 left-3 flex items-center gap-3 text-xs text-ivory-200">
            {item.prepTimeMinutes && (
              <span className="flex items-center gap-1 bg-charcoal-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm text-[11px]">
                <Clock className="w-3 h-3 text-gold-400" />
                <span>{item.prepTimeMinutes}m</span>
              </span>
            )}
            {item.spicyLevel && item.spicyLevel > 1 && (
              <span className="flex items-center gap-1 bg-charcoal-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm text-[11px] text-terracotta-400">
                <Flame className="w-3 h-3 fill-terracotta-400" />
                <span>{item.spicyLevel === 3 ? "Fiery" : "Spiced"}</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <h3 className="font-serif text-lg font-bold text-ivory-100 group-hover:text-gold-400 transition-colors">
                {item.name}
              </h3>
              <span className="font-serif font-bold text-gold-400 text-lg whitespace-nowrap">
                {formatINR(item.price)}
              </span>
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed line-clamp-2 mb-4">
              {item.description}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-charcoal-600/50 flex items-center justify-between">
            <button
              onClick={() => setShowDetails(true)}
              className="text-xs text-gold-500 hover:text-gold-400 underline-offset-4 hover:underline font-medium"
            >
              Ingredients & Notes
            </button>

            <button
              onClick={handleAdd}
              disabled={!item.isAvailable}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                !item.isAvailable
                  ? "bg-charcoal-600 text-ivory-muted cursor-not-allowed"
                  : isAdded
                  ? "bg-indiangreen-500 text-ivory-50"
                  : "bg-gold-gradient text-charcoal-900 hover:brightness-110 shadow-sm"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dish Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-charcoal-800 border border-gold-500/30 rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 via-transparent to-black/50" />
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-charcoal-900/80 text-ivory-100 hover:text-gold-400"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                    {item.category.replace("-", " ")}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-ivory-100">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-gold-400">
                    {formatINR(item.price)}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold ${
                      item.dietary === "veg"
                        ? "bg-indiangreen-500/20 text-indiangreen-400 border border-indiangreen-500/30"
                        : "bg-terracotta-500/20 text-terracotta-400 border border-terracotta-500/30"
                    }`}
                  >
                    {item.dietary === "veg" ? "Pure Vegetarian" : "Non-Vegetarian"}
                  </span>
                </div>

                <p className="text-sm text-ivory-muted leading-relaxed">
                  {item.description}
                </p>

                {item.ingredients && item.ingredients.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gold-500 font-semibold mb-2">
                      Key Spices & Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-xs bg-charcoal-900 text-ivory-200 border border-charcoal-600"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.allergens && item.allergens.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gold-500 font-semibold mb-1">
                      Allergen Information
                    </h4>
                    <p className="text-xs text-ivory-muted">
                      Contains: {item.allergens.join(", ")}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-charcoal-700 flex gap-3">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex-1 py-2.5 rounded-sm border border-charcoal-600 text-xs uppercase tracking-wider text-ivory-muted hover:text-ivory-100 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleAdd();
                      setShowDetails(false);
                    }}
                    className="flex-1 py-2.5 rounded-sm bg-gold-gradient text-charcoal-900 text-xs uppercase tracking-wider font-bold shadow-gold hover:brightness-110 transition-all"
                  >
                    Add to Feast
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
