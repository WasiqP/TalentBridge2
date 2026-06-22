"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bot, ChevronLeft, Sparkles } from "lucide-react";

import { Guest1Chat } from "@/components/guest-pages/guest-1-chat";
import { Guest1CircuitFlow } from "@/components/guest-pages/guest-1-circuit-flow";
import { Guest1Bento } from "@/components/guest-pages/guest-1-bento";
import { Guest1FloatingTab } from "@/components/guest-pages/guest-1-floating-tab";
import { Guest1RssCarousel } from "@/components/guest-pages/guest-1-rss-carousel";
import {
  Guest1ResumePanel,
  type Guest1ResumePanelHandle,
} from "@/components/guest-pages/guest-1-resume-panel";
import { Button } from "@/components/ui/button";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Design option 1 — conversation-first landing at `/guest-1`. */
export function Guest1Page() {
  const resumePanelRef = useRef<Guest1ResumePanelHandle>(null);
  const [chatEngaged, setChatEngaged] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [resumeReady, setResumeReady] = useState(false);
  const [profileBuilt, setProfileBuilt] = useState(false);
  const [uploadSignal, setUploadSignal] = useState<{ key: number; fileName: string }>();
  const [profileCompleteSignal, setProfileCompleteSignal] = useState<{ key: number }>();
  const [chatResetKey, setChatResetKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();

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
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => registerGsap().ScrollTrigger.refresh());
  }

  useEffect(() => {
    if (!sessionActive) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const { ScrollTrigger } = registerGsap();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [sessionActive]);

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
          <Button variant="outline" size="sm" href="/sign-up" asChild>
            Sign up
          </Button>
          <Button variant="lime" size="sm" href="/sign-in" asChild>
            Log in
          </Button>
        </div>
      </header>

      <main className="relative bg-paper-50">
        <section className="relative min-h-svh">
          <div className="sticky top-0 relative flex h-svh flex-col px-4 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24">
            <div
              className={cn(
                "relative z-[2] h-full min-h-0 w-full",
                chatEngaged && !chatMinimized
                  ? "grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-6 lg:grid-cols-2 lg:grid-rows-1 lg:gap-8 lg:px-2"
                  : chatEngaged
                    ? "flex flex-1 flex-col"
                    : "mx-auto grid h-full min-h-0 w-full max-w-[48rem] grid-cols-1 items-center gap-8 lg:max-w-[76rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,24rem)] lg:gap-6 xl:max-w-[84rem] xl:grid-cols-[minmax(0,1.15fr)_minmax(0,26rem)] xl:gap-8",
              )}
            >
              {sessionActive ? (
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
              ) : null}

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
                {!chatEngaged ? (
                  <>
                    <h1 className="text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink-950 xl:text-[clamp(2.5rem,4vw,3.75rem)]">
                      Hey There!
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-500 sm:mt-5 sm:text-[16px] lg:mx-0 lg:max-w-2xl xl:text-[17px]">
                      Tell us what you&apos;re looking for — a new role, a career shift, or
                      help polishing your profile. Start with a message below and we&apos;ll
                      take it from there.
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
                  </>
                ) : (
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
                )}
              </motion.div>

              {!chatEngaged ? (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex min-h-0 items-center justify-center lg:items-start lg:justify-start"
                >
                  <Guest1CircuitFlow
                    onDropClick={handleStartDropSession}
                    className="w-full"
                  />
                </motion.div>
              ) : null}

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

        <section
          className={cn(
            "relative border-t border-ink-900/6 bg-paper-50 px-4 py-8 sm:px-6 sm:py-10",
            sessionActive && "pointer-events-none invisible h-0 overflow-hidden border-0 py-0",
          )}
          aria-label="Platform features"
        >
          <div className="mx-auto w-full max-w-6xl sm:max-w-7xl lg:max-w-[88rem]">
            <div className="mb-6 sm:mb-8">
              <h2
                className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink-950"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Features
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-500 sm:mt-4 sm:text-[16px] lg:max-w-3xl">
                Drop your résumé, build a living profile, and find roles that fit — with a copilot
                that guides you from upload to offer-ready polish.
              </p>
            </div>
            <Guest1Bento />
          </div>
        </section>

        <section
          className={cn(
            "relative border-t border-ink-900/6 bg-paper-50 px-4 py-8 sm:px-6 sm:py-10",
            sessionActive && "pointer-events-none invisible h-0 overflow-hidden border-0 py-0",
          )}
          aria-label="HR World RSS feed"
        >
          <div className="mx-auto w-full max-w-6xl sm:max-w-7xl lg:max-w-[88rem]">
            <Guest1RssCarousel />
          </div>
        </section>
      </main>
    </>
  );
}
