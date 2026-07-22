"use client";

import React, { useState } from "react";
import { useIntelligence } from "@/hooks/use-intelligence";
import { useAnalytics } from "@/hooks/use-analytics";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/ui/kpi-card";
import {
  RevenueAreaChart,
  SkillDemandBarChart,
  StatusDonutChart,
  CompetencyRadarChart,
} from "@/components/ui/analytics-charts";
import { AIInsightsPanel } from "@/components/ui/ai-insights-panel";
import { LeaderboardWidget } from "@/components/ui/leaderboard-widget";
import { SystemHealthPanel } from "@/components/ui/system-health-panel";
import { ReportGeneratorModal } from "@/components/ui/report-generator-modal";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Building2,
  Brain,
  Download,
  Calendar,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function ExecutiveAnalyticsPage() {
  const { data: intelligence } = useIntelligence();
  const { data: analytics } = useAnalytics();
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Executive Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 border border-purple-500/30">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Executive Intelligence Platform
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Platform Analytics & AI Predictive Insights
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Real-time telemetry, domain demand forecasts, vector match accuracy, and system health metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Filter Selector */}
            <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-xl border border-white/10 text-xs">
              {["Today", "Last 7 Days", "Last 30 Days", "Q3 2026"].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateFilter(range)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    dateFilter === range ? "bg-cyan-500 text-black shadow-glow-cyan" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-glow-cyan hover:shadow-glow-blue transition flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Executive Report</span>
            </button>
          </div>
        </div>

        {/* Real-time Animated KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Monthly Revenue"
            value={formatCurrency(analytics?.totalRevenue || 4850000)}
            change="+18.4%"
            subtext="vs last month"
            icon={TrendingUp}
            glowColor="emerald"
          />
          <KPICard
            title="Active Allocations"
            value={analytics?.totalAssignments || 150}
            change="+24.2%"
            subtext="99.4% match rating"
            icon={Award}
            glowColor="cyan"
          />
          <KPICard
            title="AI Match Accuracy"
            value="98.2%"
            change="+2.1%"
            subtext="Gemini 1.5 Pro vector score"
            icon={Brain}
            glowColor="purple"
          />
          <KPICard
            title="Verified Trainer Pool"
            value={analytics?.totalTrainers || 4820}
            change="+120"
            subtext="new profiles this week"
            icon={Users}
            glowColor="blue"
          />
        </div>

        {/* AI Insights & Predictive Demand Section */}
        <AIInsightsPanel insights={intelligence?.insights || []} />

        {/* Recharts Data Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueAreaChart />
          <SkillDemandBarChart />
          <StatusDonutChart />
          <CompetencyRadarChart />
        </div>

        {/* Leaderboard & System Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeaderboardWidget leaderboards={intelligence?.leaderboards} />
          <SystemHealthPanel telemetry={intelligence?.telemetry} />
        </div>

        {/* Export Modal */}
        {showReportModal && (
          <ReportGeneratorModal onClose={() => setShowReportModal(false)} />
        )}

      </div>
    </DashboardLayout>
  );
}
