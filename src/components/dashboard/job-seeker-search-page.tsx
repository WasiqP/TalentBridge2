"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

import { DashboardPageFrame } from "@/components/dashboard/dashboard-page-frame";
import { AnimatedPagination } from "@/components/dashboard/search/animated-pagination";
import { DashboardSearchBar } from "@/components/dashboard/search/dashboard-search-bar";
import {
  defaultSearchFilters,
  SearchFiltersPanel,
  type SearchFiltersState,
} from "@/components/dashboard/search/search-filters-panel";
import { JobDetailBottomSheet } from "@/components/dashboard/search/job-detail-bottom-sheet";
import { SearchResultCard } from "@/components/dashboard/search/search-result-card";
import { useFavoriteJobs } from "@/hooks/use-favorite-jobs";
import type { JobSeekerSearchResult } from "@/config/job-seeker-search";
import {
  JOB_SEEKER_SEARCH_PAGE_SIZE,
  jobSeekerSearchResults,
} from "@/config/job-seeker-search";
import type { RatingFilter } from "@/config/job-seeker-search-filters";
import { getPageSlice, getTotalPages } from "@/lib/pagination";
import { cn } from "@/lib/utils";

function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}

function countActiveFilters(filters: SearchFiltersState) {
  let n = 0;
  n += filters.workTypes.length;
  n += filters.categories.length;
  n += filters.companySizes.length;
  if (filters.rating !== "any") n += 1;
  return n;
}

function passesRatingFilter(
  rating: number,
  filter: RatingFilter,
): boolean {
  if (filter === "any") return true;
  if (filter === "4.0") return rating >= 4.0;
  if (filter === "4.5") return rating >= 4.5;
  return true;
}

