"use client";

import React from "react";
import { GlassCard } from "./glass-card";
import { Sparkles, Brain, TrendingUp, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

interface AIInsightItem {
  title: string;
  description: string;
  category: string;
  impact: string;
  confidence: number;
}

export function AIInsightsPanel({ insights = [] }: { insights: AIInsightItem[] }) {
  return (
    <GlassCard glowColor="purple" className="p-6 border-purple-500/30 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Gemini 1.5 Pro AI Domain Insights</h3>
            <p className="text-[11px] text-gray-400">Automated pattern extraction across 4,800+ profiles & institutional requests</p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          98.2% Accuracy
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 hover:border-cyan-500/40 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300">{item.title}</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200">
                {(item.confidence * 100).toFixed(0)}% Confidence
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
