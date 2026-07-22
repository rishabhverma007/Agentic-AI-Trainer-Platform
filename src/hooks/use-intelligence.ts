"use client";

import { useQuery } from "@tanstack/react-query";
import { intelligenceApi } from "@/services/api/intelligence";

const MOCK_INTELLIGENCE = {
  insights: [
    {
      title: "Generative AI & Agentic Demand Surge",
      description: "Python & LangChain course requests increased by 34.2% month-over-month.",
      category: "DEMAND",
      impact: "HIGH_GROWTH",
      confidence: 0.98,
    },
    {
      title: "Cloud & MLOps Trainer Capacity Alert",
      description: "Kubernetes & MLOps certified trainers reached 96.0% calendar utilization.",
      category: "CAPACITY",
      impact: "SHORTAGE_RISK",
      confidence: 0.94,
    },
    {
      title: "Approval Cycle Speed Optimization",
      description: "Manager approval velocity improved by 42%, reducing lead time to 1.8 minutes.",
      category: "PERFORMANCE",
      impact: "EFFICIENCY",
      confidence: 0.99,
    },
    {
      title: "Vector Matching Accuracy Rating",
      description: "Gemini 1.5 Pro candidate recommendations achieved a 98.2% institutional acceptance rate.",
      category: "ACCURACY",
      impact: "OPTIMAL",
      confidence: 0.99,
    },
  ],
  predictions: [
    { period: "Q3 2026", expectedRevenue: 6500000, projectedAllocations: 210, topTech: "Generative AI" },
    { period: "Q4 2026", expectedRevenue: 8200000, projectedAllocations: 280, topTech: "Agentic AI & RAG" },
    { period: "Q1 2027", expectedRevenue: 10500000, projectedAllocations: 350, topTech: "Full Stack Next.js 15" },
  ],
  telemetry: {
    apiGateway: { status: "OPERATIONAL", latencyMs: 38, uptimePercentage: 99.98, requestsPerMin: 420 },
    vectorDatabase: { status: "HEALTHY", indexType: "HNSW HnswCosine", totalVectors: 4820, searchLatencyMs: 12 },
    aiOrchestrator: { status: "ACTIVE", model: "Gemini 1.5 Pro", avgProcessingTimeMs: 180, tokenUsageToday: 142800 },
    notificationServices: { emailDeliveryRate: 99.6, whatsAppDeliveryRate: 99.4, activeWebSockets: 38 }
  },
  leaderboards: {
    topTrainers: [
      { rank: 1, name: "Dr. Aris Thorne", rating: 4.95, bootcamps: 48, revenue: 1680000 },
      { rank: 2, name: "Elena Rostova", rating: 4.88, bootcamps: 36, revenue: 1008000 },
      { rank: 3, name: "Vikramaditya Kulkarni", rating: 4.92, bootcamps: 62, revenue: 2480000 },
    ],
    topColleges: [
      { rank: 1, name: "IIT Delhi", requests: 14, students: 1200, spent: 1750000 },
      { rank: 2, name: "BITS Pilani", requests: 11, students: 850, spent: 1320000 },
      { rank: 3, name: "IIIT Hyderabad", requests: 9, students: 720, spent: 1080000 },
    ]
  }
};

export function useIntelligence() {
  return useQuery({
    queryKey: ["intelligence"],
    queryFn: async () => {
      try {
        const [insightsRes, telemetryRes, leaderboardRes]: any = await Promise.all([
          intelligenceApi.getInsights(),
          intelligenceApi.getTelemetry(),
          intelligenceApi.getLeaderboards(),
        ]);
        return {
          insights: insightsRes?.data?.insights || MOCK_INTELLIGENCE.insights,
          predictions: insightsRes?.data?.predictions || MOCK_INTELLIGENCE.predictions,
          telemetry: telemetryRes?.data || MOCK_INTELLIGENCE.telemetry,
          leaderboards: leaderboardRes?.data || MOCK_INTELLIGENCE.leaderboards,
        };
      } catch (err) {
        console.warn("Backend intelligence API offline, using mock intelligence dataset.", err);
      }
      return MOCK_INTELLIGENCE;
    },
  });
}
