"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ArrowUp,
  Bot,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Paperclip,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { JobPost } from "@/types/jobs";

const WELCOME_MESSAGE =
  "I'm your job-search copilot. Ask about roles, career pivots, salary, or résumé polish — I'll answer with your goals in mind.";

const STARTER_PROMPTS = [
  "Find remote product roles",
  "Help me switch careers",
  "What salary should I expect?",
  "Tailor my résumé",
] as const;

const FILTERS = [
  "All",
  "Engineering",
  "Design",
  "Marketing",
  "Finance",
  "Remote only",
] as const;

type Filter = (typeof FILTERS)[number];

const PERKS = [
  "One-click apply",
  "AI résumé polish",
  "Job tracker",
] as const;

const NUDGE_DISMISSED_KEY = "nudge_dismissed";
const WHEEL_COOLDOWN_MS = 600;
const PANEL_COUNT = 3;

function formatTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function hashHue(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function filterJobs(jobs: JobPost[], filter: Filter): JobPost[] {
  if (filter === "All") return jobs;
  if (filter === "Remote only") {
    return jobs.filter((job) => /remote/i.test(job.location));
  }
  return jobs.filter(
    (job) =>
      job.category === filter ||
      job.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase()),
  );
}

function isInsideScrollableJobsGrid(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const grid = target.closest("[data-jobs-grid]");
  if (!(grid instanceof HTMLElement)) return null;
  if (grid.scrollHeight <= grid.clientHeight) return null;
  return grid;
}

function canScrollGrid(grid: HTMLElement, deltaY: number): boolean {
  if (deltaY > 0) {
    return grid.scrollTop + grid.clientHeight < grid.scrollHeight - 1;
  }
  if (deltaY < 0) {
    return grid.scrollTop > 1;
  }
  return false;
}

type GateNudgeProps = {
  open: boolean;
  onDismiss: () => void;
};

function GateNudge({ open, onDismiss }: GateNudgeProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 z-30 flex w-full items-center justify-between gap-4 border-t border-ink-900/10 bg-paper-50 px-6 py-4 shadow-[0_-8px_32px_rgba(8,8,12,0.08)] transition-transform duration-300 ease-out sm:px-8",
        open ? "translate-y-0" : "translate-y-full",
      )}
    >
      <p className="text-[13px] text-ink-700 sm:text-sm">
        Sign up to apply and enhance your résumé · 30 seconds
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="lime"
          size="sm"
          href="/sign-up"
          asChild
          className="whitespace-nowrap bg-[#CBFF4D] hover:bg-[#CBFF4D]/90"
        >
          Sign up free →
        </Button>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-full px-3 py-2 text-[13px] text-ink-500 transition hover:bg-ink-900/5 hover:text-ink-900"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-ink-900/10 bg-white p-3.5">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-ink-900/10" />
        <div className="h-3 flex-1 rounded bg-ink-900/10" />
        <div className="h-2.5 w-10 rounded bg-ink-900/10" />
      </div>
      <div className="mt-3 h-3.5 w-3/4 rounded bg-ink-900/10" />
      <div className="mt-2 h-2.5 w-1/2 rounded bg-ink-900/10" />
      <div className="mt-3 flex gap-1.5">
        <div className="h-5 w-12 rounded-full bg-ink-900/10" />
        <div className="h-5 w-14 rounded-full bg-ink-900/10" />
      </div>
    </div>
  );
}

