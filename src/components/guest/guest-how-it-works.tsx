"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, UploadCloud } from "lucide-react";

import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { guestHowItWorksSteps } from "@/constants/guest-page";
import { guestJobs } from "@/constants/guest-page";
import { getProfileInitials, jobSeekerProfile } from "@/config/job-seeker-profile";

const STEP_COUNT = guestHowItWorksSteps.length;
const profile = jobSeekerProfile;
const topMatch = guestJobs[0];
const initials = getProfileInitials(profile.name);

function getStepIndex(progress: number) {
  if (progress <= 0) return 0;
  if (progress >= 1) return STEP_COUNT - 1;
  return Math.min(STEP_COUNT - 1, Math.round(progress * (STEP_COUNT - 1)));
}

/** Full-width scroll-pinned how-it-works for the guest page (no parent transforms). */
export function GuestHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollPerStep = () => window.innerHeight * 0.95;

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top 64px",
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
            duration: { min: 0.28, max: 0.55 },
            delay: 0.04,
            ease: "power2.inOut",
          },
          onUpdate(self) {
            setActiveStep(getStepIndex(self.progress));
          },
          onEnter: (self) => setActiveStep(getStepIndex(self.progress)),
          onEnterBack: (self) => setActiveStep(getStepIndex(self.progress)),
        });

        return () => st.kill();
      });

      mm.add("(max-width: 1023px)", () => {
        const triggers: ScrollTrigger[] = [];

        const stepEls = section.querySelectorAll<HTMLElement>("[data-guest-step]");
        stepEls.forEach((el, i) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: el,
              start: "top 72%",
              end: "bottom 32%",
              onEnter: () => setActiveStep(i),
              onEnterBack: () => setActiveStep(i),
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
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden rounded-t-[28px] bg-ink-950 text-paper-50 shadow-[0_-48px_120px_-32px_rgba(8,8,12,0.55)] sm:rounded-t-[36px]"
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

      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col lg:h-[calc(100dvh-4rem)] lg:min-h-0 lg:max-h-[calc(100dvh-4rem)] lg:overflow-hidden"
      >
        <header className="shrink-0 border-b border-paper-50/8 px-5 pb-8 pt-14 sm:px-10 sm:pb-9 sm:pt-16 lg:px-14 lg:pb-5 lg:pt-10 xl:px-16">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/12 bg-paper-50/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-100/70">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                How it works
              </span>
              <h2 className="mt-3 text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.03em] text-paper-50 lg:mt-2">
                Four steps from one file{" "}
                <span className="font-serif italic text-gradient-brand">
                  to your next role.
                </span>
              </h2>
              <p className="mt-3 max-w-lg text-pretty text-[14px] leading-relaxed text-paper-100/65 lg:hidden">
                Upload once, build your profile, see ranked matches, and apply —
                scroll to snap through each step.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-paper-50/10 bg-paper-50/[0.03] px-4 py-3 backdrop-blur lg:px-5 lg:py-3.5">
              <div className="text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-100/45">
                  Current step
                </p>
                <p className="mt-0.5 font-serif text-3xl italic leading-none text-paper-50 lg:text-[2rem]">
                  {guestHowItWorksSteps[activeStep]?.n ?? "01"}
                  <span className="text-paper-100/35"> / 04</span>
                </p>
              </div>
              <div aria-hidden className="hidden h-10 w-px bg-paper-50/10 sm:block" />
              <p className="hidden max-w-[120px] text-[11px] leading-snug text-paper-100/55 lg:block">
                Scroll to update the preview
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full min-h-0 max-w-[1440px] flex-1 items-center px-5 py-6 sm:px-10 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 lg:px-14 lg:py-4 xl:gap-12 xl:px-16">
          {/* Desktop — one step at a time, vertically centered in remaining space */}
          <div className="hidden h-full min-h-0 lg:flex lg:items-center">
            <div className="flex w-full items-stretch gap-4">
              <StepRail activeStep={activeStep} />

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-accent-lime/28 bg-accent-lime/[0.06] p-5"
                  >
                    <span className="font-mono text-[11px] tracking-[0.2em] text-accent-lime">
                      {guestHowItWorksSteps[activeStep]?.n}
                    </span>
                    <h3 className="mt-2 text-pretty text-xl font-medium tracking-tight text-paper-50">
                      {guestHowItWorksSteps[activeStep]?.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-pretty text-[14px] leading-relaxed text-paper-100/65">
                      {guestHowItWorksSteps[activeStep]?.description}
                    </p>
                    <span className="mt-4 inline-flex rounded-full border border-accent-lime/30 bg-accent-lime/10 px-3 py-1 text-[11px] font-medium text-accent-lime">
                      {guestHowItWorksSteps[activeStep]?.tag}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-5 flex items-center gap-2">
                  {guestHowItWorksSteps.map((step, i) => (
                    <button
                      key={step.n}
                      type="button"
                      aria-label={`Step ${step.n}: ${step.title}`}
                      aria-current={i === activeStep ? "step" : undefined}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === activeStep
                          ? "w-8 bg-accent-lime"
                          : "w-1.5 bg-paper-50/25",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile — stacked list */}
          <div className="relative lg:hidden">
            <ol className="relative space-y-3">
              {guestHowItWorksSteps.map((step, i) => {
                const isActive = i === activeStep;
                return (
                  <li
                    key={step.n}
                    data-guest-step
                    className={cn(
                      "relative rounded-2xl border p-5 transition-[border-color,background-color,opacity] duration-300",
                      isActive
                        ? "border-accent-lime/28 bg-accent-lime/[0.06] opacity-100"
                        : "border-paper-50/8 bg-paper-50/[0.02] opacity-45",
                    )}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] tracking-[0.2em] text-accent-lime">
                          {step.n}
                        </span>
                        <span className="rounded-full border border-paper-50/12 bg-paper-50/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-100/50">
                          {step.previewLabel}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-pretty text-lg font-medium tracking-tight text-paper-50">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-pretty text-[14px] leading-relaxed text-paper-100/60">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <StepPreview index={i} />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative hidden h-full min-h-0 lg:flex lg:items-center">
            <div className="w-full overflow-hidden rounded-3xl border border-paper-50/10 bg-paper-50/[0.03] shadow-2xl shadow-ink-950/40 backdrop-blur-xl">
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
                  talentdrobe.app
                </span>
              </div>

              <div className="relative overflow-hidden p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-100/45">
                      Step {guestHowItWorksSteps[activeStep]?.n} ·{" "}
                      {guestHowItWorksSteps[activeStep]?.previewLabel}
                    </p>
                    <div className="mt-5">
                      <StepPreview index={activeStep} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none flex shrink-0 items-center justify-center gap-2 border-t border-paper-50/8 py-3 text-[10px] uppercase tracking-[0.2em] text-paper-100/35 lg:py-2.5"
        >
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          Scroll to snap between steps
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/** Vertical step rail — height matches the card block so the trail tracks each step. */
function StepRail({ activeStep }: { activeStep: number }) {
  const progress = activeStep / (STEP_COUNT - 1);

  return (
    <div
      aria-hidden
      className="relative flex w-8 shrink-0 flex-col justify-between self-stretch py-2"
    >
      <div className="absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-paper-50/10" />
      <motion.div
        className="absolute left-1/2 top-3 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-accent-lime via-accent-cyan to-accent-violet"
        style={{ height: "calc(100% - 1.5rem)" }}
        animate={{ scaleY: progress }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {guestHowItWorksSteps.map((step, i) => {
        const isActive = i === activeStep;
        const isPast = i < activeStep;

        return (
          <motion.span
            key={step.n}
            className={cn(
              "relative z-10 mx-auto h-2.5 w-2.5 rounded-full ring-4 ring-ink-950",
              isActive || isPast ? "bg-accent-lime" : "bg-paper-50/25",
              isActive && "shadow-[0_0_16px_rgba(193,249,104,0.7)]",
            )}
            animate={{ scale: isActive ? 1.2 : 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </div>
  );
}

function StepPreview({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <PreviewUpload />;
    case 1:
      return <PreviewAgent />;
    case 2:
      return <PreviewMatches />;
    case 3:
      return <PreviewApply />;
    default:
      return null;
  }
}

function PreviewUpload() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-accent-lime/35 bg-accent-lime/[0.04] p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-paper-50/10 bg-paper-50/[0.04] text-accent-lime">
        <UploadCloud className="h-6 w-6" aria-hidden />
      </div>
      <p className="mt-4 text-sm font-medium text-paper-50">jordan-avery-resume.pdf</p>
      <p className="mt-1 font-mono text-[11px] text-paper-100/50">Parsing via TalentDrobe API</p>
      <p className="mt-4 font-mono text-[11px] text-accent-lime">
        → profile fields extracted · 96% confidence
      </p>
    </div>
  );
}

function PreviewAgent() {
  const messages = [
    { from: "you", text: "Should I aim for staff or senior design roles?" },
    {
      from: "agent",
      text: "Your scope at Northwind maps to senior IC. Staff is realistic in 12–18 months with systems work.",
    },
  ];
  return (
    <div className="space-y-2.5">
      {messages.map((m, i) => (
        <div
          key={i}
          className={cn(
            "max-w-[92%] rounded-2xl border px-4 py-3 text-[13px] leading-relaxed",
            m.from === "agent"
              ? "border-accent-lime/20 bg-accent-lime/[0.06] text-paper-100/85"
              : "ml-auto border-paper-50/8 bg-paper-50/[0.03] text-paper-100/70",
          )}
        >
          {m.text}
        </div>
      ))}
      <p className="pt-1 font-mono text-[11px] text-accent-cyan">
        ↑ answers grounded in your parsed profile
      </p>
    </div>
  );
}

function PreviewMatches() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-serif text-2xl italic text-paper-50">24 ranked</p>
        <span className="rounded-full border border-accent-lime/30 bg-accent-lime/10 px-2.5 py-0.5 text-[11px] text-accent-lime">
          explainable
        </span>
      </div>
      <AutoScrollRoleList />
    </div>
  );
}

function AutoScrollRoleList() {
  const prefersReducedMotion = useReducedMotion();
  const roles = guestJobs;

  return (
    <div className="relative h-[220px] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-ink-950 via-ink-950/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent"
      />

      <motion.div
        className="space-y-2"
        animate={
          prefersReducedMotion
            ? { y: 0 }
            : { y: ["0%", "-50%"] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        {[...roles, ...roles].map((job, i) => (
          <div
            key={`${job.id}-${i}`}
            className={cn(
              "flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm",
              i % roles.length === 0
                ? "border-accent-lime/25 bg-accent-lime/[0.06]"
                : "border-paper-50/8 bg-paper-50/[0.02]",
            )}
          >
            <div className="min-w-0 pr-3">
              <p className="truncate font-medium text-paper-50">{job.title}</p>
              <p className="truncate text-[11px] text-paper-100/50">{job.company}</p>
            </div>
            <span className="shrink-0 font-mono text-[13px] text-accent-lime">
              {job.match}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PreviewApply() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-paper-50/8 bg-paper-50/[0.02] p-4">
        <p className="text-sm font-medium text-paper-50">
          {topMatch.title} · {topMatch.company}
        </p>
        <div className="mt-4 space-y-2 text-[12px] text-paper-100/65">
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent-lime" />
            Résumé tailored for this role
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent-cyan" />
            Cover note drafted — awaiting your OK
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent-violet" />
            Application ready in 1 click
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-accent-lime/20 bg-accent-lime/[0.08] px-4 py-3">
        <span className="text-[13px] font-medium text-accent-lime">
          Approved & sent
        </span>
        <span className="font-mono text-[11px] text-paper-100/50">
          {profile.name.split(" ")[0]} · {initials}
        </span>
      </div>
    </div>
  );
}
