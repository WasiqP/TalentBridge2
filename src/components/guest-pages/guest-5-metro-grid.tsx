"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  FileUp,
  Info,
  Newspaper,
  PlayCircle,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type MetroArea = "about" | "how" | "feed" | "jobs" | "agencies" | "drop";

type MetroTile = {
  id: string;
  area: MetroArea;
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  surface: string;
  textTone: "light" | "dark";
};

const TILES: MetroTile[] = [
  {
    id: "about",
    area: "about",
    title: "About Us",
    subtitle: "Mission, team & why we built TalentDrobe",
    href: "/about",
    icon: Info,
    surface: "bg-ink-950",
    textTone: "light",
  },
  {
    id: "how-to",
    area: "how",
    title: "How to",
    subtitle: "Three steps from résumé to offer",
    href: "/features",
    icon: PlayCircle,
    surface: "bg-accent-lime",
    textTone: "dark",
  },
  {
    id: "live-feed",
    area: "feed",
    title: "Live Feed",
    subtitle: "Roles & market moves in real time",
    href: "/sign-up",
    icon: Newspaper,
    surface: "bg-[#0ea5a0]",
    textTone: "light",
  },
  {
    id: "jobs",
    area: "jobs",
    title: "Jobs Available",
    subtitle: "1,200+ open roles ranked to your profile",
    href: "/sign-up",
    icon: Briefcase,
    surface: "border border-ink-900/10 bg-white",
    textTone: "dark",
  },
  {
    id: "agencies",
    area: "agencies",
    title: "Agencies Hiring",
    subtitle: "120+ vetted recruiters",
    href: "/sign-up",
    icon: Building2,
    surface: "border border-ink-900/10 bg-paper-100",
    textTone: "dark",
  },
  {
    id: "drop-cv",
    area: "drop",
    title: "Drop Your CV",
    subtitle: "Upload once — profile live in 60 seconds",
    href: "/sign-up",
    icon: FileUp,
    surface: "bg-ink-950",
    textTone: "light",
  },
];

const AREA_CLASS: Record<MetroArea, string> = {
  about: "[grid-area:about]",
  how: "[grid-area:how]",
  feed: "[grid-area:feed]",
  jobs: "[grid-area:jobs]",
  agencies: "[grid-area:agencies]",
  drop: "[grid-area:drop]",
};

function MetroTileCard({
  tile,
  index,
  inView,
}: {
  tile: MetroTile;
  index: number;
  inView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = tile.icon;
  const isLight = tile.textTone === "light";

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className={cn("min-h-[132px] min-w-0", AREA_CLASS[tile.area])}
    >
      <Link
        href={tile.href}
        className={cn(
          "group relative flex h-full min-h-[132px] flex-col overflow-hidden rounded-[2px] p-5 transition-transform duration-300 sm:min-h-[148px] sm:p-6 lg:min-h-0",
          "hover:-translate-y-0.5",
          tile.surface,
        )}
      >
        <div className="relative flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <span
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-[2px]",
                isLight ? "bg-white/12 text-paper-50" : "bg-ink-950/8 text-ink-900",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <ArrowUpRight
              className={cn(
                "h-4 w-4 shrink-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                isLight ? "text-paper-100/50 group-hover:text-paper-50" : "text-ink-300 group-hover:text-ink-700",
              )}
              aria-hidden
            />
          </div>

          <div className="mt-auto pt-4">
            <h3
              className={cn(
                "text-[clamp(1.05rem,2vw,1.35rem)] font-semibold leading-tight tracking-[-0.02em]",
                isLight ? "text-paper-50" : "text-ink-950",
              )}
            >
              {tile.title}
            </h3>
            <p
              className={cn(
                "mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed sm:text-[13px]",
                isLight ? "text-paper-100/65" : "text-ink-500",
              )}
            >
              {tile.subtitle}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
            isLight ? "bg-accent-lime" : "bg-ink-950",
          )}
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

/**
 * Metro grid — explicit placement so tiles fill a tight rectangle:
 *
 * lg (4 cols):
 * ┌─────────┬────┬────┐
 * │ About   │How │Feed│
 * │  2×2    ├────┴────┤
 * │         │  Jobs   │
 * ├────┬────┴─────────┤
 * │Agcy│  Drop CV     │
 * └────┴──────────────┘
 */
export function Guest5MetroGrid({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className={cn("w-full", className)} aria-label="Explore TalentDrobe">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-5 sm:mb-6"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
          Start anywhere
        </p>
        <h2 className="mt-1 text-[clamp(1.25rem,2.5vw,1.65rem)] font-medium tracking-[-0.02em] text-ink-950">
          Your career hub
        </h2>
      </motion.div>

      <div
        className={cn(
          "grid gap-2",
          "grid-cols-1 auto-rows-[minmax(132px,auto)]",
          "[grid-template-areas:'about'_'how'_'feed'_'jobs'_'agencies'_'drop']",
          "sm:grid-cols-2 sm:auto-rows-[minmax(148px,auto)]",
          "sm:[grid-template-areas:'about_about'_'how_feed'_'jobs_jobs'_'agencies_drop']",
          "lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(160px,1fr))]",
          "lg:[grid-template-areas:'about_about_how_feed'_'about_about_jobs_jobs'_'agencies_drop_drop_drop']",
        )}
      >
        {TILES.map((tile, index) => (
          <MetroTileCard key={tile.id} tile={tile} index={index} inView={inView} />
        ))}
      </div>
    </section>
  );
}
