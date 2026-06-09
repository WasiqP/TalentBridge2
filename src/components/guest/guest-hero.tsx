"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  FileText,
  Loader2,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import { Container } from "@/components/ui/container";
import {
  heroMatches,
  heroParseSteps,
  heroProfileSkills,
} from "@/constants/guest-page";
import { accentDot, accentSoft } from "@/components/guest/accent";
import { cn } from "@/lib/utils";

type Phase = "idle" | "uploading" | "parsing" | "matched";

const PHASE_MS: Record<Phase, number> = {
  idle: 2200,
  uploading: 1900,
  parsing: 3200,
  matched: 4200,
};

const NEXT: Record<Phase, Phase> = {
  idle: "uploading",
  uploading: "parsing",
  parsing: "matched",
  matched: "idle",
};

export function GuestHero() {
  return (
    <section className="relative bg-paper-50 pt-4 sm:pt-6">
      <Container size="full">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-ink-950 text-paper-50 sm:rounded-[40px]">
          <div className="absolute inset-0 -z-10 gradient-mesh" aria-hidden />
          <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
          <div
            className="absolute inset-0 -z-10 bg-noise opacity-[0.07] mix-blend-overlay"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute left-[-8%] top-[-20%] -z-10 h-[520px] w-[520px] rounded-full bg-accent-lime/25 blur-[150px]"
          />
          <div
            aria-hidden
            className="absolute right-[-10%] top-[10%] -z-10 h-[480px] w-[480px] rounded-full bg-accent-violet/30 blur-[150px]"
          />
          <div
            aria-hidden
            className="absolute bottom-[-25%] left-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-accent-cyan/20 blur-[150px]"
          />

          <div className="relative grid items-center gap-10 px-5 pb-12 pt-12 sm:px-10 sm:pb-16 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-16 lg:pb-20 lg:pt-20">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/[0.04] px-3 py-1.5 text-[12px] font-medium text-paper-100/85 backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent-lime" />
                Your AI career agent · for job seekers
              </motion.div>

              <h1 className="mt-7 text-balance text-[clamp(2.85rem,7.6vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.04em]">
                <TextReveal text="Your next job is" className="block" />
                <span className="block">
                  <span className="font-serif italic text-gradient-brand">
                    <TextReveal text="minutes away." delay={0.12} />
                  </span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-lg text-pretty text-[15px] leading-relaxed text-paper-100/70 sm:text-lg"
              >
                Drop your résumé once. We build your full profile in seconds, an
                AI agent talks through your career, and ranked job matches land
                instantly — apply in a single click.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 flex flex-wrap items-center gap-2.5"
              >
                <Magnetic>
                  <a
                    href="/sign-up"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent-lime px-6 text-[15px] font-medium text-ink-950 transition hover:bg-accent-lime-dark hover:shadow-glow-lime"
                  >
                    Drop your CV — it&apos;s free
                    <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                  </a>
                </Magnetic>
                <a
                  href="#agent"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/[0.04] px-5 text-[15px] font-medium text-paper-50 backdrop-blur transition hover:bg-paper-50/[0.08]"
                >
                  Meet your agent
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.95 }}
                className="mt-5 text-[12px] text-paper-100/45"
              >
                No long forms · No credit card · Profile ready in ~10 seconds
              </motion.p>
            </div>

            <HeroUploadDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroUploadDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schedule = useCallback((p: Phase) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPhase(NEXT[p]), PHASE_MS[p]);
  }, []);

  useEffect(() => {
    schedule(phase);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, schedule]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="relative rounded-[26px] border border-paper-50/12 bg-paper-50/[0.04] p-2 shadow-2xl shadow-ink-950/50 backdrop-blur-xl">
        <div className="overflow-hidden rounded-[20px] border border-paper-50/10 bg-ink-900/85">
          <div className="flex items-center gap-2 border-b border-paper-50/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-paper-50/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-paper-50/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-paper-50/20" />
            <span className="ml-3 flex items-center gap-1.5 rounded-md bg-paper-50/5 px-2 py-0.5 font-mono text-[11px] text-paper-100/55">
              talentbridge.app
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-lime/60" />
                <span className="absolute inset-0 rounded-full bg-accent-lime" />
              </span>
            </span>
          </div>

          <div className="relative min-h-[372px] p-5">
            <AnimatePresence mode="wait">
              {phase === "idle" && <IdlePane key="idle" onDrop={() => setPhase("uploading")} />}
              {phase === "uploading" && <UploadingPane key="uploading" />}
              {phase === "parsing" && <ParsingPane key="parsing" />}
              {phase === "matched" && <MatchedPane key="matched" />}
            </AnimatePresence>
          </div>

          <PhaseRail phase={phase} />
        </div>
      </div>
    </motion.div>
  );
}

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

