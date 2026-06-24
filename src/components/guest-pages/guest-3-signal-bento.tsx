"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Newspaper, Rss } from "lucide-react";
import { Guest3AgenciesList } from "@/components/guest-pages/guest-3-agencies-list";
import { offerQuotes } from "@/components/guest-pages/guest-3-marquee";
import {
  guest3HrPillars,
  type HrSignal,
} from "@/constants/guest-3";
import { cn } from "@/lib/utils";

const SEEKER_QUOTES = offerQuotes
  .map((item) => (item.kind === "quote" ? { quote: item.quote, author: item.author } : null))
  .filter((q): q is { quote: string; author: string } => q !== null);

const EASE = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 7000;
const STAGGER_MS = 2300;

const FALLBACK_SIGNALS: HrSignal[] = [
  {
    id: "f1",
    title: "Tech hiring rebounds as AI teams expand headcount",
    source: "HR Dive",
    link: "#",
    isoDate: "",
    snippet: "Demand for product and engineering talent climbs as firms staff AI initiatives.",
    category: "Hiring",
  },
  {
    id: "f2",
    title: "Salary transparency laws reshape candidate offers",
    source: "TLNT",
    link: "#",
    isoDate: "",
    snippet: "Job seekers gain leverage as pay ranges become standard in listings.",
    category: "Compensation",
  },
  {
    id: "f3",
    title: "Remote-first firms double down on async hiring",
    source: "HR Executive",
    link: "#",
    isoDate: "",
    snippet: "Distributed teams widen the talent pool — and the competition.",
    category: "Workplace",
  },
  {
    id: "f4",
    title: "Skills-based hiring overtakes degree requirements",
    source: "Workable",
    link: "#",
    isoDate: "",
    snippet: "Portfolios and proof-of-work matter more than pedigree alone.",
    category: "Trends",
  },
];

const IMAGE_CELLS = [
  {
    label: "Hiring pulse",
    caption: "Live demand in your niche",
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=640&q=80",
    alt: "Team collaborating in a modern office",
  },
  {
    label: "Salary report",
    caption: "Pay bands before you apply",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&q=80",
    alt: "Analytics dashboard on a laptop",
  },
  {
    label: "Market radar",
    caption: "Layoffs, funding & role waves",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=640&q=80",
    alt: "City skyline representing the job market",
  },
] as const;

type BentoCellData =
  | { kind: "feed"; source: string; title: string; snippet?: string; category?: string }
  | { kind: "image"; label: string; caption: string; src: string; alt: string }
  | { kind: "quote"; quote: string; author: string }
  | { kind: "pillar"; eyebrow: string; text: string };

type BentoLayout = {
  id: string;
  cells: { data: BentoCellData; className: string; accented: boolean }[];
};

function buildMarketLayouts(signals: HrSignal[]): BentoLayout[] {
  const feeds = signals.slice(0, 6);
  const q = SEEKER_QUOTES;

  return [
    {
      id: "market-feed",
      cells: [
        {
          data: {
            kind: "feed",
            source: feeds[0]?.source ?? "HR Dive",
            title: feeds[0]?.title ?? FALLBACK_SIGNALS[0].title,
            snippet: feeds[0]?.snippet,
            category: feeds[0]?.category,
          },
          className: "col-span-2 min-h-0",
          accented: true,
        },
        {
          data: { kind: "image", ...IMAGE_CELLS[1] },
          className: "col-span-1 row-span-2 min-h-0",
          accented: true,
        },
        {
          data: {
            kind: "feed",
            source: feeds[1]?.source ?? "TLNT",
            title: feeds[1]?.title ?? FALLBACK_SIGNALS[1].title,
            snippet: feeds[1]?.snippet,
            category: feeds[1]?.category,
          },
          className: "col-span-1 min-h-0",
          accented: false,
        },
        {
          data: { kind: "quote", quote: q[0]?.quote ?? "", author: q[0]?.author ?? "" },
          className: "col-span-1 min-h-0",
          accented: true,
        },
      ],
    },
    {
      id: "market-pulse",
      cells: [
        {
          data: { kind: "pillar", eyebrow: "Market pulse", text: guest3HrPillars[0] },
          className: "col-span-2 min-h-0",
          accented: false,
        },
        {
          data: { kind: "image", ...IMAGE_CELLS[2] },
          className: "col-span-1 min-h-0",
          accented: true,
        },
        {
          data: {
            kind: "feed",
            source: feeds[2]?.source ?? "HR Executive",
            title: feeds[2]?.title ?? FALLBACK_SIGNALS[2].title,
            category: feeds[2]?.category,
          },
          className: "col-span-1 min-h-0",
          accented: false,
        },
        {
          data: { kind: "quote", quote: q[1]?.quote ?? "", author: q[1]?.author ?? "" },
          className: "col-span-2 min-h-0",
          accented: true,
        },
      ],
    },
  ];
}

