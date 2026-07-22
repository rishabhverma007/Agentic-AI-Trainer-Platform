"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-start bg-[#09090B] text-slate-100 transition-bg overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "aria-hidden:hidden select-none absolute -inset-[10px] opacity-40 blur-[90px] filter",
            "[background-image:radial-gradient(ellipse_at_100%_0%,#06B6D4_0%,transparent_50%),radial-gradient(ellipse_at_0%_100%,#A855F7_0%,transparent_50%),radial-gradient(ellipse_at_50%_50%,#3B82F6_0%,transparent_50%)]",
            "animate-aurora"
          )}
        />
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {showRadialGradient && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#09090B_80%)]" />
      )}

      <div className="relative z-10 w-full flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
