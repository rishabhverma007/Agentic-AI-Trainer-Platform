"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
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
    { role: "MANAGER" as UserRole, label: "Manager", icon: ShieldCheck },
    { role: "COLLEGE" as UserRole, label: "College", icon: Building2 },
    { role: "TRAINER" as UserRole, label: "Trainer", icon: UserCheck },
    { role: "ADMIN" as UserRole, label: "Admin", icon: Bot },
  ];

  return (
    <AuroraBackground showRadialGradient={true} className="justify-center py-12 px-4">
      <div className="w-full max-w-md mx-auto">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-600 p-[1px] shadow-glow-cyan">
              <div className="w-full h-full bg-[#09090B] rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              ALLOCATOR<span className="text-cyan-400">.AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Welcome back</h2>
          <p className="text-xs text-gray-400 mt-1">
            Access the Agentic AI Trainer Allocation Platform
          </p>
        </div>

        <GlassCard glowColor="cyan" className="p-8 border-cyan-500/30">
          
          {/* Demo Role Selector */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
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
                      if (r.role === "COLLEGE") setEmail("dean.academics@iitd.ac.in");
                      else if (r.role === "TRAINER") setEmail("m.chen@ai-trainers.org");
                      else if (r.role === "ADMIN") setEmail("alex.vance@allocator.ai");
                      else setEmail("s.jenkins@allocator.ai");
                    }}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow-cyan"
                        : "bg-white/[0.02] border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
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
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-300">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-glow-cyan hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition flex items-center justify-center space-x-2 mt-6"
            >
              <span>Sign In as {selectedRole}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
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
