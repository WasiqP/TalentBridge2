import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";

import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHero } from "@/components/sections/page-hero";
import { PricingSection } from "@/components/sections/pricing-section";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, scale-with-you pricing for TalentBridge. Start free for 14 days. No credit card.",
};

const comparison = [
  {
    category: "Sourcing",
    rows: [
      { feature: "Active roles", starter: "3", growth: "Unlimited", enterprise: "Unlimited" },
      { feature: "AI sourcing credits", starter: "500 / mo", growth: "5,000 / mo", enterprise: "Custom" },
      { feature: "Autonomous agents", starter: false, growth: true, enterprise: true },
      { feature: "Source diversity scoring", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: "Screening & ranking",
    rows: [
      { feature: "Resume intelligence", starter: true, growth: true, enterprise: true },
      { feature: "Explainable scoring", starter: true, growth: true, enterprise: true },
      { feature: "Custom rubrics", starter: "1", growth: "Unlimited", enterprise: "Unlimited" },
      { feature: "Bias audit dashboard", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: "Outreach",
    rows: [
      { feature: "Personalized drafts", starter: true, growth: true, enterprise: true },
      { feature: "Multi-touch sequences", starter: false, growth: true, enterprise: true },
      { feature: "Unified inbox", starter: false, growth: true, enterprise: true },
      { feature: "Custom voice model", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    category: "Security",
    rows: [
      { feature: "SOC 2 Type II", starter: true, growth: true, enterprise: true },
      { feature: "SAML SSO", starter: false, growth: false, enterprise: true },
      { feature: "SCIM provisioning", starter: false, growth: false, enterprise: true },
      { feature: "Data residency (EU/US)", starter: false, growth: false, enterprise: true },
      { feature: "Custom DPA", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    category: "Support",
    rows: [
      { feature: "Community support", starter: true, growth: true, enterprise: true },
      { feature: "Priority support", starter: false, growth: true, enterprise: true },
      { feature: "Dedicated CSM", starter: false, growth: false, enterprise: true },
      { feature: "99.99% uptime SLA", starter: false, growth: false, enterprise: true },
    ],
  },
];

function cellRender(v: string | boolean) {
  if (v === true) return <Check className="h-4 w-4 text-ink-950" />;
  if (v === false) return <Minus className="h-4 w-4 text-ink-300" />;
  return <span className="text-[13px] text-ink-700">{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Built to scale with"
        italic="every hire you make."
        description="Transparent pricing for individual recruiters to global hiring orgs. Start free for 14 days — no credit card."
      />

      <PricingSection bare />

      <section className="bg-paper-100 py-24 sm:py-32">
        <Container size="full">
          <FadeUp>
            <SectionHeading
              eyebrow="Compare"
              title={
                <>
                  Every feature,{" "}
                  <span className="font-serif italic text-ink-700">
                    side by side.
                  </span>
                </>
              }
              centered
            />
          </FadeUp>

          <FadeUp delay={0.05}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-ink-900/8 bg-paper-50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-ink-900/8 bg-paper-100">
                    <th className="px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-ink-500">
                      Feature
                    </th>
                    <th className="px-5 py-4 text-[13px] font-medium text-ink-950">
                      Starter
                    </th>
                    <th className="px-5 py-4 text-[13px] font-medium text-ink-950">
                      Growth
                    </th>
                    <th className="px-5 py-4 text-[13px] font-medium text-ink-950">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                {comparison.map((group) => (
                  <tbody key={group.category}>
                    <tr className="border-b border-ink-900/8 bg-paper-100/60">
                      <td
                        colSpan={4}
                        className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500"
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-ink-900/6 last:border-b-0"
                      >
                        <td className="px-5 py-3 text-[14px] text-ink-700">
                          {row.feature}
                        </td>
                        <td className="px-5 py-3">{cellRender(row.starter)}</td>
                        <td className="px-5 py-3">{cellRender(row.growth)}</td>
                        <td className="px-5 py-3">
                          {cellRender(row.enterprise)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </FadeUp>
        </Container>
      </section>

      <FaqSection />
      <CtaSection />
    </>
  );
}
