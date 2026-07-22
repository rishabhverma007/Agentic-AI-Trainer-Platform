"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "blue" | "emerald" | "none";
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  glowColor = "none",
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  const glowStyles = {
    cyan: "hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] hover:border-cyan-500/30",
    purple: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] hover:border-purple-500/30",
    blue: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] hover:border-blue-500/30",
    emerald: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] hover:border-emerald-500/30",
    none: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-2xl bg-[#12131A]/60 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300",
        hoverEffect && "hover:bg-[#1A1C26]/75 hover:border-white/20 hover:-translate-y-1",
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
