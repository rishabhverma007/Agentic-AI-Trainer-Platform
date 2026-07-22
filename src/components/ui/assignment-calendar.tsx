"use client";

import React, { useState } from "react";
import { GlassCard } from "./glass-card";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Building2, User } from "lucide-react";

export function AssignmentCalendar() {
  const [currentMonth, setCurrentMonth] = useState("August 2026");

  const events = [
    {
      id: "ev_1",
      date: "Aug 10 - Aug 15",
      title: "IIT Delhi GenAI & Agentic Bootcamp",
      trainer: "Dr. Aris Thorne",
      mode: "Offline (New Delhi)",
      color: "border-cyan-500/50 bg-cyan-500/10 text-cyan-300",
    },
    {
      id: "ev_2",
      date: "Aug 20 - Aug 23",
      title: "BITS Pilani Full-Stack AI Workshop",
      trainer: "Elena Rostova",
      mode: "Hybrid (Hyderabad)",
      color: "border-purple-500/50 bg-purple-500/10 text-purple-300",
    },
    {
      id: "ev_3",
      date: "Aug 26 - Aug 29",
      title: "IIIT Hyderabad MLOps Infrastructure",
      trainer: "Vikramaditya Kulkarni",
      mode: "Online Virtual",
      color: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
    },
  ];

  return (
    <GlassCard glowColor="cyan" className="p-6 border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-white">Bootcamp Allocation Calendar</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-white font-mono">{currentMonth}</span>
        </div>
      </div>

      <div className="space-y-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className={`p-4 rounded-xl border ${ev.color} transition hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm">{ev.title}</span>
              <span className="text-xs font-mono font-bold">{ev.date}</span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-300">
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>{ev.trainer}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{ev.mode}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
