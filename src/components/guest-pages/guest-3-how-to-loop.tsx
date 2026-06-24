"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { guest3HowToSteps } from "@/constants/guest-3";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 4000;

/** Looping step carousel — sits below the résumé drop on guest-3. */
export function Guest3HowToLoop({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const step = guest3HowToSteps[index];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % guest3HowToSteps.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div className={cn("text-left", className)}>
      <div className="mb-3 flex items-center gap-2 border-b border-ink-900/8 pb-2">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500">
          How to
        </span>
      </div>

      <div className="mb-3 flex items-center">
        {guest3HowToSteps.map((s, i) => (
          <div key={s.step} className="flex flex-1 items-center">
            <motion.span
              className={cn(
                "relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-300",
                i === index
                  ? "bg-accent-lime text-ink-950 shadow-[0_0_0_3px_rgba(193,249,104,0.25)]"
                  : i < index
                    ? "bg-ink-950 text-paper-50"
                    : "border border-ink-900/12 bg-white text-ink-500",
              )}
              animate={prefersReducedMotion ? undefined : i === index ? { scale: [1, 1.06, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {s.step}
            </motion.span>
            {i < guest3HowToSteps.length - 1 ? (
              <div className="relative mx-1 h-0.5 min-w-[1rem] flex-1 overflow-hidden rounded-full bg-ink-900/10">
                <motion.div
                  key={`${index}-line-${i}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-accent-lime"
                  initial={{ width: i < index ? "100%" : "0%" }}
                  animate={{
                    width: i < index ? "100%" : i === index ? "100%" : "0%",
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : i === index
                        ? { duration: STEP_MS / 1000, ease: "linear" }
                        : { duration: 0.3, ease: EASE }
                  }
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="relative min-h-[5.75rem] overflow-hidden rounded-2xl border border-accent-lime/30 bg-accent-lime/[0.08] px-4 py-4 sm:min-h-[6rem] sm:px-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.step}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.48, ease: EASE }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-lime-dark">
              Step {step.step} of {guest3HowToSteps.length}
            </p>
            <p className="mt-1.5 text-[16px] font-semibold leading-snug tracking-[-0.02em] text-ink-950 sm:text-[17px]">
              {step.title}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600 sm:text-[14px]">
              {step.detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
