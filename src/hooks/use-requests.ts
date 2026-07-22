"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { requestApi, CreateRequestPayload } from "@/services/api/request";
import { INITIAL_REQUESTS } from "@/lib/utils";

export function useRequests() {
  const queryClient = useQueryClient();

  const requestsQuery = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      try {
        const res: any = await requestApi.getRequests();
        if (res && res.data && res.data.length > 0) {
          return res.data;
        }
      } catch (err) {
        console.warn("Backend requests API unavailable, using mock dataset.", err);
      }
      return INITIAL_REQUESTS;
    },
  });

  const createRequestMutation = useMutation({
    mutationFn: async (payload: CreateRequestPayload) => {
      try {
        const res: any = await requestApi.createRequest(payload);
        return res.data;
      } catch (err) {
        console.warn("Backend create API offline. Returning local mock payload.", err);
        return {
          id: `req_${Date.now()}`,
          collegeName: payload.college_name,
          location: payload.location,
          technology: payload.technology,
          skillsRequired: payload.skills_required_json,
          budgetPerDay: payload.budget_per_day,
          trainingDates: { start: payload.start_date, end: payload.end_date },
          trainingMode: payload.training_mode,
          numberOfStudents: payload.number_of_students,
          durationDays: payload.duration_days,
          remarks: payload.remarks || "",
          status: "AI_MATCHING",
          createdAt: new Date().toISOString(),
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });

  return {
    ...requestsQuery,
    createRequest: createRequestMutation.mutateAsync,
    isCreating: createRequestMutation.isPending,
  };
}
