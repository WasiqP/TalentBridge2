import type { Metadata } from "next";

import { JobSeekerHomePage } from "@/components/home/job-seeker-home-page";

export const metadata: Metadata = {
  title: "Find your next role — TalentDrobe",
  description:
    "Upload your CV, build your profile, and find roles that fit. TalentDrobe is built for job seekers who want signal over noise.",
};

export default function HomePage() {
  return <JobSeekerHomePage />;
}
