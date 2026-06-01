"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const STEP_COUNT = 4;

const steps = [
  {
    n: "01",
    title: "Describe the role",
    description:
      "Drop a job description or write a one-line brief. TalentBridge builds a structured rubric you can edit and reuse.",
    previewLabel: "Rubric builder",
  },
  {
    n: "02",
    title: "Agents go to work",
    description:
      "Sourcing, screening, and outreach agents kick off in parallel. You get a streaming activity feed and approval checkpoints.",
    previewLabel: "Agent activity",
  },
  {
    n: "03",
    title: "Review a calibrated shortlist",
    description:
      "Every candidate ships with explainable scoring. Thumbs-up the ones you love — the model recalibrates instantly.",
    previewLabel: "Shortlist",
  },
  {
    n: "04",
    title: "Move to interview, fast",
    description:
      "Auto-schedule with your calendar, sync notes back to your ATS, and close roles in days instead of months.",
    previewLabel: "Interview booked",
  },
] as const;

const inactiveStep = {
  opacity: 0.42,
  borderColor: "rgba(250, 250, 247, 0.08)",
  backgroundColor: "rgba(250, 250, 247, 0.02)",
};

const activeStep = {
  opacity: 1,
  borderColor: "rgba(193, 249, 104, 0.28)",
  backgroundColor: "rgba(193, 249, 104, 0.06)",
};

function getStepIndex(progress: number) {
  if (progress <= 0) return 0;
  if (progress >= 1) return STEP_COUNT - 1;
  return Math.min(
    STEP_COUNT - 1,
    Math.round(progress * (STEP_COUNT - 1)),
  );
}

