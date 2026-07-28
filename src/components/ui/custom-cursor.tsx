"use client";

import React, { useEffect, useRef, useCallback } from "react";

type CursorVariant = "default" | "text" | "link" | "button" | "hidden";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const variantRef = useRef<CursorVariant>("default");
  const isPressedRef = useRef(false);
  const cursorScaleRef = useRef(1);
  const followerScaleRef = useRef(1);

  const setCursor = useCallback((variant: CursorVariant) => {
    variantRef.current = variant;
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    switch (variant) {
      case "text":
        cursor.style.width = "8px";
        cursor.style.height = "8px";
        cursor.style.backgroundColor = "rgba(6, 182, 212, 0.8)";
        if (follower) {
          follower.style.width = "48px";
          follower.style.height = "48px";
          follower.style.borderColor = "rgba(6, 182, 212, 0.6)";
          follower.style.backgroundColor = "rgba(6, 182, 212, 0.08)";
        }
        break;
      case "link":
        cursor.style.width = "12px";
        cursor.style.height = "12px";
        cursor.style.backgroundColor = "rgba(6, 182, 212, 1)";
        if (follower) {
          follower.style.width = "56px";
          follower.style.height = "56px";
          follower.style.borderColor = "rgba(6, 182, 212, 0.8)";
          follower.style.backgroundColor = "rgba(6, 182, 212, 0.12)";
        }
        break;
      case "button":
        cursor.style.width = "0px";
        cursor.style.height = "0px";
        cursor.style.backgroundColor = "transparent";
        if (follower) {
          follower.style.width = "72px";
          follower.style.height = "72px";
          follower.style.borderColor = "rgba(6, 182, 212, 0.5)";
          follower.style.backgroundColor = "rgba(6, 182, 212, 0.06)";
        }
        break;
      case "hidden":
        cursor.style.opacity = "0";
        if (follower) follower.style.opacity = "0";
        return;
      default:
        cursor.style.width = "6px";
        cursor.style.height = "6px";
        cursor.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        if (follower) {
          follower.style.width = "32px";
          follower.style.height = "32px";
          follower.style.borderColor = "rgba(255, 255, 255, 0.3)";
          follower.style.backgroundColor = "transparent";
        }
    }
    cursor.style.opacity = "1";
    if (follower) follower.style.opacity = "1";
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      isPressedRef.current = true;
      cursorScaleRef.current = 0.8;   // snap immediately for tactile feedback
      followerScaleRef.current = 0.9;
    };

    const handleMouseUp = () => {
      isPressedRef.current = false;
      cursorScaleRef.current = 1;
      followerScaleRef.current = 1;
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
      follower.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
      follower.style.opacity = "1";
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      const role = target.getAttribute("role");

      if (
        tag === "a" ||
        tag === "button" ||
        role === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("type") === "submit" ||
        target.getAttribute("type") === "button"
      ) {
        setCursor("button");
      } else if (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        target.isContentEditable
      ) {
        setCursor("text");
      } else {
        setCursor("default");
      }
    };

    const animate = () => {
      // High lerp speed for nearly-instant follower tracking
      const speed = 0.35;
      cursorPos.current.x += (mouseRef.current.x - cursorPos.current.x) * speed;
      cursorPos.current.y += (mouseRef.current.y - cursorPos.current.y) * speed;

      // Use transform translate for GPU-composited positioning (no layout thrash)
      const dx = mouseRef.current.x;
      const dy = mouseRef.current.y;
      const fx = cursorPos.current.x;
      const fy = cursorPos.current.y;

      // Smoothly interpolate scale values for smooth click release animation
      cursorScaleRef.current += (isPressedRef.current ? 0.8 : 1 - cursorScaleRef.current) * 0.25;
      followerScaleRef.current += (isPressedRef.current ? 0.9 : 1 - followerScaleRef.current) * 0.25;

      cursor.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%) scale(${cursorScaleRef.current})`;
      follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%) scale(${followerScaleRef.current})`;

      rafRef.current = requestAnimationFrame(animate);
    };

    // Use passive listeners for better scroll performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setCursor]);

  return (
    <>
      {/* Cursor dot — instant follow */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          transform: "translate(-50%, -50%)",
          // Fast transitions for size/color changes only — position is rAF-driven
      transition: "width 0.15s ease, height 0.15s ease, background-color 0.15s ease, opacity 0.2s ease",
      willChange: "transform",
        }}
      />
      {/* Cursor follower ring — lerp-trails the dot with nearly-zero delay */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: "32px",
          height: "32px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transform: "translate(-50%, -50%)",
      transition: "width 0.2s ease, height 0.2s ease, border-color 0.15s ease, background-color 0.15s ease, opacity 0.2s ease",
      willChange: "transform",
        }}
      />
    </>
  );
}
