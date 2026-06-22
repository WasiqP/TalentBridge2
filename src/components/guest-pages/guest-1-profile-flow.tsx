"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, FileText, Sparkles } from "lucide-react";

import { DashboardExtractionPanel } from "@/components/dashboard/dashboard-extraction-panel";
import { DashboardPdfViewer } from "@/components/dashboard/dashboard-pdf-viewer";
import { DashboardProfileBuildCanvas } from "@/components/dashboard/dashboard-profile-build-canvas";
import { Guest1FullProfileView } from "@/components/guest-pages/guest-1-full-profile";
import type { ExtractionStep } from "@/components/dashboard/dashboard-extraction-panel";
import { Button } from "@/components/ui/button";
import type { JobSeekerProfile } from "@/config/job-seeker-profile";
import { cn } from "@/lib/utils";

const FLOW_PHASES = [
  { id: "upload", label: "Upload" },
  { id: "extract", label: "Extract" },
  { id: "assemble", label: "Assemble" },
  { id: "ready", label: "Ready" },
] as const;

function getPhaseIndex(runningIndex: number, buildComplete: boolean) {
  if (buildComplete) return 3;
  if (runningIndex >= 2) return 2;
  return 1;
}

function FlowStepper({ activeIndex }: { activeIndex: number }) {
  return (
    <ol className="flex items-center gap-1 sm:gap-2" aria-label="Profile creation progress">
      {FLOW_PHASES.map((phase, index) => {
        const done = index < activeIndex;
        const active = index === activeIndex;
        return (
          <li key={phase.id} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors sm:h-8 sm:w-8",
                  done
                    ? "border-accent-lime/40 bg-accent-lime/20 text-ink-900"
                    : active
                      ? "border-ink-950 bg-ink-950 text-paper-50"
                      : "border-ink-900/12 bg-paper-100 text-ink-400",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span
                className={cn(
                  "truncate text-[9px] font-medium uppercase tracking-[0.1em] sm:text-[10px]",
                  active || done ? "text-ink-800" : "text-ink-400",
                )}
              >
                {phase.label}
              </span>
            </div>
            {index < FLOW_PHASES.length - 1 ? (
              <span
                className={cn(
                  "mb-4 hidden h-px flex-1 sm:block",
                  index < activeIndex ? "bg-accent-lime/50" : "bg-ink-900/10",
                )}
                aria-hidden
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function CompactResumeStrip({
  fileName,
  fileUrl,
  mimeType,
  expanded,
  onToggle,
}: {
  fileName: string;
  fileUrl: string;
  mimeType: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-ink-900/10 bg-paper-50">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-paper-100/80"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink-900/10 bg-paper-100">
            <FileText className="h-4 w-4 text-ink-700" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-ink-400">
              Source résumé
            </span>
            <span className="block truncate text-[13px] font-medium text-ink-950">{fileName}</span>
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-ink-600">
          {expanded ? "Collapse" : "Expand"}
          {expanded ? (
            <ChevronUp className="h-4 w-4" aria-hidden />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden />
          )}
        </span>
      </button>
      {expanded ? (
        <div className="border-t border-ink-900/8">
          <DashboardPdfViewer
            fileName={fileName}
            fileUrl={fileUrl}
            mimeType={mimeType}
            className="max-h-[min(42vh,22rem)] rounded-none border-0 shadow-none"
          />
        </div>
      ) : null}
    </div>
  );
}

type Guest1ProfileFlowProps = {
  fileName: string;
  fileUrl: string;
  mimeType: string;
  steps: ExtractionStep[];
  buildComplete: boolean;
  profile: JobSeekerProfile;
  onUploadDifferent: () => void;
  className?: string;
};

/** Unified upload → extract → assemble → profile flow for guest option 1. */
export function Guest1ProfileFlow({
  fileName,
  fileUrl,
  mimeType,
  steps,
  buildComplete,
  profile,
  onUploadDifferent,
  className,
}: Guest1ProfileFlowProps) {
  const [resumeExpanded, setResumeExpanded] = useState(false);
  const [showBuildHistory, setShowBuildHistory] = useState(false);
  const runningIndex = steps.filter((s) => s.status === "done").length;
  const phaseIndex = getPhaseIndex(runningIndex, buildComplete);

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <div className="mb-3 flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-ink-900/8 bg-paper-50/90 px-3 py-2.5 sm:px-4">
        <p className="min-w-0 truncate text-[12px] font-medium text-ink-700 sm:text-[13px]">
          {fileName}
        </p>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onUploadDifferent}
            className="text-[12px] font-medium text-ink-500 transition hover:text-ink-950"
          >
            Upload different
          </button>
          {buildComplete ? (
            <Button variant="lime" size="sm" href="/sign-up" asChild>
              Save profile
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-500">
              <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" />
              Building…
            </span>
          )}
        </div>
      </div>

      <section
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[24px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)]"
        aria-label="Profile creation flow"
      >
        <div className="shrink-0 border-b border-ink-900/8 px-4 py-4 sm:px-5">
          <FlowStepper activeIndex={phaseIndex} />
        </div>

        <div
          className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5"
          data-lenis-prevent
          data-lenis-prevent-wheel
        >
          {buildComplete ? (
            <>
              <div>
                <Guest1FullProfileView profile={profile} fileName={fileName} />
              </div>

              <CompactResumeStrip
                fileName={fileName}
                fileUrl={fileUrl}
                mimeType={mimeType}
                expanded={resumeExpanded}
                onToggle={() => setResumeExpanded((open) => !open)}
              />

              <button
                type="button"
                onClick={() => setShowBuildHistory((open) => !open)}
                className="flex w-full items-center justify-between rounded-2xl border border-ink-900/10 bg-paper-100/80 px-4 py-3 text-left transition hover:bg-paper-100"
              >
                <span className="text-[12px] font-medium text-ink-700">
                  {showBuildHistory ? "Hide build steps" : "View build steps"}
                </span>
                {showBuildHistory ? (
                  <ChevronUp className="h-4 w-4 text-ink-500" aria-hidden />
                ) : (
                  <ChevronDown className="h-4 w-4 text-ink-500" aria-hidden />
                )}
              </button>

              {showBuildHistory ? (
                <>
                  <DashboardExtractionPanel
                    fileName={fileName}
                    steps={steps}
                    isComplete
                    variant="panel"
                    eyebrow="Step 1 · Extract"
                    heading="Reading and structuring your résumé"
                    fileHint="Parsing sections, dates, and skills"
                    className="h-auto min-h-0 shadow-none"
                  />
                  <div>
                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
                      Step 2 · Assemble
                    </p>
                    <DashboardProfileBuildCanvas
                      steps={steps}
                      profile={profile}
                      isComplete
                      embedded
                      className="min-h-[min(420px,40vh)] shadow-none"
                    />
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <>
              <CompactResumeStrip
                fileName={fileName}
                fileUrl={fileUrl}
                mimeType={mimeType}
                expanded={resumeExpanded}
                onToggle={() => setResumeExpanded((open) => !open)}
              />

              <DashboardExtractionPanel
                fileName={fileName}
                steps={steps}
                isComplete={buildComplete}
                variant="panel"
                eyebrow="Step 1 · Extract"
                heading="Reading and structuring your résumé"
                fileHint="Parsing sections, dates, and skills"
                className="h-auto min-h-0 shadow-none"
              />

              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
                  Step 2 · Assemble
                </p>
                <DashboardProfileBuildCanvas
                  steps={steps}
                  profile={profile}
                  isComplete={buildComplete}
                  embedded
                  className="min-h-[min(520px,50vh)] shadow-none"
                />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
