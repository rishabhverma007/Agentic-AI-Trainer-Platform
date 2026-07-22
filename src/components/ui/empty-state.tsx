"use client";

import React from "react";
import { GlassCard } from "./glass-card";
import { Bot, Sparkles, Inbox, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export function EmptyState({
  title,
  description,
  actionText,
  onAction,
  icon: Icon = Inbox,
}: EmptyStateProps) {
  return (
    <GlassCard hoverEffect={false} className="p-12 text-center border-dashed border-white/15 max-w-md mx-auto my-8">
      <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 animate-pulse" />
        <Icon className="w-8 h-8 text-cyan-400 relative z-10" />
      </div>

      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed mb-6">{description}</p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-glow-cyan hover:shadow-glow-blue transition flex items-center space-x-2 mx-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{actionText}</span>
        </button>
      )}
    </GlassCard>
  );
}
