"use client";

import Image from "next/image";

import {
  offerQuotes,
  offerStatements,
  offerStats,
  type OfferItem,
} from "@/components/guest-pages/guest-3-marquee";
import { cn } from "@/lib/utils";

type LadderImageItem = {
  kind: "image";
  label: string;
  caption: string;
  src: string;
  alt: string;
};

type LadderItem = OfferItem | LadderImageItem;

const LADDER_IMAGES: LadderImageItem[] = [
  {
    kind: "image",
    label: "Profile preview",
    caption: "Your profile, built in seconds",
    src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=640&q=80",
    alt: "Resume and documents on a desk",
  },
  {
    kind: "image",
    label: "Job match preview",
    caption: "Roles ranked for the real you",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=640&q=80",
    alt: "Professional in a modern workplace",
  },
  {
    kind: "image",
    label: "Career insights",
    caption: "Résumé fixes & salary signals",
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=640&q=80",
    alt: "Person working on a laptop",
  },
];

const LADDER_ITEMS: LadderItem[] = [
  offerQuotes[0],
  LADDER_IMAGES[0],
  offerStats[0],
  offerStatements[2],
  LADDER_IMAGES[1],
  offerQuotes[1],
  offerStats[1],
  offerStatements[4],
  LADDER_IMAGES[2],
  offerQuotes[2],
  offerStats[2],
  offerStatements[5],
];
const LADDER_STEPS = 4;
const STEP_PX = 18;

function GlassLadderCard({ item, accented }: { item: LadderItem; accented: boolean }) {
  const shell = cn(
    "rounded-xl",
    item.kind === "image"
      ? "overflow-hidden border border-ink-900/[0.07] bg-white/92 p-2.5 sm:p-3"
      : "px-5 py-5 sm:px-6 sm:py-6",
    item.kind !== "image" &&
      (accented
        ? "border border-accent-lime/35 bg-accent-lime/[0.12]"
        : "border border-ink-900/[0.07] bg-white/92"),
  );

  if (item.kind === "image") {
    return (
      <div className={shell}>
        <div className="relative aspect-[5/3] overflow-hidden rounded-lg">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1280px) 240px, 25vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/15 to-transparent" />
          <p className="absolute bottom-3 left-3 right-3 text-[13px] font-semibold leading-snug text-paper-50 sm:text-[14px]">
            {item.caption}
          </p>
        </div>
      </div>
    );
  }
  if (item.kind === "quote") {
    return (
      <div className={shell}>
        <p className="line-clamp-2 text-[14px] font-medium leading-snug text-ink-800 sm:text-[15px]">
          <span className="font-serif text-[18px] leading-none text-accent-lime-dark">“</span>
          {item.quote}
        </p>
        <p className="mt-3 text-[12px] font-semibold text-ink-600 sm:text-[13px]">{item.author}</p>
      </div>
    );
  }

  if (item.kind === "stat") {
    return (
      <div className={shell}>
        <p
          className={cn(
            "text-[28px] font-bold leading-none tracking-tight sm:text-[30px]",
            accented ? "text-ink-950" : "text-accent-lime-dark",
          )}
        >
          {item.value}
        </p>
        <p className="mt-2 text-[13px] font-medium text-ink-600 sm:text-[14px]">{item.label}</p>
      </div>
    );
  }

  if (item.kind === "statement") {
    const Icon = item.icon;
    return (
      <div className={shell}>
        <span
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-lg",
            accented ? "bg-ink-950 text-accent-lime" : "bg-accent-lime text-ink-950",
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <p className="mt-3 text-[14px] font-medium leading-snug text-ink-800 sm:text-[15px]">{item.text}</p>
      </div>
    );
  }

  return null;
}

type Guest3GlassLadderProps = {
  className?: string;
  duration?: number;
};

/**
 * Left-edge glass card column — cards climb upward with a staggered ladder offset.
 */
export function Guest3GlassLadder({ className, duration = 54 }: Guest3GlassLadderProps) {
  const loop = [...LADDER_ITEMS, ...LADDER_ITEMS];

  return (
    <div
      className={cn(
        "h-full w-[min(18rem,28vw)] max-w-[320px] overflow-hidden",
        "[mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]",
        className,
      )}
      aria-hidden
    >
      <div
        className="flex flex-col gap-5 motion-reduce:!animate-none"
        style={{
          animation: `marquee-vertical ${duration}s linear infinite`,
        }}
      >
        {loop.map((item, i) => {
          const step = i % LADDER_STEPS;
          return (
            <div
              key={i}
              className="w-[min(15rem,25vw)] shrink-0 transition-[margin] duration-300"
              style={{ marginLeft: step * STEP_PX }}
            >
              <GlassLadderCard item={item} accented={i % 2 === 0} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
