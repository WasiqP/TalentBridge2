import type { Metadata } from "next";

import { JobSeekerSearchPage } from "@/components/dashboard/job-seeker-search-page";

export const metadata: Metadata = {
  title: "Search",
  description: "Search jobs and opportunities on TalentBridge.",
};

export default function Page() {
  return <JobSeekerSearchPage />;
}
