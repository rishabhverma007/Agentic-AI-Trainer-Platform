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
        
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <CalendarIcon className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Institutional & Trainer Schedule Calendar</h1>
          </div>
          <p className="text-xs text-gray-300">
            Real-time schedule locks, booked bootcamp windows, and trainer availability blocks.
          </p>
        </div>

        <AssignmentCalendar />

      </div>
    </DashboardLayout>
  );
}
