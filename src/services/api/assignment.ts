import { apiClient } from "@/lib/api-client";

export interface CreateAssignmentPayload {
  request_id: string;
  trainer_id: string;
  college_name: string;
  trainer_name: string;
  technology: string;
  start_date: string;
  end_date: string;
  total_budget: number;
  match_score?: number;
}

export const assignmentApi = {
  createAssignment: async (payload: CreateAssignmentPayload) => {
    return apiClient.post("/assignments", payload);
  },
  getAssignments: async (skip: number = 0, limit: number = 50) => {
    return apiClient.get("/assignments", { params: { skip, limit } });
  },
};
