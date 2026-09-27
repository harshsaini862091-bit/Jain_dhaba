"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DishCard } from "./DishCard";
import { IMenuItem } from "@/types";
import { ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";

interface SignatureDishesSectionProps {
  initialDishes?: IMenuItem[];
}

export function SignatureDishesSection({ initialDishes = [] }: SignatureDishesSectionProps) {
  const [dishes, setDishes] = useState<IMenuItem[]>(initialDishes);
  const [loading, setLoading] = useState(initialDishes.length === 0);

  useEffect(() => {
    if (dishes.length === 0) {
      fetch("/api/menu?featured=true")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data?.items) {
            setDishes(data.data.items.slice(0, 6));
          }
        })
        .catch((err) => console.error("Error fetching signature dishes:", err))
        .finally(() => setLoading(false));
    }
  }, [dishes.length]);

  return (
    <section className="py-24 bg-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-500 text-xs uppercase tracking-widest font-semibold mb-2">
              <Flame className="w-4 h-4 text-terracotta-500" />
              <span>Signature Creations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-100">
              Dishes That Define Us
            </h2>
            <p className="text-sm text-ivory-muted max-w-xl mt-2 font-sans">
              Hand-picked delicacies that celebrate decades of culinary heritage, slow simmering, and authentic Indian soul.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 border-b border-gold-500/40 pb-1 group shrink-0"
          >
            <span>View All 30+ Delicacies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dishes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 rounded-xl bg-charcoal-800 animate-pulse border border-charcoal-700"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {dishes.map((dish) => (
              <DishCard key={dish._id} item={dish} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
