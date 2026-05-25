import { FadeUp } from "@/components/motion/fade-up";
import { Marquee } from "@/components/motion/marquee";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/constants/testimonials";

export function TestimonialsMarquee() {
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  return (
    <section className="overflow-hidden bg-paper-50 py-24 sm:py-32">
      <Container size="full">
        <FadeUp>
          <SectionHeading
            eyebrow="Customers"
            title={
              <>
                Words from teams that{" "}
                <span className="font-serif italic text-ink-700">stopped settling.</span>
              </>
            }
            description="Real quotes from recruiters and HR leaders using TalentBridge every day."
            centered
          />
        </FadeUp>
      </Container>

      <div className="mt-16 space-y-4">
        <Marquee pauseOnHover>
          {row1.map((t) => (
            <Quote key={t.id} {...t} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover>
          {row2.map((t) => (
            <Quote key={t.id} {...t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Quote({
  name,
  role,
  company,
  quote,
}: {
  name: string;
  role: string;
  company: string;
  quote: string;
}) {
  return (
    <figure className="w-[380px] shrink-0 rounded-3xl border border-ink-900/8 bg-paper-100 p-7">
      <blockquote className="text-pretty text-[15px] leading-relaxed text-ink-900">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-900/8 pt-4">
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-lime via-accent-cyan to-accent-violet text-[12px] font-medium text-ink-950"
        >
          {name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </span>
        <div className="text-[13px] leading-tight">
          <p className="font-medium text-ink-950">{name}</p>
          <p className="text-ink-500">
            {role} · {company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
