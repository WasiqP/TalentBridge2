"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { journeySteps } from "@/constants/guest-page";

export function GuestJourney() {
  return (
    <section className="relative overflow-hidden bg-paper-50 py-24 sm:py-32">
      <Container size="full">
        <FadeUp>
          <SectionHeading
            centered
            eyebrow="Minimal clicks"
            title={
              <>
                From résumé to offer,{" "}
                <span className="font-serif italic text-ink-700">in four moves.</span>
              </>
            }
            description="We stripped out everything that wastes your time. This is the whole journey."
          />
        </FadeUp>
      </Container>

      <div className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto scrollbar-hide px-5 sm:mt-20 sm:px-8 lg:mx-auto lg:max-w-[1440px] lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-10">
        {journeySteps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex w-[78vw] shrink-0 snap-start flex-col rounded-[26px] border border-ink-900/10 bg-paper-50 p-7 transition-all duration-500 hover:border-ink-900/20 hover:shadow-[0_24px_70px_-32px_rgba(8,8,12,0.35)] sm:w-[300px] lg:w-auto"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-[44px] italic leading-none text-ink-200 transition-colors duration-500 group-hover:text-accent-lime-dark">
                {step.n}
              </span>
              {i < journeySteps.length - 1 && (
                <ArrowRight className="h-5 w-5 text-ink-300 lg:hidden" />
              )}
            </div>

            <h3 className="mt-8 text-[19px] font-medium tracking-[-0.02em] text-ink-950">
              {step.title}
            </h3>
            <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-500">
              {step.description}
            </p>

            <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-lime/40 bg-accent-lime/15 px-3 py-1 text-[12px] font-medium text-ink-900">
              {step.tag}
            </span>

            <span
              aria-hidden
              className="absolute left-0 top-7 h-12 w-1 rounded-r-full bg-gradient-to-b from-accent-lime via-accent-cyan to-accent-violet opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </motion.div>
        ))}
      </div>

      <Container size="full" className="mt-14">
        <FadeUp>
          <div className="flex justify-center">
            <a
              href="/sign-up"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink-950 px-7 text-[15px] font-medium text-paper-50 transition hover:bg-ink-800"
            >
              Start move one
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
