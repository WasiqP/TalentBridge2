"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { GuestHeroLivingStory } from "@/components/guest/guest-hero-living-story";
import { Magnetic } from "@/components/motion/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import { Container } from "@/components/ui/container";
import { guestHeroCopy, guestHeroStats } from "@/constants/guest-hero";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function GuestHero({ pinned = false }: { pinned?: boolean }) {
  return (
    <section
      className={cn(
        "relative bg-paper-50 pt-3 sm:pt-4",
        pinned && "flex h-full min-h-0 flex-col",
      )}
    >
      <Container
        size="full"
        className={cn(pinned && "flex min-h-0 flex-1 flex-col")}
      >
        <div
          className={cn(
            "relative isolate overflow-hidden rounded-[28px] bg-ink-950 text-paper-50 sm:rounded-[40px]",
            pinned && "flex min-h-0 flex-1 flex-col justify-center",
          )}
        >
          <div className="absolute inset-0 -z-10 gradient-mesh" aria-hidden />
          <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
          <div
            className="absolute inset-0 -z-10 bg-noise opacity-[0.07] mix-blend-overlay"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute left-[-5%] top-[-15%] -z-10 h-[480px] w-[480px] rounded-full bg-accent-lime/22 blur-[140px]"
          />
          <div
            aria-hidden
            className="absolute bottom-[-15%] right-[-8%] -z-10 h-[440px] w-[440px] rounded-full bg-accent-violet/28 blur-[130px]"
          />

          {/* Side-by-side: copy + living product story (visible above the fold) */}
          <div className="relative grid items-start gap-6 px-5 pb-10 pt-6 sm:gap-7 sm:px-8 sm:pb-11 sm:pt-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 lg:px-12 lg:pb-12 lg:pt-8 xl:px-14">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/[0.04] px-3 py-1.5 text-[12px] font-medium text-paper-100/85 backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent-lime" />
                {guestHeroCopy.eyebrow}
              </motion.div>

              <h1 className="mt-3 text-balance text-[clamp(2.35rem,5.8vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.035em] sm:mt-4">
                <TextReveal text={guestHeroCopy.titleLine1} className="block" />
                <span className="block">
                  <TextReveal text={guestHeroCopy.titleLine2} />{" "}
                  <span className="font-serif italic text-gradient-brand">
                    <TextReveal text={guestHeroCopy.titleAccent} delay={0.15} />
                  </span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="mt-3 max-w-lg text-pretty text-[15px] leading-relaxed text-paper-100/68 sm:mt-4 sm:text-[16px]"
              >
                {guestHeroCopy.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.52, ease: EASE }}
                className="mt-5 flex flex-wrap items-center gap-2"
              >
                <Magnetic>
                  <a
                    href={guestHeroCopy.primaryHref}
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent-lime px-5 text-[14px] font-medium text-ink-950 transition hover:bg-accent-lime-dark hover:shadow-glow-lime sm:h-12 sm:px-6 sm:text-[15px]"
                  >
                    {guestHeroCopy.primaryCta}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                  </a>
                </Magnetic>
                <a
                  href={guestHeroCopy.secondaryHref}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/[0.04] px-4 text-[14px] font-medium text-paper-50 backdrop-blur transition hover:bg-paper-50/[0.08] sm:h-12 sm:px-5 sm:text-[15px]"
                >
                  {guestHeroCopy.secondaryCta}
                </a>
              </motion.div>

              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {guestHeroStats.map((stat) => (
                  <li
                    key={stat.label}
                    className="rounded-2xl border border-paper-50/10 bg-paper-50/[0.03] px-3 py-2 backdrop-blur-sm"
                  >
                    <p className="text-[17px] font-semibold tracking-tight text-paper-50">
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-paper-100/50">{stat.label}</p>
                  </li>
                ))}
              </motion.ul>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.72 }}
                className="mt-3 text-[12px] text-paper-100/42"
              >
                {guestHeroCopy.footnote}
              </motion.p>
            </div>

            <GuestHeroLivingStory />
          </div>
        </div>
      </Container>
    </section>
  );
}
