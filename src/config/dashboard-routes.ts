export const JOB_SEEKER_DASHBOARD_PATH = "/dashboard/job-seeker" as const;

export const JOB_SEEKER_SEARCH_PATH = "/dashboard/job-seeker/search" as const;

export function jobSeekerJobDetailPath(jobId: string) {
  return `${JOB_SEEKER_SEARCH_PATH}/${jobId}`;
}

export const JOB_SEEKER_PROFILE_PATH = "/dashboard/job-seeker/profile" as const;

export const JOB_SEEKER_SETTINGS_PATH = "/dashboard/job-seeker/settings" as const;

export const JOB_SEEKER_MY_RESUMES_PATH =
  "/dashboard/job-seeker/my-resumes" as const;

export const HIRING_AGENCY_DASHBOARD_PATH = "/dashboard/hiring-agency" as const;

export function isDashboardRoute(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

/** Routes that use a full-page layout (no resume upload / bottom chat). */
export function isJobSeekerStandalonePage(pathname: string) {
  return (
    pathname === JOB_SEEKER_SEARCH_PATH ||
    pathname.startsWith(`${JOB_SEEKER_SEARCH_PATH}/`) ||
    pathname === JOB_SEEKER_PROFILE_PATH ||
    pathname === JOB_SEEKER_SETTINGS_PATH ||
    pathname === JOB_SEEKER_MY_RESUMES_PATH
  );
}
