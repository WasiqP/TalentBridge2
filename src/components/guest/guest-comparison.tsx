"use client";

import { Check, X } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { guestComparisonRows } from "@/constants/guest-page";

/** Trust-led comparison — job boards vs TalentDrobe. */
export function GuestComparison() {
  return (
    <section className="relative overflow-hidden bg-paper-100 py-20 sm:py-28">
      <Container size="full">
        <FadeUp>
          <SectionHeading
            centered
            eyebrow="Why TalentDrobe"
            title={
              <>
                Job boards vs.{" "}
                <span className="font-serif italic text-ink-700">the signal.</span>
              </>
            }
            description="Same promise as the hero — less noise, more clarity on where you actually fit."
          />
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] border border-ink-900/10 bg-paper-50 shadow-[0_24px_80px_-40px_rgba(8,8,12,0.18)]">
            <div className="grid grid-cols-[1fr_1fr] border-b border-ink-900/8 bg-paper-100/80 px-4 py-4 sm:px-6">
              <p className="text-[13px] font-medium text-ink-500 sm:text-[14px]">
                Typical job boards
              </p>
              <p className="text-[13px] font-semibold text-ink-950 sm:text-[14px]">
                TalentDrobe
              </p>
            </div>

            <ul className="divide-y divide-ink-900/6">
              {guestComparisonRows.map((row, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[1fr_1fr] gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5"
                >
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-900/6 text-ink-400"
                      aria-hidden
                    >
                      <X className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <p className="text-[13px] leading-relaxed text-ink-500 sm:text-[14px]">
                      {row.jobBoards}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-lime/25 text-accent-lime-dark"
                      aria-hidden
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <p className="text-[13px] font-medium leading-relaxed text-ink-900 sm:text-[14px]">
                      {row.talentDrobe}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
