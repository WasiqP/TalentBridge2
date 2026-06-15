import { BentoFeatures } from "@/components/sections/bento-features";
import { FaqSection } from "@/components/sections/faq-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { GuestComparison } from "@/components/guest/guest-comparison";
import { GuestCta } from "@/components/guest/guest-cta";
import { GuestHeroCascade } from "@/components/guest/guest-hero-cascade";
import { GuestMetricsShowcase } from "@/components/guest/guest-metrics-showcase";
import { GuestProductShowcase } from "@/components/guest/guest-product-showcase";

/** Primary marketing home — job seeker landing (formerly `/guest-page`). */
export function JobSeekerHomePage() {
  return (
    <main className="min-h-svh bg-paper-50">
      <GuestHeroCascade />
      <BentoFeatures />
      <GuestProductShowcase />
      <GuestMetricsShowcase />
      <PricingSection />
      <GuestComparison />
      <FaqSection />
      <GuestCta />
    </main>
  );
}
