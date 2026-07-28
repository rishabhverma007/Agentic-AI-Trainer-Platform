"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { Settings, User, Lock, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const { user, role } = useAuth();
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(user?.name || "Sarah Jenkins");
  const [email, setEmail] = useState(user?.email || "s.jenkins@allocator.ai");
  const [org, setOrg] = useState(user?.organization || "Enterprise Allocation Team");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/8 to-blue-500/10 border border-cyan-500/20 p-6 sm:p-8">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.08] pointer-events-none"
            style={{ background: "radial-gradient(circle, #06B6D4, transparent 70%)", filter: "blur(50px)" }}
          />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-1">
              <Settings className="w-5 h-5 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Account & System Settings</h1>
            </div>
            <p className="text-xs text-foreground-muted">
              Manage your user persona settings, security credentials, notification preferences, and active session tokens.
            </p>
          </div>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile and preferences updated successfully!</span>
          </div>
        )}

        <GlassCard glowColor="cyan" className="p-8 border-white/5">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase text-[11px] tracking-wider mb-4 flex items-center space-x-2">
                <User className="w-4 h-4 text-cyan-400" />
                <span>User Profile Settings</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-300 mb-1">Organization / Title</label>
                <input type="text" value={org} onChange={(e) => setOrg(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400/70 transition-all" />
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <h3 className="text-sm font-bold text-white uppercase text-[11px] tracking-wider mb-4 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>Security & Credentials</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••••••"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-400/70 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">New Password</label>
                  <input type="password" placeholder="Minimum 8 characters"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-400/70 transition-all" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs glow-cyan hover:bg-cyan-400 transition">
                Save Preferences
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
