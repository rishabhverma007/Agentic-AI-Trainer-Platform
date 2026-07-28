"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingOrb } from "@/components/ui/floating-orb";
import { Sparkles, Mail, Lock, User, Building, ArrowRight, ShieldCheck, Building2, UserCheck } from "lucide-react";

export default function SignupPage() {
  const { loginAs } = useAuth();
  const router = useRouter();
  const [role, setRoleState] = useState<UserRole>("COLLEGE");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role);
    if (role === "COLLEGE") router.push("/dashboard/request");
    else if (role === "TRAINER") router.push("/dashboard/trainers");
    else router.push("/dashboard");
  };

  return (
    <AuroraBackground showRadialGradient={true} className="justify-center py-12 px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
        <FloatingOrb size={500} speed={0.5} intensity={0.3} color1="#A855F7" color2="#3B82F6" color3="#06B6D4" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
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
          <h2 className="text-xl font-bold text-white">Create Enterprise Account</h2>
          <p className="text-xs text-foreground-muted mt-1">
            Join the agentic AI trainer allocation network
          </p>
        </div>

        <GlassCard glowColor="purple" className="p-8 border-purple-500/25">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-foreground-muted uppercase tracking-wider mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { r: "COLLEGE" as UserRole, l: "College", icon: Building2, color: "purple", selectedClass: "bg-purple-500/15 border-purple-400/50 text-purple-300 glow-purple" },
                  { r: "TRAINER" as UserRole, l: "Trainer", icon: UserCheck, color: "emerald", selectedClass: "bg-emerald-500/15 border-emerald-400/50 text-emerald-300 glow-emerald" },
                  { r: "MANAGER" as UserRole, l: "Manager", icon: ShieldCheck, color: "cyan", selectedClass: "bg-cyan-500/15 border-cyan-400/50 text-cyan-300 glow-cyan" },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = role === item.r;
                  return (
                    <button
                      key={item.r}
                      type="button"
                      onClick={() => setRoleState(item.r)}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                        isSelected
                          ? item.selectedClass
                          : "bg-white/[0.02] border-white/5 text-foreground-muted hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] font-semibold">{item.l}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-foreground-muted absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-foreground-muted focus:outline-none focus:border-purple-400/70 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Organization / College Name</label>
              <div className="relative">
                <Building className="w-4 h-4 text-foreground-muted absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. IIT Delhi"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-foreground-muted focus:outline-none focus:border-purple-400/70 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-foreground-muted absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-foreground-muted focus:outline-none focus:border-purple-400/70 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-foreground-muted absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-foreground-muted focus:outline-none focus:border-purple-400/70 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center space-x-2 mt-6"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-foreground-muted">
            Already registered?{" "}
            <Link href="/auth/login" className="text-purple-400 font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </GlassCard>
      </div>
    </AuroraBackground>
  );
}
