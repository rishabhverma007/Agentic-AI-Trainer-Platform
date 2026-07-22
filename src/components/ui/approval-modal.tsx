"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { X, ShieldCheck, Sparkles, CheckCircle2, FileText, AlertTriangle, Send } from "lucide-react";
import { GlassCard } from "./glass-card";

interface ApprovalModalProps {
  assignment: any;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export function ApprovalModal({ assignment, onConfirm, onClose }: ApprovalModalProps) {
  const [step, setStep] = useState<"REVIEW" | "PROCESSING" | "SUCCESS">("REVIEW");

  const handleApprove = async () => {
    setStep("PROCESSING");
    await onConfirm();
    setTimeout(() => setStep("SUCCESS"), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-[#0D0E15] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 relative glass-panel">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "REVIEW" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-lg font-bold text-white">Manager Allocation Review</h2>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Institution:</span>
                <span className="font-bold text-white">{assignment.collegeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Assigned Trainer:</span>
                <span className="font-bold text-cyan-300">{assignment.trainerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Technology:</span>
                <span className="font-semibold text-white">{assignment.technology}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Contract Value:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {formatCurrency(assignment.totalBudget)}
                </span>
              </div>
            </div>

            {/* Risk Indicator */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Low Risk Assessment: Candidate has 100% calendar clearance and verified credentials.</span>
            </div>

            <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/10">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-xs hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-glow-cyan hover:shadow-glow-blue transition flex items-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Approve & Issue Digital Contract</span>
              </button>
            </div>
          </div>
        )}

        {step === "PROCESSING" && (
          <div className="py-8 text-center space-y-4">
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto animate-spin" />
            <h3 className="text-base font-bold text-white">Generating Digital Contract & Alerting Trainer...</h3>
            <p className="text-xs text-gray-400">
              Generating PDF agreement and dispatching instant email & WhatsApp notifications.
            </p>
          </div>
        )}

        {step === "SUCCESS" && (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-cyan animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Allocation Approved & Contract Sent!</h3>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
              Digital contract <strong className="text-cyan-300">CTR-2026-901</strong> has been dispatched to <strong className="text-white">{assignment.trainerName}</strong>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
