"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BadgeCheck, MapPin, Sparkles, TrendingUp } from "lucide-react";

import { Counter } from "@/components/motion/counter";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const skills = [
  "Product design",
  "Design systems",
  "Figma",
  "Prototyping",
  "User research",
  "React",
  "Accessibility",
  "Design ops",
];

const experience = [
  { role: "Lead Product Designer", company: "Northwind Labs", period: "2022 — Now" },
  { role: "Senior Product Designer", company: "Cobalt", period: "2019 — 2022" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function GuestProfileBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-paper-100 py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-light opacity-40" aria-hidden />
      <Container size="full" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <FadeUp>
              <SectionHeading
                eyebrow="Profile in seconds"
                title={
                  <>
                    Stop filling forms.{" "}
                    <span className="font-serif italic text-ink-700">
                      Your résumé already said it all.
                    </span>
                  </>
                }
                description="The moment you upload, we extract your experience, skills, and impact into a recruiter-ready profile — no typing, no copy-paste, no 12-step wizard."
              />
            </FadeUp>

            <FadeUp delay={0.1}>
              <ul className="mt-9 space-y-4">
                {[
                  { icon: BadgeCheck, text: "Verified, structured, and instantly searchable by recruiters." },
                  { icon: Sparkles, text: "Skills auto-detected and weighted by real impact, not buzzwords." },
                  { icon: TrendingUp, text: "A live strength score with concrete ways to climb." },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-accent-lime">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="text-[15px] leading-relaxed text-ink-700">{text}</p>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          <div ref={ref}>
            <motion.div
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative mx-auto w-full max-w-md rounded-[28px] border border-ink-900/10 bg-paper-50 p-6 shadow-[0_24px_80px_-32px_rgba(8,8,12,0.35)] sm:p-7"
            >
              <div
                aria-hidden
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-lime/30 blur-2xl"
              />
              <motion.div variants={item} className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-lime via-accent-cyan to-accent-violet text-[16px] font-semibold text-ink-950"
                >
                  MC
                </span>
                <div className="min-w-0">
                  <p className="text-[18px] font-medium tracking-[-0.02em] text-ink-950">
                    Maya Collins
                  </p>
                  <p className="text-[14px] text-ink-500">Lead Product Designer</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[12px] text-ink-400">
                    <MapPin className="h-3 w-3" /> Remote · Toronto
                  </p>
                </div>
              </motion.div>

              <motion.div variants={item} className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
                    Profile strength
                  </span>
                  <span className="font-serif text-[22px] italic leading-none text-ink-950">
                    <Counter to={94} suffix="%" />
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-ink-900/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-violet"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "94%" } : { width: 0 }}
                    transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>

              <motion.div variants={item} className="mt-6">
                <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
                  Detected skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
                      className="rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-1 text-[12px] font-medium text-ink-700"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={item} className="mt-6 border-t border-ink-900/8 pt-5">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
                  Experience
                </p>
                <div className="space-y-3">
                  {experience.map((e) => (
                    <div key={e.company} className="flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-medium text-ink-950">
                          {e.role}
                        </p>
                        <p className="truncate text-[12.5px] text-ink-500">{e.company}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-400">
                        {e.period}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
