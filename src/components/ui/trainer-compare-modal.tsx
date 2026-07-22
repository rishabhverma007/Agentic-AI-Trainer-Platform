"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import { X, Check, Star, Award, DollarSign, Calendar, Bot } from "lucide-react";
import { GlassCard } from "./glass-card";

interface TrainerCompareModalProps {
  trainers: any[];
  onClose: () => void;
}

export function TrainerCompareModal({ trainers, onClose }: TrainerCompareModalProps) {
  if (!trainers || trainers.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-[#0D0E15] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 relative glass-panel max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Side-by-Side Trainer Comparison Matrix</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-semibold">
                <th className="p-3 w-1/4 uppercase tracking-wider text-[10px]">Candidate Feature</th>
                {trainers.map((t, idx) => (
                  <th key={idx} className="p-3 text-center w-1/4">
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-[10px] text-cyan-300 font-semibold">{t.title}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              <tr>
                <td className="p-3 font-bold text-white">Overall AI Match Score</td>
                {trainers.map((t, idx) => (
                  <td key={idx} className="p-3 text-center">
                    <span className="font-extrabold font-mono text-cyan-400 text-sm">
                      {t.overallMatchScore}%
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Daily Fee Rate</td>
                {trainers.map((t, idx) => (
                  <td key={idx} className="p-3 text-center font-mono font-semibold text-emerald-400">
                    {formatCurrency(t.hourlyRate)}/day
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Experience & Rating</td>
                {trainers.map((t, idx) => (
                  <td key={idx} className="p-3 text-center">
                    <div>{t.experienceYears} Years</div>
                    <div className="text-amber-400 font-bold flex items-center justify-center space-x-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{t.rating}★</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Availability</td>
                {trainers.map((t, idx) => (
                  <td key={idx} className="p-3 text-center font-semibold text-cyan-300">
                    {t.availability}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Key Strengths</td>
                {trainers.map((t, idx) => (
                  <td key={idx} className="p-3 text-left">
                    <ul className="space-y-1 text-[11px]">
                      {(t.strengths || []).map((st: string, i: number) => (
                        <li key={i} className="flex items-start space-x-1">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
}
