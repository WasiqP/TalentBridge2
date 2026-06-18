"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, Sparkles, Wand2, X } from "lucide-react";

import { Guest3ResumeDrop } from "@/components/guest-pages/guest-3-resume-drop";
import { Guest3GlassLadder } from "@/components/guest-pages/guest-3-glass-ladder";
import { Guest3SignalBento } from "@/components/guest-pages/guest-3-signal-bento";
import { Guest3ProfileRail } from "@/components/guest-pages/guest-3-profile-rail";
import { Guest3Copilot } from "@/components/guest-pages/guest-3-copilot";
import {
  DashboardExtractionPanel,
  type ExtractionStep,
} from "@/components/dashboard/dashboard-extraction-panel";
import { DashboardChatInput } from "@/components/dashboard/dashboard-chat-input";
import { DashboardFloatingChat } from "@/components/dashboard/dashboard-floating-chat";
import { SearchResultCard } from "@/components/dashboard/search/search-result-card";
import { Button } from "@/components/ui/button";
import { getProfileFirstName, jobSeekerProfile } from "@/config/job-seeker-profile";
import { jobSeekerSearchResults } from "@/config/job-seeker-search";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Phase = "upload" | "parsing" | "ready";

const STEP_DEFS: { id: string; title: string; detail: string }[] = [
  { id: "read", title: "Reading your résumé", detail: "Parsing sections, dates, and layout" },
  { id: "extract", title: "Extracting experience & skills", detail: "18 skills, 4 roles detected" },
  { id: "structure", title: "Structuring your profile", detail: "Identity, experience, education" },
  { id: "insights", title: "Generating career insights", detail: "Résumé fixes & job matches" },
];

const STEP_MS = 900;

const SUGGESTIONS = [
  {
    category: "Impact",
    priority: "high" as const,
    text: "Lead your Northwind bullet with the outcome — “lifted activation 23%” — before the action verb.",
  },
  {
    category: "Skills",
    priority: "medium" as const,
    text: "Add “Design Ops” and “Workshop facilitation” — they show up in your experience but not your skills.",
  },
  {
    category: "Completeness",
    priority: "high" as const,
    text: "Confirm your 2016–2018 role dates and add a portfolio link to reach 100%.",
  },
];

const MATCH_PERCENTS = [94, 90, 86, 82];
const MATCHED_JOBS = jobSeekerSearchResults.slice(0, 4);
const SAMPLE_FILE = "Jordan_Avery_Resume.pdf";

