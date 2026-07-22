"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "@/services/api/analytics";

const MOCK_ANALYTICS = {
  totalRequests: 100,
  totalTrainers: 4820,
  totalAssignments: 150,
  totalRevenue: 4850000,
  avgMatchScore: 96.4,
  popularSkills: [
    { name: "Generative AI", count: 48 },
    { name: "PyTorch", count: 36 },
    { name: "Next.js 15", count: 32 },
    { name: "Cybersecurity", count: 24 },
    { name: "MLOps", count: 20 },
  ],
  requestStatusBreakdown: [
    { status: "COMPLETED", count: 42 },
    { status: "ASSIGNED", count: 28 },
    { status: "MATCHED", count: 18 },
    { status: "AI_MATCHING", count: 12 },
  ],
};

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      try {
        const res: any = await analyticsApi.getSummary();
        if (res && res.data) {
          return res.data;
        }
      } catch (err) {
        console.warn("Backend analytics API offline, returning mock summary.", err);
      }
      return MOCK_ANALYTICS;
    },
  });
}
