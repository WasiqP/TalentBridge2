"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";
import { FileCheck2, Sparkles } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  resumeCardsRow1,
  resumeCardsRow2,
  type ResumeCardData,
} from "@/constants/resume-cards";
import { cn } from "@/lib/utils";

export function ResumeMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-paper-100 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-900/15 to-transparent"
      />
      <Container size="full">
        <FadeUp>
          <SectionHeading
            eyebrow="The shortlist"
            title={
              <>
                Hundreds of candidates a day,{" "}
                <span className="font-serif italic text-ink-700">
                  ranked while you sleep.
                </span>
              </>
            }
            description="A live feed of resumes our agents surfaced this morning. Scroll to feel the throughput — the faster you scroll, the faster they fly."
            centered
          />
        </FadeUp>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper-100 to-transparent sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper-100 to-transparent sm:w-40"
      />

      <div className="mt-16 flex flex-col gap-5 sm:mt-20 sm:gap-6">
        <VelocityRow baseVelocity={-2.4} cards={resumeCardsRow1} />
        <VelocityRow baseVelocity={2.4} cards={resumeCardsRow2} />
      </div>

      <Container size="full" className="mt-14 sm:mt-20">
        <FadeUp>
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-full border border-ink-900/8 bg-paper-50 px-6 py-4 text-[12px] text-ink-500">
            <span className="inline-flex items-center gap-2">
              <FileCheck2 className="h-3.5 w-3.5 text-ink-950" />
              <span className="font-mono text-ink-950">2,041</span> resumes parsed
              today
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-ink-950" />
              <span className="font-mono text-ink-950">18</span> made it to the
              shortlist
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span className="inline-flex items-center gap-2">
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-lime/60" />
                <span className="absolute inset-0 rounded-full bg-accent-lime" />
              </span>
              agents live
            </span>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

type VelocityRowProps = {
  cards: ResumeCardData[];
  baseVelocity: number;
};

function VelocityRow({ cards, baseVelocity }: VelocityRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const items = [...cards, ...cards, ...cards, ...cards];

  return (
    <div className="overflow-hidden">
      <motion.div
        style={{ x }}
        className="flex w-max items-stretch gap-4 sm:gap-5"
      >
        {items.map((card, i) => (
          <ResumeCard key={`${card.name}-${i}`} {...card} />
        ))}
      </motion.div>
    </div>
  );
}

const toneStyles: Record<
  ResumeCardData["tone"],
  {
    card: string;
    pageHead: string;
    eyebrow: string;
    name: string;
    role: string;
    chip: string;
    bar: string;
    barTrack: string;
    barLabel: string;
    barValue: string;
    score: string;
    avatar: string;
    accent: string;
  }
