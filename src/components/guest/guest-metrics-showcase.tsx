"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, MousePointerClick, Sparkles, TrendingUp, Zap } from "lucide-react";

import { Counter } from "@/components/motion/counter";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { seekerMetrics } from "@/constants/guest-page";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const [featuredMetric, ...supportMetrics] = seekerMetrics;
const [matchMetric, interviewMetric] = supportMetrics;
const applyMetric = supportMetrics[2];

function MetricBar({ progress, delay = 0 }: { progress: number; delay?: number }) {
  return (
    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-paper-50/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-violet"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        style={{ width: `${progress}%`, transformOrigin: "left" }}
      />
    </div>
  );
}

/** Asymmetric impact board — hero stat + supporting metrics in a dark bento layout. */
export function GuestMetricsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const panelY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  useEffect(() => {
    const { gsap } = registerGsap();
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
      <div className="absolute inset-0 bg-grid-light opacity-20" aria-hidden />

      <Container size="full" className="relative py-20 sm:py-24 lg:py-28">
        <motion.div style={{ y: panelY }}>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-ink-950 text-paper-50 shadow-[0_40px_120px_-48px_rgba(8,8,12,0.55)] sm:rounded-[36px]">
            <div className="absolute inset-0 gradient-mesh opacity-50" aria-hidden />
            <div className="absolute inset-0 bg-grid opacity-35" aria-hidden />
            <div
              ref={blobARef}
              aria-hidden
              className="absolute -left-20 top-[-10%] h-72 w-72 rounded-full bg-accent-lime/20 blur-[110px]"
            />
            <div
              ref={blobBRef}
              aria-hidden
              className="absolute -right-16 bottom-[-15%] h-80 w-80 rounded-full bg-accent-violet/18 blur-[120px]"
            />

            <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:p-10 xl:p-12">
              {/* Copy column */}
              <FadeUp className="flex flex-col justify-between gap-8">
                <div className="max-w-md">
                  <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/12 bg-paper-50/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-100/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                    Real outcomes
                  </span>
                  <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.06] tracking-[-0.03em] text-paper-50">
                    Less guesswork.{" "}
                    <span className="font-serif italic text-gradient-brand">
                      More momentum.
                    </span>
                  </h2>
                  <p className="mt-4 text-pretty text-[15px] leading-relaxed text-paper-100/62">
                    What job seekers report in their first week — measured against
                    the old apply-and-pray grind, not a recruiter slide deck.
                  </p>
                </div>

                <div className="rounded-[22px] border border-paper-50/10 bg-paper-50/[0.03] p-5 backdrop-blur sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-lime/15 text-accent-lime">
                      <TrendingUp className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[14px] font-medium text-paper-50">
                        Compared to manual applying
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-paper-100/55">
                        Same candidate, same market — but ranked roles, tailored
                        applications, and fewer dead ends.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Metrics bento */}
              <div className="grid gap-4 sm:gap-5">
                <motion.article
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="relative overflow-hidden rounded-[24px] border border-accent-lime/25 bg-gradient-to-br from-accent-lime/12 via-paper-50/[0.04] to-accent-cyan/8 p-6 sm:p-7"
                >
                  <div
                    aria-hidden
                    className="absolute right-[-8%] top-[-20%] h-40 w-40 rounded-full bg-accent-lime/25 blur-[70px]"
                  />
                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-paper-100/50">
                        Headline stat
                      </p>
                      <div className="mt-2 font-serif text-[clamp(3.5rem,8vw,5rem)] italic leading-none tracking-tight text-paper-50">
                        <Counter
                          to={featuredMetric.value}
                          suffix={featuredMetric.suffix}
                          duration={2}
                        />
                      </div>
                      <p className="mt-3 text-[16px] font-medium text-paper-50">
                        {featuredMetric.label}
                      </p>
                      <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-paper-100/58">
                        {featuredMetric.description}
                      </p>
                    </div>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-paper-50/10 bg-paper-50/[0.05] text-accent-lime">
                      <Zap className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <MetricBar progress={100} delay={0.1} />
                </motion.article>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {[matchMetric, interviewMetric].map((metric, i) => (
                    <motion.article
                      key={metric.label}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{ duration: 0.65, delay: 0.08 + i * 0.08, ease: EASE }}
                      className="rounded-[22px] border border-paper-50/10 bg-paper-50/[0.03] p-5 backdrop-blur sm:p-6"
                    >
                      <div className="font-serif text-[clamp(2.5rem,5vw,3.25rem)] italic leading-none tracking-tight text-paper-50">
                        <Counter
                          to={metric.value}
                          suffix={metric.suffix}
                          duration={1.8}
                        />
                      </div>
                      <p className="mt-3 text-[14px] font-medium text-paper-50">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-paper-100/55">
                        {metric.description}
                      </p>
                      <MetricBar progress={i === 0 ? 82 : 68} delay={0.2 + i * 0.1} />
                    </motion.article>
                  ))}
                </div>

                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
                  className="flex flex-col gap-4 rounded-[22px] border border-paper-50/10 bg-paper-50/[0.03] p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-violet/15 text-accent-violet">
                      <MousePointerClick className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-[2.5rem] italic leading-none text-paper-50">
                          <Counter to={applyMetric.value} duration={1.4} />
                        </span>
                        <span className="text-[14px] font-medium text-paper-100/70">
                          {applyMetric.label}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] leading-relaxed text-paper-100/55">
                        {applyMetric.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 self-start rounded-full border border-accent-lime/30 bg-accent-lime/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-lime sm:self-center",
                    )}
                  >
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    Agent handles the rest
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </motion.article>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
