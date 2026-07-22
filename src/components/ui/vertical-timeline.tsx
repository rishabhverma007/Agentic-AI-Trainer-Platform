"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, FileText, Send, ShieldCheck, UserCheck } from "lucide-react";
import { GlassCard } from "./glass-card";

export interface TimelineEvent {
  time: string;
  step: string;
  message: string;
}

export function VerticalTimeline({ events }: { events: TimelineEvent[] }) {
  if (!events || events.length === 0) return null;

  return (
    <GlassCard glowColor="cyan" className="p-6 border-cyan-500/30">
      <h3 className="text-sm font-bold text-white mb-6 flex items-center space-x-2">
        <Clock className="w-4 h-4 text-cyan-400" />
        <span>End-to-End Assignment Progression Timeline</span>
      </h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-emerald-500">
        {events.map((ev, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="relative"
          >
            <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-[#09090B] border-2 border-cyan-400 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-xs">{ev.step}</span>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold">{ev.time}</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">{ev.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
