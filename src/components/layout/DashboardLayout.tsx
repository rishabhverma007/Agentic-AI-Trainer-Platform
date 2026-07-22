"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuroraBackground showRadialGradient={true}>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
            {children}
          </main>
        </div>
      </div>
    </AuroraBackground>
  );
}
