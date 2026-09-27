import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award, Heart, Flame, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Heritage & Story | Jain Dhaba",
  description: "Learn about Jain Dhaba's culinary roots, our commitment to slow coal-cooking, and three decades of authentic highway hospitality.",
};

const values = [
  {
    icon: Flame,
    title: "Raw Charcoal & Earthen Tandoor",
    desc: "We refuse electric or gas shortcuts. Our clay ovens are seasoned with jaggery and mustard oil, giving breads and kebabs their inimitable aroma.",
  },
  {
    icon: Sparkles,
    title: "Hand-Stone Ground Masalas",
    desc: "Every day begins with stone-grinding whole spices to preserve essential volatile oils that commercial factory powders destroy.",
  },
  {
    icon: Heart,
    title: "Swaad, Dil Se",
    desc: "Dhaba food was born out of generosity for weary travelers. We treat every guest as a deity visiting our home.",
  },
  {
    icon: Award,
    title: "Pure Dairy & Desi Ghee",
    desc: "White makhan churned in-house, rich fresh cream, and clarified desi ghee used unsparingly in all our signature gravies.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-charcoal-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-gold-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
            Since 1994
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory-100 mb-6">
            The Jain Dhaba Heritage
          </h1>
          <p className="text-base sm:text-lg text-ivory-muted font-sans leading-relaxed">
            From a humble roadside stove on the Grand Trunk Road to Delhi's premier modern Indian sanctuary, our sacred commitment remains unchanged: authentic flavors cooked with patience and unconditional love.
          </p>
        </div>

        {/* Narrative Chapter 1: The Origins */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold">
              Chapter I: The Highway Roadside
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-100">
              Where Journeys Paused for Soul Food
            </h2>
            <p className="text-sm text-ivory-muted leading-relaxed font-sans">
              In 1994, our founder set up an open clay tandoor and a broad iron kadhai under a neem canopy. Travelers and truck drivers navigating the highway would stop their engines, drawn by the scent of simmering black lentils and charbroiled rotis.
            </p>
            <p className="text-sm text-ivory-muted leading-relaxed font-sans">
              Word of the rich, slow-simmered Dal Makhani and piping-hot tandoori paneer quickly spread from highway drivers to food connoisseurs across North India. Though our dining room has evolved into a warm, atmospheric haven, the recipes remain faithfully rooted in that original roadside stove.
            </p>
          </div>

          <div className="lg:col-span-6 relative h-96 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-gold-500/20 shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              alt="Jain Dhaba Dining Heritage"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Narrative Chapter 2: Core Values */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-100 mb-3">
              The Four Pillars of Our Kitchen
            </h2>
            <p className="text-xs sm:text-sm text-ivory-muted">
              Every dish served at your table adheres to these foundational tenets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-charcoal-800/80 p-6 rounded-xl border border-gold-500/20 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-charcoal-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-ivory-100 mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs text-ivory-muted leading-relaxed font-sans">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Experience */}
        <div className="bg-charcoal-800 border border-gold-500/30 rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ivory-100 mb-4">
            Taste The Authenticity
          </h2>
          <p className="text-xs sm:text-sm text-ivory-muted max-w-lg mx-auto mb-8 font-sans">
            Come share a meal where every bite echoes the soul of North India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="px-8 py-3.5 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-wider text-xs shadow-gold hover:brightness-110"
            >
              Explore Our Menu
            </Link>
            <Link
              href="/reserve"
              className="px-8 py-3.5 rounded-sm border border-gold-500/70 text-gold-400 font-bold uppercase tracking-wider text-xs hover:bg-gold-500 hover:text-charcoal-900 transition-all"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
