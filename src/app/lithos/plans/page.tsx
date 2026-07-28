"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "For students and independent researchers.",
    features: [
      "Access to 10K+ public core logs",
      "3D stratigraphy viewer",
      "Basic fossil ID (500 queries/mo)",
      "Community forum access",
      "PDF field guide downloads",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$49",
    period: "/month",
    description: "For field geologists and consulting firms.",
    features: [
      "Full core library (2M+ logs)",
      "Advanced ML fossil identification",
      "Seismic processing pipeline",
      "API access (10K calls/day)",
      "Priority support",
      "Team collaboration (up to 5 seats)",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For universities, museums, and energy companies.",
    features: [
      "Unlimited API access",
      "Private data lake integration",
      "Custom ML model training",
      "Dedicated solution engineer",
      "SLA-backed uptime guarantee",
      "Unlimited team seats",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PlansPage() {
  return (
    <section className="relative w-full min-h-screen th-bg pt-32 pb-20 px-5 sm:px-8 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.04] rounded-full blur-3xl bg-gradient-to-r from-[#e8702a] via-transparent to-[#e8702a]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold th-accent-text">
            Pricing
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center th-text font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-3"
        >
          Choose your plan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center th-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-16 font-light"
        >
          Start free. Scale as your research grows.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative rounded-2xl border p-7 transition-all duration-500 ${
                plan.highlighted
                  ? "th-accent-bd-40 th-accent-bg-10 th-accent-shadow-lg"
                  : "border th-border th-bg-card hover:th-border-hover"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 th-accent-bg th-text text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h2 className="th-text text-lg font-semibold mb-1">
                  {plan.name}
                </h2>
                <div className="flex items-baseline gap-1">
                  <span className="th-text text-3xl font-bold">
                    {plan.price}
                  </span>
                  <span className="th-text-muted text-sm">{plan.period}</span>
                </div>
                <p className="th-text-muted text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 th-accent mt-0.5 shrink-0" />
                    <span className="th-text text-sm opacity-60">{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full text-sm font-semibold py-3.5 rounded-full transition-all ${
                  plan.highlighted
                    ? "th-accent-bg hover:th-accent-hover-bg th-text hover:scale-[1.02] active:scale-95 hover:shadow-lg th-accent-glow"
                    : "border th-border-hover th-text-secondary hover:th-text hover:th-border-hover"
                }`}
              >
                {plan.cta}
              </button>
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
