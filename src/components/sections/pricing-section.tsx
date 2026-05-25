"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { pricingPlans } from "@/constants/pricing";
import { cn } from "@/lib/utils";

type PricingSectionProps = {
  /** when used outside the home page, the standalone header is omitted */
  bare?: boolean;
};

export function PricingSection({ bare = false }: PricingSectionProps) {
  const [yearly, setYearly] = useState(true);

  return (
    <section className={cn(!bare && "bg-paper-50 py-24 sm:py-32")}>
      <Container size="full">
        {!bare && (
          <FadeUp>
            <SectionHeading
              eyebrow="Pricing"
              title={
                <>
                  Built to scale with{" "}
                  <span className="font-serif italic text-ink-700">
                    every hire you make.
                  </span>
                </>
              }
              description="Start free for 14 days. No credit card. No setup fees. Switch plans any time."
              centered
            />
          </FadeUp>
        )}

        <FadeUp delay={0.05} className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-ink-900/12 bg-paper-100 p-1">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition",
                !yearly && "bg-ink-950 text-paper-50",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition",
                yearly && "bg-ink-950 text-paper-50",
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                  yearly
                    ? "bg-accent-lime text-ink-950"
                    : "bg-ink-900/10 text-ink-700",
                )}
              >
                save 20%
              </span>
            </button>
          </div>
        </FadeUp>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => {
            const isEnterprise = plan.id === "enterprise";
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <FadeUp key={plan.id} delay={i * 0.08}>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border p-8 transition",
                    plan.popular
                      ? "border-transparent bg-ink-950 text-paper-50 shadow-2xl"
                      : "border-ink-900/8 bg-paper-50",
                  )}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-accent-lime px-3 py-1 text-[11px] font-medium text-ink-950">
                      <span className="h-1 w-1 rounded-full bg-ink-950" />
                      Most popular
                    </span>
                  )}

                  <div>
                    <h3
                      className={cn(
                        "text-xl font-medium tracking-tight",
                        plan.popular ? "text-paper-50" : "text-ink-950",
                      )}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-pretty text-[14px] leading-relaxed",
                        plan.popular ? "text-paper-100/70" : "text-ink-500",
                      )}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-7">
                    {isEnterprise ? (
                      <p className="font-serif text-5xl italic leading-none tracking-tight">
                        Custom
                      </p>
                    ) : (
                      <p className="flex items-baseline gap-2">
                        <span className="font-serif text-5xl italic leading-none tracking-tight">
                          ${price}
                        </span>
                        <span
                          className={cn(
                            "text-sm",
                            plan.popular ? "text-paper-100/55" : "text-ink-500",
                          )}
                        >
                          /seat/mo
                        </span>
                      </p>
                    )}
                    <p
                      className={cn(
                        "mt-1.5 text-xs",
                        plan.popular ? "text-paper-100/45" : "text-ink-400",
                      )}
                    >
                      {isEnterprise
                        ? "Volume pricing"
                        : yearly
                          ? "Billed annually"
                          : "Billed monthly"}
                    </p>
                  </div>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={cn(
                          "flex items-start gap-2.5 text-[14px]",
                          plan.popular ? "text-paper-100/85" : "text-ink-700",
                        )}
                      >
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            plan.popular ? "text-accent-lime" : "text-ink-950",
                          )}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="/contact"
                    asChild
                    variant={plan.popular ? "lime" : isEnterprise ? "primary" : "outline"}
                    className="mt-8 w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
