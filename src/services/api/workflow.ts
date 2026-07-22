import { apiClient } from "@/lib/api-client";

export const workflowApi = {
  approveAssignment: async (assignmentId: string) => {
    return apiClient.post("/workflow/approve", { assignment_id: assignmentId });
  },
  trainerRespond: async (assignmentId: string, action: "ACCEPT" | "REJECT") => {
    return apiClient.post("/workflow/trainer-respond", { assignment_id: assignmentId, action });
  },
  getContractPdf: async (assignmentId: string) => {
    return apiClient.get(`/workflow/contract-pdf/${assignmentId}`);
  },
};
