import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The rules of the road for using TalentBridge. Short, clear, and written so a human can read them.",
};

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: "By creating an account or using TalentBridge, you agree to these Terms and our Privacy Policy. If you're using TalentBridge on behalf of an organization, you confirm that you have authority to bind that organization.",
  },
  {
    id: "service",
    title: "The service",
    body: "TalentBridge provides AI-powered recruiting tooling — sourcing, screening, outreach, analytics. We continuously improve the product and may add, remove, or change features. Material changes are announced in advance.",
  },
  {
    id: "your-account",
    title: "Your account",
    body: "You're responsible for safeguarding your credentials and for activity under your account. Notify us immediately of any unauthorized use. We may suspend accounts that violate these Terms or pose a security risk.",
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: "Use TalentBridge for lawful recruiting activities only. Don't reverse-engineer the service, attempt to evade rate limits, send spam, infringe on any rights, or use the platform in ways that would discriminate against protected classes. We reserve the right to terminate accounts violating these rules.",
  },
  {
    id: "fees",
    title: "Fees and billing",
    body: "Subscription fees are billed monthly or annually. Plans renew automatically until cancelled. Refunds are not provided for partial periods. Enterprise customers operate under signed agreements that supersede this section.",
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: "You retain all rights to your data and your candidates' data. We retain all rights to the TalentBridge service. AI outputs generated for your team are yours to use; please attribute generated content appropriately when shared externally.",
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, TalentBridge is not liable for indirect, incidental, or consequential damages. Aggregate liability is capped at the fees paid in the 12 months preceding the claim.",
  },
  {
    id: "termination",
    title: "Termination",
    body: "Either party may terminate at any time. Upon termination, we retain your data for 30 days, after which it is irreversibly deleted unless required by law. You can export your data at any time before that window closes.",
  },
  {
    id: "changes",
    title: "Changes to terms",
    body: "We update these Terms occasionally. Material changes are announced at least 30 days in advance via email and product notification. Continued use after the change constitutes acceptance.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust"
        title="Terms of Service"
        description="Last updated: May 1, 2026. Designed to be readable in under ten minutes."
      />

      <section className="bg-paper-50 py-20">
        <Container size="full">
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-400">
                Contents
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-ink-500 transition hover:text-ink-950"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="space-y-16">
              {sections.map((s) => (
                <article key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="text-balance text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-[1.75] text-ink-700">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
