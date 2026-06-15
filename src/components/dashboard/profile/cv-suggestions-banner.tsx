"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { readCvSuggestionsFromSession } from "@/lib/api/hr-backend-session";
import type { ApiCvSuggestion } from "@/types/hr-backend";
import { cn } from "@/lib/utils";

type CvSuggestionsBannerProps = {
  className?: string;
};

/**
 * Shows AI suggestions saved after CV upload (POST /suggestions).
 * Used on the job search screen so guidance follows the user into the next step.
 */
export function CvSuggestionsBanner({ className }: CvSuggestionsBannerProps) {
  const [suggestions, setSuggestions] = useState<ApiCvSuggestion[]>([]);

  useEffect(() => {
    setSuggestions(readCvSuggestionsFromSession());
  }, []);

  if (suggestions.length === 0) return null;

  const topSuggestions = suggestions.slice(0, 3);

  return (
    <section
      className={cn(
        "rounded-[24px] border border-ink-900/12 bg-paper-50 p-5 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:p-6",
        className,
      )}
      aria-label="AI career suggestions"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-accent-lime/35 bg-accent-lime/15 text-ink-950">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-[16px] font-semibold tracking-tight text-ink-950 sm:text-[18px]">
            AI suggestions from your CV
          </h2>
          <p className="mt-1 text-[13px] text-ink-500">
            Use these while you browse roles below.
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {topSuggestions.map((item, index) => (
          <li
            key={`${item.category}-${index}`}
            className="rounded-2xl border border-ink-900/10 bg-paper-50 px-4 py-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                {item.category}
              </span>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize",
                  item.priority === "high"
                    ? "border-accent-lime/35 bg-accent-lime/15 text-ink-900"
                    : "border-ink-900/10 bg-paper-100 text-ink-700",
                )}
              >
                {item.priority}
              </span>
            </div>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-700">
              {item.suggestion}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
