import { apiClient } from "@/lib/api-client";

export interface TrainerSearchParams {
  technology?: string;
  max_rate?: number;
  availability?: string;
  skip?: number;
  limit?: number;
}

export const trainerApi = {
  getTrainers: async (params?: TrainerSearchParams) => {
    return apiClient.get("/trainers", { params });
  },
  getTrainerById: async (id: string) => {
    return apiClient.get(`/trainers/${id}`);
  },
};
