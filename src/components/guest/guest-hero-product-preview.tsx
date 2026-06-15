"use client";

import {
  Briefcase,
  GraduationCap,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";

import {
  getProfileInitials,
  jobSeekerProfile,
} from "@/config/job-seeker-profile";
import { cn } from "@/lib/utils";

const profile = jobSeekerProfile;
const initials = getProfileInitials(profile.name);
const topSkills = profile.skillGroups.flatMap((g) => g.items).slice(0, 8);

/** Static extraction view — mirrors the dashboard build + status split. */
export function GuestHeroExtractionPreview({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "stage";
}) {
  const isStage = size === "stage";

  return (
    <div
      className={cn(
        "grid h-full grid-cols-1 gap-2 bg-paper-100 p-2 sm:grid-cols-[1.15fr_0.85fr] sm:gap-2.5 sm:p-2.5",
        isStage ? "min-h-[480px]" : "min-h-[380px]",
        className,
      )}
    >
      <div className="overflow-hidden rounded-xl border border-ink-900/10 bg-paper-50">
        <div className="border-b border-ink-900/8 px-3 py-2">
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-ink-400">
            Live assembly
          </p>
          <p className="text-[11px] font-semibold text-ink-950">Your profile is taking shape</p>
        </div>
        <div className="space-y-2 p-2.5">
          <PreviewBlock icon={UserRound} label="Identity" status="Placed">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-lime/20 text-[10px] font-semibold">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-ink-950">{profile.name}</p>
                <p className="truncate text-[9px] text-ink-500">{profile.headline}</p>
              </div>
            </div>
          </PreviewBlock>
          <PreviewBlock icon={Briefcase} label="Experience & skills" status="Building">
            <div className="flex flex-wrap gap-1">
              {topSkills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-ink-900/10 bg-paper-100 px-1.5 py-0.5 text-[8px] font-medium text-ink-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </PreviewBlock>
          <PreviewBlock icon={GraduationCap} label="Education & summary" status="Queued">
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-ink-900/8" />
              <div className="h-1.5 w-4/5 rounded-full bg-ink-900/8" />
            </div>
          </PreviewBlock>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-ink-900/10 bg-paper-50">
        <div className="border-b border-ink-900/8 px-3 py-2">
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-ink-400">
            Resume extraction
          </p>
          <p className="text-[11px] font-semibold text-ink-950">Building your profile</p>
        </div>
        <div className="space-y-2 p-2.5">
          <div className="rounded-lg border border-ink-900/10 bg-paper-100 px-2.5 py-2">
            <p className="truncate text-[10px] font-semibold text-ink-950">resume.pdf</p>
            <p className="text-[8px] text-ink-500">Reading your resume…</p>
          </div>
          {["Reading your resume", "Extracting experience", "Creating profile draft"].map(
            (step, index) => (
              <div
                key={step}
                className="flex items-center gap-2 rounded-lg border border-ink-900/8 px-2 py-1.5"
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    index === 0 ? "bg-accent-lime" : "bg-ink-900/20",
                  )}
                />
                <p className="text-[9px] font-medium text-ink-700">{step}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/** Static profile view — mirrors the post-parse profile layout. */
export function GuestHeroProfilePreview({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "stage";
}) {
  const isStage = size === "stage";

  return (
    <div
      className={cn(
        "h-full bg-paper-50 p-2.5 sm:p-3",
        isStage ? "min-h-[480px]" : "min-h-[380px]",
        className,
      )}
    >
      <div className="mb-2.5 flex items-start justify-between gap-2 border-b border-ink-900/8 pb-2.5">
        <div>
          <p className="inline-flex items-center gap-1 text-[8px] font-medium uppercase tracking-[0.14em] text-ink-400">
            <Sparkles className="h-2.5 w-2.5 text-accent-lime-dark" />
            Profile complete
          </p>
          <p className="mt-0.5 text-[12px] font-semibold text-ink-950">
            Your profile is ready, {profile.name.split(" ")[0]}
          </p>
        </div>
        <span className="rounded-full border border-accent-lime/35 bg-accent-lime/15 px-2 py-0.5 text-[8px] font-semibold text-ink-900">
          {profile.parseConfidence}% parse confidence
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,34%)_minmax(0,1fr)] gap-2">
        <div className="space-y-2">
          <div className="rounded-xl border border-ink-900/10 bg-paper-50 p-2 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-lime/30 to-accent-violet/20 text-[11px] font-semibold">
              {initials}
            </div>
            <p className="mt-1.5 text-[10px] font-semibold text-ink-950">{profile.name}</p>
            <p className="text-[8px] text-ink-500">{profile.headline}</p>
            <p className="mt-1.5 inline-flex items-center gap-0.5 text-[8px] text-ink-500">
              <MapPin className="h-2 w-2" />
              {profile.location}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {profile.stats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-lg border border-ink-900/10 bg-paper-50 px-1 py-1.5 text-center"
              >
                <p className="text-[10px] font-semibold text-ink-950">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="text-[7px] leading-tight text-ink-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-xl border border-ink-900/10 bg-paper-50 p-2 shadow-sm">
            <p className="text-[9px] font-semibold text-ink-950">Summary</p>
            <p className="mt-1 line-clamp-3 text-[8px] leading-relaxed text-ink-600">
              {profile.summary}
            </p>
          </div>
          <div className="rounded-xl border border-ink-900/10 bg-paper-50 p-2 shadow-sm">
            <p className="text-[9px] font-semibold text-ink-950">Experience</p>
            <p className="mt-1 text-[9px] font-medium text-ink-950">
              {profile.experience[0]?.role}
            </p>
            <p className="text-[8px] text-ink-500">{profile.experience[0]?.company}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {topSkills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-ink-900/10 bg-paper-100 px-1.5 py-0.5 text-[7px] font-medium text-ink-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewBlock({
  icon: Icon,
  label,
  status,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  status: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-2">
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-ink-900/10 bg-paper-100">
          <Icon className="h-2.5 w-2.5 text-ink-700" aria-hidden />
        </span>
        <p className="flex-1 text-[9px] font-semibold text-ink-950">{label}</p>
        <span className="text-[7px] font-semibold uppercase tracking-[0.1em] text-ink-500">
          {status}
        </span>
      </div>
      {children}
    </div>
  );
}
