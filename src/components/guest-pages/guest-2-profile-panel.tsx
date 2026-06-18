"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  GraduationCap,
  MapPin,
  Plus,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getProfileInitials,
  type JobSeekerProfile,
} from "@/config/job-seeker-profile";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const PERKS = ["One-click apply", "AI résumé polish", "Job tracker"] as const;

function CompletenessRing({ value }: { value: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(15,15,22,0.08)" strokeWidth="5" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--color-ink-950)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1, ease: EASE }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[16px] font-semibold text-ink-950">
        {value}%
      </span>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-ink-900/10 bg-white p-5 shadow-[0_4px_24px_rgba(8,8,12,0.03)]",
        className,
      )}
    >
      <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
        {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

type Guest2ProfilePanelProps = {
  profile: JobSeekerProfile;
  fileName?: string;
  onSaveClick: () => void;
};

/** Panel 3 — parsed profile reveal and sign-up gate. */
export function Guest2ProfilePanel({
  profile,
  fileName,
  onSaveClick,
}: Guest2ProfilePanelProps) {
  const initials = getProfileInitials(profile.name);
  const topSkills = profile.skillGroups.flatMap((group) => group.items).slice(0, 12);
  const topExperience = profile.experience.slice(0, 3);
  const topEducation = profile.education.slice(0, 2);

  return (
    <section className="flex h-screen w-screen shrink-0 grow-0 basis-[100vw] bg-white">
      <div
        data-scroll-panel
        data-lenis-prevent-wheel
        className="mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col overflow-y-auto px-6 pt-16 pb-10 sm:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="shrink-0"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
            Step 3
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[30px] font-medium tracking-[-0.03em] text-ink-950 sm:text-[36px]">
                Your profile is ready
              </h2>
              {fileName ? (
                <p className="mt-2 text-[14px] text-ink-500">
                  Built from{" "}
                  <span className="font-medium text-ink-800">{fileName}</span>
                </p>
              ) : null}
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink-900/10 bg-ink-900/[0.03] px-3 py-1.5 text-[12px] font-medium text-ink-700">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {profile.parseConfidence}% parse confidence
            </span>
          </div>
        </motion.div>

        <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-6">
          {/* Left rail */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
            className="space-y-4 lg:sticky lg:top-16 lg:self-start"
          >
            <div className="rounded-[22px] border border-ink-900/10 bg-white p-5 shadow-[0_8px_32px_rgba(8,8,12,0.04)]">
              <div className="flex flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-950 text-[18px] font-semibold text-white">
                  {initials}
                </span>
                <p className="mt-4 text-[18px] font-medium tracking-tight text-ink-950">
                  {profile.name}
                </p>
                <p className="mt-1 text-[14px] text-ink-500">{profile.headline}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-[12px] text-ink-400">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {profile.location}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-ink-900/8 pt-5">
                <CompletenessRing value={profile.completeness} />
                <div className="min-w-0 text-left">
                  <p className="text-[14px] font-medium text-ink-950">Completeness</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
                    {profile.summary}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {profile.stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="rounded-xl border border-ink-900/8 bg-ink-900/[0.02] px-1.5 py-2.5 text-center"
                  >
                    <p className="text-[16px] font-semibold tabular-nums text-ink-950">
                      {stat.value}
                      {stat.suffix ?? ""}
                    </p>
                    <p className="mt-0.5 text-[9px] leading-tight text-ink-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[22px] border border-ink-900/10 bg-white p-5 shadow-[0_8px_32px_rgba(8,8,12,0.04)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
                Save & apply
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
                Create a free account to keep this profile and start applying.
              </p>
              <Button
                variant="lime"
                href="/sign-up"
                asChild
                className="mt-4 w-full bg-[#CBFF4D] hover:bg-[#CBFF4D]/90"
              >
                Sign up free →
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={onSaveClick}
                className="mt-2 w-full gap-2"
              >
                Save profile
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-center text-[11px] text-ink-500">
                Have an account?{" "}
                <Link href="/sign-in" className="font-medium text-ink-800 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </motion.aside>

          {/* Main column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
            className="space-y-4 pb-2"
          >
            {topSkills.length > 0 ? (
              <SectionCard title="Skills detected">
                <div className="flex flex-wrap gap-1.5">
                  {topSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-full border border-ink-900/8 bg-ink-900/[0.03] px-2.5 py-1 text-[12px] font-medium text-ink-700"
                    >
                      <Check className="h-3 w-3 text-ink-950" strokeWidth={2.5} />
                      {skill}
                    </span>
                  ))}
                </div>
              </SectionCard>
            ) : null}

            {topExperience.length > 0 ? (
              <SectionCard title="Experience">
                <ul className="space-y-3">
                  {topExperience.map((role) => (
                    <li
                      key={role.id}
                      className="rounded-xl border border-ink-900/8 bg-ink-900/[0.02] px-4 py-3.5"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[15px] font-medium text-ink-950">{role.role}</p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-400">
                          {role.start} — {role.current ? "Now" : role.end}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[13px] text-ink-500">{role.company}</p>
                      {role.highlights[0] ? (
                        <p className="mt-2 text-[12px] leading-relaxed text-ink-600">
                          {role.highlights[0]}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            ) : null}

            {topEducation.length > 0 ? (
              <SectionCard title="Education" icon={GraduationCap}>
                <ul className="space-y-2.5">
                  {topEducation.map((edu) => (
                    <li
                      key={edu.id}
                      className="flex items-baseline justify-between gap-3 border-b border-ink-900/6 pb-2.5 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium text-ink-950">{edu.degree}</p>
                        <p className="text-[12px] text-ink-500">{edu.school}</p>
                      </div>
                      <span className="shrink-0 text-[11px] text-ink-400">
                        {edu.start} — {edu.end}
                      </span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            ) : null}

            {profile.completionItems.length > 0 ? (
              <SectionCard title="Reach 100%">
                <ul className="space-y-2">
                  {profile.completionItems.slice(0, 4).map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-ink-900/8 bg-ink-900/[0.02] px-3.5 py-2.5"
                    >
                      <span className="flex items-center gap-2 text-[13px] text-ink-700">
                        <Plus className="h-3.5 w-3.5 shrink-0 text-ink-400" />
                        {item.label}
                      </span>
                      <span className="shrink-0 text-[11px] font-semibold text-ink-950">
                        +{item.points}
                      </span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            ) : null}

            <div className="rounded-[22px] border border-ink-900/10 bg-ink-900/[0.02] px-6 py-6 text-center lg:hidden">
              <p className="text-[11px] font-medium tracking-[0.08em] text-ink-400">
                YOU&apos;RE ONE STEP AWAY
              </p>
              <h3 className="mt-2 text-[22px] font-medium tracking-[-0.02em] text-ink-950">
                Save your profile & start applying
              </h3>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {PERKS.map((perk) => (
                  <span key={perk} className="text-[12px] text-ink-600">
                    · {perk}
                  </span>
                ))}
              </div>
              <Button
                variant="lime"
                href="/sign-up"
                asChild
                className="mt-5 bg-[#CBFF4D] hover:bg-[#CBFF4D]/90"
              >
                Sign up free →
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
