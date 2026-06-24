"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bot, ChevronLeft, Sparkles } from "lucide-react";
import type { ScrollTrigger as ScrollTriggerInstance } from "gsap/ScrollTrigger";

import { Guest1Chat } from "@/components/guest-pages/guest-1-chat";
import { Guest1CircuitFlow } from "@/components/guest-pages/guest-1-circuit-flow";
import { Guest1Bento } from "@/components/guest-pages/guest-1-bento";
import { Guest1JourneySteps } from "@/components/guest-pages/guest-1-journey-steps";
import { Guest1FloatingTab } from "@/components/guest-pages/guest-1-floating-tab";
import { Guest1HorizontalRail } from "@/components/guest-pages/guest-1-horizontal-rail";
import { Guest1RssCarousel } from "@/components/guest-pages/guest-1-rss-carousel";
import { Guest1Metro } from "@/components/guest-pages/guest-1-metro";
import {
  Guest1ResumePanel,
  type Guest1ResumePanelHandle,
} from "@/components/guest-pages/guest-1-resume-panel";
import { Button } from "@/components/ui/button";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const HORIZONTAL_PANELS = 2;

function Guest1FeaturesBlock({
  className,
  compact,
  large,
  onBackToStart,
}: {
  className?: string;
  compact?: boolean;
  large?: boolean;
  /** Scroll the horizontal landing back to the Start (hero) panel. */
  onBackToStart?: () => void;
}) {
  return (
    <div className={className}>
      <div
        className={
          large ? "mb-4 sm:mb-5" : compact ? "mb-2 sm:mb-3" : "mb-6 sm:mb-8"
        }
      >
        <h2
          className={cn(
            "font-medium leading-[1.05] tracking-[-0.02em] text-ink-950",
            large
              ? "text-[clamp(2rem,3.5vw,2.85rem)]"
              : compact
                ? "text-[clamp(1.625rem,3vw,2.25rem)]"
                : "text-[clamp(2.25rem,4.5vw,3.25rem)]",
          )}
          style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        >
          How it works
        </h2>
        <p
          className={cn(
            "text-pretty leading-relaxed text-ink-500",
            large
              ? "mt-2 max-w-3xl text-[15px] sm:mt-3 sm:text-[16px] lg:text-[17px]"
              : compact
                ? "mt-1.5 line-clamp-2 max-w-3xl text-[13px] sm:mt-2 sm:text-[14px] sm:line-clamp-none lg:max-w-4xl"
                : "mt-3 max-w-3xl text-[15px] sm:mt-4 sm:text-[16px] lg:max-w-4xl",
          )}
        >
          Three steps from résumé to matched roles. Same flow you saw on the left — nothing extra to
          learn.
        </p>
      </div>
      <Guest1JourneySteps large={large || !compact} />
      {onBackToStart ? (
        <div className="mt-8 flex justify-center sm:mt-10">
          <Button variant="lime" size="md" onClick={onBackToStart}>
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Start
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function Guest1WhatYouGetBlock({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
        Included with every profile
      </p>
      <h2
        className="mt-1.5 text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-ink-950"
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        What you get
      </h2>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-500 sm:text-[15px]">
        Upload once — then three steps get you applying, with four tools running in the
        background the whole time.
      </p>
      <Guest1Bento large className="mt-6 sm:mt-8" />
    </div>
  );
}

/** Design option 1 — conversation-first landing at `/guest-1`. */
export function Guest1Page() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const horizontalStRef = useRef<ScrollTriggerInstance | null>(null);
  const horizontalPanelRef = useRef(0);
  const resumePanelRef = useRef<Guest1ResumePanelHandle>(null);
  const [chatEngaged, setChatEngaged] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [resumeReady, setResumeReady] = useState(false);
  const [profileBuilt, setProfileBuilt] = useState(false);
  const [uploadSignal, setUploadSignal] = useState<{ key: number; fileName: string }>();
  const [profileCompleteSignal, setProfileCompleteSignal] = useState<{ key: number }>();
  const [chatResetKey, setChatResetKey] = useState(0);
  const [horizontalPanel, setHorizontalPanel] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const landingScrollEnabled = !sessionActive && !prefersReducedMotion;

  function handleStartDropSession() {
    setSessionActive(true);
    setChatEngaged(true);
    setChatMinimized(false);
  }

  function handleCreateNewProfile() {
    resumePanelRef.current?.reset();
    setResumeReady(false);
    setProfileBuilt(false);
    setUploadSignal(undefined);
    setProfileCompleteSignal(undefined);
    setChatResetKey((key) => key + 1);
    setChatMinimized(false);
    setSessionActive(true);
    setChatEngaged(true);
  }

  function handleBackToLanding() {
    resumePanelRef.current?.reset();
    setResumeReady(false);
    setProfileBuilt(false);
    setUploadSignal(undefined);
    setProfileCompleteSignal(undefined);
    setChatResetKey((key) => key + 1);
    setChatMinimized(false);
    setChatEngaged(false);
    setSessionActive(false);
    setHorizontalPanel(0);
    horizontalPanelRef.current = 0;
    if (progressFillRef.current) {
      progressFillRef.current.style.width = "8%";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => registerGsap().ScrollTrigger.refresh());
  }

  const goToHorizontalPanel = useCallback((index: number) => {
    const st = horizontalStRef.current;
    if (!st) return;

    const clamped = Math.max(0, Math.min(HORIZONTAL_PANELS - 1, index));
    const targetProgress = clamped / (HORIZONTAL_PANELS - 1);

    gsap.to(st, {
      progress: targetProgress,
      duration: 0.55,
      ease: "power2.inOut",
      overwrite: "auto",
      onUpdate: () => {
        const fill = progressFillRef.current;
        if (fill) {
          fill.style.width = `${Math.max(8, st.progress * 100)}%`;
        }
        const panel = Math.round(st.progress * (HORIZONTAL_PANELS - 1));
        horizontalPanelRef.current = panel;
        setHorizontalPanel(panel);
      },
    });
  }, []);

  useEffect(() => {
    if (!sessionActive) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const { ScrollTrigger } = registerGsap();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [sessionActive]);

  useLayoutEffect(() => {
    if (!landingScrollEnabled) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const { gsap: gsapInstance, ScrollTrigger } = registerGsap();

    const ctx = gsapInstance.context(() => {
      const scrollDistance = () => window.innerHeight * 0.62;

      gsapInstance.set(track, { x: 0, force3D: true });

      const tl = gsapInstance.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin,
          pinSpacing: true,
          pinType: "transform",
          scrub: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const fill = progressFillRef.current;
            if (fill) {
              fill.style.width = `${Math.max(8, self.progress * 100)}%`;
            }

            const panel = Math.round(self.progress * (HORIZONTAL_PANELS - 1));
            if (panel !== horizontalPanelRef.current) {
              horizontalPanelRef.current = panel;
              setHorizontalPanel(panel);
            }
          },
        },
      });

      horizontalStRef.current = tl.scrollTrigger ?? null;

      tl.to(
        track,
        {
          x: () => -(window.innerWidth * (HORIZONTAL_PANELS - 1)),
          ease: "none",
          duration: 1,
          force3D: true,
        },
        0,
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => {
      horizontalStRef.current = null;
      ctx.revert();
    };
  }, [landingScrollEnabled]);

  useEffect(() => {
    if (!landingScrollEnabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToHorizontalPanel(horizontalPanelRef.current + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToHorizontalPanel(horizontalPanelRef.current - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToHorizontalPanel, landingScrollEnabled]);

  const landingHeroGrid = (
    <>
      <motion.div
        layout={!prefersReducedMotion}
        transition={{ duration: 0.45, ease: EASE }}
        className="flex min-h-0 w-full min-w-0 flex-col justify-center text-center lg:text-left"
      >
        <h1 className="text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink-950 xl:text-[clamp(2.5rem,4vw,3.75rem)]">
          Hey There!
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-500 sm:mt-5 sm:text-[16px] lg:mx-0 lg:max-w-2xl xl:text-[17px]">
          Tell us what you&apos;re looking for — a new role, a career shift, or help polishing your
          profile. Start with a message below and we&apos;ll take it from there.
        </p>

        <Guest1Chat
          fillHeight={false}
          minimized={false}
          notice={uploadSignal}
          profileComplete={profileCompleteSignal}
          resetKey={chatResetKey}
          onEngagedChange={(engaged) => {
            setChatEngaged(engaged);
            if (engaged) {
              setSessionActive(true);
              setChatMinimized(false);
            }
          }}
          onMinimizedChange={setChatMinimized}
          className="mt-8 w-full min-w-0 sm:mt-10"
        />
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="flex min-h-0 items-center justify-center lg:items-start lg:justify-start"
      >
        <Guest1CircuitFlow onDropClick={handleStartDropSession} className="w-full" />
      </motion.div>
    </>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 sm:p-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <AnimatePresence>
            {sessionActive ? (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Button variant="outline" size="sm" onClick={handleBackToLanding}>
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Back
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <Link
            href="/"
            className="truncate text-xl font-bold tracking-tight text-ink-950 sm:text-2xl"
            aria-label="TalentDrobe home"
          >
            TalentDrobe
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {sessionActive && (resumeReady || profileBuilt) ? (
            <Button
              variant="lime"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={handleCreateNewProfile}
            >
              <Sparkles className="h-4 w-4" />
              Create new profile
            </Button>
          ) : null}
          <Button
            variant="secondary"
            size="md"
            href="/sign-up?intent=hire"
            asChild
            className="mr-1 rounded-lg border-ink-900/15 sm:mr-2"
          >
            Here to Hire
          </Button>
          <Button variant="outline" size="sm" href="/sign-up" asChild>
            Sign up
          </Button>
          <Button variant="lime" size="sm" href="/sign-in" asChild>
            Log in
          </Button>
        </div>
      </header>

      <main className="relative bg-paper-50">
        {sessionActive ? (
          <section className="relative min-h-svh">
            <div className="sticky top-0 relative flex h-svh flex-col px-4 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24">
              <div
                className={cn(
                  "relative z-[2] h-full min-h-0 w-full",
                  chatEngaged && !chatMinimized
                    ? "grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-6 lg:grid-cols-2 lg:grid-rows-1 lg:gap-8 lg:px-2"
                    : chatEngaged
                      ? "flex flex-1 flex-col"
                      : "mx-auto grid h-full min-h-0 w-full max-w-[52rem] grid-cols-1 items-center gap-8 lg:max-w-[94rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8 xl:max-w-[96rem] xl:gap-10",
                )}
              >
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={cn(
                    "flex min-h-0 flex-col overflow-hidden lg:py-2",
                    chatMinimized ? "min-h-0 flex-1" : "min-h-0",
                  )}
                >
                  <Guest1ResumePanel
                    ref={resumePanelRef}
                    className="h-full min-h-[10rem] lg:min-h-0"
                    onReadyChange={setResumeReady}
                    onProfileComplete={() => {
                      setProfileBuilt(true);
                      setProfileCompleteSignal((prev) => ({
                        key: (prev?.key ?? 0) + 1,
                      }));
                    }}
                    onUploaded={(fileName) => {
                      setSessionActive(true);
                      setUploadSignal((prev) => ({
                        key: (prev?.key ?? 0) + 1,
                        fileName,
                      }));
                    }}
                  />
                </motion.div>

                <motion.div
                  layout={!prefersReducedMotion}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={cn(
                    chatEngaged && !chatMinimized
                      ? "flex h-full min-h-0 flex-col overflow-hidden lg:py-2"
                      : chatEngaged
                        ? "hidden"
                        : "flex min-h-0 w-full min-w-0 flex-col justify-center text-center lg:text-left",
                  )}
                >
                  <Guest1Chat
                    fillHeight={chatEngaged && !chatMinimized}
                    minimized={chatMinimized}
                    notice={uploadSignal}
                    profileComplete={profileCompleteSignal}
                    resetKey={chatResetKey}
                    onEngagedChange={(engaged) => {
                      setChatEngaged(engaged);
                      if (engaged) {
                        setSessionActive(true);
                        setChatMinimized(false);
                      }
                    }}
                    onMinimizedChange={setChatMinimized}
                    className="h-full min-h-0 flex-1"
                  />
                </motion.div>

                <AnimatePresence>
                  {chatEngaged && chatMinimized ? (
                    <Guest1FloatingTab
                      side="right"
                      label="Career copilot"
                      sublabel="Tap to expand"
                      icon={<Bot className="h-4 w-4" aria-hidden />}
                      onClick={() => setChatMinimized(false)}
                    />
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </section>
        ) : landingScrollEnabled ? (
          <section ref={sectionRef} className="relative">
            <div ref={pinRef} className="relative h-svh overflow-hidden">
              <div
                ref={trackRef}
                className="flex h-full transform-gpu backface-hidden"
                aria-live="polite"
              >
                <div
                  id="guest1-panel-start"
                  className="flex h-full w-screen shrink-0 flex-col px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24"
                  role="tabpanel"
                  aria-label="Start"
                >
                  <div className="mx-auto grid h-full min-h-0 w-full max-w-[52rem] grid-cols-1 items-center gap-8 lg:max-w-[94rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8 xl:max-w-[96rem] xl:gap-10">
                    {landingHeroGrid}
                  </div>
                </div>

                <div
                  id="guest1-panel-how-it-works"
                  className="flex h-full w-screen shrink-0 flex-col px-3 pb-14 pt-[4.25rem] sm:px-5 sm:pb-16 sm:pt-[4.75rem] lg:px-8"
                  role="tabpanel"
                  aria-label="How it works"
                >
                  <div className="mx-auto flex h-full w-full max-w-[94rem] flex-col justify-center pb-24 sm:pb-28 xl:max-w-[96rem]">
                    <Guest1FeaturesBlock
                      large
                      className="w-full"
                      onBackToStart={() => goToHorizontalPanel(0)}
                    />
                  </div>
                </div>
              </div>

              <Guest1HorizontalRail
                activePanel={horizontalPanel}
                progressFillRef={progressFillRef}
                onPanelSelect={goToHorizontalPanel}
                showHint={horizontalPanel === 0}
              />
            </div>
          </section>
        ) : (
          <section className="relative min-h-svh">
            <div className="flex min-h-svh flex-col px-4 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24">
              <div className="mx-auto grid h-full min-h-0 w-full max-w-[52rem] grid-cols-1 items-center gap-8 lg:max-w-[94rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8 xl:max-w-[96rem] xl:gap-10">
                {landingHeroGrid}
              </div>
            </div>
          </section>
        )}

        {prefersReducedMotion && !sessionActive ? (
          <section
            className="relative border-t border-ink-900/6 bg-paper-50 px-4 py-8 sm:px-6 sm:py-10"
            aria-label="How it works"
          >
            <Guest1FeaturesBlock
              large
              className="mx-auto w-full max-w-[94rem] xl:max-w-[96rem]"
              onBackToStart={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
            />
          </section>
        ) : null}

        {!sessionActive ? (
          <section
            className="relative border-t border-ink-900/6 bg-paper-50 px-4 py-10 sm:px-6 sm:py-14"
            aria-label="What you get"
          >
            <Guest1WhatYouGetBlock className="mx-auto w-full max-w-[94rem] xl:max-w-[96rem]" />
          </section>
        ) : null}

        {!sessionActive ? (
          <section
            className="relative border-t border-ink-900/6 bg-paper-50 px-4 py-12 sm:px-6 sm:py-16"
            aria-label="Explore TalentDrobe"
          >
            <Guest1Metro className="mx-auto w-full max-w-[94rem] xl:max-w-[96rem]" />
          </section>
        ) : null}

        <section
          className={cn(
            "relative border-t border-ink-900/6 bg-paper-50 px-4 py-10 sm:px-6 sm:py-14",
            sessionActive && "pointer-events-none invisible h-0 overflow-hidden border-0 py-0",
          )}
          aria-label="HR World RSS feed"
        >
          <div className="mx-auto w-full max-w-[94rem] xl:max-w-[96rem]">
            <Guest1RssCarousel />
          </div>
        </section>
      </main>
    </>
  );
}
