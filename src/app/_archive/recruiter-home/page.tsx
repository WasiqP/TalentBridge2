/**
 * ARCHIVED — previous recruiter-focused homepage (replaced by job-seeker home at `/`).
 * Kept for reference; this route is not publicly served (`_archive` is a private segment).
 *
 * To preview during development, temporarily move this file to e.g.
 * `src/app/(marketing)/recruiter-home/page.tsx`.
 */
import { BentoFeatures } from "@/components/sections/bento-features";
import { CtaSection } from "@/components/sections/cta-section";
import { CVGallery } from "@/components/sections/cv-gallery";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksPinned } from "@/components/sections/how-it-works-pinned";
import { IntegrationsCloud } from "@/components/sections/integrations-cloud";
import { MetricsCounter } from "@/components/sections/metrics-counter";
import { PricingSection } from "@/components/sections/pricing-section";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { ResumeMarquee } from "@/components/sections/resume-marquee";
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";

export default function ArchivedRecruiterHomePage() {
  return (
    <>
      <HeroSection />
      <ResumeMarquee />
      <BentoFeatures />
      <HowItWorksPinned />
      <CVGallery />
      <ProductShowcase />
      <MetricsCounter />
      <TestimonialsMarquee />
      <IntegrationsCloud />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
