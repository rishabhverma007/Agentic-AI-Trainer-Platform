import { apiClient } from "@/lib/api-client";

export const analyticsApi = {
  getSummary: async () => {
    return apiClient.get("/analytics/summary");
  },
};
