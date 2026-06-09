"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type DashboardNextButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export function DashboardNextButton({
  onClick,
  disabled = false,
  label = "Next",
  className,
}: DashboardNextButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-none fixed right-0 top-1/2 z-30 -translate-y-1/2",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={cn(
          "pointer-events-auto group flex items-center gap-2 rounded-l-[1.25rem] border border-r-0 border-ink-900/12 bg-paper-50 py-4 pl-4 pr-3 shadow-[-4px_0_24px_rgba(8,8,12,0.06)] transition",
          "hover:border-ink-900/20 hover:bg-paper-100 hover:shadow-[-6px_0_32px_rgba(8,8,12,0.1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2",
          disabled && "cursor-not-allowed opacity-40 hover:bg-paper-50 hover:shadow-[-4px_0_24px_rgba(8,8,12,0.06)]",
        )}
      >
        <span className="text-[13px] font-medium tracking-tight text-ink-950 sm:text-[14px]">
          {label}
        </span>
        <span
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-xl bg-ink-950 text-paper-50 transition",
            !disabled && "group-hover:bg-ink-800",
          )}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </span>
      </button>
    </motion.div>
  );
}
