import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette — see DESIGN DIRECTION in project brief.
        background: "#FAF8F3", // warm off-white
        charcoal: "#1A1A1A", // primary text
        teal: {
          DEFAULT: "#0F6E56", // primary accent (deep healing teal)
          bright: "#1D9E75", // lighter teal for highlights/glows
        },
        coral: "#D85A30", // secondary accent — CTAs / energy moments
        muted: "#6B6B63", // warm gray text
        surface: "#F0F3EF", // card / surface background (light sage tint)
      },
      fontFamily: {
        // Wired up via next/font in layout.tsx (CSS variables).
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(26, 26, 26, 0.18)",
        lift: "0 18px 45px -18px rgba(15, 110, 86, 0.35)",
      },
      keyframes: {
        "breathe": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(29,158,117,0.45)" },
          "50%": { transform: "scale(1.06)", boxShadow: "0 0 0 14px rgba(29,158,117,0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        // Marquee shifts exactly one copy of a doubled list (-50%) for a
        // seamless infinite loop.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Featured-card "alive" tint — cross-fades a soft teal radial overlay
        // between two very close tints (~#F0F3EF ↔ ~#E8F0EC). Opacity-only so it
        // interpolates smoothly; disabled site-wide under prefers-reduced-motion.
        "soft-pulse": {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.85" },
        },
        // Chat panel entrance — slide up from the bottom with an opacity fade.
        "chat-in": {
          from: { opacity: "0", transform: "translateY(16px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        // Typing indicator dots.
        "dot-bounce": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-5px)", opacity: "1" },
        },
      },
      animation: {
        breathe: "breathe 2.8s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-out both",
        marquee: "marquee 45s linear infinite",
        "soft-pulse": "soft-pulse 5.5s ease-in-out infinite",
        "chat-in": "chat-in 0.25s ease-out both",
        "dot-bounce": "dot-bounce 1.2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
