"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Building2, MapPin } from "lucide-react";

import { guest3Agencies, type Guest3Agency } from "@/constants/guest-3";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 4500;

function AgencyRow({ agency }: { agency: Guest3Agency }) {
  return (
    <div className="rounded-xl border border-accent-lime/40 bg-accent-lime/[0.12] px-3.5 py-3 sm:px-4 sm:py-3.5">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/80 ring-1 ring-accent-lime/30">
          <Building2 className="h-3.5 w-3.5 text-accent-lime-dark" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink-600">
            {agency.specialty}
          </p>
          <p className="mt-0.5 text-[14px] font-semibold leading-snug text-ink-950">{agency.name}</p>
          <p className="mt-0.5 text-[11px] font-medium text-accent-lime-dark">{agency.roles}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-ink-500">
            <MapPin className="h-3 w-3 shrink-0 opacity-70" />
            {agency.location}
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-ink-600">{agency.blurb}</p>
        </div>
      </div>
    </div>
  );
}

/** Auto-cycling agency list for the guest-3 right rail. */
export function Guest3AgenciesList({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const total = guest3Agencies.length;
  const agency = guest3Agencies[index];

  useEffect(() => {
    if (prefersReducedMotion || total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, total]);

  return (
    <section className={cn("flex min-h-0 flex-col", className)}>
      <div className="mb-2.5 flex shrink-0 items-center justify-between gap-2 border-b border-ink-900/10 pb-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-700">
            Agencies hiring
          </span>
        </div>
        <div className="flex shrink-0 gap-1">
          {guest3Agencies.map((item, i) => (
            <span
              key={item.id}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === index ? "w-3 bg-accent-lime-dark" : "w-1 bg-ink-900/15",
              )}
            />
          ))}
        </div>
      </div>

      <div className="relative min-h-[9.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={agency.id}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <AgencyRow agency={agency} />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-2 shrink-0 text-[10px] font-medium text-ink-500">
        120+ vetted agencies · filtered to your profile
      </p>
    </section>
  );
}
