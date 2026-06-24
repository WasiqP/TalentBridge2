"use client";

import type React from "react";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const PANELS = [
  { id: "start", label: "Start" },
  { id: "how-it-works", label: "How it works" },
] as const;

type Guest1HorizontalRailProps = {
  activePanel: number;
  /** Updated imperatively during scroll — avoids React re-renders every frame. */
  progressFillRef: React.RefObject<HTMLDivElement | null>;
  onPanelSelect: (index: number) => void;
  showHint?: boolean;
  className?: string;
};

/** Progress rail + scroll hint for the horizontal landing scroll. */
export function Guest1HorizontalRail({
  activePanel,
  progressFillRef,
  onPanelSelect,
  showHint = false,
  className,
}: Guest1HorizontalRailProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-5 z-20 flex flex-col items-center gap-3 sm:bottom-7",
        className,
      )}
    >
      {showHint ? (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
          className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400"
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={prefersReducedMotion ? undefined : { x: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </motion.span>
        </motion.div>
      ) : null}

      <div
        className="pointer-events-auto flex items-center gap-3 rounded-full border border-ink-900/8 bg-white/85 px-3 py-2 shadow-[0_8px_32px_-12px_rgba(8,8,12,0.18)] backdrop-blur-md sm:gap-4 sm:px-4"
        role="tablist"
        aria-label="Landing sections"
      >
        <div
          className="relative hidden h-1 w-16 overflow-hidden rounded-full bg-ink-900/8 sm:block sm:w-20"
          aria-hidden
        >
          <div
            ref={progressFillRef}
            className="absolute inset-y-0 left-0 w-[8%] rounded-full bg-accent-lime will-change-[width]"
          />
        </div>

        {PANELS.map((panel, index) => {
          const active = activePanel === index;
          return (
            <button
              key={panel.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`guest1-panel-${panel.id}`}
              onClick={() => onPanelSelect(index)}
              className={cn(
                "flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors sm:text-[12px]",
                active
                  ? "text-ink-950"
                  : "text-ink-400 hover:text-ink-700",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                  active ? "scale-125 bg-accent-lime" : "bg-ink-900/20",
                )}
                aria-hidden
              />
              {panel.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
