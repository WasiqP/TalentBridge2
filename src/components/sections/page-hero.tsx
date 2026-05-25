import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/fade-up";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  italic?: string;
  description?: string;
  align?: "left" | "center";
  variant?: "dark" | "light";
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  italic,
  description,
  align = "center",
  variant = "dark",
  children,
}: PageHeroProps) {
  const dark = variant === "dark";

  return (
    <section className="relative bg-paper-50 pt-4 sm:pt-6">
      <Container size="full">
        <div
          className={cn(
            "relative isolate overflow-hidden rounded-[28px] sm:rounded-[36px]",
            dark
              ? "bg-ink-950 text-paper-50"
              : "border border-ink-900/8 bg-paper-100 text-ink-950",
          )}
        >
          {dark && (
            <>
              <div className="absolute inset-0 -z-10 gradient-mesh opacity-80" aria-hidden />
              <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
              <div
                className="absolute inset-0 -z-10 bg-noise opacity-[0.06] mix-blend-overlay"
                aria-hidden
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-[-40%] -z-10 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-accent-lime/15 blur-[140px]"
              />
              <div
                aria-hidden
                className="absolute -bottom-32 right-[-10%] -z-10 h-[360px] w-[360px] rounded-full bg-accent-violet/20 blur-[120px]"
              />
            </>
          )}
          {!dark && (
            <div
              className="absolute inset-0 -z-10 bg-grid-light opacity-50"
              aria-hidden
            />
          )}

          <div
            className={cn(
              "relative px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24",
              align === "center" ? "text-center" : "text-left",
            )}
          >
            <div className={cn(align === "center" && "mx-auto max-w-4xl")}>
              {eyebrow && (
                <FadeUp>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em]",
                      dark
                        ? "border-paper-50/15 bg-paper-50/[0.04] text-paper-100/85 backdrop-blur"
                        : "border-ink-900/12 bg-paper-50 text-ink-700",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        dark ? "bg-accent-lime" : "bg-ink-950",
                      )}
                    />
                    {eyebrow}
                  </span>
                </FadeUp>
              )}
              <h1
                className={cn(
                  "mt-6 text-balance text-[clamp(2.5rem,6.4vw,5rem)] font-medium leading-[1] tracking-[-0.035em] sm:mt-7",
                  dark ? "text-paper-50" : "text-ink-950",
                )}
              >
                <TextReveal text={title} className="block" />
                {italic && (
                  <span className="block font-serif italic text-gradient-brand">
                    <TextReveal text={italic} delay={0.15} />
                  </span>
                )}
              </h1>
              {description && (
                <FadeUp delay={0.4}>
                  <p
                    className={cn(
                      "mt-6 text-pretty text-base leading-relaxed sm:mt-7 sm:text-lg",
                      align === "center" && "mx-auto max-w-2xl",
                      dark ? "text-paper-100/70" : "text-ink-500",
                    )}
                  >
                    {description}
                  </p>
                </FadeUp>
              )}
              {children && (
                <FadeUp delay={0.55} className="mt-9">
                  {children}
                </FadeUp>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
