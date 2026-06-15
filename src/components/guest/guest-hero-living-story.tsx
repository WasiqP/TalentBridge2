"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  FileText,
  Loader2,
  MapPin,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import {
  getProfileInitials,
  jobSeekerProfile,
} from "@/config/job-seeker-profile";
import { guestJobs } from "@/constants/guest-page";
import {
  guestHeroStoryPhaseLabels,
  guestHeroStoryWhispers,
  type GuestHeroStoryPhase,
} from "@/constants/guest-hero";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const PHASE_ORDER: GuestHeroStoryPhase[] = [
  "upload",
  "assemble",
  "profile",
  "match",
];

const PHASE_MS: Record<GuestHeroStoryPhase, number> = {
  upload: 2800,
  assemble: 4200,
  profile: 3600,
  match: 4400,
};

const profile = jobSeekerProfile;
const topMatch = guestJobs[0];
const initials = getProfileInitials(profile.name);
const skills = profile.skillGroups.flatMap((g) => g.items).slice(0, 5);

const cardClass =
  "rounded-xl border border-ink-900/12 bg-paper-50 shadow-[0_2px_16px_rgba(8,8,12,0.04)]";

function nextPhase(phase: GuestHeroStoryPhase): GuestHeroStoryPhase {
  const index = PHASE_ORDER.indexOf(phase);
  return PHASE_ORDER[(index + 1) % PHASE_ORDER.length];
}

function CopilotWhisper({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-paper-50 px-3 py-1.5 text-[11px] font-medium text-ink-800 shadow-[0_8px_24px_rgba(8,8,12,0.12)]"
    >
      <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
      {text}
    </motion.div>
  );
}

function PhaseRail({ phase }: { phase: GuestHeroStoryPhase }) {
  return (
    <div className="flex gap-1 border-t border-ink-900/8 bg-paper-100/80 px-3 py-2.5 sm:px-4">
      {PHASE_ORDER.map((step) => {
        const isActive = step === phase;
        const isDone = PHASE_ORDER.indexOf(step) < PHASE_ORDER.indexOf(phase);
        return (
          <div
            key={step}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-500",
              isDone
                ? "bg-accent-lime-dark"
                : isActive
                  ? "bg-accent-lime/70"
                  : "bg-ink-900/10",
            )}
            title={guestHeroStoryPhaseLabels[step]}
          />
        );
      })}
    </div>
  );
}

function UploadScene() {
  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full flex-col items-center justify-center bg-paper-100/50 px-6 py-10"
    >
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="flex w-full max-w-xs flex-col items-center rounded-2xl border border-dashed border-accent-lime/45 bg-accent-lime/10 px-6 py-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ink-900/8 bg-paper-50 text-accent-lime-dark shadow-sm">
          <UploadCloud className="h-7 w-7" aria-hidden />
        </span>
        <p className="mt-4 text-[15px] font-medium text-ink-950">Drop your résumé</p>
        <p className="mt-1 text-[12px] text-ink-500">PDF · DOC · DOCX</p>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0, rotate: -4 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        className={cn("mt-6 flex w-full max-w-xs items-center gap-3 p-3", cardClass)}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-violet/15 text-accent-violet">
          <FileText className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-[13px] font-semibold text-ink-950">
            jordan-avery-resume.pdf
          </p>
          <p className="text-[11px] text-ink-500">Uploading securely…</p>
        </div>
        <Loader2 className="h-4 w-4 animate-spin text-accent-lime-dark" aria-hidden />
      </motion.div>
    </motion.div>
  );
}

function AssembleScene() {
  const blocks = [
    { label: "Identity", delay: 0 },
    { label: "Experience", delay: 0.15 },
    { label: "Skills", delay: 0.3 },
    { label: "Education", delay: 0.45 },
  ];

  return (
    <motion.div
      key="assemble"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid h-full grid-cols-2 gap-2 bg-paper-100/40 p-3 sm:gap-3 sm:p-4"
    >
      {blocks.map((block, index) => (
        <motion.div
          key={block.label}
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: block.delay, duration: 0.5, ease: EASE }}
          className={cn("flex flex-col p-3", cardClass)}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-400">
            Block 0{index + 1}
          </p>
          <p className="mt-1 text-[12px] font-semibold text-ink-950">{block.label}</p>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 rounded-full bg-ink-900/8" />
            <div className="h-1.5 w-4/5 rounded-full bg-ink-900/8" />
          </div>
          {index === 0 ? (
            <div className="mt-auto flex items-center gap-2 pt-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-lime/20 text-[9px] font-bold text-ink-950">
                {initials}
              </span>
              <p className="text-[11px] font-medium text-ink-800">{profile.name}</p>
            </div>
          ) : null}
          {index === 2 ? (
            <div className="mt-auto flex flex-wrap gap-1 pt-2">
              {skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-ink-900/10 bg-paper-100 px-1.5 py-0.5 text-[8px] font-medium text-ink-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : null}
        </motion.div>
      ))}
    </motion.div>
  );
}

