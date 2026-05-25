import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { blogPosts } from "@/constants/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Playbooks, engineering deep dives, and field notes on AI-first recruiting.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Playbooks. Field notes."
        italic="Quiet conviction."
        description="Long-form thinking from the recruiters and engineers building TalentBridge — and the customers using it every day."
      />

      <section className="bg-paper-50 py-20 sm:py-28">
        <Container size="full">
          <FadeUp>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-ink-900/8 bg-paper-100 transition hover:border-ink-900/20"
            >
              <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
                <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-900/12 bg-paper-50 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-ink-500">
                    Featured · {featured.category}
                  </span>
                  <div>
                    <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight text-ink-950 sm:text-[44px]">
                      {featured.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-500">
                      {featured.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-ink-500">
                    <span>
                      {featured.author} · {featured.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-ink-950 transition group-hover:gap-2.5">
                      Read article
                      <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
                <div className="relative overflow-hidden bg-ink-950">
                  <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
                  <div className="absolute inset-0 gradient-mesh opacity-50" aria-hidden />
                  <div className="relative flex h-full items-center justify-center p-10">
                    <span className="font-serif text-[80px] italic leading-none text-paper-50/80 sm:text-[120px]">
                      {featured.category[0]}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeUp>

          <div className="mt-16">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-500">
              All articles
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <FadeUp key={post.slug} delay={i * 0.05}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-paper-100 p-6 transition hover:border-ink-900/20"
                  >
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-900/12 bg-paper-50 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-ink-500">
                      {post.category}
                    </span>
                    <h3 className="mt-6 text-balance text-xl font-medium leading-snug tracking-tight text-ink-950">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-pretty text-[14px] leading-relaxed text-ink-500">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-ink-900/8 pt-4 text-[12px] text-ink-400">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
