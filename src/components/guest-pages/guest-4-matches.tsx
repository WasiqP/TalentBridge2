"use client";

import { motion } from "motion/react";
import { BadgeCheck, Wallet } from "lucide-react";

import { guest3AccentHex, guest3Matches } from "@/constants/guest-3";

const EASE = [0.22, 1, 0.36, 1] as const;
const MATCHES = guest3Matches.slice(0, 4);

/** Match list that fills in once ranking starts. */
export function Guest4Matches({ revealed }: { revealed: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-ink-950">Top matches</p>
        <motion.span
          initial={false}
          animate={{ opacity: revealed ? 1 : 0 }}
          className="text-[11px] text-ink-400"
        >
          {MATCHES.length} of 1,240 roles
        </motion.span>
      </div>

      <div className="mt-3 grid min-h-0 flex-1 gap-2.5 sm:grid-cols-2">
        {MATCHES.map((m, i) =>
          revealed ? (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: EASE }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-3.5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full blur-2xl"
                style={{ backgroundColor: guest3AccentHex[m.accent], opacity: 0.2 }}
              />
              <div className="relative flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-[13.5px] font-medium text-ink-950">
                    {m.title}
                  </h3>
                  <p className="truncate text-[11.5px] text-ink-500">{m.company}</p>
                </div>
                <span
                  className="shrink-0 rounded-lg px-2 py-1 text-[12px] font-semibold text-ink-950"
                  style={{ backgroundColor: `${guest3AccentHex[m.accent]}33` }}
                >
                  {m.match}
                </span>
              </div>

              <div className="relative mt-2.5 flex items-center gap-1.5 text-[11.5px] text-ink-600">
                <Wallet className="h-3.5 w-3.5 shrink-0 text-ink-500" />
                <span className="font-medium text-ink-900">{m.salary}</span>
              </div>

              <p className="relative mt-2 line-clamp-1 text-[11px] text-ink-500">
                <span className="font-medium text-ink-700">Why:</span>{" "}
                {m.matched.slice(0, 2).join(", ")}
              </p>

              <div className="relative mt-auto flex items-center gap-1 pt-2.5 text-[10.5px] font-medium text-ink-500">
                <BadgeCheck className="h-3.5 w-3.5 text-accent-lime-dark" />
                <span className="truncate">{m.verified}</span>
              </div>
            </motion.article>
          ) : (
            <div
              key={m.id}
              className="animate-pulse rounded-2xl border border-ink-900/8 bg-white p-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="h-3 w-1/2 rounded bg-ink-900/8" />
                <span className="h-6 w-8 rounded-lg bg-ink-900/8" />
              </div>
              <div className="mt-3 h-2.5 w-1/3 rounded bg-ink-900/8" />
              <div className="mt-2 h-2.5 w-3/4 rounded bg-ink-900/8" />
              <div className="mt-3 h-2.5 w-2/5 rounded bg-ink-900/8" />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