export function HowItWorksPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressGlowRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const stepEls = stepRefs.current.filter(Boolean) as HTMLLIElement[];
      const previewEls = previewRefs.current.filter(Boolean) as HTMLDivElement[];
      const dotEls = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
      const fill = progressFillRef.current;
      const glow = progressGlowRef.current;
      const counter = counterRef.current;

      if (stepEls.length !== STEP_COUNT || previewEls.length !== STEP_COUNT) {
        return;
      }

      function applyStep(index: number) {
        if (activeIndexRef.current === index) return;
        activeIndexRef.current = index;

        previewEls.forEach((el, i) => {
          const isActive = i === index;
          gsap.killTweensOf(el);
          gsap.set(el, {
            autoAlpha: isActive ? 1 : 0,
            visibility: isActive ? "visible" : "hidden",
            pointerEvents: isActive ? "auto" : "none",
            zIndex: isActive ? 10 : 0,
            y: 0,
            display: isActive ? "block" : "none",
          });
        });

        stepEls.forEach((el, i) => {
          const isActive = i === index;
          gsap.killTweensOf(el);
          gsap.to(el, {
            ...(isActive ? activeStep : inactiveStep),
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        });

        dotEls.forEach((dot, i) => {
          gsap.to(dot, {
            backgroundColor:
              i === index
                ? "rgba(193, 249, 104, 1)"
                : "rgba(250, 250, 247, 0.22)",
            boxShadow:
              i === index
                ? "0 0 0 4px rgba(8, 8, 12, 1), 0 0 14px rgba(193, 249, 104, 0.55)"
                : "0 0 0 4px rgba(8, 8, 12, 1)",
            duration: 0.35,
            overwrite: true,
          });
        });

        const progress = index / (STEP_COUNT - 1);
        if (fill) {
          gsap.to(fill, {
            scaleY: progress,
            duration: 0.45,
            ease: "power2.out",
            overwrite: true,
          });
        }
        if (glow) {
          gsap.to(glow, {
            top: `${progress * 88}%`,
            duration: 0.45,
            ease: "power2.out",
            overwrite: true,
          });
        }
        if (counter) {
          counter.textContent = String(index + 1).padStart(2, "0");
        }
      }

      function applyStepImmediate(index: number) {
        activeIndexRef.current = -1;
        previewEls.forEach((el, i) => {
          const isActive = i === index;
          gsap.set(el, {
            autoAlpha: isActive ? 1 : 0,
            visibility: isActive ? "visible" : "hidden",
            pointerEvents: "none",
            zIndex: isActive ? 10 : 0,
            y: 0,
            display: isActive ? "block" : "none",
          });
        });
        stepEls.forEach((el, i) => {
          gsap.set(el, i === index ? activeStep : inactiveStep);
        });
        dotEls.forEach((dot, i) => {
          gsap.set(dot, {
            backgroundColor:
              i === index
                ? "rgba(193, 249, 104, 1)"
                : "rgba(250, 250, 247, 0.22)",
            boxShadow:
              i === index
                ? "0 0 0 4px rgba(8, 8, 12, 1), 0 0 14px rgba(193, 249, 104, 0.55)"
                : "0 0 0 4px rgba(8, 8, 12, 1)",
          });
        });
        const progress = index / (STEP_COUNT - 1);
        if (fill) gsap.set(fill, { scaleY: progress });
        if (glow) gsap.set(glow, { top: `${progress * 88}%` });
        if (counter) {
          counter.textContent = String(index + 1).padStart(2, "0");
        }
        activeIndexRef.current = index;
      }

      applyStepImmediate(0);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollPerStep = () => window.innerHeight * 0.92;

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${scrollPerStep() * (STEP_COUNT - 1)}`,
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => {
              const step = 1 / (STEP_COUNT - 1);
              return Math.round(value / step) * step;
            },
            duration: { min: 0.25, max: 0.6 },
            delay: 0.02,
            ease: "power2.inOut",
          },
          onUpdate(self) {
            applyStep(getStepIndex(self.progress));
          },
          onEnter: (self) => applyStep(getStepIndex(self.progress)),
          onEnterBack: (self) => applyStep(getStepIndex(self.progress)),
        });

        return () => st.kill();
      });

      mm.add("(max-width: 1023px)", () => {
        const triggers: ScrollTrigger[] = [];

        stepEls.forEach((step, i) => {
          const preview = previewEls[i];
          if (!preview) return;

          triggers.push(
            ScrollTrigger.create({
              trigger: step,
              start: "top 68%",
              end: "bottom 38%",
              onEnter: () => applyStepImmediate(i),
              onEnterBack: () => applyStepImmediate(i),
            }),
          );
        });

        return () => triggers.forEach((t) => t.kill());
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-paper-50 py-4 sm:py-6">
      <Container size="full">
        <div
          ref={sectionRef}
          className="relative isolate overflow-hidden rounded-[28px] bg-ink-950 text-paper-50 sm:rounded-[36px]"
        >
          <div className="absolute inset-0 bg-grid opacity-45" aria-hidden />
          <div
            aria-hidden
            className="absolute left-1/2 top-[-20%] h-[520px] w-[800px] -translate-x-1/2 rounded-full bg-accent-lime/12 blur-[130px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 right-[-8%] h-[420px] w-[420px] rounded-full bg-accent-violet/15 blur-[110px]"
          />

          <div ref={pinRef} className="relative flex min-h-[100svh] flex-col">
            <div className="border-b border-paper-50/8 px-5 py-10 sm:px-10 sm:py-12 lg:px-14">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/12 bg-paper-50/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-100/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                    How it works
                  </span>
                  <h2 className="mt-5 text-balance text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-paper-50">
                    Four steps from blank page{" "}
                    <span className="font-serif italic text-gradient-brand">
                      to qualified shortlist.
                    </span>
                  </h2>
                  <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-paper-100/65">
                    Built so a recruiter can launch a role over coffee — and have
                    results by the second cup. Scroll to snap through each step.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-paper-50/10 bg-paper-50/[0.03] px-5 py-4 backdrop-blur">
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-100/45">
                      Current step
                    </p>
                    <p className="mt-1 font-serif text-4xl italic leading-none text-paper-50">
                      <span ref={counterRef}>01</span>
                      <span className="text-paper-100/35"> / 04</span>
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="hidden h-12 w-px bg-paper-50/10 sm:block"
                  />
                  <p className="hidden max-w-[140px] text-[12px] leading-snug text-paper-100/55 sm:block">
                    Each scroll stops on one step — preview and list stay in sync.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid flex-1 gap-10 px-5 py-10 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:px-14 lg:py-14">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute bottom-4 left-[19px] top-4 hidden w-px bg-paper-50/10 lg:block"
                />
                <div
                  ref={progressFillRef}
                  aria-hidden
                  className="absolute left-[19px] top-4 hidden h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-accent-lime via-accent-cyan to-accent-violet lg:block"
                  style={{ transform: "scaleY(0)" }}
                />
                <div
                  ref={progressGlowRef}
                  aria-hidden
                  className="absolute left-[15px] hidden h-3 w-3 rounded-full bg-accent-lime shadow-[0_0_20px_rgba(193,249,104,0.8)] lg:block"
                  style={{ top: 0 }}
                />

                <ol className="relative space-y-3 lg:space-y-2">
                  {steps.map((step, i) => (
                    <li
                      key={step.n}
                      ref={(el) => {
                        stepRefs.current[i] = el;
                      }}
                      className={cn(
                        "relative rounded-2xl border border-paper-50/8 bg-paper-50/[0.02] p-5 lg:pl-14 lg:pr-6 lg:py-6",
                        i === 0 && "border-accent-lime/25 bg-accent-lime/[0.05]",
                      )}
                    >
                      <span
                        ref={(el) => {
                          dotRefs.current[i] = el;
                        }}
                        data-step-dot
                        aria-hidden
                        className={cn(
                          "absolute left-5 top-6 hidden h-2.5 w-2.5 rounded-full ring-4 ring-ink-950 lg:block",
                          i === 0 ? "bg-accent-lime" : "bg-paper-50/25",
                        )}
                      />

                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
                        <div className="flex items-center gap-3 lg:block lg:shrink-0">
                          <span className="font-mono text-[11px] tracking-[0.2em] text-accent-lime lg:absolute lg:left-5 lg:top-6">
                            {step.n}
                          </span>
                          <span className="rounded-full border border-paper-50/12 bg-paper-50/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-100/50 lg:hidden">
                            {step.previewLabel}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-pretty text-lg font-medium tracking-tight text-paper-50 sm:text-xl">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-pretty text-[14px] leading-relaxed text-paper-100/60">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 lg:hidden">
                        <MobilePreview index={i} />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="relative hidden lg:block">
                <div className="overflow-hidden rounded-3xl border border-paper-50/10 bg-paper-50/[0.03] shadow-2xl shadow-ink-950/40 backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-paper-50/8 px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-lime/50" />
                        <span className="relative h-2 w-2 rounded-full bg-accent-lime" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-100/50">
                        Live preview
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-paper-100/40">
                      talentbridge.app
                    </span>
                  </div>

                  <div className="relative isolate min-h-[440px] overflow-hidden">
                    {steps.map((step, i) => (
                      <div
                        key={step.n}
                        ref={(el) => {
                          previewRefs.current[i] = el;
                        }}
                        className={cn(
                          "absolute inset-0 overflow-hidden p-6",
                          i !== 0 && "invisible",
                        )}
                        style={{ zIndex: i === 0 ? 10 : 0 }}
                        aria-hidden={i !== 0}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-100/45">
                          Step {step.n} · {step.previewLabel}
                        </p>
                        <div className="mt-5">
                          <StepPreview index={i} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none flex items-center justify-center gap-2 border-t border-paper-50/8 py-4 text-[11px] uppercase tracking-[0.2em] text-paper-100/35"
            >
              <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
              Scroll to snap between steps
              <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MobilePreview({ index }: { index: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-paper-50/8 bg-ink-900/60 p-4">
      <StepPreview index={index} />
    </div>
  );
}

function StepPreview({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <PreviewDescribe />;
    case 1:
      return <PreviewAgents />;
    case 2:
      return <PreviewShortlist />;
    case 3:
      return <PreviewClose />;
    default:
      return null;
  }
}

function PreviewDescribe() {
  return (
    <div className="space-y-2.5 rounded-2xl border border-paper-50/8 bg-paper-50/[0.02] p-4 font-mono text-[12px] leading-relaxed text-paper-100/75">
      <Row k="role" v="Senior Platform Engineer" />
      <Row k="seniority" v="6–10 YoE" />
      <Row k="must_have" v="distributed_systems, rust_or_go" highlight />
      <Row k="nice_to_have" v="oss_contributions, conf_talks" />
      <p className="border-t border-paper-50/8 pt-3 text-accent-lime">
        → rubric generated · 12 signals mapped
      </p>
    </div>
  );
}

function PreviewAgents() {
  const agents = [
    {
      name: "Sourcer",
      channel: "LinkedIn",
      state: "Scanning",
      count: "1,204 profiles",
    },
    {
      name: "Screener",
      channel: "GitHub",
      state: "Parsing",
      count: "412 resumes",
    },
    {
      name: "Outreach",
      channel: "Email",
      state: "Drafting",
      count: "38 messages",
    },
  ];
  return (
    <div className="space-y-2">
      {agents.map((a) => (
        <div
          key={a.name}
          className="rounded-xl border border-paper-50/8 bg-paper-50/[0.02] px-4 py-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm font-medium text-paper-50">
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-lime/60" />
                <span className="absolute inset-0 rounded-full bg-accent-lime" />
              </span>
              {a.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-100/45">
              {a.channel}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[12px]">
            <span className="text-paper-100/55">{a.state}</span>
            <span className="font-mono text-paper-100/80">{a.count}</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-paper-50/[0.06]">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-violet" />
          </div>
        </div>
      ))}
      <p className="pt-1 font-mono text-[11px] text-accent-cyan">
        ↑ 3 agents running in parallel · awaiting approval
      </p>
    </div>
  );
}

function PreviewShortlist() {
  const candidates = [
    { n: "Devon Ainsley", s: 96, tag: "OSS · Rust" },
    { n: "Mei Tanaka", s: 93, tag: "Ex-Stripe · QCon" },
    { n: "Aisha Khan", s: 91, tag: "K8s operator" },
    { n: "Lukas Berger", s: 88, tag: "Backend lead" },
  ];
  return (
    <div className="space-y-2">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-serif text-2xl italic text-paper-50">18 ranked</p>
        <span className="rounded-full border border-accent-lime/30 bg-accent-lime/10 px-2.5 py-0.5 text-[11px] text-accent-lime">
          explainable
        </span>
      </div>
      {candidates.map((c, i) => (
        <div
          key={c.n}
          className={cn(
            "flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm",
            i === 0
              ? "border-accent-lime/25 bg-accent-lime/[0.06]"
              : "border-paper-50/8 bg-paper-50/[0.02]",
          )}
        >
          <div>
            <p className="font-medium text-paper-50">{c.n}</p>
            <p className="text-[11px] text-paper-100/50">{c.tag}</p>
          </div>
          <span className="font-mono text-[13px] text-accent-lime">{c.s}</span>
        </div>
      ))}
    </div>
  );
}

function PreviewClose() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-paper-50/8 bg-paper-50/[0.02] p-4">
        <p className="text-sm font-medium text-paper-50">
          Devon Ainsley · Senior Platform Engineer
        </p>
        <div className="mt-4 space-y-2 text-[12px] text-paper-100/65">
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent-lime" />
            Interview · Tue 2:00 PM PT
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent-cyan" />
            Synced to Greenhouse
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent-violet" />
            Slack DM sent to hiring manager
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-accent-lime/20 bg-accent-lime/[0.08] px-4 py-3">
        <span className="text-[13px] font-medium text-accent-lime">
          Role closed in 4 days
        </span>
        <span className="font-mono text-[11px] text-paper-100/50">
          ↑ vs 38d avg
        </span>
      </div>
    </div>
  );
}

function Row({
  k,
  v,
  highlight,
}: {
  k: string;
  v: string;
  highlight?: boolean;
}) {
  return (
    <p className={highlight ? "text-accent-cyan" : undefined}>
      <span className="text-paper-100/45">{k}:</span> {v}
    </p>
  );
}
