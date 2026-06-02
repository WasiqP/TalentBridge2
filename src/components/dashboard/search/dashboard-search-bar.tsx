"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

type DashboardSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
};

export function DashboardSearchBar({
  value,
  onChange,
  placeholder = "Search",
  className,
  autoFocus,
}: DashboardSearchBarProps) {
  return (
    <label className={cn("block w-full", className)}>
      <span className="sr-only">Search</span>
      <span className="relative flex items-center">
        <Search
          className="pointer-events-none absolute left-5 h-5 w-5 text-ink-400 sm:left-6"
          strokeWidth={2}
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="h-14 w-full rounded-full border border-ink-900/12 bg-paper-50 py-2 pl-12 pr-5 text-[15px] text-ink-900 shadow-[0_2px_16px_rgba(8,8,12,0.04)] transition placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-lime/30 sm:h-[3.75rem] sm:pl-14 sm:pr-6 sm:text-[16px]"
        />
      </span>
    </label>
  );
}
