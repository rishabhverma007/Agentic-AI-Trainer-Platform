"use client";

import React from "react";
import { GlassCard } from "./glass-card";
import { Server, Database, Bot, CheckCircle2, Activity, Wifi } from "lucide-react";

export function SystemHealthPanel({ telemetry }: { telemetry?: any }) {
  const data = telemetry || {
    apiGateway: { status: "OPERATIONAL", latencyMs: 38, uptimePercentage: 99.98 },
    vectorDatabase: { status: "HEALTHY", indexType: "HNSW HnswCosine", searchLatencyMs: 12 },
    aiOrchestrator: { status: "ACTIVE", model: "Gemini 1.5 Pro", avgProcessingTimeMs: 180 },
    notificationServices: { emailDeliveryRate: 99.6, whatsAppDeliveryRate: 99.4 },
  };

  return (
    <GlassCard glowColor="emerald" className="p-6 border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h3 className="text-base font-bold text-white">Live Infrastructure Health & Telemetry</h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>All Systems Operational</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>FastAPI Gateway</span>
            <Server className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-sm font-bold text-white">{data.apiGateway.latencyMs}ms</div>
          <div className="text-[10px] text-emerald-400 font-mono">{data.apiGateway.uptimePercentage}% uptime</div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>Supabase pgvector</span>
            <Database className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-sm font-bold text-white">{data.vectorDatabase.searchLatencyMs}ms query</div>
          <div className="text-[10px] text-cyan-400 font-mono">4,820 HNSW Index</div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>Gemini AI Agents</span>
            <Bot className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-sm font-bold text-white">{data.aiOrchestrator.avgProcessingTimeMs}ms</div>
          <div className="text-[10px] text-purple-400 font-mono">Gemini 1.5 Pro</div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>Email & WhatsApp</span>
            <Wifi className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-sm font-bold text-white">{data.notificationServices.emailDeliveryRate}%</div>
          <div className="text-[10px] text-blue-400 font-mono">Delivery Success</div>
        </div>
      </div>
    </GlassCard>
  );
}
