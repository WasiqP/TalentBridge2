"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Guest1FloatingTabProps = {
  label: string;
  sublabel?: string;
  icon: ReactNode;
  onClick: () => void;
  side: "left" | "right";
  active?: boolean;
  className?: string;
};

/** Compact floating tab — restores a minimized guest-1 panel on click. */
export function Guest1FloatingTab({
  label,
  sublabel,
  icon,
  onClick,
  side,
  active = false,
  className,
}: Guest1FloatingTabProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.28, ease: EASE }}
      onClick={onClick}
      aria-label={`Expand ${label}`}
      className={cn(
        "fixed z-30 flex items-center gap-2.5 rounded-full border border-ink-900/12 bg-paper-50/95 py-2.5 pl-2.5 pr-4 shadow-[0_16px_48px_-16px_rgba(8,8,12,0.35)] backdrop-blur-xl transition hover:border-ink-900/20 hover:bg-white",
        side === "left" ? "bottom-6 left-4 sm:bottom-8 sm:left-6" : "bottom-6 right-4 sm:bottom-8 sm:right-6",
        active && "ring-2 ring-accent-lime/40",
        className,
      )}
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-950 text-accent-lime">
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block truncate text-[13px] font-medium text-ink-950">{label}</span>
        {sublabel ? (
          <span className="block truncate text-[11px] text-ink-500">{sublabel}</span>
        ) : null}
      </span>
    </motion.button>
  );
}
