"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRequests } from "@/hooks/use-requests";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { DataTable, Column } from "@/components/ui/data-table";
import { AIPulseLoader } from "@/components/ui/ai-pulse-loader";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, Building2, Send, CheckCircle2, Clock } from "lucide-react";

const requestSchema = z.object({
  college_name: z.string().min(3, "College name is required"),
  location: z.string().min(2, "Location is required"),
  technology: z.string().min(2, "Technology is required"),
  skills_required_json: z.string().min(2, "Comma-separated skills required"),
  budget_per_day: z.coerce.number().min(1000, "Daily budget must be at least ₹1,000"),
  start_date: z.string().min(1, "Start date required"),
  end_date: z.string().min(1, "End date required"),
  training_mode: z.enum(["Offline", "Online", "Hybrid"]),
  number_of_students: z.coerce.number().min(10, "Minimum 10 students"),
  duration_days: z.coerce.number().min(1, "Minimum 1 day"),
  remarks: z.string().optional(),
});

type RequestFormData = z.infer<typeof requestSchema>;

export default function CollegeRequestPage() {
  const { data: requests = [], isLoading, createRequest, isCreating } = useRequests();
  const [showAILoader, setShowAILoader] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      college_name: "IIT Delhi - Dept of CSE",
      location: "New Delhi",
      technology: "Generative AI & Agentic Workflows",
      skills_required_json: "Python, GenAI, LangChain, FastAPI",
      budget_per_day: 25000,
      start_date: "2026-08-10",
      end_date: "2026-08-15",
      training_mode: "Offline",
      number_of_students: 120,
      duration_days: 5,
      remarks: "Requires expert trainer with hands-on lab projects.",
    },
  });

  const onSubmit = async (data: RequestFormData) => {
    setShowAILoader(true);
    const skillsArray = data.skills_required_json.split(",").map((s) => s.trim());
    await createRequest({
      ...data,
      skills_required_json: skillsArray,
    });
  };

  const columns: Column<any>[] = [
    {
      header: "College Name",
      accessorKey: "collegeName",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-bold text-white">{row.collegeName}</div>
          <div className="text-[10px] text-foreground-muted">{row.location}</div>
        </div>
      ),
    },
    {
      header: "Technology Requirement",
      accessorKey: "technology",
      sortable: true,
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
        <span className="font-mono text-emerald-400 font-semibold">{formatCurrency(row.budgetPerDay)}</span>
      ),
    },
    {
      header: "Mode & Class Size",
      accessorKey: "trainingMode",
      cell: (row) => <span>{row.trainingMode} ({row.numberOfStudents} stds)</span>,
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/8 to-blue-500/10 border border-cyan-500/20 p-6 sm:p-8">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.08] pointer-events-none"
            style={{ background: "radial-gradient(circle, #06B6D4, transparent 70%)", filter: "blur(50px)" }}
          />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-1">
              <Building2 className="w-5 h-5 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Submit Training Requirement</h1>
            </div>
            <p className="text-xs text-foreground-muted">
              Fill out your bootcamp parameters to trigger the multi-agent AI trainer allocation engine.
            </p>
          </div>
        </div>

        {/* AI Processing Loader */}
        {showAILoader ? (
          <AIPulseLoader
            onComplete={() => {
              setShowAILoader(false);
              setSubmittedMessage(true);
              reset();
            }}
          />
        ) : (
          <GlassCard glowColor="cyan" className="p-8 border-cyan-500/25 max-w-4xl mx-auto">
            {submittedMessage && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-white font-bold">Requirement Submitted & AI Matched!</strong>
                  Your request has been processed through Gemini 1.5 Pro vector search. Top trainer candidates are ready for review.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">College Name</label>
                  <input {...register("college_name")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                  {errors.college_name && <span className="text-[10px] text-red-400">{errors.college_name.message}</span>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Location</label>
                  <input {...register("location")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                  {errors.location && <span className="text-[10px] text-red-400">{errors.location.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Primary Technology</label>
                  <input {...register("technology")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                  {errors.technology && <span className="text-[10px] text-red-400">{errors.technology.message}</span>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Required Skills (Comma separated)</label>
                  <input {...register("skills_required_json")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                  {errors.skills_required_json && <span className="text-[10px] text-red-400">{errors.skills_required_json.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Budget Per Day (INR ₹)</label>
                  <input type="number" {...register("budget_per_day")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Training Mode</label>
                  <select {...register("training_mode")}
                    className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all">
                    <option value="Offline">Offline (On Campus)</option>
                    <option value="Online">Online (Live Virtual)</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Number of Students</label>
                  <input type="number" {...register("number_of_students")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Start Date</label>
                  <input type="date" {...register("start_date")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">End Date</label>
                  <input type="date" {...register("end_date")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Duration (Days)</label>
                  <input type="number" {...register("duration_days")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Remarks & Project Requirements</label>
                <textarea rows={3} {...register("remarks")}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
              </div>

              <button type="submit" disabled={isCreating}
                className="btn-primary w-full">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Initiate Agentic AI Allocation</span>
              </button>
            </form>
          </GlassCard>
        )}

        {/* Submissions History */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>Submitted Institution Requests</span>
          </h2>
          <DataTable
            data={requests}
            columns={columns}
            isLoading={isLoading}
            searchPlaceholder="Search submitted requests..."
            filterKey="collegeName"
            pageSize={5}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
