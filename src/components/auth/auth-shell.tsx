import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Sparkles } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  /** Split marketing panel (default) or single centered column */
  layout?: "split" | "centered";
  /** Use full viewport height (no global header / announcement offset). */
  fullViewport?: boolean;
};

const highlights = [
  "SOC 2 Type II certified",
  "14-day free trial",
  "Live in under 30 minutes",
];

const backLinkClassName =
  "absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-paper-50 px-3.5 py-2 text-[13px] font-medium text-ink-700 transition hover:border-ink-900/20 hover:text-ink-950 sm:left-8 sm:top-8 sm:px-4 sm:py-2.5 sm:text-[14px]";

function BackToHomeLink() {
  return (
    <Link href="/" className={backLinkClassName}>
      <ArrowLeft className="h-4 w-4" strokeWidth={2} />
      Back to home
    </Link>
  );
}

export function AuthShell({
  children,
  title,
  subtitle,
  className,
  layout = "split",
  fullViewport = false,
}: AuthShellProps) {
  if (layout === "centered") {
    return (
      <section className="relative flex min-h-svh items-center justify-center bg-paper-50 px-5 py-12 sm:px-8 sm:py-16">
        <BackToHomeLink />
        <div className={cn("mx-auto w-full max-w-[720px]", className)}>
          <div className="mb-10 flex justify-center sm:mb-12">
            <Logo href="/" />
          </div>
          <div className="mb-10 text-center sm:mb-12">
            <h1 className="text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink-950">
              {title}
            </h1>
            {subtitle && (
              <p className="mx-auto mt-4 max-w-xl text-pretty text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-ink-500">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative bg-paper-50",
        fullViewport
          ? "flex min-h-svh items-center justify-center px-4 py-8 sm:px-6 sm:py-10"
          : "py-4 pb-8 sm:py-6 sm:pb-10 lg:min-h-[calc(100svh-5rem)]",
      )}
    >
      <BackToHomeLink />
      <div
        className={cn(
          "mx-auto grid w-full max-w-[920px] overflow-hidden rounded-2xl border border-ink-900/8 bg-paper-50 shadow-sm lg:grid-cols-2",
          fullViewport
            ? "max-h-[min(92svh,800px)] sm:rounded-3xl"
            : "min-h-0 sm:rounded-3xl lg:max-h-[min(88svh,800px)]",
          className,
        )}
      >
        <aside className="relative hidden overflow-hidden bg-ink-950 text-paper-50 lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-grid opacity-45" aria-hidden />
          <div className="absolute inset-0 gradient-mesh opacity-60" aria-hidden />
          <div
            aria-hidden
            className="absolute left-1/2 top-[-25%] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent-lime/15 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 right-[-15%] h-[380px] w-[380px] rounded-full bg-accent-violet/20 blur-[100px]"
          />

          <div className="relative flex flex-1 flex-col justify-between gap-6 p-7 xl:p-9">
            <div>
              <Logo light href="/" />
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-paper-50/12 bg-paper-50/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-paper-100/70">
                <Sparkles className="h-3 w-3 text-accent-lime" />
                AI recruiting copilot
              </p>
              <h2 className="mt-5 max-w-sm text-balance text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                Hire 10x faster.{" "}
                <span className="font-serif italic text-gradient-brand">
                  With ten times the signal.
                </span>
              </h2>
              <p className="mt-3 max-w-xs text-pretty text-[13px] leading-relaxed text-paper-100/65">
                Join recruiting teams who source, screen, and engage candidates
                on autopilot — without replacing the ATS they already love.
              </p>
            </div>

            <div className="space-y-4">
              <ul className="space-y-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[13px] text-paper-100/80"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-lime/15 text-accent-lime">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border border-paper-50/10 bg-paper-50/[0.03] p-4 backdrop-blur">
                <p className="text-pretty text-[13px] leading-relaxed text-paper-100/75">
                  &ldquo;Our time-to-first-interview dropped from 11 days to 38
                  hours. The team finally has space to actually talk to
                  humans.&rdquo;
                </p>
                <p className="mt-3 text-[12px] text-paper-100/50">
                  Maya Collins · Head of Talent, Northwind Labs
                </p>
              </div>

              <Link
                href="/features"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-paper-50 hover:gap-2.5"
              >
                Explore the product
                <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="flex flex-col justify-center overflow-y-auto px-6 py-8 sm:px-8 sm:py-9 lg:px-9">
          <div className="mx-auto w-full max-w-[360px]">
            <div className="mb-5 lg:hidden">
              <Logo href="/" />
            </div>
            <div className="mb-6">
              <h1 className="text-balance text-[clamp(1.5rem,3.5vw,1.875rem)] font-medium leading-tight tracking-[-0.03em] text-ink-950">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1.5 text-pretty text-[14px] leading-relaxed text-ink-500">
                  {subtitle}
                </p>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
