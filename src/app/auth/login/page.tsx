"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingOrb } from "@/components/ui/floating-orb";
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, Building2, UserCheck, Bot } from "lucide-react";

export default function LoginPage() {
  const { loginAs, setRole } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("s.jenkins@allocator.ai");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("MANAGER");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRole);
    if (selectedRole === "COLLEGE") router.push("/dashboard/request");
    else if (selectedRole === "TRAINER") router.push("/dashboard/trainers");
    else if (selectedRole === "ADMIN") router.push("/dashboard/admin");
    else router.push("/dashboard");
  };

  const quickRoles = [
    { role: "MANAGER" as UserRole, label: "Manager", icon: ShieldCheck, color: "cyan" },
    { role: "COLLEGE" as UserRole, label: "College", icon: Building2, color: "purple" },
    { role: "TRAINER" as UserRole, label: "Trainer", icon: UserCheck, color: "emerald" },
    { role: "ADMIN" as UserRole, label: "Admin", icon: Bot, color: "blue" },
  ];

  return (
    <AuroraBackground showRadialGradient={true} className="justify-center py-12 px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <FloatingOrb size={500} speed={0.5} intensity={0.3} />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-2xl bg-brand-gradient opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full h-full rounded-2xl bg-brand-gradient p-[1px]">
                <div className="w-full h-full bg-background rounded-[15px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              ALLOCATOR<span className="text-cyan-400">.AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Welcome back</h2>
          <p className="text-xs text-foreground-muted mt-1">
            Access the Agentic AI Trainer Allocation Platform
          </p>
        </div>

        <GlassCard glowColor="cyan" className="p-8 border-cyan-500/25">
          {/* Demo Role Selector */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold text-foreground-muted uppercase tracking-wider mb-2">
              Select Demo Role Persona
            </label>
            <div className="grid grid-cols-4 gap-2">
              {quickRoles.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.role;
                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r.role);
                      const emails: Record<string, string> = {
                        MANAGER: "s.jenkins@allocator.ai",
                        COLLEGE: "dean.academics@iitd.ac.in",
                        TRAINER: "m.chen@ai-trainers.org",
                        ADMIN: "alex.vance@allocator.ai",
                      };
                      setEmail(emails[r.role]);
                    }}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-400/50 text-cyan-300 glow-cyan"
                        : "bg-white/[0.02] border-white/5 text-foreground-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-semibold">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-foreground-muted absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-foreground-muted focus:outline-none focus:border-cyan-400/70 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-300">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-cyan-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-foreground-muted absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-foreground-muted focus:outline-none focus:border-cyan-400/70 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-6"
            >
              <span>Sign In as {selectedRole}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-foreground-muted">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-cyan-400 font-semibold hover:underline">
              Create account
            </Link>
          </div>
        </GlassCard>
      </div>
    </AuroraBackground>
  );
}
