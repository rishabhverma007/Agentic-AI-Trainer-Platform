"use client";

import React, { useState } from "react";
import { useTrainers } from "@/hooks/use-trainers";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { CardSkeleton } from "@/components/ui/skeleton-loader";
import { formatCurrency } from "@/lib/utils";
import { Search, Star, MapPin, Award, X, UserCheck, Briefcase } from "lucide-react";

export default function TrainersDirectoryPage() {
  const [techQuery, setTechQuery] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const { data: trainers = [], isLoading } = useTrainers({ technology: techQuery || undefined });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/8 to-purple-500/10 border border-blue-500/20 p-6 sm:p-8">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.08] pointer-events-none"
            style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)", filter: "blur(50px)" }}
          />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-1">
              <UserCheck className="w-5 h-5 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">Verified Technical Trainers Directory</h1>
            </div>
            <p className="text-xs text-foreground-muted">
              Browse verified AI architects, full-stack leads, cybersecurity specialists, and DevOps engineers.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-3" />
            <input type="text" value={techQuery} onChange={(e) => setTechQuery(e.target.value)}
              placeholder="Search by skill (e.g. GenAI, PyTorch, Next.js, MLOps)..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-foreground-muted focus:outline-none focus:border-cyan-400/70 transition-all" />
          </div>
          <div className="text-xs text-foreground-muted">
            Showing <strong className="text-cyan-400 font-bold">{trainers.length}</strong> verified profiles
          </div>
        </div>

        {/* Trainer Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((t: any) => (
              <GlassCard key={t.id} glowColor="cyan" className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-start space-x-4 mb-4">
                    <img src={t.photo || t.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"} alt={t.name}
                      className="w-14 h-14 rounded-2xl border border-cyan-500/30 object-cover shrink-0" />
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">{t.name}</h3>
                      <p className="text-xs text-cyan-300 font-medium mt-0.5 line-clamp-1">{t.title}</p>
                      <div className="flex items-center space-x-2 text-[11px] text-foreground-muted mt-1">
                        <div className="flex items-center text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                          <span>{t.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{t.experienceYears || t.experience_years || 5}y Exp</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 mb-4">{t.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(t.skills || ["Python", "GenAI"]).map((sk: string) => (
                      <span key={sk} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300">{sk}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-foreground-muted block">Daily Rate</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">{formatCurrency(t.hourlyRate || t.hourly_rate || 3500)}/day</span>
                  </div>
                  <button onClick={() => setSelectedTrainer(t)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition">
                    View Profile
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedTrainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-2xl glass border border-cyan-500/30 rounded-2xl shadow-2xl p-6 relative">
              <button onClick={() => setSelectedTrainer(null)}
                className="absolute top-4 right-4 p-1 rounded-lg bg-white/10 text-foreground-muted hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-start space-x-4 mb-6">
                <img src={selectedTrainer.photo || selectedTrainer.avatar_url} alt={selectedTrainer.name}
                  className="w-16 h-16 rounded-2xl border-2 border-cyan-400 object-cover" />
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedTrainer.name}</h2>
                  <p className="text-xs text-cyan-300 font-semibold">{selectedTrainer.title}</p>
                  <div className="flex items-center space-x-3 text-xs text-foreground-muted mt-1">
                    <span className="flex items-center text-amber-400 font-bold">
                      <Star className="w-4 h-4 fill-amber-400 mr-1" />{selectedTrainer.rating} ({selectedTrainer.totalTrainings || 48} Bootcamps)
                    </span>
                    <span>•</span>
                    <span className="flex items-center text-gray-300">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-cyan-400" />{selectedTrainer.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-1">Biography</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedTrainer.bio}</p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-1">Verified Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedTrainer.certifications || ["AWS Certified ML Specialist", "NVIDIA DLI"]).map((c: string) => (
                      <span key={c} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-300">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-1">Past Institutional Clients</h4>
                  <p className="text-foreground-muted">{(selectedTrainer.pastColleges || ["IIT Bombay", "BITS Pilani", "IIIT Hyderabad"]).join(" • ")}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <button onClick={() => setSelectedTrainer(null)}
                  className="px-6 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition">
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
