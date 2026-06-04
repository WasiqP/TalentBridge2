import type { StaggeredMenuItem } from "@/components/ui/staggered-menu";

import {
  HIRING_AGENCY_DASHBOARD_PATH,
  HIRING_AGENCY_NEW_ROLE_PATH,
} from "@/config/dashboard-routes";

export const hiringAgencyMenuItems: StaggeredMenuItem[] = [
  {
    label: "Pipeline",
    ariaLabel: "Go to hiring pipeline",
    link: HIRING_AGENCY_DASHBOARD_PATH,
  },
  {
    label: "Post a role",
    ariaLabel: "Create a new job posting",
    link: HIRING_AGENCY_NEW_ROLE_PATH,
  },
  {
    label: "Shortlist",
    ariaLabel: "View shortlisted candidates",
    link: `${HIRING_AGENCY_DASHBOARD_PATH}#shortlist`,
  },
];
