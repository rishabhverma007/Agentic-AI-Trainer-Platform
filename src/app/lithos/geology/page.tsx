"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import Link from "next/link";

const eras = [
  {
    name: "Cenozoic",
    span: "66 Mya – Present",
    description:
      "The age of mammals. Alpine orogeny, ice ages, and the emergence of humans. Lithos holds extensive Neogene and Quaternary core data.",
  },
  {
    name: "Mesozoic",
    span: "252 – 66 Mya",
    description:
      "The age of reptiles. Pangea rifts apart, Atlantic Ocean forms, and massive volcanic provinces reshape the planet's surface.",
  },
  {
    name: "Paleozoic",
    span: "541 – 252 Mya",
    description:
      "From the Cambrian explosion to the Permian extinction. Shallow seas deposit vast carbonate platforms across every continent.",
  },
  {
    name: "Precambrian",
    span: "4.6 Bya – 541 Mya",
    description:
      "Earth's deep past: formation of the crust, the rise of oxygen, Snowball Earth glaciations, and the first complex life.",
  },
];

export default function GeologyPage() {
  return (
    <section className="relative w-full min-h-screen th-bg pt-32 pb-20 px-5 sm:px-8 overflow-hidden">
      {/* Subtle horizontal striations */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, #ffffff 1px, #ffffff 2px)",
          backgroundSize: "100% 30px",
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
            Deep Time
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start gap-5 mb-14"
        >
          <div className="w-14 h-14 rounded-2xl th-bg-card border th-border flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6 th-accent" />
          </div>
          <div>
            <h1 className="th-text font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[1.15]">
              Geological Timeline
            </h1>
            <p className="th-text-secondary text-sm sm:text-base mt-3 max-w-2xl font-light">
              Explore 4.6 billion years of Earth history through the Lithos
              stratigraphic record — from the Hadean eon to the present day.
            </p>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-[33px] w-px bg-gradient-to-b from-[#e8702a]/40 via-white/10 to-[#e8702a]/40" />

          <div className="space-y-6">
            {eras.map((era, i) => (
              <motion.div
                key={era.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col md:flex-row gap-5 md:gap-8 pl-0 md:pl-16"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-[26px] top-1 w-[15px] h-[15px] rounded-full border-2 border-[#e8702a]/60 th-bg transition-all duration-300 group-hover:border-[#e8702a] group-hover:scale-125" />

                {/* Era badge */}
                <div className="shrink-0">
                  <span className="inline-block text-xs font-mono font-bold th-accent-text th-accent-bg-10 px-3 py-1 rounded-full">
                    {era.span}
                  </span>
                </div>

                {/* Content card */}
                <div className="flex-1 rounded-2xl border th-border th-bg-card p-6 transition-all duration-500 th-accent-bd-hover th-accent-bg-subtle-hover">
                  <h3 className="th-text text-lg font-semibold mb-2 transition-colors duration-300 group-hover:th-accent">
                    {era.name}
                  </h3>
                  <p className="th-text-tertiary text-sm leading-relaxed transition-colors duration-300 group-hover:th-text">
                    {era.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
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