function JobCard({
  job,
  onApplyClick,
}: {
  job: JobPost;
  onApplyClick: () => void;
}) {
  const hue = hashHue(job.company);

  return (
    <button
      type="button"
      onClick={onApplyClick}
      className="group relative w-full rounded-xl border border-ink-900/20 bg-white p-3.5 text-left transition hover:border-ink-900/30"
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
          style={{ backgroundColor: `hsl(${hue}, 55%, 42%)` }}
          aria-hidden
        >
          {job.company.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-ink-800">
          {job.company}
        </span>
        <span className="shrink-0 text-[10px] text-ink-400">
          {formatTimeAgo(job.postedAt)}
        </span>
      </div>
      <p className="mt-2 text-[13px] font-medium leading-snug text-ink-950">
        {job.title}
      </p>
      <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-500">
        <MapPin className="h-3 w-3 shrink-0" aria-hidden />
        <span className="truncate">{job.location}</span>
      </p>
      {job.tags.length > 0 ? (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {job.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#F0EFE9] px-2 py-0.5 text-[10px] text-ink-600"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <span className="absolute bottom-3.5 right-3.5 text-[12px] font-medium text-ink-900 opacity-0 transition-opacity group-hover:opacity-100">
        Apply →
      </span>
    </button>
  );
}

/** Design option 2 — horizontal scroll landing at `/guest-2`. */
export function Guest2Page() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wheelCooldownRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const nudgeDismissedRef = useRef(false);

  const [panel, setPanel] = useState(0);
  const [message, setMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState(false);
  const [nudgeOpen, setNudgeOpen] = useState(false);

  const filteredJobs = filterJobs(jobs, activeFilter);

  const goToPanel = useCallback((index: number) => {
    setPanel(Math.max(0, Math.min(PANEL_COUNT - 1, index)));
  }, []);

  const goNext = useCallback(() => {
    setPanel((current) => Math.min(PANEL_COUNT - 1, current + 1));
  }, []);

  const goPrev = useCallback(() => {
    setPanel((current) => Math.max(0, current - 1));
  }, []);

  const openNudge = useCallback(() => {
    if (!nudgeDismissedRef.current) {
      setNudgeOpen(true);
    }
  }, []);

  const dismissNudge = useCallback(() => {
    nudgeDismissedRef.current = true;
    sessionStorage.setItem(NUDGE_DISMISSED_KEY, "1");
    setNudgeOpen(false);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(NUDGE_DISMISSED_KEY) === "1") {
      nudgeDismissedRef.current = true;
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.to(track, {
      x: `${-(panel * 100)}vw`,
      duration: 0.65,
      ease: "power3.inOut",
    });
  }, [panel]);

  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      setJobsLoading(true);
      setJobsError(false);
      try {
        const response = await fetch("/api/jobs-feed");
        if (!response.ok) throw new Error("Feed request failed");
        const data = (await response.json()) as { jobs: JobPost[] };
        if (!cancelled) setJobs(data.jobs ?? []);
      } catch {
        if (!cancelled) setJobsError(true);
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    }

    loadJobs();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    function handleWheel(event: WheelEvent) {
      const scrollableGrid = isInsideScrollableJobsGrid(event.target);
      if (scrollableGrid && canScrollGrid(scrollableGrid, event.deltaY)) {
        return;
      }

      event.preventDefault();

      if (wheelCooldownRef.current) return;

      const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
      if (delta === 0) return;

      wheelCooldownRef.current = true;
      window.setTimeout(() => {
        wheelCooldownRef.current = false;
      }, WHEEL_COOLDOWN_MS);

      if (delta > 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    function handleTouchStart(event: TouchEvent) {
      touchStartXRef.current = event.touches[0]?.clientX ?? null;
    }

    function handleTouchEnd(event: TouchEvent) {
      const startX = touchStartXRef.current;
      const endX = event.changedTouches[0]?.clientX;
      touchStartXRef.current = null;
      if (startX == null || endX == null) return;

      const delta = endX - startX;
      if (Math.abs(delta) < 50) return;

      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  function handleSend() {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessage("");
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      ref={wrapperRef}
      data-lenis-prevent
      data-lenis-prevent-wheel
      className="relative h-screen w-screen overflow-hidden bg-[#F0EFE9]"
    >
      <div
        ref={trackRef}
        className="flex h-full w-[300vw] will-change-transform"
      >
        {/* Panel 1 — Chat */}
        <section className="flex h-screen w-screen shrink-0 grow-0 basis-[100vw] items-center justify-center px-6">
          <div className="w-full max-w-[540px]">
            <h1 className="text-center text-[38px] font-medium tracking-[-0.025em] text-ink-950">
              Hey There!
            </h1>

            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-950 text-paper-50">
                <Bot className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-[14px] font-medium text-ink-950">
                  Career copilot
                </p>
                <p className="text-[12px] text-[#5a9e2f]">
                  Online · ready to help
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-white px-4 py-3.5 text-[14px] leading-relaxed text-ink-800">
              {WELCOME_MESSAGE}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setMessage(prompt)}
                  className="rounded-full border border-ink-900/20 px-3.5 py-2 text-[13px] text-ink-800 transition hover:bg-[#CBFF4D]"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-end gap-2 rounded-full border border-ink-900/10 bg-white py-2 pl-4 pr-2 shadow-sm">
              <button
                type="button"
                className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-900/5 hover:text-ink-900"
                aria-label="Attach file"
              >
                <Paperclip className="h-4 w-4" strokeWidth={2.25} />
              </button>
              <textarea
                rows={1}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder="Ask anything about your job search..."
                className="max-h-24 min-h-[2.25rem] min-w-0 flex-1 resize-none bg-transparent py-1.5 text-[15px] leading-relaxed text-ink-900 placeholder:text-ink-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!message.trim()}
                aria-label="Send message"
                className={cn(
                  "mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition",
                  message.trim()
                    ? "bg-ink-950 text-[#CBFF4D] hover:bg-ink-800"
                    : "bg-ink-900/10 text-ink-400",
                )}
              >
                <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <p className="mt-2 text-center text-[12px] text-ink-400">
              AI copilot can make mistakes. Verify important details.
            </p>
          </div>
        </section>

        {/* Panel 2 — Jobs feed */}
        <section className="flex h-screen w-screen shrink-0 grow-0 basis-[100vw] flex-col px-12 py-8">
          <div className="flex shrink-0 items-center justify-between">
            <p className="text-[14px] font-medium text-ink-950">
              Companies hiring now
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CBFF4D] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CBFF4D]" />
              </span>
              <span className="text-[12px] text-ink-600">Live feed</span>
            </div>
          </div>

          <div className="mt-4 flex shrink-0 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition",
                  activeFilter === filter
                    ? "bg-ink-950 text-[#CBFF4D]"
                    : "border border-ink-900/15 text-ink-700 hover:border-ink-900/30",
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div
            data-jobs-grid
            data-lenis-prevent-wheel
            className="mt-4 min-h-0 flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {jobsLoading ? (
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))}
              </div>
            ) : jobsError ? (
              <div className="flex h-full min-h-[200px] items-center justify-center">
                <p className="text-[14px] text-ink-500">
                  Feed temporarily unavailable
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pb-2">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApplyClick={openNudge}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Panel 3 — Sign-up gate */}
        <section className="flex h-screen w-screen shrink-0 grow-0 basis-[100vw] items-center justify-center px-6">
          <div className="flex max-w-lg flex-col items-center text-center">
            <p className="text-[11px] font-medium tracking-[0.08em] text-[#888]">
              YOU&apos;RE ONE STEP AWAY
            </p>
            <h2 className="mt-4 whitespace-pre-line text-[42px] font-medium tracking-[-0.025em] text-ink-950">
              Apply. Enhance.{"\n"}Get hired.
            </h2>
            <p className="mt-4 max-w-[400px] text-[14px] leading-relaxed text-[#666]">
              Create a free account to apply to any role, tailor your résumé
              with AI, and track everything in one place.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {PERKS.map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CBFF4D]" />
                  <span className="text-[13px] text-ink-700">{perk}</span>
                </div>
              ))}
            </div>
            <Button
              variant="lime"
              href="/sign-up"
              asChild
              className="mt-8 bg-[#CBFF4D] px-7 py-[13px] text-[14px] hover:bg-[#CBFF4D]/90"
            >
              Sign up free →
            </Button>
            <p className="mt-4 text-[12px] text-ink-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-ink-800 underline-offset-2 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>

      {/* Navigation arrows */}
      {panel > 0 ? (
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-900/10 bg-white/90 text-ink-800 shadow-sm transition hover:bg-white"
          aria-label="Previous panel"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      ) : null}

      {panel < PANEL_COUNT - 1 ? (
        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-900/10 bg-white/90 text-ink-800 shadow-sm transition hover:bg-white"
          aria-label="Next panel"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      ) : null}

      {/* Dot indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {Array.from({ length: PANEL_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToPanel(index)}
            aria-label={`Go to panel ${index + 1}`}
            className={cn(
              "h-2 rounded-full transition-all",
              panel === index
                ? "w-[18px] bg-ink-950"
                : "w-2 bg-ink-900/25 hover:bg-ink-900/40",
            )}
          />
        ))}
      </div>

      <GateNudge open={nudgeOpen} onDismiss={dismissNudge} />
    </div>
  );
}
