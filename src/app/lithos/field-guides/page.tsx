"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

const guides = [
  {
    title: "Reading Sedimentary Structures",
    excerpt:
      "Identify cross-bedding, ripple marks, and graded bedding in the field to reconstruct ancient depositional environments.",
    color: "#e8702a",
  },
  {
    title: "Fossil Identification Quick Reference",
    excerpt:
      "A visual key for recognising common index fossils from the Cambrian through the Neogene.",
    color: "#e8702a",
  },
  {
    title: "Strike & Dip Measurement",
    excerpt:
      "Field techniques for accurate structural measurement using a Brunton compass and digital logging tools.",
    color: "#e8702a",
  },
  {
    title: "Core Logging & Description",
    excerpt:
      "Standard procedures for describing lithology, texture, structures, and fossil content in drill cores.",
    color: "#e8702a",
  },
  {
    title: "Geochemical Sampling Protocols",
    excerpt:
      "Best practices for collecting, labelling, and preserving samples for XRF, XRD, and isotopic analysis.",
    color: "#e8702a",
  },
  {
    title: "Stratigraphic Column Construction",
    excerpt:
      "Step-by-step methods for building measured sections and correlated stratigraphic columns.",
    color: "#e8702a",
  },
];

export default function FieldGuidesPage() {
  return (
    <section className="relative w-full min-h-screen th-bg pt-32 pb-20 px-5 sm:px-8 overflow-hidden">
      {/* Diagonal grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
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
            Reference Library
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start gap-5 mb-14"
        >
          <div className="w-14 h-14 rounded-2xl th-bg-card border th-border flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6 th-accent" />
          </div>
          <div>
            <h1 className="th-text font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[1.15]">
              Field Guides
            </h1>
            <p className="th-text-secondary text-sm sm:text-base mt-3 max-w-2xl font-light">
              Practical reference guides written by field geologists for field
              geologists. Downloadable PDFs for offline use in remote
              locations.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl border th-border th-bg-card p-6 transition-all duration-500 th-accent-bd-hover th-accent-bg-subtle-hover"
            >
              <h3 className="th-text text-base font-semibold mb-2 transition-colors duration-300 group-hover:th-accent">
                {guide.title}
              </h3>
              <p className="th-text-tertiary text-sm leading-relaxed transition-colors duration-300 group-hover:th-text">
                {guide.excerpt}
              </p>
              <div className="flex items-center gap-1.5 mt-4 text-xs th-text-dim group-hover:th-accent transition-colors">
                <span>Read guide</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.div>
          ))}
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
