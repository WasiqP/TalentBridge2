"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Sparkles, Wallet } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { guestJobs } from "@/constants/guest-page";
import { accentDot, accentSoftLight, accentSpot } from "@/components/guest/accent";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 3800;

export function GuestJobFeed() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    const count = guestJobs.length;
    const clamped = ((next % count) + count) % count;
    setIndex(clamped);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, goTo]);

  return (
    <section className="relative overflow-hidden bg-paper-50 py-24 sm:py-32">
      <Container size="full">
        <FadeUp>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Your live job feed"
              title={
                <>
                  Roles that fit you —{" "}
                  <span className="font-serif italic text-ink-700">
                    with the reason why.
                  </span>
                </>
              }
              description="No endless scrolling through irrelevant listings. Every card is scored against your profile and explains the match in plain language."
            />
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous role"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/12 bg-paper-50 text-ink-950 transition hover:border-ink-900/30 hover:bg-paper-100"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next role"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/12 bg-ink-950 text-paper-50 transition hover:bg-ink-800"
              >
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </FadeUp>
      </Container>

      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scrollbar-hide px-5 sm:mt-16 sm:px-8 lg:px-10"
      >
        {guestJobs.map((job, i) => (
          <article
            key={job.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={cn(
              "group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border bg-paper-50 p-6 transition-all duration-500 sm:w-[360px]",
              i === index
                ? "border-ink-900/20 shadow-[0_24px_70px_-30px_rgba(8,8,12,0.4)]"
                : "border-ink-900/10 opacity-70",
            )}
            style={{
              background: `radial-gradient(420px circle at 80% 0%, ${accentSpot[job.accent]}, transparent 60%)`,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border text-[15px] font-semibold",
                  accentSoftLight[job.accent],
                )}
              >
                {job.company.slice(0, 2)}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-semibold",
                  accentSoftLight[job.accent],
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", accentDot[job.accent])} />
                {job.match}% match
              </span>
            </div>

            <h3 className="mt-5 text-[20px] font-medium leading-snug tracking-[-0.02em] text-ink-950">
              {job.title}
            </h3>
            <p className="mt-1 text-[14px] text-ink-500">{job.company}</p>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-ink-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-ink-400" /> {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5 text-ink-400" /> {job.salary}
              </span>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-ink-900/8 bg-paper-100/70 px-3.5 py-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime-dark" />
              <p className="text-[13px] leading-relaxed text-ink-700">{job.reason}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-1 text-[11.5px] font-medium text-ink-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-ink-900/8 pt-5">
              <a
                href="/sign-up"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-ink-950 text-[14px] font-medium text-paper-50 transition hover:bg-ink-800"
              >
                Apply in 1 click
              </a>
              <span className="rounded-full border border-ink-900/12 px-3 py-1 text-[11px] font-medium text-ink-500">
                {job.type}
              </span>
            </div>
          </article>
        ))}
        <div aria-hidden className="w-1 shrink-0 sm:w-4" />
      </div>

      <Container size="full" className="mt-10">
        <div className="flex items-center justify-center gap-2">
          {guestJobs.map((job, i) => (
            <button
              key={job.id}
              type="button"
              aria-label={`Go to role ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-ink-950" : "w-2 bg-ink-900/20 hover:bg-ink-900/40",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
