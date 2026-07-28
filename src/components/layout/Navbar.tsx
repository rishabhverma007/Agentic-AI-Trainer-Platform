"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { CommandPalette } from "@/components/ui/command-palette";
import { DemoResetButton } from "@/components/ui/demo-reset-button";
import { cn } from "@/lib/utils";
import {
  Bell,
  Search,
  Sparkles,
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
  Menu,
  X,
} from "lucide-react";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { user, switchRole, logout } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  const notifications = [
    { id: 1, title: "New Request Submitted", desc: "IIT Delhi requested PyTorch Bootcamp", time: "5m ago" },
    { id: 2, title: "Trainer Match Ready", desc: "Dr. Aris Thorne matched (96.4%)", time: "12m ago" },
    { id: 3, title: "Contract Signed", desc: "CTR-2026-901 confirmed by Dr. Aris Thorne", time: "1h ago" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass border-b border-[rgba(255,255,255,0.04)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl glass-pill text-gray-300 hover:text-white hover:border-cyan-500/40 transition-all"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-brand-gradient opacity-80 blur-sm group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-xl bg-brand-gradient p-[1px]">
                  <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white flex items-center">
                  ALLOCATOR<span className="text-cyan-400 font-mono">.AI</span>
                </span>
                <span className="text-[10px] text-foreground-muted font-mono tracking-widest uppercase">
                  Enterprise Multi-Agent Allocation
                </span>
              </div>
            </Link>
          </div>

          {/* Center Command Search Trigger */}
          <div className="hidden md:flex items-center space-x-3">
            <CommandPalette />
            <DemoResetButton />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl glass-pill hover:border-cyan-500/40 transition-all text-xs font-medium text-gray-200 group"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="capitalize text-white font-bold text-[11px]">{user?.role?.toLowerCase?.() || "manager"} Mode</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${showRoleMenu ? "rotate-180" : ""}`} />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-heavy border border-cyan-500/20 shadow-2xl p-2 z-50 animate-scale-in">
                  <div className="px-3 py-2 text-[10px] font-bold text-foreground-muted uppercase tracking-wider border-b border-white/5">
                    Switch Demo Perspective
                  </div>
                  <div className="py-1 space-y-1">
                    {[
                      { role: "manager", label: "Allocation Manager", icon: Briefcase, color: "cyan" },
                      { role: "college", label: "College Dean / Partner", icon: Building2, color: "purple" },
                      { role: "trainer", label: "Technical Trainer", icon: GraduationCap, color: "emerald" },
                      { role: "admin", label: "Platform Admin", icon: Layers, color: "blue" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.role}
                          onClick={() => { switchRole(item.role); setShowRoleMenu(false); }}
                          className={cn(
                            "w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all",
                            "hover:bg-white/5 text-gray-200 hover:text-white group"
                          )}
                        >
                          <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", `text-${item.color}-400`)} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
                className="relative p-2 rounded-xl glass-pill text-gray-300 hover:text-white hover:border-cyan-500/40 transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400">
                  <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping" />
                </span>
              </button>

              {showNotificationDrawer && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-heavy border border-cyan-500/20 shadow-2xl p-4 z-50 animate-scale-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
                    <span className="text-xs font-bold text-white">Notifications</span>
                    <span className="text-[10px] font-mono text-cyan-400">3 Unread</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5 hover:bg-white/[0.05] transition-colors">
                        <div className="flex justify-between text-xs font-bold text-cyan-300">
                          <span>{n.title}</span>
                          <span className="text-[10px] font-mono text-foreground-muted">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-300">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <div className="flex items-center space-x-2 pl-2 border-l border-white/5">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-xl bg-brand-gradient opacity-60 blur-sm" />
                <div className="relative w-full h-full rounded-xl bg-brand-gradient p-[1px]">
                  <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center text-xs font-bold text-cyan-300">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </header>
    </>
  );
}
