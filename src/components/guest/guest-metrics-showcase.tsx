"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Counter } from "@/components/motion/counter";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { stats } from "@/constants/stats";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const cardAccents = [
  "from-accent-lime/20 via-accent-lime/5 to-transparent",
  "from-accent-cyan/20 via-accent-cyan/5 to-transparent",
  "from-accent-violet/20 via-accent-violet/5 to-transparent",
  "from-accent-lime/15 via-accent-cyan/5 to-transparent",
] as const;

/** Immersive metrics — counters animate in on scroll with glow and parallax. */
export function GuestMetricsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [32, -24]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [48, -32]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const section = sectionRef.current;
    const blobA = blobARef.current;
    const blobB = blobBRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (blobA) {
        gsap.to(blobA, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
      if (blobB) {
        gsap.to(blobB, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-6 overflow-hidden rounded-t-[32px] bg-paper-50 sm:rounded-t-[40px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(193,249,104,0.12),transparent)]"
      />
      <div
        ref={blobARef}
        aria-hidden
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-accent-lime/18 blur-[100px]"
      />
      <div
        ref={blobBRef}
        aria-hidden
        className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-accent-violet/14 blur-[110px]"
      />
      <div className="absolute inset-0 bg-grid-light opacity-25" aria-hidden />

      <Container size="full" className="relative py-24 sm:py-28 lg:py-32">
        <motion.div style={{ y: headingY }}>
          <FadeUp>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-paper-100/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-600 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                The numbers
              </span>
              <h2 className="mt-5 text-balance text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink-950">
                Recruiters love this part.{" "}
                <span className="font-serif italic text-ink-700">
                  CFOs love it more.
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-500">
                What teams report after 90 days on TalentDrobe — measured against
                their own pre-launch baseline.
              </p>
            </div>
          </FadeUp>
        </motion.div>

        <motion.div
          style={{ y: cardsY }}
          className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {stats.map((s, i) => (
            <motion.article
              key={s.label}
              initial={{ opacity: 0, y: 56, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px -5% 0px" }}
              transition={{
                duration: 0.75,
                delay: i * 0.1,
                ease: EASE,
              }}
              className="group relative"
            >
              <div
                aria-hidden
                className={cn(
                  "absolute -inset-px rounded-3xl bg-gradient-to-br opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100",
                  cardAccents[i % cardAccents.length],
                )}
              />
              <div className="relative overflow-hidden rounded-3xl border border-ink-900/8 bg-paper-50/90 p-7 shadow-[0_20px_60px_-40px_rgba(8,8,12,0.18)] backdrop-blur-sm transition duration-500 group-hover:-translate-y-1 group-hover:border-accent-lime/25 group-hover:shadow-[0_28px_80px_-36px_rgba(193,249,104,0.22)]">
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
                    cardAccents[i % cardAccents.length],
                  )}
                />
                <div className="relative">
                  <div className="font-serif text-[clamp(2.75rem,5vw,3.5rem)] italic leading-none tracking-tight text-ink-950">
                    <Counter
                      to={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                      duration={2.2}
                    />
                  </div>
                  <motion.div
                    className="mt-3 h-0.5 origin-left rounded-full bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-violet"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: EASE }}
                  />
                  <p className="mt-4 text-[15px] font-medium text-ink-950">
                    {s.label}
                  </p>
                  {s.description && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">
                      {s.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
