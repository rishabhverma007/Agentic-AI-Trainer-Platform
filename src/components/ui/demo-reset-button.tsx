"use client";

import React, { useState } from "react";
import { RotateCcw, CheckCircle2, Sparkles } from "lucide-react";
import { apiClient } from "@/lib/api-client";

export function DemoResetButton() {
  const [resetting, setResetting] = useState(false);
  const [done, setDone] = useState(false);

  const handleReset = async () => {
    setResetting(true);
    try {
      await apiClient.post("/admin-tools/reset-demo");
    } catch (err) {
      console.warn("Reset API warning:", err);
    }
    setTimeout(() => {
      setResetting(false);
      setDone(true);
      setTimeout(() => {
        setDone(false);
        window.location.reload();
      }, 1000);
    }, 800);
  };

  return (
    <button
      onClick={handleReset}
      disabled={resetting || done}
      className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-glow-purple hover:bg-purple-500/30 transition flex items-center space-x-1.5"
      title="Reset demo data for client presentation"
    >
      {done ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Demo Reset!</span>
        </>
      ) : resetting ? (
        <>
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Resetting...</span>
        </>
      ) : (
        <>
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </>
      )}
    </button>
  );
}
