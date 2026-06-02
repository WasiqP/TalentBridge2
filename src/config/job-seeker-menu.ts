import type { StaggeredMenuItem } from "@/components/ui/staggered-menu";

import {
  JOB_SEEKER_DASHBOARD_PATH,
  JOB_SEEKER_MY_RESUMES_PATH,
  JOB_SEEKER_PROFILE_PATH,
  JOB_SEEKER_SEARCH_PATH,
  JOB_SEEKER_SETTINGS_PATH,
} from "@/config/dashboard-routes";

/** Placeholder nav — routes and labels will be refined with layout design. */
export const jobSeekerMenuItems: StaggeredMenuItem[] = [
  {
    label: "Dashboard",
    ariaLabel: "Go to dashboard",
    link: JOB_SEEKER_DASHBOARD_PATH,
  },
  {
    label: "Applications",
    ariaLabel: "View applications",
    link: `${JOB_SEEKER_DASHBOARD_PATH}#applications`,
  },
  {
    label: "My resumes",
    ariaLabel: "View and edit your resumes",
    link: JOB_SEEKER_MY_RESUMES_PATH,
  },
  {
    label: "Search",
    ariaLabel: "Go to search",
    link: JOB_SEEKER_SEARCH_PATH,
  },
  {
    label: "Profile",
    ariaLabel: "View profile",
    link: JOB_SEEKER_PROFILE_PATH,
  },
  {
    label: "Settings",
    ariaLabel: "Open settings",
    link: JOB_SEEKER_SETTINGS_PATH,
  },
];
