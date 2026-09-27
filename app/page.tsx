import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { SignatureDishesSection } from "@/components/SignatureDishesSection";
import { FlavorStorySection } from "@/components/FlavorStorySection";
import { ChefSection } from "@/components/ChefSection";
import { MenuPreviewSection } from "@/components/MenuPreviewSection";
import { ExperiencePreviewSection } from "@/components/ExperiencePreviewSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ReservationCtaSection } from "@/components/ReservationCtaSection";
import { LocationSection } from "@/components/LocationSection";
import { MenuService } from "@/lib/services/menuService";

// Server Component fetching initial featured dishes for zero-layout-shift and optimal SEO
export default async function HomePage() {
  let initialDishes = [];
  try {
    const dishes = await MenuService.getMenuItems({ isFeatured: true });
    // Serialize MongoDB ObjectIds to strings
    initialDishes = JSON.parse(JSON.stringify(dishes)).slice(0, 6);
  } catch (err) {
    console.error("Could not pre-fetch featured dishes server-side:", err);
  }

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Intro Section ("Where Every Meal Feels Like Home") */}
      <IntroSection />

      {/* 3. Signature Dishes Section */}
      <SignatureDishesSection initialDishes={initialDishes} />

      {/* 4. Indian Flavour Story */}
      <FlavorStorySection />

      {/* 5. Chef Section */}
      <ChefSection />

      {/* 6. Menu Preview (8 Categories) */}
      <MenuPreviewSection />

      {/* 7. Experience (Family, Private, Celebrations) */}
      <ExperiencePreviewSection />

      {/* 8. Gallery (Masonry & Lightbox) */}
      <GallerySection />

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. Reservation CTA ("Your Table Is Waiting") */}
      <ReservationCtaSection />

      {/* 11. Location & Timings */}
      <LocationSection />
    </div>
  );
}
