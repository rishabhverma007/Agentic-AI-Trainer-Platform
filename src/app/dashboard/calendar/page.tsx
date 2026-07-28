"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AssignmentCalendar } from "@/components/ui/assignment-calendar";
import { GlassCard } from "@/components/ui/glass-card";
import { Calendar as CalendarIcon, Clock, CheckCircle2, UserCheck } from "lucide-react";

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/8 to-blue-500/10 border border-cyan-500/20 p-6 sm:p-8">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.08] pointer-events-none"
            style={{ background: "radial-gradient(circle, #06B6D4, transparent 70%)", filter: "blur(50px)" }}
          />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-1">
              <CalendarIcon className="w-5 h-5 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Institutional & Trainer Schedule Calendar</h1>
            </div>
            <p className="text-xs text-foreground-muted">
              Real-time schedule locks, booked bootcamp windows, and trainer availability blocks.
            </p>
          </div>
        </div>

        <AssignmentCalendar />
      </div>
    </DashboardLayout>
  );
}
