"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  FileUp,
  Search,
  Sparkles,
  UserCheck,
} from "lucide-react";

import { DashboardPageFrame } from "@/components/dashboard/dashboard-page-frame";
import { Button } from "@/components/ui/button";
import { agencyRoles } from "@/config/hiring-agency-roles";
import {
  HIRING_AGENCY_NEW_ROLE_PATH,
  hiringAgencyRolePath,
} from "@/config/dashboard-routes";
const SHORTLIST_KEY = "tb_agency_shortlist";

function readShortlistCount() {
  if (typeof window === "undefined") return 0;
  try {
    const raw = sessionStorage.getItem(SHORTLIST_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export function AgencyRecruiterHomePage() {
  const [query, setQuery] = useState("");
  const [shortlistCount, setShortlistCount] = useState(0);

  useEffect(() => {
    setShortlistCount(readShortlistCount());
  }, []);

  const totalMatches = agencyRoles.reduce((sum, r) => sum + r.matchCount, 0);
  const liveRoles = agencyRoles.filter((r) => r.status === "live").length;

  const filteredRoles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return agencyRoles;
    return agencyRoles.filter(
      (r) =>
        r.jobTitle.toLowerCase().includes(q) ||
        r.companyName.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <DashboardPageFrame className="max-w-6xl pb-16">
      <div className="mb-8 sm:mb-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
          Recruiter workspace
        </p>
        <h1 className="mt-2 text-balance text-[clamp(1.75rem,4vw,2.35rem)] font-medium tracking-[-0.03em] text-ink-950">
          Your hiring pipeline
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-500 sm:text-[16px]">
          Post roles without long forms, then review AI-ranked candidates per
          role. Job hunting and hiring are different workflows — this view is
          built for posting and search.
        </p>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {[
          {
            label: "Open roles",
            value: String(liveRoles),
            icon: Briefcase,
          },
          {
            label: "Candidates matched",
            value: String(totalMatches),
            icon: Sparkles,
          },
          {
            label: "Shortlisted",
            value: String(shortlistCount),
            icon: UserCheck,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-[22px] border border-ink-900/10 bg-paper-50 px-5 py-4 sm:rounded-[24px] sm:px-6 sm:py-5"
          >
            <Icon className="h-5 w-5 text-ink-400" aria-hidden />
            <p className="mt-3 text-[28px] font-medium tracking-[-0.03em] text-ink-950 sm:text-[32px]">
              {value}
            </p>
            <p className="mt-1 text-[13px] text-ink-500 sm:text-[14px]">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-5">
        <Link
          href={HIRING_AGENCY_NEW_ROLE_PATH}
          className="group flex flex-col justify-between rounded-[28px] border border-ink-900/12 bg-ink-950 p-6 text-paper-50 shadow-[0_8px_40px_rgba(8,8,12,0.12)] transition hover:bg-ink-800 sm:rounded-[32px] sm:p-8"
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper-100/55">
              Job posting
            </p>
            <h2 className="mt-2 text-[20px] font-medium tracking-[-0.02em] sm:text-[22px]">
              Post a new role
            </h2>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-paper-100/75 sm:text-[15px]">
              Paste or upload a job description. We draft the posting and surface
              matched candidates — no manual form marathon.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-accent-lime sm:text-[15px]">
            <FileUp className="h-4 w-4" aria-hidden />
            Start posting
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>

        <div className="flex flex-col justify-center rounded-[28px] border border-accent-lime/25 bg-accent-lime/10 p-6 sm:rounded-[32px] sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-600">
            Candidate search
          </p>
          <p className="mt-2 text-[16px] font-medium text-ink-950 sm:text-[17px]">
            Review talent by role
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
            Open a role below to see ranked suggestions, shortlist, and refine
            with copilot on the role page.
          </p>
        </div>
      </div>

      <section
        className="rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]"
        aria-label="Active roles"
      >
        <div className="border-b border-ink-900/8 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                Active roles
              </p>
              <h2 className="mt-1 text-[18px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[20px]">
                Select a role to search candidates
              </h2>
            </div>
            <label className="relative w-full sm:max-w-xs">
              <span className="sr-only">Filter roles</span>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by title or company…"
                className="h-11 w-full rounded-full border border-ink-900/12 bg-paper-100 pl-10 pr-4 text-[14px] text-ink-900 placeholder:text-ink-400 focus:border-ink-900/25 focus:outline-none focus:ring-2 focus:ring-accent-lime/35"
              />
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-ink-900/8 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
                <th className="px-5 py-3 font-medium sm:px-6">Role</th>
                <th className="px-5 py-3 font-medium sm:px-6">Company</th>
                <th className="px-5 py-3 font-medium sm:px-6">Location</th>
                <th className="px-5 py-3 font-medium sm:px-6">Matches</th>
                <th className="px-5 py-3 font-medium sm:px-6">Status</th>
                <th className="px-5 py-3 font-medium sm:px-6">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role, index) => (
                <motion.tr
                  key={role.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-ink-900/6 last:border-0"
                >
                  <td className="px-5 py-4 font-medium text-ink-950 sm:px-6">
                    {role.jobTitle}
                  </td>
                  <td className="px-5 py-4 text-ink-600 sm:px-6">
                    {role.companyName}
                  </td>
                  <td className="px-5 py-4 text-ink-600 sm:px-6">
                    {role.location}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <span className="inline-flex rounded-full border border-accent-lime/40 bg-accent-lime/15 px-2.5 py-1 text-[12px] font-medium text-ink-900">
                      {role.matchCount}
                    </span>
                  </td>
                  <td className="px-5 py-4 capitalize text-ink-500 sm:px-6">
                    {role.status}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <Link
                      href={hiringAgencyRolePath(role.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/12 bg-paper-100 px-3.5 py-2 text-[13px] font-medium text-ink-900 transition hover:border-ink-900/22 hover:bg-paper-200"
                    >
                      View candidates
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRoles.length === 0 ? (
          <p className="px-5 py-10 text-center text-[14px] text-ink-500 sm:px-6">
            No roles match your filter.
          </p>
        ) : null}

        <div className="border-t border-ink-900/8 px-5 py-4 sm:px-6">
          <Button variant="outline" size="md" href={HIRING_AGENCY_NEW_ROLE_PATH}>
            Post another role
          </Button>
        </div>
      </section>
    </DashboardPageFrame>
  );
}