> = {
  ink: {
    card: "bg-ink-950 text-paper-50 border-paper-50/8",
    pageHead: "bg-ink-900",
    eyebrow: "text-paper-100/45",
    name: "text-paper-50",
    role: "text-paper-100/65",
    chip: "border-paper-50/12 bg-paper-50/[0.04] text-paper-100/80",
    bar: "bg-accent-lime",
    barTrack: "bg-paper-50/[0.08]",
    barLabel: "text-paper-100/55",
    barValue: "text-paper-50",
    score: "border-accent-lime/30 bg-accent-lime/15 text-accent-lime",
    avatar: "from-accent-lime via-accent-cyan to-accent-violet text-ink-950",
    accent: "bg-accent-lime",
  },
  paper: {
    card: "bg-paper-50 text-ink-950 border-ink-900/8",
    pageHead: "bg-paper-100",
    eyebrow: "text-ink-400",
    name: "text-ink-950",
    role: "text-ink-500",
    chip: "border-ink-900/10 bg-paper-100 text-ink-700",
    bar: "bg-ink-950",
    barTrack: "bg-ink-900/8",
    barLabel: "text-ink-500",
    barValue: "text-ink-950",
    score: "border-ink-900/15 bg-ink-900/5 text-ink-950",
    avatar: "from-accent-lime/80 via-accent-cyan/80 to-accent-violet/80 text-ink-950",
    accent: "bg-ink-950",
  },
  lime: {
    card: "bg-accent-lime text-ink-950 border-ink-950/10",
    pageHead: "bg-accent-lime-dark/40",
    eyebrow: "text-ink-950/55",
    name: "text-ink-950",
    role: "text-ink-950/70",
    chip: "border-ink-950/15 bg-ink-950/5 text-ink-950",
    bar: "bg-ink-950",
    barTrack: "bg-ink-950/15",
    barLabel: "text-ink-950/60",
    barValue: "text-ink-950",
    score: "border-ink-950/20 bg-ink-950/5 text-ink-950",
    avatar: "from-ink-950 via-ink-800 to-ink-700 text-accent-lime",
    accent: "bg-ink-950",
  },
  violet: {
    card: "bg-accent-violet text-paper-50 border-paper-50/12",
    pageHead: "bg-accent-violet/80",
    eyebrow: "text-paper-100/55",
    name: "text-paper-50",
    role: "text-paper-100/75",
    chip: "border-paper-50/18 bg-paper-50/[0.08] text-paper-50",
    bar: "bg-accent-lime",
    barTrack: "bg-paper-50/15",
    barLabel: "text-paper-100/65",
    barValue: "text-paper-50",
    score: "border-accent-lime/30 bg-accent-lime/20 text-accent-lime",
    avatar: "from-accent-lime via-paper-50 to-accent-cyan text-ink-950",
    accent: "bg-accent-lime",
  },
  cyan: {
    card: "bg-accent-cyan text-ink-950 border-ink-950/10",
    pageHead: "bg-accent-cyan/70",
    eyebrow: "text-ink-950/55",
    name: "text-ink-950",
    role: "text-ink-950/70",
    chip: "border-ink-950/15 bg-ink-950/5 text-ink-950",
    bar: "bg-ink-950",
    barTrack: "bg-ink-950/15",
    barLabel: "text-ink-950/60",
    barValue: "text-ink-950",
    score: "border-ink-950/20 bg-ink-950/5 text-ink-950",
    avatar: "from-ink-950 via-ink-800 to-accent-violet text-paper-50",
    accent: "bg-ink-950",
  },
  amber: {
    card: "bg-accent-amber text-ink-950 border-ink-950/10",
    pageHead: "bg-accent-amber/70",
    eyebrow: "text-ink-950/55",
    name: "text-ink-950",
    role: "text-ink-950/70",
    chip: "border-ink-950/15 bg-ink-950/5 text-ink-950",
    bar: "bg-ink-950",
    barTrack: "bg-ink-950/15",
    barLabel: "text-ink-950/60",
    barValue: "text-ink-950",
    score: "border-ink-950/20 bg-ink-950/5 text-ink-950",
    avatar: "from-ink-950 via-accent-violet to-accent-cyan text-paper-50",
    accent: "bg-ink-950",
  },
};

function ResumeCard({
  name,
  role,
  company,
  location,
  score,
  skills,
  signals,
  tone,
}: ResumeCardData) {
  const t = toneStyles[tone];
  return (
    <article
      className={cn(
        "relative flex h-[300px] w-[300px] shrink-0 flex-col overflow-hidden rounded-[20px] border shadow-sm sm:h-[320px] sm:w-[340px]",
        t.card,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2.5 text-[10px] uppercase tracking-[0.16em]",
          t.pageHead,
          t.eyebrow,
        )}
      >
        <span className="font-mono">cv · {tone === "ink" ? "shortlist" : "screened"}</span>
        <span className={cn("font-mono", t.barValue)}>2026 · 05</span>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              aria-hidden
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[13px] font-medium",
                t.avatar,
              )}
            >
              {name
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </span>
            <div className="min-w-0">
              <p className={cn("truncate text-[15px] font-medium leading-tight", t.name)}>
                {name}
              </p>
              <p className={cn("truncate text-[12px] leading-tight mt-0.5", t.role)}>
                {role}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px]",
              t.score,
            )}
          >
            {score}
          </span>
        </div>

        <div className={cn("flex items-center gap-2 text-[11px]", t.role)}>
          {company && (
            <>
              <span className="truncate">{company}</span>
              <span aria-hidden className="opacity-50">
                ·
              </span>
            </>
          )}
          <span className="truncate">{location}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <span
              key={s}
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10.5px] font-medium",
                t.chip,
              )}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-2">
          {signals.map((sig) => (
            <div key={sig.label}>
              <div className="flex items-center justify-between text-[10.5px]">
                <span className={t.barLabel}>{sig.label}</span>
                <span className={cn("font-mono", t.barValue)}>{sig.value}</span>
              </div>
              <div
                className={cn(
                  "mt-1 h-[3px] overflow-hidden rounded-full",
                  t.barTrack,
                )}
              >
                <div
                  className={cn("h-full rounded-full", t.bar)}
                  style={{ width: `${sig.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-0 h-full w-[3px]",
          t.accent,
        )}
      />
    </article>
  );
}
