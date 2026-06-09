"use client";

import {
  BellRing,
  FileEdit,
  MessageCircle,
  MousePointerClick,
  ScanLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { seekerFeatures } from "@/constants/guest-page";
import { accentSpot } from "@/components/guest/accent";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  ScanLine,
  MessageCircle,
  Sparkles,
  FileEdit,
  BellRing,
  MousePointerClick,
};

const colSpans = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-6",
];

export function GuestBento() {
  return (
    <section className="relative overflow-hidden bg-paper-100 py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-light opacity-30" aria-hidden />
      <Container size="full" className="relative">
        <FadeUp>
          <SectionHeading
            centered
            eyebrow="Everything, on your side"
            title={
              <>
                One profile.{" "}
                <span className="font-serif italic text-ink-700">
                  A whole job-search team.
                </span>
              </>
            }
            description="The busywork that burns out job seekers — applications, tailoring, follow-ups, research — handled by agents that work for you, not employers."
          />
        </FadeUp>

        <div className="mt-16 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {seekerFeatures.map((f, i) => {
            const Icon = icons[f.icon] ?? Sparkles;
            const dark = i === 0 || i === seekerFeatures.length - 1;
            const span = colSpans[i] ?? "lg:col-span-2";

            if (dark) {
              return (
                <FadeUp key={f.id} delay={i * 0.05} className={cn("sm:col-span-2", span)}>
                  <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] border border-paper-50/10 bg-ink-950 p-7 text-paper-50">
                    <div className="absolute inset-0 gradient-mesh opacity-50" aria-hidden />
                    <div
                      aria-hidden
                      className="absolute right-[-10%] top-[-20%] h-48 w-48 rounded-full blur-[90px]"
                      style={{ background: accentSpot[f.accent] }}
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-50/10 text-accent-lime backdrop-blur">
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="relative mt-10">
                      <h3 className="text-[22px] font-medium tracking-[-0.02em] text-paper-50">
                        {f.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-paper-100/70">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              );
            }

            return (
              <FadeUp key={f.id} delay={i * 0.05} className={cn("sm:col-span-1", span)}>
                <SpotlightCard
                  color={accentSpot[f.accent]}
                  className="flex h-full flex-col justify-between border border-ink-900/10 bg-paper-50 p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-accent-lime">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="mt-10">
                    <h3 className="text-[19px] font-medium tracking-[-0.02em] text-ink-950">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
                      {f.description}
                    </p>
                  </div>
                </SpotlightCard>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
