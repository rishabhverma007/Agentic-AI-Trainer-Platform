"use client";

import React from "react";
import { motion } from "framer-motion";
import { Map, Play } from "lucide-react";
import Link from "next/link";

const tourStops = [
  {
    title: "Welcome to Lithos",
    description:
      "A brief overview of the platform, its mission, and how it transforms geological data into interactive knowledge.",
    duration: "2:30",
  },
  {
    title: "Navigating the 3D Viewer",
    description:
      "Learn to rotate, zoom, and slice through volumetric stratigraphic models built from real core data.",
    duration: "4:15",
  },
  {
    title: "Core Library Search & Filter",
    description:
      "Search across 2M+ digitised cores by location, depth, lithology, fossil content, and geochemical signature.",
    duration: "3:45",
  },
  {
    title: "Fossil ID in Action",
    description:
      "Watch the computer vision model identify a misclassified trilobite in under 200 milliseconds.",
    duration: "2:50",
  },
  {
    title: "Exporting & Sharing",
    description:
      "Export stratigraphic columns, core logs, and 3D scenes as PDF, CSV, or shareable web links.",
    duration: "1:55",
  },
];

export default function LiveTourPage() {
  return (
    <section className="relative w-full min-h-screen th-bg pt-32 pb-20 px-5 sm:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-[0.04] rounded-full blur-3xl th-orb" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold th-accent-text">
            Interactive Demo
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start gap-5 mb-14"
        >
          <div className="w-14 h-14 rounded-2xl th-bg-card border th-border flex items-center justify-center shrink-0">
            <Map className="w-6 h-6 th-accent" />
          </div>
          <div>
            <h1 className="th-text font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[1.15]">
              Live Product Tour
            </h1>
            <p className="th-text-secondary text-sm sm:text-base mt-3 max-w-2xl font-light">
              See Lithos in action. Watch short walkthroughs of the
              platform&rsquo;s key features, from the 3D stratigraphy viewer
              to the ML-powered fossil identification engine.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Video placeholder (takes 3 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden border th-border th-bg-elevated flex items-center justify-center min-h-[320px] sm:min-h-[400px] group cursor-pointer"
          >
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#e8702a]/90 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[#e8702a] group-hover:shadow-xl group-hover:shadow-[#e8702a]/40">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>

            {/* Subtle scan lines */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, #ffffff 2px, #ffffff 3px)",
              }}
            />
          </motion.div>

          {/* Tour stop list (takes 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            {tourStops.map((stop, i) => (
              <motion.div
                key={stop.title}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-start gap-4 rounded-xl border th-border th-bg-card p-4 transition-all duration-400 th-accent-bd-hover th-accent-bg-subtle-hover cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg th-bg-card border th-border th-accent-bg-10-g th-accent-bd-30-g flex items-center justify-center shrink-0 transition-all duration-300">
                  <span className="th-text-muted text-xs font-mono font-bold group-hover:th-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="th-text text-sm font-semibold transition-colors duration-300 group-hover:th-accent">
                    {stop.title}
                  </h3>
                  <p className="th-text-muted text-xs mt-1 line-clamp-2 leading-relaxed">
                    {stop.description}
                  </p>
                </div>
                <span className="th-text-faint text-xs font-mono shrink-0 mt-0.5">
                  {stop.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-14 text-center"
        >
          <Link
            href="/lithos"
            className="th-text-muted text-sm hover:th-text transition-colors"
          >
            &larr; Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
