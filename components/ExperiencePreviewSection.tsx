"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Wine, PartyPopper, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Family Dining",
    subtitle: "Dhaba Dawaat",
    icon: Users,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    desc: "Long wooden tables laden with smoking handis, overflowing thalis, and hearty laughter. Warm, unpretentious dining built for sharing memories.",
    ctaText: "Reserve Family Table",
    ctaLink: "/reserve?area=Indoor",
  },
  {
    title: "Private Dining",
    subtitle: "The Baithak",
    icon: Wine,
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
    desc: "An exclusive acoustic alcove adorned with brass lamps, carved wooden lattice screens, and dedicated butler service for corporate dinners and VIP gatherings.",
    ctaText: "Book Private Baithak",
    ctaLink: "/reserve?area=Private+Dining",
  },
  {
    title: "Festive Celebrations",
    subtitle: "Milestones & Shawa",
    icon: PartyPopper,
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    desc: "Birthdays, anniversaries, and family reunions. Custom chef tasting menus, celebratory desserts, and live ghazal ambiance tailored for grand occasions.",
    ctaText: "Plan Your Event",
    ctaLink: "/contact?subject=Celebration",
  },
];

export function ExperiencePreviewSection() {
  return (
    <section className="py-24 sm:py-32 bg-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
            Bespoke Gatherings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-100 mb-4">
            Curated Dhaba Experiences
          </h2>
          <p className="text-sm text-ivory-muted font-sans">
            Whether an impromptu family dinner, a spirited celebration, or a secluded private gathering, we craft the ideal ambiance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group bg-charcoal-800 rounded-2xl overflow-hidden border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 hover:shadow-card hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 via-charcoal-800/40 to-transparent" />
                    <div className="absolute top-4 left-4 p-2.5 rounded-full bg-charcoal-900/80 text-gold-400 backdrop-blur-sm border border-gold-500/30">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] uppercase tracking-wider text-terracotta-400 font-semibold block mb-1">
                      {exp.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-ivory-100 mb-3 group-hover:text-gold-400 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-sans">
                      {exp.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={exp.ctaLink}
                    className="w-full py-2.5 px-4 rounded-sm border border-gold-500/60 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>{exp.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
