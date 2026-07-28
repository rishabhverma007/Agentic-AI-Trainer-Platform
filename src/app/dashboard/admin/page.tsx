"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { DataTable, Column } from "@/components/ui/data-table";
import { SystemHealthPanel } from "@/components/ui/system-health-panel";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldAlert,
  Cpu,
  Database,
  Users,
  Wifi,
  HardDrive,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const systemMetrics = [
    { label: "API Response Time", value: "128ms", icon: Cpu, color: "emerald", status: "Optimal", iconClass: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400", dotClass: "bg-emerald-400", textClass: "text-emerald-400" },
    { label: "Database Connections", value: "24/100", icon: Database, color: "cyan", status: "Healthy", iconClass: "bg-cyan-500/10 border-cyan-500/25 text-cyan-400", dotClass: "bg-cyan-400", textClass: "text-cyan-400" },
    { label: "Active WebSocket", value: "7 sessions", icon: Wifi, color: "blue", status: "Connected", iconClass: "bg-blue-500/10 border-blue-500/25 text-blue-400", dotClass: "bg-blue-400", textClass: "text-blue-400" },
    { label: "Storage Used", value: "2.4 GB / 10 GB", icon: HardDrive, color: "amber", status: "Adequate", iconClass: "bg-amber-500/10 border-amber-500/25 text-amber-400", dotClass: "bg-amber-400", textClass: "text-amber-400" },
  ];

  const userColumns: Column<any>[] = [
    {
      header: "User",
      accessorKey: "name",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-brand-gradient p-[1px]">
            <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center text-xs font-bold text-cyan-300">
              {row.name?.charAt(0)}
            </div>
          </div>
          <div>
            <div className="font-bold text-white text-xs">{row.name}</div>
            <div className="text-[10px] text-foreground-muted">{row.email}</div>
          </div>
        </div>
      ),
    },
    { header: "Role", accessorKey: "role", sortable: true },
    { header: "Organization", accessorKey: "organization", sortable: true },
    {
      header: "Status",
      accessorKey: "status",
      cell: () => (
        <span className="flex items-center space-x-1 text-emerald-400 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Active</span>
        </span>
      ),
    },
    {
      header: "Last Active",
      accessorKey: "lastActive",
      cell: () => <span className="text-foreground-muted text-xs">2m ago</span>,
    },
  ];

  const mockUsers = [
    { id: 1, name: "Sarah Jenkins", email: "s.jenkins@allocator.ai", role: "Manager", organization: "Enterprise Allocation Team" },
    { id: 2, name: "Dr. Rajesh Sharma", email: "dean.academics@iitd.ac.in", role: "College", organization: "IIT Delhi - Dept of CSE" },
    { id: 3, name: "Marcus Chen", email: "m.chen@ai-trainers.org", role: "Trainer", organization: "Independent Specialist" },
    { id: 4, name: "Alex Vance", email: "alex.vance@allocator.ai", role: "Admin", organization: "Platform Operations" },
    { id: 5, name: "Elena Rostova", email: "e.rostova@tech-trainers.com", role: "Trainer", organization: "TechTrainers Pro" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/8 to-purple-500/10 border border-blue-500/20 p-6 sm:p-8">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.08] pointer-events-none"
            style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)", filter: "blur(50px)" }}
          />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-1">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                System Governance
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Platform Administration
            </h1>
            <p className="text-xs sm:text-sm text-foreground-muted mt-1">
              System telemetry, user directory, API health monitoring, and governance controls.
            </p>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <GlassCard key={i} glowColor={metric.color as "emerald"|"cyan"|"blue"|"amber"} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-foreground-muted">{metric.label}</span>
                  <div className={`p-2 rounded-xl ${metric.iconClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-extrabold text-white tracking-tight">{metric.value}</div>
                <div className="flex items-center space-x-1.5 mt-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${metric.dotClass}`} />
                  <span className={`text-[11px] ${metric.textClass} font-medium`}>{metric.status}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* System Health Panel */}
        <SystemHealthPanel telemetry={{
          apiGateway: { status: "OPERATIONAL", latencyMs: 38, uptimePercentage: 99.98 },
          vectorDatabase: { status: "HEALTHY", indexType: "HNSW HnswCosine", searchLatencyMs: 12 },
          aiOrchestrator: { status: "ACTIVE", model: "Gemini 1.5 Pro", avgProcessingTimeMs: 180 },
          notificationServices: { emailDeliveryRate: 99.6, whatsAppDeliveryRate: 99.4 },
        }} />

        {/* User Directory */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">User Directory</h2>
          </div>
          <DataTable
            data={mockUsers}
            columns={userColumns}
            searchPlaceholder="Search users by name, email or role..."
            filterKey="name"
            pageSize={10}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
