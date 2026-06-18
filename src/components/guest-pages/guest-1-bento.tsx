"use client";

import {
  BellRing,
  FileEdit,
  MessageCircle,
  MousePointerClick,
  Rss,
  ScanLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { accentSpot } from "@/components/guest/accent";
import {
  guest1FeaturedFeedLabel,
  guest1FeaturedSlides,
  guest1HrNewsSlides,
  guest1NewsFeedLabel,
  type Guest1FeaturedSlide,
  type Guest1NewsSlide,
} from "@/constants/guest-1-bento";
import { seekerFeatures } from "@/constants/guest-page";
import type { GuestAccent, SeekerFeature } from "@/constants/guest-page";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  ScanLine,
  MessageCircle,
  Sparkles,
  FileEdit,
  BellRing,
  MousePointerClick,
  Rss,
};

const HOLD_SECONDS = 3.8;
const FADE_SECONDS = 0.5;

type BentoCellConfig = {
  id: string;
  className: string;
  feature: SeekerFeature;
  variant: "featured" | "compact" | "banner";
};

const bentoCells: BentoCellConfig[] = [
  {
    id: "a",
    className: "col-span-2 row-span-2 min-h-[12rem] sm:min-h-[14.5rem] lg:min-h-[17rem]",
    feature: seekerFeatures[0],
    variant: "featured",
  },
  {
    id: "b",
    className: "col-span-1 min-h-[6rem] sm:min-h-[7rem] lg:min-h-[8rem]",
    feature: seekerFeatures[1],
    variant: "compact",
  },
  {
    id: "c",
    className: "col-span-1 min-h-[6rem] sm:min-h-[7rem] lg:min-h-[8rem]",
    feature: seekerFeatures[2],
    variant: "compact",
  },
  {
    id: "d",
    className: "col-span-1 min-h-[6rem] sm:min-h-[7rem] lg:min-h-[8rem]",
    feature: seekerFeatures[3],
    variant: "compact",
  },
  {
    id: "e",
    className: "col-span-1 min-h-[6rem] sm:min-h-[7rem] lg:min-h-[8rem]",
    feature: seekerFeatures[4],
    variant: "compact",
  },
  {
    id: "f",
    className: "col-span-4 min-h-[6.25rem] sm:min-h-[7.5rem] lg:min-h-[8.5rem]",
    feature: seekerFeatures[5],
    variant: "banner",
  },
];

function AccentGlow({ accent }: { accent: GuestAccent }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full blur-3xl sm:h-32 sm:w-32"
      style={{ background: accentSpot[accent] }}
    />
  );
}

function IconBadge({
  icon: Icon,
  accent,
  dark = false,
}: {
  icon: LucideIcon;
  accent: GuestAccent;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10",
        dark ? "bg-paper-50/10 text-accent-lime" : "bg-ink-950 text-accent-lime",
      )}
    >
      <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
    </span>
  );
}

