"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ChevronLeft,
  CornerDownLeft,
  FileUp,
  Gauge,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import {
  Guest4Canvas,
  type CanvasMode,
  RESUME_SCORE,
} from "@/components/guest-pages/guest-4-canvas";
import { Guest3Copilot } from "@/components/guest-pages/guest-3-copilot";
import { type ExtractionStep } from "@/components/dashboard/dashboard-extraction-panel";
import { Button } from "@/components/ui/button";
import { jobSeekerProfile } from "@/config/job-seeker-profile";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Phase = "command" | "results";
type Tab = "profile" | "scorecard" | "jobs";

const STEP_DEFS = [
  { id: "read", title: "Reading your résumé", detail: "Parsing sections, dates, and layout" },
  { id: "extract", title: "Extracting experience & skills", detail: "18 skills, 4 roles detected" },
  { id: "structure", title: "Structuring your profile", detail: "Identity, experience, education" },
  { id: "insights", title: "Scoring & finding fixes", detail: "Strengths, gaps, and rank" },
];
const STEP_MS = 850;
const SAMPLE_FILE = "Jordan_Avery_Resume.pdf";

const PLACEHOLDERS = [
  "Drop your résumé to begin…",
  "Find remote product roles…",
  "Is my salary fair?…",
  "Score my résumé…",
];

type Command = {
  id: string;
  label: string;
  hint: string;
  icon: typeof FileUp;
  action: "upload" | "copilot";
  tab?: Tab;
};

const COMMANDS: Command[] = [
  { id: "build", label: "Build my profile from a résumé", hint: "PDF · DOC", icon: FileUp, action: "upload", tab: "profile" },
  { id: "score", label: "Score my résumé", hint: "Strengths, gaps & rank", icon: Gauge, action: "upload", tab: "scorecard" },
  { id: "match", label: "Find roles that fit me", hint: "Ranked with reasons", icon: Sparkles, action: "upload", tab: "jobs" },
  { id: "ask", label: "Ask the career copilot", hint: "Salary, pivots, advice", icon: MessageCircle, action: "copilot" },
];

const TABS: { id: Tab; label: string; icon: typeof FileUp }[] = [
  { id: "profile", label: "Profile", icon: FileUp },
  { id: "scorecard", label: "Score", icon: Gauge },
  { id: "jobs", label: "Matches", icon: Sparkles },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md border border-ink-900/12 bg-paper-100 px-1.5 font-mono text-[10px] font-medium text-ink-500">
      {children}
    </kbd>
  );
}

