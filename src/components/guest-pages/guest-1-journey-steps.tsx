"use client";

import { Briefcase, FileUp, Sparkles, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const guest1JourneySteps = [
  {
    id: "drop",
    step: "1",
    title: "Drop your résumé",
    detail: "Upload PDF or Word. We read it in seconds — no forms to fill.",
    icon: FileUp,
  },
  {
    id: "save",
    step: "2",
    title: "We build your profile",
    detail: "Skills, experience, and highlights — assembled automatically for you.",
    icon: Sparkles,
  },
  {
    id: "find",
    step: "3",
    title: "Find roles that fit",
    detail: "Matched jobs and a copilot that explains why each one fits you.",
    icon: Briefcase,
  },
] as const;

type Guest1JourneyStepsProps = {
  className?: string;
  large?: boolean;
};

function StepIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-ink-900/8 bg-white shadow-[0_2px_12px_rgba(8,8,12,0.04)] sm:h-11 sm:w-11">
      <Icon className="h-5 w-5 text-ink-800" aria-hidden />
    </span>
  );
}

/** Three-step explainer — mirrors the hero circuit so new visitors get one clear story. */
export function Guest1JourneySteps({ className, large }: Guest1JourneyStepsProps) {
  return (
    <ol
      className={cn(
        "grid list-none gap-4 sm:gap-5",
        large ? "lg:grid-cols-3 lg:gap-6" : "md:grid-cols-3",
        className,
      )}
    >
      {guest1JourneySteps.map((item) => (
        <li
          key={item.id}
          className={cn(
            "flex flex-col rounded-[1.35rem] border border-ink-900/8 bg-white p-5 shadow-[0_2px_20px_rgba(8,8,12,0.04)] sm:p-6",
            large && "lg:min-h-[11.5rem] lg:p-7 xl:min-h-[12.5rem]",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <StepIcon icon={item.icon} />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              Step {item.step}
            </span>
          </div>
          <h3
            className={cn(
              "mt-4 font-medium tracking-[-0.02em] text-ink-950",
              large ? "text-[1.05rem] sm:text-[1.15rem] lg:text-[1.2rem]" : "text-[1rem] sm:text-[1.05rem]",
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "mt-2 flex-1 leading-relaxed text-ink-500",
              large ? "text-[14px] sm:text-[15px]" : "text-[13px] sm:text-[14px]",
            )}
          >
            {item.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}
