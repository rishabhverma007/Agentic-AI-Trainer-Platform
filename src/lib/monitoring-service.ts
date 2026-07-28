/**
 * Monitoring Service — captures errors and logs them.
 *
 * In development, errors are logged to the console with structured details.
 * In production, errors are sent to the configured external endpoint.
 *
 * Extend this service to integrate with Sentry, LogRocket, Datadog, etc.
 * by implementing the `sendToExternal` function.
 */

type ErrorSeverity = "low" | "medium" | "high" | "critical";

interface ErrorEvent {
  message: string;
  source: string;
  severity: ErrorSeverity;
  timestamp: string;
  stack?: string;
  componentStack?: string;
  metadata?: Record<string, unknown>;
  url?: string;
  userAgent?: string;
}

const MONITORING_ENDPOINT = process.env.NEXT_PUBLIC_MONITORING_ENDPOINT || null;

function getBrowserInfo(): string {
  if (typeof navigator === "undefined") return "server";
  return navigator.userAgent;
}

function getCurrentUrl(): string {
  if (typeof window === "undefined") return "server";
  return window.location.href;
}

function formatTimestamp(): string {
  return new Date().toISOString();
}

function buildErrorEvent(
  error: Error,
  source: string,
  severity: ErrorSeverity = "medium",
  componentStack?: string,
  metadata?: Record<string, unknown>
): ErrorEvent {
  return {
    message: error.message || "Unknown error",
    source,
    severity,
    timestamp: formatTimestamp(),
    stack: error.stack,
    componentStack,
    metadata,
    url: getCurrentUrl(),
    userAgent: getBrowserInfo(),
  };
}

/**
 * Send an error event to the configured external monitoring endpoint.
 * Falls back gracefully if no endpoint is configured or the request fails.
 */
async function sendToExternal(errorEvent: ErrorEvent): Promise<void> {
  if (!MONITORING_ENDPOINT) return;

  try {
    const payload = {
      ...errorEvent,
      // Sanitise: never send raw stack traces with potential PII in URLs
      stack: errorEvent.stack?.split("\n").slice(0, 15).join("\n"),
    };

    // Use sendBeacon for reliability during page unload, fallback to fetch
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      navigator.sendBeacon(MONITORING_ENDPOINT, blob);
    } else {
      await fetch(MONITORING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }
  } catch {
    // Silently fail — monitoring should never crash the app
    console.warn("[Monitoring] Failed to send error to external endpoint");
  }
}

/**
 * Log an error to the console with structured details.
 * In development, this is the primary output.
 * In production, this also triggers the external send.
 */
function logToConsole(errorEvent: ErrorEvent): void {
  const prefix = `[${errorEvent.severity.toUpperCase()}] ${errorEvent.source}`;

  console.group(`%c${prefix}`, "color: #EF4444; font-weight: bold;");
  console.error("Message:", errorEvent.message);
  console.error("Timestamp:", errorEvent.timestamp);
  console.error("URL:", errorEvent.url);

  if (errorEvent.componentStack) {
    console.error("Component Stack:", errorEvent.componentStack);
  }
  if (errorEvent.stack) {
    console.error("Stack Trace:", errorEvent.stack);
  }
  if (errorEvent.metadata) {
    console.error("Metadata:", errorEvent.metadata);
  }

  console.groupEnd();
}

/**
 * Core capture function — logs locally and sends externally.
 */
async function captureError(
  error: Error,
  source: string,
  severity: ErrorSeverity = "medium",
  componentStack?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    const errorEvent = buildErrorEvent(error, source, severity, componentStack, metadata);

    // Always log to console in all environments for debugging
    logToConsole(errorEvent);

    // Send to external monitoring in production
    if (process.env.NODE_ENV === "production") {
      await sendToExternal(errorEvent);
    }
  } catch {
    // Absolute last resort — never let monitoring crash the app
  }
}

// ── Public API ──

export const monitoring = {
  /**
   * Capture a runtime error.
   */
  error: (
    error: Error,
    source: string,
    metadata?: Record<string, unknown>
  ): void => {
    captureError(error, source, "high", undefined, metadata);
  },

  /**
   * Capture a React component error with component stack trace.
   */
  reactError: (
    error: Error,
    componentStack: string,
    source?: string
  ): void => {
    captureError(error, source || "React Component", "critical", componentStack);
  },

  /**
   * Capture a promise rejection that was not handled.
   */
  unhandledRejection: (event: PromiseRejectionEvent): void => {
    const error =
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));

    captureError(error, "Unhandled Promise Rejection", "high", undefined, {
      reason: String(event.reason),
    });
  },

  /**
   * Capture a global error event.
   */
  globalError: (
    message: string,
    source: string,
    lineno: number,
    colno: number,
    error: Error | null
  ): void => {
    const err = error || new Error(message);
    captureError(err, "window.onerror", "critical", undefined, {
      scriptSource: source,
      lineNumber: lineno,
      columnNumber: colno,
    });
  },

  /**
   * Log a low-severity warning (does not send to external).
   */
  warn: (message: string, source: string, metadata?: Record<string, unknown>): void => {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[WARN] ${source}: ${message}`, metadata || "");
    }
  },
};

/**
 * Install global error listeners for unhandled rejections and window.onerror.
 * Call once at app startup.
 */
export function installGlobalErrorListeners(): () => void {
  if (typeof window === "undefined") return () => {};

  const handleRejection = (event: PromiseRejectionEvent) => {
    monitoring.unhandledRejection(event);
  };

  const handleGlobalError = (
    message: string,
    source: string,
    lineno: number,
    colno: number,
    error: Error | null
  ) => {
    monitoring.globalError(message, source, lineno, colno, error);
  };

  window.addEventListener("unhandledrejection", handleRejection);
  window.addEventListener("error", handleGlobalError as any);

  // Return a cleanup function
  return () => {
    window.removeEventListener("unhandledrejection", handleRejection);
    window.removeEventListener("error", handleGlobalError as any);
  };
}
