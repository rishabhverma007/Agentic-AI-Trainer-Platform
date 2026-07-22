"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-white/[0.06] border border-white/5 relative overflow-hidden shimmer-line",
        className
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-[#12131A]/60 border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-3 w-40" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full rounded-2xl bg-[#12131A]/60 border border-white/10 p-4 space-y-3">
      <div className="flex justify-between pb-3 border-b border-white/10">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-24" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 gap-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}
