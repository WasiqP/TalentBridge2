import type { Metadata } from "next";
import { Calendar, Mail, MapPin, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { FadeUp } from "@/components/motion/fade-up";
import { TextReveal } from "@/components/motion/text-reveal";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "See TalentBridge end-to-end in 30 minutes. Tailored to your stack, your roles, your team.",
};

export default function ContactPage() {
  return (
    <section className="relative bg-paper-50 pt-4 pb-20 sm:pt-6 sm:pb-28">
      <Container size="full">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-ink-950 text-paper-50 sm:rounded-[36px]">
          <div className="absolute inset-0 -z-10 gradient-mesh opacity-70" aria-hidden />
          <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
          <div
            aria-hidden
            className="absolute left-1/2 top-[-30%] -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent-lime/15 blur-[140px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-accent-violet/20 blur-[120px]"
          />

          <div className="relative px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
              <div>
                <FadeUp>
                  <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/15 bg-paper-50/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-100/85 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                    Book a demo
                  </span>
                </FadeUp>
                <h1 className="mt-6 text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1] tracking-[-0.03em] sm:mt-7">
                  <TextReveal text="See it run on" />
                  <span className="block font-serif italic text-gradient-brand">
                    <TextReveal text="your roles." delay={0.15} />
                  </span>
                </h1>
                <FadeUp delay={0.4}>
                  <p className="mt-6 max-w-xl text-pretty text-base text-paper-100/70 sm:mt-7 sm:text-lg">
                    A 30-minute walkthrough tailored to your stack and your open
                    roles. You&apos;ll see live agents, real shortlists, and the
                    pricing that fits your team.
                  </p>
                </FadeUp>

                <FadeUp delay={0.55}>
                  <ul className="mt-9 space-y-3 sm:mt-10">
                    {[
                      {
                        icon: Calendar,
                        label: "30 minutes",
                        sub: "Live walkthrough on your stack",
                      },
                      {
                        icon: Mail,
                        label: siteConfig.contact.sales,
                        sub: "Direct to the sales engineering team",
                      },
                      {
                        icon: MessageCircle,
                        label: "Slack Connect",
                        sub: "Set up after kickoff, optional",
                      },
                      {
                        icon: MapPin,
                        label: siteConfig.contact.address,
                        sub: "SF + remote, hiring globally",
                      },
                    ].map((item) => (
                      <li
                        key={item.label}
                        className="flex items-start gap-4 rounded-2xl border border-paper-50/8 bg-paper-50/[0.03] p-4 backdrop-blur"
                      >
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-50/5 ring-1 ring-paper-50/10">
                          <item.icon className="h-4 w-4 text-accent-lime" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-paper-50">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-[13px] text-paper-100/55">
                            {item.sub}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </FadeUp>
              </div>

              <FadeUp delay={0.2}>
                <div className="rounded-3xl border border-paper-50/10 bg-paper-50 p-6 text-ink-950 shadow-2xl shadow-ink-950/30 sm:p-8">
                  <h2 className="font-serif text-2xl italic text-ink-950">
                    Tell us about your team
                  </h2>
                  <p className="mt-1.5 text-sm text-ink-500">
                    We&apos;ll match you with the right specialist on our team.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
