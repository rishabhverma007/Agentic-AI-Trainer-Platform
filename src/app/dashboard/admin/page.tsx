"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { DataTable, Column } from "@/components/ui/data-table";
import { Bot, ShieldAlert, Cpu, Activity, User, CheckCircle2, Server, Database } from "lucide-react";

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

const MOCK_ADMIN_USERS: AdminUserRow[] = [
  { id: "usr_1", name: "Alex Vance", email: "alex.vance@allocator.ai", role: "ADMIN", status: "ACTIVE", lastActive: "Just now" },
  { id: "usr_2", name: "Sarah Jenkins", email: "s.jenkins@allocator.ai", role: "MANAGER", status: "ACTIVE", lastActive: "5m ago" },
  { id: "usr_3", name: "Dr. Rajesh Sharma", email: "dean.academics@iitd.ac.in", role: "COLLEGE", status: "ACTIVE", lastActive: "1h ago" },
  { id: "usr_4", name: "Marcus Aurelius Chen", email: "m.chen@ai-trainers.org", role: "TRAINER", status: "ACTIVE", lastActive: "2h ago" },
  { id: "usr_5", name: "Dr. Aris Thorne", email: "a.thorne@ai-trainers.org", role: "TRAINER", status: "ACTIVE", lastActive: "1d ago" },
];

export default function AdminDashboardPage() {
  const [usersList, setUsersList] = useState(MOCK_ADMIN_USERS);

  const columns: Column<AdminUserRow>[] = [
    {
      header: "User Profile",
      accessorKey: "name",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-bold text-white">{row.name}</div>
          <div className="text-[10px] text-gray-400 font-mono">{row.email}</div>
        </div>
      ),
    },
    {
      header: "System Role",
      accessorKey: "role",
      sortable: true,
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          {row.role}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          {row.status}
        </span>
      ),
    },
    {
      header: "Last Session",
      accessorKey: "lastActive",
      cell: (row) => <span className="text-gray-400">{row.lastActive}</span>,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 border border-purple-500/30">
          <div className="flex items-center space-x-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">System Governance & Telemetry</h1>
          </div>
          <p className="text-xs text-gray-300">
            Monitor API Gateway health, Supabase pgvector indexes, agent execution logs, and system access policies.
          </p>
        </div>

        {/* Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard glowColor="purple" className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">FastAPI API Gateway</span>
              <Server className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white mt-2 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Operational (99.98%)</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-1 font-mono">Latency ~42ms</div>
          </GlassCard>

          <GlassCard glowColor="cyan" className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Supabase pgvector DB</span>
              <Database className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-white mt-2">Active (4,820 Vectors)</div>
            <div className="text-[10px] text-gray-400 mt-1 font-mono">Index: HNSW HnswCosine</div>
          </GlassCard>

          <GlassCard glowColor="blue" className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Gemini 1.5 Pro Agents</span>
              <Bot className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-white mt-2">v2.4 Orchestrator</div>
            <div className="text-[10px] text-gray-400 mt-1 font-mono">Tokens: 142.8k / 1M free</div>
          </GlassCard>
        </div>

        {/* User Governance Table */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <User className="w-5 h-5 text-cyan-400" />
            <span>Platform User Directory</span>
          </h2>

          <DataTable
            data={usersList}
            columns={columns}
            searchPlaceholder="Filter system users by name or role..."
            filterKey="name"
            pageSize={5}
          />
        </div>

      </div>
    </DashboardLayout>
  );
}
