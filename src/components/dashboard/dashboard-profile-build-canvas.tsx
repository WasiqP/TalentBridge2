"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  UserRound,
  Wand2,
} from "lucide-react";

import {
  getProfileInitials,
  type JobSeekerProfile,
} from "@/config/job-seeker-profile";
import type { ExtractionStep } from "@/components/dashboard/dashboard-extraction-panel";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type DashboardProfileBuildCanvasProps = {
  steps: ExtractionStep[];
  profile?: JobSeekerProfile | null;
  isComplete?: boolean;
  errorMessage?: string | null;
  /** Nested inside a parent flow container — softer chrome and copy. */
  embedded?: boolean;
  className?: string;
};

type BuildBlockConfig = {
  id: string;
  label: string;
  stage: number;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

const BUILD_BLOCKS: BuildBlockConfig[] = [
  { id: "identity", label: "Identity", stage: 1, icon: UserRound },
  { id: "experience", label: "Experience & skills", stage: 2, icon: Briefcase },
  { id: "education", label: "Education & summary", stage: 3, icon: GraduationCap },
  { id: "insights", label: "AI insights", stage: 4, icon: Sparkles },
];

function getBuildStage(steps: ExtractionStep[], isComplete: boolean) {
  if (isComplete) return 5;

  const runningStep = steps.find((step) => step.status === "running");
  if (runningStep) {
    const index = steps.findIndex((step) => step.id === runningStep.id);
    return Math.min(index + 1, 4);
  }

  const doneCount = steps.filter((step) => step.status === "done").length;
  return Math.min(doneCount + 1, 4);
}

function ShimmerBar({
  className,
  active = true,
}: {
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "h-3 rounded-full bg-ink-900/[0.06]",
        active && "relative overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {active ? (
        <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-ink-900/[0.08] to-transparent" />
      ) : null}
    </div>
  );
}

function BuildBlockShell({
  block,
  stage,
  isComplete,
  hasError,
  children,
}: {
  block: BuildBlockConfig;
  stage: number;
  isComplete: boolean;
  hasError: boolean;
  children: React.ReactNode;
}) {
  const Icon = block.icon;
  const isActive = stage === block.stage && !isComplete && !hasError;
  const isUnlocked = stage >= block.stage || isComplete;
  const isFilled = stage > block.stage || isComplete;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{
        opacity: isUnlocked ? 1 : 0.42,
        y: isUnlocked ? 0 : 12,
        scale: isUnlocked ? 1 : 0.98,
      }}
      transition={{ duration: 0.55, ease: EASE }}
      className={cn(
        "relative overflow-hidden rounded-[22px] border p-4 sm:rounded-[24px] sm:p-5",
        isFilled
          ? "border-accent-lime/30 bg-paper-50 shadow-[0_2px_20px_rgba(8,8,12,0.04)]"
          : isActive
            ? "border-ink-900/16 bg-paper-50 shadow-[0_4px_28px_rgba(8,8,12,0.06)]"
            : "border-ink-900/10 bg-paper-100/60",
      )}
    >
      {isActive ? (
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-lime/70 to-transparent"
          aria-hidden
        />
      ) : null}

      <div className="mb-3 flex items-center gap-2.5">
        <span
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-xl border text-ink-800 transition-colors",
            isFilled
              ? "border-accent-lime/35 bg-accent-lime/15"
              : isActive
                ? "border-ink-900/14 bg-paper-100"
                : "border-ink-900/10 bg-paper-50",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
            Block 0{block.stage}
          </p>
          <p className="text-[14px] font-semibold text-ink-950">{block.label}</p>
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
            isFilled
              ? "bg-accent-lime/20 text-ink-900"
              : isActive
                ? "bg-ink-950 text-paper-50"
                : "bg-ink-900/8 text-ink-500",
          )}
        >
          {isFilled ? "Placed" : isActive ? "Building" : "Queued"}
        </span>
      </div>

      {children}
    </motion.article>
  );
}

/**
 * Live preview of the profile being assembled while CV parsing runs.
 * Each extraction step unlocks the next building block on the left.
 */
