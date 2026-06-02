"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { SELECT_ROLE_PATH } from "@/config/user-roles";
import { useStoredUserRole } from "@/hooks/use-stored-user-role";
import { cn } from "@/lib/utils";

type DashboardSidebarRoleProps = {
  className?: string;
};

export function DashboardSidebarRole({ className }: DashboardSidebarRoleProps) {
  const { label } = useStoredUserRole({ fallback: "job-seeker" });

  return (
    <Link
      href={SELECT_ROLE_PATH}
      className={cn(
        "inline-flex h-11 max-w-[min(100%,12rem)] items-center gap-1.5 rounded-2xl border border-ink-900/12 bg-paper-50 px-3 text-[13px] font-medium text-ink-950 transition hover:border-ink-900/25 hover:bg-paper-100 sm:max-w-none sm:px-3.5 sm:text-[14px]",
        className,
      )}
      aria-label={`Current role: ${label}. Change role`}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full bg-accent-lime shadow-[0_0_0_2px_rgba(193,249,104,0.35)]"
        aria-hidden
      />
      <span className="truncate" suppressHydrationWarning>
        {label}
      </span>
      <ChevronRight
        className="h-3.5 w-3.5 shrink-0 text-ink-400"
        strokeWidth={2}
        aria-hidden
      />
    </Link>
  );
}
