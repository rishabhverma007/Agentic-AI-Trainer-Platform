"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationApi } from "@/services/api/notification";
import { useAuth } from "@/context/AuthContext";

export function useNotifications() {
  const { notifications: localNotifications } = useAuth();

  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res: any = await notificationApi.getNotifications();
        if (res && res.data && res.data.length > 0) {
          return res.data;
        }
      } catch (err) {
        // Fallback
      }
      return localNotifications;
    },
  });
}
