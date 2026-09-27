"use client";

import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export function LocationSection() {
  return (
    <section className="py-24 bg-charcoal-900 border-t border-charcoal-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Info Side (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-gold-500 text-xs uppercase tracking-[0.25em] font-semibold block">
              Find Us
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-100">
              Visit The Dhaba
            </h2>
            <p className="text-sm text-ivory-muted font-sans leading-relaxed">
              Conveniently located near the Grand Trunk arterial stretch in Connaught Place, offering dedicated valet parking and spacious dining sections.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3 text-sm text-ivory-100">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory-100">Jain Dhaba Restaurant</p>
                  <p className="text-xs text-ivory-muted">Plot 42, Sector 18, Connaught Place Extension, New Delhi 110001</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm text-ivory-100">
                <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory-100">Operating Hours</p>
                  <p className="text-xs text-ivory-muted">Monday – Sunday: 11:30 AM – 11:30 PM</p>
                  <p className="text-[11px] text-gold-500 mt-0.5">Kitchen accepts last order at 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm text-ivory-100">
                <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory-100">Direct Telephone</p>
                  <p className="text-xs text-ivory-muted">+91 98765 43210 / +91 11 2345 6789</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-wider text-xs shadow-gold hover:brightness-110 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </motion.div>

          {/* Interactive Map Visual (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-gold-500/25 relative bg-charcoal-800 shadow-card"
          >
            {/* Styled Map Canvas View with Dhaba Pin */}
            <div className="absolute inset-0 bg-[#161411] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 mb-4 animate-pulse">
                <MapPin className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ivory-100 mb-2">
                Jain Dhaba
              </h3>
              <p className="text-xs text-ivory-muted max-w-sm">
                Connaught Place, New Delhi. Free Valet Parking available on arrival.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-[11px] px-3 py-1 rounded bg-charcoal-900 text-gold-400 border border-gold-500/30">
                  Lat: 28.6315° N, Long: 77.2167° E
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
