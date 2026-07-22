"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { Navbar } from "@/components/layout/Navbar";
import {
  Sparkles,
  Bot,
  Brain,
  Cpu,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Building2,
  BarChart3,
  Calendar,
  Layers,
  Star,
  Search,
  Lock,
  ChevronDown,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  const { setRole } = useAuth();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [simStep, setSimStep] = useState(2); // Interactive simulation node

  const agents = [
    {
      id: 1,
      name: "Request Understanding Agent",
      role: "Parses natural language requirements into structured parameters.",
      icon: Brain,
      color: "from-cyan-500 to-blue-500",
      status: "Active - Parsing",
    },
    {
      id: 2,
      name: "Vector Trainer Matcher",
      role: "Performs semantic similarity search across 4,800+ verified trainer profiles.",
      icon: Search,
      color: "from-purple-500 to-indigo-500",
      status: "Active - Scoring",
    },
    {
      id: 3,
      name: "Availability & Calendar Agent",
      role: "Cross-checks real-time schedules to prevent double bookings.",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      status: "Active - Syncing",
    },
    {
      id: 4,
      name: "Budget & Contract Optimizer",
      role: "Calculates optimal daily fee rates and autogenerates agreements.",
      icon: Cpu,
      color: "from-emerald-500 to-teal-500",
      status: "Active - Negotiating",
    },
  ];

  const features = [
    {
      icon: Bot,
      title: "Agentic AI Orchestration",
      description:
        "Autonomous specialized agents work collaboratively to evaluate skills, schedule alignment, reputation, and budget parameters in seconds.",
      color: "cyan",
    },
    {
      icon: Search,
      title: "Supabase pgvector Search",
      description:
        "High-dimensional semantic embeddings match deep technical course requirements with proven instructor experience.",
      color: "purple",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Governance",
      description:
        "Four-tier role-based security (Admin, Manager, College, Trainer) ensures complete administrative control and audit compliance.",
      color: "blue",
    },
    {
      icon: Zap,
      title: "Instant Contract Generation",
      description:
        "Automatically generates binding legal agreements and automated invoices as soon as an allocation is approved.",
      color: "emerald",
    },
  ];

  const faqs = [
    {
      q: "How does the Agentic AI matching engine work?",
      a: "Our multi-agent system utilizes Gemini 1.5 Pro to dissect unstructured requests (e.g. 'Need a 5-day PyTorch & GenAI bootcamp trainer in Lucknow'). It then queries Supabase pgvector embeddings to evaluate trainer technical depth, past ratings, calendar availability, and budget fit before ranking the top candidates.",
    },
    {
      q: "What role perspectives can I test in this MVP?",
      a: "You can seamlessly toggle between all 4 platform personas: College Representative (submits requests), Manager (reviews AI recommendations & approves allocations), Technical Trainer (manages profile & availability), and System Admin (monitors analytics & platform health).",
    },
    {
      q: "Can this system run completely on free infrastructure?",
      a: "Yes! The entire stack is architected for zero cloud cost using Next.js 15 on Vercel, FastAPI on Render, free Supabase PostgreSQL + pgvector, and Google Gemini Free API.",
    },
    {
      q: "How fast is a trainer allocation processed?",
      a: "Traditional manual allocation takes 3-5 business days. ALLOCATOR.AI delivers precision candidate rankings with 99.4% match scores in under 4 seconds.",
    },
  ];

  return (
    <AuroraBackground showRadialGradient={true}>
      {/* Navigation Header */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/[0.04] border border-cyan-500/40 text-cyan-300 text-xs font-medium mb-8 shadow-glow-cyan"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>Next-Generation Multi-Agent AI Allocation Engine</span>
          <span className="bg-cyan-500/20 text-cyan-200 text-[10px] px-2 py-0.5 rounded-full font-bold">
            v2.4 Live
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
        >
          Automate Trainer Allocations with{" "}
          <span className="gradient-text-primary">Agentic AI Intelligence</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Match universities and corporate bootcamps with world-class technical trainers in seconds. Powered by Gemini 1.5 Pro autonomous agents & vector search.
        </motion.p>

        {/* Call To Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/dashboard"
            onClick={() => setRole("MANAGER")}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-glow-cyan hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 flex items-center space-x-3"
          >
            <span>Explore Manager Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard/request"
            onClick={() => setRole("COLLEGE")}
            className="px-8 py-4 rounded-2xl bg-white/[0.05] border border-white/15 hover:border-cyan-500/40 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Submit College Requirement</span>
          </Link>
        </motion.div>

        {/* Key Metrics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: "Match Score Accuracy", value: "99.4%", sub: "Vector + Agent Verified" },
            { label: "Allocation Speed", value: "< 4s", sub: "vs 3-5 days manual" },
            { label: "Verified Trainers", value: "4,800+", sub: "Across 45+ domains" },
            { label: "Partner Institutions", value: "320+", sub: "Universities & Bootcamps" },
          ].map((stat, i) => (
            <GlassCard key={i} hoverEffect={false} className="p-4 text-center border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">{stat.value}</div>
              <div className="text-xs font-semibold text-white mt-1">{stat.label}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{stat.sub}</div>
            </GlassCard>
          ))}
        </motion.div>
      </section>

      {/* LIVE INTERACTIVE MULTI-AGENT ORCHESTRATION GRAPHIC */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            System Design Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            How Autonomous Agents Allocate Trainers
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-2">
            Click through the agent pipeline steps below to preview real-time AI decision-making.
          </p>
        </div>

        <GlassCard glowColor="purple" className="p-6 sm:p-8 border-purple-500/30">
          {/* Agent Step Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {agents.map((ag) => {
              const Icon = ag.icon;
              const isActive = simStep === ag.id;
              return (
                <button
                  key={ag.id}
                  onClick={() => setSimStep(ag.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isActive
                      ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400 shadow-glow-cyan"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-r ${ag.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                      Step 0{ag.id}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{ag.name}</div>
                    <div className="text-[11px] text-gray-400 line-clamp-2">{ag.role}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Card */}
          <div className="p-6 rounded-2xl bg-[#09090B] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  AGENT EXECUTION CONTEXT #{simStep}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {agents[simStep - 1].name}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {agents[simStep - 1].role}
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-400 pt-2">
                <div className="flex items-center space-x-1 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Gemini 1.5 Pro Context Active</span>
                </div>
                <div className="flex items-center space-x-1 text-cyan-400">
                  <Cpu className="w-4 h-4" />
                  <span>Latency ~180ms</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 p-4 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs text-cyan-300 space-y-2">
              <div className="text-[10px] text-gray-500 uppercase font-bold">Agent Telemetry JSON</div>
              <div className="text-gray-400">{`{`}</div>
              <div className="pl-4 text-purple-300">&quot;agent_id&quot;: &quot;agent_0{simStep}&quot;,</div>
              <div className="pl-4 text-cyan-300">&quot;status&quot;: &quot;OPTIMAL_MATCH&quot;,</div>
              <div className="pl-4 text-emerald-300">&quot;confidence&quot;: 0.994,</div>
              <div className="pl-4 text-blue-300">&quot;target&quot;: &quot;IIT_Delhi_Request_req_901&quot;</div>
              <div className="text-gray-400">{`}`}</div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* FEATURES GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Enterprise Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            Built for Scale, Precision & Speed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <GlassCard key={i} glowColor={feat.color as any} className="flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{feat.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-cyan-400 font-semibold group cursor-pointer">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* DEMO ROLE PERSPECTIVES SELECTOR */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <GlassCard glowColor="cyan" className="p-8 sm:p-12 text-center border-cyan-500/30 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Interactive Demo Mode
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
              Experience Platform as Any User Role
            </h2>
            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              Test full end-to-end user journeys instantly without creating separate login credentials.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { role: "COLLEGE", title: "College Portal", icon: Building2, desc: "Submit training needs", href: "/dashboard/request" },
                { role: "MANAGER", title: "Manager Control", icon: ShieldCheck, desc: "Review & approve AI matches", href: "/dashboard" },
                { role: "TRAINER", title: "Trainer Profile", icon: UserCheck, desc: "Manage availability & rate", href: "/dashboard/trainers" },
                { role: "ADMIN", title: "System Admin", icon: Bot, desc: "System telemetry & logs", href: "/dashboard/admin" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.role}
                    href={item.href}
                    onClick={() => setRole(item.role as UserRole)}
                    className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-left transition group"
                  >
                    <Icon className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-bold text-white">{item.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{item.desc}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-bold text-white mt-4">Everything You Need to Know</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <GlassCard
              key={idx}
              hoverEffect={false}
              className="p-5 border-white/10 cursor-pointer transition-all"
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{faq.q}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 transition-transform ${
                    activeFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </div>
              {activeFaq === idx && (
                <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                  {faq.a}
                </p>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-white/10 bg-[#070709] py-12 px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="font-extrabold text-white text-base">ALLOCATOR.AI</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Enterprise Agentic AI Trainer Allocation Platform built with Next.js 15, FastAPI, Gemini AI & Supabase.
            </p>
          </div>

          <div>
            <div className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Product</div>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition">Manager Dashboard</Link></li>
              <li><Link href="/dashboard/request" className="hover:text-cyan-400 transition">College Request Form</Link></li>
              <li><Link href="/dashboard/matching" className="hover:text-cyan-400 transition">AI Matching Engine</Link></li>
              <li><Link href="/dashboard/trainers" className="hover:text-cyan-400 transition">Trainer Directory</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Role Demos</div>
            <ul className="space-y-2">
              <li><button onClick={() => setRole("ADMIN")} className="hover:text-cyan-400 transition">Admin Perspective</button></li>
              <li><button onClick={() => setRole("MANAGER")} className="hover:text-cyan-400 transition">Manager Perspective</button></li>
              <li><button onClick={() => setRole("COLLEGE")} className="hover:text-cyan-400 transition">College Representative</button></li>
              <li><button onClick={() => setRole("TRAINER")} className="hover:text-cyan-400 transition">Technical Trainer</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">System Telemetry</div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span>Gemini API:</span>
                <span className="text-emerald-400 font-semibold">Connected</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Supabase pgvector:</span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Agent Pipeline:</span>
                <span className="text-cyan-400 font-semibold">v2.4 Ready</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>© 2026 ALLOCATOR.AI Inc. All rights reserved. Enterprise SaaS MVP.</div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Privacy Policy</span>
            <span className="text-gray-400">Terms of Service</span>
            <span className="text-gray-400">Security Audit</span>
          </div>
        </div>
      </footer>
    </AuroraBackground>
  );
}
