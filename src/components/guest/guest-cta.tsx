import { ArrowUpRight, UploadCloud } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Magnetic } from "@/components/motion/magnetic";
import { Container } from "@/components/ui/container";

export function GuestCta() {
  return (
    <section className="relative overflow-hidden bg-paper-50 py-24 sm:py-32">
      <Container size="full">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-950 px-8 py-20 text-center text-paper-50 sm:px-16 sm:py-28">
            <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
            <div className="absolute inset-0 gradient-mesh opacity-60" aria-hidden />
            <div
              aria-hidden
              className="absolute left-1/2 top-0 h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-accent-lime/20 blur-[130px]"
            />
            <div
              aria-hidden
              className="absolute bottom-[-30%] right-[-5%] h-[380px] w-[380px] rounded-full bg-accent-violet/25 blur-[130px]"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/[0.05] px-3.5 py-1.5 text-[12px] font-medium text-paper-100/85 backdrop-blur">
                <UploadCloud className="h-3.5 w-3.5 text-accent-lime" />
                It starts with one file
              </span>

              <h2 className="mx-auto mt-7 max-w-3xl text-balance text-[clamp(2.5rem,6.5vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.03em]">
                Drop your CV.{" "}
                <span className="font-serif italic text-gradient-brand">
                  Meet your agent.
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-paper-100/70 sm:text-lg">
                Build your profile in seconds, talk through your next move, and
                see roles that actually fit — all before your coffee gets cold.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <a
                    href="/sign-up"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent-lime px-7 text-[15px] font-medium text-ink-950 transition hover:bg-accent-lime-dark hover:shadow-glow-lime"
                  >
                    Get started free
                    <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                  </a>
                </Magnetic>
                <a
                  href="/sign-in"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/5 px-6 text-[15px] font-medium text-paper-50 backdrop-blur hover:bg-paper-50/10"
                >
                  I already have an account
                </a>
              </div>

              <p className="mt-8 text-[13px] text-paper-100/55">
                Not ready to apply? Upload your CV and let the agent watch for
                your perfect role — we&apos;ll ping you when it opens.
              </p>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
