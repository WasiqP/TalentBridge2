import type { Metadata } from "next";

import { JobSeekerSettingsPage } from "@/components/dashboard/job-seeker-settings-page";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your TalentBridge account, notifications, and job seeker preferences.",
};

export default function Page() {
  return <JobSeekerSettingsPage />;
}
