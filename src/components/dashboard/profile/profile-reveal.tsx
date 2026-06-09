"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "motion/react";
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Languages as LanguagesIcon,
  Link2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  TriangleAlert,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getProfileFirstName,
  getProfileInitials,
  jobSeekerProfile,
  type JobSeekerProfile,
} from "@/config/job-seeker-profile";
import { JOB_SEEKER_SEARCH_PATH } from "@/config/dashboard-routes";
import { jobSeekerSearchResults } from "@/config/job-seeker-search";
import { cn } from "@/lib/utils";

/** Static match scores for the preview teaser — replace with API scores. */
const PREVIEW_MATCH_PERCENT = [96, 92, 88] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/** Reveal sections as they scroll into view. */
const VIEWPORT = { once: true, amount: 0.25 } as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE },
  },
};

const listContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.42, ease: EASE },
  },
};

const chipContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 6 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE },
  },
};

function AnimatedNumber({
  value,
  duration = 1,
}: {
  value: number;
  duration?: number;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    const controls = animate(mv, value, { duration, ease: EASE });
    return () => controls.stop();
  }, [mv, value, duration]);

  return <motion.span>{rounded}</motion.span>;
}

function CompletenessRing({
  value,
  initials,
}: {
  value: number;
  initials: string;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative mx-auto h-[148px] w-[148px]">
      <svg
        viewBox="0 0 128 128"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden
      >
        <defs>
          <linearGradient id="profile-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-from)" />
            <stop offset="50%" stopColor="var(--color-brand-via)" />
            <stop offset="100%" stopColor="var(--color-brand-to)" />
          </linearGradient>
        </defs>
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="rgba(8,8,12,0.08)"
          strokeWidth="9"
        />
        <motion.circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="url(#profile-ring)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        />
      </svg>

      <div className="absolute inset-[18px] flex items-center justify-center rounded-full bg-gradient-to-br from-accent-lime/30 via-accent-cyan/20 to-accent-violet/20">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-paper-50 text-[28px] font-semibold tracking-tight text-ink-950">
          {initials}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  children,
  aiAction,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: React.ReactNode;
  /** Optional contextual copilot action (e.g. "Rewrite", "Suggest skills"). */
  aiAction?: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-ink-900/10 bg-paper-100 text-ink-800">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <h2 className="text-[15px] font-semibold tracking-tight text-ink-950">
        {children}
      </h2>
      {aiAction ? (
        <button
          type="button"
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-paper-50 px-2.5 py-1 text-[12px] font-medium text-ink-600 transition hover:border-accent-lime/45 hover:bg-accent-lime/10 hover:text-ink-900"
        >
          <Wand2 className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
          {aiAction}
        </button>
      ) : null}
    </div>
  );
}

const cardClass =
  "rounded-[24px] border border-ink-900/12 bg-paper-50 p-5 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:p-6";