function ProfileScene() {
  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full flex-col bg-paper-50 p-4 sm:p-5"
    >
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-accent-lime-dark" aria-hidden />
        <p className="text-[12px] font-semibold text-ink-950">Profile complete</p>
        <span className="ml-auto rounded-full border border-accent-lime/35 bg-accent-lime/15 px-2 py-0.5 text-[10px] font-semibold text-ink-900">
          {profile.parseConfidence}% confidence
        </span>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-[88px_1fr] gap-3">
        <div className={cn("p-2 text-center", cardClass)}>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-lime/30 to-accent-violet/20 text-[11px] font-bold text-ink-950">
            {initials}
          </div>
          <p className="mt-2 text-[10px] font-semibold leading-tight text-ink-950">
            {profile.name}
          </p>
        </div>
        <div className="space-y-2">
          <div className={cn("p-2.5", cardClass)}>
            <p className="text-[11px] font-semibold text-ink-950">{profile.headline}</p>
            <p className="mt-1 flex items-center gap-1 text-[10px] text-ink-500">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </p>
          </div>
          <div className={cn("p-2.5", cardClass)}>
            <p className="text-[10px] font-medium text-ink-500">Experience</p>
            <p className="text-[11px] font-semibold text-ink-950">
              {profile.experience[0]?.role}
            </p>
            <p className="text-[10px] text-ink-500">{profile.experience[0]?.company}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-ink-900/10 bg-paper-100 px-2 py-0.5 text-[9px] font-medium text-ink-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MatchScene() {
  return (
    <motion.div
      key="match"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full flex-col justify-center bg-paper-50 p-4 sm:p-5"
    >
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
        Top match for you
      </p>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="rounded-2xl border border-accent-lime/40 bg-gradient-to-br from-accent-lime/15 via-paper-50 to-accent-cyan/10 p-4 shadow-[0_2px_20px_rgba(8,8,12,0.05)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-ink-950">{topMatch.title}</p>
            <p className="mt-0.5 text-[12px] text-ink-600">{topMatch.company}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-500">
              <Briefcase className="h-3 w-3" />
              {topMatch.location} · {topMatch.salary}
            </p>
          </div>
          <span className="shrink-0 rounded-xl bg-accent-lime px-2.5 py-1.5 text-[14px] font-bold text-ink-950">
            {topMatch.match}%
          </span>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-ink-600">{topMatch.reason}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {topMatch.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink-900/10 bg-paper-100 px-2 py-0.5 text-[10px] font-medium text-ink-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-900"
        >
          View role
          <ArrowUpRight className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
        </button>
      </motion.div>
    </motion.div>
  );
}

/**
 * Auto-playing product story: upload → assemble → profile → match.
 * Light theme — matches the real dashboard UI.
 */
export function GuestHeroLivingStory() {
  const [phase, setPhase] = useState<GuestHeroStoryPhase>("upload");
  const [whisperIndex, setWhisperIndex] = useState(0);

  const whispers = guestHeroStoryWhispers[phase];
  const activeWhisper = whispers[whisperIndex % whispers.length];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPhase((current) => nextPhase(current));
      setWhisperIndex(0);
    }, PHASE_MS[phase]);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWhisperIndex((current) => current + 1);
    }, 1400);
    return () => window.clearInterval(timer);
  }, [phase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
      className="relative w-full"
    >
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[40px] bg-accent-lime/20 blur-3xl"
        aria-hidden
      />

      <div className="overflow-hidden rounded-[24px] border border-ink-900/12 bg-paper-50 shadow-[0_8px_40px_rgba(8,8,12,0.12)] sm:rounded-[28px]">
        <div className="flex items-center gap-2 border-b border-ink-900/8 bg-paper-100/90 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-900/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-900/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-900/15" />
          <span className="mx-auto font-mono text-[10px] text-ink-500 sm:text-[11px]">
            talentdrobe.app · {guestHeroStoryPhaseLabels[phase]}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-accent-lime/40 bg-accent-lime/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-900">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime-dark" />
            Live
          </span>
        </div>

        <div className="relative min-h-[320px] bg-paper-100/60 sm:min-h-[380px]">
          <AnimatePresence mode="wait">
            {phase === "upload" ? <UploadScene /> : null}
            {phase === "assemble" ? <AssembleScene /> : null}
            {phase === "profile" ? <ProfileScene /> : null}
            {phase === "match" ? <MatchScene /> : null}
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-center">
            <AnimatePresence mode="wait">
              <CopilotWhisper key={`${phase}-${whisperIndex}`} text={activeWhisper} />
            </AnimatePresence>
          </div>
        </div>

        <PhaseRail phase={phase} />
      </div>

      <p className="mt-3 text-center text-[11px] text-paper-100/50">
        Auto-preview · same flow after you sign up
      </p>
    </motion.div>
  );
}
