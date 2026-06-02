"use client";

import { CheckCircle2, FileText, Loader2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

export type ExtractionStep = {
  id: string;
  title: string;
  detail?: string;
  status: "pending" | "running" | "done";
};

type DashboardExtractionPanelProps = {
  fileName?: string;
  steps: ExtractionStep[];
  className?: string;
  /** Centered full-page card shown right after upload. */
  variant?: "panel" | "standalone";
};

export function DashboardExtractionPanel({
  fileName,
  steps,
  className,
  variant = "panel",
}: DashboardExtractionPanelProps) {
  const isStandalone = variant === "standalone";

  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]",
        isStandalone
          ? "mx-auto w-full max-w-xl min-h-0"
          : "h-full min-h-[min(440px,54vh)]",
        className,
      )}
      aria-label="Resume extraction progress"
    >
      <div className="flex items-start justify-between border-b border-ink-900/8 px-5 py-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
            Resume extraction
          </p>
          <p className="mt-1 text-[14px] font-medium text-ink-950">
            Building your profile in real time
          </p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-ink-900/10 bg-paper-100">
          <Sparkles className="h-5 w-5 text-ink-800" aria-hidden />
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto px-5 py-4"
        data-lenis-prevent
        data-lenis-prevent-wheel
      >
        <div className="rounded-2xl border border-ink-900/14 bg-paper-100/90 px-4 py-3.5 shadow-[0_2px_12px_rgba(8,8,12,0.04)]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/10 bg-paper-50">
              <FileText className="h-5 w-5 text-ink-800" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-ink-950">
                {fileName ?? "Resume"}
              </p>
              <p className="text-[12px] leading-relaxed text-ink-500">
                Parsing sections and generating structured data
              </p>
            </div>
            <Loader2
              className="ml-auto h-4 w-4 shrink-0 animate-spin text-ink-500"
              aria-hidden
            />
          </div>
        </div>

        <ol className="mt-4 space-y-3">
          <AnimatePresence initial={false}>
            {steps.map((s, idx) => (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{
                  duration: 0.28,
                  delay: Math.min(idx * 0.03, 0.12),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border px-4 py-3",
                  s.status === "running"
                    ? "border-ink-900/14 bg-paper-100/80"
                    : "border-ink-900/10 bg-paper-50",
                )}
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-900/10 bg-paper-100 text-ink-700">
                  {s.status === "done" ? (
                    <CheckCircle2 className="h-4 w-4 text-ink-950" aria-hidden />
                  ) : s.status === "running" ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-ink-900/25" aria-hidden />
                  )}
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-[14px] text-ink-950",
                      s.status !== "pending" ? "font-semibold" : "font-medium",
                    )}
                  >
                    {s.title}
                  </p>
                  {s.detail ? (
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-500">
                      {s.detail}
                    </p>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </section>
  );
}

