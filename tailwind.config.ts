import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050508",
        surface: "#0a0a12",
        elevated: "#10101a",
        foreground: "#f0f0f4",
        "foreground-muted": "rgba(240, 240, 244, 0.45)",
        glass: {
          DEFAULT: "rgba(16, 16, 26, 0.55)",
          heavy: "rgba(16, 16, 26, 0.75)",
          border: "rgba(255, 255, 255, 0.06)",
          "border-hover": "rgba(255, 255, 255, 0.15)",
        },
        primary: {
          DEFAULT: "#06B6D4",
          hover: "#0891B2",
          foreground: "#ffffff",
          glow: "rgba(6, 182, 212, 0.35)",
        },
        accent: {
          cyan: "#06B6D4",
          purple: "#A855F7",
          blue: "#3B82F6",
          emerald: "#10B981",
          amber: "#F59E0B",
          red: "#EF4444",
        },
        sidebar: {
          bg: "rgba(10, 10, 18, 0.8)",
          border: "rgba(255, 255, 255, 0.04)",
          active: "rgba(6, 182, 212, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "0.75rem",
        DEFAULT: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      animation: {
        aurora: "aurora 18s ease infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "pulseGlow 3s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite linear",
        "orb-rotate": "orbRotate 12s linear infinite",
        "orb-float": "orbFloat 14s ease-in-out infinite",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-slide-up": "fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "blur-in": "blurIn 0.6s ease forwards",
        "cursor-pulse": "cursorPulse 2s ease-in-out infinite",
        "grid-move": "gridMove 20s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { backgroundPosition: "50% 50%, 50% 50%" },
          "50%": { backgroundPosition: "100% 0%, 0% 100%" },
        },
        pulseGlow: {
          "0%": {
            boxShadow: "0 0 15px rgba(6, 182, 212, 0.2), 0 0 30px rgba(168, 85, 247, 0.15)",
          },
          "100%": {
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(168, 85, 247, 0.3)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(-4px) rotate(-0.5deg)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        orbRotate: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.05)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        orbFloat: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-8px) translateX(-8px)" },
          "75%": { transform: "translateY(-15px) translateX(5px)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        blurIn: {
          "0%": { opacity: "0", filter: "blur(8px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
        cursorPulse: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "1" },
          "50%": { transform: "translate(-50%, -50%) scale(0.85)", opacity: "0.7" },
        },
        gridMove: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(50px, 50px)" },
        },
      },
      boxShadow: {
        glass: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        "glass-sm": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "glow-purple": "0 0 25px -5px rgba(168, 85, 247, 0.4)",
        "glow-blue": "0 0 25px -5px rgba(59, 130, 246, 0.4)",
        "glow-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.4)",
        "glow-amber": "0 0 25px -5px rgba(245, 158, 11, 0.4)",
        "glow-red": "0 0 25px -5px rgba(239, 68, 68, 0.4)",
        "glow-lg": "0 0 50px -12px rgba(6, 182, 212, 0.25)",
      },
      backdropBlur: {
        glass: "20px",
        "glass-heavy": "32px",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #06B6D4, #3B82F6, #A855F7)",
      },
    },
  },
  plugins: [],
};

export default config;
