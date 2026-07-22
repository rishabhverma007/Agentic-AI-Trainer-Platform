import { apiClient } from "@/lib/api-client";

export const intelligenceApi = {
  getInsights: async () => apiClient.get("/intelligence/insights"),
  getTelemetry: async () => apiClient.get("/intelligence/telemetry"),
  getLeaderboards: async () => apiClient.get("/intelligence/leaderboards"),
};
