"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, FileUp, RotateCcw, Sparkles } from "lucide-react";

import { Guest4Matches } from "@/components/guest-pages/guest-4-matches";
import { Guest4ProfilePanel } from "@/components/guest-pages/guest-4-profile-panel";
import { Guest4SignalTicker } from "@/components/guest-pages/guest-4-signal-ticker";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

type Phase = "idle" | "profile" | "matches" | "live";

const STATUS: Record<Phase, string> = {
  idle: "Ready when you are",
  profile: "Reading your résumé · building profile",
  matches: "Ranking 1,240 roles for you",
  live: "Watching your HR universe · live",
};

/**
 * Design option 4 — "Living preview".
 * The product is the pitch: a framed dashboard that assembles itself (profile →
 * matches → live HR universe) from one action. Minimal clicks, minimal scroll.
 */
export function Guest4Page() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [started, setStarted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const start = useCallback(() => {
    setStarted(true);
    setPhase("profile");
  }, []);

  /* Reduced motion → show the finished state immediately. */
  useEffect(() => {
    if (prefersReducedMotion) {
      setStarted(true);
      setPhase("live");
    }
  }, [prefersReducedMotion]);

  /* Auto-start the sample shortly after load (fewest clicks). */
  useEffect(() => {
    if (prefersReducedMotion || started) return;
    const t = window.setTimeout(start, 1100);
    return () => window.clearTimeout(t);
  }, [prefersReducedMotion, started, start]);

  /* Advance phases. */
  useEffect(() => {
    if (phase === "profile") {
      const t = window.setTimeout(() => setPhase("matches"), 2000);
      return () => window.clearTimeout(t);
    }
    if (phase === "matches") {
      const t = window.setTimeout(() => setPhase("live"), 2000);
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  const replay = () => {
    setPhase("idle");
    setStarted(false);
  };

  const profileRevealed = phase !== "idle";
  const matchesRevealed = phase === "matches" || phase === "live";
  const liveRevealed = phase === "live";

  return (
    <div className="relative min-h-svh bg-paper-100">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent-lime/12 blur-[130px]"
      />

      <div className="relative mx-auto flex min-h-svh max-w-[1180px] flex-col px-4 py-6 sm:px-6 sm:py-8">
        {/* Framing line — minimal marketing */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-600">
              <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" />
              Live product preview
            </span>
            <h1 className="mt-3 text-balance text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink-950">
              Drop your résumé.{" "}
              <span className="font-serif italic text-ink-700">
                Watch your career assemble itself.
              </span>
            </h1>
          </div>
          <Button variant="lime" size="md" href="/sign-up" asChild className="shrink-0">
            Start free
            <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </Button>
        </div>

        {/* App window */}
        <div className="relative mt-6 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[24px] border border-ink-900/10 bg-paper-50 shadow-[0_30px_80px_-40px_rgba(8,8,12,0.34)]">
          {/* App chrome */}
          <div className="flex shrink-0 items-center justify-between border-b border-ink-900/8 bg-white/70 px-4 py-3 backdrop-blur sm:px-5">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-ink-900/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-900/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-900/15" />
              </span>
              <span className="text-[13px] font-semibold tracking-tight text-ink-950">
                TalentDrobe
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-paper-100 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                {phase !== "idle" && !prefersReducedMotion ? (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-50" />
                ) : null}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="text-[11.5px] font-medium text-ink-600"
                >
                  {STATUS[phase]}
                </motion.span>
              </AnimatePresence>
            </div>

            <Link
              href="/sign-in"
              className="hidden rounded-full border border-ink-900/12 px-3.5 py-1.5 text-[12px] font-medium text-ink-800 transition hover:border-ink-900/25 sm:block"
            >
              Log in
            </Link>
          </div>

          {/* Dashboard body */}
          <div className="relative grid min-h-0 flex-1 grid-cols-1 gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
            <Guest4ProfilePanel revealed={profileRevealed} />

            <div className="flex min-h-0 flex-col gap-4">
              <div className="min-h-0 flex-1 rounded-[20px] border border-ink-900/8 bg-paper-50 p-5">
                <Guest4Matches revealed={matchesRevealed} />
              </div>
              <Guest4SignalTicker active={liveRevealed} />
            </div>

            {/* Idle overlay — single action */}
            <AnimatePresence>
              {phase === "idle" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-[20px] bg-paper-50/70 backdrop-blur-sm"
                >
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-ink-900/20 bg-white/80 px-10 py-8 text-center transition hover:border-accent-lime hover:bg-accent-lime/10"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-accent-lime">
                      <FileUp className="h-5 w-5" />
                    </span>
                    <span className="text-[14px] font-medium text-ink-950">
                      Drop your résumé to watch it work
                    </span>
                    <span className="text-[12px] text-ink-500">PDF, DOC & DOCX</span>
                  </button>
                  <button
                    type="button"
                    onClick={start}
                    className="text-[12.5px] font-medium text-ink-600 underline-offset-4 transition hover:text-ink-950 hover:underline"
                  >
                    or watch with a sample profile →
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Replay */}
          {phase === "live" ? (
            <button
              type="button"
              onClick={replay}
              className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-ink-900/12 bg-white/90 px-3 py-1.5 text-[11.5px] font-medium text-ink-700 shadow-sm backdrop-blur transition hover:border-ink-900/25"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Replay
            </button>
          ) : null}
        </div>

        {/* Hidden input — a real résumé just triggers the same preview */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          aria-hidden
          tabIndex={-1}
          onChange={() => start()}
        />
      </div>
    </div>
  );
}
