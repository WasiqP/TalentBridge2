"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  ExternalLink,
  Heart,
  Handshake,
  MapPin,
  Mail,
  Star,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { JobSeekerSearchResult } from "@/config/job-seeker-search";
import { cn } from "@/lib/utils";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const easeInQuart = [0.76, 0, 0.24, 1] as const;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.32, ease: easeInQuart, delay: 0.04 },
  },
};

const sheetVariants = {
  hidden: { y: "100%", scale: 0.985 },
  visible: {
    y: 0,
    scale: 1,
    transition: {
      y: {
        type: "spring" as const,
        damping: 36,
        stiffness: 400,
        mass: 0.72,
      },
      scale: { duration: 0.45, ease: easeOutExpo },
    },
  },
  exit: {
    y: "100%",
    scale: 0.985,
    transition: {
      y: { duration: 0.44, ease: easeInQuart },
      scale: { duration: 0.36, ease: easeInQuart },
    },
  },
};

type JobDetailBottomSheetProps = {
  job: JobSeekerSearchResult | null;
  open: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (jobId: string) => void;
  onApply: (job: JobSeekerSearchResult) => void;
  onExitComplete?: () => void;
  favoriteReady?: boolean;
};

function ContentCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[20px] border border-ink-900/6 bg-white p-5 shadow-[0_2px_12px_rgba(8,8,12,0.04)] sm:rounded-[22px] sm:p-6",
        className,
      )}
    >
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-400">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1.5 rounded-2xl border px-4 py-3.5",
        highlight
          ? "border-accent-lime/35 bg-accent-lime/12"
          : "border-ink-900/6 bg-white",
      )}
    >
      <div className="flex items-center gap-1.5">
        <Icon
          className={cn(
            "h-3.5 w-3.5 shrink-0",
            highlight ? "text-accent-lime-dark" : "text-ink-400",
          )}
          strokeWidth={2}
          aria-hidden
        />
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-400">
          {label}
        </span>
      </div>
      <p
        className={cn(
          "text-[13px] font-medium leading-snug text-ink-900 sm:text-[14px]",
          highlight && "text-ink-950",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-[14px] leading-[1.6] text-ink-700 sm:text-[15px]"
        >
          <span
            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-lime-dark"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function JobDetailBottomSheet({
  job,
  open,
  onClose,
  isFavorite,
  onToggleFavorite,
  onApply,
  onExitComplete,
  favoriteReady = true,
}: JobDetailBottomSheetProps) {
  const titleId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!open && !job) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, job]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      scrollRef.current?.scrollTo({ top: 0 });
    }
    wasOpenRef.current = open;
  }, [open, job?.id]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && job ? (
        <div
          key={job.id}
          className="fixed inset-0 z-[100]"
          role="presentation"
        >
          <motion.button
            type="button"
            aria-label="Close job details"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-ink-950/45 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin: "bottom center" }}
            className="absolute bottom-0 left-0 right-0 flex h-[96dvh] max-h-[96dvh] flex-col overflow-hidden rounded-t-[28px] border border-b-0 border-ink-900/6 bg-white shadow-[0_-24px_80px_rgba(8,8,12,0.18)] will-change-[transform,opacity] sm:rounded-t-[32px]"
          >
            {/* Drag handle */}
            <div className="flex shrink-0 items-center justify-center px-6 pt-4 pb-2 sm:px-8 sm:pt-5">
              <div
                className="h-1 w-10 rounded-full bg-ink-900/15"
                aria-hidden
              />
            </div>

            <div
              ref={scrollRef}
              data-lenis-prevent
              data-lenis-prevent-wheel
              onWheel={(e) => e.stopPropagation()}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              {/* Hero */}
              <header className="mx-6 mt-1 rounded-[22px] border border-ink-900/6 bg-white p-6 shadow-[0_2px_16px_rgba(8,8,12,0.04)] sm:mx-8 sm:mt-2 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium text-ink-500 sm:text-[13px]">
                    <span>{job.postedAt}</span>
                    <span className="text-ink-300" aria-hidden>
                      ·
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" aria-hidden />
                      {job.applicantsCount} applicants
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-900/8 bg-white text-ink-700 transition hover:border-ink-900/15 hover:text-ink-950"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                  <h2
                    id={titleId}
                    className="min-w-0 flex-1 text-[22px] font-medium leading-[1.15] tracking-[-0.03em] text-ink-950 sm:text-[26px]"
                  >
                    {job.jobTitle}
                  </h2>
                  <div className="flex shrink-0 items-center gap-2 sm:pt-0.5">
                    <button
                      type="button"
                      disabled={!favoriteReady}
                      onClick={() => onToggleFavorite(job.id)}
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Save to favorites"
                      }
                      aria-pressed={isFavorite}
                      className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
                        isFavorite
                          ? "border-accent-lime/50 bg-accent-lime/25 text-ink-950"
                          : "border-ink-900/8 bg-white text-ink-700 hover:border-ink-900/15",
                      )}
                    >
                      <Heart
                        className={cn(
                          "h-[18px] w-[18px] transition-transform duration-300",
                          isFavorite &&
                            "scale-110 fill-accent-lime-dark text-accent-lime-dark",
                        )}
                        strokeWidth={2}
                      />
                    </button>
                    <Button
                      type="button"
                      variant="lime"
                      size="sm"
                      className="whitespace-nowrap px-4"
                      onClick={() => onApply(job)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>

                <div className="mt-2 flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-900/6 bg-white">
                    <Building2
                      className="h-5 w-5 text-ink-300"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[15px] font-medium text-ink-950 sm:text-[16px]">
                      {job.companyName}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-snug text-ink-500 sm:text-[14px]">
                      {job.companyMeta}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-ink-900/6 bg-white px-2.5 py-1 text-[12px] font-medium text-ink-800 sm:text-[13px]">
                    <Star
                      className="h-3.5 w-3.5 fill-accent-lime text-accent-lime-dark"
                      strokeWidth={0}
                      aria-hidden
                    />
                    {job.rating.toFixed(1)}
                    <span className="font-normal text-ink-500">
                      ({job.reviewCount})
                    </span>
                  </span>
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ink-900/6 bg-white px-2.5 py-1 text-[12px] font-medium text-ink-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-3.5">
                  <StatPill
                    icon={DollarSign}
                    label="Salary"
                    value={job.salaryRange}
                    highlight
                  />
                  <StatPill
                    icon={MapPin}
                    label="Location"
                    value={job.location}
                  />
                  <StatPill
                    icon={Briefcase}
                    label="Type"
                    value={job.employmentType}
                  />
                  <StatPill
                    icon={Clock}
                    label="Experience"
                    value={job.experience}
                  />
                </div>
              </header>

              {/* Body */}
              <div className="space-y-4 px-6 py-6 sm:space-y-5 sm:px-8 sm:py-7">
                <ContentCard title="About the role">
                  <p className="whitespace-pre-line text-[14px] leading-[1.7] text-ink-700 sm:text-[15px]">
                    {job.fullDescription}
                  </p>
                </ContentCard>

                <ContentCard title="What you'll do">
                  <BulletList items={job.responsibilities} />
                </ContentCard>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <ContentCard title="Requirements" className="h-full">
                    <BulletList items={job.requirements} />
                  </ContentCard>
                  <ContentCard title="Benefits & perks" className="h-full">
                    <BulletList items={job.benefits} />
                  </ContentCard>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <ContentCard title="Company">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-900/6 bg-white">
                          <Building2
                            className="h-5 w-5 text-ink-300"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        </div>
                        <p className="text-[15px] font-medium text-ink-950">
                          {job.companyName}
                        </p>
                      </div>
                      <p className="text-[14px] leading-[1.65] text-ink-700">
                        {job.companyAbout}
                      </p>
                      <a
                        href={job.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink-900/6 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-800 transition hover:border-ink-900/12"
                      >
                        Visit website
                        <ExternalLink className="h-3 w-3" aria-hidden />
                      </a>
                    </div>
                  </ContentCard>

                  <ContentCard
                    title="Hiring agency"
                    className="border-accent-lime/20 bg-accent-lime/[0.06]"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-lime/25 bg-accent-lime/15">
                          <Handshake
                            className="h-5 w-5 text-accent-lime-dark"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[15px] font-medium text-ink-950">
                            {job.hiringAgencyName}
                          </p>
                          <span className="mt-1 inline-flex items-center gap-1 text-[12px] text-ink-600">
                            <Star
                              className="h-3 w-3 fill-accent-lime text-accent-lime-dark"
                              strokeWidth={0}
                              aria-hidden
                            />
                            {job.hiringAgencyRating.toFixed(1)} rating
                          </span>
                        </div>
                      </div>
                      <p className="text-[14px] leading-[1.65] text-ink-700">
                        {job.hiringAgencyAbout}
                      </p>
                      <a
                        href={`mailto:${job.hiringAgencyEmail}`}
                        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink-900/6 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-800 transition hover:border-ink-900/12"
                      >
                        <Mail className="h-3 w-3" aria-hidden />
                        {job.hiringAgencyEmail}
                      </a>
                    </div>
                  </ContentCard>
                </div>
              </div>

              <div className="h-32 sm:h-36" aria-hidden />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 border-t border-ink-900/6 bg-white/95 px-6 py-5 backdrop-blur-md sm:px-8 sm:py-5">
              <div className="flex gap-3 sm:gap-3.5">
                <button
                  type="button"
                  disabled={!favoriteReady}
                  onClick={() => onToggleFavorite(job.id)}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Save to favorites"
                  }
                  aria-pressed={isFavorite}
                  className={cn(
                    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isFavorite
                      ? "border-accent-lime/50 bg-accent-lime/25 text-ink-950"
                      : "border-ink-900/8 bg-white text-ink-700 hover:border-ink-900/15",
                  )}
                >
                  <Heart
                    className={cn(
                      "h-[18px] w-[18px] transition-transform duration-300",
                      isFavorite &&
                        "scale-110 fill-accent-lime-dark text-accent-lime-dark",
                    )}
                    strokeWidth={2}
                  />
                </button>
                <Button
                  type="button"
                  variant="lime"
                  size="md"
                  className="min-w-0 flex-1"
                  onClick={() => onApply(job)}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
