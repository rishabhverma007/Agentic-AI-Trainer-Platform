import { apiClient } from "@/lib/api-client";

export const matchingApi = {
  orchestrateMatching: async (requestId?: string, customPrompt?: string) => {
    return apiClient.post("/matching/orchestrate", {
      request_id: requestId,
      custom_prompt: customPrompt,
    });
  },
};