export function Guest3Page() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [fileName, setFileName] = useState(SAMPLE_FILE);
  const [runningIndex, setRunningIndex] = useState(0);
  const [gateOpen, setGateOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotSeed, setCopilotSeed] = useState<string | undefined>();

  /* Drive the extraction steps, then reveal the profile. */
  useEffect(() => {
    if (phase !== "parsing") return;
    const id = window.setInterval(() => {
      setRunningIndex((i) => {
        if (i >= STEP_DEFS.length) return i;
        return i + 1;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "parsing" && runningIndex >= STEP_DEFS.length) {
      const t = window.setTimeout(() => setPhase("ready"), 700);
      return () => window.clearTimeout(t);
    }
  }, [phase, runningIndex]);

  const steps: ExtractionStep[] = STEP_DEFS.map((s, i) => ({
    ...s,
    status: i < runningIndex ? "done" : i === runningIndex ? "running" : "pending",
  }));
  const extractionComplete = runningIndex >= STEP_DEFS.length;

  const openGate = useCallback(() => setGateOpen(true), []);

  const startParsing = useCallback((name: string) => {
    setFileName(name);
    setRunningIndex(0);
    setPhase("parsing");
  }, []);

  const goBackToUpload = useCallback(() => {
    setPhase("upload");
    setRunningIndex(0);
    setGateOpen(false);
    setCopilotOpen(false);
    setCopilotSeed(undefined);
  }, []);

  const engageCopilot = useCallback(() => {
    setCopilotOpen(true);
  }, []);

  const handleCopilotSend = useCallback((message: string) => {
    setCopilotOpen(true);
    setCopilotSeed(message);
  }, []);

  useEffect(() => {
    if (phase !== "upload") return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [phase]);

  return (
    <div
      className={cn(
        "flex flex-col bg-paper-50",
        phase === "upload"
          ? "fixed inset-0 z-20 overflow-hidden"
          : "relative min-h-svh",
      )}
    >
      {/* Header */}
      <header className="z-30 shrink-0 bg-paper-50/95 backdrop-blur">
        <div className="mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            {phase === "ready" || phase === "parsing" ? (
              <button
                type="button"
                onClick={goBackToUpload}
                aria-label="Back"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink-900/10 bg-white text-ink-800 transition hover:border-ink-900/20 hover:bg-paper-100"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
              </button>
            ) : null}
            <Link href="/" className="truncate text-[17px] font-semibold tracking-tight text-ink-950">
              Talent<span className="text-accent-lime-dark">Drobe</span>
            </Link>
          </div>
          {phase === "ready" ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-[13px] text-ink-500 sm:inline">
                Profile ready · {jobSeekerProfile.completeness}%
              </span>
              <Button variant="lime" size="sm" onClick={openGate}>
                Save profile
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" href="/sign-up" asChild>
                Sign up
              </Button>
              <Button variant="lime" size="sm" href="/sign-in" asChild>
                Log in
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* ============ Phase 1 — Upload ============ */}
      {phase === "upload" ? (
        <div className="relative flex min-h-0 flex-1 overflow-hidden">
          <Guest3GlassLadder className="pointer-events-none absolute inset-y-6 left-4 z-0 hidden lg:block xl:inset-y-8 xl:left-6" />
          <Guest3SignalBento className="pointer-events-none absolute inset-y-6 right-6 z-0 hidden lg:flex xl:inset-y-8 xl:right-10" />

          <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-6 sm:px-6 lg:px-[min(26vw,24rem)]">
            <div className="mx-auto w-full max-w-xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-lime/35 bg-accent-lime/12 px-3 py-1 text-[11px] font-medium text-ink-700 sm:text-[12px]">
              <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" />
              Not a job board — a career copilot
            </span>

            <h1 className="mt-4 text-balance text-[clamp(1.75rem,4vw,2.85rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink-950 sm:mt-5">
              Let&apos;s Get you a{" "}
              <span className="font-serif italic text-accent-lime-dark">Job</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-pretty text-[14px] leading-relaxed text-ink-500 sm:mt-4">
              Ask about roles, salary, or your next move. Your AI copilot matches
              jobs to the real you — not keywords.
            </p>

            <div className="mx-auto mt-8 max-w-md sm:mt-10">
              <DashboardChatInput
                variant="inline"
                size="compact"
                accent="lime"
                onEngage={engageCopilot}
                onSend={handleCopilotSend}
                placeholder="Ask about roles, salary, or your resume…"
              />

              <Guest3ResumeDrop
                className="mt-4 sm:mt-5"
                sampleFileName={SAMPLE_FILE}
                onFile={startParsing}
              />
            </div>

            </div>
          </div>
        </div>
      ) : null}

      <Guest3Copilot
        open={copilotOpen}
        onOpenChange={setCopilotOpen}
        seed={copilotSeed}
      />

      {/* ============ Phase 2 — Parsing ============ */}
      {phase === "parsing" ? (
        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-xl">
            <p className="mb-5 text-center text-[14px] text-ink-500">
              Reading your résumé and assembling your profile…
            </p>
            <DashboardExtractionPanel
              variant="standalone"
              fileName={fileName}
              steps={steps}
              isComplete={extractionComplete}
              eyebrow="Step 1 · Understand you"
              heading="Building your profile in real time"
            />
          </div>
        </main>
      ) : null}

      {/* ============ Phase 3 — Profile ready ============ */}
      {phase === "ready" ? (
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6 rounded-2xl border border-ink-900/10 bg-white px-5 py-4"
          >
            <p className="text-[15px] font-medium text-ink-950 sm:text-[16px]">
              {getProfileFirstName(jobSeekerProfile.name)}, your profile is ready.
            </p>
            <p className="mt-1 text-[13px] text-ink-500 sm:text-[14px]">
              Built from <span className="font-medium text-ink-700">{fileName}</span> in seconds.
              Here&apos;s how TalentDrobe works for you — improve your résumé, then apply to roles matched to the real you.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
            {/* Left — profile (enhancer) */}
            <aside className="lg:sticky lg:top-[5.5rem] lg:self-start">
              <Guest3ProfileRail onSave={openGate} />
            </aside>

            {/* Right — suggestions + matched jobs */}
            <div className="min-w-0 space-y-8">
              {/* Résumé suggestions */}
              <section>
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-ink-950 text-paper-50">
                    <Wand2 className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 className="text-[17px] font-medium tracking-tight text-ink-950">
                      AI résumé suggestions
                    </h2>
                    <p className="text-[12.5px] text-ink-500">Quick wins before you apply</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {SUGGESTIONS.map((s, i) => (
                    <motion.div
                      key={s.category}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                      className="rounded-2xl border border-ink-900/10 bg-white px-4 py-3.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                          {s.category}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize",
                            s.priority === "high"
                              ? "border-ink-900/20 bg-ink-950 text-paper-50"
                              : "border-ink-900/12 bg-paper-100 text-ink-700",
                          )}
                        >
                          {s.priority}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-700">{s.text}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Matched jobs (only after profile) */}
              <section>
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-ink-950 text-paper-50">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="text-[17px] font-medium tracking-tight text-ink-950">
                        Jobs matched to your profile
                      </h2>
                      <p className="text-[12.5px] text-ink-500">
                        Ranked against the real you — not keywords
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {MATCHED_JOBS.map((job, i) => (
                    <SearchResultCard
                      key={job.id}
                      result={job}
                      index={i}
                      variant="compact"
                      matchPercent={MATCH_PERCENTS[i]}
                      onViewMore={openGate}
                      onApply={openGate}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={openGate}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border border-ink-900/12 bg-white px-5 py-3 text-[14px] font-medium text-ink-900 transition hover:border-ink-900/25"
                >
                  Sign up to see all matches & apply
                  <ArrowRight className="h-4 w-4" />
                </button>
              </section>
            </div>
          </div>
        </main>
      ) : null}

      {/* Career copilot — FAB after profile; upload phase uses bottom chat bar */}
      {phase === "ready" ? (
        <DashboardFloatingChat />
      ) : null}

      {/* Sign-up gate */}
      <AnimatePresence>
        {gateOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-x-3 bottom-4 z-[60] mx-auto flex max-w-2xl items-center justify-between gap-4 rounded-2xl border border-ink-900/10 bg-ink-950 px-5 py-4 text-paper-50 shadow-[0_20px_60px_-20px_rgba(8,8,12,0.5)] sm:inset-x-6"
          >
            <p className="text-[13px] leading-snug text-paper-100/85 sm:text-[14px]">
              Create a free account to save your profile, apply, and let AI tailor your résumé.
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="lime" size="sm" href="/sign-up" asChild>
                Sign up free
              </Button>
              <button
                type="button"
                onClick={() => setGateOpen(false)}
                aria-label="Dismiss"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-paper-100/60 transition hover:bg-paper-50/10 hover:text-paper-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
