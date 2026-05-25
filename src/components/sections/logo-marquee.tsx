import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/motion/marquee";
import { customerLogos } from "@/constants/customers";

type LogoMarqueeProps = {
  dark?: boolean;
};

export function LogoMarquee({ dark = false }: LogoMarqueeProps) {
  return (
    <section
      className={
        dark
          ? "border-y border-paper-50/8 bg-ink-950 py-12"
          : "border-y border-ink-900/8 bg-paper-50 py-12"
      }
    >
      <Container size="wide">
        <p
          className={
            "mb-8 text-center text-[11px] uppercase tracking-[0.22em] " +
            (dark ? "text-paper-100/45" : "text-ink-500")
          }
        >
          Trusted by hiring teams at 600+ fast-moving companies
        </p>
        <Marquee speed="slow" pauseOnHover>
          {customerLogos.map((name) => (
            <span
              key={name}
              className={
                "font-serif text-2xl italic leading-none whitespace-nowrap " +
                (dark ? "text-paper-100/60" : "text-ink-700/70")
              }
            >
              {name}
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
