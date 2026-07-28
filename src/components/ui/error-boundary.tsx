"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Link from "next/link";
import { monitoring } from "@/lib/monitoring-service";
import { Sparkles, AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional custom fallback UI */
  fallback?: ReactNode;
  /** Optional source identifier for logging */
  source?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    monitoring.reactError(error, errorInfo.componentStack || "", this.props.source || "ErrorBoundary");
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleReload = (): void => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback was provided, render it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <DefaultErrorFallback error={this.state.error} onRetry={this.handleRetry} onReload={this.handleReload} />;
    }

    return this.props.children;
  }
}

// ── Default Glassmorphism Error Fallback ──

interface FallbackProps {
  error: Error | null;
  onRetry: () => void;
  onReload: () => void;
  fullPage?: boolean;
}

function DefaultErrorFallback({ error, onRetry, onReload, fullPage = false }: FallbackProps) {
  const containerClass = fullPage
    ? "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClass}>
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl"
        style={{
          background: "rgba(16, 16, 26, 0.55)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px -8px rgba(239, 68, 68, 0.15)",
        }}
      >
        {/* Top edge shine */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.3), transparent)" }}
        />

        {/* Inner glow */}
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle, #EF4444, transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative z-10 p-8 sm:p-10 text-center">
          {/* Error icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          {/* Error code pill */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span>Render Error</span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            Something went wrong
          </h2>

          {/* Description */}
          <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-sm mx-auto">
            An unexpected error occurred while rendering this section. Our team has been notified automatically.
          </p>

          {/* Error detail (dev only) */}
          {process.env.NODE_ENV === "development" && error && (
            <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/5 text-left">
              <div className="text-[10px] uppercase font-bold text-red-400 tracking-wider mb-1">Error Details</div>
              <p className="text-xs font-mono text-foreground-muted break-all leading-relaxed">
                {error.message}
              </p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-[10px] text-foreground-muted cursor-pointer hover:text-white transition">
                    Stack trace
                  </summary>
                  <pre className="mt-1 text-[10px] font-mono text-foreground-muted whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onRetry}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs glow-cyan hover:shadow-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <button
              onClick={onReload}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Page</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-foreground-muted font-medium text-xs hover:text-white hover:bg-white/10 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
          </div>

          {/* Brand */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center space-x-2 text-[10px] text-foreground-muted">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>ALLOCATOR.AI — Error Automatically Logged</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Full-page variant (used by global-error.tsx) ──

export function FullPageErrorFallback({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased font-sans">
        <div className="min-h-screen flex items-center justify-center p-4">
          <DefaultErrorFallback
            error={error}
            onRetry={reset}
            onReload={() => { if (typeof window !== "undefined") window.location.reload(); }}
            fullPage={true}
          />
        </div>
      </body>
    </html>
  );
}
