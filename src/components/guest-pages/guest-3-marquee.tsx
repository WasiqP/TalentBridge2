"use client";

import {
  Bell,
  BadgeCheck,
  Gauge,
  MessageCircle,
  Newspaper,
  ScanLine,
  Sparkles,
  Wallet,
  Wand2,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Offer cards — everything TalentDrobe brings to a job seeker         */
/* ------------------------------------------------------------------ */

export type OfferItem =
  | { kind: "statement"; icon: LucideIcon; text: string }
  | { kind: "quote"; quote: string; author: string }
  | { kind: "stat"; value: string; label: string }
  | { kind: "feed"; source: string; title: string };

export const offerStatements: OfferItem[] = [
  { kind: "statement", icon: ScanLine, text: "Your resume becomes a structured profile in seconds." },
  { kind: "statement", icon: Wand2, text: "AI suggests resume fixes before you apply." },
  { kind: "statement", icon: Sparkles, text: "Every match comes with the reason it fits you." },
  { kind: "statement", icon: MessageCircle, text: "A career copilot that answers with your context." },
  { kind: "statement", icon: Wallet, text: "Salary shown upfront — no offer-stage surprises." },
  { kind: "statement", icon: BadgeCheck, text: "Verified roles. No ghost-job black holes." },
  { kind: "statement", icon: Gauge, text: "Profile completeness shows exactly what to add." },
  { kind: "statement", icon: Bell, text: "Always-on alerts the moment a strong role opens." },
];

export const offerQuotes: OfferItem[] = [
  { kind: "quote", quote: "I stopped rewriting my CV for every job.", author: "Maya · Product Designer" },
  { kind: "quote", quote: "The match reasons told me why — no more guessing.", author: "Daniel · Frontend Engineer" },
  { kind: "quote", quote: "Felt like a recruiter who actually read my resume.", author: "Priya · Data Analyst" },
  { kind: "quote", quote: "Applied in one click and actually heard back.", author: "Luka · Product Manager" },
];

export const offerStats: OfferItem[] = [
  { kind: "stat", value: "~10s", label: "to build your profile" },
  { kind: "stat", value: "96%", label: "profile completeness" },
  { kind: "stat", value: "3×", label: "more interviews" },
  { kind: "stat", value: "1 click", label: "to apply" },
];

export const fallbackFeed: OfferItem[] = [
  { kind: "feed", source: "HR Dive", title: "Tech hiring rebounds as AI teams expand headcount" },
  { kind: "feed", source: "TLNT", title: "Salary transparency laws reshape candidate offers" },
  { kind: "feed", source: "HR Executive", title: "Remote-first firms double down on async hiring" },
  { kind: "feed", source: "Workable", title: "Skills-based hiring overtakes degree requirements" },
];

/** Upload hero — one theme per lane, max 3 items, no cross-lane repeats. */
export const uploadLaneTop = offerStats.slice(0, 3);
export const uploadLaneLeft = offerQuotes.slice(0, 2);
export const uploadLaneRight: OfferItem[] = [
  offerStatements[2],
  offerStatements[4],
  offerStatements[5],
];
export const uploadLaneBottomFeed = fallbackFeed.slice(0, 3);

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function OfferCard({ item, compact = false }: { item: OfferItem; compact?: boolean }) {
  const base = cn(
    "h-full rounded-2xl border border-ink-900/8 bg-white/90 shadow-[0_6px_20px_-18px_rgba(8,8,12,0.25)]",
    compact ? "p-2.5" : "p-4",
  );

  if (item.kind === "statement") {
    const Icon = item.icon;
    return (
      <div className={base}>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-ink-950 text-paper-50">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p className={cn("mt-2 leading-snug text-ink-700", compact ? "text-[11px]" : "text-[13px]")}>{item.text}</p>
      </div>
    );
  }

  if (item.kind === "quote") {
    return (
      <div className={base}>
        <p className={cn("leading-snug text-ink-700", compact ? "text-[11px] line-clamp-2" : "text-[13px]")}>
          <span className="font-serif text-[16px] leading-none text-ink-300">“</span>
          {item.quote}
        </p>
        <p className={cn("font-medium text-ink-400", compact ? "mt-1.5 text-[10px]" : "mt-2 text-[11.5px]")}>{item.author}</p>
      </div>
    );
  }

  if (item.kind === "stat") {
    return (
      <div className={cn(base, "flex flex-col justify-center")}>
        <p className={cn("font-semibold leading-none tracking-tight text-ink-950", compact ? "text-[20px]" : "text-[26px]")}>
          {item.value}
        </p>
        <p className={cn("text-ink-500", compact ? "mt-1 text-[10px]" : "mt-1.5 text-[12px]")}>{item.label}</p>
      </div>
    );
  }

  // feed
  return (
    <div className={base}>
      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink-400">
        <Newspaper className="h-3.5 w-3.5" />
        {item.source}
      </span>
      <p className={cn("font-medium leading-snug text-ink-800", compact ? "mt-1.5 line-clamp-2 text-[11px]" : "mt-2 line-clamp-3 text-[13px]")}>
        {item.title}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee lane                                                        */
/* ------------------------------------------------------------------ */

export function GuestMarquee({
  axis,
  items,
  duration = 46,
  reverse = false,
  compact = false,
  className,
}: {
  axis: "x" | "y";
  items: OfferItem[];
  duration?: number;
  reverse?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const isX = axis === "x";
  const animation = `${isX ? "marquee" : "marquee-vertical"} ${duration}s linear infinite${reverse ? " reverse" : ""}`;
  const loop = items.length > 0 ? [...items, ...items] : items;

  if (loop.length === 0) return null;

  return (
    <div
      className={cn(
        "overflow-hidden motion-reduce:[&>div]:!animate-none",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn("gap-3", isX ? "flex w-max" : "flex flex-col")}
        style={{ animation }}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            className={cn(
              "shrink-0",
              isX
                ? compact
                  ? "h-[80px] w-[168px]"
                  : "h-[148px] w-[252px]"
                : compact
                  ? "min-h-[76px] w-full"
                  : "min-h-[132px] w-full",
            )}
          >
            <OfferCard item={item} compact={compact} />
          </div>
        ))}
      </div>
    </div>
  );
}
