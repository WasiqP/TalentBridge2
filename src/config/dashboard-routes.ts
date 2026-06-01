export const JOB_SEEKER_DASHBOARD_PATH = "/dashboard/job-seeker" as const;

export const JOB_SEEKER_SEARCH_PATH = "/dashboard/job-seeker/search" as const;

export const JOB_SEEKER_PROFILE_PATH = "/dashboard/job-seeker/profile" as const;

export const JOB_SEEKER_SETTINGS_PATH = "/dashboard/job-seeker/settings" as const;

export const HIRING_AGENCY_DASHBOARD_PATH = "/dashboard/hiring-agency" as const;

export function isDashboardRoute(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}
