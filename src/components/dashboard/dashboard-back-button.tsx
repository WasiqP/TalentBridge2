"use client";

import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type DashboardBackButtonProps = {
  onClick: () => void;
  label?: string;
  className?: string;
};

export function DashboardBackButton({
  onClick,
  label = "Back",
  className,
}: DashboardBackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-none fixed left-5 top-5 z-30 sm:left-8 sm:top-6",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={cn(
          "pointer-events-auto group inline-flex h-11 items-center gap-2 rounded-2xl border border-ink-900/12 bg-paper-50 px-3.5 text-[13px] font-medium tracking-tight text-ink-950 shadow-[0_2px_16px_rgba(8,8,12,0.06)] transition sm:px-4 sm:text-[14px]",
          "hover:border-ink-900/20 hover:bg-paper-100 hover:shadow-[0_4px_24px_rgba(8,8,12,0.08)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2",
        )}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-ink-950 text-paper-50 transition group-hover:bg-ink-800">
          <ChevronLeft className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </span>
        {label}
      </button>
    </motion.div>
  );
}
