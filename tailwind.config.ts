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
        background: "#09090B",
        foreground: "#FAFAFA",
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          foreground: "#FAFAFA",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.06)",
        },
        primary: {
          DEFAULT: "#3B82F6", // Blue
          foreground: "#FFFFFF",
          glow: "rgba(59, 130, 246, 0.35)",
        },
        accent: {
          cyan: "#06B6D4",
          purple: "#A855F7",
          blue: "#3B82F6",
          emerald: "#10B981",
          amber: "#F59E0B",
        },
        sidebar: {
          bg: "#0B0C10",
          border: "rgba(255, 255, 255, 0.06)",
          active: "rgba(59, 130, 246, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      animation: {
        aurora: "aurora 18s ease infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        aurora: {
          "0%, 100%": {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          "50%": {
            backgroundPosition: "100% 0%, 0% 100%",
          },
        },
        glowPulse: {
          "0%": {
            boxShadow: "0 0 15px rgba(6, 182, 212, 0.2), 0 0 30px rgba(168, 85, 247, 0.15)",
          },
          "100%": {
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(168, 85, 247, 0.3)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.25)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "glow-purple": "0 0 25px -5px rgba(168, 85, 247, 0.4)",
        "glow-blue": "0 0 25px -5px rgba(59, 130, 246, 0.4)",
      },
      backdropBlur: {
        xs: "4px",
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
