"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { DataTable, Column } from "@/components/ui/data-table";
import { KPICard } from "@/components/ui/kpi-card";
import { useRequests } from "@/hooks/use-requests";
import { useAssignments } from "@/hooks/use-assignments";
import { formatCurrency } from "@/lib/utils";
import {
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Bot,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  const { user, role } = useAuth();
  const { data: requests = [] } = useRequests();
  const { data: assignments = [] } = useAssignments();

  const columns: Column<any>[] = [
    {
      header: "College / Institution",
      accessorKey: "collegeName",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-bold text-white text-xs">{row.collegeName}</div>
          <div className="text-[10px] text-foreground-muted">{row.location}</div>
        </div>
      ),
    },
    {
      header: "Technology",
      accessorKey: "technology",
      cell: (row) => (
        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 font-semibold text-[11px]">
          {row.technology}
        </span>
      ),
    },
    {
      header: "Budget / Day",
      accessorKey: "budgetPerDay",
      cell: (row) => (
        <span className="font-mono text-emerald-400 font-semibold text-xs">
          {formatCurrency(row.budgetPerDay)}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
          {row.status}
        </span>
      ),
    },
  ];

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/8 to-blue-500/10 border border-cyan-500/20 p-6 sm:p-8">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.08] pointer-events-none"
            style={{ background: "radial-gradient(circle, #06B6D4, transparent 70%)", filter: "blur(50px)" }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {role} Dashboard
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {getGreeting()}, {user?.name?.split(" ")[0] || "User"}
              </h1>
              <p className="text-xs sm:text-sm text-foreground-muted mt-1">
                Welcome to the ALLOCATOR.AI platform. Here is your executive overview of trainer allocations, active requests, and AI match status.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10">
                <Bot className="w-4 h-4 text-cyan-400" />
                <div className="text-xs">
                  <div className="text-white font-semibold">Gemini 1.5 Pro</div>
                  <div className="text-emerald-400 text-[10px] font-mono">● Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Active Requests"
            value={requests.length || 12}
            change="+3"
            subtext="new this week"
            icon={FileText}
            glowColor="cyan"
          />
          <KPICard
            title="Active Assignments"
            value={assignments.length || 8}
            change="+2"
            subtext="awaiting approval"
            icon={Award}
            glowColor="purple"
          />
          <KPICard
            title="AI Match Accuracy"
            value="98.2%"
            change="+2.1%"
            subtext="Gemini 1.5 Pro score"
            icon={TrendingUp}
            glowColor="emerald"
          />
          <KPICard
            title="Verified Trainers"
            value="4,820"
            change="+120"
            subtext="new profiles this week"
            icon={Users}
            glowColor="blue"
          />
        </div>

        {/* Recent Requests Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>Recent Training Requests</span>
            </h2>
            <button className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1 transition-colors">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <DataTable
            data={requests}
            columns={columns}
            searchPlaceholder="Search requests..."
            filterKey="collegeName"
            pageSize={5}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
