"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import {
  Search,
  Bot,
  UserCheck,
  Building2,
  BarChart3,
  Shield,
  FileText,
  Sparkles,
  Command,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CommandPalette({ isOpen: externalIsOpen, onClose }: CommandPaletteProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { setRole, role } = useAuth();
  const router = useRouter();

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (onClose) onClose();
    else setInternalIsOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setInternalIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "action-match",
      title: "New AI Trainer Allocation Request",
      category: "AI Actions",
      icon: Sparkles,
      action: () => {
        setRole("COLLEGE");
        router.push("/dashboard/request");
        handleClose();
      },
    },
    {
      id: "action-manager",
      title: "Switch View to Manager Dashboard",
      category: "Role Switcher",
      icon: Shield,
      action: () => {
        setRole("MANAGER");
        router.push("/dashboard");
        handleClose();
      },
    },
    {
      id: "action-college",
      title: "Switch View to College Portal",
      category: "Role Switcher",
      icon: Building2,
      action: () => {
        setRole("COLLEGE");
        router.push("/dashboard/request");
        handleClose();
      },
    },
    {
      id: "action-trainer",
      title: "Switch View to Trainer Directory",
      category: "Role Switcher",
      icon: UserCheck,
      action: () => {
        setRole("TRAINER");
        router.push("/dashboard/trainers");
        handleClose();
      },
    },
    {
      id: "action-admin",
      title: "Switch View to System Admin",
      category: "Role Switcher",
      icon: Bot,
      action: () => {
        setRole("ADMIN");
        router.push("/dashboard/admin");
        handleClose();
      },
    },
    {
      id: "action-analytics",
      title: "View Platform Intelligence & Analytics",
      category: "Navigation",
      icon: BarChart3,
      action: () => {
        router.push("/dashboard/analytics");
        handleClose();
      },
    },
  ];

  const filteredActions = actions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0D0E15] border border-white/15 rounded-2xl shadow-2xl overflow-hidden glass-panel">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, jump to role, or search trainers... (Esc to exit)"
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
            autoFocus
          />
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Bot className="w-8 h-8 mx-auto text-cyan-400/60 mb-2 animate-pulse" />
              No commands matching &quot;{query}&quot;
            </div>
          ) : (
            filteredActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 hover:border-white/10 border border-transparent transition text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-500/40 text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-cyan-300">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400">{item.category}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:border-white/20">
                    Jump ↵
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-gray-300">
              <Command className="w-3 h-3" /> K
            </span>
            <span>Global Search</span>
          </div>
          <div>Current Role: <span className="text-cyan-400 font-semibold">{role}</span></div>
        </div>
      </div>
    </div>
  );
}
