import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { team, values } from "@/constants/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "We're building the recruiter-first AI copilot — explainable, bias-audited, and obsessed with the craft.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We're building the copilot"
        italic="we wished we had for fifteen years."
        description="TalentBridge is a small team of recruiters, engineers, and trust & safety leads who believe AI should make the work more human — not less."
      />

      <section className="bg-paper-50 py-24 sm:py-32">
        <Container size="full">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-500">
                Mission
              </p>
              <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight text-ink-950 sm:text-[44px]">
                Make every recruiter{" "}
                <span className="font-serif italic text-ink-700">
                  feel ten times more capable
                </span>{" "}
                without losing what makes recruiting human.
              </h2>
              <p className="mt-7 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-500">
                The best recruiters we&apos;ve worked with were judgment machines.
                The grind around the judgment — Boolean searches, copy-paste
                outreach, slogging through resumes — wore them down. We built
                TalentBridge so that grind disappears, and the judgment
                multiplies.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="rounded-3xl border border-ink-900/8 bg-paper-100 p-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink-500">
                  In the last 12 months
                </p>
                <ul className="mt-5 space-y-4 text-[15px] text-ink-900">
                  <li className="flex items-baseline justify-between">
                    <span>Hours saved for recruiters</span>
                    <span className="font-serif text-2xl italic text-ink-950">
                      12M+
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>Hires shipped</span>
                    <span className="font-serif text-2xl italic text-ink-950">
                      48,210
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>Countries served</span>
                    <span className="font-serif text-2xl italic text-ink-950">
                      62
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>Quarterly bias audits published</span>
                    <span className="font-serif text-2xl italic text-ink-950">
                      4
                    </span>
                  </li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      <section className="bg-paper-100 py-24 sm:py-32">
        <Container size="full">
          <FadeUp>
            <SectionHeading
              eyebrow="Values"
              title={
                <>
                  Four things we{" "}
                  <span className="font-serif italic text-ink-700">
                    refuse to compromise on.
                  </span>
                </>
              }
              centered
            />
          </FadeUp>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeUp
                key={v.title}
                delay={i * 0.06}
                className="rounded-3xl border border-ink-900/8 bg-paper-50 p-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-medium tracking-tight text-ink-950">
                  {v.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
                  {v.description}
                </p>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <section id="team" className="bg-paper-50 py-24 sm:py-32">
        <Container size="full">
          <FadeUp>
            <SectionHeading
              eyebrow="The team"
              title={
                <>
                  Built by people who&apos;ve{" "}
                  <span className="font-serif italic text-ink-700">
                    done the work.
                  </span>
                </>
              }
              centered
            />
          </FadeUp>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <FadeUp
                key={member.name}
                delay={i * 0.05}
                className="rounded-3xl border border-ink-900/8 bg-paper-100 p-6"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-accent-lime/30 via-accent-cyan/30 to-accent-violet/30">
                  <div className="flex h-full items-end p-5">
                    <span
                      aria-hidden
                      className="font-serif text-[80px] italic leading-none text-ink-950/15"
                    >
                      {member.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-tight text-ink-950">
                  {member.name}
                </h3>
                <p className="text-[12px] uppercase tracking-[0.14em] text-ink-400">
                  {member.role}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
                  {member.bio}
                </p>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <section id="press" className="bg-paper-100 py-24 sm:py-32">
        <Container size="full">
          <FadeUp>
            <SectionHeading
              eyebrow="Press"
              title="In the news"
              centered
            />
          </FadeUp>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                outlet: "Forbes",
                title: "Why every Series B is hiring with an AI copilot",
                date: "May 2026",
              },
              {
                outlet: "TechCrunch",
                title:
                  "TalentBridge raises $48M to make recruiting feel human again",
                date: "March 2026",
              },
              {
                outlet: "Wired",
                title: "Inside the explainability arms race in HR tech",
                date: "January 2026",
              },
            ].map((p) => (
              <article
                key={p.title}
                className="rounded-3xl border border-ink-900/8 bg-paper-50 p-7"
              >
                <p className="font-serif text-2xl italic leading-none text-ink-950">
                  {p.outlet}
                </p>
                <p className="mt-5 text-pretty text-[15px] text-ink-700">
                  {p.title}
                </p>
                <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-ink-400">
                  {p.date}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
