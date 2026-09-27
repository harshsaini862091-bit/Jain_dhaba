import Image from "next/image";
import Link from "next/link";
import { Users, Wine, PartyPopper, CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "The Dining Experience | Jain Dhaba",
  description: "Explore our dining formats: The Family Dining Hall, The Private Baithak, and curated milestone celebrations.",
};

const detailedExperiences = [
  {
    title: "Family Dining Hall",
    subtitle: "Dawaat-e-Khaas",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    description:
      "Our main dining hall captures the convivial warmth of North Indian gatherings. Solid dark timber tables, handcrafted brass tableware, and panoramic open tandoor views create an immersive sensory feast.",
    features: [
      "Spacious tables seating 2 to 10 guests comfortably",
      "Live tandoor and bread-slapping viewing counter",
      "Child-friendly seating and customized milder spice preferences",
      "Dedicated attentive floor service",
    ],
    ctaText: "Book Main Dining Table",
    ctaLink: "/reserve?area=Indoor",
  },
  {
    title: "The Baithak — Private Dining",
    subtitle: "Royal Seclusion",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80",
    description:
      "A secluded private salon styled after historic Awadhi pavilions. Featuring hand-carved jali partition screens, bespoke brass lighting, and a personal chef consultation for custom courses.",
    features: [
      "Accommodates private parties from 8 to 20 guests",
      "Bespoke multi-course tasting menus designed with the Chef",
      "Dedicated butler service and custom background music control",
      "Pre-dinner cocktail and mocktail welcome service",
    ],
    ctaText: "Reserve The Baithak",
    ctaLink: "/reserve?area=Private+Dining",
  },
  {
    title: "Festive Celebrations & Banquets",
    subtitle: "Memories Made Grand",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    description:
      "From anniversary banquets and milestone birthdays to corporate dinner receptions, we turn gatherings into legendary affairs with live ghazals, floral decor, and grand banquet spreads.",
    features: [
      "Customised print menus with host insignia",
      "Grand dessert displays with warm live jalebis and rabri counters",
      "Dedicated event coordinator ensuring flawless execution",
      "Special dietary stations (Jain, vegan, gluten-conscious)",
    ],
    ctaText: "Inquire for Celebrations",
    ctaLink: "/contact?subject=Celebration",
  },
];

export default function ExperiencePage() {
  return (
    <div className="pt-28 pb-24 bg-charcoal-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-gold-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
            Atmospheric Hospitality
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory-100 mb-6">
            The Jain Dhaba Experience
          </h1>
          <p className="text-base sm:text-lg text-ivory-muted font-sans leading-relaxed">
            Every gathering has its own rhythm. Discover our three distinct dining atmospheres, thoughtfully designed to bring people together over unforgettable Indian food.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-24 mb-24">
          {detailedExperiences.map((exp, i) => (
            <div
              key={exp.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                i % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div
                className={`lg:col-span-6 space-y-6 ${
                  i % 2 === 1 ? "lg:col-start-7" : ""
                }`}
              >
                <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold block">
                  {exp.subtitle}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-100">
                  {exp.title}
                </h2>
                <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-sans">
                  {exp.description}
                </p>

                <div className="space-y-3 pt-2">
                  {exp.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-ivory-200">
                      <CheckCircle className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href={exp.ctaLink}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-wider text-xs shadow-gold hover:brightness-110 transition-all"
                  >
                    <span>{exp.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div
                className={`lg:col-span-6 relative h-[380px] sm:h-[440px] w-full rounded-2xl overflow-hidden border border-gold-500/20 shadow-card ${
                  i % 2 === 1 ? "lg:col-start-1" : ""
                }`}
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Global Reservation Prompt */}
        <div className="bg-charcoal-800 border border-gold-500/30 rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ivory-100 mb-3">
            Ready to Experience It?
          </h2>
          <p className="text-xs sm:text-sm text-ivory-muted max-w-md mx-auto mb-6">
            Reserve your table online in seconds with live availability confirmation.
          </p>
          <Link
            href="/reserve"
            className="inline-block px-8 py-3.5 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-wider text-xs shadow-gold hover:brightness-110"
          >
            Reserve Your Experience
          </Link>
        </div>
      </div>
    </div>
  );
}
