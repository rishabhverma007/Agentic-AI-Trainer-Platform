"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FilePlus,
  Users,
  BarChart3,
  Bot,
  Calendar,
  FileText,
  Settings,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { role, user } = useAuth();

  const navigation = [
    {
      name: "Dashboard Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["ADMIN", "MANAGER", "COLLEGE", "TRAINER"],
    },
    {
      name: "Submit Requirement",
      href: "/dashboard/request",
      icon: FilePlus,
      roles: ["COLLEGE", "MANAGER", "ADMIN"],
      badge: "AI Powered",
    },
    {
      name: "Trainer Matching Engine",
      href: "/dashboard/matching",
      icon: Bot,
      roles: ["MANAGER", "COLLEGE", "ADMIN"],
      badge: "Vector AI",
    },
    {
      name: "Trainer Directory",
      href: "/dashboard/trainers",
      icon: Users,
      roles: ["ADMIN", "MANAGER", "COLLEGE", "TRAINER"],
    },
    {
      name: "Assignments & Contracts",
      href: "/dashboard/assignments",
      icon: FileText,
      roles: ["ADMIN", "MANAGER", "COLLEGE", "TRAINER"],
    },
    {
      name: "Schedule & Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
      roles: ["ADMIN", "MANAGER", "COLLEGE", "TRAINER"],
    },
    {
      name: "Platform Intelligence",
      href: "/dashboard/analytics",
      icon: BarChart3,
      roles: ["ADMIN", "MANAGER"],
    },
    {
      name: "System Governance",
      href: "/dashboard/admin",
      icon: ShieldAlert,
      roles: ["ADMIN"],
    },
  ];

  const filteredNav = navigation.filter((item) => item.roles.includes(role));

  return (
    <aside
      className={`fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-[#0B0C10]/90 backdrop-blur-2xl border-r border-white/10 p-4 flex flex-col justify-between transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="space-y-6">
        {/* Active Role Card Header */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Active Perspective
          </div>
          <div className="text-sm font-semibold text-white mt-0.5 flex items-center justify-between">
            <span>{user?.role} Portal</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-gray-400 mt-1 truncate">
            {user?.organization || user?.email}
          </p>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Navigation
          </div>

          {filteredNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge ? (
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                ) : isActive ? (
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* AI Assistant Banner Footer */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 border border-white/10 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Gemini 1.5 Pro AI</div>
            <div className="text-[10px] text-gray-400">Agentic Allocator Active</div>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 leading-relaxed">
          Vector matching 4,800+ profiles with real-time budget optimization.
        </div>
      </div>
    </aside>
  );
}
