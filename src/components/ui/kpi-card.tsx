"use client";

import React from "react";
import { GlassCard } from "./glass-card";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive?: boolean;
  subtext: string;
  icon: React.ElementType;
  glowColor?: "cyan" | "purple" | "blue" | "emerald";
}

export function KPICard({
  title,
  value,
  change,
  isPositive = true,
  subtext,
  icon: Icon,
  glowColor = "cyan",
}: KPICardProps) {
  return (
    <GlassCard glowColor={glowColor} className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400">{title}</span>
        <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-3xl font-extrabold text-white tracking-tight">{value}</div>
        <div className="flex items-center space-x-1.5 mt-1.5 text-[11px]">
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded-full font-bold border ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-red-500/10 text-red-400 border-red-500/30"
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
            {change}
          </span>
          <span className="text-gray-400">{subtext}</span>
        </div>
      </div>
    </GlassCard>
  );
}