/** Identity card + stats + completeness booster — the left rail content. */
export function ProfileIdentityRail({ profile }: { profile: JobSeekerProfile }) {
  const initials = getProfileInitials(profile.name);
  const pointsToFull = profile.completionItems.reduce(
    (total, item) => total + item.points,
    0,
  );

  return (
    <>
      <div className={cn(cardClass, "overflow-hidden")}>
        <CompletenessRing value={profile.completeness} initials={initials} />

        <div className="mt-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-lime/35 bg-accent-lime/15 px-3 py-1 text-[12px] font-medium text-ink-900">
            <AnimatedNumber value={profile.completeness} />% complete
          </span>
        </div>

        <div className="mt-5 text-center">
          <p className="text-[19px] font-semibold tracking-tight text-ink-950">
            {profile.name}
          </p>
          <p className="mt-0.5 text-[14px] text-ink-600">{profile.headline}</p>
        </div>

        <div className="mt-5 space-y-2.5 border-t border-ink-900/8 pt-5">
          <ContactRow icon={MapPin} text={profile.location} />
          <ContactRow icon={Mail} text={profile.email} />
          <ContactRow icon={Phone} text={profile.phone} />
        </div>

        {profile.links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-ink-900/8 pt-4">
            {profile.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-paper-100 px-3 py-1.5 text-[12px] font-medium text-ink-700 transition hover:border-ink-900/25 hover:bg-paper-200"
              >
                <Link2 className="h-3.5 w-3.5" aria-hidden />
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {profile.stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-2xl border border-ink-900/12 bg-paper-50 px-3 py-4 text-center shadow-[0_2px_16px_rgba(8,8,12,0.03)]"
          >
            <p className="text-[24px] font-semibold tracking-tight text-ink-950">
              <AnimatedNumber value={stat.value} />
              {stat.suffix}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-ink-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Completeness booster — actionable gaps to 100% */}
      {profile.completionItems.length > 0 ? (
        <div className={cn(cardClass, "mt-5 p-4 sm:p-5")}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-semibold tracking-tight text-ink-950">
              Reach 100%
            </p>
            <span className="text-[11px] font-medium text-accent-lime-dark">
              +{pointsToFull} pts
            </span>
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
            A few quick wins make you easier to match.
          </p>
          <ul className="mt-3 space-y-2">
            {profile.completionItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="group flex w-full items-center gap-2.5 rounded-xl border border-ink-900/10 bg-paper-50 px-3 py-2.5 text-left transition hover:border-accent-lime/45 hover:bg-accent-lime/10"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent-lime/20 text-[11px] font-semibold text-ink-900">
                    +{item.points}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink-700">
                    {item.label}
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-ink-400 transition group-hover:translate-x-0.5 group-hover:text-ink-700"
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

/** The structured profile sections (summary → certifications). */
export function ProfileMainSections({ profile }: { profile: JobSeekerProfile }) {
  return (
    <div className="space-y-5">
      {/* Summary */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className={cardClass}
      >
        <SectionHeading icon={Sparkles}>Professional summary</SectionHeading>
        <p className="text-[14px] leading-relaxed text-ink-700 sm:text-[15px]">
          {profile.summary}
        </p>
      </motion.section>

      {/* Experience */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className={cardClass}
      >
        <SectionHeading icon={Briefcase} aiAction="Improve bullets">
          Experience
        </SectionHeading>
        <motion.ol
          variants={listContainerVariants}
          className="relative space-y-6 border-l border-ink-900/10 pl-6"
        >
          {profile.experience.map((exp) => (
            <motion.li key={exp.id} variants={listItemVariants} className="relative">
              <span
                className={cn(
                  "absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2",
                  exp.current
                    ? "border-accent-lime-dark bg-accent-lime"
                    : "border-ink-900/20 bg-paper-50",
                )}
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink-950">
                  {exp.role}
                  {exp.needsReview ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full border border-accent-amber/45 bg-accent-amber/15 px-2 py-0.5 text-[11px] font-medium text-ink-800 transition hover:bg-accent-amber/25"
                    >
                      <TriangleAlert className="h-3 w-3 text-accent-amber" aria-hidden />
                      Verify
                    </button>
                  ) : null}
                </p>
                <span className="text-[12px] font-medium text-ink-400">
                  {exp.start} – {exp.end}
                </span>
              </div>
              <p className="mt-0.5 text-[13px] text-ink-600">
                {exp.company} · {exp.location}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
                {exp.summary}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {exp.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-600"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-lime-dark"
                      aria-hidden
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ol>
      </motion.section>

      {/* Skills */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className={cardClass}
      >
        <SectionHeading icon={Sparkles} aiAction="Suggest skills">
          Skills
        </SectionHeading>
        <div className="space-y-4">
          {profile.skillGroups.map((group) => (
            <div key={group.id}>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
                {group.label}
              </p>
              <motion.ul
                variants={chipContainerVariants}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={chipVariants}
                    className="rounded-full border border-ink-900/10 bg-paper-100 px-3 py-1.5 text-[13px] font-medium text-ink-800"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Education + Languages */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className={cardClass}
        >
          <SectionHeading icon={GraduationCap}>Education</SectionHeading>
          <ul className="space-y-4">
            {profile.education.map((edu) => (
              <li key={edu.id}>
                <p className="text-[14px] font-semibold tracking-tight text-ink-950">
                  {edu.degree}
                </p>
                <p className="mt-0.5 text-[13px] text-ink-600">{edu.school}</p>
                <p className="mt-0.5 text-[12px] font-medium text-ink-400">
                  {edu.start} – {edu.end}
                </p>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className={cardClass}
        >
          <SectionHeading icon={LanguagesIcon}>Languages</SectionHeading>
          <ul className="space-y-3">
            {profile.languages.map((lang) => (
              <li key={lang.id} className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-ink-900">
                  {lang.name}
                </span>
                <span className="text-[12px] text-ink-500">{lang.level}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Certifications */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className={cardClass}
      >
        <SectionHeading icon={Award}>Certifications</SectionHeading>
        <ul className="space-y-3">
          {profile.certifications.map((cert) => (
            <li key={cert.id} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-ink-900">{cert.name}</p>
                <p className="mt-0.5 text-[13px] text-ink-500">{cert.issuer}</p>
              </div>
              <span className="shrink-0 text-[12px] font-medium text-ink-400">
                {cert.year}
              </span>
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  );
}

/** Match preview bridge — connects the profile to job search. */
export function ProfileMatchPreview() {
  const previewMatches = jobSeekerSearchResults.slice(0, 3);

  return (
    <motion.section
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={cn(cardClass, "overflow-hidden")}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-lime/30 via-accent-cyan/25 to-accent-violet/20 text-ink-950">
            <Star className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-[16px] font-semibold tracking-tight text-ink-950 sm:text-[18px]">
              {jobSeekerSearchResults.length} roles already match your profile
            </h2>
            <p className="mt-0.5 text-[13px] text-ink-500">
              Based on your experience, skills, and location.
            </p>
          </div>
        </div>
        <Button variant="lime" size="md" asChild href={JOB_SEEKER_SEARCH_PATH}>
          <span className="inline-flex items-center gap-2">
            Find matching jobs
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {previewMatches.map((job, index) => (
          <div
            key={job.id}
            className="rounded-2xl border border-ink-900/10 bg-paper-50 p-4 transition hover:border-ink-900/20 hover:shadow-[0_4px_24px_rgba(8,8,12,0.06)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-accent-lime/35 bg-accent-lime/15 px-2 py-0.5 text-[11px] font-semibold text-ink-900">
                {PREVIEW_MATCH_PERCENT[index] ?? 85}% match
              </span>
              <span className="text-[11px] font-medium text-ink-400">
                {job.salaryRange}
              </span>
            </div>
            <p className="mt-2.5 truncate text-[14px] font-semibold tracking-tight text-ink-950">
              {job.jobTitle}
            </p>
            <p className="mt-0.5 truncate text-[12.5px] text-ink-500">
              {job.companyName} · {job.location}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

type ProfileRevealProps = {
  fileName?: string;
  profile?: JobSeekerProfile;
  className?: string;
};

export function ProfileReveal({
  fileName,
  profile = jobSeekerProfile,
  className,
}: ProfileRevealProps) {
  const firstName = getProfileFirstName(profile.name);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-6xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28",
        className,
      )}
    >
      {/* one-time scanning sweep that signals the profile being assembled */}
      <motion.div
        className="pointer-events-none absolute inset-x-4 top-24 z-10 h-24 rounded-full bg-gradient-to-b from-transparent via-accent-lime/25 to-transparent blur-2xl sm:inset-x-6"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 0.9, 0], y: ["0%", "600%", "1400%"] }}
        transition={{ duration: 1.1, ease: EASE, times: [0, 0.3, 1] }}
        aria-hidden
      />

      <div>
        {/* Header */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
                Profile complete
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-1 text-[11px] font-medium text-ink-600">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-cyan" aria-hidden />
                {profile.parseConfidence}% AI parse confidence
              </span>
            </div>
            <h1 className="mt-2 text-balance text-[26px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[32px]">
              Your profile is ready, {firstName}
            </h1>
            <p className="mt-1.5 text-[13px] text-ink-500 sm:text-[14px]">
              {fileName ? (
                <>
                  Built from{" "}
                  <span className="font-medium text-ink-700">{fileName}</span> —
                  review the details below.
                </>
              ) : (
                "We assembled everything we found. Review the details below."
              )}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <Button variant="outline" size="md" className="gap-2">
              <Pencil className="h-4 w-4" aria-hidden />
              Edit profile
            </Button>
            <Button variant="lime" size="md" asChild href={JOB_SEEKER_SEARCH_PATH}>
              Find matching jobs
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-6">
          {/* Identity rail */}
          <motion.aside
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <ProfileIdentityRail profile={profile} />
          </motion.aside>

          {/* Main content */}
          <ProfileMainSections profile={profile} />
        </div>

        {/* Match preview bridge — connects the profile to job search */}
        <div className="mt-5 sm:mt-6">
          <ProfileMatchPreview />
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-[13px] text-ink-600">
      <Icon className="h-4 w-4 shrink-0 text-ink-400" aria-hidden />
      <span className="truncate">{text}</span>
    </div>
  );
}
