"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Guest1Chat } from "@/components/guest-pages/guest-1-chat";
import { Guest1Bento } from "@/components/guest-pages/guest-1-bento";
import { Guest1ResumePanel } from "@/components/guest-pages/guest-1-resume-panel";
import { Button } from "@/components/ui/button";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Design option 1 — conversation-first landing at `/guest-1`. */
export function Guest1Page() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const [chatEngaged, setChatEngaged] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;
    const bento = bentoRef.current;
    if (!section || !hero || !bento) return;

    const { gsap, ScrollTrigger } = registerGsap();

    const ctx = gsap.context(() => {
      gsap.set(hero, { autoAlpha: 1 });
      gsap.set(bento, { autoAlpha: 0 });

      if (prefersReducedMotion) {
        return;
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=50%",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(
          hero,
          { autoAlpha: 1 },
          { autoAlpha: 0, ease: "power2.inOut", duration: 1 },
          0,
        )
        .fromTo(
          bento,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "power2.inOut", duration: 1 },
          0,
        );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 sm:p-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-ink-950 sm:text-2xl"
          aria-label="TalentDrobe home"
        >
          TalentDrobe
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" href="/sign-up" asChild>
            Sign up
          </Button>
          <Button variant="lime" size="sm" href="/sign-in" asChild>
            Log in
          </Button>
        </div>
      </header>

      <main className="relative bg-paper-50">
        <section ref={sectionRef} className="relative min-h-[145vh]">
          <div className="sticky top-0 relative flex h-svh flex-col px-4 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24">
            <div
              ref={heroRef}
              className={cn(
                "relative z-[2] h-full min-h-0 w-full",
                chatEngaged && !chatMinimized
                  ? "grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 lg:px-2"
                  : chatEngaged
                    ? "flex flex-1 flex-col"
                    : "flex flex-1 items-center justify-center",
              )}
            >
              {chatEngaged ? (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={cn(
                    "flex min-h-[10rem] flex-col justify-center lg:min-h-0 lg:py-2",
                    chatMinimized && "flex-1",
                  )}
                >
                  <Guest1ResumePanel className="h-full min-h-[10rem] lg:min-h-0" />
                </motion.div>
              ) : null}

              <motion.div
                layout={!prefersReducedMotion}
                transition={{ duration: 0.45, ease: EASE }}
                className={cn(
                  chatEngaged && !chatMinimized
                    ? "flex min-h-0 flex-col justify-center lg:py-2"
                    : chatEngaged && chatMinimized
                      ? "pointer-events-none fixed inset-x-4 bottom-6 z-20 flex justify-end sm:inset-x-6 sm:bottom-8"
                      : "w-full max-w-xl text-center lg:max-w-2xl",
                )}
              >
                {!chatEngaged ? (
                  <>
                    <h1 className="text-balance text-[clamp(2.5rem,7vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink-950">
                      Hey There!
                    </h1>
                    <p className="mx-auto mt-5 max-w-lg text-pretty text-[16px] leading-relaxed text-ink-500 sm:text-[17px]">
                      Tell us what you&apos;re looking for — a new role, a career shift, or
                      help polishing your profile. Start with a message below and we&apos;ll
                      take it from there.
                    </p>
                  </>
                ) : null}

                <Guest1Chat
                  fillHeight={chatEngaged && !chatMinimized}
                  minimized={chatMinimized}
                  onEngagedChange={(engaged) => {
                    setChatEngaged(engaged);
                    if (engaged) setChatMinimized(false);
                  }}
                  onMinimizedChange={setChatMinimized}
                  className={cn(
                    chatEngaged && !chatMinimized && "min-h-[18rem] flex-1",
                    chatEngaged && chatMinimized && "pointer-events-auto w-full max-w-md",
                    !chatEngaged && "mt-10 sm:mt-12",
                  )}
                />
              </motion.div>
            </div>

            <Guest1Bento
              ref={bentoRef}
              className="absolute left-1/2 top-1/2 z-[1] w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 px-2 sm:max-w-7xl lg:max-w-[88rem] sm:px-4"
            />
          </div>
        </section>
      </main>
    </>
  );
}