function IdlePane({ onDrop }: { onDrop: () => void }) {
  return (
    <motion.div {...fade} className="flex h-full flex-col items-center justify-center">
      <button
        type="button"
        onClick={onDrop}
        className="group flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-paper-50/20 bg-paper-50/[0.02] px-6 py-14 text-center transition hover:border-accent-lime/50 hover:bg-accent-lime/[0.04]"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-paper-50/[0.06] text-accent-lime transition group-hover:scale-105">
          <UploadCloud className="h-7 w-7" />
        </span>
        <span>
          <span className="block text-[16px] font-medium text-paper-50">
            Drop your résumé here
          </span>
          <span className="mt-1 block text-[13px] text-paper-100/55">
            PDF or DOCX · we&apos;ll do the rest
          </span>
        </span>
        <span className="rounded-full bg-accent-lime px-4 py-1.5 text-[13px] font-medium text-ink-950">
          Try the demo
        </span>
      </button>
    </motion.div>
  );
}

function UploadingPane() {
  return (
    <motion.div {...fade} className="flex h-full flex-col justify-center gap-5">
      <div className="flex items-center gap-3 rounded-2xl border border-paper-50/10 bg-paper-50/[0.03] p-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-violet/20 text-accent-violet">
          <FileText className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium text-paper-50">
            maya-collins-resume.pdf
          </p>
          <p className="text-[12px] text-paper-100/50">248 KB</p>
        </div>
        <Loader2 className="h-4 w-4 animate-spin text-accent-lime" />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-[12px] text-paper-100/55">
          <span>Uploading…</span>
          <span className="font-mono text-paper-50">securing</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-paper-50/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-violet"
            initial={{ width: "8%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
      <p className="text-center text-[12px] text-paper-100/45">
        Encrypted in transit · never shared without your say-so
      </p>
    </motion.div>
  );
}

function ParsingPane() {
  return (
    <motion.div {...fade} className="flex h-full flex-col justify-center gap-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper-100/45">
        Building your profile
      </p>
      <ul className="space-y-2.5">
        {heroParseSteps.map((step, i) => (
          <motion.li
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.55, duration: 0.4 }}
            className="flex items-center gap-3 text-[13.5px] text-paper-100/80"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.45 + i * 0.55, type: "spring", stiffness: 300, damping: 18 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-lime text-ink-950"
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </motion.span>
            {step}
          </motion.li>
        ))}
      </ul>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {heroProfileSkills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + i * 0.12, duration: 0.3 }}
            className="rounded-full border border-paper-50/12 bg-paper-50/[0.05] px-2.5 py-1 text-[11px] font-medium text-paper-100/80"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function MatchedPane() {
  return (
    <motion.div {...fade} className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper-100/45">
          Your top matches
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-lime/30 bg-accent-lime/15 px-2.5 py-1 text-[11px] font-medium text-accent-lime">
          <Sparkles className="h-3 w-3" />
          24 live roles
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5">
        {heroMatches.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between gap-3 rounded-2xl border border-paper-50/10 bg-paper-50/[0.03] px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-paper-50">{m.title}</p>
              <p className="truncate text-[12px] text-paper-100/55">{m.company}</p>
            </div>
            <span className={cn("flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-semibold", accentSoft[m.accent])}>
              <span className={cn("h-1.5 w-1.5 rounded-full", accentDot[m.accent])} />
              {m.match}%
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="rounded-xl bg-accent-lime/10 px-3 py-2 text-center text-[12px] text-accent-lime"
      >
        Agent tailored your résumé and applied · you just approve
      </motion.div>
    </motion.div>
  );
}

const RAIL: Phase[] = ["idle", "uploading", "parsing", "matched"];
const RAIL_LABEL: Record<Phase, string> = {
  idle: "Upload",
  uploading: "Secure",
  parsing: "Profile",
  matched: "Match",
};

function PhaseRail({ phase }: { phase: Phase }) {
  const activeIndex = RAIL.indexOf(phase);
  return (
    <div className="flex items-center gap-2 border-t border-paper-50/10 px-4 py-3">
      {RAIL.map((p, i) => {
        const active = i <= activeIndex;
        return (
          <div key={p} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex items-center gap-1.5 text-[11px] transition-colors",
                active ? "text-paper-50" : "text-paper-100/35",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  active ? "bg-accent-lime" : "bg-paper-50/20",
                )}
              />
              {RAIL_LABEL[p]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
