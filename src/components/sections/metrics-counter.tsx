import { Counter } from "@/components/motion/counter";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { stats } from "@/constants/stats";

export function MetricsCounter() {
  return (
    <section className="bg-paper-100 py-24 sm:py-32">
      <Container size="full">
        <FadeUp>
          <SectionHeading
            eyebrow="The numbers"
            title={
              <>
                Recruiters love this part.{" "}
                <span className="font-serif italic text-ink-700">
                  CFOs love it more.
                </span>
              </>
            }
            description="What teams report after 90 days on TalentBridge — measured against their own pre-launch baseline."
            centered
          />
        </FadeUp>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeUp
              key={s.label}
              delay={i * 0.08}
              className="rounded-3xl border border-ink-900/8 bg-paper-50 p-7"
            >
              <div className="font-serif text-[58px] italic leading-none tracking-tight text-ink-950">
                <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <p className="mt-4 text-[15px] font-medium text-ink-950">
                {s.label}
              </p>
              {s.description && (
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">
                  {s.description}
                </p>
              )}
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
