"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Vikramaditya Oberoi",
    role: "Food & Wine Critic, Delhi",
    visitType: "Family Dinner",
    rating: 5,
    quote:
      "The Dal Makhani at Jain Dhaba is a benchmark of slow culinary devotion. You taste the charcoal, the unhurried hours, and the richness of pure dairy without any synthetic creaminess. It rivaled memories of grandmother's kitchen.",
  },
  {
    name: "Simran & Kabir Sethi",
    role: "Patrons for 8 Years",
    visitType: "Anniversary Celebration",
    rating: 5,
    quote:
      "We hosted our 10th anniversary in The Baithak private dining lounge. The hospitality of Chef Harpreet's team was magnificent. The Dahi Ke Kebab literally melted on the tongue, and our guests haven't stopped talking about the dum biryani.",
  },
  {
    name: "Dr. Arvind Chawla",
    role: "Heritage Enthusiast",
    visitType: "Regular Weekend Feast",
    rating: 5,
    quote:
      "Unlike modern restaurants that use blenders to turn every gravy into a neon-orange paste, Jain Dhaba preserves the rustic coarse texture of authentic highway recipes. It is genuine, hearty, and soulful.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((c) => (c > 0 ? c - 1 : testimonials.length - 1));
  };

  const next = () => {
    setCurrent((c) => (c < testimonials.length - 1 ? c + 1 : 0));
  };

  const t = testimonials[current];

  return (
    <section className="py-24 sm:py-32 bg-charcoal-900 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
            Guest Testimonies
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-100">
            Stories Shared Over Feasts
          </h2>
        </div>

        {/* Editorial Quote Card */}
        <div className="relative bg-charcoal-800/90 rounded-2xl border border-gold-500/25 p-8 sm:p-14 shadow-2xl backdrop-blur-md">
          <Quote className="w-16 h-16 text-gold-500/15 absolute top-8 left-8 -z-0" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col items-center text-center space-y-6"
            >
              {/* Star Rating */}
              <div className="flex items-center space-x-1 text-gold-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>

              {/* Main Quote */}
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-ivory-100 leading-relaxed max-w-3xl italic">
                "{t.quote}"
              </blockquote>

              {/* Author & Context */}
              <div className="pt-4 border-t border-charcoal-700/80 w-full max-w-xs">
                <p className="font-serif text-lg font-bold text-gold-400">{t.name}</p>
                <p className="text-xs text-ivory-muted font-sans mt-0.5">{t.role}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-charcoal-900 text-gold-500/90 border border-gold-500/20">
                  {t.visitType}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-charcoal-700/60">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-gold-500/30 text-ivory-muted hover:text-gold-400 hover:border-gold-500 transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === i ? "w-8 bg-gold-400" : "w-2 bg-charcoal-600"
                  }`}
                  aria-label={`Jump to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-full border border-gold-500/30 text-ivory-muted hover:text-gold-400 hover:border-gold-500 transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
