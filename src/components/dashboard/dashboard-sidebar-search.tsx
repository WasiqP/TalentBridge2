"use client";

import { Search } from "lucide-react";

type DashboardSidebarSearchProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function DashboardSidebarSearch({
  placeholder = "Search…",
  value,
  onChange,
}: DashboardSidebarSearchProps) {
  return (
    <label className="sm-panel-search block w-full">
      <span className="sr-only">Search</span>
      <span className="relative flex items-center">
        <Search
          className="pointer-events-none absolute left-3.5 h-4 w-4 text-ink-400"
          strokeWidth={2}
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-2xl border border-ink-900/12 bg-paper-50 py-2 pl-10 pr-4 text-[14px] text-ink-900 transition placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-lime/30"
        />
      </span>
    </label>
  );
}
