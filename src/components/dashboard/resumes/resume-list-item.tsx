"use client";

import { motion } from "motion/react";
import { FileText, Star } from "lucide-react";

import type { JobSeekerResume } from "@/config/job-seeker-resumes";
import { cn } from "@/lib/utils";

type ResumeListItemProps = {
  resume: JobSeekerResume;
  selected: boolean;
  onSelect: () => void;
};

function formatResumeDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function ResumeListItem({
  resume,
  selected,
  onSelect,
}: ResumeListItemProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition sm:rounded-[20px] sm:px-5 sm:py-4",
        selected
          ? "border-ink-900/20 bg-paper-100 shadow-[0_2px_16px_rgba(8,8,12,0.06)]"
          : "border-ink-900/10 bg-paper-50 hover:border-ink-900/16 hover:bg-paper-100/80",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
          selected
            ? "border-ink-900/15 bg-paper-50"
            : "border-ink-900/10 bg-paper-100/80",
        )}
      >
        <FileText className="h-5 w-5 text-ink-500" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-[15px] font-medium text-ink-950 sm:text-[16px]">
            {resume.title}
          </span>
          {resume.isPrimary ? (
            <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-accent-lime/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-800">
              <Star
                className="h-2.5 w-2.5 fill-accent-lime-dark text-accent-lime-dark"
                strokeWidth={0}
              />
              Primary
            </span>
          ) : null}
        </span>
        <span className="mt-1 block truncate text-[13px] text-ink-500">
          {resume.fileName}
        </span>
        <span className="mt-1 block text-[12px] text-ink-400">
          Updated {formatResumeDate(resume.updatedAt)}
        </span>
      </span>
    </motion.button>
  );
}
