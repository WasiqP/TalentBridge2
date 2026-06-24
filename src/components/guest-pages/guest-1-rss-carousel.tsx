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

const CARD_GAP = 16;
const AUTO_ADVANCE_MS = 6000;

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

function useCardsPerView() {
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    function update() {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setCardsPerView(3);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return cardsPerView;
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
        "flex h-full min-h-[10.5rem] flex-col justify-between rounded-[18px] border bg-white p-4 shadow-[0_2px_16px_rgba(8,8,12,0.04)] transition-[border-color,box-shadow] sm:min-h-[11.5rem] sm:p-5",
        active
          ? "border-accent-lime/45 shadow-[0_12px_40px_-24px_rgba(196,255,77,0.4)]"
          : "border-ink-900/8",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-accent-lime sm:h-10 sm:w-10">
          <Rss className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded-full bg-ink-950/6 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-ink-600">
              {slide.category}
            </span>
            <span className="text-[10px] text-ink-400">
              {slide.source} · {slide.published}
            </span>
          </div>
          <h3 className="line-clamp-2 text-[14px] font-medium leading-snug tracking-[-0.02em] text-ink-950 sm:text-[15px]">
            {slide.headline}
          </h3>
          <p className="line-clamp-2 text-[12px] leading-relaxed text-ink-500">
            {slide.excerpt}
          </p>
        </div>
      </div>

      {slide.pulse ? (
        <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">
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
  /** @deprecated Use default layout — kept for backwards compatibility. */
  compact?: boolean;
};

/** Horizontal RSS carousel — fits full cards per viewport, no awkward cut-off. */
export function Guest1RssCarousel({ className }: Guest1RssCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const strideRef = useRef(336);
  const activeIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [slides, setSlides] = useState<Guest1NewsSlide[]>(guest1HrNewsSlides);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [live, setLive] = useState(false);
  const [cardWidth, setCardWidth] = useState<number | null>(null);

  const cardsPerView = useCardsPerView();
  const prefersReducedMotion = useReducedMotion();

  const maxIndex = Math.max(0, slides.length - cardsPerView);
  const pageCount = maxIndex + 1;
  const progress = pageCount <= 1 ? 100 : ((Math.min(activeIndex, maxIndex) + 1) / pageCount) * 100;

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

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const width = viewport.clientWidth;
      const nextCardWidth = (width - CARD_GAP * (cardsPerView - 1)) / cardsPerView;
      setCardWidth(nextCardWidth);
      strideRef.current = nextCardWidth + CARD_GAP;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [cardsPerView]);

  useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
      activeIndexRef.current = maxIndex;
    }
  }, [activeIndex, maxIndex]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || slides.length === 0) return;

      const clamped = Math.max(0, Math.min(index, maxIndex));
      track.scrollTo({
        left: clamped * strideRef.current,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
    },
    [maxIndex, prefersReducedMotion, slides.length],
  );

  const goNext = useCallback(() => {
    scrollToIndex(activeIndexRef.current >= maxIndex ? 0 : activeIndexRef.current + 1);
  }, [maxIndex, scrollToIndex]);

  const goPrev = useCallback(() => {
    scrollToIndex(activeIndexRef.current <= 0 ? maxIndex : activeIndexRef.current - 1);
  }, [maxIndex, scrollToIndex]);

  useEffect(() => {
    if (cardWidth === null) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: activeIndexRef.current * strideRef.current,
      behavior: "auto",
    });
  }, [cardWidth, cardsPerView]);

  useEffect(() => {
    if (prefersReducedMotion || slides.length < 2) return;
    const id = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [goNext, prefersReducedMotion, slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const stride = strideRef.current;
        if (stride <= 0) return;
        const index = Math.round(track.scrollLeft / stride);
        const clamped = Math.max(0, Math.min(index, maxIndex));
        if (clamped !== activeIndexRef.current) {
          activeIndexRef.current = clamped;
          setActiveIndex(clamped);
        }
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [maxIndex, slides.length]);

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
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
              HR World · RSS feed
              {live ? " · live" : ""}
            </span>
          </div>
          <h2 className="mt-1.5 text-[clamp(1.35rem,2.8vw,1.85rem)] font-medium leading-tight tracking-[-0.02em] text-ink-950">
            What&apos;s moving in hiring
          </h2>
          <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-ink-500">
            Headlines from HR sources — swipe or use arrows to browse.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-[11px] font-medium tabular-nums tracking-wide text-ink-400">
            {Math.min(activeIndex, maxIndex) + 1} / {pageCount}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous headlines"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-700 transition hover:border-ink-900/20 hover:bg-paper-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next headlines"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-700 transition hover:border-ink-900/20 hover:bg-paper-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 h-1 overflow-hidden rounded-full bg-ink-900/8">
        <div
          className="h-full rounded-full bg-accent-lime transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </div>

      <div ref={viewportRef} className="overflow-hidden" onKeyDown={onKeyDown}>
        <div
          ref={trackRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 pt-0.5"
          style={{ gap: CARD_GAP, scrollPaddingInline: 0 }}
          tabIndex={0}
          role="list"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="listitem"
              aria-hidden={index < activeIndex || index >= activeIndex + cardsPerView}
              className="shrink-0 snap-start"
              style={{
                width: cardWidth ?? `calc((100% - ${CARD_GAP * (cardsPerView - 1)}px) / ${cardsPerView})`,
                scrollSnapAlign: "start",
              }}
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
