"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuroraBackground showRadialGradient={true} className="justify-center py-12 px-4">
      <div className="w-full max-w-md mx-auto">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-600 p-[1px] shadow-glow-cyan">
              <div className="w-full h-full bg-[#09090B] rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              ALLOCATOR<span className="text-cyan-400">.AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Reset Password</h2>
          <p className="text-xs text-gray-400 mt-1">
            Enter your email to receive a password reset link
          </p>
        </div>

        <GlassCard glowColor="cyan" className="p-8 border-cyan-500/30">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Check your email</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                We sent a password reset link to <strong className="text-cyan-300">{email}</strong>.
              </p>
              <Link
                href="/auth/login"
                className="inline-block py-2.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Registered Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@institution.edu"
                    className="w-full bg-white/[0.04] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-glow-cyan hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition flex items-center justify-center space-x-2 mt-6"
              >
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-gray-400">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-cyan-400 font-semibold hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </AuroraBackground>
  );
}
