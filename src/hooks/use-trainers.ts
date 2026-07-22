"use client";

import { useQuery } from "@tanstack/react-query";
import { trainerApi, TrainerSearchParams } from "@/services/api/trainer";
import { INITIAL_TRAINERS } from "@/lib/utils";

export function useTrainers(params?: TrainerSearchParams) {
  return useQuery({
    queryKey: ["trainers", params],
    queryFn: async () => {
      try {
        const res: any = await trainerApi.getTrainers(params);
        if (res && res.data && res.data.length > 0) {
          return res.data;
        }
      } catch (err) {
        console.warn("Backend API unavailable, using high-fidelity mock dataset.", err);
      }
      // Fallback mock filtering
      if (params?.technology) {
        const tech = params.technology.toLowerCase();
        return INITIAL_TRAINERS.filter(
          (t) =>
            t.title.toLowerCase().includes(tech) ||
            t.skills.some((s) => s.toLowerCase().includes(tech))
        );
      }
      return INITIAL_TRAINERS;
    },
  });
}
