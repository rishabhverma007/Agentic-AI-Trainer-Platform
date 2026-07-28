"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAIMatching } from "@/hooks/use-ai-matching";
import { useRequests } from "@/hooks/use-requests";
import { useAssignments } from "@/hooks/use-assignments";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { AIPulseLoader } from "@/components/ui/ai-pulse-loader";
import { MatchScoreCircle } from "@/components/ui/match-score-circle";
import { AIWorkflowTimeline } from "@/components/ui/ai-workflow-timeline";
import { TrainerCompareModal } from "@/components/ui/trainer-compare-modal";
import { formatCurrency } from "@/lib/utils";
import {
  Sparkles, Bot, Brain, Search, Calendar, Star,
  CheckCircle2, AlertTriangle, Layers, ArrowRight,
  ShieldCheck, Check, Building2, Cpu,
} from "lucide-react";

export default function MatchingEnginePage() {
  const router = useRouter();
  const { data: requests = [] } = useRequests();
  const { mutateAsync: runMatching, isPending: isMatching } = useAIMatching();
  const { createAssignment } = useAssignments();

  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState<string>(
    "Need a senior GenAI & Agentic Workflows trainer for a 5-day bootcamp in Delhi with PyTorch and LangChain skills. Daily budget ₹25,000."
  );
  const [matchingResult, setMatchingResult] = useState<any>(null);
  const [comparedTrainers, setComparedTrainers] = useState<any[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [assignedTrainerId, setAssignedTrainerId] = useState<string | null>(null);

  const handleExecuteMatching = async () => {
    const res = await runMatching({
      requestId: selectedRequestId || undefined,
      customPrompt: customPrompt || undefined,
    });
    setMatchingResult(res);
  };

  const handleAssignTrainer = async (candidate: any) => {
    setAssignedTrainerId(candidate.trainerId);
    await createAssignment({
      request_id: selectedRequestId || "req_901",
      trainer_id: candidate.trainerId,
      college_name: matchingResult?.parsedRequest?.college_name || "IIT Delhi",
      trainer_name: candidate.name,
      technology: matchingResult?.parsedRequest?.technology || "Generative AI",
      start_date: "2026-08-10",
      end_date: "2026-08-15",
      total_budget: candidate.hourlyRate * 5,
      match_score: candidate.overallMatchScore,
    });
  };

  const toggleCompare = (candidate: any) => {
    setComparedTrainers((prev) => {
      const exists = prev.some((t) => t.trainerId === candidate.trainerId);
      if (exists) return prev.filter((t) => t.trainerId !== candidate.trainerId);
      if (prev.length >= 3) return prev;
      return [...prev, candidate];
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/10 via-cyan-500/8 to-blue-500/10 border border-purple-500/20 p-6 sm:p-8">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.08] pointer-events-none"
            style={{ background: "radial-gradient(circle, #A855F7, transparent 70%)", filter: "blur(50px)" }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Multi-Agent AI Orchestration Engine v2.4
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Agentic Trainer Allocation Engine
              </h1>
              <p className="text-xs sm:text-sm text-foreground-muted mt-1">
                Gemini 1.5 Pro agents evaluate 4,800+ vector profiles for skills, schedule locks, ratings, and daily rate compliance.
              </p>
            </div>
            {comparedTrainers.length > 0 && (
              <button onClick={() => setShowCompareModal(true)}
                className="px-4 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-xs glow-purple hover:bg-purple-500/30 transition flex items-center space-x-2">
                <Layers className="w-4 h-4" />
                <span>Compare Candidates ({comparedTrainers.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Input Section */}
        <GlassCard glowColor="cyan" className="p-6 border-cyan-500/25">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Select Institution Request</label>
              <select value={selectedRequestId} onChange={(e) => setSelectedRequestId(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all">
                <option value="">IIT Delhi - GenAI & Agentic Workflows</option>
                {requests.map((r: any) => (
                  <option key={r.id} value={r.id}>{r.collegeName} ({r.technology})</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 mb-1">Or Enter Natural Language Requirement Prompt</label>
              <input type="text" value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Need a senior PyTorch and LangChain trainer for a 5-day bootcamp in Delhi..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
            </div>
          </div>
          <button onClick={handleExecuteMatching} disabled={isMatching}
            className="btn-primary w-full">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Run Multi-Agent Allocation Pipeline</span>
          </button>
        </GlassCard>

        {/* Results */}
        {isMatching ? (
          <AIPulseLoader />
        ) : matchingResult && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trainers List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <span>Top 5 Recommended Trainers</span>
                </h2>
                <span className="text-xs text-foreground-muted">
                  Execution Latency: <strong className="text-emerald-400 font-mono">{matchingResult.executionTimeSeconds}s</strong>
                </span>
              </div>

              <div className="space-y-6">
                {(matchingResult.recommendations || []).map((cand: any) => {
                  const isAssigned = assignedTrainerId === cand.trainerId;
                  const isComparing = comparedTrainers.some((t) => t.trainerId === cand.trainerId);
                  return (
                    <GlassCard key={cand.trainerId}
                      glowColor={cand.rank === 1 ? "cyan" : "none"}
                      className={`p-6 relative border ${cand.rank === 1 ? "border-cyan-500/40" : "border-white/5"}`}>
                      {cand.rank === 1 && (
                        <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-brand-gradient text-black text-[10px] font-extrabold uppercase tracking-wider glow-cyan">
                          ⭐ Top Ranked AI Allocation Match
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <img src={cand.photo} alt={cand.name}
                            className="w-16 h-16 rounded-2xl border-2 border-cyan-500/30 object-cover shrink-0" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-base font-bold text-white">{cand.name}</h3>
                              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-cyan-300">Rank #{cand.rank}</span>
                            </div>
                            <p className="text-xs text-cyan-300 font-medium mt-0.5">{cand.title}</p>
                            <div className="flex items-center space-x-3 text-xs text-foreground-muted mt-2">
                              <span className="flex items-center text-amber-400 font-bold">
                                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                                {cand.rating} ({cand.totalTrainings} Bootcamps)
                              </span>
                              <span>•</span>
                              <span>{cand.experienceYears}y Exp</span>
                              <span>•</span>
                              <span className="font-mono text-emerald-400 font-semibold">{formatCurrency(cand.hourlyRate)}/day</span>
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <MatchScoreCircle score={cand.overallMatchScore} />
                        </div>
                      </div>

                      <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                        <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300">
                          <Brain className="w-4 h-4 text-cyan-400" />
                          <span>Explainable AI Match Reasoning</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">{cand.aiReasoning}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Key Strengths</span>
                            <ul className="space-y-1 text-[11px] text-gray-300">
                              {(cand.strengths || []).map((st: string, idx: number) => (
                                <li key={idx} className="flex items-center space-x-1.5">
                                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                  <span>{st}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Considerations</span>
                            <ul className="space-y-1 text-[11px] text-gray-300">
                              {(cand.weaknesses || []).map((w: string, idx: number) => (
                                <li key={idx} className="flex items-center space-x-1.5">
                                  <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                                  <span>{w}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                        <button onClick={() => toggleCompare(cand)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
                            isComparing ? "bg-purple-500/20 border-purple-400 text-purple-300" : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                          }`}>
                          {isComparing ? "✓ Comparing" : "+ Compare Candidate"}
                        </button>
                        <button onClick={() => handleAssignTrainer(cand)} disabled={isAssigned}
                          className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                            isAssigned
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "btn-primary"
                          }`}>
                          {isAssigned ? (
                            <><CheckCircle2 className="w-4 h-4" /><span>Assigned & Contract Issued</span></>
                          ) : (
                            <><ShieldCheck className="w-4 h-4" /><span>Confirm Trainer Allocation</span></>
                          )}
                        </button>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>

            {/* Sidebar: Timeline & Context */}
            <div className="space-y-6">
              <AIWorkflowTimeline timeline={matchingResult.activityTimeline || []} />
              <GlassCard hoverEffect={false} className="p-6 border-white/5 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>Parsed Requirement Context</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <div>College: <span className="text-cyan-300">{matchingResult.parsedRequest?.college_name}</span></div>
                  <div>Domain: <span className="text-purple-300">{matchingResult.parsedRequest?.technology}</span></div>
                  <div>Budget Limit: <span className="text-emerald-400">₹{matchingResult.parsedRequest?.budget_per_day}/day</span></div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* Compare Modal */}
        {showCompareModal && (
          <TrainerCompareModal trainers={comparedTrainers} onClose={() => setShowCompareModal(false)} />
        )}
      </div>
    </DashboardLayout>
  );
}
