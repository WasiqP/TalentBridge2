import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { CtaSection } from "@/components/sections/cta-section";
import { FadeUp } from "@/components/motion/fade-up";
import { TextReveal } from "@/components/motion/text-reveal";
import { Container } from "@/components/ui/container";
import { blogPosts } from "@/constants/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="relative overflow-hidden bg-paper-50">
        <div className="absolute inset-0 bg-grid-light opacity-50" aria-hidden />
        <Container size="full" className="relative pb-16 pt-20 sm:pt-28">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition hover:text-ink-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All articles
          </Link>

          <div className="mx-auto mt-10 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-paper-100 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-ink-500">
              {post.category}
            </span>
            <h1 className="mt-6 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.025em] text-ink-950">
              <TextReveal text={post.title} />
            </h1>
            <FadeUp delay={0.4}>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-500">
                {post.excerpt}
              </p>
            </FadeUp>
            <FadeUp delay={0.55}>
              <div className="mt-8 flex items-center justify-center gap-3 text-sm text-ink-500">
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-lime via-accent-cyan to-accent-violet text-[12px] font-medium text-ink-950"
                >
                  {post.author
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <span>
                  <span className="font-medium text-ink-900">{post.author}</span>{" "}
                  · {post.authorRole}
                </span>
                <span aria-hidden>·</span>
                <span>{post.date}</span>
                <span aria-hidden>·</span>
                <span>{post.readTime}</span>
              </div>
            </FadeUp>
          </div>
        </Container>
      </article>

      <section className="bg-paper-50 pb-24">
        <Container size="full">
          <FadeUp>
            <div className="mx-auto max-w-2xl space-y-6 text-pretty text-[17px] leading-[1.75] text-ink-700">
              <p className="font-serif text-[26px] italic leading-snug text-ink-950">
                {post.content.split(".")[0]}.
              </p>
              <p>{post.content}</p>
              <p>
                We&apos;ll keep updating this piece as we learn more from the
                teams in production. Have a question? Want to share what&apos;s
                working? Reply on the channel of your choice — we read every
                note.
              </p>
              <div className="my-10 rounded-3xl border border-ink-900/8 bg-paper-100 p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                  Key takeaway
                </p>
                <p className="mt-3 font-serif text-2xl italic leading-snug text-ink-950">
                  {post.excerpt}
                </p>
              </div>
              <p>
                If you&apos;re experimenting with any of these patterns in your
                own pipeline, we&apos;d love to compare notes — drop us a line
                from the contact page.
              </p>
            </div>
          </FadeUp>
        </Container>
      </section>

      <section className="bg-paper-100 py-24">
        <Container size="full">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-500">
              Keep reading
            </p>
            <Link
              href="/blog"
              className="text-sm text-ink-500 transition hover:text-ink-950"
            >
              All articles →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {related.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-paper-50 p-6 transition hover:border-ink-900/20"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] text-ink-500">
                    {p.category}
                  </span>
                  <h3 className="mt-4 text-balance text-lg font-medium tracking-tight text-ink-950">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-ink-500">
                    {p.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ink-950 transition group-hover:gap-2.5">
                    Read article
                    <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
