import type { Metadata } from "next";

import { HiringAgencyDashboardShell } from "@/components/dashboard/hiring-agency-dashboard-shell";

export const metadata: Metadata = {
  title: "Recruiter dashboard",
  description: "Your TalentBridge hiring agency workspace.",
  robots: { index: false, follow: false },
};

export default function HiringAgencyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HiringAgencyDashboardShell>{children}</HiringAgencyDashboardShell>;
}
