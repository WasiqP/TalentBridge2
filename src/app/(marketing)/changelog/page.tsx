import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { changelog } from "@/constants/changelog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every release, every shipped improvement. The latest from TalentBridge.",
};

const typeStyles = {
  feature: "border-accent-lime/30 bg-accent-lime/10 text-ink-950",
  improvement: "border-accent-cyan/30 bg-accent-cyan/10 text-ink-950",
  fix: "border-ink-900/12 bg-ink-900/5 text-ink-700",
} as const;

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title="Every release."
        italic="Every shipped improvement."
        description="We ship the work, then write about it. A running log of what's new at TalentBridge."
      />

      <section className="bg-paper-50 py-20 sm:py-28">
        <Container size="full">
          <div className="mx-auto max-w-4xl">
            <ol className="relative space-y-14 border-l border-ink-900/10 pl-8 sm:pl-12">
              {changelog.map((entry, i) => (
                <FadeUp key={entry.version} delay={i * 0.04} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[37px] top-2 inline-flex h-3 w-3 items-center justify-center sm:-left-[53px]"
                  >
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-lime/60" />
                    <span className="relative h-2 w-2 rounded-full bg-accent-lime" />
                  </span>

                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-sm font-medium text-ink-950">
                      {entry.version}
                    </span>
                    <span className="text-[12px] uppercase tracking-[0.16em] text-ink-400">
                      {entry.date}
                    </span>
                    <span
                      className={cn(
                        "ml-auto rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize",
                        typeStyles[entry.type],
                      )}
                    >
                      {entry.type}
                    </span>
                  </div>

                  <h2 className="mt-3 text-balance text-2xl font-medium tracking-tight text-ink-950 sm:text-[28px]">
                    {entry.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-500">
                    {entry.description}
                  </p>

                  {entry.bullets && (
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {entry.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 rounded-xl border border-ink-900/8 bg-paper-100 px-3 py-2.5 text-[13px] text-ink-700"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-950" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </FadeUp>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
