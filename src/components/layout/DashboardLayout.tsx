"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuroraBackground showRadialGradient={true} intensity="subtle">
      {/* Animated grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col w-full">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
            {/* Content wrapper with subtle glass */}
            <div className="relative w-full h-full">
              {/* Floating gradient orbs accent */}
              <div className="fixed -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #06B6D4, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
              <div className="fixed -bottom-40 -left-40 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #A855F7, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />

              {children}
            </div>
          </main>
        </div>
      </div>
    </AuroraBackground>
  );
}
