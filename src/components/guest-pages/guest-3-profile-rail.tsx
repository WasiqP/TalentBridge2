"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getProfileInitials,
  jobSeekerProfile,
} from "@/config/job-seeker-profile";

const EASE = [0.22, 1, 0.36, 1] as const;

const profile = jobSeekerProfile;
const initials = getProfileInitials(profile.name);
const topSkills = profile.skillGroups.flatMap((g) => g.items).slice(0, 8);

function CompletenessRing({ value }: { value: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(15,15,22,0.1)" strokeWidth="5" />
        <motion.circle
          cx="32"
          cy="32"
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
      <span className="absolute inset-0 grid place-items-center text-[14px] font-semibold text-ink-950">
        {value}%
      </span>
    </div>
  );
}

export function Guest3ProfileRail({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Identity + completeness */}
      <div className="rounded-[20px] border border-ink-900/10 bg-white p-5">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink-950 text-[17px] font-semibold text-paper-50">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[17px] font-medium tracking-tight text-ink-950">
              {profile.name}
            </p>
            <p className="truncate text-[13px] text-ink-500">{profile.headline}</p>
            <p className="mt-0.5 truncate text-[12px] text-ink-400">{profile.location}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-ink-900/8 pt-5">
          <CompletenessRing value={profile.completeness} />
          <div>
            <p className="text-[13px] font-medium text-ink-950">Profile completeness</p>
            <p className="mt-0.5 text-[12px] text-ink-500">
              Parsed with {profile.parseConfidence}% confidence
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {profile.stats.map((s) => (
            <div key={s.id} className="rounded-xl bg-paper-100 px-2 py-2.5 text-center">
              <p className="text-[16px] font-semibold tabular-nums text-ink-950">
                {s.value}
                {s.suffix ?? ""}
              </p>
              <p className="mt-0.5 text-[10px] leading-tight text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-[20px] border border-ink-900/10 bg-white p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
          Skills detected
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-full border border-ink-900/8 bg-paper-100 px-2.5 py-1 text-[11.5px] font-medium text-ink-700"
            >
              <Check className="h-3 w-3 text-ink-950" strokeWidth={2.5} />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Complete your profile (enhancer) */}
      <div className="rounded-[20px] border border-ink-900/10 bg-white p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
          Reach 100%
        </p>
        <ul className="mt-2.5 space-y-2">
          {profile.completionItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-paper-100 px-3 py-2.5"
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
        <Button variant="lime" size="md" onClick={onSave} className="mt-4 w-full">
          Save my profile
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
