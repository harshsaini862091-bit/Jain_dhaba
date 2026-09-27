import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal-800 border-t border-gold-500/20 text-ivory-100 relative overflow-hidden">
      {/* Decorative top border accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-wider text-ivory-100">
                JAIN DHABA
              </span>
              <span className="block text-xs uppercase tracking-[0.25em] text-gold-500 font-semibold -mt-1">
                Authentic Indian Kitchen
              </span>
            </Link>
            <p className="text-sm text-ivory-muted leading-relaxed">
              "Desi Swaad, Dil Se." A sanctuary of slow-simmered gravies, charcoal-kissed tandoori fare, and genuine North Indian hospitality.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:border-gold-500 hover:bg-gold-500/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:border-gold-500 hover:bg-gold-500/10 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-serif text-lg font-semibold text-gold-400 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-ivory-muted">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors inline-flex items-center group">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors inline-flex items-center group">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-gold-400 transition-colors inline-flex items-center group">
                  The Experience
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition-colors inline-flex items-center group">
                  Atmospheric Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors inline-flex items-center group">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Dhaba Delicacies */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-serif text-lg font-semibold text-gold-400 tracking-wide">
              Specialties
            </h3>
            <ul className="space-y-2 text-sm text-ivory-muted">
              <li>
                <Link href="/menu?category=starters" className="hover:text-gold-400 transition-colors">
                  Paneer Tikka & Chaat
                </Link>
              </li>
              <li>
                <Link href="/menu?category=tandoor" className="hover:text-gold-400 transition-colors">
                  Charcoal Tandoor Kebabs
                </Link>
              </li>
              <li>
                <Link href="/menu?category=main-course" className="hover:text-gold-400 transition-colors">
                  Overnight Dal Makhani
                </Link>
              </li>
              <li>
                <Link href="/menu?category=biryani" className="hover:text-gold-400 transition-colors">
                  Dum Pukht Biryanis
                </Link>
              </li>
              <li>
                <Link href="/menu?category=desserts" className="hover:text-gold-400 transition-colors">
                  Pure Desi Ghee Sweets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-serif text-lg font-semibold text-gold-400 tracking-wide">
              Visit & Timings
            </h3>
            <div className="space-y-2.5 text-xs text-ivory-muted">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Sector 18, Grand Trunk Road Extension, Connaught Place, New Delhi 110001</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span>Open Daily: 11:30 AM – 11:30 PM</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>namaste@jaindhaba.com</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <Link
                href="/reserve"
                className="text-xs uppercase tracking-wider px-3.5 py-2 rounded-sm border border-gold-500/70 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 font-semibold transition-all inline-flex items-center"
              >
                <span>Book Table</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
              <Link
                href="/menu"
                className="text-xs uppercase tracking-wider px-3.5 py-2 rounded-sm bg-gold-gradient text-charcoal-900 font-bold hover:brightness-110 shadow-gold transition-all"
              >
                Order Food
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 mt-12 border-t border-charcoal-700/60 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-muted/70 gap-4">
          <p>© {new Date().getFullYear()} Jain Dhaba Restaurant. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gold-400 transition-colors">Guest Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
