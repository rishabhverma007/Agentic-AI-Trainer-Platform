import { apiClient } from "@/lib/api-client";

export const collegeApi = {
  getColleges: async (skip: number = 0, limit: number = 50) => {
    return apiClient.get("/colleges", { params: { skip, limit } });
  },
};
