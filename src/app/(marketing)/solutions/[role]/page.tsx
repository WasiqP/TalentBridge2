import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { CtaSection } from "@/components/sections/cta-section";
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";
import { PageHero } from "@/components/sections/page-hero";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { solutions } from "@/constants/solutions";

type PageProps = {
  params: Promise<{ role: string }>;
};

export async function generateStaticParams() {
  return solutions.map((s) => ({ role: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { role } = await params;
  const solution = solutions.find((s) => s.slug === role);
  if (!solution) return { title: "Solutions" };
  return {
    title: solution.title,
    description: solution.description,
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { role } = await params;
  const solution = solutions.find((s) => s.slug === role);
  if (!solution) notFound();

  return (
    <>
      <PageHero
        eyebrow={solution.title}
        title={solution.hero.split(".")[0] + "."}
        italic={
          solution.hero
            .split(".")
            .slice(1)
            .join(".")
            .trim() || undefined
        }
        description={solution.description}
      />

      <section className="bg-paper-50 py-24 sm:py-32">
        <Container size="full">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-500">
                The grind today
              </p>
              <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight text-ink-950 sm:text-4xl">
                Sound familiar?
              </h2>
              <ul className="mt-8 space-y-2">
                {solution.challenges.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 rounded-2xl border border-ink-900/8 bg-paper-100 p-4 text-[14px] text-ink-700"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-950" />
                    {c}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-500">
                With TalentBridge
              </p>
              <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight text-ink-950 sm:text-4xl">
                After 90 days, teams see…
              </h2>
              <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {solution.outcomes.map((o) => (
                  <div
                    key={o.label}
                    className="rounded-2xl border border-ink-900/8 bg-paper-100 p-5"
                  >
                    <dt className="font-serif text-4xl italic leading-none tracking-tight text-ink-950">
                      {o.metric}
                    </dt>
                    <dd className="mt-3 text-[12px] uppercase tracking-[0.14em] text-ink-500">
                      {o.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeUp>
          </div>
        </Container>
      </section>

      <section className="bg-paper-100 py-24 sm:py-32">
        <Container size="full">
          <FadeUp>
            <SectionHeading
              eyebrow="What you get"
              title={
                <>
                  Capabilities tuned for{" "}
                  <span className="font-serif italic text-ink-700">
                    {solution.title.toLowerCase().replace("for ", "")}
                  </span>
                </>
              }
              centered
            />
          </FadeUp>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {solution.capabilities.map((cap, i) => (
              <FadeUp
                key={cap.title}
                delay={i * 0.06}
                className="rounded-3xl border border-ink-900/8 bg-paper-50 p-7"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-lg font-medium tracking-tight text-ink-950">
                  {cap.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-500">
                  {cap.description}
                </p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-14 flex flex-wrap items-center justify-center gap-4 text-sm">
            <p className="text-ink-500">Built for a different role?</p>
            <div className="flex flex-wrap items-center gap-2">
              {solutions
                .filter((s) => s.slug !== solution.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/12 bg-paper-50 px-3.5 py-1.5 text-sm text-ink-700 transition hover:border-ink-900/40 hover:text-ink-950"
                  >
                    {s.title}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
            </div>
          </FadeUp>
        </Container>
      </section>

      <TestimonialsMarquee />
      <CtaSection />
    </>
  );
}