export function DashboardProfileBuildCanvas({
  steps,
  profile,
  isComplete = false,
  errorMessage,
  embedded = false,
  className,
}: DashboardProfileBuildCanvasProps) {
  const stage = getBuildStage(steps, isComplete);
  const hasError = Boolean(errorMessage);
  const initials = profile?.name ? getProfileInitials(profile.name) : "··";
  const topSkills =
    profile?.skillGroups.flatMap((group) => group.items).slice(0, 6) ?? [];
  const topExperience = profile?.experience.slice(0, 2) ?? [];
  const progressPercent = isComplete ? 100 : Math.min(18 + stage * 20, 92);

  return (
    <section
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]",
        embedded ? "min-h-0" : "min-h-[min(640px,72vh)]",
        hasError && "opacity-90",
        className,
      )}
      aria-label="Profile assembly preview"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(8,8,12,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(8,8,12,0.03)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_88%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent-lime/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-accent-violet/10 blur-3xl"
        aria-hidden
      />

      <div className="relative border-b border-ink-900/8 px-5 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
              Live assembly
            </p>
            <p className="mt-1 text-[clamp(1.05rem,2.2vw,1.35rem)] font-medium tracking-[-0.02em] text-ink-950">
              {isComplete
                ? "Your profile is ready"
                : hasError
                  ? "Assembly paused"
                  : "Your profile is taking shape"}
            </p>
            <p className="mt-1 max-w-[42ch] text-[13px] leading-relaxed text-ink-500">
              {isComplete
                ? embedded
                  ? "Every section has been placed. Your full profile is below."
                  : "Every section has been placed. Opening the full profile next."
                : "Watch each block lock in as we read and structure your resume."}
            </p>
          </div>
          <div className="hidden shrink-0 rounded-2xl border border-ink-900/10 bg-paper-100 px-3 py-2 text-right sm:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-400">
              Progress
            </p>
            <p className="text-[20px] font-semibold tabular-nums text-ink-950">
              {progressPercent}%
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink-900/8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-violet"
            initial={{ width: "8%" }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>
      </div>

      <div
        className="relative flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5"
        data-lenis-prevent
        data-lenis-prevent-wheel
      >
        <BuildBlockShell
          block={BUILD_BLOCKS[0]}
          stage={stage}
          isComplete={isComplete}
          hasError={hasError}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className={cn(
                "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border text-[18px] font-semibold",
                stage >= 1 && profile?.name
                  ? "border-accent-lime/35 bg-gradient-to-br from-accent-lime/25 via-accent-cyan/15 to-accent-violet/15 text-ink-950"
                  : "border-ink-900/10 bg-paper-100 text-ink-400",
              )}
              animate={stage === 1 && !profile?.name ? { scale: [1, 1.03, 1] } : { scale: 1 }}
              transition={{ duration: 1.4, repeat: stage === 1 && !profile?.name ? Infinity : 0 }}
            >
              {profile?.name ? initials : "··"}
            </motion.div>
            <div className="min-w-0 flex-1 space-y-2">
              {profile?.name ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="truncate text-[16px] font-semibold text-ink-950"
                >
                  {profile.name}
                </motion.p>
              ) : (
                <ShimmerBar className="h-4 w-40" active={stage >= 1} />
              )}
              {profile?.headline ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="truncate text-[13px] text-ink-600"
                >
                  {profile.headline}
                </motion.p>
              ) : (
                <ShimmerBar className="h-3.5 w-56" active={stage >= 1} />
              )}
              {profile?.location ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[12px] text-ink-500"
                >
                  {profile.location}
                </motion.p>
              ) : (
                <ShimmerBar className="h-3 w-32" active={stage >= 1} />
              )}
            </div>
          </div>
        </BuildBlockShell>

        <BuildBlockShell
          block={BUILD_BLOCKS[1]}
          stage={stage}
          isComplete={isComplete}
          hasError={hasError}
        >
          <div className="space-y-3">
            {stage >= 2 && topExperience.length > 0 ? (
              topExperience.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease: EASE }}
                  className="rounded-2xl border border-ink-900/10 bg-paper-100/80 px-3.5 py-3"
                >
                  <p className="text-[13px] font-semibold text-ink-950">{role.role}</p>
                  <p className="text-[12px] text-ink-500">
                    {role.company} · {role.start} – {role.end}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="space-y-2">
                <ShimmerBar className="h-10 w-full" active={stage >= 2} />
                <ShimmerBar className="h-10 w-[88%]" active={stage >= 2} />
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              {stage >= 2 && topSkills.length > 0
                ? topSkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.04, duration: 0.28, ease: EASE }}
                      className="rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-1 text-[11px] font-medium text-ink-700"
                    >
                      {skill}
                    </motion.span>
                  ))
                : Array.from({ length: 5 }).map((_, index) => (
                    <ShimmerBar
                      key={index}
                      className="h-7 w-16 rounded-full"
                      active={stage >= 2}
                    />
                  ))}
            </div>
          </div>
        </BuildBlockShell>

        <BuildBlockShell
          block={BUILD_BLOCKS[2]}
          stage={stage}
          isComplete={isComplete}
          hasError={hasError}
        >
          {stage >= 3 && profile?.summary ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[13px] leading-relaxed text-ink-600"
            >
              {profile.summary.length > 180
                ? `${profile.summary.slice(0, 180)}…`
                : profile.summary}
            </motion.p>
          ) : (
            <div className="space-y-2">
              <ShimmerBar className="h-3 w-full" active={stage >= 3} />
              <ShimmerBar className="h-3 w-[94%]" active={stage >= 3} />
              <ShimmerBar className="h-3 w-[78%]" active={stage >= 3} />
            </div>
          )}

          {stage >= 3 && profile?.education[0] ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-3 rounded-2xl border border-ink-900/10 bg-paper-100/80 px-3.5 py-3"
            >
              <p className="text-[13px] font-semibold text-ink-950">
                {profile.education[0].degree}
              </p>
              <p className="text-[12px] text-ink-500">{profile.education[0].school}</p>
            </motion.div>
          ) : null}
        </BuildBlockShell>

        <BuildBlockShell
          block={BUILD_BLOCKS[3]}
          stage={stage}
          isComplete={isComplete}
          hasError={hasError}
        >
          {stage >= 4 || isComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-2xl border border-accent-lime/25 bg-accent-lime/10 px-3.5 py-3"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent-lime/30 bg-paper-50">
                <Wand2 className="h-4 w-4 text-accent-lime-dark" aria-hidden />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink-950">
                  {isComplete
                    ? "Improvement ideas are ready"
                    : "Scanning for quick wins"}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-600">
                  {isComplete
                    ? "We found ways to sharpen your profile before you start applying."
                    : "The copilot is reviewing gaps and polish opportunities in your draft."}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <ShimmerBar className="h-12 w-full rounded-2xl" active={stage >= 4} />
            </div>
          )}
        </BuildBlockShell>

        <AnimatePresence>
          {isComplete && !embedded ? (
            <motion.p
              key="ready"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-accent-lime/35 bg-accent-lime/12 px-4 py-3 text-center text-[13px] font-medium text-ink-900"
              role="status"
            >
              All blocks placed — opening your full profile…
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
