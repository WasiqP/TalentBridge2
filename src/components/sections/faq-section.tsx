"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqItems } from "@/constants/faq";

export function FaqSection() {
  return (
    <section className="bg-paper-100 py-24 sm:py-32">
      <Container size="narrow">
        <FadeUp>
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Answers to the questions{" "}
                <span className="font-serif italic text-ink-700">teams ask first.</span>
              </>
            }
            centered
          />
        </FadeUp>

        <FadeUp delay={0.05}>
          <Accordion.Root
            type="single"
            collapsible
            defaultValue={faqItems[0]?.id}
            className="mt-14 space-y-3"
          >
            {faqItems.map((item) => (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className="overflow-hidden rounded-2xl border border-ink-900/8 bg-paper-50"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[16px] font-medium text-ink-950">
                    {item.question}
                    <Plus className="h-4 w-4 shrink-0 text-ink-700 transition group-data-[state=open]:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-[15px] leading-relaxed text-ink-500 data-[state=closed]:animate-[acc-up_180ms_ease] data-[state=open]:animate-[acc-down_220ms_ease]">
                  <div className="px-6 pb-6 pt-1">{item.answer}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </FadeUp>
      </Container>

      <style>{`
        @keyframes acc-down {
          from { height: 0; }
          to { height: var(--radix-accordion-content-height); }
        }
        @keyframes acc-up {
          from { height: var(--radix-accordion-content-height); }
          to { height: 0; }
        }
      `}</style>
    </section>
  );
}
