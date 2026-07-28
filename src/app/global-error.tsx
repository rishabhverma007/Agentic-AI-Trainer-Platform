"use client";

import { useEffect } from "react";
import { FullPageErrorFallback } from "@/components/ui/error-boundary";
import { monitoring } from "@/lib/monitoring-service";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the global error to our monitoring service
    monitoring.error(error, "global-error.tsx", {
      digest: error.digest,
    });
  }, [error]);

  return <FullPageErrorFallback error={error} reset={reset} />;
}
