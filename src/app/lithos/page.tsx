"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Crosshair,
  FlaskConical,
  ScanSearch,
  Map,
  ArrowRight,
  Mountain,
  Compass,
  Cpu,
  Eye,
  Layers,
  Globe,
  Star,
  ChevronRight,
  Quote,
} from "lucide-react";

/* ============================================================
   Assets
   ============================================================ */
const BG_IMAGE_1 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";

const SPOTLIGHT_R = 260;

/* ============================================================
   Sub-components
   ============================================================ */

/** Cursor-following spotlight reveal via canvas mask */
function RevealLayer({
  image,
  cursorX,
  cursorY,
}: {
  image: string;
  cursorX: number;
  cursorY: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal || size.w === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size.w;
    canvas.height = size.h;

    ctx.clearRect(0, 0, size.w, size.h);

    const gradient = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,1)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
    gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
    gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const dataUrl = canvas.toDataURL();
    reveal.style.maskImage = `url(${dataUrl})`;
    reveal.style.webkitMaskImage = `url(${dataUrl})`;
    reveal.style.maskSize = "100% 100%";
    reveal.style.webkitMaskSize = "100% 100%";
  }, [cursorX, cursorY, size]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: "none" }}
        width={size.w}
        height={size.h}
      />
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

/** Animated counter that triggers on scroll */
function AnimatedCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2200;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ============================================================
   Data
   ============================================================ */
const steps = [
  {
    number: "01",
    icon: Crosshair,
    title: "Deep Core Drill",
    description:
      "Advanced rotary drills extract stratified sediment cores from depths of up to 500 meters, preserving layer chronology.",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Geochemical Sample",
    description:
      "Samples are catalogued and analyzed for mineral composition, fossil content, and isotopic signatures in our labs.",
  },
  {
    number: "03",
    icon: ScanSearch,
    title: "Stratigraphic Analyze",
    description:
      "Proprietary ML models correlate layers across sites to build high-resolution 3D stratigraphic maps.",
  },
  {
    number: "04",
    icon: Map,
    title: "Interactive Map",
    description:
      "Peel back virtual strata to explore millions of years of geological history right in your browser.",
  },
];

const features = [
  {
    icon: Mountain,
    title: "Field Mapping",
    description:
      "GPS-integrated field notebooks with real-time lithological logging and structural measurement capture.",
  },
  {
    icon: Compass,
    title: "Seismic Analysis",
    description:
      "AI-powered reflection seismology processing for subsurface imaging down to 10 km depth.",
  },
  {
    icon: Layers,
    title: "Core Library",
    description:
      "Digitised archive of 2M+ sediment cores with multi-sensor logging data, CT scans, and high-res photography.",
  },
  {
    icon: Eye,
    title: "Fossil Identification",
    description:
      "Computer vision classifier trained on 500K+ fossil specimens for rapid taxonomic identification.",
  },
  {
    icon: Globe,
    title: "3D Stratigraphy",
    description:
      "Browser-based volumetric viewer for correlated stratigraphic columns with pinch-out and fault modelling.",
  },
  {
    icon: Cpu,
    title: "Export API",
    description:
      "REST and GraphQL APIs for programmatic access to all datasets, models, and generated maps.",
  },
];

const testimonials = [
  {
    quote:
      "Lithos has fundamentally changed how we teach field geology. The 3D stratigraphy tools let students visualise basin evolution in ways a textbook never could.",
    author: "Dr. Elena Vasquez",
    role: "Professor of Geology, Stanford University",
    rating: 5,
  },
  {
    quote:
      "We integrated the Export API into our exploration pipeline and cut core-logging turnaround from three weeks to forty minutes.",
    author: "James Okonkwo",
    role: "Chief Geologist, SeismicWorks Energy",
    rating: 5,
  },
  {
    quote:
      "The fossil ID model identified a transitional trilobite specimen that our team had misclassified for six months. Remarkable accuracy.",
    author: "Dr. Mei-Lin Chang",
    role: "Paleontology Lead, Natural History Museum",
    rating: 5,
  },
];


/* ============================================================
   Page
   ============================================================ */
