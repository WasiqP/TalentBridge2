"use client";

import { useEffect, useState } from "react";

import type { HrSignal } from "@/constants/guest-3";
import { cn } from "@/lib/utils";

const FALLBACK: { source: string; title: string }[] = [
  { source: "HR Dive", title: "Tech hiring rebounds as AI teams expand headcount" },
  { source: "TLNT", title: "Salary transparency laws reshape candidate offers" },
  { source: "HR Executive", title: "Remote-first firms double down on async hiring" },
  { source: "Workable", title: "Skills-based hiring overtakes degree requirements" },
];

/** Live HR-universe ticker — the "more than a job portal" signal layer. */
export function Guest4SignalTicker({ active }: { active: boolean }) {
  const [items, setItems] = useState<{ source: string; title: string }[]>(FALLBACK);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/hr-news");
        if (!res.ok) throw new Error("bad");
        const data = (await res.json()) as { signals: HrSignal[] };
        if (cancelled || !data.signals?.length) return;
        setItems(data.signals.slice(0, 12).map((s) => ({ source: s.source, title: s.title })));
        setLive(true);
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const row = [...items, ...items];

  return (
    <div className="flex items-center gap-3 overflow-hidden rounded-[20px] border border-ink-900/8 bg-white px-4 py-3">
      <span className="flex shrink-0 items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-600">
          HR universe{live ? " · live" : ""}
        </span>
      </span>

      <span className="h-4 w-px shrink-0 bg-ink-900/10" aria-hidden />

      <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div
          className={cn(
            "flex w-max items-center gap-8 whitespace-nowrap",
            active ? "animate-marquee" : "",
          )}
        >
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-[12.5px]">
              <span className="rounded bg-ink-900/6 px-1.5 py-0.5 text-[10px] font-medium text-ink-600">
                {item.source}
              </span>
              <span className="text-ink-700">{item.title}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
