"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import { perceptionUs } from "@/constants/guest-3";

const EASE = [0.22, 1, 0.36, 1] as const;

const SKILLS = [
  "Design systems",
  "Figma",
  "0→1 product",
  "Prototyping",
  "Team leadership",
  "User research",
];

/** Profile that builds itself once the preview starts. */
export function Guest4ProfilePanel({ revealed }: { revealed: boolean }) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-ink-900/8 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-ink-950">Your profile</p>
        <motion.span
          initial={false}
          animate={{ opacity: revealed ? 1 : 0 }}
          className="font-mono text-[11px] text-accent-lime-dark"
        >
          96% complete
        </motion.span>
      </div>

      {/* Identity */}
      <div className="mt-4 flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0">
          {revealed ? (
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-[15px] font-semibold text-accent-lime"
            >
              {perceptionUs.initials}
            </motion.span>
          ) : (
            <span className="block h-12 w-12 animate-pulse rounded-2xl bg-ink-900/8" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          {revealed ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
            >
              <p className="truncate text-[15px] font-medium text-ink-950">
                {perceptionUs.name}
              </p>
              <p className="truncate text-[12px] text-ink-500">{perceptionUs.role}</p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <span className="block h-3 w-2/3 animate-pulse rounded bg-ink-900/8" />
              <span className="block h-2.5 w-1/2 animate-pulse rounded bg-ink-900/8" />
            </div>
          )}
        </div>
      </div>

      {/* Completeness bar */}
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink-900/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-lime to-accent-lime-dark"
          initial={{ width: "0%" }}
          animate={{ width: revealed ? "96%" : "0%" }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </div>

      {/* Skills */}
      <p className="mt-5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-400">
        Skills extracted
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {SKILLS.map((skill, i) =>
          revealed ? (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.07, ease: EASE }}
              className="inline-flex items-center gap-1 rounded-full bg-accent-lime/20 px-2.5 py-1 text-[11px] font-medium text-ink-800"
            >
              <Check className="h-3 w-3 text-accent-lime-dark" strokeWidth={2.5} />
              {skill}
            </motion.span>
          ) : (
            <span
              key={skill}
              className="h-6 animate-pulse rounded-full bg-ink-900/8"
              style={{ width: `${56 + (i % 3) * 22}px` }}
            />
          ),
        )}
      </div>

      {/* Trajectory */}
      <div className="mt-auto pt-5">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-400">
          Trajectory
        </p>
        {revealed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-2 flex items-center gap-2 rounded-xl bg-paper-100 px-3 py-2"
          >
            <span className="text-[12px] font-medium text-ink-600">
              {perceptionUs.trajectory.split(" → ")[0]}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-accent-lime-dark" />
            <span className="text-[12px] font-medium text-ink-950">
              {perceptionUs.trajectory.split(" → ")[1]}
            </span>
          </motion.div>
        ) : (
          <span className="mt-2 block h-9 w-full animate-pulse rounded-xl bg-ink-900/8" />
        )}
      </div>
    </div>
  );
}
