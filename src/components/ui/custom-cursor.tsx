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

  const setCursor = useCallback((variant: CursorVariant) => {
    variantRef.current = variant;
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    cursor.removeAttribute("data-variant");
    if (variant !== "default") {
      cursor.setAttribute("data-variant", variant);
    }
    if (follower) {
      follower.removeAttribute("data-variant");
      if (variant !== "default") {
        follower.setAttribute("data-variant", variant);
      }
    }

    switch (variant) {
      case "text":
        cursor.style.width = "8px";
        cursor.style.height = "8px";
        cursor.style.backgroundColor = "rgba(6, 182, 212, 0.8)";
        cursor.style.mixBlendMode = "normal";
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
      cursor.style.transform = "translate(-50%, -50%) scale(0.75)";
      follower.style.transform = "translate(-50%, -50%) scale(0.85)";
    };

    const handleMouseUp = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      follower.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const handleMouseLeave = () => {
      setCursor("hidden");
    };

    const handleMouseEnter = () => {
      setCursor(variantRef.current);
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
      } else if (tag === "input" || tag === "textarea" || tag === "select" || target.isContentEditable) {
        setCursor("text");
      } else {
        setCursor("default");
      }
    };

    const animate = () => {
      const speed = 0.12;
      cursorPos.current.x += (mouseRef.current.x - cursorPos.current.x) * speed;
      cursorPos.current.y += (mouseRef.current.y - cursorPos.current.y) * speed;

      cursor.style.left = `${mouseRef.current.x}px`;
      cursor.style.top = `${mouseRef.current.y}px`;

      follower.style.left = `${cursorPos.current.x}px`;
      follower.style.top = `${cursorPos.current.y}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover);

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
      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease, opacity 0.3s ease",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      {/* Cursor follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: "32px",
          height: "32px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.4s ease, height 0.4s ease, border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
