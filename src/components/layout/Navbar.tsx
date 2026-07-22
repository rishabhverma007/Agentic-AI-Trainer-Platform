"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { CommandPalette } from "@/components/ui/command-palette";
import { DemoResetButton } from "@/components/ui/demo-reset-button";
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
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#09090B]/80 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-600 p-0.5 shadow-glow-cyan group-hover:shadow-glow-purple transition duration-300">
                <div className="w-full h-full bg-[#09090B] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-wider text-white flex items-center">
                  ALLOCATOR<span className="text-cyan-400 font-mono">.AI</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
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

          {/* Right Actions & Demo Role Switcher */}
          <div className="flex items-center space-x-4">
            
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-cyan-500/50 transition text-xs font-medium text-gray-200"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="capitalize text-white font-bold">{user?.role} Mode</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0D0E15] border border-cyan-500/30 shadow-2xl p-2 z-50 glass-panel animate-scale-up">
                  <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-white/10">
                    Switch Demo Perspective
                  </div>
                  <div className="py-1 space-y-1">
                    <button
                      onClick={() => { switchRole("manager"); setShowRoleMenu(false); }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-cyan-500/10 text-gray-200 hover:text-cyan-300 transition"
                    >
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      <span>Allocation Manager</span>
                    </button>

                    <button
                      onClick={() => { switchRole("college"); setShowRoleMenu(false); }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-purple-500/10 text-gray-200 hover:text-purple-300 transition"
                    >
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span>College Dean / Partner</span>
                    </button>

                    <button
                      onClick={() => { switchRole("trainer"); setShowRoleMenu(false); }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-emerald-500/10 text-gray-200 hover:text-emerald-300 transition"
                    >
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <span>Technical Trainer</span>
                    </button>

                    <button
                      onClick={() => { switchRole("admin"); setShowRoleMenu(false); }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-blue-500/10 text-gray-200 hover:text-blue-300 transition"
                    >
                      <Layers className="w-4 h-4 text-blue-400" />
                      <span>Platform Admin</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
                className="relative p-2 rounded-xl bg-white/[0.05] border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white transition"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </button>

              {showNotificationDrawer && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0D0E15] border border-cyan-500/30 shadow-2xl p-4 z-50 glass-panel animate-scale-up">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                    <span className="text-xs font-bold text-white">Notifications</span>
                    <span className="text-[10px] font-mono text-cyan-400">3 Unread</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                        <div className="flex justify-between text-xs font-bold text-cyan-300">
                          <span>{n.title}</span>
                          <span className="text-[10px] font-mono text-gray-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-300">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[#09090B] rounded-[10px] flex items-center justify-center text-xs font-bold text-cyan-300">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </div>
            </div>

          </div>

        </div>
      </header>
    </>
  );
}
