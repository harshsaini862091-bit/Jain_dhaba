"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { DishCard } from "@/components/DishCard";
import { IMenuItem, IMenuCategory } from "@/types";
import { Search, Utensils } from "lucide-react";
import { motion } from "framer-motion";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [items, setItems] = useState<IMenuItem[]>([]);
  const [categories, setCategories] = useState<IMenuCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeDietary, setActiveDietary] = useState<"all" | "veg" | "non-veg">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setItems(res.data.items);
          setCategories(res.data.categories);
        }
      })
      .catch((err) => console.error("Failed to load menu data:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      if (activeDietary !== "all" && item.dietary !== activeDietary) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIng = item.ingredients?.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIng) {
          return false;
        }
      }
      return true;
    });
  }, [items, activeCategory, activeDietary, searchQuery]);

  return (
    <div className="pt-28 pb-24 bg-charcoal-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold-500 text-xs uppercase tracking-widest font-semibold mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>Grand Trunk Culinary Selection</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory-100 mb-4">
            The Dhaba Feast
          </h1>
          <p className="text-sm sm:text-base text-ivory-muted font-sans">
            Prepared fresh to order using slow charcoal roasting, overnight simmering, and cold-pressed mustard oil.
          </p>
        </div>

        <div className="bg-charcoal-800 p-4 rounded-xl border border-gold-500/20 shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-ivory-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, spices, or ingredients (e.g. Paneer, Biryani, Garlic)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-xs sm:text-sm text-ivory-100 placeholder:text-ivory-muted/60 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs uppercase tracking-wider text-ivory-muted font-semibold hidden sm:inline">
              Dietary:
            </span>
            <div className="flex p-1 bg-charcoal-900 rounded-md border border-charcoal-700">
              <button
                type="button"
                onClick={() => setActiveDietary("all")}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                  activeDietary === "all"
                    ? "bg-gold-500 text-charcoal-900 font-bold"
                    : "text-ivory-muted hover:text-ivory-100"
                }`}
              >
                All Dishes
              </button>
              <button
                type="button"
                onClick={() => setActiveDietary("veg")}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  activeDietary === "veg"
                    ? "bg-indiangreen-500 text-ivory-50 font-bold"
                    : "text-ivory-muted hover:text-ivory-100"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-indiangreen-400" />
                <span>Pure Veg</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDietary("non-veg")}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  activeDietary === "non-veg"
                    ? "bg-terracotta-500 text-ivory-50 font-bold"
                    : "text-ivory-muted hover:text-ivory-100"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-terracotta-400" />
                <span>Non-Veg</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap border transition-all ${
              activeCategory === "all"
                ? "bg-gold-gradient text-charcoal-900 border-gold-400 shadow-gold font-bold"
                : "bg-charcoal-800 text-ivory-muted border-charcoal-700 hover:text-ivory-100 hover:border-gold-500/40"
            }`}
          >
            All Courses ({items.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap border transition-all ${
                activeCategory === cat.slug
                  ? "bg-gold-gradient text-charcoal-900 border-gold-400 shadow-gold font-bold"
                  : "bg-charcoal-800 text-ivory-muted border-charcoal-700 hover:text-ivory-100 hover:border-gold-500/40"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6 text-xs text-ivory-muted">
          <span>
            Showing <strong className="text-gold-400">{filteredItems.length}</strong> delicacies
            {activeCategory !== "all" && ` in ${activeCategory.replace("-", " ")}`}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-gold-400 hover:underline"
            >
              Clear search "{searchQuery}"
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-xl bg-charcoal-800 animate-pulse border border-charcoal-700"
              />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-charcoal-800/40 rounded-2xl border border-charcoal-700 max-w-lg mx-auto">
            <Utensils className="w-12 h-12 text-gold-500/30 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-ivory-100 mb-1">
              No matching delicacies found
            </h3>
            <p className="text-xs text-ivory-muted mb-6">
              Try adjusting your dietary filter, course selection, or search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveDietary("all");
                setSearchQuery("");
              }}
              className="px-6 py-2 rounded-sm bg-gold-gradient text-charcoal-900 text-xs font-bold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredItems.map((item) => (
              <DishCard key={item._id} item={item} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 bg-charcoal-900 min-h-screen text-center text-ivory-muted">
          Loading Dhaba Menu...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
