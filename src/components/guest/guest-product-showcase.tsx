"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "motion/react";

import { FadeUp } from "@/components/motion/fade-up";
import {
  ProductMockup,
  productShowcaseTabs,
} from "@/components/sections/product-showcase";
import { Container } from "@/components/ui/container";
import { useAutoTabs } from "@/hooks/use-auto-tabs";
import { cn } from "@/lib/utils";

const TAB_IDS = productShowcaseTabs.map((t) => t.id);
const EASE = [0.22, 1, 0.36, 1] as const;

type TabProgressDotsProps = {
  activeIndex: number;
  progress: number;
  onSelect: (id: string) => void;
};

function TabProgressDots({ activeIndex, progress, onSelect }: TabProgressDotsProps) {
  return (
    <div
      className="mx-auto mt-5 flex items-center justify-center gap-2"
      aria-label="Tour progress"
    >
      {productShowcaseTabs.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={tab.id}
            type="button"
            aria-label={`${tab.label}${isActive ? " (current)" : ""}`}
            aria-current={isActive ? "step" : undefined}
            onClick={() => onSelect(tab.id)}
            className={cn(
              "relative overflow-hidden rounded-full transition-[width,background-color] duration-300",
              isActive
                ? "h-1.5 w-12 bg-paper-50/15"
                : "h-1.5 w-1.5 bg-paper-50/35 hover:bg-paper-50/55",
            )}
          >
            {isActive ? (
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-accent-lime"
                style={{ width: `${progress * 100}%` }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/** Immersive full-width product tour — above comparison on the guest page. */
export function GuestProductShowcase() {
  const { activeTab, activeIndex, progress, setActiveTab, pauseAuto, resumeAuto } =
    useAutoTabs(TAB_IDS, { intervalMs: 5500 });

  const active = productShowcaseTabs[activeIndex] ?? productShowcaseTabs[0];

  return (
    <section className="relative overflow-hidden bg-ink-950 text-paper-50">
      <div className="absolute inset-0 bg-grid opacity-35" aria-hidden />
      <div
        aria-hidden
        className="absolute left-[-10%] top-[-20%] h-[560px] w-[560px] rounded-full bg-accent-lime/14 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-25%] right-[-8%] h-[480px] w-[480px] rounded-full bg-accent-violet/18 blur-[130px]"
      />

      <Container size="full" className="relative py-20 sm:py-24 lg:py-28">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/12 bg-paper-50/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-100/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
              Tour the product
            </span>
            <h2 className="mt-5 text-balance text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-paper-50">
              Four surfaces. One{" "}
              <span className="font-serif italic text-gradient-brand">
                copilot brain.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-paper-100/65">
              Switch between the four core surfaces. Each one is built so you
              feel at home in under five minutes.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <Tabs.Root
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-12 lg:mt-14"
            onPointerEnter={pauseAuto}
            onPointerLeave={resumeAuto}
          >
            <Tabs.List className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-paper-50/10 bg-paper-50/[0.04] p-1 backdrop-blur">
              {productShowcaseTabs.map((t) => (
                <Tabs.Trigger
                  key={t.id}
                  id={`product-tab-${t.id}`}
                  value={t.id}
                  className="rounded-full px-4 py-2 text-sm text-paper-100/55 transition data-[state=active]:bg-accent-lime data-[state=active]:text-ink-950 data-[state=active]:shadow-glow-lime"
                >
                  {t.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <TabProgressDots
              activeIndex={activeIndex}
              progress={progress}
              onSelect={setActiveTab}
            />

            <div
              className="relative mt-10 min-h-[min(640px,78vh)] lg:mt-12"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  role="tabpanel"
                  id={`product-panel-${active.id}`}
                  aria-labelledby={`product-tab-${active.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20"
                >
                  <div className="order-2 lg:order-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-lime">
                      {active.label}
                    </p>
                    <h3 className="mt-3 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight tracking-tight text-paper-50">
                      {active.title}
                    </h3>
                    <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-paper-100/65">
                      {active.description}
                    </p>
                    <ul className="mt-8 space-y-3 text-[14px] text-paper-100/80">
                      {active.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-lime" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative order-1 lg:order-2">
                    <div
                      aria-hidden
                      className="absolute -inset-6 rounded-[2rem] bg-accent-lime/10 blur-3xl"
                    />
                    <div className="relative scale-[1.02] shadow-[0_40px_120px_-40px_rgba(193,249,104,0.25)] lg:scale-105">
                      <ProductMockup id={active.id} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs.Root>
        </FadeUp>
      </Container>
    </section>
  );
}