function BentoCell({ data, accented }: { data: BentoCellData; accented: boolean }) {
  const shell = cn(
    "flex h-full min-h-0 flex-col rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5",
    data.kind === "image" && "overflow-hidden p-2 sm:p-2.5",
    accented && data.kind !== "image"
      ? "border border-accent-lime/35 bg-accent-lime/[0.12]"
      : "border border-ink-900/[0.07] bg-white/92",
  );

  if (data.kind === "feed") {
    return (
      <div className={shell}>
        <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink-500">
          <Newspaper className="h-3 w-3 shrink-0 text-accent-lime-dark" />
          <span className="truncate">{data.source}</span>
        </span>
        <p className="mt-1.5 line-clamp-3 flex-1 text-[12.5px] font-semibold leading-snug text-ink-900 sm:text-[13px]">
          {data.title}
        </p>
        {data.snippet ? (
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-600">{data.snippet}</p>
        ) : null}
      </div>
    );
  }

  if (data.kind === "image") {
    return (
      <div className={shell}>
        <div className="relative min-h-[4.25rem] flex-1 overflow-hidden rounded-lg">
          <Image
            src={data.src}
            alt={data.alt}
            fill
            sizes="(min-width: 1280px) 180px, 28vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/15 to-transparent" />
          <p className="absolute bottom-2 left-2 right-2 text-[11px] font-semibold leading-snug text-paper-50 sm:text-[11.5px]">
            {data.caption}
          </p>
        </div>
      </div>
    );
  }

  if (data.kind === "quote") {
    return (
      <div className={cn(shell, "justify-center")}>
        <p className="line-clamp-4 text-[11.5px] font-medium leading-snug text-ink-800 sm:text-[12px]">
          <span className="font-serif text-[15px] leading-none text-accent-lime-dark">“</span>
          {data.quote}
        </p>
        <p className="mt-1.5 text-[10px] font-semibold text-ink-500">{data.author}</p>
      </div>
    );
  }

  return (
    <div className={cn(shell, "justify-center")}>
      <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-accent-lime-dark">
        <Rss className="h-3 w-3 shrink-0" />
        {data.eyebrow}
      </span>
      <p className="mt-1.5 line-clamp-3 text-[11.5px] font-semibold leading-snug text-ink-800 sm:text-[12px]">
        {data.text}
      </p>
    </div>
  );
}

function BentoGrid({ layout }: { layout: BentoLayout }) {
  return (
    <div className="grid h-full min-h-0 grid-cols-2 auto-rows-fr gap-2">
      {layout.cells.map((cell, i) => (
        <div key={`${layout.id}-${i}`} className={cn("min-h-0", cell.className)}>
          <BentoCell data={cell.data} accented={cell.accented} />
        </div>
      ))}
    </div>
  );
}

function SideBentoSection({
  label,
  layouts,
  live = false,
  staggerIndex = 0,
  staticGrid = false,
  flexWeight = "1",
}: {
  label: string;
  layouts: BentoLayout[];
  live?: boolean;
  staggerIndex?: number;
  staticGrid?: boolean;
  flexWeight?: "0.9" | "1" | "1.1" | "1.15";
}) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (staticGrid || layouts.length <= 1) return;

    let intervalId = 0;
    const startDelay = staggerIndex * STAGGER_MS;

    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setSlide((i) => (i + 1) % layouts.length);
      }, ROTATE_MS);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(intervalId);
    };
  }, [layouts.length, staggerIndex, staticGrid]);

  const current = layouts[slide] ?? layouts[0];
  const flexClass =
    flexWeight === "1.15"
      ? "flex-[1.15]"
      : flexWeight === "1.1"
        ? "flex-[1.1]"
        : flexWeight === "0.9"
          ? "flex-[0.92]"
          : "flex-1";

  return (
    <section className={cn("flex min-h-0 flex-col", flexClass)}>
      <div className="mb-2 flex shrink-0 items-center justify-between gap-2 border-b border-ink-900/8 pb-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
          </span>
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-700">
            {label}
            {live ? " · live" : ""}
          </span>
        </div>
        {!staticGrid && layouts.length > 1 ? (
          <div className="flex shrink-0 gap-1">
            {layouts.map((layout, i) => (
              <span
                key={layout.id}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === slide ? "w-3 bg-accent-lime-dark" : "w-1 bg-ink-900/15",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative min-h-0 flex-1">
        {staticGrid ? (
          <BentoGrid layout={current} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.38, ease: EASE }}
              className="absolute inset-0"
            >
              <BentoGrid layout={current} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

type Guest3RightRailProps = {
  className?: string;
};

/** Right-edge stack — agencies, how-to, then job market bento sections. */
export function Guest3RightRail({ className }: Guest3RightRailProps) {
  const [signals, setSignals] = useState<HrSignal[]>(FALLBACK_SIGNALS);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/hr-news");
        if (!res.ok) return;
        const data = (await res.json()) as { signals?: HrSignal[] };
        if (cancelled || !data.signals?.length) return;
        setSignals(data.signals);
        setLive(true);
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const marketLayouts = useMemo(() => buildMarketLayouts(signals), [signals]);

  return (
    <div
      className={cn(
        "flex w-[min(19rem,31vw)] max-w-[372px] flex-col gap-5 py-1",
        className,
      )}
      aria-hidden
    >
      <Guest3AgenciesList className="shrink-0" />

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          "[mask-image:linear-gradient(to_bottom,black_0%,black_90%,transparent)]",
        )}
      >
        <SideBentoSection
          label="Job market"
          layouts={marketLayouts}
          live={live}
          staggerIndex={0}
          flexWeight="1"
        />
      </div>
    </div>
  );
}

/** @deprecated Use Guest3RightRail — kept for imports that expect the old name. */
export function Guest3SignalBento({ className }: Guest3RightRailProps) {
  return <Guest3RightRail className={className} />;
}
