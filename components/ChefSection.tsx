"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export function ChefSection() {
  return (
    <section className="py-24 sm:py-32 bg-charcoal-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Chef Portrait (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[440px] sm:h-[500px] w-full rounded-2xl overflow-hidden border border-gold-500/25 shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Ustad Harpreet Singh - Master Chef"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-5 right-4 sm:-right-4 bg-charcoal-800 border border-gold-500/40 p-4 rounded-xl shadow-xl max-w-xs backdrop-blur-md">
              <p className="font-serif text-lg font-bold text-gold-400">30+ Years</p>
              <p className="text-xs text-ivory-100 uppercase tracking-wider font-semibold">
                Culinary Mastery
              </p>
              <p className="text-[11px] text-ivory-muted">From Old Delhi to Grand Trunk Highway</p>
            </div>
          </motion.div>

          {/* Story & Philosophy (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center space-x-2 text-gold-500 text-xs uppercase tracking-widest font-semibold">
              <span className="w-6 h-px bg-gold-500" />
              <span>The Culinary Custodian</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-100">
              Ustad Harpreet Singh
            </h2>
            <p className="text-sm uppercase tracking-wider text-gold-400 font-sans font-semibold">
              Executive Chef & Co-Founder
            </p>

            <div className="relative pl-6 border-l-2 border-gold-500/60 my-6">
              <Quote className="w-8 h-8 text-gold-500/20 absolute -top-4 -left-3 -z-10" />
              <p className="font-serif text-lg sm:text-xl text-ivory-100 italic leading-relaxed">
                "In a true dhaba, food is not mere sustenance — it is hospitality, warmth, and brotherhood served in a brass thali. You cannot hurry an authentic gravy, just as you cannot fake sincere affection."
              </p>
            </div>

            <p className="text-sm text-ivory-muted leading-relaxed font-sans">
              Born into a family of third-generation Punjabi cooks, Chef Harpreet honed his craft across dhabas lining the Amritsar-Delhi corridor before standardizing authentic slow-roasting techniques. His relentless insistence on hand-ground spices and open-coal cooking preserves recipes that have otherwise been lost to industrial shortcuts.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-sans text-ivory-muted">
              <div className="p-3 rounded-lg bg-charcoal-800 border border-charcoal-700">
                <span className="text-gold-400 font-bold block mb-0.5">Zero Pre-Made Sauces</span>
                <span>Everything ground and simmered on-premise daily.</span>
              </div>
              <div className="p-3 rounded-lg bg-charcoal-800 border border-charcoal-700">
                <span className="text-gold-400 font-bold block mb-0.5">Heritage Tandoor Craft</span>
                <span>Seasoned clay tandoors cured with jaggery and mustard.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
