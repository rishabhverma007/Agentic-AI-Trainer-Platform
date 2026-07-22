"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Clock, Bot, Cpu, Search, Calendar, DollarSign } from "lucide-react";
import { GlassCard } from "./glass-card";

interface TimelineStep {
  time: string;
  step: string;
  message: string;
}

interface AIWorkflowTimelineProps {
  timeline: TimelineStep[];
  isExecuting?: boolean;
}

export function AIWorkflowTimeline({ timeline, isExecuting = false }: AIWorkflowTimelineProps) {
  return (
    <GlassCard glowColor="purple" className="p-6 border-purple-500/30">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <h3 className="text-sm font-bold text-white">Agentic Orchestration Timeline</h3>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          {isExecuting ? "Executing Agents..." : "Execution Complete"}
        </span>
      </div>

      <div className="space-y-3">
        {timeline.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="flex items-start space-x-3 text-xs"
          >
            <div className="mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>

            <div className="flex-1 bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-bold text-cyan-300">{item.step}</span>
                <span className="text-[10px] font-mono text-gray-500">{item.time}</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">{item.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