export function Guest4Page() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("command");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const [fileName, setFileName] = useState(SAMPLE_FILE);
  const [runningIndex, setRunningIndex] = useState(0);
  const [tab, setTab] = useState<Tab>("profile");

  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotSeed, setCopilotSeed] = useState<string>();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pendingTab = useRef<Tab>("profile");

  const filtered = useMemo(
    () =>
      COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  useEffect(() => setSelected(0), [query]);

  /* Rotating placeholder while idle. */
  useEffect(() => {
    if (prefersReducedMotion || query) return;
    const id = window.setInterval(
      () => setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, query]);

  /* Parsing → reveal once results begin. */
  useEffect(() => {
    if (phase !== "results") return;
    if (runningIndex >= STEP_DEFS.length) return;
    const id = window.setInterval(() => {
      setRunningIndex((n) => (n >= STEP_DEFS.length ? n : n + 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [phase, runningIndex]);

  const startResults = (name: string, initialTab: Tab) => {
    setFileName(name);
    setRunningIndex(0);
    setTab(initialTab);
    setPhase("results");
  };

  const openCopilot = (seed?: string) => {
    if (seed) setCopilotSeed(seed);
    setCopilotOpen(true);
  };

  const runCommand = (cmd: Command) => {
    if (cmd.action === "copilot") {
      openCopilot(query.trim() || undefined);
      return;
    }
    pendingTab.current = cmd.tab ?? "profile";
    fileRef.current?.click();
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(filtered.length - 1, s + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(0, s - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered.length > 0) runCommand(filtered[Math.min(selected, filtered.length - 1)]);
      else if (query.trim()) openCopilot(query.trim());
    } else if (e.key === "Escape") {
      setQuery("");
    }
  };

  const parsing = runningIndex < STEP_DEFS.length;
  const canvasMode: CanvasMode = parsing ? "parsing" : tab;
  const steps: ExtractionStep[] = STEP_DEFS.map((s, i) => ({
    ...s,
    status: i < runningIndex ? "done" : i === runningIndex ? "running" : "pending",
  }));

  return (
    <div className="relative flex min-h-svh flex-col bg-paper-50">
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => {
          const f = e.target.files?.[0];
          startResults(f?.name ?? SAMPLE_FILE, pendingTab.current);
          e.target.value = "";
        }}
      />

      {/* Header */}
      <header className="z-20 flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          {phase === "results" ? (
            <button
              type="button"
              onClick={() => setPhase("command")}
              aria-label="Back to command"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink-900/10 bg-white text-ink-800 transition hover:border-ink-900/20"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
            </button>
          ) : null}
          <Link href="/" className="text-[17px] font-semibold tracking-tight text-ink-950">
            Talent<span className="text-accent-lime-dark">Drobe</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {phase === "results" ? (
            <Button variant="lime" size="sm" onClick={() => openCopilot()}>
              <Sparkles className="h-4 w-4" />
              Ask AI
            </Button>
          ) : (
            <>
              <Button variant="outline" size="sm" href="/sign-up" asChild>
                Sign up
              </Button>
              <Button variant="lime" size="sm" href="/sign-in" asChild>
                Log in
              </Button>
            </>
          )}
        </div>
      </header>

      {/* ============ Command surface ============ */}
      {phase === "command" ? (
        <main className="relative flex flex-1 items-center justify-center px-4 pb-20">
          <div className="relative z-10 w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">
                <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" />
                TalentDrobe · Career OS
              </span>
              <h1 className="mt-5 text-balance text-[clamp(2.3rem,5.5vw,3.6rem)] font-medium leading-[1.0] tracking-[-0.035em] text-ink-950">
                Your career,{" "}
                <span className="font-serif italic text-ink-700">on command.</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-pretty text-[14.5px] leading-relaxed text-ink-500 sm:text-[15.5px]">
                One surface to build your profile, score your résumé, and ask your AI
                copilot anything.
              </p>
            </motion.div>

            {/* Command panel */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="mt-8 overflow-hidden rounded-[22px] border border-ink-900/10 bg-white shadow-[0_18px_50px_-32px_rgba(8,8,12,0.22)]"
            >
              {/* Bar */}
              <div className="flex items-center gap-3 border-b border-ink-900/8 px-4 py-3.5 sm:px-5">
                <Sparkles className="h-5 w-5 shrink-0 text-accent-lime-dark" />
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder={
                    prefersReducedMotion ? PLACEHOLDERS[0] : PLACEHOLDERS[placeholderIndex]
                  }
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-400 focus:outline-none sm:text-[16px]"
                />
                <Kbd>⏎</Kbd>
              </div>

              {/* Command list */}
              <ul className="p-2">
                {filtered.length > 0 ? (
                  filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    const active = i === Math.min(selected, filtered.length - 1);
                    return (
                      <li key={cmd.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setSelected(i)}
                          onClick={() => runCommand(cmd)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                            active ? "bg-accent-lime/15" : "hover:bg-ink-900/[0.03]",
                          )}
                        >
                          <span
                            className={cn(
                              "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors",
                              active
                                ? "bg-ink-950 text-accent-lime ring-transparent"
                                : "bg-paper-100 text-ink-700 ring-ink-900/8",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-medium text-ink-950">
                              {cmd.label}
                            </span>
                            <span className="block truncate text-[12px] text-ink-500">
                              {cmd.hint}
                            </span>
                          </span>
                          {active ? (
                            <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-ink-500">
                              <CornerDownLeft className="h-3.5 w-3.5" />
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <button
                      type="button"
                      onClick={() => openCopilot(query.trim())}
                      className="flex w-full items-center gap-3 rounded-2xl bg-accent-lime/15 px-3 py-2.5 text-left"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-accent-lime">
                        <MessageCircle className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium text-ink-950">
                          Ask the copilot: “{query.trim()}”
                        </span>
                        <span className="block truncate text-[12px] text-ink-500">
                          Get an answer with your context
                        </span>
                      </span>
                      <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-ink-500" />
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>

            {/* Footer hints */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-ink-400"
            >
              <span className="flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>⏎</Kbd>
                select
              </span>
              <button
                type="button"
                onClick={() => startResults(SAMPLE_FILE, "profile")}
                className="font-medium text-ink-500 underline-offset-4 transition hover:text-ink-950 hover:underline"
              >
                No résumé? Try a sample →
              </button>
            </motion.div>
          </div>
        </main>
      ) : (
        /* ============ Career console ============ */
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 sm:px-6">
          <div className="flex items-center justify-between gap-3 pb-4">
            <div>
              <p className="text-[15px] font-medium text-ink-950">
                {parsing ? "Building your profile…" : "Your career console"}
              </p>
              <p className="text-[12.5px] text-ink-500">
                From {fileName}
                {!parsing ? ` · ${jobSeekerProfile.completeness}% complete · résumé ${RESUME_SCORE}/100` : ""}
              </p>
            </div>
            <Button variant="lime" size="sm" onClick={() => openCopilot()}>
              Save profile
            </Button>
          </div>

          {/* Tabs */}
          <div
            className={cn(
              "mb-4 inline-flex rounded-full border border-ink-900/10 bg-white p-1 transition-opacity",
              parsing && "pointer-events-none opacity-40",
            )}
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                    active ? "bg-ink-950 text-paper-50" : "text-ink-600 hover:text-ink-950",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[24px] border border-ink-900/10">
            <Guest4Canvas
              mode={canvasMode}
              steps={steps}
              extractionComplete={!parsing}
              fileName={fileName}
              onSave={() => openCopilot()}
              className="min-h-[60vh]"
            />
          </div>
        </main>
      )}

      <Guest3Copilot
        open={copilotOpen}
        onOpenChange={setCopilotOpen}
        seed={copilotSeed}
        showFab={phase === "results"}
      />
    </div>
  );
}
