"use client";

import Link from "next/link";
import { Calendar, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export function ReservationCtaSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-charcoal-900 to-charcoal-800 relative overflow-hidden">
      {/* Glow elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <span className="text-gold-500 text-xs uppercase tracking-[0.3em] font-semibold block">
            An Unforgettable Evening
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-ivory-100 leading-tight">
            Your Table Is Waiting.
          </h2>

          <p className="text-sm sm:text-base text-ivory-muted max-w-xl mx-auto font-sans leading-relaxed">
            Reserve your seat in our dining hall, garden courtyard, or private baithak. Experience North Indian warmth and soulful culinary craftsmanship.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reserve"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-widest text-xs shadow-gold hover:brightness-110 transition-all flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>

            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-gold-500/60 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 98765 43210</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
