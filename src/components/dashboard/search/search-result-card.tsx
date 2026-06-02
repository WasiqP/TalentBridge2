"use client";

import { motion } from "motion/react";
import {
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { JobSeekerSearchResult } from "@/config/job-seeker-search";
import { cn } from "@/lib/utils";

type SearchResultCardProps = {
  result: JobSeekerSearchResult;
  index?: number;
  className?: string;
  onViewMore?: (result: JobSeekerSearchResult) => void;
  onApply?: (result: JobSeekerSearchResult) => void;
};

const jobDetailItems = [
  { key: "salary", icon: DollarSign, getValue: (r: JobSeekerSearchResult) => r.salaryRange },
  { key: "location", icon: MapPin, getValue: (r: JobSeekerSearchResult) => r.location },
  {
    key: "type",
    icon: Briefcase,
    getValue: (r: JobSeekerSearchResult) => r.employmentType,
  },
  {
    key: "experience",
    icon: Clock,
    getValue: (r: JobSeekerSearchResult) => r.experience,
  },
] as const;

export function SearchResultCard({
  result,
  index = 0,
  className,
  onViewMore,
  onApply,
}: SearchResultCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "flex w-full items-start gap-5 rounded-2xl border border-ink-900/10 bg-paper-50 px-5 py-5 transition hover:border-ink-900/18 hover:shadow-[0_4px_24px_rgba(8,8,12,0.06)] sm:gap-6 sm:rounded-[22px] sm:px-6 sm:py-6",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-[18px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[20px]">
            {result.jobTitle}
          </h2>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-1 text-[13px] font-medium text-ink-800">
            <Star
              className="h-3.5 w-3.5 fill-accent-lime text-accent-lime-dark"
              strokeWidth={0}
              aria-hidden
            />
            {result.rating.toFixed(1)}
            <span className="font-normal text-ink-500">
              ({result.reviewCount})
            </span>
          </span>
        </div>

        <p className="mt-1 text-[14px] text-ink-500 sm:text-[15px]">
          {result.companyName}
          {result.companyMeta ? (
            <span className="text-ink-400"> · {result.companyMeta}</span>
          ) : null}
        </p>

        <ul
          className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-ink-600 sm:text-[14px]"
          aria-label="Job details"
        >
          {jobDetailItems.map(({ key, icon: Icon, getValue }) => (
            <li key={key} className="inline-flex items-center gap-1.5">
              <Icon
                className="h-3.5 w-3.5 shrink-0 text-ink-400"
                strokeWidth={2}
                aria-hidden
              />
              <span>{getValue(result)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[14px] leading-[1.65] text-ink-700 sm:text-[15px] sm:leading-[1.7]">
          {result.description}
        </p>

        {result.highlights.length > 0 ? (
          <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-ink-600 sm:text-[14px]">
            {result.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-ink-400"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {result.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {result.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-ink-900/10 bg-paper-100 px-3 py-1 text-[12px] font-medium text-ink-600 sm:text-[13px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
          <Button
            type="button"
            variant="lime"
            size="sm"
            onClick={() => onApply?.(result)}
          >
            Apply Now
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onViewMore?.(result)}
          >
            View More
          </Button>
        </div>
      </div>

      <div
        className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl border border-ink-900/10 bg-paper-100 sm:h-20 sm:w-20 sm:rounded-[18px]"
        aria-hidden
      >
        <Building2
          className="h-7 w-7 text-ink-300 sm:h-8 sm:w-8"
          strokeWidth={1.5}
        />
      </div>
    </motion.article>
  );
}
