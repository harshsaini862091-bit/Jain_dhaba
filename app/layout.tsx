import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://jaindhaba.com"),
  title: "Jain Dhaba | Authentic Indian Kitchen - Desi Swaad, Dil Se",
  description:
    "Experience authentic North Indian flavours, 18-hour slow-cooked Dal Makhani, clay-tandoor kebabs, and handcrafted Punjabi cuisine in an elegant modern dhaba setting.",
  keywords: [
    "Jain Dhaba",
    "Indian Restaurant",
    "Authentic Punjabi Food",
    "Dal Makhani",
    "Tandoori Kebab",
    "Dum Biryani",
    "Delhi Dhaba",
    "North Indian Cuisine",
  ],
  authors: [{ name: "Jain Dhaba Hospitality" }],
  openGraph: {
    title: "Jain Dhaba | Authentic Indian Kitchen",
    description: "Desi Swaad, Dil Se. Authentic North Indian cuisine and slow-cooked dhaba classics.",
    url: "https://jaindhaba.com",
    siteName: "Jain Dhaba",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Jain Dhaba Ambiance & Food",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jain Dhaba | Authentic Indian Kitchen",
    description: "Desi Swaad, Dil Se. Experience slow-cooked Punjabi dhaba classics.",
    images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"],
  },
  alternates: {
    canonical: "/",
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Jain Dhaba",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 42, Sector 18, Connaught Place Extension",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.6315,
    longitude: 77.2167,
  },
  url: "https://jaindhaba.com",
  telephone: "+919876543210",
  servesCuisine: "North Indian, Punjabi, Mughlai",
  priceRange: "₹₹",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:30",
      closes: "23:30",
    },
  ],
  menu: "https://jaindhaba.com/menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="bg-charcoal-900 text-ivory-100 antialiased selection:bg-gold-500 selection:text-charcoal-900">
        {/* Subtle cinematic grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        
        {/* Persistent Global Nav */}
        <Navbar />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
