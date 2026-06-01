import type { Metadata } from "next";

import { JobSeekerDashboardShell } from "@/components/dashboard/job-seeker-dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your TalentBridge job seeker workspace.",
  robots: { index: false, follow: false },
};

export default function JobSeekerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobSeekerDashboardShell>{children}</JobSeekerDashboardShell>;
}
