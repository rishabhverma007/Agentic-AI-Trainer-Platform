"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "blue" | "emerald" | "amber" | "red" | "none";
  hoverEffect?: boolean;
  tiltEffect?: boolean;
  glowIntensity?: "subtle" | "medium" | "strong";
}

export function GlassCard({
  children,
  className,
  glowColor = "none",
  hoverEffect = true,
  tiltEffect = true,
  glowIntensity = "medium",
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const glowVariants: Record<string, string> = {
    cyan: "rgba(6, 182, 212, 0.12)",
    purple: "rgba(168, 85, 247, 0.12)",
    blue: "rgba(59, 130, 246, 0.12)",
    emerald: "rgba(16, 185, 129, 0.12)",
    amber: "rgba(245, 158, 11, 0.12)",
    red: "rgba(239, 68, 68, 0.12)",
    none: "transparent",
  };

  const glowShadows: Record<string, string> = {
    cyan: "0 0 30px -5px rgba(6, 182, 212, 0.3), 0 0 60px -15px rgba(6, 182, 212, 0.1)",
    purple: "0 0 30px -5px rgba(168, 85, 247, 0.3), 0 0 60px -15px rgba(168, 85, 247, 0.1)",
    blue: "0 0 30px -5px rgba(59, 130, 246, 0.3), 0 0 60px -15px rgba(59, 130, 246, 0.1)",
    emerald: "0 0 30px -5px rgba(16, 185, 129, 0.3), 0 0 60px -15px rgba(16, 185, 129, 0.1)",
    amber: "0 0 30px -5px rgba(245, 158, 11, 0.3), 0 0 60px -15px rgba(245, 158, 11, 0.1)",
    red: "0 0 30px -5px rgba(239, 68, 68, 0.3), 0 0 60px -15px rgba(239, 68, 68, 0.1)",
    none: "",
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glowRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Dynamic glow follow
      const glow = glowRef.current;
      glow.style.opacity = "1";
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;

      // 3D tilt
      if (tiltEffect) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
      }
    },
    [tiltEffect]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-[rgba(16,16,26,0.55)] backdrop-blur-[20px] saturate-[180%]",
        "border border-[rgba(255,255,255,0.06)]",
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]",
        hoverEffect && [
          "transition-all duration-500 ease-out",
          "hover:border-[rgba(255,255,255,0.15)]",
          isHovered && glowShadows[glowColor],
          "hover:-translate-y-1",
        ],
        "transform-gpu",
        tiltEffect && "cursor-none",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {/* Dynamic cursor-follow glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "300px",
          height: "300px",
          background: `radial-gradient(circle, ${glowVariants[glowColor]}, transparent 70%)`,
          opacity: 0,
          transition: "opacity 0.4s ease",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />

      {/* Top edge shine */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          zIndex: 1,
        }}
      />

      {/* Subtle inner glass highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02), transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
}
