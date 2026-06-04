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

export const HIRING_AGENCY_NEW_ROLE_PATH =
  "/dashboard/hiring-agency/new" as const;

export function hiringAgencyRolePath(roleId: string) {
  return `${HIRING_AGENCY_DASHBOARD_PATH}/roles/${roleId}`;
}

export function isDashboardRoute(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

export function isHiringAgencyRoute(pathname: string) {
  return (
    pathname === HIRING_AGENCY_DASHBOARD_PATH ||
    pathname.startsWith(`${HIRING_AGENCY_DASHBOARD_PATH}/`)
  );
}

/** Full-page recruiter views outside the home split layout. */
export function isHiringAgencyStandalonePage(pathname: string) {
  return (
    pathname.startsWith(`${HIRING_AGENCY_DASHBOARD_PATH}/roles/`) ||
    pathname === HIRING_AGENCY_NEW_ROLE_PATH
  );
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
