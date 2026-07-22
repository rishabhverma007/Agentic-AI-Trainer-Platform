"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { GlassCard } from "./glass-card";

const REVENUE_TREND_DATA = [
  { month: "Jan", revenue: 2400000, bootcamps: 18 },
  { month: "Feb", revenue: 2900000, bootcamps: 22 },
  { month: "Mar", revenue: 3500000, bootcamps: 28 },
  { month: "Apr", revenue: 3200000, bootcamps: 25 },
  { month: "May", revenue: 4100000, bootcamps: 34 },
  { month: "Jun", revenue: 4850000, bootcamps: 38 },
];

const SKILL_DEMAND_DATA = [
  { name: "GenAI", count: 48 },
  { name: "PyTorch", count: 36 },
  { name: "Next.js 15", count: 32 },
  { name: "Cybersecurity", count: 24 },
  { name: "MLOps", count: 20 },
  { name: "AWS", count: 18 },
];

const STATUS_DONUT_DATA = [
  { name: "Completed", value: 42, color: "#10B981" },
  { name: "Assigned", value: 28, color: "#06B6D4" },
  { name: "Matched", value: 18, color: "#3B82F6" },
  { name: "AI Matching", value: 12, color: "#A855F7" },
];

const RADAR_DATA = [
  { subject: "AI/ML Depth", A: 98 },
  { subject: "Schedule Sync", A: 96 },
  { subject: "Budget Fit", A: 92 },
  { subject: "Rating Score", A: 99 },
  { subject: "Student Satisfaction", A: 97 },
];

export function RevenueAreaChart() {
  return (
    <GlassCard glowColor="cyan" className="p-6 border-white/10 space-y-3">
      <h3 className="text-sm font-bold text-white">Monthly Platform Revenue Growth (INR ₹)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_TREND_DATA}>
            <defs>
              <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
            <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(val) => `₹${val / 100000}L`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0D0E15", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}
              formatter={(val: any) => [`₹${(Number(val) / 100000).toFixed(1)} Lakhs`, "Revenue"]}
            />
            <Area type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#revenueGlow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export function SkillDemandBarChart() {
  return (
    <GlassCard glowColor="purple" className="p-6 border-white/10 space-y-3">
      <h3 className="text-sm font-bold text-white">Most Requested Technical Course Domains</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SKILL_DEMAND_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} />
            <YAxis stroke="#9CA3AF" fontSize={11} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0D0E15", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}
            />
            <Bar dataKey="count" fill="#A855F7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export function StatusDonutChart() {
  return (
    <GlassCard glowColor="emerald" className="p-6 border-white/10 space-y-3">
      <h3 className="text-sm font-bold text-white">Request Lifecycle Distribution</h3>
      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={STATUS_DONUT_DATA}
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {STATUS_DONUT_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#0D0E15", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export function CompetencyRadarChart() {
  return (
    <GlassCard glowColor="blue" className="p-6 border-white/10 space-y-3">
      <h3 className="text-sm font-bold text-white">System Competency & Match Quality</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={RADAR_DATA}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" fontSize={10} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" fontSize={9} />
            <Radar name="Platform Score" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
