"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, FileText, Sparkles, TriangleAlert } from "lucide-react";

import { Guest3ProfileRail } from "@/components/guest-pages/guest-3-profile-rail";
import {
  DashboardExtractionPanel,
  type ExtractionStep,
} from "@/components/dashboard/dashboard-extraction-panel";
import { SearchResultCard } from "@/components/dashboard/search/search-result-card";
import { jobSeekerSearchResults } from "@/config/job-seeker-search";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export type CanvasMode = "idle" | "parsing" | "profile" | "scorecard" | "jobs";

export const RESUME_SCORE = 78;

export const RESUME_STRENGTHS = [
  "Quantified impact — “lifted activation 23%” stands out to recruiters.",
  "Clear progression: UX Designer → Senior Product Designer.",
  "In-demand skills detected: Design Systems, Figma, Prototyping.",
];

export const RESUME_ISSUES = [
  { text: "Your 2016–2018 role is missing dates.", fix: "Add start/end months so ATS filters don't drop you." },
  { text: "No portfolio link.", fix: "Design recruiters expect one — add it near the top." },
  { text: "Your summary opens generically.", fix: "Lead the first line with your strongest outcome." },
];

const MATCH_PERCENTS = [94, 90, 86, 82];
const MATCHED_JOBS = jobSeekerSearchResults.slice(0, 4);

/* ---------- score ring ---------- */

function ScoreRing({ value }: { value: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(15,15,22,0.1)" strokeWidth="6" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--color-ink-950)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <span className="text-[22px] font-semibold text-ink-950">{value}</span>
          <span className="text-[12px] text-ink-400">/100</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- scorecard ---------- */

function Scorecard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-5 rounded-[20px] border border-ink-900/10 bg-white p-5">
        <ScoreRing value={RESUME_SCORE} />
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
            Résumé score
          </p>
          <p className="mt-1 text-[18px] font-medium tracking-tight text-ink-950">
            Strong — a few fixes from great
          </p>
          <p className="mt-1 text-[13px] text-ink-500">
            Ranks above 78% of profiles for your target roles.
          </p>
        </div>
      </div>

      <div className="rounded-[20px] border border-ink-900/10 bg-white p-5">
        <p className="flex items-center gap-2 text-[13px] font-medium text-ink-950">
          <Check className="h-4 w-4 text-accent-lime-dark" strokeWidth={2.5} />
          What&apos;s working
        </p>
        <ul className="mt-3 space-y-2.5">
          {RESUME_STRENGTHS.map((s) => (
            <li key={s} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-lime-dark" strokeWidth={2.5} />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[20px] border border-ink-900/10 bg-white p-5">
        <p className="flex items-center gap-2 text-[13px] font-medium text-ink-950">
          <TriangleAlert className="h-4 w-4 text-ink-700" />
          Holding you back
        </p>
        <ul className="mt-3 space-y-3">
          {RESUME_ISSUES.map((it) => (
            <li key={it.text} className="rounded-xl bg-paper-100 px-3.5 py-3">
              <p className="text-[13px] font-medium text-ink-900">{it.text}</p>
              <p className="mt-1 flex items-start gap-1.5 text-[12.5px] leading-relaxed text-ink-600">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-accent-lime-dark" />
                {it.fix}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- jobs ---------- */

function MatchedJobs({ onApply }: { onApply: () => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-ink-950 text-paper-50">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[15px] font-medium text-ink-950">Matched to your profile</p>
          <p className="text-[12.5px] text-ink-500">Ranked against the real you — not keywords</p>
        </div>
      </div>
      {MATCHED_JOBS.map((job, i) => (
        <SearchResultCard
          key={job.id}
          result={job}
          index={i}
          variant="compact"
          matchPercent={MATCH_PERCENTS[i]}
          onViewMore={onApply}
          onApply={onApply}
        />
      ))}
      <button
        type="button"
        onClick={onApply}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-lime px-5 py-3 text-[14px] font-medium text-ink-950 transition hover:bg-accent-lime-dark"
      >
        Sign up to apply
      </button>
    </div>
  );
}

/* ---------- canvas ---------- */

export function Guest4Canvas({
  mode,
  steps,
  extractionComplete,
  fileName,
  onSave,
  className,
}: {
  mode: CanvasMode;
  steps: ExtractionStep[];
  extractionComplete: boolean;
  fileName: string;
  onSave: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex h-full min-h-0 flex-col bg-paper-100", className)}>
      <div className="min-h-0 flex-1 overflow-y-auto p-4 scrollbar-hide sm:p-6" data-lenis-prevent>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {mode === "idle" ? (
              <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ink-900/10 bg-white text-ink-400">
                  <FileText className="h-6 w-6" />
                </span>
                <p className="mt-4 max-w-[24ch] text-[14px] text-ink-500">
                  Your profile will build here the moment you share your résumé.
                </p>
              </div>
            ) : null}

            {mode === "parsing" ? (
              <DashboardExtractionPanel
                variant="standalone"
                fileName={fileName}
                steps={steps}
                isComplete={extractionComplete}
                eyebrow="Building your profile"
                heading="Reading your résumé in real time"
              />
            ) : null}

            {mode === "profile" ? <Guest3ProfileRail onSave={onSave} /> : null}

            {mode === "scorecard" ? <Scorecard /> : null}

            {mode === "jobs" ? <MatchedJobs onApply={onSave} /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
