import type { LucideIcon } from "lucide-react";
import { Briefcase, UserRound } from "lucide-react";

import {
  HIRING_AGENCY_DASHBOARD_PATH,
  JOB_SEEKER_DASHBOARD_PATH,
} from "@/config/dashboard-routes";
import type { UserRole } from "@/types/user-role";

export const SELECT_ROLE_PATH = "/select-role" as const;

export function getDashboardPathForRole(role: UserRole): string {
  if (role === "job-seeker") return JOB_SEEKER_DASHBOARD_PATH;
  if (role === "recruiter") return HIRING_AGENCY_DASHBOARD_PATH;
  return "/";
}

export const USER_ROLE_STORAGE_KEY = "tb_user_role" as const;

export type UserRoleOption = {
  id: UserRole;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function isUserRole(value: string | null): value is UserRole {
  return value === "job-seeker" || value === "recruiter";
}

export function getRoleDisplayTitle(role: UserRole): string {
  return userRoleOptions.find((o) => o.id === role)?.title ?? role;
}

export function readStoredUserRole(): UserRole | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(USER_ROLE_STORAGE_KEY);
  return isUserRole(stored) ? stored : null;
}

export const userRoleOptions: UserRoleOption[] = [
  {
    id: "job-seeker",
    title: "Job seeker",
    description: "Find roles, track applications, and get matched to opportunities.",
    icon: UserRound,
  },
  {
    id: "recruiter",
    title: "Recruiter",
    description:
      "Source candidates, run pipelines, and hire — for in-house teams and hiring agencies.",
    icon: Briefcase,
  },
];
