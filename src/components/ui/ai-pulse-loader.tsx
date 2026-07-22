"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, CheckCircle2, Cpu, Search, Calendar, Star, DollarSign } from "lucide-react";
import { GlassCard } from "./glass-card";

interface AIPulseLoaderProps {
  onComplete?: () => void;
}

const STEPS = [
  { label: "Understanding Request...", icon: Bot, color: "text-purple-400" },
  { label: "Searching Vector Database...", icon: Search, color: "text-cyan-400" },
  { label: "Checking Trainer Availability...", icon: Calendar, color: "text-blue-400" },
  { label: "Evaluating Past Feedback & Ratings...", icon: Star, color: "text-amber-400" },
  { label: "Optimizing Budget Alignment...", icon: DollarSign, color: "text-emerald-400" },
  { label: "Agentic AI Ranking & Scoring...", icon: Cpu, color: "text-purple-400" },
  { label: "Final Recommendation Ready!", icon: CheckCircle2, color: "text-cyan-400" },
];

export function AIPulseLoader({ onComplete }: AIPulseLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < STEPS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, onComplete]);

  const CurrentIcon = STEPS[currentStep].icon;

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <GlassCard glowColor="cyan" className="text-center relative overflow-hidden p-8 border-cyan-500/30">
        {/* Animated glowing backdrop orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Animated AI Brain Orb */}
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-500 animate-spin opacity-70 blur-sm" />
            <div className="absolute inset-1 rounded-full bg-[#09090B] flex items-center justify-center">
              <CurrentIcon className={`w-9 h-9 ${STEPS[currentStep].color} animate-pulse`} />
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              Agentic Orchestration Active
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-6">
            Matching Optimal Technical Trainers
          </h3>

          {/* Progress list */}
          <div className="w-full space-y-2 max-w-md text-left">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isPassed = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center space-x-3 p-2.5 rounded-xl border text-xs transition-all ${
                    isPassed
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : isCurrent
                      ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-200 font-semibold shadow-glow-cyan"
                      : "bg-white/[0.02] border-white/5 text-gray-500 opacity-50"
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <StepIcon className={`w-4 h-4 shrink-0 ${isCurrent ? step.color : "text-gray-500"}`} />
                  )}
                  <span className="flex-1">{step.label}</span>
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
