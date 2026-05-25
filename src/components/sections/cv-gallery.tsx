"use client";

import { Mail, MapPin, MousePointer2 } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cvProfiles, type CVProfile, type CVTheme } from "@/constants/cv-profiles";
import { cn } from "@/lib/utils";

export function CVGallery() {
  return (
    <section className="relative overflow-hidden bg-paper-50 py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-light opacity-40" aria-hidden />

      <Container size="full" className="relative">
        <FadeUp>
          <SectionHeading
            eyebrow="Real candidates"
            title={
              <>
                Every shortlist starts with{" "}
                <span className="font-serif italic text-ink-700">
                  a beautifully readable resume.
                </span>
              </>
            }
            description="Hover any candidate to read their full CV — the kind of thing TalentBridge surfaces dozens of times a day, automatically."
            centered
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cvProfiles.map((profile, i) => (
              <CVCard key={profile.id} profile={profile} index={i} />
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-10 flex items-center justify-center gap-2 text-[12px] text-ink-500">
            <MousePointer2 className="h-3.5 w-3.5" />
            Hover to read the full resume
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}

function CVCard({ profile, index }: { profile: CVProfile; index: number }) {
  return (
    <article
      className={cn(
        "group relative h-[480px] overflow-hidden rounded-3xl border border-ink-900/10 bg-paper-50 shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-ink-950/10 sm:h-[520px]",
      )}
    >
      <div className="cv-scroll absolute inset-x-0 top-0 will-change-transform">
        <CVPaper profile={profile} />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-paper-50 via-paper-50/80 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-ink-900/12 bg-paper-50/90 px-3 py-1 text-[11px] font-medium text-ink-700 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-0"
      >
        Hover to read · #{(index + 1).toString().padStart(2, "0")}
      </div>

      <style>{`
        .group .cv-scroll {
          transform: translateY(0);
          transition: transform 7500ms cubic-bezier(0.32, 0.08, 0.24, 1);
        }
        .group:hover .cv-scroll {
          transform: translateY(calc(480px - 100%));
        }
        @media (min-width: 640px) {
          .group:hover .cv-scroll {
            transform: translateY(calc(520px - 100%));
          }
        }
      `}</style>
    </article>
  );
}

const themePalette: Record<
  CVTheme,
  {
    band: string;
    bandText: string;
    bandEyebrow: string;
    accentLine: string;
    sectionEyebrow: string;
    initialBg: string;
  }
> = {
  ink: {
    band: "bg-ink-950",
    bandText: "text-paper-50",
    bandEyebrow: "text-paper-100/55",
    accentLine: "bg-accent-lime",
    sectionEyebrow: "text-ink-500",
    initialBg: "bg-paper-50/[0.06] text-paper-50 ring-paper-50/15",
  },
  paper: {
    band: "bg-paper-100",
    bandText: "text-ink-950",
    bandEyebrow: "text-ink-500",
    accentLine: "bg-ink-950",
    sectionEyebrow: "text-ink-500",
    initialBg: "bg-paper-50 text-ink-950 ring-ink-900/10",
  },
  lime: {
    band: "bg-accent-lime",
    bandText: "text-ink-950",
    bandEyebrow: "text-ink-950/60",
    accentLine: "bg-ink-950",
    sectionEyebrow: "text-ink-500",
    initialBg: "bg-ink-950/5 text-ink-950 ring-ink-950/10",
  },
  violet: {
    band: "bg-accent-violet",
    bandText: "text-paper-50",
    bandEyebrow: "text-paper-100/65",
    accentLine: "bg-accent-lime",
    sectionEyebrow: "text-ink-500",
    initialBg: "bg-paper-50/[0.08] text-paper-50 ring-paper-50/20",
  },
  cyan: {
    band: "bg-accent-cyan",
    bandText: "text-ink-950",
    bandEyebrow: "text-ink-950/60",
    accentLine: "bg-ink-950",
    sectionEyebrow: "text-ink-500",
    initialBg: "bg-ink-950/5 text-ink-950 ring-ink-950/10",
  },
  amber: {
    band: "bg-accent-amber",
    bandText: "text-ink-950",
    bandEyebrow: "text-ink-950/60",
    accentLine: "bg-ink-950",
    sectionEyebrow: "text-ink-500",
    initialBg: "bg-ink-950/5 text-ink-950 ring-ink-950/10",
  },
};

function CVPaper({ profile }: { profile: CVProfile }) {
  const t = themePalette[profile.theme];
  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <div className="bg-paper-50 text-ink-900">
      <div className={cn("px-6 pb-5 pt-6", t.band)}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.18em]",
                t.bandEyebrow,
              )}
            >
              CV · 2026
            </p>
            <h3
              className={cn(
                "mt-2 font-serif text-[28px] italic leading-[1.05] tracking-[-0.01em]",
                t.bandText,
              )}
            >
              {profile.name}
            </h3>
            <p
              className={cn(
                "mt-1 text-[12.5px] font-medium",
                t.bandText,
                "opacity-90",
              )}
            >
              {profile.title}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[12px] font-medium ring-1",
              t.initialBg,
            )}
          >
            {initials}
          </span>
        </div>

        <div
          className={cn(
            "mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]",
            t.bandText,
            "opacity-80",
          )}
        >
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {profile.location}
          </span>
          <span aria-hidden className="opacity-50">
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {profile.email}
          </span>
        </div>

        <div
          className={cn(
            "mt-2 flex flex-wrap gap-x-3 text-[11px]",
            t.bandText,
            "opacity-70",
          )}
        >
          {profile.links.map((l) => (
            <span key={l.label}>↳ {l.label}</span>
          ))}
        </div>
      </div>

      <div className="px-6 pb-7 pt-5">
        <p className="text-[12.5px] leading-relaxed text-ink-700">
          {profile.summary}
        </p>
      </div>

      <CVSection eyebrow="Experience" eyebrowClass={t.sectionEyebrow} accent={t.accentLine}>
        <div className="space-y-5">
          {profile.experience.map((exp) => (
            <div key={`${exp.company}-${exp.period}`}>
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink-950">
                    {exp.role}
                  </p>
                  <p className="truncate text-[12px] text-ink-500">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-500">
                  {exp.period}
                </span>
              </div>
              <ul className="mt-2.5 space-y-1.5">
                {exp.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-700"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-950" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CVSection>

      <CVSection eyebrow="Education" eyebrowClass={t.sectionEyebrow} accent={t.accentLine}>
        <div className="space-y-2">
          {profile.education.map((ed) => (
            <div
              key={ed.school}
              className="flex items-baseline justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-ink-950">
                  {ed.degree}
                </p>
                <p className="truncate text-[11.5px] text-ink-500">
                  {ed.school}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-500">
                {ed.period}
              </span>
            </div>
          ))}
        </div>
      </CVSection>

      <CVSection eyebrow="Skills" eyebrowClass={t.sectionEyebrow} accent={t.accentLine}>
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-1 text-[11px] font-medium text-ink-700"
            >
              {s}
            </span>
          ))}
        </div>
      </CVSection>

      <CVSection
        eyebrow="Selected work"
        eyebrowClass={t.sectionEyebrow}
        accent={t.accentLine}
        last
      >
        <div className="space-y-3">
          {profile.projects.map((p) => (
            <div key={p.name}>
              <p className="text-[12.5px] font-medium text-ink-950">{p.name}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </CVSection>

      <div className="border-t border-ink-900/8 px-6 py-3">
        <p className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-ink-400">
          <span>References on request</span>
          <span className="font-mono">page 1 / 1</span>
        </p>
      </div>
    </div>
  );
}

function CVSection({
  eyebrow,
  eyebrowClass,
  accent,
  last,
  children,
}: {
  eyebrow: string;
  eyebrowClass: string;
  accent: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("px-6 py-5", !last && "border-t border-ink-900/6")}>
      <div className="mb-4 flex items-center gap-3">
        <span className={cn("h-px w-5 rounded-full", accent)} />
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.22em]",
            eyebrowClass,
          )}
        >
          {eyebrow}
        </span>
      </div>
      {children}
    </section>
  );
}
