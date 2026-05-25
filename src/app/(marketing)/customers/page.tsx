import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaSection } from "@/components/sections/cta-section";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { PageHero } from "@/components/sections/page-hero";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { customerStories } from "@/constants/customers";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "How leading talent orgs are using TalentBridge to source, screen, and hire 10x faster.",
};

export default function CustomersPage() {
  return (
    <>
      <PageHero
        eyebrow="Customers"
        title="Loved by teams who"
        italic="stopped settling for slow."
        description="A small selection of the recruiting orgs who let TalentBridge handle the grind — and reinvested the time in better hires."
      />

      <LogoMarquee />

      <section className="bg-paper-50 py-24 sm:py-32">
        <Container size="full">
          <div className="space-y-6">
            {customerStories.map((story, i) => (
              <FadeUp key={story.slug} delay={i * 0.06}>
                <article className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-ink-900/8 bg-paper-100 lg:grid-cols-[1.1fr_1fr]">
                  <div className="flex flex-col justify-between p-8 sm:p-12">
                    <div>
                      <p className="font-serif text-3xl italic leading-none tracking-tight text-ink-950 sm:text-4xl">
                        {story.logo}
                      </p>
                      <p className="mt-1.5 text-[12px] uppercase tracking-[0.18em] text-ink-400">
                        {story.industry}
                      </p>
                      <blockquote className="mt-10 text-balance text-2xl font-medium leading-tight tracking-tight text-ink-950 sm:text-[28px]">
                        &ldquo;{story.quote}&rdquo;
                      </blockquote>
                      <p className="mt-6 text-sm text-ink-500">
                        <span className="font-medium text-ink-900">
                          {story.author}
                        </span>{" "}
                        · {story.authorRole}, {story.company}
                      </p>
                    </div>
                    <Link
                      href={`/customers#${story.slug}`}
                      className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-ink-950 hover:gap-2.5"
                    >
                      Read the story
                      <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                    </Link>
                  </div>
                  <div className="relative flex flex-col justify-between bg-ink-950 p-8 text-paper-50 sm:p-12">
                    <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
                    <div className="absolute inset-0 gradient-mesh opacity-30" aria-hidden />
                    <div className="relative">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-paper-100/45">
                        Outcomes
                      </p>
                      <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {story.metrics.map((m) => (
                          <div key={m.label}>
                            <dt className="font-serif text-4xl italic leading-none text-paper-50">
                              {m.value}
                            </dt>
                            <dd className="mt-2 text-[12px] uppercase tracking-[0.14em] text-paper-100/55">
                              {m.label}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <p className="relative mt-12 text-pretty text-[15px] leading-relaxed text-paper-100/70">
                      {story.summary}
                    </p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
