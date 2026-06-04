"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { AgencyCandidateCard } from "@/components/dashboard/agency/agency-candidate-card";
import type { AgencyCandidate } from "@/config/hiring-agency-candidates";
import { getCandidatesForRole } from "@/config/hiring-agency-candidates";
import type { AgencyRole } from "@/config/hiring-agency-roles";
import { HIRING_AGENCY_DASHBOARD_PATH } from "@/config/dashboard-routes";
import { cn } from "@/lib/utils";

const SHORTLIST_KEY = "tb_agency_shortlist";

function readShortlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(SHORTLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function writeShortlist(ids: string[]) {
  sessionStorage.setItem(SHORTLIST_KEY, JSON.stringify(ids));
}

type AgencySuggestedCandidatesPanelProps = {
  role: AgencyRole;
  className?: string;
  onViewResume?: (candidate: AgencyCandidate) => void;
};

export function AgencySuggestedCandidatesPanel({
  role,
  className,
  onViewResume,
}: AgencySuggestedCandidatesPanelProps) {
  const candidates = getCandidatesForRole(role.id);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShortlist(readShortlist());
  }, []);

  const toggleShortlist = useCallback((candidate: AgencyCandidate) => {
    setShortlist((prev) => {
      const next = prev.includes(candidate.id)
        ? prev.filter((id) => id !== candidate.id)
        : [...prev, candidate.id];
      writeShortlist(next);
      return next;
    });
  }, []);

  return (
    <section
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]",
        className,
      )}
      aria-label="Suggested candidates"
    >
      <div className="border-b border-ink-900/8 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
              AI suggestions
            </p>
            <h1 className="mt-1 text-balance text-[18px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[20px]">
              {role.jobTitle}
            </h1>
            <p className="mt-1 text-[14px] text-ink-500">
              {role.companyName} · {role.location}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent-lime/35 bg-accent-lime/15 px-3 py-1.5 text-[12px] font-medium text-ink-900">
            <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
            {candidates.length} ranked
          </span>
        </div>
        {role.id === "role-new" ? (
          <p className="mt-3 rounded-2xl border border-accent-lime/30 bg-accent-lime/10 px-4 py-3 text-[13px] leading-relaxed text-ink-800">
            Draft posting from your JD — edit details in chat, then publish when
            you&apos;re happy.
          </p>
        ) : null}
      </div>

      <div
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-5 sm:px-5 sm:py-5"
        data-lenis-prevent
        data-lenis-prevent-wheel
        onWheel={(e) => e.stopPropagation()}
      >
        {candidates.map((candidate, index) => (
          <AgencyCandidateCard
            key={candidate.id}
            candidate={candidate}
            index={index}
            shortlisted={mounted && shortlist.includes(candidate.id)}
            onToggleShortlist={toggleShortlist}
            onView={onViewResume}
          />
        ))}
      </div>

      <div className="border-t border-ink-900/8 px-5 py-4 sm:px-6">
        <Link
          href={HIRING_AGENCY_DASHBOARD_PATH}
          className="inline-flex w-full items-center justify-center rounded-full border border-ink-900/12 bg-paper-100 px-5 py-3 text-[14px] font-medium text-ink-900 transition hover:border-ink-900/25 hover:bg-paper-200 sm:text-[15px]"
        >
          Back to all roles
        </Link>
      </div>
    </section>
  );
}