export default function LithosPage() {
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      smoothRef.current.x +=
        (mouseRef.current.x - smoothRef.current.x) * 0.1;
      smoothRef.current.y +=
        (mouseRef.current.y - smoothRef.current.y) * 0.1;
      setCursorPos({ x: smoothRef.current.x, y: smoothRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* ================================================================
          HERO SECTION
      ================================================================ */}
      <section          className="relative w-full overflow-hidden h-screen th-bg"
        style={{ height: "100dvh" }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})`, zIndex: 10 }}
        />

        <RevealLayer
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
        />

        <div
          className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none"
          style={{ zIndex: 50 }}
        >
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
            >
              Layers hold
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: "-0.08em", animationDelay: "0.42s" }}
            >
              tales of time
            </span>
          </h1>
        </div>

        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] hero-anim hero-fade"
          style={{ zIndex: 50, animationDelay: "0.7s" }}
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Every layer of sediment records a chapter of our planet, from
            ancient seabeds to drifting ash, layered across millions of years
            beneath us.
          </p>
        </div>

        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade"
          style={{ zIndex: 50, animationDelay: "0.85s" }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Our interactive maps let you peel back the crust to trace how
            stones, fossils, and deep time combine to shape the ground beneath
            your feet.
          </p>
          <button className="th-accent-bg hover:th-accent-hover-bg text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg th-accent-glow">
            Start Digging
          </button>
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS  (scroll target: #process)
      ================================================================ */}
      <section id="process" className="relative w-full th-bg overflow-hidden py-28 sm:py-36 px-5 sm:px-8">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, rgba(232,112,42,0.6) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold th-accent-text">
            The Process
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}              className="text-center text-white font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-3"
        >
          How It Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center th-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-16 sm:mb-20 font-light"
        >
          From bedrock to browser in four precision-engineered steps.
        </motion.p>

        <div className="max-w-6xl mx-auto relative">
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-24 h-24 sm:w-24 sm:h-24 rounded-full border th-border th-bg-elevated th-accent-bd-40-g th-accent-bg-05-g flex items-center justify-center transition-all duration-500">
                      <div className="w-14 h-14 rounded-full th-bg-card th-accent-bg-10-g flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                        <Icon className="w-6 h-6 th-icon-dim transition-all duration-500 group-hover:th-accent" />
                      </div>
                    </div>
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full th-accent-bg text-white text-[11px] font-bold flex items-center justify-center shadow-lg th-accent-glow">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="th-text text-lg font-semibold mb-2.5 transition-colors duration-300 group-hover:th-accent">
                    {step.title}
                  </h3>

                  <p className="th-text-tertiary text-sm leading-relaxed max-w-[260px] transition-colors duration-300 group-hover:th-text">
                    {step.description}
                  </p>

                  {i < steps.length - 1 && (
                    <div className="md:hidden mt-6 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 th-text-faint rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          FEATURES – LITHOS TOOLS  (scroll target: #features)
      ================================================================ */}
      <section id="features" className="relative w-full th-bg overflow-hidden py-28 sm:py-36 px-5 sm:px-8">
        {/* Background diagonal grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #ffffff 1px, transparent 1px), linear-gradient(-45deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#e8702a]/80">
            Tools & Capabilities
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}              className="text-center text-white font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-3"
        >
          Everything a geologist needs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center th-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-16 sm:mb-20 font-light"
        >
          From field camp to research lab — a unified platform for the
          earth sciences.
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-2xl border th-border th-bg-card p-7 sm:p-8 transition-all duration-500 th-accent-bd-hover th-accent-bg-subtle-hover th-accent-shadow-lg"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500 group-hover:via-[#e8702a]/40" />

                <div className="w-11 h-11 rounded-xl th-bg-card border th-border th-accent-bg-10-g th-accent-bd-30-g flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110">
                  <Icon className="w-5 h-5 th-icon-dim transition-all duration-500 group-hover:th-accent" />
                </div>

                <h3 className="th-text text-base font-semibold mb-2 transition-colors duration-300 group-hover:th-accent">
                  {feat.title}
                </h3>

                <p className="th-text-tertiary text-sm leading-relaxed transition-colors duration-300 group-hover:th-text">
                  {feat.description}
                </p>

                {/* Bottom-right arrow icon on hover */}
                <div className="absolute bottom-5 right-5 opacity-0 translate-x-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">
                  <ChevronRight className="w-4 h-4 th-accent" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================================================================
          STATS BAR – ANIMATED COUNTERS  (scroll target: #stats)
      ================================================================ */}
      <section id="stats" className="relative w-full th-bg overflow-hidden py-20 sm:py-28 px-5 sm:px-8 border-t th-border border-b th-border">
        {/* Background gradient strip */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[800px] opacity-[0.04] rounded-full blur-3xl bg-gradient-to-r from-[#e8702a] via-transparent to-[#e8702a]" />

        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {[
            { value: 2400000, label: "Cores Catalogued", suffix: "+", decimals: 0 },
            { value: 45, label: "Countries Reached", suffix: "+", decimals: 0 },
            { value: 99.8, label: "Identification Accuracy", suffix: "%", decimals: 1 },
            { value: 12, label: "Petabytes Processed", suffix: "+ PB", decimals: 0 },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold th-text tabular-nums mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="th-text-muted text-xs sm:text-sm uppercase tracking-[0.1em] font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS  (scroll target: #testimonials)
      ================================================================ */}
      <section id="testimonials" className="relative w-full th-bg overflow-hidden py-28 sm:py-36 px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold th-accent-text">
            Trusted by scientists
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-white font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-16 sm:mb-20"
        >
          What our users say
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl border th-border th-bg-card p-7 sm:p-8 transition-all duration-500 hover:th-border-hover hover:th-bg-hover"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 th-accent mb-4 transition-colors duration-300 opacity-20 group-hover:opacity-30" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    className="w-3.5 h-3.5 th-fill-accent th-accent"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="th-text text-sm leading-relaxed mb-6 transition-colors duration-300 opacity-70 group-hover:opacity-80">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t th-border pt-4">
                <div className="th-text text-sm font-semibold">
                  {t.author}
                </div>
                <div className="th-text-muted text-xs mt-0.5">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================================================
          CTA BANNER  (scroll target: #cta)
      ================================================================ */}
      <section id="cta" className="relative w-full th-bg overflow-hidden py-24 sm:py-32 px-5 sm:px-8">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e8702a]/[0.03] to-transparent" />

        {/* Glow orbs */}
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.08] blur-3xl bg-[#e8702a]" />
        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.05] blur-3xl th-orb" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <h2 className="th-text font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-5">
            Ready to explore
            <br />
            deep time?
          </h2>

          <p className="th-text-secondary text-sm sm:text-base max-w-xl mx-auto mb-10 font-light">
            Start with a free academic account. No credit card required —
            full access to the core library and 3D viewer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="th-accent-bg hover:th-accent-hover-bg text-white text-sm font-semibold px-9 py-4 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-xl th-accent-glow">
              Get Started Free
            </button>
            <button className="th-text text-sm font-medium px-9 py-4 rounded-full border th-border-hover hover:th-border-hover transition-all flex items-center gap-2 opacity-70 hover:opacity-100">
              <span>Talk to a geologist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </section>

    </>
  );
}
