"use client";

import React, { useCallback } from "react";
import { Moon, BookOpen } from "lucide-react";

type Theme = "dark" | "sepia";

const THEME_KEY = "lithos-theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "sepia") return stored;
  return "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  // Flash of unstyled content protection — add transitioning class
  root.classList.add("theme-transitioning");
  setTimeout(() => root.classList.remove("theme-transitioning"), 500);
}

const nextTheme: Record<Theme, Theme> = {
  dark: "sepia",
  sepia: "dark",
};

const themeLabel: Record<Theme, string> = {
  dark: "Dark mode",
  sepia: "Field notebook",
};

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("dark");
  const [mounted, setMounted] = React.useState(false);

  // Hydrate from localStorage on mount
  React.useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = nextTheme[prev];
      applyTheme(next);
      return next;
    });
  }, []);

  // Don't render until hydrated to avoid mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all"
      aria-label={`Switch to ${themeLabel[nextTheme[theme]]}`}
      title={themeLabel[theme]}
    >
      {theme === "dark" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <BookOpen className="w-4 h-4" />
      )}
    </button>
  );
}
