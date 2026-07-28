"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
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
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { role, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

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
      name: "Trainer Matching",
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
      name: "Assignments",
      href: "/dashboard/assignments",
      icon: FileText,
      roles: ["ADMIN", "MANAGER", "COLLEGE", "TRAINER"],
    },
    {
      name: "Schedule",
      href: "/dashboard/calendar",
      icon: Calendar,
      roles: ["ADMIN", "MANAGER", "COLLEGE", "TRAINER"],
    },
    {
      name: "Intelligence",
      href: "/dashboard/analytics",
      icon: BarChart3,
      roles: ["ADMIN", "MANAGER"],
    },
    {
      name: "Governance",
      href: "/dashboard/admin",
      icon: ShieldAlert,
      roles: ["ADMIN"],
    },
  ];

  const filteredNav = navigation.filter((item) => item.roles.includes(role));

  return (
    <aside
      className={cn(
        "fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)]",
        "glass-heavy border-r border-[rgba(255,255,255,0.04)]",
        "flex flex-col justify-between",
        "transition-all duration-300 ease-out",
        collapsed ? "w-20" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="space-y-6 p-4 flex-1 overflow-y-auto">
        {/* Active Role Card */}
        <div className={cn(
          "rounded-2xl bg-white/[0.03] border border-white/5",
          collapsed ? "p-3" : "p-4"
        )}>
          <div className={cn(
            "text-[10px] uppercase font-bold text-foreground-muted tracking-wider",
            collapsed && "text-center"
          )}>
            {collapsed ? (
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mx-auto" />
            ) : (
              "Active Perspective"
            )}
          </div>
          {!collapsed && (
            <>
              <div className="text-sm font-semibold text-white mt-0.5 flex items-center justify-between">
                <span className="capitalize">{user?.role?.toLowerCase?.() || "Manager"} Portal</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-foreground-muted mt-1 truncate">
                {user?.organization || user?.email}
              </p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {!collapsed && (
            <div className="px-3 text-[10px] font-bold text-foreground-muted uppercase tracking-wider mb-2">
              Navigation
            </div>
          )}

          {filteredNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center justify-between rounded-xl text-xs font-medium transition-all duration-200",
                  collapsed ? "px-3 py-3 justify-center" : "px-3 py-2.5",
                  isActive
                    ? "bg-[rgba(6,182,212,0.1)] text-cyan-300 border border-cyan-500/25 glow-cyan"
                    : "text-foreground-muted hover:text-white hover:bg-white/[0.04] border border-transparent"
                )}
                title={collapsed ? item.name : undefined}
              >
                <div className={cn("flex items-center", collapsed ? "" : "space-x-3")}>
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-all duration-200",
                      "group-hover:scale-110 group-hover:text-cyan-400",
                      isActive ? "text-cyan-400" : "text-foreground-muted"
                    )}
                  />
                  {!collapsed && <span>{item.name}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                    {item.badge}
                  </span>
                )}
                {!collapsed && isActive && !item.badge && (
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* AI Assistant Banner */}
      {!collapsed && (
        <div className="p-4 border-t border-white/5">
          <div className="rounded-2xl bg-gradient-to-r from-cyan-500/8 via-purple-500/8 to-blue-500/8 border border-white/5 p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Gemini 1.5 Pro AI</div>
                <div className="text-[10px] text-foreground-muted">Agentic Allocator Active</div>
              </div>
            </div>
            <div className="text-[10px] text-foreground-muted leading-relaxed">
              Vector matching 4,800+ profiles with real-time budget optimization.
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 rounded-full bg-elevated border border-white/10 items-center justify-center text-foreground-muted hover:text-white transition-all z-50"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft className={cn("w-3 h-3 transition-transform", collapsed && "rotate-180")} />
      </button>
    </aside>
  );
}
