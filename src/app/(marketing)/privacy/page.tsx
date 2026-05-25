import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TalentBridge handles your data, your candidates' data, and the principles behind every line of our code.",
};

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: "TalentBridge ('we', 'us') builds AI tooling for recruiters. This policy describes the data we collect, how we use it, who we share it with, and the rights you have. We are SOC 2 Type II certified and operate under GDPR and CCPA. We do not sell personal data.",
  },
  {
    id: "data-we-collect",
    title: "Data we collect",
    body: "Account data: name, email, role, employer, billing details. Candidate data: profiles, resumes, communications surfaced via integrations you authorize. Telemetry: product usage, page views, performance metrics — never tied to candidate identifiers. We use cookies only where strictly necessary and for product analytics with consent.",
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: "To deliver and improve the product, secure your account, generate explainable AI outputs, surface analytics back to your team, and meet legal obligations. We never train shared foundation models on customer data. Per-team models, when enabled, are isolated by tenant.",
  },
  {
    id: "data-sharing",
    title: "Data sharing",
    body: "We use a short list of carefully vetted sub-processors (cloud hosting, payments, email delivery, observability). The full list is maintained at /privacy/subprocessors and we notify customers in advance of any changes. We disclose data only when legally required or to defend our rights, and we challenge overbroad requests.",
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: "You can access, correct, export, or delete your data at any time from product settings or by writing to privacy@talentbridge.ai. We respond within 30 days. EU residents may file a complaint with their supervisory authority.",
  },
  {
    id: "security",
    title: "Security",
    body: "Encryption at rest and in transit. Per-tenant isolation. Continuous monitoring and quarterly penetration testing. SOC 2 Type II report available under NDA. Customer-specific data residency available on Enterprise plans (EU or US).",
  },
  {
    id: "retention",
    title: "Data retention",
    body: "Account data is retained for the life of your subscription and deleted within 30 days of termination unless legally required to keep it longer. Candidate data follows your team's policy; defaults are configurable per role.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "Questions? Write to privacy@talentbridge.ai or to our mailing address on the contact page. For DPA, BAA, or other compliance documentation, request from your account manager or sales@talentbridge.ai.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust"
        title="Privacy Policy"
        description="Last updated: May 1, 2026. Plain-language version available on request — same rules, friendlier sentences."
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
