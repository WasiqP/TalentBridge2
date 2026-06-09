"use client";

import { Counter } from "@/components/motion/counter";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { seekerMetrics } from "@/constants/guest-page";

export function GuestMetrics() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-paper-50 sm:py-32">
      <div className="absolute inset-0 gradient-mesh opacity-50" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-accent-lime/15 blur-[140px]"
      />

      <Container size="full" className="relative">
        <FadeUp>
          <SectionHeading
            light
            centered
            eyebrow="The difference"
            title={
              <>
                Job seekers move faster{" "}
                <span className="font-serif italic text-gradient-brand">
                  with an agent in their corner.
                </span>
              </>
            }
            description="What early users see versus the old apply-and-pray grind."
          />
        </FadeUp>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {seekerMetrics.map((m, i) => (
            <FadeUp
              key={m.label}
              delay={i * 0.08}
              className="rounded-3xl border border-paper-50/10 bg-paper-50/[0.03] p-7 backdrop-blur"
            >
              <div className="font-serif text-[56px] italic leading-none tracking-tight text-paper-50">
                <Counter to={m.value} suffix={m.suffix} decimals={m.decimals ?? 0} />
              </div>
              <p className="mt-4 text-[15px] font-medium text-paper-50">{m.label}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-paper-100/60">
                {m.description}
              </p>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
