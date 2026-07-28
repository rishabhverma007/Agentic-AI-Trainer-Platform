"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FloatingOrbProps {
  className?: string;
  size?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  intensity?: number;
}

export function FloatingOrb({
  className,
  size = 400,
  color1 = "#06B6D4",
  color2 = "#A855F7",
  color3 = "#3B82F6",
  speed = 1,
  intensity = 0.05,
}: FloatingOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseRef.current = { x, y };
    },
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.08;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.08;

      if (orbRef.current) {
        const maxRotate = 25 * intensity * 10;
        const maxTranslate = 30 * intensity * 10;
        const rotateX = (smoothRef.current.y - 0.5) * 2 * maxRotate;
        const rotateY = (smoothRef.current.x - 0.5) * 2 * maxRotate;
        const translateX = (smoothRef.current.x - 0.5) * 2 * maxTranslate;
        const translateY = (smoothRef.current.y - 0.5) * 2 * maxTranslate;

        orbRef.current.style.transform = `
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateX(${translateX}px)
          translateY(${translateY}px)
          translateZ(40px)
        `;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, intensity]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        perspective: "1200px",
      }}
    >
      <div
        ref={orbRef}
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Main glow sphere */}
        <div
          className="absolute inset-0 rounded-full animate-orb-float"
          style={{
            background: `
              radial-gradient(circle at 35% 35%, ${color1}88, transparent 60%),
              radial-gradient(circle at 65% 65%, ${color2}66, transparent 50%),
              radial-gradient(circle at 50% 50%, ${color3}44, transparent 70%)
            `,
            filter: "blur(4px)",
            transform: "translateZ(20px)",
          }}
        />

        {/* Core bright spot */}
        <div
          className="absolute inset-[30%] rounded-full animate-pulse-slow"
          style={{
            background: `radial-gradient(circle, ${color1}aa, transparent 70%)`,
            filter: "blur(8px)",
            transform: "translateZ(40px)",
          }}
        />

        {/* Ring 1 */}
        <div
          className="absolute inset-[5%] rounded-full animate-orb-rotate"
          style={{
            border: `1px solid ${color1}33`,
            transform: "translateZ(10px) rotateX(60deg)",
            boxShadow: `0 0 30px ${color1}22`,
          }}
        />

        {/* Ring 2 */}
        <div
          className="absolute inset-[10%] rounded-full"
          style={{
            border: `1px solid ${color2}22`,
            transform: "translateZ(30px) rotateX(30deg) rotateY(45deg)",
            animation: `orbRotate ${14 / speed}s linear infinite reverse`,
            boxShadow: `0 0 20px ${color2}11`,
          }}
        />

        {/* Ring 3 */}
        <div
          className="absolute inset-[15%] rounded-full"
          style={{
            border: `1px solid ${color3}1a`,
            transform: "translateZ(50px) rotateX(45deg) rotateY(-30deg)",
            animation: `orbRotate ${18 / speed}s linear infinite`,
            boxShadow: `0 0 40px ${color3}11`,
          }}
        />

        {/* Outer glow halo */}
        <div
          className="absolute -inset-[20%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${color1}15, transparent 70%)`,
            filter: "blur(40px)",
            transform: "translateZ(-20px)",
          }}
        />

        {/* Particle sparkles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: [color1, color2, color3][i % 3],
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              opacity: 0.3 + Math.random() * 0.4,
              transform: `translateZ(${20 + Math.random() * 60}px)`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: `blur(${Math.random() * 1}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
