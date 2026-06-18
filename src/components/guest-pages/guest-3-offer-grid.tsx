"use client";

import { useEffect, useState, type ReactNode } from "react";

import {
  GuestMarquee,
  uploadLaneBottomFeed,
  uploadLaneLeft,
  uploadLaneRight,
  uploadLaneTop,
  type OfferItem,
} from "@/components/guest-pages/guest-3-marquee";
import type { HrSignal } from "@/constants/guest-3";
import { cn } from "@/lib/utils";

const maskX =
  "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]";
const maskYLeft =
  "[mask-image:linear-gradient(to_right,black_40%,transparent)]";
const maskYRight =
  "[mask-image:linear-gradient(to_left,black_40%,transparent)]";

const laneFade = "opacity-75 transition-opacity hover:opacity-100";

function feedFromSignals(signals: HrSignal[]): OfferItem[] {
  return signals.slice(0, 3).map((s) => ({
    kind: "feed" as const,
    source: s.source,
    title: s.title,
  }));
}

type Guest3OfferGridProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Single-viewport offer wall — light edge accents, one theme per lane.
 */
export function Guest3OfferGrid({ children, className }: Guest3OfferGridProps) {
  const [feedItems, setFeedItems] = useState<OfferItem[]>(uploadLaneBottomFeed);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/hr-news");
        if (!res.ok) return;
        const data = (await res.json()) as { signals?: HrSignal[] };
        if (cancelled || !data.signals?.length) return;
        setFeedItems(feedFromSignals(data.signals));
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={cn(
        "grid h-full min-h-0 w-full overflow-hidden",
        "grid-rows-[auto_minmax(0,1fr)_auto]",
        "lg:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_minmax(0,9rem)] xl:grid-cols-[minmax(0,10vw)_minmax(0,1fr)_minmax(0,10vw)]",
        className,
      )}
    >
      <div className={cn("col-span-full overflow-hidden px-2 py-0.5", maskX, laneFade)}>
        <GuestMarquee axis="x" items={uploadLaneTop} duration={64} compact />
      </div>

      <div
        className={cn(
          "hidden min-h-0 overflow-hidden lg:col-start-1 lg:row-start-2 lg:block",
          maskYLeft,
          laneFade,
        )}
        aria-hidden
      >
        <GuestMarquee
          axis="y"
          items={uploadLaneLeft}
          duration={56}
          compact
          className="h-full max-h-full"
        />
      </div>

      <div className="col-start-1 row-start-2 flex min-h-0 items-center justify-center overflow-hidden px-3 py-1 sm:px-4 lg:col-start-2 lg:px-6">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <div
        className={cn(
          "hidden min-h-0 overflow-hidden lg:col-start-3 lg:row-start-2 lg:block",
          maskYRight,
          laneFade,
        )}
        aria-hidden
      >
        <GuestMarquee
          axis="y"
          items={uploadLaneRight}
          duration={60}
          reverse
          compact
          className="h-full max-h-full"
        />
      </div>

      <div className={cn("col-span-full overflow-hidden px-2 py-0.5", maskX, laneFade)}>
        <GuestMarquee axis="x" items={feedItems} duration={70} reverse compact />
      </div>
    </div>
  );
}