function SlideProgress({
  feedLabel,
  activeIndex,
  total,
  progressRef,
  dark = false,
}: {
  feedLabel: string;
  activeIndex: number;
  total: number;
  progressRef: React.RefObject<HTMLDivElement | null>;
  dark?: boolean;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
          </span>
          <span
            className={cn(
              "truncate text-[10px] font-medium uppercase tracking-[0.16em]",
              dark ? "text-paper-100/65" : "text-ink-500",
            )}
          >
            {feedLabel}
          </span>
        </div>
        <span
          className={cn(
            "shrink-0 text-[10px] font-medium tabular-nums tracking-wide",
            dark ? "text-paper-100/55" : "text-ink-400",
          )}
        >
          {activeIndex + 1} / {total}
        </span>
      </div>

      <div className="flex gap-[3px]">
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className={cn(
              "relative h-1 flex-1 overflow-hidden rounded-full",
              dark ? "bg-paper-50/12" : "bg-ink-900/8",
            )}
          >
            {index < activeIndex && (
              <div className="absolute inset-0 rounded-full bg-accent-lime" />
            )}
            {index === activeIndex && (
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 rounded-full bg-accent-lime"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AutoTransitionStack({
  children,
  feedLabel,
  className,
  slideClassName,
  dark = false,
}: {
  children: ReactNode[];
  feedLabel: string;
  className?: string;
  slideClassName?: string;
  dark?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const total = children.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || total < 2) return;

    const slides = root.querySelectorAll<HTMLElement>("[data-bento-slide]");
    if (slides.length < 2) return;

    const { gsap } = registerGsap();
    const progress = progressRef.current;

    const ctx = gsap.context(() => {
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });
      setActiveIndex(0);
      if (progress) gsap.set(progress, { scaleX: 0 });

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ repeat: -1 });

      slides.forEach((slide, index) => {
        const next = slides[(index + 1) % slides.length];
        const nextIndex = (index + 1) % slides.length;

        tl.call(() => setActiveIndex(index));
        if (progress) tl.set(progress, { scaleX: 0 });
        if (progress) {
          tl.to(progress, {
            scaleX: 1,
            duration: HOLD_SECONDS,
            ease: "none",
          });
        } else {
          tl.to({}, { duration: HOLD_SECONDS });
        }
        tl.to(slide, {
          autoAlpha: 0,
          duration: FADE_SECONDS,
          ease: "power2.inOut",
        }).to(
          next,
          {
            autoAlpha: 1,
            duration: FADE_SECONDS,
            ease: "power2.inOut",
          },
          "<0.1",
        );
        tl.call(() => setActiveIndex(nextIndex));
      });
    }, root);

    return () => ctx.revert();
  }, [total, prefersReducedMotion]);

  return (
    <div ref={rootRef} className={cn("relative flex h-full min-h-0 flex-col", className)}>
      <SlideProgress
        feedLabel={feedLabel}
        activeIndex={activeIndex}
        total={total}
        progressRef={progressRef}
        dark={dark}
      />

      <div className="relative mt-4 min-h-0 flex-1">
        <div className="invisible flex flex-col" aria-hidden>
          {children[0]}
        </div>
        {children.map((child, index) => (
          <div
            key={index}
            data-bento-slide
            className={cn(
              "absolute inset-0 flex flex-col",
              index === 0 ? "opacity-100" : "opacity-0",
              slideClassName,
            )}
            aria-hidden={index !== activeIndex}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedSlidePanel({ slide }: { slide: Guest1FeaturedSlide }) {
  const Icon = icons[slide.icon] ?? Sparkles;

  return (
    <>
      <div className="relative flex items-start justify-between gap-3">
        <IconBadge icon={Icon} accent={slide.accent} dark />
        <span className="rounded-full bg-paper-50/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-paper-100/70">
          {slide.category}
        </span>
      </div>

      <div className="relative mt-4 flex flex-1 flex-col justify-between sm:mt-5">
        <div className="space-y-2">
          <h3 className="text-[1.1rem] font-medium leading-tight tracking-[-0.02em] sm:text-[1.3rem]">
            {slide.title}
          </h3>
          <p className="max-w-sm text-[12.5px] leading-relaxed text-paper-100/70 sm:text-[13.5px]">
            {slide.description}
          </p>
        </div>
        <div className="relative mt-4 flex flex-wrap gap-1.5 sm:mt-5">
          {slide.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full bg-paper-50/10 px-2.5 py-1 text-[10.5px] text-paper-100/80 sm:text-[11px]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function FeaturedCell() {
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] bg-ink-950/95 p-5 text-paper-50 backdrop-blur-xl sm:p-6">
      <div className="absolute inset-0 gradient-mesh opacity-40" aria-hidden />
      <AccentGlow accent="lime" />

      <AutoTransitionStack
        feedLabel={guest1FeaturedFeedLabel}
        dark
        className="relative z-[1] min-h-full"
      >
        {guest1FeaturedSlides.map((slide) => (
          <FeaturedSlidePanel key={slide.id} slide={slide} />
        ))}
      </AutoTransitionStack>
    </div>
  );
}

function CompactCell({ feature }: { feature: SeekerFeature }) {
  const Icon = icons[feature.icon] ?? Sparkles;

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] bg-paper-50/65 p-4 backdrop-blur-xl backdrop-saturate-150 sm:p-5">
      <AccentGlow accent={feature.accent} />
      <IconBadge icon={Icon} accent={feature.accent} />
      <div className="relative mt-4 space-y-1.5">
        <h3 className="text-[13px] font-medium leading-snug tracking-[-0.02em] text-ink-950 sm:text-[14px]">
          {feature.title}
        </h3>
        <p className="line-clamp-3 text-[11.5px] leading-relaxed text-ink-500 sm:text-[12px]">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

function NewsSlidePanel({ slide }: { slide: Guest1NewsSlide }) {
  return (
    <div className="flex h-full flex-col justify-between gap-3 sm:flex-row sm:items-stretch sm:gap-5">
      <div className="relative flex min-w-0 flex-1 gap-3">
        <IconBadge icon={Rss} accent="violet" />
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink-950/6 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-ink-600">
              {slide.category}
            </span>
            <span className="text-[10px] text-ink-400">
              {slide.source} · {slide.published}
            </span>
          </div>
          <h3 className="text-pretty text-[13px] font-medium leading-snug tracking-[-0.02em] text-ink-950 sm:text-[15px]">
            {slide.headline}
          </h3>
          <p className="line-clamp-2 text-[11.5px] leading-relaxed text-ink-500 sm:text-[12.5px]">
            {slide.excerpt}
          </p>
        </div>
      </div>

      {slide.pulse && (
        <div className="flex shrink-0 items-center sm:w-[7.5rem] sm:justify-end">
          <div className="rounded-xl bg-paper-50/80 px-3 py-2 text-center backdrop-blur-sm sm:px-4 sm:py-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-400">
              Pulse
            </p>
            <p className="mt-0.5 text-[13px] font-medium leading-tight text-ink-950 sm:text-[14px]">
              {slide.pulse}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function BannerCell() {
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] bg-paper-100/80 p-4 backdrop-blur-xl sm:p-5">
      <AccentGlow accent="violet" />
      <AutoTransitionStack feedLabel={guest1NewsFeedLabel} className="relative z-[1] min-h-full">
        {guest1HrNewsSlides.map((slide) => (
          <NewsSlidePanel key={slide.id} slide={slide} />
        ))}
      </AutoTransitionStack>
    </div>
  );
}

function BentoCell({ cell }: { cell: BentoCellConfig }) {
  return (
    <div className={cell.className}>
      {cell.variant === "featured" && <FeaturedCell />}
      {cell.variant === "compact" && <CompactCell feature={cell.feature} />}
      {cell.variant === "banner" && <BannerCell />}
    </div>
  );
}

type Guest1BentoProps = {
  className?: string;
};

/** Bento grid for guest option 1 — reveal is driven by the parent page scroll timeline. */
export const Guest1Bento = forwardRef<HTMLDivElement, Guest1BentoProps>(
  function Guest1Bento({ className }, ref) {
    return (
      <div ref={ref} className={cn("w-full", className)}>
        <div className="grid auto-rows-[minmax(6rem,auto)] grid-cols-4 gap-4 sm:gap-5">
          {bentoCells.map((cell) => (
            <BentoCell key={cell.id} cell={cell} />
          ))}
        </div>
      </div>
    );
  },
);
