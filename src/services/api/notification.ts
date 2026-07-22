import { apiClient } from "@/lib/api-client";

export const notificationApi = {
  getNotifications: async () => {
    return apiClient.get("/notifications");
  },
};
