"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  showRadialGradient?: boolean;
  intensity?: "subtle" | "medium" | "strong";
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  intensity = "medium",
  ...props
}: AuroraBackgroundProps) {
  const opacityMap = {
    subtle: "opacity-20",
    medium: "opacity-40",
    strong: "opacity-60",
  };

  const blurMap = {
    subtle: "blur-[80px]",
    medium: "blur-[90px]",
    strong: "blur-[100px]",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-start bg-background text-slate-100 transition-colors overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Aurora overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={cn(
            "absolute -inset-[10px] filter",
            opacityMap[intensity],
            blurMap[intensity],
            "[background-image:radial-gradient(ellipse_at_100%_0%,#06B6D4_0%,transparent_50%),radial-gradient(ellipse_at_0%_100%,#A855F7_0%,transparent_50%),radial-gradient(ellipse_at_50%_50%,#3B82F6_0%,transparent_50%)]",
            "animate-aurora"
          )}
        />

        {/* Secondary aurora layer for depth */}
        <div
          className={cn(
            "absolute -inset-[10px] filter",
            "opacity-[0.15]",
            "blur-[120px]",
            "[background-image:radial-gradient(ellipse_at_80%_20%,#10B981_0%,transparent_50%),radial-gradient(ellipse_at_20%_80%,#8B5CF6_0%,transparent_50%)]",
            "animate-aurora"
          )}
          style={{ animationDelay: "-6s", animationDuration: "22s" }}
        />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Vignette gradient */}
      {showRadialGradient && (
        <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,#050508_80%)]" />
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
