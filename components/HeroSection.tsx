"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, Calendar, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-charcoal-900"
    >
      {/* Background Cinematic Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/75 to-charcoal-900/60" />
        <div className="absolute inset-0 bg-dhaba-pattern opacity-40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle decorative insignia */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-charcoal-800/80 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-medium">
            Authentic Indian Kitchen
          </span>
        </motion.div>

        {/* Main Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-ivory-100 uppercase"
        >
          JAIN <span className="text-gold-gradient">DHABA</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-300 italic mt-3 mb-6"
        >
          "Desi Swaad, Dil Se."
        </motion.p>

        {/* Editorial description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="max-w-2xl text-sm sm:text-base text-ivory-muted leading-relaxed font-sans mb-10"
        >
          Rediscover authentic highway culinary traditions. From 18-hour slow-cooked Dal Makhani to tandoori skewers charred over raw coal, experience the vibrant soul of North Indian feasting.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/reserve"
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-gold-500/80 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Table</span>
          </Link>

          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-widest text-xs shadow-gold hover:brightness-110 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Order Online</span>
          </Link>

          <Link
            href="/menu"
            className="w-full sm:w-auto px-6 py-3.5 text-ivory-muted hover:text-ivory-100 text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            Explore Menu
          </Link>
        </motion.div>
      </div>

      {/* Cinematic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory-muted/60 hover:text-gold-400 transition-colors cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
        }}
      >
        <span className="text-[10px] uppercase tracking-widest font-sans font-medium">Scroll to Discover</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-gold-500" />
      </motion.div>
    </section>
  );
}
