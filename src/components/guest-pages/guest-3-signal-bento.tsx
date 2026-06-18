"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Newspaper, Rss } from "lucide-react";
import { offerQuotes } from "@/components/guest-pages/guest-3-marquee";
import { guest3HrPillars, type HrSignal } from "@/constants/guest-3";
import { cn } from "@/lib/utils";

const SEEKER_QUOTES = offerQuotes.map((item) =>
  item.kind === "quote" ? { quote: item.quote, author: item.author } : null,
).filter((q): q is { quote: string; author: string } => q !== null);

const EASE = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 6500;

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

function buildLayouts(signals: HrSignal[]): BentoLayout[] {
  const feeds = signals.slice(0, 6);
  const q = SEEKER_QUOTES;
  const pillars = guest3HrPillars;

  return [
    {
      id: "market-lead",
      cells: [
        {
          data: {
            kind: "feed",
            source: feeds[0]?.source ?? "HR Dive",
            title: feeds[0]?.title ?? FALLBACK_SIGNALS[0].title,
            snippet: feeds[0]?.snippet,
            category: feeds[0]?.category,
          },
          className: "col-span-2 min-h-[8.5rem]",
          accented: true,
        },
        {
          data: { kind: "image", ...IMAGE_CELLS[0] },
          className: "col-span-1 min-h-[8rem]",
          accented: false,
        },
        {
          data: {
            kind: "quote",
            quote: q[2]?.quote ?? q[0].quote,
            author: q[2]?.author ?? q[0].author,
          },
          className: "col-span-1 min-h-[8rem]",
          accented: true,
        },
        {
          data: {
            kind: "pillar",
            eyebrow: "For job seekers",
            text: pillars[0],
          },
          className: "col-span-2 min-h-[6.5rem]",          accented: false,
        },
      ],
    },
    {
      id: "salary-signals",
      cells: [
        {
          data: { kind: "image", ...IMAGE_CELLS[1] },
          className: "col-span-1 row-span-2 min-h-[12.5rem]",
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
          className: "col-span-1 min-h-[5.75rem]",
          accented: false,
        },
        {
          data: {
            kind: "quote",
            quote: q[0]?.quote ?? "",
            author: q[0]?.author ?? "",
          },
          className: "col-span-1 min-h-[5.75rem]",
          accented: true,
        },
        {
          data: {
            kind: "feed",
            source: feeds[2]?.source ?? "HR Executive",
            title: feeds[2]?.title ?? FALLBACK_SIGNALS[2].title,
            category: feeds[2]?.category,
          },
          className: "col-span-2 min-h-[6.25rem]",          accented: false,
        },
      ],
    },
    {
      id: "seeker-pulse",
      cells: [
        {
          data: {
            kind: "pillar",
            eyebrow: "Your HR universe",
            text: pillars[1],
          },
          className: "col-span-2 min-h-[6rem]",
          accented: true,
        },
        {
          data: {
            kind: "feed",
            source: feeds[3]?.source ?? "Workable",
            title: feeds[3]?.title ?? FALLBACK_SIGNALS[3].title,
            snippet: feeds[3]?.snippet,
            category: feeds[3]?.category,
          },
          className: "col-span-1 min-h-[7.5rem]",
          accented: false,
        },
        {
          data: { kind: "image", ...IMAGE_CELLS[2] },
          className: "col-span-1 min-h-[7.5rem]",
          accented: true,
        },
        {
          data: {
            kind: "quote",
            quote: q[1]?.quote ?? "",
            author: q[1]?.author ?? "",
          },
          className: "col-span-2 min-h-[6.5rem]",          accented: false,
        },
      ],
    },
  ];
}

