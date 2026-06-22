"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Award,
  Briefcase,
  Check,
  GraduationCap,
  Languages,
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

function CompletenessRing({ value }: { value: number }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[4.5rem] w-[4.5rem] shrink-0">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(15,15,22,0.08)" strokeWidth="5" />
        <motion.circle
          cx="36"
          cy="36"
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
      <span className="absolute inset-0 grid place-items-center text-[15px] font-semibold text-ink-950">
        {value}%
      </span>
    </div>
  );
}

function ProfileSection({
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
    <section
      className={cn(
        "rounded-[20px] border border-ink-900/10 bg-white p-4 sm:p-5",
        className,
      )}
    >
      <h4 className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
        {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
        {title}
      </h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

type Guest1FullProfileViewProps = {
  profile: JobSeekerProfile;
  fileName?: string;
  className?: string;
};

/** Complete parsed profile — shown when guest-1 flow reaches Ready. */
export function Guest1FullProfileView({
  profile,
  fileName,
  className,
}: Guest1FullProfileViewProps) {
  const initials = getProfileInitials(profile.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn("space-y-4", className)}
      aria-label="Your complete profile"
    >
      <div className="rounded-[22px] border border-accent-lime/25 bg-gradient-to-br from-accent-lime/[0.1] via-white to-white p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-ink-950 text-[17px] font-semibold text-paper-50">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
              Your profile
            </p>
            <h3 className="mt-1 text-[20px] font-medium tracking-tight text-ink-950 sm:text-[22px]">
              {profile.name}
            </h3>
            <p className="mt-0.5 text-[14px] text-ink-600">{profile.headline}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-[12px] text-ink-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {profile.location}
            </p>
          </div>
        </div>

        {fileName ? (
          <p className="mt-4 text-[12px] text-ink-500">
            Built from <span className="font-medium text-ink-800">{fileName}</span>
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-ink-900/8 pt-4">
          <CompletenessRing value={profile.completeness} />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-medium text-ink-950">Profile completeness</p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{profile.summary}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-ink-900/[0.03] px-2.5 py-1 text-[11px] font-medium text-ink-700">
              <Sparkles className="h-3 w-3" aria-hidden />
              {profile.parseConfidence}% parse confidence
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {profile.stats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-xl border border-ink-900/8 bg-white/80 px-2 py-2.5 text-center"
            >
              <p className="text-[16px] font-semibold tabular-nums text-ink-950">
                {stat.value}
                {stat.suffix ?? ""}
              </p>
              <p className="mt-0.5 text-[10px] leading-tight text-ink-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {profile.links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-ink-900/10 bg-white px-3 py-1 text-[11px] font-medium text-ink-700 transition hover:border-ink-900/20"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {profile.skillGroups.map((group) => (
        <ProfileSection key={group.id} title={group.label}>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full border border-ink-900/8 bg-paper-100 px-2.5 py-1 text-[11.5px] font-medium text-ink-700"
              >
                <Check className="h-3 w-3 text-ink-950" strokeWidth={2.5} />
                {skill}
              </span>
            ))}
          </div>
        </ProfileSection>
      ))}

      <ProfileSection title="Experience" icon={Briefcase}>
        <ul className="space-y-3">
          {profile.experience.map((role) => (
            <li
              key={role.id}
              className="rounded-xl border border-ink-900/8 bg-paper-100/80 px-3.5 py-3.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[14px] font-medium text-ink-950">{role.role}</p>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-400">
                  {role.start} — {role.current ? "Present" : role.end}
                </span>
              </div>
              <p className="mt-0.5 text-[12px] text-ink-500">
                {role.company} · {role.location}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-600">{role.summary}</p>
              {role.highlights.length > 0 ? (
                <ul className="mt-2.5 space-y-1.5">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-[11.5px] leading-relaxed text-ink-700"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              ) : null}
              {role.needsReview ? (
                <p className="mt-2 text-[11px] font-medium text-amber-700">
                  Needs review — confirm dates
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </ProfileSection>

      <ProfileSection title="Education" icon={GraduationCap}>
        <ul className="space-y-2.5">
          {profile.education.map((edu) => (
            <li
              key={edu.id}
              className="flex items-baseline justify-between gap-3 border-b border-ink-900/6 pb-2.5 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink-950">{edu.degree}</p>
                <p className="text-[12px] text-ink-500">{edu.school}</p>
              </div>
              <span className="shrink-0 text-[11px] text-ink-400">
                {edu.start} — {edu.end}
              </span>
            </li>
          ))}
        </ul>
      </ProfileSection>

      {profile.certifications.length > 0 ? (
        <ProfileSection title="Certifications" icon={Award}>
          <ul className="space-y-2">
            {profile.certifications.map((cert) => (
              <li key={cert.id} className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-[13px] font-medium text-ink-950">{cert.name}</p>
                  <p className="text-[12px] text-ink-500">{cert.issuer}</p>
                </div>
                <span className="text-[11px] text-ink-400">{cert.year}</span>
              </li>
            ))}
          </ul>
        </ProfileSection>
      ) : null}

      {profile.languages.length > 0 ? (
        <ProfileSection title="Languages" icon={Languages}>
          <ul className="flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <li
                key={lang.id}
                className="rounded-full border border-ink-900/8 bg-paper-100 px-3 py-1 text-[12px] text-ink-700"
              >
                {lang.name} · {lang.level}
              </li>
            ))}
          </ul>
        </ProfileSection>
      ) : null}

      {profile.completionItems.length > 0 ? (
        <ProfileSection title="Reach 100%">
          <ul className="space-y-2">
            {profile.completionItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink-900/8 bg-paper-100/80 px-3 py-2.5"
              >
                <span className="flex items-center gap-2 text-[12.5px] text-ink-700">
                  <Plus className="h-3.5 w-3.5 shrink-0 text-ink-400" />
                  {item.label}
                </span>
                <span className="shrink-0 text-[11px] font-semibold text-ink-950">
                  +{item.points}
                </span>
              </li>
            ))}
          </ul>
        </ProfileSection>
      ) : null}

      <div className="rounded-[20px] border border-ink-900/10 bg-white p-4 sm:p-5">
        <Button variant="lime" size="md" href="/sign-up" asChild className="w-full">
          Save profile
        </Button>
        <p className="mt-3 text-center text-[11px] text-ink-500">
          Have an account?{" "}
          <Link href="/sign-in" className="font-medium text-ink-800 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
