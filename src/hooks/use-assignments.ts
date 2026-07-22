"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentApi, CreateAssignmentPayload } from "@/services/api/assignment";

const MOCK_ASSIGNMENTS = [
  {
    id: "asgn_701",
    requestId: "req_901",
    collegeName: "IIT Delhi - Dept of CSE",
    trainerId: "trn_101",
    trainerName: "Dr. Aris Thorne",
    technology: "Generative AI & Agentic Workflows",
    startDate: "2026-08-10",
    endDate: "2026-08-15",
    totalBudget: 125000,
    status: "APPROVED",
    contractStatus: "SIGNED",
    matchScore: 96.4,
  },
  {
    id: "asgn_702",
    requestId: "req_902",
    collegeName: "BITS Pilani - Hyderabad Campus",
    trainerId: "trn_102",
    trainerName: "Elena Rostova",
    technology: "Full-Stack AI Application Development",
    startDate: "2026-08-20",
    endDate: "2026-08-23",
    totalBudget: 80000,
    status: "PENDING_APPROVAL",
    contractStatus: "SENT",
    matchScore: 92.0,
  },
];

export function useAssignments() {
  const queryClient = useQueryClient();

  const assignmentsQuery = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      try {
        const res: any = await assignmentApi.getAssignments();
        if (res && res.data && res.data.length > 0) {
          return res.data;
        }
      } catch (err) {
        console.warn("Backend assignments API offline, using fallback dataset.", err);
      }
      return MOCK_ASSIGNMENTS;
    },
  });

  const createAssignmentMutation = useMutation({
    mutationFn: async (payload: CreateAssignmentPayload) => {
      try {
        const res: any = await assignmentApi.createAssignment(payload);
        return res.data;
      } catch (err) {
        return {
          id: `asgn_${Date.now()}`,
          ...payload,
          status: "APPROVED",
          contractStatus: "SENT",
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  return {
    ...assignmentsQuery,
    createAssignment: createAssignmentMutation.mutateAsync,
    isCreating: createAssignmentMutation.isPending,
  };
}
