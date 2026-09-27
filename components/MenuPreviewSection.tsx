"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Utensils } from "lucide-react";
import { motion } from "framer-motion";

const previewCategories = [
  {
    name: "Starters",
    slug: "starters",
    count: "5 Dishes",
    desc: "Crispy tikkas, dahi kebabs & samosas",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Soups & Salads",
    slug: "soups-and-salads",
    count: "3 Dishes",
    desc: "Aromatic shorbas & fresh kachumber",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Tandoor",
    slug: "tandoor",
    count: "4 Dishes",
    desc: "Smoked over glowing charcoal embers",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Main Course",
    slug: "main-course",
    count: "7 Dishes",
    desc: "Dal Makhani, butter chicken & rich paneer",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Biryani",
    slug: "biryani",
    count: "3 Dishes",
    desc: "Long-grain dum cooked with fragrant saffron",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Indian Breads",
    slug: "indian-breads",
    count: "4 Dishes",
    desc: "Tandoori butter naan, laccha paratha & roti",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Desserts",
    slug: "desserts",
    count: "3 Dishes",
    desc: "Gulab jamun, rasmalai & gajar halwa",
    image: "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Beverages",
    slug: "beverages",
    count: "3 Dishes",
    desc: "Kulhad sweet lassi, masala chai & fresh lime",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
  },
];

export function MenuPreviewSection() {
  return (
    <section className="py-24 sm:py-32 bg-charcoal-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-500 text-xs uppercase tracking-widest font-semibold mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>Grand Dhaba Selection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-100 mb-4">
            Explore By Course
          </h2>
          <p className="text-sm text-ivory-muted font-sans">
            Every category represents a cornerstone of North Indian gastronomy, crafted faithfully with pristine ingredients.
          </p>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewCategories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <Link
                href={`/menu?category=${cat.slug}`}
                className="group block relative h-64 rounded-xl overflow-hidden border border-gold-500/20 hover:border-gold-500 transition-all duration-300 shadow-md hover:shadow-card hover:-translate-y-1"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-transparent" />

                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                    {cat.count}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-ivory-100 group-hover:text-gold-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-ivory-muted/90 line-clamp-1 mt-1 font-sans">
                    {cat.desc}
                  </p>
                  <div className="mt-3 flex items-center text-xs text-gold-400 font-semibold space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore Dishes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-widest text-xs shadow-gold hover:brightness-110 transition-all duration-300"
          >
            <span>View Complete Feast Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
