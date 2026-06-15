"use client";

import { motion } from "motion/react";
import {
  Briefcase,
  FileText,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { guestJobs } from "@/constants/guest-page";
import { productSteps, type ProductStep } from "@/constants/guest-page";
import { getProfileInitials, jobSeekerProfile } from "@/config/job-seeker-profile";

const EASE = [0.22, 1, 0.36, 1] as const;
const profile = jobSeekerProfile;
const topMatch = guestJobs[0];
const initials = getProfileInitials(profile.name);

function StepPreview({ type }: { type: ProductStep["preview"] }) {
  if (type === "upload") {
    return (
      <div className="flex h-full min-h-[140px] flex-col items-center justify-center rounded-2xl border border-dashed border-accent-lime/40 bg-accent-lime/8 p-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-900/8 bg-paper-50 text-accent-lime-dark shadow-sm">
          <UploadCloud className="h-5 w-5" aria-hidden />
        </span>
        <p className="mt-3 text-[12px] font-medium text-ink-950">jordan-avery-resume.pdf</p>
        <p className="text-[10px] text-ink-500">Parsing via TalentDrobe API</p>
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className="grid h-full min-h-[140px] grid-cols-2 gap-2">
        {["Identity", "Skills"].map((label, i) => (
          <div
            key={label}
            className="rounded-xl border border-ink-900/10 bg-paper-50 p-2.5 shadow-sm"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              {label}
            </p>
            {i === 0 ? (
              <div className="mt-2 flex items-center gap-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-lime/20 text-[8px] font-bold">
                  {initials}
                </span>
                <p className="truncate text-[10px] font-semibold text-ink-950">
                  {profile.name}
                </p>
              </div>
            ) : (
              <div className="mt-2 flex flex-wrap gap-1">
                {profile.skillGroups[0]?.items.slice(0, 2).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-paper-100 px-1.5 py-0.5 text-[8px] text-ink-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[140px] flex-col justify-center rounded-2xl border border-accent-lime/35 bg-gradient-to-br from-accent-lime/12 to-paper-50 p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-ink-950">{topMatch.title}</p>
          <p className="text-[10px] text-ink-500">{topMatch.company}</p>
        </div>
        <span className="shrink-0 rounded-lg bg-accent-lime px-2 py-0.5 text-[11px] font-bold text-ink-950">
          {topMatch.match}%
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-ink-600">
        {topMatch.reason}
      </p>
    </div>
  );
}

/** Product-led three-step section — shows the real dashboard flow. */
export function GuestProductSteps() {
  return (
    <section className="relative overflow-hidden bg-paper-50 py-20 sm:py-28">
      <Container size="full">
        <FadeUp>
          <SectionHeading
            centered
            eyebrow="How it works"
            title={
              <>
                Three steps.{" "}
                <span className="font-serif italic text-ink-700">Same product as the hero.</span>
              </>
            }
            description="No illustrations — every frame mirrors the TalentDrobe dashboard you sign into."
          />
        </FadeUp>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {productSteps.map((step, index) => (
            <motion.article
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
              className="group flex flex-col overflow-hidden rounded-[26px] border border-ink-900/10 bg-paper-100/60 p-5 transition hover:border-ink-900/16 hover:shadow-[0_20px_60px_-32px_rgba(8,8,12,0.2)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-[36px] italic leading-none text-ink-200 transition-colors group-hover:text-accent-lime-dark">
                  {step.n}
                </span>
                <span className="rounded-full border border-accent-lime/35 bg-accent-lime/12 px-2.5 py-0.5 text-[11px] font-medium text-ink-800">
                  {step.tag}
                </span>
              </div>

              <div className="mt-4 rounded-[20px] border border-ink-900/8 bg-paper-50 p-3">
                <div className="mb-2 flex items-center gap-1.5 border-b border-ink-900/6 pb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-900/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-900/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-900/15" />
                  <span className="ml-auto font-mono text-[9px] text-ink-400">
                    talentdrobe.app
                  </span>
                </div>
                <StepPreview type={step.preview} />
              </div>

              <h3 className="mt-5 text-[18px] font-medium tracking-[-0.02em] text-ink-950">
                {step.title}
              </h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-500">
                {step.description}
              </p>

              <p className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-700">
                {step.preview === "upload" ? (
                  <FileText className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
                ) : step.preview === "profile" ? (
                  <Sparkles className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
                ) : (
                  <Briefcase className="h-3.5 w-3.5 text-accent-lime-dark" aria-hidden />
                )}
                Live dashboard UI
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
