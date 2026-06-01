"use client";

import Link from "next/link";
import { Settings, UserRound } from "lucide-react";

import {
  JOB_SEEKER_PROFILE_PATH,
  JOB_SEEKER_SETTINGS_PATH,
} from "@/config/dashboard-routes";
import { SELECT_ROLE_PATH } from "@/config/user-roles";
import { cn } from "@/lib/utils";

const iconButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-ink-900/12 bg-paper-50 text-ink-950 transition hover:border-ink-900/25 hover:bg-paper-100";

const textButtonClass =
  "inline-flex h-11 items-center rounded-2xl border border-ink-900/12 bg-paper-50 px-3.5 text-[13px] font-medium text-ink-950 transition hover:border-ink-900/25 hover:bg-paper-100 sm:px-4 sm:text-[14px]";

type DashboardTopActionsProps = {
  className?: string;
};

export function DashboardTopActions({ className }: DashboardTopActionsProps) {
  return (
    <header
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-end px-5 py-5 sm:px-8 sm:py-6",
        className,
      )}
    >
      <div className="pointer-events-auto flex items-center gap-2">
        <Link href={SELECT_ROLE_PATH} className={textButtonClass}>
          Change your role
        </Link>
        <Link
          href={JOB_SEEKER_PROFILE_PATH}
          className={iconButtonClass}
          aria-label="Profile"
        >
          <UserRound className="h-5 w-5" strokeWidth={2} />
        </Link>
        <Link
          href={JOB_SEEKER_SETTINGS_PATH}
          className={iconButtonClass}
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" strokeWidth={2} />
        </Link>
      </div>
    </header>
  );
}
