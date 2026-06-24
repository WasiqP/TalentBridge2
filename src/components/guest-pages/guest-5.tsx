"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";

import { Guest5Chat } from "@/components/guest-pages/guest-5-chat";
import { Guest5MetroGrid } from "@/components/guest-pages/guest-5-metro-grid";
import { DashboardChatInput } from "@/components/dashboard/dashboard-chat-input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Design option 5 — TalentDrobe hero, chat bar, and metro grid at `/guest-5`. */
export function Guest5Page() {
  const prefersReducedMotion = useReducedMotion();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatSeed, setChatSeed] = useState<string | undefined>();
  const [chatFileSeed, setChatFileSeed] = useState<string | undefined>();

  const openChat = useCallback((opts?: { message?: string; fileName?: string }) => {
    setChatSeed(opts?.message);
    setChatFileSeed(opts?.fileName);
    setChatOpen(true);
  }, []);

  const handleLandingEngage = useCallback(() => {
    openChat();
  }, [openChat]);

  const handleLandingSend = useCallback(
    (message: string) => {
      const trimmed = message.trim();
      if (trimmed) {
        openChat({ message: trimmed });
      } else {
        openChat();
      }
    },
    [openChat],
  );

  const handleLandingFile = useCallback(
    (file: File) => {
      openChat({ fileName: file.name });
    },
    [openChat],
  );

  const handleBackFromChat = useCallback(() => {
    setChatOpen(false);
    setChatSeed(undefined);
    setChatFileSeed(undefined);
  }, []);

  return (
    <div className="min-h-svh overflow-x-hidden bg-paper-50 text-ink-950">
      <header className="border-b border-ink-900/6 bg-paper-50">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" href="/sign-up" asChild>
              Sign up
            </Button>
            <Button variant="lime" size="sm" href="/sign-in" asChild>
              Sign in
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pt-16">
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <Guest5Chat
              key="chat"
              seedMessage={chatSeed}
              seedFileName={chatFileSeed}
              onBack={handleBackFromChat}
            />
          ) : (
            <motion.div
              key="landing"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* Hero — large heading + chat trigger */}
              <div className="mx-auto max-w-3xl text-center">
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: EASE }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/8 bg-white px-3 py-1 text-[11px] font-medium text-ink-600">
                    <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
                    AI career copilot
                  </span>

                  <h1
                    className="mt-5 text-[clamp(3rem,9vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink-950 sm:mt-6"
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Talent<span className="text-accent-lime-dark">Drobe</span>
                  </h1>

                  <p className="mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-ink-500 sm:mt-5 sm:text-[16px]">
                    Upload your résumé, ask anything, or explore below — your next role starts here.
                  </p>
                </motion.div>

                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
                  className="mx-auto mt-8 max-w-2xl sm:mt-10"
                >
                  <div className="overflow-hidden rounded-[1.75rem] border border-ink-900/10 bg-white p-1">
                    <DashboardChatInput
                      variant="inline"
                      showAttach
                      showDisclaimer={false}
                      placeholder="Ask about roles, salary, or drop your résumé…"
                      onEngage={handleLandingEngage}
                      onSend={handleLandingSend}
                      onFileSelect={handleLandingFile}
                      className="[&_form>div]:border-ink-900/8 [&_form>div]:bg-paper-50 [&_form>div]:shadow-none"
                    />
                  </div>
                  <p className="mt-3 text-[11px] text-ink-400">
                    Tap to chat · Attach PDF or Word · AI can make mistakes
                  </p>
                </motion.div>
              </div>

              {/* Metro grid */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
                className="mt-14 sm:mt-16 lg:mt-20"
              >
                <Guest5MetroGrid />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
