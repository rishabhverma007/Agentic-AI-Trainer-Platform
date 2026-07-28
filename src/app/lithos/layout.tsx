"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import NavTab from "./nav-tab";

const navTabs = [
  { label: "Course", href: "/lithos/course" },
  { label: "Field Guides", href: "/lithos/field-guides" },
  { label: "Geology", href: "/lithos/geology" },
  { label: "Plans", href: "/lithos/plans" },
  { label: "Live Tour", href: "/lithos/live-tour" },
];

const footerLinks = [
  {
    heading: "Product",
    items: ["Features", "Pricing", "API", "Changelog"],
  },
  {
    heading: "Resources",
    items: ["Documentation", "Tutorials", "Research Papers", "Community"],
  },
  {
    heading: "Company",
    items: ["About", "Careers", "Press", "Contact"],
  },
];

export default function LithosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      className="min-h-screen th-bg tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ================================================================
          FIXED NAVIGATION
      ================================================================ */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        {/* Logo + brand */}
        <Link href="/lithos" className="flex items-center gap-2.5">
          <svg
            width={26}
            height={26}
            viewBox="0 0 256 256"
            fill="#ffffff"
            aria-hidden="true"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic">
            Lithos
          </span>
        </Link>

        {/* Center pill nav (desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 th-nav border rounded-full px-2 py-2 items-center gap-1">
          {navTabs.map((tab) => (
            <NavTab
              key={tab.href}
              label={tab.label}
              href={tab.href}
              isActive={pathname === tab.href}
            />
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/lithos/plans"
            className="hidden md:block th-signup-bg th-signup-text text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-all"
          >
            Sign Up
          </Link>
          <button className="md:hidden th-icon p-2" aria-label="Menu">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Page content with crossfade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer className="relative w-full th-bg border-t th-border overflow-hidden px-5 sm:px-8 pt-16 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/lithos" className="flex items-center gap-2.5 mb-4">
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 256 256"
                  fill="#e8702a"
                  aria-hidden="true"
                >
                  <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
                </svg>
                <span className="th-text text-xl font-playfair italic">
                  Lithos
                </span>
              </Link>
              <p className="th-text-muted text-sm leading-relaxed max-w-xs">
                Unlocking Earth&rsquo;s stratigraphic record through
                cutting-edge software, machine learning, and open data
                standards.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-6">
                {[Github, Twitter, Linkedin].map((Icon, si) => (
                  <button
                    key={si}
                    className="w-9 h-9 rounded-full border th-border th-bg-card flex items-center justify-center th-text-muted hover:th-text hover:th-border-hover hover:th-bg-hover transition-all"
                    aria-label={["GitHub", "Twitter", "LinkedIn"][si]}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <div className="th-text text-xs uppercase tracking-[0.12em] font-semibold mb-4 opacity-80">
                  {col.heading}
                </div>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item}>
                      <button className="th-text-muted text-sm hover:th-text transition-colors">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t th-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs th-text-dim">
            <div>
              &copy; {new Date().getFullYear()} Lithos, Inc. All rights
              reserved.
            </div>
            <div className="flex items-center gap-5">
              <span className="hover:th-text transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:th-text transition-colors cursor-pointer">
                Terms of Service
              </span>
              <span className="hover:th-text transition-colors cursor-pointer">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
