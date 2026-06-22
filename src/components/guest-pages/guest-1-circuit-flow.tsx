"use client";

import { forwardRef, useEffect, useState } from "react";
import { Briefcase, FileUp, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "drop",
    label: "Drop",
    title: "Drop your résumé",
    detail: "Upload PDF or Word — we read it in seconds.",
    icon: FileUp,
  },
  {
    id: "save",
    label: "Save",
    title: "Save your profile",
    detail: "Skills, roles, and proof — assembled for you.",
    icon: Sparkles,
  },
  {
    id: "find",
    label: "Find",
    title: "Find your match",
    detail: "Ranked roles and copilot tips, ready to go.",
    icon: Briefcase,
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 2600;

function CircuitConnector({
  active,
  passed,
  prefersReducedMotion,
}: {
  active: boolean;
  passed: boolean;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <div className="relative h-14 w-12 shrink-0 sm:h-16" aria-hidden>
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink-900/10" />
      <motion.div
        className="absolute top-0 w-px origin-top bg-accent-lime"
        initial={false}
        animate={{
          height: passed ? "100%" : active && !prefersReducedMotion ? "55%" : "0%",
          opacity: passed || active ? 1 : 0.35,
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: EASE }}
      />
      <motion.span
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-paper-50 bg-accent-lime shadow-[0_0_10px_rgba(190,242,100,0.55)]"
        initial={false}
        animate={{
          top: passed ? "100%" : active ? "52%" : "0%",
          opacity: active || passed ? 1 : 0,
          scale: active ? 1 : 0.6,
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: EASE }}
      />
    </div>
  );
}

function StepRow({
  step,
  index,
  activeIndex,
  prefersReducedMotion,
}: {
  step: (typeof STEPS)[number];
  index: number;
  activeIndex: number;
  prefersReducedMotion: boolean | null;
}) {
  const Icon = step.icon;
  const isActive = activeIndex === index;
  const isPassed = activeIndex > index;

  return (
    <motion.li
      layout
      className="relative flex gap-4 sm:gap-5"
      initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className={cn(
            "relative flex h-11 w-11 items-center justify-center rounded-2xl border shadow-sm sm:h-12 sm:w-12",
            isActive
              ? "border-accent-lime/50 bg-accent-lime/20 text-ink-950"
              : isPassed
                ? "border-accent-lime/25 bg-accent-lime/8 text-ink-800"
                : "border-ink-900/10 bg-paper-50/90 text-ink-500",
          )}
          animate={{
            scale: isActive && !prefersReducedMotion ? 1.06 : 1,
            boxShadow: isActive
              ? "0 0 0 4px rgba(190, 242, 100, 0.18), 0 8px 24px -12px rgba(8, 8, 12, 0.2)"
              : "0 1px 2px rgba(8, 8, 12, 0.04)",
          }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Icon className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden />
          {isActive ? (
            <motion.span
              layoutId="circuit-active-ring"
              className="absolute inset-0 rounded-2xl ring-2 ring-accent-lime/60"
              transition={{ duration: 0.45, ease: EASE }}
            />
          ) : null}
        </motion.div>

        {index < STEPS.length - 1 ? (
          <CircuitConnector
            active={isActive}
            passed={isPassed}
            prefersReducedMotion={prefersReducedMotion}
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1 pb-8 pt-1.5 text-left sm:pb-9 sm:pt-2">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors",
              isActive ? "text-accent-lime-dark" : isPassed ? "text-ink-600" : "text-ink-400",
            )}
          >
            {step.label}
          </p>
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.span
                key="active-pill"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="rounded-full bg-accent-lime/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-800"
              >
                Now
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>

        <motion.p
          className={cn(
            "mt-1 text-[14px] font-medium tracking-[-0.01em] sm:text-[15px]",
            isActive ? "text-ink-950" : isPassed ? "text-ink-800" : "text-ink-600",
          )}
          animate={{ opacity: isActive ? 1 : isPassed ? 0.88 : 0.72 }}
        >
          {step.title}
        </motion.p>
        <motion.p
          className="mt-1 max-w-[16rem] text-pretty text-[12px] leading-relaxed text-ink-500 sm:max-w-[18rem] sm:text-[12.5px]"
          animate={{ opacity: isActive ? 1 : 0.65 }}
        >
          {step.detail}
        </motion.p>
      </div>
    </motion.li>
  );
}

function DropLaunchBox({ onDropClick }: { onDropClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onDropClick}
      className="group mb-5 flex w-full flex-col items-center rounded-[22px] border-2 border-dashed border-ink-900/20 bg-paper-50/90 px-4 py-5 text-center transition hover:border-accent-lime/45 hover:bg-accent-lime/10 sm:py-6"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink-900/10 bg-paper-50 shadow-sm transition group-hover:border-accent-lime/40 group-hover:bg-accent-lime/15">
        <FileUp className="h-5 w-5 text-ink-800" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500 group-hover:text-ink-700">
        Drop
      </span>
      <span className="mt-1 text-[14px] font-medium text-ink-950">Drop your résumé to start</span>
      <span className="mt-1 text-[12px] text-ink-500">Opens upload + copilot workspace</span>
    </button>
  );
}

/** Vertical circuit-style Drop → Save → Find explainer for guest option 1 landing. */
export const Guest1CircuitFlow = forwardRef<
  HTMLElement,
  { className?: string; onDropClick?: () => void }
>(function Guest1CircuitFlow({ className, onDropClick }, ref) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % STEPS.length);
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      className={cn(
        "w-full rounded-[28px] border border-ink-900/8 bg-paper-50/75 px-5 py-5 shadow-[0_16px_48px_-32px_rgba(8,8,12,0.18)] backdrop-blur-xl backdrop-saturate-150 sm:px-6 sm:py-6",
        className,
      )}
      aria-label="How TalentDrobe works"
    >
      <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-ink-400">
        Three steps · one flow
      </p>

      {onDropClick ? <DropLaunchBox onDropClick={onDropClick} /> : null}

      <ol className="flex flex-col">
        {STEPS.map((step, index) => (
          <StepRow
            key={step.id}
            step={step}
            index={index}
            activeIndex={activeIndex}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </ol>
    </section>
  );
  },
);
