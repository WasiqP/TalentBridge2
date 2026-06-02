"use client";

import { LayoutGroup, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getPaginationRange } from "@/lib/pagination";
import { cn } from "@/lib/utils";

type AnimatedPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const navButtonClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-900/12 bg-paper-50 text-ink-950 transition hover:border-ink-900/22 hover:bg-paper-100 disabled:pointer-events-none disabled:opacity-40";

const pageButtonClass =
  "relative inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-2.5 text-[14px] font-medium text-ink-600 transition hover:text-ink-950";

export function AnimatedPagination({
  page,
  totalPages,
  onPageChange,
  className,
}: AnimatedPaginationProps) {
  if (totalPages <= 1) return null;

  const range = getPaginationRange(page, totalPages);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-center gap-1.5 sm:gap-2",
        className,
      )}
    >
      <motion.button
        type="button"
        aria-label="Previous page"
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
        className={navButtonClass}
        whileHover={canPrev ? { scale: 1.04 } : undefined}
        whileTap={canPrev ? { scale: 0.96 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      </motion.button>

      <LayoutGroup id="search-pagination">
        <div className="flex items-center gap-0.5 sm:gap-1">
        {range.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex h-10 w-8 items-center justify-center text-[14px] text-ink-400"
                aria-hidden
              >
                …
              </span>
            );
          }

          const isActive = item === page;

          return (
            <motion.button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={cn(pageButtonClass, isActive && "text-ink-950")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              {isActive ? (
                <motion.span
                  layoutId="search-pagination-active"
                  className="absolute inset-0 rounded-xl border border-ink-900/15 bg-paper-100 shadow-[0_2px_12px_rgba(8,8,12,0.06)]"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                />
              ) : null}
              <span className="relative z-[1]">{item}</span>
            </motion.button>
          );
        })}
        </div>
      </LayoutGroup>

      <motion.button
        type="button"
        aria-label="Next page"
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
        className={navButtonClass}
        whileHover={canNext ? { scale: 1.04 } : undefined}
        whileTap={canNext ? { scale: 0.96 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </motion.button>
    </nav>
  );
}
