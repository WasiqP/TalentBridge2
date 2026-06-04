"use client";

import { motion } from "motion/react";
import { Clock, MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AgencyCandidate } from "@/config/hiring-agency-candidates";
import { cn } from "@/lib/utils";

function candidateInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function accentHue(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

type AgencyCandidateCardProps = {
  candidate: AgencyCandidate;
  index?: number;
  shortlisted?: boolean;
  onView?: (candidate: AgencyCandidate) => void;
  onToggleShortlist?: (candidate: AgencyCandidate) => void;
  className?: string;
};

export function AgencyCandidateCard({
  candidate,
  index = 0,
  shortlisted = false,
  onView,
  onToggleShortlist,
  className,
}: AgencyCandidateCardProps) {
  const hue = accentHue(candidate.name);

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
        "flex w-full items-start gap-3 rounded-2xl border border-ink-900/10 bg-paper-50 px-4 py-4 transition hover:border-ink-900/18 hover:shadow-[0_4px_24px_rgba(8,8,12,0.06)] sm:rounded-[22px] sm:px-5",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="min-w-0 flex-1 text-[16px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[17px]">
            {candidate.name}
          </h2>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
            <span className="inline-flex items-center rounded-full border border-accent-lime/40 bg-accent-lime/15 px-2.5 py-1 text-[12px] font-medium text-ink-900">
              {candidate.matchPercent}% match
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-1 text-[13px] font-medium text-ink-800">
              <Star
                className="h-3.5 w-3.5 fill-accent-lime text-accent-lime-dark"
                strokeWidth={0}
                aria-hidden
              />
              {candidate.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="mt-1 text-[14px] text-ink-500">{candidate.currentTitle}</p>

        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-ink-600">
          <li className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-ink-400" aria-hidden />
            {candidate.location}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-ink-400" aria-hidden />
            {candidate.experience}
          </li>
        </ul>

        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-600">
          {candidate.summary}
        </p>

        <div
          className="mt-3 flex flex-wrap gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            type="button"
            variant={shortlisted ? "primary" : "lime"}
            size="sm"
            onClick={() => onToggleShortlist?.(candidate)}
          >
            {shortlisted ? "Shortlisted" : "Shortlist"}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => onView?.(candidate)}>
            View resume
          </Button>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-0.5 self-start">
        <div className="h-7 opacity-0" aria-hidden />
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl border border-ink-900/10 text-[13px] font-semibold sm:h-[3.75rem] sm:w-[3.75rem] sm:rounded-[14px]"
          style={{
            background: `hsl(${hue} 42% 93%)`,
            color: `hsl(${hue} 35% 32%)`,
          }}
          aria-hidden
        >
          {candidateInitials(candidate.name)}
        </div>
      </div>
    </motion.article>
  );
}