function filterResults(
  query: string,
  filters: SearchFiltersState,
) {
  const q = normalizeQuery(query);

  return jobSeekerSearchResults.filter((item) => {
    if (q) {
      const haystack = [
        item.jobTitle,
        item.companyName,
        item.companyMeta,
        item.salaryRange,
        item.location,
        item.employmentType,
        item.experience,
        item.description,
        ...item.highlights,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (
      filters.workTypes.length > 0 &&
      !filters.workTypes.some((wt) => item.workTypes.includes(wt))
    ) {
      return false;
    }

    if (
      filters.categories.length > 0 &&
      !filters.categories.some((c) => item.categories.includes(c))
    ) {
      return false;
    }

    if (
      filters.companySizes.length > 0 &&
      !filters.companySizes.includes(item.companySize)
    ) {
      return false;
    }

    if (!passesRatingFilter(item.rating, filters.rating)) {
      return false;
    }

    return true;
  });
}

export function JobSeekerSearchPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFiltersState>(
    defaultSearchFilters,
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"relevance" | "rating" | "reviews">(
    "relevance",
  );
  const [page, setPage] = useState(1);
  const [sheetJob, setSheetJob] = useState<JobSeekerSearchResult | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [applyToast, setApplyToast] = useState<string | null>(null);
  const prevPageRef = useRef(1);
  const { mounted: favoritesReady, isFavorite, toggleFavorite } =
    useFavoriteJobs();

  const activeFilterCount = countActiveFilters(filters);

  const results = useMemo(() => {
    const filtered = filterResults(query, filters);

    const sorted = [...filtered];
    if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return sorted;
  }, [query, filters, sortBy]);

  const totalPages = getTotalPages(
    results.length,
    JOB_SEEKER_SEARCH_PAGE_SIZE,
  );

  const safePage = Math.min(page, totalPages);

  const paginatedResults = useMemo(
    () =>
      getPageSlice(results, safePage, JOB_SEEKER_SEARCH_PAGE_SIZE),
    [results, safePage],
  );

  const pageDirection = safePage >= prevPageRef.current ? 1 : -1;

  useEffect(() => {
    prevPageRef.current = safePage;
  }, [safePage]);

  useEffect(() => {
    setPage(1);
  }, [query, filters, sortBy]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  function handlePageChange(next: number) {
    prevPageRef.current = safePage;
    setPage(next);
    document
      .getElementById("search-results-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openJobSheet(job: JobSeekerSearchResult) {
    setSheetJob(job);
    setSheetOpen(true);
  }

  function closeJobSheet() {
    setSheetOpen(false);
  }

  function handleSheetExitComplete() {
    setSheetJob(null);
  }

  function handleApply(job: JobSeekerSearchResult) {
    setApplyToast(`Application started for ${job.jobTitle} at ${job.companyName}.`);
    window.setTimeout(() => setApplyToast(null), 4000);
  }

  return (
    <DashboardPageFrame className="max-w-[90rem] pb-12 lg:pb-16">
      <h1 className="sr-only">Search companies</h1>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(280px,320px)_minmax(0,1fr)] xl:gap-10">
        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((o) => !o)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-[14px] font-medium text-ink-950"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
            Filters
            {activeFilterCount > 0 ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-950 px-1.5 text-[11px] text-paper-50">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
          <AnimatePresence>
            {mobileFiltersOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <SearchFiltersPanel
                  filters={filters}
                  onChange={setFilters}
                  onClear={() => setFilters(defaultSearchFilters)}
                  activeCount={activeFilterCount}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Desktop filters — sticky left */}
        <SearchFiltersPanel
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(defaultSearchFilters)}
          activeCount={activeFilterCount}
          className="hidden lg:sticky lg:top-24 lg:block"
        />

        {/* Results column — wider */}
        <div className="min-w-0 space-y-5 sm:space-y-6">
          <DashboardSearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search jobs, companies, or keywords"
            autoFocus
          />

          <div
            id="search-results-top"
            className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-900/8 pb-4"
          >
            <p className="text-[14px] text-ink-500 sm:text-[15px]">
              <span className="font-medium text-ink-950">{results.length}</span>{" "}
              {results.length === 1 ? "job" : "jobs"}
              {totalPages > 1 ? (
                <span className="text-ink-400">
                  {" "}
                  · Page {safePage} of {totalPages}
                </span>
              ) : null}
              {query.trim() ? (
                <>
                  {" "}
                  for &ldquo;
                  <span className="text-ink-800">{query.trim()}</span>
                  &rdquo;
                </>
              ) : null}
            </p>

            <label className="inline-flex items-center gap-2 text-[13px] text-ink-500">
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Sort by
              </span>
              <span className="relative inline-flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "relevance" | "rating" | "reviews",
                    )
                  }
                  className="h-10 appearance-none rounded-xl border border-ink-900/12 bg-paper-50 py-0 pl-3 pr-9 text-[13px] font-medium text-ink-950 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-lime/30 sm:text-[14px]"
                >
                  <option value="relevance">Best match</option>
                  <option value="rating">Highest rated</option>
                  <option value="reviews">Most reviews</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2.5 h-4 w-4 text-ink-400"
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
            </label>
          </div>

          <div className={cn("space-y-3 sm:space-y-4")}>
            <AnimatePresence mode="wait">
              {results.length > 0 ? (
                <motion.div
                  key={safePage}
                  initial={{ opacity: 0, x: pageDirection * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: pageDirection * -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3 sm:space-y-4"
                >
                  {paginatedResults.map((result, index) => (
                    <SearchResultCard
                      key={result.id}
                      result={result}
                      index={index}
                      onViewMore={openJobSheet}
                      onApply={(job) => {
                        openJobSheet(job);
                        handleApply(job);
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-dashed border-ink-900/15 bg-paper-50 px-6 py-12 text-center text-[14px] text-ink-500 sm:py-14 sm:text-[15px]"
                >
                  No jobs match your search or filters. Try clearing filters or
                  a different keyword.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <AnimatedPagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="pt-4 sm:pt-6"
          />
        </div>
      </div>
      <JobDetailBottomSheet
        job={sheetJob}
        open={sheetOpen}
        onClose={closeJobSheet}
        onExitComplete={handleSheetExitComplete}
        isFavorite={sheetJob ? isFavorite(sheetJob.id) : false}
        onToggleFavorite={toggleFavorite}
        onApply={handleApply}
        favoriteReady={favoritesReady}
      />

      <AnimatePresence>
        {applyToast ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 z-[110] max-w-md -translate-x-1/2 rounded-2xl border border-ink-900/12 bg-ink-950 px-5 py-3.5 text-center text-[13px] font-medium text-paper-50 shadow-lg sm:text-[14px]"
            role="status"
          >
            {applyToast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DashboardPageFrame>
  );
}
