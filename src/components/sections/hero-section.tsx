"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Play, Sparkles, Star } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import { Counter } from "@/components/motion/counter";
import { Container } from "@/components/ui/container";
import { heroStats } from "@/constants/stats";
import { customerLogos } from "@/constants/customers";

export function HeroSection() {
  return (
    <section className="relative bg-paper-50 pt-4 sm:pt-6">
      <Container size="full">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-ink-950 text-paper-50 sm:rounded-[36px]">
          <div className="absolute inset-0 -z-10 gradient-mesh" aria-hidden />
          <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
          <div
            className="absolute inset-0 -z-10 bg-noise opacity-[0.06] mix-blend-overlay"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-[-30%] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent-lime/20 blur-[140px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 right-[-10%] -z-10 h-[440px] w-[440px] rounded-full bg-accent-violet/25 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 left-[-10%] -z-10 h-[380px] w-[380px] rounded-full bg-accent-cyan/15 blur-[120px]"
          />

          <div className="relative px-5 pb-12 pt-12 sm:px-10 sm:pb-16 sm:pt-16 lg:px-16 lg:pb-20 lg:pt-24">
            <div className="mx-auto max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center justify-center gap-2"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/[0.04] px-3 py-1.5 text-[12px] font-medium text-paper-100/85 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5 text-accent-lime" />
                  Multi-agent recruiting · v3.4
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-paper-50/30 sm:inline-block" />
                <span className="hidden items-center gap-1.5 text-[12px] text-paper-100/65 sm:inline-flex">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-accent-lime text-accent-lime" />
                    ))}
                  </span>
                  4.9 on G2 · 600+ teams
                </span>
              </motion.div>

              <h1 className="mt-7 text-balance text-[clamp(2.75rem,7.4vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.035em] sm:mt-9">
                <TextReveal text="Hire 10x faster." className="block" />
                <span className="block">
                  <TextReveal text="With ten times" />{" "}
                  <span className="font-serif italic text-gradient-brand">
                    <TextReveal text="the signal." delay={0.15} />
                  </span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-paper-100/70 sm:mt-7 sm:text-lg"
              >
                The AI copilot for recruiters. Autonomous sourcing, explainable
                ranking, and personalized outreach — all sitting on top of the
                ATS you already use.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 flex flex-wrap items-center justify-center gap-2.5 sm:mt-10"
              >
                <Magnetic>
                  <a
                    href="/contact"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent-lime px-6 text-[15px] font-medium text-ink-950 transition hover:bg-accent-lime-dark hover:shadow-glow-lime"
                  >
                    Book a demo
                    <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                  </a>
                </Magnetic>
                <a
                  href="/features"
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/[0.04] px-5 text-[15px] font-medium text-paper-50 backdrop-blur transition hover:bg-paper-50/[0.08]"
                >
                  <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-paper-50/10">
                    <Play className="h-2.5 w-2.5 fill-paper-50 text-paper-50" />
                  </span>
                  Watch 2-min tour
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 text-[12px] text-paper-100/45"
              >
                14-day trial · No credit card · Live in 30 minutes
              </motion.p>

              <motion.dl
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-paper-50/8 rounded-2xl border border-paper-50/10 bg-paper-50/[0.03] backdrop-blur sm:mt-14"
              >
                {heroStats.map((s) => (
                  <div key={s.label} className="px-4 py-4 text-center">
                    <dt className="font-serif text-[28px] italic leading-none text-paper-50 sm:text-[32px]">
                      <Counter
                        to={s.value}
                        suffix={s.suffix}
                        decimals={s.decimals ?? 0}
                      />
                    </dt>
                    <dd className="mt-2 text-[10px] uppercase tracking-[0.16em] text-paper-100/55 sm:text-[11px]">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            <HeroProductPreview />
          </div>

          <HeroBottomLogos />
        </div>
      </Container>
    </section>
  );
}

function HeroBottomLogos() {
  const logos = customerLogos.slice(0, 7);
  return (
    <div className="relative border-t border-paper-50/8 bg-paper-50/[0.02] backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-3 px-6 py-5 sm:px-12">
        <p className="text-[11px] uppercase tracking-[0.18em] text-paper-100/45">
          Trusted by recruiting teams at
        </p>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-x-7 gap-y-2 sm:gap-x-10">
          {logos.map((name) => (
            <span
              key={name}
              className="font-serif text-[18px] italic leading-none text-paper-100/65 sm:text-[20px]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroProductPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-16 max-w-5xl sm:mt-20"
    >
      <div className="relative rounded-3xl border border-paper-50/10 bg-paper-50/[0.03] p-2 shadow-2xl shadow-ink-950/40 backdrop-blur-xl">
        <div className="rounded-[20px] border border-paper-50/8 bg-ink-900/80">
          <div className="flex items-center gap-2 border-b border-paper-50/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-paper-50/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-paper-50/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-paper-50/20" />
            <span className="ml-3 hidden rounded-md bg-paper-50/5 px-2 py-0.5 font-mono text-[11px] text-paper-100/50 sm:inline-block">
              talentbridge.app/pipeline/senior-platform-engineer
            </span>
          </div>
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-4 hidden border-r border-paper-50/8 p-4 sm:block lg:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.15em] text-paper-100/40">
                Roles
              </p>
              <ul className="mt-4 space-y-1.5 text-[13px]">
                {[
                  "Senior Platform Engineer",
                  "Staff ML Researcher",
                  "Design Engineer",
                  "Sales Engineer",
                  "Product Designer",
                ].map((r, i) => (
                  <li
                    key={r}
                    className={
                      i === 0
                        ? "rounded-lg bg-accent-lime/15 px-2.5 py-1.5 text-accent-lime"
                        : "rounded-lg px-2.5 py-1.5 text-paper-100/65 hover:bg-paper-50/5"
                    }
                  >
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-paper-50/8 p-3">
                <p className="text-[11px] uppercase tracking-[0.15em] text-paper-100/40">
                  Agents
                </p>
                <div className="mt-2 space-y-1.5 text-[12px] text-paper-100/70">
                  <p className="flex items-center gap-2">
                    <span className="relative h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-lime/60" />
                      <span className="absolute inset-0 rounded-full bg-accent-lime" />
                    </span>
                    Sourcer · LinkedIn
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="relative h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-cyan/60" />
                      <span className="absolute inset-0 rounded-full bg-accent-cyan" />
                    </span>
                    Screener · GitHub
                  </p>
                  <p className="flex items-center gap-2 text-paper-100/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-paper-100/20" />
                    Outreach · idle
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12 p-5 sm:col-span-8 lg:col-span-9">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-paper-100/40">
                    Today&apos;s shortlist
                  </p>
                  <p className="mt-1 font-serif text-[24px] italic leading-none text-paper-50 sm:text-[28px]">
                    18 high-signal candidates
                  </p>
                </div>
                <span className="rounded-full border border-accent-lime/30 bg-accent-lime/10 px-3 py-1 text-[11px] text-accent-lime sm:text-xs">
                  +6 since 9:00 AM
                </span>
              </div>
              <div className="mt-5 space-y-2">
                {[
                  { name: "Devon Ainsley", score: 96, signal: "OSS · Rust · Distributed systems" },
                  { name: "Mei Tanaka", score: 93, signal: "Ex-Stripe · Edge infra · QCon speaker" },
                  { name: "Aisha Khan", score: 91, signal: "K8s operator OSS · 4 YoE platform" },
                  { name: "Lukas Berger", score: 88, signal: "Backend lead · Series B · NYC" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between rounded-xl border border-paper-50/8 bg-paper-50/[0.02] px-3 py-3 sm:px-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-lime via-accent-cyan to-accent-violet text-xs font-medium text-ink-950"
                        aria-hidden
                      >
                        {c.name
                          .split(" ")
                          .map((p) => p[0])
                          .join("")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-paper-50">
                          {c.name}
                        </p>
                        <p className="truncate text-[12px] text-paper-100/55">
                          {c.signal}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono text-[13px] text-paper-50">
                        {c.score}
                      </span>
                      <span className="hidden rounded-md bg-paper-50/5 px-2 py-1 text-[11px] text-paper-100/60 sm:inline-block">
                        explain →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
