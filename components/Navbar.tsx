"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Menu as MenuIcon, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/about" },
  { name: "Menu", href: "/menu" },
  { name: "Experience", href: "/experience" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { toggleOpen, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-charcoal-900/95 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-card"
            : "bg-gradient-to-b from-charcoal-900/80 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl tracking-wider text-ivory-100 group-hover:text-gold-400 transition-colors font-bold">
              JAIN DHABA
            </span>
            <span className="text-[10px] tracking-[0.25em] text-gold-500 uppercase font-sans -mt-1 font-semibold">
              Authentic Indian Kitchen
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm tracking-wide transition-colors py-1 ${
                    isActive
                      ? "text-gold-400 font-medium"
                      : "text-ivory-muted hover:text-ivory-100"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Cart Trigger */}
            <button
              onClick={toggleOpen}
              aria-label="View Cart"
              className="relative p-2.5 rounded-full border border-gold-500/30 text-ivory-100 hover:border-gold-500 hover:text-gold-400 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-terracotta-500 text-ivory-50 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Reserve Table CTA (Desktop) */}
            <Link
              href="/reserve"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm border border-gold-500/60 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300 font-semibold"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve</span>
            </Link>

            {/* Order Online CTA */}
            <Link
              href="/menu"
              className="inline-flex items-center text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-sm bg-gold-gradient text-charcoal-900 font-bold hover:brightness-110 shadow-gold transition-all duration-300"
            >
              Order Online
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 lg:hidden text-ivory-100 hover:text-gold-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-charcoal-900/98 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between lg:hidden"
          >
            <div className="flex flex-col space-y-5">
              <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold">
                Explore Jain Dhaba
              </span>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-2xl transition-colors ${
                      isActive ? "text-gold-400 font-semibold pl-2 border-l-2 border-gold-500" : "text-ivory-100 hover:text-gold-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col space-y-3 pt-6 border-t border-charcoal-700">
              <Link
                href="/reserve"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-semibold tracking-wider uppercase border border-gold-500 text-gold-400 rounded-sm hover:bg-gold-500 hover:text-charcoal-900 transition-all"
              >
                Reserve a Table
              </Link>
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-bold tracking-wider uppercase bg-gold-gradient text-charcoal-900 rounded-sm shadow-gold"
              >
                Order Online Now
              </Link>
              <p className="text-center text-xs text-ivory-muted pt-2">
                "Desi Swaad, Dil Se."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
