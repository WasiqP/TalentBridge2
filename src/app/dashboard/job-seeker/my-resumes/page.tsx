import type { Metadata } from "next";

import { JobSeekerMyResumesPage } from "@/components/dashboard/job-seeker-my-resumes-page";

export const metadata: Metadata = {
  title: "My resumes",
  description:
    "View, edit, and save your resumes on TalentDrobe.",
};

export default function Page() {
  return <JobSeekerMyResumesPage />;
}
