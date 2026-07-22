import { apiClient } from "@/lib/api-client";

export interface CreateRequestPayload {
  college_name: string;
  location: string;
  technology: string;
  skills_required_json: string[];
  budget_per_day: number;
  start_date: string;
  end_date: string;
  training_mode: "Offline" | "Online" | "Hybrid";
  number_of_students: number;
  duration_days: number;
  remarks?: string;
}

export const requestApi = {
  createRequest: async (payload: CreateRequestPayload) => {
    return apiClient.post("/requests", payload);
  },
  getRequests: async (skip: number = 0, limit: number = 50) => {
    return apiClient.get("/requests", { params: { skip, limit } });
  },
  getRequestById: async (id: string) => {
    return apiClient.get(`/requests/${id}`);
  },
};
