"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Describe the role",
    description:
      "Drop a job description or write a one-line brief. TalentBridge builds a structured rubric you can edit and reuse.",
  },
  {
    n: "02",
    title: "Agents go to work",
    description:
      "Sourcing, screening, and outreach agents kick off in parallel. You get a streaming activity feed and approval checkpoints.",
  },
  {
    n: "03",
    title: "Review a calibrated shortlist",
    description:
      "Every candidate ships with explainable scoring. Thumbs-up the ones you love — the model recalibrates instantly.",
  },
  {
    n: "04",
    title: "Move to interview, fast",
    description:
      "Auto-schedule with your calendar, sync notes back to your ATS, and close roles in days instead of months.",
  },
];

export function HowItWorksPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: `+=${steps.length * 70}%`,
        pin: ".pin-target",
        pinSpacing: true,
        scrub: false,
        onUpdate(self) {
          const idx = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length),
          );
          setActive(idx);
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-ink-950 text-paper-50">
      <div className="pin-target relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/4 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent-lime/10 blur-[120px]"
        />
        <Container
          size="full"
          className="relative flex min-h-screen flex-col justify-center py-20"
        >
          <div className="max-w-2xl">
            <SectionHeading
              light
              eyebrow="How it works"
              title={
                <>
                  Four steps from blank page{" "}
                  <span className="font-serif italic">to qualified shortlist.</span>
                </>
              }
              description="Built so a recruiter can launch a role over coffee — and have results by the second cup."
            />
          </div>

          <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
            <ol className="relative space-y-2">
              {steps.map((step, i) => (
                <li
                  key={step.n}
                  className={cn(
                    "relative rounded-2xl border p-6 transition duration-500",
                    active === i
                      ? "border-accent-lime/30 bg-accent-lime/[0.06]"
                      : "border-paper-50/8 bg-paper-50/[0.02]",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "font-mono text-[11px] tracking-[0.18em]",
                        active === i ? "text-accent-lime" : "text-paper-100/40",
                      )}
                    >
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-pretty text-xl font-medium tracking-tight">
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 max-w-md text-pretty text-[14px] leading-relaxed transition",
                          active === i
                            ? "text-paper-100/80"
                            : "text-paper-100/50",
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <StepVisual active={active} />
          </div>
        </Container>
      </div>
    </section>
  );
}

function StepVisual({ active }: { active: number }) {
  return (
    <div className="sticky top-32 hidden lg:block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-paper-50/10 bg-paper-50/[0.03] p-6 backdrop-blur">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-100/45">
          Step {active + 1} · live preview
        </p>
        <div className="mt-6 space-y-3">
          {active === 0 && <StepDescribe />}
          {active === 1 && <StepAgents />}
          {active === 2 && <StepShortlist />}
          {active === 3 && <StepClose />}
        </div>
      </div>
    </div>
  );
}

function StepDescribe() {
  return (
    <div className="space-y-3 font-mono text-[12px] text-paper-100/70">
      <p>role: Senior Platform Engineer</p>
      <p>seniority: 6-10 YoE</p>
      <p>must_have: distributed_systems, rust_or_go</p>
      <p>nice_to_have: oss_contributions, conf_talks</p>
      <p className="text-accent-lime">→ rubric generated · 12 signals</p>
    </div>
  );
}

function StepAgents() {
  return (
    <div className="space-y-2 text-sm">
      {[
        { name: "Sourcer", state: "Scanning · 1,204 profiles" },
        { name: "Screener", state: "Parsing · 412 resumes" },
        { name: "Outreach", state: "Drafting · 38 messages" },
      ].map((a) => (
        <div
          key={a.name}
          className="flex items-center justify-between rounded-xl border border-paper-50/8 bg-paper-50/[0.02] px-3 py-2"
        >
          <span className="flex items-center gap-2 text-paper-100/80">
            <span className="relative h-1.5 w-1.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-lime/60" />
              <span className="absolute inset-0 rounded-full bg-accent-lime" />
            </span>
            {a.name}
          </span>
          <span className="text-[12px] text-paper-100/55">{a.state}</span>
        </div>
      ))}
    </div>
  );
}

function StepShortlist() {
  return (
    <div className="space-y-2">
      {[
        { n: "Devon Ainsley", s: 96 },
        { n: "Mei Tanaka", s: 93 },
        { n: "Aisha Khan", s: 91 },
      ].map((c) => (
        <div
          key={c.n}
          className="flex items-center justify-between rounded-xl border border-paper-50/8 bg-paper-50/[0.02] px-3 py-2 text-sm"
        >
          <span className="text-paper-50">{c.n}</span>
          <span className="font-mono text-[12px] text-accent-lime">
            {c.s}
          </span>
        </div>
      ))}
    </div>
  );
}

function StepClose() {
  return (
    <div className="rounded-xl border border-paper-50/8 bg-paper-50/[0.02] p-4 text-sm text-paper-100/75">
      <p className="text-paper-50">Devon Ainsley · Senior Platform Engineer</p>
      <p className="mt-2 text-[12px] text-paper-100/60">
        Interview scheduled · Tuesday 2:00 PM PT
      </p>
      <p className="mt-1 text-[12px] text-paper-100/60">
        Synced to Greenhouse · Slack DM sent
      </p>
      <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-accent-lime">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" /> closed in 4 days
      </p>
    </div>
  );
}
