"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { JobSeekerSearchResult } from "@/config/job-seeker-search";
import { cn } from "@/lib/utils";

function companyInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function companyAccentHue(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function CompanyLogoSlot({
  companyName,
  logoUrl,
  compact,
  className,
}: {
  companyName: string;
  logoUrl?: string;
  compact: boolean;
  className?: string;
}) {
  const sizeClass = compact
    ? "h-14 w-14 rounded-xl sm:h-[3.75rem] sm:w-[3.75rem] sm:rounded-[14px]"
    : "h-16 w-16 rounded-2xl sm:h-20 sm:w-20 sm:rounded-[18px]";

  const textClass = compact ? "text-[13px] sm:text-sm" : "text-sm sm:text-base";

  if (logoUrl) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden border border-ink-900/10 bg-paper-100",
          sizeClass,
          className,
        )}
      >
        <Image
          src={logoUrl}
          alt=""
          fill
          className="object-cover"
          sizes={compact ? "60px" : "80px"}
        />
      </div>
    );
  }

  const hue = companyAccentHue(companyName);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center border border-ink-900/10",
        sizeClass,
        className,
      )}
      style={{
        background: `hsl(${hue} 42% 93%)`,
        color: `hsl(${hue} 35% 32%)`,
      }}
      aria-hidden
    >
      <span className={cn("font-semibold tracking-tight", textClass)}>
        {companyInitials(companyName)}
      </span>
    </div>
  );
}

type SearchResultCardProps = {
  result: JobSeekerSearchResult;
  index?: number;
  className?: string;
  variant?: "default" | "compact";
  matchPercent?: number;
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
  variant = "default",
  matchPercent,
  onViewMore,
  onApply,
}: SearchResultCardProps) {
  const openDetails = () => onViewMore?.(result);
  const compact = variant === "compact";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      role={onViewMore ? "button" : undefined}
      tabIndex={onViewMore ? 0 : undefined}
      onClick={onViewMore ? openDetails : undefined}
      onKeyDown={
        onViewMore
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDetails();
              }
            }
          : undefined
      }
      className={cn(
        "flex w-full items-start gap-4 rounded-2xl border border-ink-900/10 bg-paper-50 transition hover:border-ink-900/18 hover:shadow-[0_4px_24px_rgba(8,8,12,0.06)] sm:rounded-[22px]",
        compact ? "gap-3 px-4 py-4 sm:px-5 sm:py-4" : "gap-5 px-5 py-5 sm:gap-6 sm:px-6 sm:py-6",
        onViewMore && "cursor-pointer",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2
            className={cn(
              "min-w-0 flex-1 font-medium tracking-[-0.02em] text-ink-950",
              compact ? "text-[16px] sm:text-[17px]" : "text-[18px] sm:text-[20px]",
            )}
          >
            {result.jobTitle}
          </h2>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
            {matchPercent != null ? (
              <span className="inline-flex items-center rounded-full border border-accent-lime/40 bg-accent-lime/15 px-2.5 py-1 text-[12px] font-medium text-ink-900">
                {matchPercent}% match
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-1 text-[13px] font-medium text-ink-800">
              <Star
                className="h-3.5 w-3.5 fill-accent-lime text-accent-lime-dark"
                strokeWidth={0}
                aria-hidden
              />
              {result.rating.toFixed(1)}
              {!compact ? (
                <span className="font-normal text-ink-500">
                  ({result.reviewCount})
                </span>
              ) : null}
            </span>
          </div>
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

        {!compact ? (
          <p className="mt-4 text-[14px] leading-[1.65] text-ink-700 sm:text-[15px] sm:leading-[1.7]">
            {result.description}
          </p>
        ) : null}

        {!compact && result.highlights.length > 0 ? (
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

        {!compact && result.tags.length > 0 ? (
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

        <div
          className={cn(
            "flex flex-wrap gap-2.5 sm:gap-3",
            compact ? "mt-3" : "mt-5",
          )}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
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
            onClick={openDetails}
          >
            View More
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "flex shrink-0 flex-col items-end gap-0.5 self-start",
          compact ? "w-14 sm:w-[3.75rem]" : "w-16 sm:w-20",
        )}
      >
        <div
          className="flex flex-wrap items-center justify-end gap-1.5 opacity-0 pointer-events-none select-none -mb-0.5"
          aria-hidden
        >
          {matchPercent != null ? (
            <span className="inline-flex items-center rounded-full border border-accent-lime/40 px-2.5 py-1 text-[12px]">
              {matchPercent}% match
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1 rounded-full border border-ink-900/10 px-2.5 py-1 text-[13px]">
            <Star className="h-3.5 w-3.5" strokeWidth={0} aria-hidden />
            {result.rating.toFixed(1)}
            {!compact ? (
              <span className="font-normal">({result.reviewCount})</span>
            ) : null}
          </span>
        </div>
        <CompanyLogoSlot
          companyName={result.companyName}
          logoUrl={result.companyLogoUrl}
          compact={compact}
          className={compact ? "-mt-1" : "-mt-1.5"}
        />
      </div>
    </motion.article>
  );
}