function BentoCell({
  data,
  accented,
}: {
  data: BentoCellData;
  accented: boolean;
}) {
  const shell = cn(
    "flex h-full flex-col rounded-xl px-4 py-3.5 sm:px-4 sm:py-4",
    data.kind === "image" && "overflow-hidden p-2.5 sm:p-3",
    accented && data.kind !== "image"
      ? "border border-accent-lime/35 bg-accent-lime/[0.12]"
      : data.kind !== "image"
        ? "border border-ink-900/[0.07] bg-white/92"
        : "border border-ink-900/[0.07] bg-white/92",
  );
  if (data.kind === "feed") {
    return (
      <div className={shell}>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-500">
          <Newspaper className="h-3 w-3 text-accent-lime-dark" />
          {data.source}
          {data.category ? (
            <span className="rounded bg-ink-950/6 px-1.5 py-0.5 text-[9px] font-medium normal-case tracking-normal text-ink-600">
              {data.category}
            </span>
          ) : null}
        </span>
        <p className="mt-2 line-clamp-3 text-[13px] font-semibold leading-snug text-ink-900 sm:text-[14px]">
          {data.title}
        </p>
        {data.snippet ? (
          <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-ink-600 sm:text-[12px]">
            {data.snippet}
          </p>
        ) : null}
      </div>
    );
  }

  if (data.kind === "image") {
    return (
      <div className={shell}>
        <div className="relative min-h-[4.5rem] flex-1 overflow-hidden rounded-lg">
          <Image
            src={data.src}
            alt={data.alt}
            fill
            sizes="(min-width: 1280px) 200px, 28vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-ink-950/10 to-transparent" />
          <p className="absolute bottom-2.5 left-2.5 right-2.5 text-[12px] font-semibold leading-snug text-paper-50 sm:text-[13px]">
            {data.caption}
          </p>
        </div>
      </div>
    );
  }
  if (data.kind === "quote") {
    return (
      <div className={cn(shell, "justify-center")}>
        <p className="line-clamp-3 text-[12.5px] font-medium leading-snug text-ink-800 sm:text-[13px]">
          <span className="font-serif text-[16px] leading-none text-accent-lime-dark">“</span>
          {data.quote}
        </p>
        <p className="mt-2 text-[11px] font-semibold text-ink-500">{data.author}</p>
      </div>
    );
  }

  return (
    <div className={cn(shell, "justify-center")}>
      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-lime-dark">
        <Rss className="h-3 w-3" />
        {data.eyebrow}
      </span>
      <p className="mt-2 text-[12.5px] font-semibold leading-snug text-ink-800 sm:text-[13px]">
        {data.text}
      </p>
    </div>
  );
}

type Guest3SignalBentoProps = {
  className?: string;
};

/** Right-edge bento — live HR RSS mixed with seeker quotes, pillars & image placeholders. */
export function Guest3SignalBento({ className }: Guest3SignalBentoProps) {
  const [signals, setSignals] = useState<HrSignal[]>(FALLBACK_SIGNALS);
  const [live, setLive] = useState(false);
  const [slide, setSlide] = useState(0);

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

  const layouts = useMemo(() => buildLayouts(signals), [signals]);

  useEffect(() => {
    if (layouts.length <= 1) return;
    const id = window.setInterval(() => {
      setSlide((i) => (i + 1) % layouts.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [layouts.length]);

  const current = layouts[slide] ?? layouts[0];

  return (
    <div
      className={cn(
        "flex h-full w-[min(22rem,34vw)] max-w-[400px] flex-col justify-center",
        "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
      aria-hidden
    >
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500">
          Job market{live ? " · live" : ""}
        </span>
      </div>

      <div className="relative min-h-[28rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid grid-cols-2 gap-3"
          >            {current.cells.map((cell, i) => (
              <div key={`${current.id}-${i}`} className={cell.className}>
                <BentoCell data={cell.data} accented={cell.accented} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {layouts.map((layout, i) => (
          <span
            key={layout.id}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              i === slide ? "w-4 bg-accent-lime-dark" : "w-1 bg-ink-900/15",
            )}
          />
        ))}
      </div>
    </div>
  );
}
