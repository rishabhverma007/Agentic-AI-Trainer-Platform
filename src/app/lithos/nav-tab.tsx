"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Map nav tab labels to section IDs on the landing page.
 * When the user is on /lithos, clicking a tab smooth-scrolls
 * to the matching section instead of navigating to a sub-page.
 */
const SECTION_MAP: Record<string, string> = {
  "/lithos/course": "process",
  "/lithos/field-guides": "features",
  "/lithos/geology": "stats",
  "/lithos/plans": "cta",
  "/lithos/live-tour": "testimonials",
};

interface NavTabProps {
  label: string;
  href: string;
  isActive: boolean;
}

export default function NavTab({ label, href, isActive }: NavTabProps) {
  const pathname = usePathname();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Only intercept on the landing page itself
      if (pathname !== "/lithos") return;

      e.preventDefault();
      const sectionId = SECTION_MAP[href];
      if (!sectionId) return;

      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Push a hash so the URL is bookmarkable
        window.history.replaceState(null, "", `/lithos#${sectionId}`);
      }
    },
    [pathname, href]
  );

  const className = `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
    isActive
      ? "th-text"
      : "th-text-secondary hover:th-bg-hover hover:th-text"
  }`;

  // On the landing page, render a <button> that scrolls.
  // On sub-pages, render a <Link> for normal navigation.
  if (pathname === "/lithos") {
    return (
      <button onClick={handleClick} className={className}>
        {label}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
