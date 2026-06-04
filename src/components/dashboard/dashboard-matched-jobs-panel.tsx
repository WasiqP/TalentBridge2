"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

import { SearchResultCard } from "@/components/dashboard/search/search-result-card";
import { JobDetailBottomSheet } from "@/components/dashboard/search/job-detail-bottom-sheet";
import type { JobSeekerSearchResult } from "@/config/job-seeker-search";
import { jobSeekerSearchResults } from "@/config/job-seeker-search";
import { JOB_SEEKER_SEARCH_PATH } from "@/config/dashboard-routes";
import { useFavoriteJobs } from "@/hooks/use-favorite-jobs";
import { cn } from "@/lib/utils";
import { useState } from "react";

const HOME_MATCH_COUNT = 5;

/** Static match % for MVP — replace with API scores later. */
const MATCH_PERCENT_BY_INDEX = [92, 88, 85, 81, 78] as const;

type DashboardMatchedJobsPanelProps = {
  resumeFileName?: string;
  totalMatchCount?: number;
  className?: string;
};

export function DashboardMatchedJobsPanel({
  resumeFileName,
  totalMatchCount = jobSeekerSearchResults.length,
  className,
}: DashboardMatchedJobsPanelProps) {
  const [sheetJob, setSheetJob] = useState<JobSeekerSearchResult | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { mounted: favoritesReady, isFavorite, toggleFavorite } =
    useFavoriteJobs();

  const topMatches = jobSeekerSearchResults.slice(0, HOME_MATCH_COUNT);

  function openJobSheet(job: JobSeekerSearchResult) {
    setSheetJob(job);
    setSheetOpen(true);
  }

  return (
    <>
      <section
        className={cn(
          "flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]",
          className,
        )}
        aria-label="Recommended jobs"
      >
        <div className="border-b border-ink-900/8 px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                Recommended for you
              </p>
              <h1 className="mt-1 text-balance text-[18px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[20px]">
                Matched to your resume
              </h1>
              {resumeFileName ? (
                <p className="mt-1 truncate text-[13px] text-ink-500 sm:text-[14px]">
                  Based on{" "}
                  <span className="font-medium text-ink-700">{resumeFileName}</span>
                </p>
              ) : null}
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent-lime/35 bg-accent-lime/15 px-3 py-1.5 text-[12px] font-medium text-ink-900">
              <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
              {totalMatchCount} roles found
            </span>
          </div>
        </div>

        <div
          className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-5 sm:px-5 sm:py-5"
          data-lenis-prevent
          data-lenis-prevent-wheel
          onWheel={(e) => e.stopPropagation()}
        >
          {topMatches.map((result, index) => (
            <SearchResultCard
              key={result.id}
              result={result}
              index={index}
              variant="compact"
              matchPercent={MATCH_PERCENT_BY_INDEX[index] ?? 75}
              onViewMore={openJobSheet}
              onApply={() => openJobSheet(result)}
            />
          ))}
        </div>

        <div className="border-t border-ink-900/8 px-5 py-4 sm:px-6">
          <Link
            href={JOB_SEEKER_SEARCH_PATH}
            className="inline-flex w-full items-center justify-center rounded-full border border-ink-900/12 bg-paper-100 px-5 py-3 text-[14px] font-medium text-ink-900 transition hover:border-ink-900/25 hover:bg-paper-200 sm:text-[15px]"
          >
            View all {totalMatchCount} matches
          </Link>
        </div>
      </section>

      <JobDetailBottomSheet
        job={sheetJob}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onExitComplete={() => setSheetJob(null)}
        isFavorite={sheetJob ? isFavorite(sheetJob.id) : false}
        onToggleFavorite={toggleFavorite}
        onApply={() => setSheetOpen(false)}
        favoriteReady={favoritesReady}
      />
    </>
  );
}
