"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    title: "The Warm Lantern Ambiance",
    category: "Interior",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    title: "Skewered Paneer Tikka on Charcoal",
    category: "Food",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    title: "Mastering the Clay Tandoor",
    category: "Kitchen",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    title: "Dum Biryani in Sealed Handi",
    category: "Food",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
    title: "The Private Baithak Lounge",
    category: "Interior",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=80",
    title: "Whole Spices and Brass Utensils",
    category: "Kitchen",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
];

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : galleryImages.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev! < galleryImages.length - 1 ? prev! + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section className="py-24 sm:py-32 bg-charcoal-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
            Moments & Aromas
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-100 mb-4">
            Visual Ambiance
          </h2>
          <p className="text-sm text-ivory-muted font-sans">
            A glimpse into the sights, crackling charcoal fires, and warm textures that make Jain Dhaba memorable.
          </p>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[240px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-xl overflow-hidden cursor-pointer group border border-gold-500/15 hover:border-gold-500/50 shadow-md ${img.span}`}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold mb-0.5">
                  {img.category}
                </span>
                <p className="font-serif text-lg font-bold text-ivory-100 leading-snug">
                  {img.title}
                </p>
                <div className="absolute top-4 right-4 p-2 rounded-full bg-charcoal-900/80 text-gold-400">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-charcoal-800 text-ivory-100 hover:text-gold-400 z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : galleryImages.length - 1))
              }
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal-800/80 text-ivory-100 hover:text-gold-400 z-50 backdrop-blur-sm"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev! < galleryImages.length - 1 ? prev! + 1 : 0))
              }
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal-800/80 text-ivory-100 hover:text-gold-400 z-50 backdrop-blur-sm"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center">
              <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
                <Image
                  src={galleryImages[lightboxIndex].src}
                  alt={galleryImages[lightboxIndex].title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center mt-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                  {galleryImages[lightboxIndex].category}
                </span>
                <p className="font-serif text-xl font-bold text-ivory-100 mt-1">
                  {galleryImages[lightboxIndex].title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
