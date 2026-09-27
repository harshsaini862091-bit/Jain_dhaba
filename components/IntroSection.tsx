"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function IntroSection() {
  return (
    <section className="py-24 sm:py-32 bg-charcoal-800 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Content (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-gold-500 text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Timeless Indian Hospitality</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory-100 leading-tight">
              Where Every Meal <br />
              <span className="text-gold-gradient italic">Feels Like Home.</span>
            </h2>

            <p className="text-base text-ivory-muted leading-relaxed font-sans">
              Born from the rustic highway dhabas of Punjab and perfected with contemporary culinary grace, Jain Dhaba is a celebration of unfiltered Indian flavours. We hold sacred the art of hand-ground spices, clay-oven baking, and the unhurried patience of slow-cooked gravies.
            </p>

            <p className="text-sm text-ivory-muted/90 leading-relaxed font-sans">
              Here, there are no shortcuts. Our dals spend eighteen hours simmering gently on glowing charcoal embers, our paneer is hand-crafted fresh at dawn, and our naans emerge blistering and smoky from traditional tandoors.
            </p>

            <div className="pt-4 flex flex-wrap gap-6 items-center">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="h-4 w-px bg-charcoal-600 hidden sm:block" />
              <span className="text-xs text-ivory-muted font-serif italic">
                Crafted with pure desi ghee and love since 1994
              </span>
            </div>
          </motion.div>

          {/* Layered Visual Composition (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-gold-500/20 shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80"
                alt="Clay oven cooking at Jain Dhaba"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Insignia Card */}
            <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-charcoal-900/95 border border-gold-500/30 p-5 rounded-xl backdrop-blur-md shadow-2xl max-w-xs">
              <p className="font-serif text-2xl font-bold text-gold-400">100%</p>
              <p className="text-xs text-ivory-100 font-semibold uppercase tracking-wider">
                Authentic Dhaba Recipes
              </p>
              <p className="text-[11px] text-ivory-muted mt-1">
                Zero artificial colors or preservatives. Prepared fresh everyday.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
