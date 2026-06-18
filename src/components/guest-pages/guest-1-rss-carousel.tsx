"use client";

import { ChevronLeft, ChevronRight, ExternalLink, Rss } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useReducedMotion } from "motion/react";

import {
  guest1HrNewsSlides,
  guest1NewsFeedLabel,
  type Guest1NewsSlide,
} from "@/constants/guest-1-bento";
import type { HrSignal } from "@/constants/guest-3";
import { cn } from "@/lib/utils";

const CARD_WIDTH = 320;
const CARD_GAP = 16;
const AUTO_ADVANCE_MS = 5200;

function formatRelativeTime(isoDate: string): string {
  if (!isoDate) return "Recently";
  const diff = Date.now() - new Date(isoDate).getTime();
  if (Number.isNaN(diff) || diff < 0) return "Recently";
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${Math.max(1, minutes)}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function mapSignalCategory(category: string): Guest1NewsSlide["category"] {
  const normalized = category.toLowerCase();
  if (normalized.includes("hiring") || normalized.includes("talent")) return "Hiring trends";
  if (normalized.includes("policy") || normalized.includes("comp")) return "Policy";
  if (normalized.includes("market") || normalized.includes("salary")) return "Market";
  if (normalized.includes("hr") || normalized.includes("leadership")) return "HR World";
  return "What's new";
}

function signalToSlide(signal: HrSignal): Guest1NewsSlide {
  return {
    id: signal.id,
    category: mapSignalCategory(signal.category),
    headline: signal.title,
    excerpt: signal.snippet,
    source: signal.source,
    published: formatRelativeTime(signal.isoDate),
    pulse: signal.category,
  };
}

function RssCarouselCard({
  slide,
  link,
  active,
}: {
  slide: Guest1NewsSlide;
  link?: string;
  active?: boolean;
}) {
  const shell = (
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-[18px] border bg-paper-50/75 p-4 backdrop-blur-xl transition-[border-color,box-shadow] sm:p-5",
        active
          ? "border-accent-lime/40 shadow-[0_12px_40px_-24px_rgba(196,255,77,0.45)]"
          : "border-ink-900/8",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-accent-lime">
          <Rss className="h-4 w-4" />
        </span>
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink-950/6 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-ink-600">
              {slide.category}
            </span>
            <span className="text-[10px] text-ink-400">
              {slide.source} · {slide.published}
            </span>
          </div>
          <h3 className="line-clamp-2 text-[13.5px] font-medium leading-snug tracking-[-0.02em] text-ink-950 sm:text-[14.5px]">
            {slide.headline}
          </h3>
          <p className="line-clamp-2 text-[11.5px] leading-relaxed text-ink-500 sm:text-[12px]">
            {slide.excerpt}
          </p>
        </div>
      </div>

      {slide.pulse ? (
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-accent-lime/15 px-2.5 py-1 text-[10px] font-medium text-ink-700">
            {slide.pulse}
          </span>
          {link ? (
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-ink-400" aria-hidden />
          ) : null}
        </div>
      ) : null}
    </article>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/60 focus-visible:ring-offset-2"
      >
        {shell}
      </a>
    );
  }

  return shell;
}

type Guest1RssCarouselProps = {
  className?: string;
};

/** Horizontal RSS carousel — live HR feed with scroll-snap and auto-advance. */
export function Guest1RssCarousel({ className }: Guest1RssCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState<Guest1NewsSlide[]>(guest1HrNewsSlides);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [live, setLive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/hr-news");
        if (!res.ok) return;
        const data = (await res.json()) as { signals?: HrSignal[] };
        if (cancelled || !data.signals?.length) return;
        setSlides(data.signals.map(signalToSlide));
        setLinks(Object.fromEntries(data.signals.map((s) => [s.id, s.link])));
        setLive(true);
      } catch {
        /* keep mock slides */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track || slides.length === 0) return;
    const normalized = ((index % slides.length) + slides.length) % slides.length;
    const left = normalized * (CARD_WIDTH + CARD_GAP);
    track.scrollTo({ left, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setActiveIndex(normalized);
  }, [slides.length, prefersReducedMotion]);

  const goNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  const goPrev = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    if (prefersReducedMotion || slides.length < 2) return;
    const id = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [goNext, prefersReducedMotion, slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const index = Math.round(track.scrollLeft / (CARD_WIDTH + CARD_GAP));
      setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  return (
    <section
      className={cn("w-full", className)}
      aria-roledescription="carousel"
      aria-label={guest1NewsFeedLabel}
    >
      <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
          </span>
          <span className="truncate text-[10px] font-medium uppercase tracking-[0.16em] text-ink-500">
            {guest1NewsFeedLabel}
            {live ? " · live" : ""}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-[10px] font-medium tabular-nums tracking-wide text-ink-400 sm:inline">
            {activeIndex + 1} / {slides.length}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous headline"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-900/10 bg-paper-50/80 text-ink-700 transition hover:border-ink-900/20 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next headline"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-900/10 bg-paper-50/80 text-ink-700 transition hover:border-ink-900/20 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-[3px]">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to headline ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              index === activeIndex ? "bg-accent-lime" : "bg-ink-900/8 hover:bg-ink-900/14",
            )}
          />
        ))}
      </div>

      <div
        className="relative mt-4 [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
        onKeyDown={onKeyDown}
      >
        <div
          ref={trackRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 pt-0.5"
          tabIndex={0}
          role="list"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="listitem"
              aria-hidden={index !== activeIndex}
              className="h-[9.5rem] w-[min(20rem,78vw)] shrink-0 snap-start sm:h-[10.25rem] sm:w-[20rem]"
              style={{ scrollSnapAlign: "start" }}
            >
              <RssCarouselCard
                slide={slide}
                link={links[slide.id]}
                active={index === activeIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
