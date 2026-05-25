import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { integrations } from "@/constants/integrations";

export function IntegrationsCloud() {
  return (
    <section
      id="integrations"
      className="relative overflow-hidden bg-ink-950 py-24 text-paper-50 sm:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-violet/15 blur-[140px]"
      />

      <Container size="full" className="relative">
        <FadeUp>
          <SectionHeading
            light
            eyebrow="Integrations"
            title={
              <>
                Works with{" "}
                <span className="font-serif italic">the tools you already love.</span>
              </>
            }
            description="Two-way sync with every modern ATS and the apps your team lives in. Zero data lock-in."
            centered
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mx-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-2">
            {integrations.map((i) => (
              <span
                key={i.name}
                className="rounded-full border border-paper-50/12 bg-paper-50/[0.04] px-4 py-2 font-serif text-[16px] italic text-paper-100/85"
              >
                {i.name}
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-12 text-center text-sm text-paper-100/55">
            Not here?{" "}
            <a
              href="/contact"
              className="text-paper-50 underline-offset-4 hover:underline"
            >
              We&apos;ll build it
            </a>{" "}
            — or use our open API.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
