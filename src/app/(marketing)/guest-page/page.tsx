import type { Metadata } from "next";

import { CVGallery } from "@/components/sections/cv-gallery";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { ResumeMarquee } from "@/components/sections/resume-marquee";
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";
import { GuestHero } from "@/components/guest/guest-hero";
import { GuestProfileBuild } from "@/components/guest/guest-profile-build";
import { GuestCareerAgent } from "@/components/guest/guest-career-agent";
import { GuestJobFeed } from "@/components/guest/guest-job-feed";
import { GuestJourney } from "@/components/guest/guest-journey";
import { GuestBento } from "@/components/guest/guest-bento";
import { GuestMetrics } from "@/components/guest/guest-metrics";
import { GuestCta } from "@/components/guest/guest-cta";

export const metadata: Metadata = {
  title: "Find your next job in minutes — TalentBridge for job seekers",
  description:
    "Drop your résumé once. TalentBridge builds your profile in seconds, gives you an AI career agent, and surfaces ranked job matches you can apply to in one click.",
};

export default function GuestPage() {
  return (
    <>
      <GuestHero />
      <GuestProfileBuild />
      <GuestCareerAgent />
      <GuestJobFeed />
      <GuestJourney />
      <CVGallery />
      <ResumeMarquee />
      <GuestBento />
      <GuestMetrics />
      <TestimonialsMarquee />
      <LogoMarquee />
      <GuestCta />
    </>
  );
}
