"use client";

import { motion } from "motion/react";
import {
  BarChart3,
  FileScan,
  LineChart,
  Mail,
  Plug,
  Radar,
  type LucideIcon,
} from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { features } from "@/constants/features";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Radar,
  BarChart3,
  Mail,
  FileScan,
  LineChart,
  Plug,
};

export function BentoFeatures() {
  return (
    <section className="bg-paper-50 py-24 sm:py-32">
      <Container size="full">
        <FadeUp>
          <SectionHeading
            eyebrow="The platform"
            title={
              <>
                One platform.{" "}
                <span className="font-serif italic text-ink-700">
                  Every part of the funnel.
                </span>
              </>
            }
            description="From sourcing to scheduling, TalentBridge handles the grind so your team can focus on the human work that wins hires."
            centered
          />
        </FadeUp>

        <div className="mt-16 grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-4 lg:grid-cols-6">
          {features.map((feature, i) => {
            const Icon = icons[feature.icon] ?? Radar;
            const spanClass = getSpan(feature.span ?? "md");
            return (
              <FadeUp
                key={feature.id}
                delay={i * 0.06}
                className={cn(spanClass)}
              >
                <SpotlightCard
                  className={cn(
                    "h-full border border-ink-900/8 bg-ink-950 p-7 text-paper-50",
                    i === 0 && "lg:col-span-4",
                  )}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-paper-50/5 ring-1 ring-paper-50/10">
                        <Icon className="h-4 w-4 text-accent-lime" />
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-paper-100/45">
                        {feature.id.replace("-", " ")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-pretty text-2xl font-medium tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 max-w-md text-pretty text-[15px] leading-relaxed text-paper-100/65">
                      {feature.description}
                    </p>

                    {feature.id === "sourcing" && <SourcingVisual />}
                    {feature.id === "ranking" && <RankingVisual />}
                    {feature.id === "outreach" && <OutreachVisual />}
                    {feature.id === "screening" && <ScreeningVisual />}
                    {feature.id === "insights" && <InsightsVisual />}
                    {feature.id === "integrations" && <IntegrationsVisual />}

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {feature.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-paper-50/10 bg-paper-50/[0.03] px-2.5 py-1 text-[11px] text-paper-100/70"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function getSpan(span: "sm" | "md" | "lg" | "xl") {
  switch (span) {
    case "xl":
      return "lg:col-span-4";
    case "lg":
      return "lg:col-span-4";
    case "md":
      return "lg:col-span-2";
    default:
      return "lg:col-span-2";
  }
}

function SourcingVisual() {
  return (
    <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl border border-paper-50/8 bg-paper-50/[0.02] p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-paper-100/45">Live agents</span>
        <span className="text-[11px] text-accent-lime">3 active</span>
      </div>
      <div className="mt-4 space-y-2">
        {[
          { name: "LinkedIn sourcer", progress: 78 },
          { name: "GitHub crawler", progress: 54 },
          { name: "Portfolio scout", progress: 31 },
        ].map((a) => (
          <div key={a.name}>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-paper-100/70">{a.name}</span>
              <span className="font-mono text-paper-100/40">{a.progress}%</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-paper-50/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-violet"
                initial={{ width: 0 }}
                whileInView={{ width: `${a.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RankingVisual() {
  return (
    <div className="mt-6 flex-1 overflow-hidden rounded-2xl border border-paper-50/8 bg-paper-50/[0.02] p-4">
      <div className="space-y-1.5">
        {[96, 93, 88, 81, 72].map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-paper-50/[0.03] px-3 py-1.5"
          >
            <span className="font-mono text-[11px] text-paper-100/60">
              #{i + 1}
            </span>
            <div className="mx-3 h-1 flex-1 overflow-hidden rounded-full bg-paper-50/[0.06]">
              <div
                className="h-full rounded-full bg-accent-lime"
                style={{ width: `${s}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-paper-50">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutreachVisual() {
  return (
    <div className="mt-6 flex-1 overflow-hidden rounded-2xl border border-paper-50/8 bg-paper-50/[0.02] p-4">
      <div className="space-y-2 font-mono text-[11px] text-paper-100/70">
        <p>
          <span className="text-accent-lime">Hi Mei,</span>
        </p>
        <p>
          Saw your talk on edge inference at QCon — the part on KV cache eviction
          stuck with me.
        </p>
        <p>
          We&apos;re building the platform layer at <span className="text-accent-cyan">Northwind</span>{" "}
          and I think you&apos;d enjoy meeting our staff infra team.
        </p>
        <p className="text-paper-100/50">15-min chat next week?</p>
      </div>
    </div>
  );
}

function ScreeningVisual() {
  return (
    <div className="mt-6 flex-1 overflow-hidden rounded-2xl border border-paper-50/8 bg-paper-50/[0.02] p-4">
      <div className="flex items-baseline justify-between">
        <span className="font-serif text-3xl italic text-paper-50">2,041</span>
        <span className="text-[11px] uppercase tracking-[0.14em] text-paper-100/45">
          parsed / min
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
        {["Skills", "Projects", "Signal"].map((k) => (
          <div
            key={k}
            className="rounded-lg border border-paper-50/8 px-2 py-1.5 text-paper-100/60"
          >
            <span className="block text-[10px] uppercase tracking-[0.12em] text-paper-100/40">
              {k}
            </span>
            <span className="font-mono">extracted</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsVisual() {
  return (
    <div className="mt-6 flex-1 overflow-hidden rounded-2xl border border-paper-50/8 bg-paper-50/[0.02] p-4">
      <svg viewBox="0 0 200 80" className="w-full">
        <defs>
          <linearGradient id="ic" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c1f968" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c1f968" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 Q 30 30 60 40 T 120 25 T 200 15 L 200 80 L 0 80 Z"
          fill="url(#ic)"
        />
        <path
          d="M0 60 Q 30 30 60 40 T 120 25 T 200 15"
          stroke="#c1f968"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-paper-100/45">
        <span>Mon</span>
        <span>Wed</span>
        <span>Fri</span>
      </div>
    </div>
  );
}

function IntegrationsVisual() {
  const tools = [
    "Greenhouse",
    "Lever",
    "Ashby",
    "Workday",
    "Slack",
    "Notion",
    "Linear",
    "LinkedIn",
    "GitHub",
    "Gmail",
  ];
  return (
    <div className="mt-6 flex flex-1 flex-wrap gap-2">
      {tools.map((t, i) => (
        <span
          key={t}
          className="rounded-full border border-paper-50/10 bg-paper-50/[0.04] px-3 py-1.5 font-serif text-[13px] italic text-paper-100/75"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
