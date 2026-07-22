import { apiClient } from "@/lib/api-client";
import { UserRole } from "@/types";

export interface LoginParams {
  email: string;
  password: string;
  role?: UserRole;
}

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  organization?: string;
}


export const authApi = {
  login: async (params: LoginParams) => {
    return apiClient.post("/auth/login", params);
  },
  register: async (params: RegisterParams) => {
    return apiClient.post("/auth/register", params);
  },
  getMe: async () => {
    return apiClient.get("/auth/me");
  },
};
