import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-ink-950 text-paper-50">
      <div className="absolute inset-0 -z-10 gradient-mesh opacity-60" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
      <Container size="full" className="text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-paper-100/55">
          404 · page not found
        </p>
        <h1 className="mt-6 text-balance text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1] tracking-[-0.03em]">
          Looks like that page{" "}
          <span className="font-serif italic text-gradient-brand">
            never got hired.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base text-paper-100/70">
          The link you followed might be broken, or the page has moved. Let&apos;s
          get you back on the rails.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-full bg-accent-lime px-6 text-[15px] font-medium text-ink-950 transition hover:bg-accent-lime-dark"
          >
            Take me home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded-full border border-paper-50/15 bg-paper-50/5 px-6 text-[15px] font-medium text-paper-50 hover:bg-paper-50/10"
          >
            Talk to a human
          </Link>
        </div>
      </Container>
    </section>
  );
}
