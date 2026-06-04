"use client";

import Link from "next/link";
import { Briefcase, ChevronRight, Sparkles } from "lucide-react";

import { agencyRoles } from "@/config/hiring-agency-roles";
import { hiringAgencyRolePath } from "@/config/dashboard-routes";
import { cn } from "@/lib/utils";

type AgencyOpenRolesPanelProps = {
  className?: string;
};

export function AgencyOpenRolesPanel({ className }: AgencyOpenRolesPanelProps) {
  const totalMatches = agencyRoles.reduce((sum, r) => sum + r.matchCount, 0);

  return (
    <section
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]",
        className,
      )}
      aria-label="Open roles"
    >
      <div className="border-b border-ink-900/8 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
              Your pipeline
            </p>
            <h1 className="mt-1 text-balance text-[18px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[20px]">
              Open roles & matches
            </h1>
            <p className="mt-1 text-[13px] text-ink-500 sm:text-[14px]">
              Paste a new job on the right to publish and see talent instantly.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent-lime/35 bg-accent-lime/15 px-3 py-1.5 text-[12px] font-medium text-ink-900">
            <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
            {totalMatches} candidates matched
          </span>
        </div>
      </div>

      <div
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:space-y-4 sm:px-5 sm:py-5"
        data-lenis-prevent
        data-lenis-prevent-wheel
        onWheel={(e) => e.stopPropagation()}
      >
        {agencyRoles.map((role) => (
          <Link
            key={role.id}
            href={hiringAgencyRolePath(role.id)}
            className="group flex w-full items-start gap-3 rounded-2xl border border-ink-900/10 bg-paper-50 px-4 py-4 transition hover:border-ink-900/18 hover:shadow-[0_4px_24px_rgba(8,8,12,0.06)] sm:rounded-[22px] sm:px-5"
          >
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-900/10 bg-paper-100 text-ink-600">
              <Briefcase className="h-4.5 w-4.5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-start justify-between gap-2">
                <span className="min-w-0 flex-1 text-[16px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[17px]">
                  {role.jobTitle}
                </span>
                <span className="inline-flex shrink-0 items-center rounded-full border border-accent-lime/40 bg-accent-lime/15 px-2.5 py-1 text-[12px] font-medium text-ink-900">
                  {role.matchCount} matches
                </span>
              </span>
              <span className="mt-1 block text-[14px] text-ink-500">
                {role.companyName} · {role.location}
              </span>
              <span className="mt-1 block text-[13px] text-ink-400">
                {role.postedLabel} · {role.status}
              </span>
            </span>
            <ChevronRight
              className="mt-1 h-5 w-5 shrink-0 text-ink-300 transition group-hover:text-ink-600"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
