"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
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
      <div className="w-full max-w-md mx-auto">
        
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
          <h2 className="text-xl font-bold text-white">Create Enterprise Account</h2>
          <p className="text-xs text-gray-400 mt-1">
            Join the agentic AI trainer allocation network
          </p>
        </div>

        <GlassCard glowColor="purple" className="p-8 border-purple-500/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { r: "COLLEGE" as UserRole, l: "College", icon: Building2 },
                  { r: "TRAINER" as UserRole, l: "Trainer", icon: UserCheck },
                  { r: "MANAGER" as UserRole, l: "Manager", icon: ShieldCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = role === item.r;
                  return (
                    <button
                      key={item.r}
                      type="button"
                      onClick={() => setRoleState(item.r)}
                      className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                        isSelected
                          ? "bg-purple-500/20 border-purple-400 text-purple-300 shadow-glow-purple"
                          : "bg-white/[0.02] border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
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
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full bg-white/[0.04] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Organization / College Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. IIT Delhi"
                  className="w-full bg-white/[0.04] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  className="w-full bg-white/[0.04] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-white/[0.04] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 text-white font-bold text-sm shadow-glow-purple hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition flex items-center justify-center space-x-2 mt-6"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
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
