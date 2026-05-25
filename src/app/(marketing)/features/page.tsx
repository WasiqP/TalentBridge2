import type { Metadata } from "next";
import {
  BarChart3,
  FileScan,
  LineChart,
  Mail,
  Plug,
  Radar,
  type LucideIcon,
} from "lucide-react";

import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { IntegrationsCloud } from "@/components/sections/integrations-cloud";
import { PageHero } from "@/components/sections/page-hero";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { features } from "@/constants/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore every capability of TalentBridge — autonomous sourcing, explainable ranking, personalized outreach, and pipeline analytics.",
};

const icons: Record<string, LucideIcon> = {
  Radar,
  BarChart3,
  Mail,
  FileScan,
  LineChart,
  Plug,
};

const featureDetails: Record<
  string,
  { tagline: string; longDescription: string; bullets: string[] }
> = {
  sourcing: {
    tagline: "Sourcing on autopilot, 24/7.",
    longDescription:
      "Per-role sourcing agents scan LinkedIn, GitHub, conference speakers, OSS contributors, and the open web — building a steady stream of qualified profiles with explainable rationale on every surface.",
    bullets: [
      "14+ source surfaces out of the box",
      "Source freshness + diversity scoring",
      "Per-role agent budgets and approval checkpoints",
      "EU + US sources with per-role data residency",
    ],
  },
  ranking: {
    tagline: "Explainable scoring, every time.",
    longDescription:
      "Define a custom rubric in plain language. Every candidate is scored against it with a structured rationale you can show your hiring manager — or your legal team.",
    bullets: [
      "Plain-language rubrics, no Boolean syntax",
      "Structured pros / cons / gaps per candidate",
      "Confidence intervals on every signal",
      "One-click feedback re-tunes the model",
    ],
  },
  outreach: {
    tagline: "Reply rates that don't feel automated.",
    longDescription:
      "Drafts trained on your highest-performing replies. Build multi-touch sequences with conditional logic, and see every channel reply in one unified thread.",
    bullets: [
      "Tone-matched to your past wins",
      "Multi-touch sequences with conditional steps",
      "Unified inbox: email, LinkedIn, SMS",
      "Reply detection that pauses sequences automatically",
    ],
  },
  screening: {
    tagline: "2,000 resumes a minute. Real intelligence on each.",
    longDescription:
      "Real-time parsing extracts skills, projects, signal strength, and red flags. Resume intelligence runs continuously as candidates flow in from any source.",
    bullets: [
      "Real-time skills graph extraction",
      "Project signal scoring",
      "Duplicate + red-flag detection",
      "Custom field extraction per role",
    ],
  },
  insights: {
    tagline: "Hiring intelligence at the org level.",
    longDescription:
      "Real-time funnel, recruiter load, and quality-of-hire forecasts. Quarterly bias audits are built in — board-ready, recruiter-friendly.",
    bullets: [
      "Funnel + stage drop-off analytics",
      "Quality-of-hire forecasting",
      "Quarterly bias audit dashboard",
      "Source ROI + cost-per-hire breakdowns",
    ],
  },
  integrations: {
    tagline: "Works with the stack you already love.",
    longDescription:
      "Two-way sync with every modern ATS, plus the apps your team lives in. SAML SSO and SCIM for enterprise, open API for anything else.",
    bullets: [
      "Greenhouse, Lever, Ashby, Workday, SmartRecruiters",
      "Slack, Teams, Notion, Linear, Gmail, Outlook",
      "SAML SSO + SCIM provisioning",
      "Open API + webhooks",
    ],
  },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Every capability your team needs."
        italic="None of the busywork they don't."
        description="A platform built recruiter-first, then scaled to the org. Explore the surfaces, then book a demo."
      />

      <section className="bg-paper-50 py-20">
        <Container size="full">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-400">
                On this page
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {features.map((f) => (
                  <li key={f.id}>
                    <a
                      href={`#${f.id}`}
                      className="block text-ink-500 transition hover:text-ink-950"
                    >
                      {f.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="space-y-24">
              {features.map((feature) => {
                const Icon = icons[feature.icon] ?? Radar;
                const detail = featureDetails[feature.id];
                return (
                  <FadeUp
                    key={feature.id}
                    id={feature.id}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-950 text-accent-lime">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-ink-500">
                        {feature.id.replace("-", " ")}
                      </span>
                    </div>
                    <h2 className="mt-5 text-balance text-3xl font-medium tracking-tight text-ink-950 sm:text-4xl">
                      {feature.title}.{" "}
                      <span className="font-serif italic text-ink-700">
                        {detail.tagline}
                      </span>
                    </h2>
                    <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-500">
                      {detail.longDescription}
                    </p>
                    <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                      {detail.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 rounded-2xl border border-ink-900/8 bg-paper-100 px-4 py-3 text-[14px] text-ink-700"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-950" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <IntegrationsCloud />
      <FaqSection />
      <CtaSection />
    </>
  );
}
