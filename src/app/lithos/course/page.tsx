"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CoursePage() {
  const modules = [
    {
      id: "01",
      title: "Sedimentology & Stratigraphy",
      lessons: 12,
      duration: "6 weeks",
    },
    {
      id: "02",
      title: "Structural Geology & Mapping",
      lessons: 10,
      duration: "5 weeks",
    },
    {
      id: "03",
      title: "Geochemistry & Petrology",
      lessons: 14,
      duration: "7 weeks",
    },
    {
      id: "04",
      title: "Paleontology & Biostratigraphy",
      lessons: 8,
      duration: "4 weeks",
    },
    {
      id: "05",
      title: "Field Methods & Digital Logging",
      lessons: 10,
      duration: "5 weeks",
    },
  ];

  return (
    <section className="relative w-full min-h-screen th-bg pt-32 pb-20 px-5 sm:px-8 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold th-accent-text">
            Curriculum
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start gap-5 mb-14"
        >
          <div className="w-14 h-14 rounded-2xl th-bg-card border th-border flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 th-accent" />
          </div>
          <div>
            <h1 className="th-text font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[1.15]">
              Field Geology Course
            </h1>
            <p className="th-text-secondary text-sm sm:text-base mt-3 max-w-2xl font-light">
              A comprehensive curriculum designed for aspiring field
              geologists. Master the tools and techniques of modern
              stratigraphic analysis.
            </p>
          </div>
        </motion.div>

        <div className="space-y-3">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex items-center justify-between rounded-2xl border th-border th-bg-card p-5 transition-all duration-400 th-accent-bd-hover th-accent-bg-subtle-hover"
            >
              <div className="flex items-center gap-5">
                <span className="th-text-faint text-sm font-mono font-bold w-8">
                  {mod.id}
                </span>
                <div>
                  <h3 className="th-text text-base font-semibold transition-colors duration-300 group-hover:th-accent">
                    {mod.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 th-text-dim text-xs">
                    <span>{mod.lessons} lessons</span>
                    <span className="w-1 h-1 rounded-full th-text-faint" />
                    <span>{mod.duration}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 th-text-faint transition-all duration-300 group-hover:th-accent group-hover:translate-x-1" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
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
