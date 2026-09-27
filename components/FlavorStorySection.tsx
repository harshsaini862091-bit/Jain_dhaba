"use client";

import Image from "next/image";
import { Flame, Clock, Award, Compass } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Flame,
    title: "Clay Oven Alchemy",
    subtitle: "Tandoori Craft",
    description:
      "Handcrafted clay pits fired with seasoned wood charcoal reaching 480°C. Skewers sealed instantaneously, preserving succulent tenderness and smoky depth.",
    tag: "High Heat & Smoke",
  },
  {
    icon: Clock,
    title: "18-Hour Dum Simmering",
    subtitle: "Patience as Ingredient",
    description:
      "Our Dal Makhani and gravies simmer overnight on cooling coal embers, allowing whole spices and butter to emulsify naturally without hurried thickeners.",
    tag: "Slow Craft",
  },
  {
    icon: Award,
    title: "Pounded Whole Spices",
    subtitle: "The Sil Batta Heritage",
    description:
      "We roast and stone-pound black cardamom, mace, cinnamon, and Kashmiri chilies daily. Essential oils remain intact for vibrant aroma and gut warmth.",
    tag: "Pure Terroir",
  },
  {
    icon: Compass,
    title: "Highway Dhaba Lineage",
    subtitle: "Grand Trunk Road",
    description:
      "Recipes sourced from storied truck stops and rural kitchens across Punjab, Delhi, and Awadh — authentic, robust, and unapologetically flavorful.",
    tag: "Century-Old Roots",
  },
];

export function FlavorStorySection() {
  return (
    <section className="py-24 sm:py-32 bg-charcoal-800 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-gold-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
            The Philosophy of Taste
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-100 mb-6">
            The Indian Flavour Story
          </h2>
          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-sans">
            Indian cuisine is an ancient alchemy of heat, restraint, and spice chemistry. At Jain Dhaba, we honor every step of this sacred ritual.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-charcoal-900/70 p-6 sm:p-8 rounded-xl border border-gold-500/15 hover:border-gold-500/40 transition-all duration-300 hover:shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-charcoal-800 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:border-gold-400 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-terracotta-400 font-semibold block mb-1">
                    {pillar.subtitle}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-ivory-100 mb-3 group-hover:text-gold-400 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed mb-6 font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-charcoal-700/60 flex items-center justify-between text-[11px] text-gold-500/80 uppercase tracking-widest font-mono">
                  <span>{pillar.tag}</span>
                  <span className="font-serif font-bold">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Large Editorial Visual Feature */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal-900 rounded-2xl border border-gold-500/20 p-6 sm:p-12 overflow-hidden relative">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold">
              The Sacred Handi
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ivory-100">
              Slow Cooking Is Our Meditation.
            </h3>
            <p className="text-sm text-ivory-muted leading-relaxed font-sans">
              Unlike commercial kitchens that rely on pre-made frozen pastes, every batch of gravy at Jain Dhaba is initiated fresh each morning. Slow sweating of sweet onions, rich garlic cloves crushed by hand, and whole spices blooming in steaming mustard oil and homemade butter.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="border-l-2 border-gold-500 pl-3">
                <p className="font-serif text-xl font-bold text-gold-400">18 Hours</p>
                <p className="text-[11px] text-ivory-muted uppercase">Slow Simmering</p>
              </div>
              <div className="border-l-2 border-gold-500 pl-3">
                <p className="font-serif text-xl font-bold text-gold-400">32 Spices</p>
                <p className="text-[11px] text-ivory-muted uppercase">Proprietary Masala</p>
              </div>
              <div className="border-l-2 border-gold-500 pl-3">
                <p className="font-serif text-xl font-bold text-gold-400">480°C</p>
                <p className="text-[11px] text-ivory-muted uppercase">Charcoal Heat</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-72 sm:h-80 w-full rounded-xl overflow-hidden border border-gold-500/20">
            <Image
              src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=80"
              alt="Authentic Indian Spices and Preparation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
