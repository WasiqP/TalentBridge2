"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/ui/container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] runtime error", error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-paper-50">
      <Container size="full" className="text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-ink-500">
          Something went wrong
        </p>
        <h1 className="mt-6 text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.025em] text-ink-950">
          We&apos;ve been notified.{" "}
          <span className="font-serif italic text-ink-700">
            Try refreshing.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base text-ink-500">
          A glitch happened. The on-call team has it. Reload the page or take a
          step back to the homepage.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-12 items-center rounded-full bg-ink-950 px-6 text-[15px] font-medium text-paper-50 transition hover:bg-ink-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-full border border-ink-900/12 px-6 text-[15px] font-medium text-ink-950 transition hover:border-ink-900/40"
          >
            Back home
          </Link>
        </div>
      </Container>
    </section>
  );
}
