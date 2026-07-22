"use client";

import React, { useState } from "react";
import { GlassCard } from "./glass-card";
import { formatCurrency } from "@/lib/utils";
import { Award, Star, Building2, UserCheck, Trophy } from "lucide-react";

export function LeaderboardWidget({ leaderboards }: { leaderboards?: any }) {
  const [tab, setTab] = useState<"TRAINERS" | "COLLEGES">("TRAINERS");

  const trainers = leaderboards?.topTrainers || [
    { rank: 1, name: "Dr. Aris Thorne", rating: 4.95, bootcamps: 48, revenue: 1680000 },
    { rank: 2, name: "Elena Rostova", rating: 4.88, bootcamps: 36, revenue: 1008000 },
    { rank: 3, name: "Vikramaditya Kulkarni", rating: 4.92, bootcamps: 62, revenue: 2480000 },
  ];

  const colleges = leaderboards?.topColleges || [
    { rank: 1, name: "IIT Delhi", requests: 14, students: 1200, spent: 1750000 },
    { rank: 2, name: "BITS Pilani", requests: 11, students: 850, spent: 1320000 },
    { rank: 3, name: "IIIT Hyderabad", requests: 9, students: 720, spent: 1080000 },
  ];

  return (
    <GlassCard glowColor="cyan" className="p-6 border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">Platform Performance Leaderboard</h3>
        </div>

        <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setTab("TRAINERS")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              tab === "TRAINERS" ? "bg-cyan-500 text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Top Trainers
          </button>
          <button
            onClick={() => setTab("COLLEGES")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              tab === "COLLEGES" ? "bg-cyan-500 text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Top Colleges
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {tab === "TRAINERS"
          ? trainers.map((t: any) => (
              <div
                key={t.rank}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center">
                    #{t.rank}
                  </span>
                  <div>
                    <div className="font-bold text-white text-xs">{t.name}</div>
                    <div className="text-[10px] text-gray-400">{t.bootcamps} Bootcamps Completed</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-amber-400 font-bold text-xs flex items-center justify-end">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                    {t.rating}★
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">
                    {formatCurrency(t.revenue)}
                  </div>
                </div>
              </div>
            ))
          : colleges.map((c: any) => (
              <div
                key={c.rank}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center">
                    #{c.rank}
                  </span>
                  <div>
                    <div className="font-bold text-white text-xs">{c.name}</div>
                    <div className="text-[10px] text-gray-400">{c.students} Students Trained</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-cyan-300 font-bold text-xs">{c.requests} Requests</div>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">
                    {formatCurrency(c.spent)}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </GlassCard>
  );
}
