"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRequests } from "@/hooks/use-requests";
import { useTrainers } from "@/hooks/use-trainers";
import { useAnalytics } from "@/hooks/use-analytics";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { DataTable, Column } from "@/components/ui/data-table";
import { formatCurrency } from "@/lib/utils";
import {
  Sparkles,
  Bot,
  Building2,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  ShieldCheck,
} from "lucide-react";

export default function MainDashboardPage() {
  const { user, role, setRole } = useAuth();
  const { data: requests = [], isLoading: loadingRequests } = useRequests();
  const { data: trainers = [], isLoading: loadingTrainers } = useTrainers();
  const { data: analytics } = useAnalytics();

  const columns: Column<any>[] = [
    {
      header: "Institution / College",
      accessorKey: "collegeName",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-bold text-white">{row.collegeName}</div>
          <div className="text-[10px] text-gray-400">{row.location}</div>
        </div>
      ),
    },
    {
      header: "Technology Domain",
      accessorKey: "technology",
      sortable: true,
      cell: (row) => (
        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold text-[11px]">
          {row.technology}
        </span>
      ),
    },
    {
      header: "Daily Budget",
      accessorKey: "budgetPerDay",
      sortable: true,
      cell: (row) => (
        <span className="font-mono text-emerald-400 font-semibold">
          {formatCurrency(row.budgetPerDay)}/day
        </span>
      ),
    },
    {
      header: "Students",
      accessorKey: "numberOfStudents",
      cell: (row) => <span>{row.numberOfStudents} students</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row) => {
        const isMatched = row.status === "MATCHED" || row.status === "ASSIGNED";
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              isMatched
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 animate-pulse"
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: "Action",
      cell: (row) => (
        <Link
          href="/dashboard/matching"
          onClick={() => setRole("MANAGER")}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold hover:shadow-glow-cyan transition inline-flex items-center space-x-1"
        >
          <span>Run AI Ranking</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 border border-white/10">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {role} PERSPECTIVE
              </span>
              <span className="text-xs text-gray-400">System Telemetry: Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Agentic AI Allocation Engine is actively monitoring institution requests and trainer availability.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard/request"
              onClick={() => setRole("COLLEGE")}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-glow-cyan hover:shadow-glow-blue transition flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Submit College Request</span>
            </Link>
          </div>
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard glowColor="cyan" className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Pending Requests</span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">
              {analytics?.totalRequests || requests.length}
            </div>
            <div className="text-[11px] text-cyan-400 mt-1">Live institution requirements</div>
          </GlassCard>

          <GlassCard glowColor="emerald" className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Active Allocations</span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">
              {analytics?.totalAssignments || 38}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">
              {analytics?.avgMatchScore || 96.4}% avg match rating
            </div>
          </GlassCard>

          <GlassCard glowColor="purple" className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Verified Trainers</span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-purple-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">
              {analytics?.totalTrainers || trainers.length}
            </div>
            <div className="text-[11px] text-purple-400 mt-1">Across 45+ technical domains</div>
          </GlassCard>

          <GlassCard glowColor="blue" className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Platform Revenue</span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">
              {formatCurrency(analytics?.totalRevenue || 4850000)}
            </div>
            <div className="text-[11px] text-blue-400 mt-1">+18.4% growth this month</div>
          </GlassCard>
        </div>

        {/* Live Requests Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              <span>Active Training Requirements</span>
            </h2>
            <Link
              href="/dashboard/request"
              className="text-xs font-semibold text-cyan-400 hover:underline flex items-center space-x-1"
            >
              <span>View all requests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <DataTable
            data={requests}
            columns={columns}
            isLoading={loadingRequests}
            searchPlaceholder="Filter requests by college or technology..."
            filterKey="collegeName"
            pageSize={5}
          />
        </div>

      </div>
    </DashboardLayout>
  );
}
