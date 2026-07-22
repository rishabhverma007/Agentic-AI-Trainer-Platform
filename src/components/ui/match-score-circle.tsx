"use client";

import React from "react";
import { motion } from "framer-motion";
import { getScoreColor } from "@/lib/utils";

interface MatchScoreCircleProps {
  score: number;
  size?: number;
}

export function MatchScoreCircle({ score, size = 72 }: MatchScoreCircleProps) {
  const colors = getScoreColor(score);
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const label =
    score >= 90
      ? "Excellent Match"
      : score >= 80
      ? "Strong Match"
      : "Average Match";

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            className={colors.text}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-sm font-extrabold font-mono ${colors.text}`}>
            {score}%
          </span>
        </div>
      </div>

      <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${colors.text}`}>
        {label}
      </span>
    </div>
  );
}
