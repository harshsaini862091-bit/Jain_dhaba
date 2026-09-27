import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: "#0D0C0A",
          800: "#161411",
          700: "#201D18",
          600: "#2E2A23",
          500: "#443F35",
        },
        ivory: {
          50: "#FCFAF6",
          100: "#F5EFE3",
          200: "#EADFCB",
          300: "#DFD1B6",
          muted: "#CFC4B2",
        },
        gold: {
          300: "#E6C98A",
          400: "#D4B46E",
          500: "#C5A15A",
          600: "#AA853D",
          700: "#866627",
        },
        terracotta: {
          400: "#DE854E",
          500: "#C96B32",
          600: "#A85322",
        },
        indiangreen: {
          400: "#6A7B59",
          500: "#526044",
          600: "#3D4832",
        },
      },
      fontFamily: {
        serif: ["var(--font-heading)", "Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["var(--font-body)", "Inter", "Manrope", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
        gold: "0 0 25px rgba(197, 161, 90, 0.2)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C5A15A 0%, #E6C98A 50%, #AA853D 100%)",
        "charcoal-gradient": "linear-gradient(180deg, #161411 0%, #0D0C0A 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
