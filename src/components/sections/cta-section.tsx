import { ArrowUpRight } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Magnetic } from "@/components/motion/magnetic";
import { Container } from "@/components/ui/container";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-paper-50 py-24 sm:py-32">
      <Container size="full">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-8 py-20 text-center text-paper-50 sm:px-16 sm:py-28">
            <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
            <div className="absolute inset-0 gradient-mesh opacity-50" aria-hidden />
            <div
              aria-hidden
              className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-accent-lime/20 blur-[120px]"
            />

            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1] tracking-[-0.025em]">
                Your next hire is{" "}
                <span className="font-serif italic text-gradient-brand">
                  already sourcing themselves.
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-paper-100/70 sm:text-lg">
                Spin up a role in under 5 minutes. See your first shortlist
                before the end of the day.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <a
                    href="/contact"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent-lime px-7 text-[15px] font-medium text-ink-950 transition hover:bg-accent-lime-dark hover:shadow-glow-lime"
                  >
                    Book a demo
                    <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                  </a>
                </Magnetic>
                <a
                  href="/pricing"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/5 px-6 text-[15px] font-medium text-paper-50 backdrop-blur hover:bg-paper-50/10"
                >
                  See pricing
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px] text-paper-100/55">
                <span>14-day trial</span>
                <span aria-hidden>·</span>
                <span>No credit card</span>
                <span aria-hidden>·</span>
                <span>Live in 30 minutes</span>
                <span aria-hidden>·</span>
                <span>SOC 2 Type II</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
