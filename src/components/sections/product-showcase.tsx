"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "motion/react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const tabs = [
  {
    id: "sourcing",
    label: "Sourcing",
    title: "Agents that build pipeline while you sleep.",
    description:
      "Per-role sourcing agents scan LinkedIn, GitHub, and the open web around the clock, with source-diversity scoring and explainable rationale on every candidate they surface.",
    bullets: [
      "Multi-channel sourcing across 14+ surfaces",
      "Source diversity & freshness scoring",
      "Per-role agent budgets",
    ],
  },
  {
    id: "screening",
    label: "Screening",
    title: "Resume intelligence at 2,000/min.",
    description:
      "Real-time parsing extracts skills, projects, signal strength, and red flags. Every shortlist ships with the reasoning behind it — no black boxes.",
    bullets: [
      "Structured pros / cons / gaps",
      "Confidence intervals on every signal",
      "One-click feedback re-tunes the model",
    ],
  },
  {
    id: "outreach",
    label: "Outreach",
    title: "Messages in your voice. At any volume.",
    description:
      "Drafts trained on your highest-performing replies. Multi-touch sequences with conditional logic, unified across email, LinkedIn, and SMS.",
    bullets: [
      "Tone-matched to your past wins",
      "Conditional multi-touch sequences",
      "Unified inbox across channels",
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "Hiring intelligence at the org level.",
    description:
      "Real-time funnel, recruiter load, and quality-of-hire forecasts. Bias audits ship by default — board-ready, recruiter-friendly.",
    bullets: [
      "Funnel & stage drop-off",
      "Quality-of-hire forecasting",
      "Quarterly bias audit dashboard",
    ],
  },
];

export function ProductShowcase() {
  return (
    <section className="bg-paper-100 py-24 sm:py-32">
      <Container size="full">
        <FadeUp>
          <SectionHeading
            eyebrow="Tour the product"
            title={
              <>
                Four surfaces. One{" "}
                <span className="font-serif italic text-ink-700">copilot brain.</span>
              </>
            }
            description="Switch between the four core surfaces. Each one is built so a recruiter feels at home in under five minutes."
            centered
          />
        </FadeUp>

        <FadeUp delay={0.05}>
          <Tabs.Root defaultValue={tabs[0].id} className="mt-14">
            <Tabs.List className="mx-auto flex w-fit gap-1 rounded-full border border-ink-900/10 bg-paper-50 p-1">
              {tabs.map((t) => (
                <Tabs.Trigger
                  key={t.id}
                  value={t.id}
                  className="rounded-full px-4 py-1.5 text-sm text-ink-500 transition data-[state=active]:bg-ink-950 data-[state=active]:text-paper-50"
                >
                  {t.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="mt-10">
              {tabs.map((t) => (
                <Tabs.Content key={t.id} value={t.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="grid gap-10 lg:grid-cols-2 lg:gap-16"
                  >
                    <div>
                      <h3 className="text-balance text-3xl font-medium leading-tight tracking-tight text-ink-950 sm:text-4xl">
                        {t.title}
                      </h3>
                      <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-ink-500">
                        {t.description}
                      </p>
                      <ul className="mt-7 space-y-2.5 text-[14px] text-ink-700">
                        {t.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-950" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ProductMockup id={t.id} />
                  </motion.div>
                </Tabs.Content>
              ))}
            </div>
          </Tabs.Root>
        </FadeUp>
      </Container>
    </section>
  );
}

function ProductMockup({ id }: { id: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-950 p-2 text-paper-50">
      <div className="rounded-2xl border border-paper-50/8 bg-ink-900/50 p-5">
        <div className="flex items-center justify-between border-b border-paper-50/8 pb-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-100/45">
            {id}
          </p>
          <span className="rounded-md bg-paper-50/5 px-2 py-0.5 font-mono text-[11px] text-paper-100/55">
            v3.4
          </span>
        </div>
        {id === "sourcing" && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              "LinkedIn · 4,212",
              "GitHub · 1,891",
              "Portfolios · 612",
              "Open web · 304",
            ].map((s) => (
              <div
                key={s}
                className="rounded-xl border border-paper-50/8 bg-paper-50/[0.02] p-3 text-sm text-paper-100/75"
              >
                {s}
              </div>
            ))}
          </div>
        )}
        {id === "screening" && (
          <div className="mt-5 space-y-2 text-sm">
            {[
              { k: "Skills extracted", v: "12 strong · 4 emerging" },
              { k: "Project signal", v: "High · OSS + talks" },
              { k: "Red flags", v: "None detected" },
            ].map((r) => (
              <div
                key={r.k}
                className="flex items-center justify-between rounded-xl border border-paper-50/8 bg-paper-50/[0.02] px-3 py-2"
              >
                <span className="text-paper-100/55">{r.k}</span>
                <span className="text-paper-50">{r.v}</span>
              </div>
            ))}
          </div>
        )}
        {id === "outreach" && (
          <div className="mt-5 space-y-3 font-mono text-[12px] text-paper-100/75">
            <p>To: mei.tanaka@…</p>
            <p>Subject: edge inference talk + Northwind infra</p>
            <p className="text-paper-100/55">— body draft —</p>
            <p>Hey Mei,</p>
            <p>
              Your KV cache eviction talk at QCon was the clearest take I&apos;ve
              heard on real-world inference cost. We&apos;re wrestling with the
              same trade-offs.
            </p>
            <p className="text-accent-lime">→ ready to send · approved</p>
          </div>
        )}
        {id === "analytics" && (
          <div className="mt-5">
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "Time-to-fill", v: "−54%" },
                { l: "Reply rate", v: "41%" },
                { l: "Diverse share", v: "+38%" },
              ].map((m) => (
                <div
                  key={m.l}
                  className="rounded-xl border border-paper-50/8 bg-paper-50/[0.02] p-3"
                >
                  <p className="font-serif text-2xl italic text-paper-50">
                    {m.v}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-paper-100/45">
                    {m.l}
                  </p>
                </div>
              ))}
            </div>
            <svg viewBox="0 0 300 80" className="mt-5 w-full">
              <defs>
                <linearGradient id="ag" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#c1f968" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#c1f968" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 60 Q 40 50 80 40 T 160 25 T 240 18 T 300 12 L 300 80 L 0 80 Z"
                fill="url(#ag)"
              />
              <path
                d="M0 60 Q 40 50 80 40 T 160 25 T 240 18 T 300 12"
                stroke="#c1f968"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
