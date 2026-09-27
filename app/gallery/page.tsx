"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const allGalleryImages = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    title: "Warm Dining Room Ambiance",
    category: "interior",
  },
  {
    src: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    title: "Charred Paneer Tikka Skewers",
    category: "food",
  },
  {
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    title: "Slapping Naan in Clay Tandoor",
    category: "kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    title: "Dum Pukht Handi Biryani",
    category: "food",
  },
  {
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
    title: "Chef Harpreet Tasting the Simmering Dal",
    category: "chef",
  },
  {
    src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
    title: "The Baithak Private Dining",
    category: "interior",
  },
  {
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    title: "Evening Family Celebration Banquet",
    category: "events",
  },
  {
    src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    title: "Hand-Pounded Spices and Brass Mortar",
    category: "kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    title: "Tandoori Chicken Hot Off The Embers",
    category: "food",
  },
  {
    src: "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?auto=format&fit=crop&w=800&q=80",
    title: "Hot Gulab Jamuns in Rose Cardamom Syrup",
    category: "food",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    title: "Weekend Dining Hall Full House",
    category: "dining",
  },
  {
    src: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    title: "Fresh Hand-Steeped Masala Chai",
    category: "food",
  },
];

const categories = [
  { id: "all", name: "All Images" },
  { id: "food", name: "Food & Feasts" },
  { id: "interior", name: "Dining & Interiors" },
  { id: "kitchen", name: "Kitchen & Tandoor" },
  { id: "chef", name: "Chef at Work" },
  { id: "dining", name: "Guest Dining" },
  { id: "events", name: "Celebrations" },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeTab === "all"
      ? allGalleryImages
      : allGalleryImages.filter((img) => img.category === activeTab);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filtered.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev! < filtered.length - 1 ? prev! + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filtered.length]);

  return (
    <div className="pt-28 pb-24 bg-charcoal-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
            Moments in Charcoal & Spice
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory-100 mb-4">
            The Gallery
          </h1>
          <p className="text-sm text-ivory-muted font-sans">
            A visual chronicle of our charcoal kitchens, handcrafted dishes, and atmospheric celebrations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === c.id
                  ? "bg-gold-gradient text-charcoal-900 font-bold shadow-gold"
                  : "bg-charcoal-800 text-ivory-muted hover:text-ivory-100 border border-charcoal-700"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((item, idx) => (
            <motion.div
              layout
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-gold-500/20 hover:border-gold-500 shadow-md"
              onClick={() => setLightboxIndex(idx)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                  {item.category}
                </span>
                <p className="font-serif text-lg font-bold text-ivory-100">
                  {item.title}
                </p>
                <div className="absolute top-4 right-4 p-2 rounded-full bg-charcoal-900/80 text-gold-400">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
                setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filtered.length - 1))
              }
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal-800/80 text-ivory-100 hover:text-gold-400 z-50 backdrop-blur-sm"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev! < filtered.length - 1 ? prev! + 1 : 0))
              }
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal-800/80 text-ivory-100 hover:text-gold-400 z-50 backdrop-blur-sm"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center">
              <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
                <Image
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center mt-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                  {filtered[lightboxIndex].category}
                </span>
                <p className="font-serif text-xl font-bold text-ivory-100 mt-1">
                  {filtered[lightboxIndex].title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
