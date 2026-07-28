"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingOrb } from "@/components/ui/floating-orb";
import { Sparkles, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AuroraBackground showRadialGradient={true} className="justify-center py-12 px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
        <FloatingOrb size={400} speed={0.5} intensity={0.3} color1="#3B82F6" color2="#06B6D4" color3="#A855F7" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-2xl bg-brand-gradient opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full h-full rounded-2xl bg-brand-gradient p-[1px]">
                <div className="w-full h-full bg-background rounded-[15px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              ALLOCATOR<span className="text-cyan-400">.AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Reset your password</h2>
          <p className="text-xs text-foreground-muted mt-1">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <GlassCard glowColor="blue" className="p-8 border-blue-500/25">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Check your inbox</h3>
              <p className="text-sm text-foreground-muted">
                We&apos;ve sent a password reset link to <strong className="text-white">{email}</strong>
              </p>
              <Link href="/auth/login"
                className="inline-flex items-center space-x-2 text-cyan-400 font-semibold text-sm hover:underline">
                <span>Back to sign in</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-foreground-muted absolute left-3.5 top-3.5" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@institution.edu"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-foreground-muted focus:outline-none focus:border-blue-400/70 transition-all"
                    required />
                </div>
              </div>
              <button type="submit"
                className="btn-primary w-full">
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <Link href="/auth/login" className="text-xs text-cyan-400 font-semibold hover:underline">
              Back to sign in
            </Link>
          </div>
        </GlassCard>
      </div>
    </AuroraBackground>
  );
}
