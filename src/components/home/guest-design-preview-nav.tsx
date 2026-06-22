"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutGrid, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { guestPageRoutes } from "@/components/guest-pages";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const previewRoutes = guestPageRoutes.filter((route) =>
  ["guest-1", "guest-2", "guest-3", "guest-4"].includes(route.id),
);

type GuestDesignPreviewNavProps = {
  /** `header` — site header next to auth; `hero` — dark hero CTAs. */
  variant?: "header" | "hero";
  className?: string;
};

/** Nav — jump to alternate guest landing previews (guest-1–4). */
export function GuestDesignPreviewNav({
  variant = "header",
  className,
}: GuestDesignPreviewNavProps) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isHero = variant === "hero";
  const isHeader = variant === "header";

  const panelClass = cn(
    "w-[min(100vw-2.5rem,22rem)] rounded-[22px] border p-2 shadow-[0_20px_50px_-24px_rgba(8,8,12,0.45)] backdrop-blur-xl backdrop-saturate-150",
    isHero
      ? "absolute bottom-full left-0 mb-2 border-paper-50/15 bg-ink-950/95"
      : "absolute right-0 top-full z-50 mt-2 border-ink-900/10 bg-paper-50/95",
  );

  return (
    <div className={cn("relative", isHeader && "z-50", className)}>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: isHero ? -6 : 8, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: isHero ? -4 : 6, scale: 0.98 }
            }
            transition={{ duration: 0.28, ease: EASE }}
            className={panelClass}
            role="dialog"
            aria-label="Guest page previews"
          >
            <p
              className={cn(
                "px-3 pb-2 pt-1 text-[10px] font-medium uppercase tracking-[0.16em]",
                isHero ? "text-paper-100/55" : "text-ink-400",
              )}
            >
              Alternate landing pages
            </p>
            <ul className="flex flex-col gap-1">
              {previewRoutes.map((route, index) => (
                <li key={route.id}>
                  <Link
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-3 py-2.5 text-left transition",
                      isHero
                        ? "hover:bg-paper-50/10 hover:text-paper-50"
                        : "hover:bg-accent-lime/12 hover:text-ink-950",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-xl border text-[12px] font-semibold",
                          isHero
                            ? "border-paper-50/15 bg-paper-50/5 text-paper-50"
                            : "border-ink-900/10 bg-paper-100 text-ink-800",
                        )}
                      >
                        {index + 1}
                      </span>
                      <span>
                        <span
                          className={cn(
                            "block text-[13px] font-medium",
                            isHero ? "text-paper-50" : "text-ink-950",
                          )}
                        >
                          {route.label}
                        </span>
                        <span
                          className={cn(
                            "block text-[11px]",
                            isHero ? "text-paper-100/50" : "text-ink-500",
                          )}
                        >
                          {route.href}
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full font-medium transition",
          isHeader &&
            cn(
              "h-11 border border-ink-900/15 bg-paper-50 px-5 text-[15px] text-ink-950 shadow-sm sm:h-12 sm:px-6",
              "hover:border-accent-lime/45 hover:bg-accent-lime/10",
              open && "border-accent-lime/45 bg-accent-lime/10",
            ),
          isHero &&
            cn(
              "h-11 border border-paper-50/15 bg-paper-50/[0.04] px-4 text-[14px] text-paper-50 backdrop-blur sm:h-12 sm:px-5 sm:text-[15px]",
              "hover:bg-paper-50/[0.08]",
              open && "border-accent-lime/35 bg-accent-lime/10 text-paper-50",
            ),
        )}
      >
        {open ? (
          <X className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" aria-hidden />
        ) : (
          <LayoutGrid
            className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]"
            aria-hidden
          />
        )}
        <span className="whitespace-nowrap">
          {open ? "Close" : "Guest page previews"}
        </span>
      </button>
    </div>
  );
}
