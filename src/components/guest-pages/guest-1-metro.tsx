"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowUpRight,
  BellRing,
  Briefcase,
  Building2,
  Gauge,
  MapPin,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type JobLite = { title: string; company: string; location: string; match: number };

const FALLBACK_JOBS: JobLite[] = [
  { title: "Senior Product Designer", company: "Northwind Labs", location: "Remote · US", match: 96 },
  { title: "Staff Frontend Engineer", company: "Cobalt", location: "Hybrid · Berlin", match: 93 },
  { title: "Product Manager, Growth", company: "Brightline", location: "Remote · EU", match: 90 },
];

const MATCH_FALLBACK = [96, 93, 90, 88, 85];

const tileVar: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const TILE_ANIMS = ["flip-y", "flip-x", "slide-up", "slide-left", "fade", "zoom"] as const;
type TileAnim = (typeof TILE_ANIMS)[number];

function tileAnimForIndex(index: number): TileAnim {
  return TILE_ANIMS[(index * 7 + 3) % TILE_ANIMS.length];
}

function tileCycleForIndex(index: number) {
  return {
    cycleMs: 14000 + ((index * 1379) % 8000),
    delayMs: 8000 + ((index * 911) % 6000),
  };
}

const TileScrollContext = createContext(false);

const AUTO_SCROLL_PX_PER_SEC = 11;

function useAutoScrollBody(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!active || !container || !content) {
      if (content) content.style.transform = "";
      return;
    }

    let raf = 0;
    let lastTs = 0;
    let offset = 0;
    let direction = 1;
    let pauseUntil = 0;

    const step = (ts: number) => {
      const maxOffset = Math.max(0, content.scrollHeight - container.clientHeight);
      if (maxOffset <= 2) {
        content.style.transform = "";
        raf = requestAnimationFrame(step);
        return;
      }

      if (ts < pauseUntil) {
        raf = requestAnimationFrame(step);
        return;
      }

      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      offset += direction * AUTO_SCROLL_PX_PER_SEC * dt;
      if (offset >= maxOffset) {
        offset = maxOffset;
        direction = -1;
        pauseUntil = ts + 1800;
      } else if (offset <= 0) {
        offset = 0;
        direction = 1;
        pauseUntil = ts + 2200;
      }

      content.style.transform = `translate3d(0, ${-offset}px, 0)`;
      raf = requestAnimationFrame(step);
    };

    const delay = setTimeout(() => {
      lastTs = 0;
      offset = 0;
      content.style.transform = "";
      raf = requestAnimationFrame(step);
    }, 900);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
      content.style.transform = "";
    };
  }, [active]);

  return { containerRef, contentRef };
}

function TileFace({
  surface,
  children,
  className,
  absolute = false,
}: {
  surface: string;
  children: ReactNode;
  className?: string;
  absolute?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex min-h-0 flex-col overflow-hidden rounded-[20px] p-5 sm:p-6",
        absolute ? "absolute inset-0 h-full" : "relative h-full min-h-[210px] sm:min-h-[230px]",
        surface,
        className,
      )}
    >
      {children}
    </div>
  );
}

function AnimatedTile({
  href,
  span,
  surface,
  anim,
  cycleMs,
  delayMs,
  front,
  back,
  reducedMotion,
}: {
  href: string;
  span?: string;
  surface: string;
  anim: TileAnim;
  cycleMs: number;
  delayMs: number;
  front: ReactNode;
  back: ReactNode;
  reducedMotion: boolean | null;
}) {
  const [autoBack, setAutoBack] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  const displayBack = hovered || autoBack;

  useEffect(() => {
    if (reducedMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = (ms: number) => {
      timer = setTimeout(() => {
        if (!hoveredRef.current) setAutoBack((v) => !v);
        schedule(cycleMs);
      }, ms);
    };
    schedule(delayMs);
    return () => clearTimeout(timer);
  }, [cycleMs, delayMs, reducedMotion]);

  const flipRotate = anim === "flip-x" || anim === "slide-left" ? "rotateX" : "rotateY";
  const flipValue = displayBack ? 180 : 0;
  const backFlipClass =
    anim === "flip-x" || anim === "slide-left" ? "[transform:rotateX(180deg)]" : "[transform:rotateY(180deg)]";

  return (
    <motion.div variants={tileVar} className={cn("min-w-0 h-full", span)}>
      <Link
        href={href}
        onMouseEnter={() => {
          hoveredRef.current = true;
          setHovered(true);
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
          setHovered(false);
        }}
        onFocus={() => {
          hoveredRef.current = true;
          setHovered(true);
        }}
        onBlur={() => {
          hoveredRef.current = false;
          setHovered(false);
        }}
        className={cn(
          "group relative block h-full min-h-[210px] overflow-hidden rounded-[20px] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:min-h-[230px]",
          !reducedMotion && "[perspective:1200px]",
        )}
        aria-label={displayBack && !reducedMotion ? "Feature details — click to sign up" : undefined}
      >
        <TileScrollContext.Provider value={displayBack && !reducedMotion}>
        {!reducedMotion ? (
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            animate={{ [flipRotate]: flipValue }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <TileFace surface={surface} className="[backface-visibility:hidden]">
              {front}
            </TileFace>
            <TileFace surface={surface} absolute className={cn("[backface-visibility:hidden]", backFlipClass)}>
              {back}
            </TileFace>
          </motion.div>
        ) : (
          <div className="relative min-h-[210px] sm:min-h-[230px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={!displayBack ? "front" : "back"}
                className={cn(
                  "relative flex min-h-[210px] flex-col overflow-hidden rounded-[20px] p-5 sm:min-h-[230px] sm:p-6",
                  surface,
                )}
              >
                <div className="flex h-full min-h-0 flex-col">
                  {!displayBack ? front : back}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        </TileScrollContext.Provider>
      </Link>
    </motion.div>
  );
}

function FeatureBack({
  title,
  icon: Icon,
  tone = "muted",
  paragraphs,
  bullets,
  footer,
  footerTone = "light",
}: {
  title: string;
  icon?: LucideIcon;
  tone?: "muted" | "dark" | "light" | "lime";
  paragraphs: string[];
  bullets?: string[];
  footer: string;
  footerTone?: "light" | "dark" | "lime" | "teal";
}) {
  const scrollActive = useContext(TileScrollContext);
  const { containerRef, contentRef } = useAutoScrollBody(scrollActive);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="shrink-0">
        <TileEyebrow icon={Icon} tone={tone}>
          {title}
        </TileEyebrow>
      </div>

      <div
        ref={containerRef}
        className={cn(
          "relative mt-3 min-h-0 flex-1 overflow-hidden",
          scrollActive &&
            "[mask-image:linear-gradient(to_bottom,transparent,black_6%,black_88%,transparent)]",
        )}
      >
        <div ref={contentRef} className="will-change-transform pr-0.5">
          <div className="space-y-2">
            {paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className={cn(
                  "text-[13px] leading-relaxed sm:text-[14px]",
                  tone === "light" && "text-paper-100/85",
                  tone === "lime" && "text-ink-900/85",
                  (tone === "muted" || tone === "dark") && "text-ink-600",
                )}
              >
                {p}
              </p>
            ))}
          </div>
          {bullets?.length ? (
            <ul
              className={cn(
                "mt-3 space-y-1.5 text-[12px] leading-relaxed sm:text-[13px]",
                tone === "light" && "text-paper-100/70",
                tone === "lime" && "text-ink-800/75",
                (tone === "muted" || tone === "dark") && "text-ink-500",
              )}
            >
              {bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="shrink-0 border-t border-current/10 pt-3">
        <FooterLink tone={footerTone}>{footer}</FooterLink>
      </div>
    </div>
  );
}

function FooterLink({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" | "lime" | "teal" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[12px] font-medium",
        tone === "dark" && "text-accent-lime",
        tone === "lime" && "text-ink-950",
        tone === "teal" && "text-paper-50/90",
        tone === "light" && "text-ink-500 group-hover:text-ink-950",
      )}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  );
}

function TileEyebrow({
  children,
  icon: Icon,
  tone = "muted",
}: {
  children: ReactNode;
  icon?: LucideIcon;
  tone?: "muted" | "dark" | "light" | "lime";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.16em]",
        tone === "muted" && "text-ink-500",
        tone === "dark" && "text-ink-900/60",
        tone === "light" && "text-paper-100/70",
        tone === "lime" && "text-ink-900/60",
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
      {children}
    </span>
  );
}

function StatBlock({
  value,
  suffix,
  tone = "dark",
}: {
  value: string;
  suffix?: string;
  tone?: "dark" | "light" | "lime";
}) {
  return (
    <div className="mt-3 flex items-end gap-2">
      <span
        className={cn(
          "font-mono text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-tight",
          tone === "dark" && "text-ink-950",
          tone === "light" && "text-paper-50",
          tone === "lime" && "text-ink-950",
        )}
      >
        {value}
      </span>
      {suffix ? (
        <span
          className={cn(
            "mb-1 text-[12px]",
            tone === "dark" && "text-ink-500",
            tone === "light" && "text-paper-100/55",
            tone === "lime" && "text-ink-800/70",
          )}
        >
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

/** Dashboard preview grid — rounded tiles, plain language, sample data until upload. */
export function Guest1Metro({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [jobCount, setJobCount] = useState<number | null>(null);
  const [topJob, setTopJob] = useState<JobLite>(FALLBACK_JOBS[0]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const jobsRes = await fetch("/api/jobs-feed");
        if (!jobsRes.ok) return;

        const d = (await jobsRes.json()) as {
          jobs?: { title: string; company: string; location: string }[];
          total?: number;
        };
        if (cancelled || !d.jobs?.length) return;

        setJobCount(d.total ?? d.jobs.length);
        const first = d.jobs[0];
        setTopJob({
          title: first.title,
          company: first.company,
          location: first.location,
          match: MATCH_FALLBACK[0],
        });
      } catch {
        /* keep fallbacks */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const jobCountLabel = jobCount ? jobCount.toLocaleString() : "1,200+";

  const tileMotion = useMemo(
    () => Array.from({ length: 8 }, (_, i) => ({ anim: tileAnimForIndex(i), ...tileCycleForIndex(i) })),
    [],
  );

  return (
    <section className={cn("w-full", className)} aria-label="What you get after uploading">
      <div className="mb-6 max-w-2xl sm:mb-8">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
          After your profile is ready
        </span>
        <h2 className="mt-1.5 text-[clamp(1.5rem,3vw,2.1rem)] font-medium leading-tight tracking-[-0.02em] text-ink-950">
          Here&apos;s what unlocks next.
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-500 sm:text-[15px]">
          You don&apos;t need to explore everything now — upload a résumé and these show up with your
          data.
        </p>
      </div>

      <motion.div
        variants={prefersReducedMotion ? undefined : { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[minmax(230px,auto)] lg:gap-5"
      >
        <AnimatedTile
          href="/sign-up"
          surface="bg-ink-950 text-paper-50"
          span="sm:col-span-2 lg:col-span-2 lg:row-span-2"
          anim={tileMotion[0].anim}
          cycleMs={tileMotion[0].cycleMs}
          delayMs={tileMotion[0].delayMs}
          reducedMotion={prefersReducedMotion}
          front={
            <>
              <div className="absolute inset-0 gradient-mesh opacity-40" aria-hidden />
              <div className="relative flex h-full flex-col">
                <TileEyebrow tone="light">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
                  </span>
                  Live roles
                </TileEyebrow>
                <StatBlock value={jobCountLabel} suffix="open now" tone="light" />
                <div className="mt-auto rounded-2xl border border-paper-50/10 bg-paper-50/[0.04] p-3">
                  <span className="text-[9.5px] font-medium uppercase tracking-[0.14em] text-paper-100/45">
                    Example match
                  </span>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-paper-50">{topJob.title}</p>
                      <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-paper-100/55">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {topJob.company} · {topJob.location}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-accent-lime/40 bg-accent-lime/15 px-2 py-0.5 text-[11px] font-semibold text-accent-lime">
                      {topJob.match}%
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <FooterLink tone="dark">Browse jobs</FooterLink>
                </div>
              </div>
            </>
          }
          back={
            <>
              <div className="absolute inset-0 gradient-mesh opacity-40" aria-hidden />
              <div className="relative z-10 h-full min-h-0">
                <FeatureBack
                title="Live roles"
                tone="light"
                paragraphs={[
                  "Every role in your dashboard is pulled from live feeds — agencies, boards, and direct employer listings — then ranked against your profile.",
                  "Match scores update as you refine skills and experience, so the list stays relevant instead of going stale.",
                ]}
                bullets={[
                  "Filter by remote, salary band, and seniority",
                  "See why each role fits before you apply",
                  "New listings surface within minutes, not days",
                ]}
                footer="Browse jobs"
                footerTone="dark"
              />
              </div>
            </>
          }
        />

        <AnimatedTile
          href="/sign-up"
          surface="bg-accent-lime text-ink-950"
          span="lg:col-span-2"
          anim={tileMotion[1].anim}
          cycleMs={tileMotion[1].cycleMs}
          delayMs={tileMotion[1].delayMs}
          reducedMotion={prefersReducedMotion}
          front={
            <>
              <TileEyebrow tone="lime">Career copilot</TileEyebrow>
              <p className="mt-3 text-[clamp(1.05rem,2vw,1.2rem)] font-medium leading-snug tracking-[-0.02em]">
                Ask anything about your career — salary, switching fields, what to learn next.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-800/75">
                It answers using your profile, not generic advice.
              </p>
              <div className="mt-auto pt-4">
                <FooterLink tone="lime">Try the copilot</FooterLink>
              </div>
            </>
          }
          back={
            <FeatureBack
              title="Career copilot"
              tone="lime"
              paragraphs={[
                "A career coach that already knows your résumé, target roles, and gaps — so answers are specific to you.",
                "Ask about negotiation scripts, pivot paths, or what skills to pick up next and get actionable steps, not blog posts.",
              ]}
              bullets={[
                "Compare offers with market context",
                "Draft outreach messages in your voice",
                "Plan learning paths tied to open roles",
              ]}
              footer="Try the copilot"
              footerTone="lime"
            />
          }
        />

        <AnimatedTile
          href="/sign-up"
          surface="border border-ink-900/8 bg-white"
          span="lg:col-span-2"
          anim={tileMotion[2].anim}
          cycleMs={tileMotion[2].cycleMs}
          delayMs={tileMotion[2].delayMs}
          reducedMotion={prefersReducedMotion}
          front={
            <>
              <TileEyebrow icon={Briefcase} tone="muted">
                One-click apply
              </TileEyebrow>
              <p className="mt-3 text-[clamp(1.05rem,2vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-ink-950">
                Approve and you&apos;re in.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                Your agent tailors your résumé per role — no copy-pasting the same answers.
              </p>
              <div className="mt-auto pt-4">
                <FooterLink>See how apply works</FooterLink>
              </div>
            </>
          }
          back={
            <FeatureBack
              title="One-click apply"
              icon={Briefcase}
              tone="muted"
              paragraphs={[
                "Your agent reads the job description, rewrites bullet points to match keywords, and fills application forms — you just approve.",
                "Every submission keeps your core story consistent while highlighting what each employer cares about.",
              ]}
              bullets={[
                "Tailored résumé per role in seconds",
                "Cover letters generated from your profile",
                "Track what was sent and when",
              ]}
              footer="See how apply works"
            />
          }
        />

        <AnimatedTile
          href="/sign-up"
          surface="border border-ink-900/8 bg-paper-100"
          span="lg:col-span-2"
          anim={tileMotion[3].anim}
          cycleMs={tileMotion[3].cycleMs}
          delayMs={tileMotion[3].delayMs}
          reducedMotion={prefersReducedMotion}
          front={
            <>
              <TileEyebrow icon={Sparkles} tone="muted">
                Matches
              </TileEyebrow>
              <StatBlock value="12" suffix="fit you" tone="dark" />
              <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                Roles ranked to your skills and experience — not a generic job board dump.
              </p>
              <div className="mt-auto pt-4">
                <FooterLink>See matches</FooterLink>
              </div>
            </>
          }
          back={
            <FeatureBack
              title="Matches"
              icon={Sparkles}
              tone="muted"
              paragraphs={[
                "We score every role against your skills, seniority, location prefs, and career trajectory — then sort by fit, not recency.",
                "You see a short explanation for each match so you know why it landed on your list.",
              ]}
              bullets={[
                "Skill overlap and gap analysis per role",
                "Deprioritize industries you want to avoid",
                "Refresh daily as new roles appear",
              ]}
              footer="See matches"
            />
          }
        />

        <AnimatedTile
          href="/sign-up"
          surface="border border-ink-900/8 bg-white"
          span="lg:col-span-2"
          anim={tileMotion[4].anim}
          cycleMs={tileMotion[4].cycleMs}
          delayMs={tileMotion[4].delayMs}
          reducedMotion={prefersReducedMotion}
          front={
            <>
              <TileEyebrow icon={Gauge} tone="muted">
                Résumé
              </TileEyebrow>
              <StatBlock value="?" suffix="/ 100" tone="dark" />
              <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                Upload your résumé to see your score and what to improve.
              </p>
              <div className="mt-auto pt-4">
                <FooterLink>Upload résumé</FooterLink>
              </div>
            </>
          }
          back={
            <FeatureBack
              title="Résumé"
              icon={Gauge}
              tone="muted"
              paragraphs={[
                "Get a clarity score based on impact language, structure, ATS readability, and alignment with roles you want.",
                "Actionable fixes show up inline — weak bullets, missing metrics, and skills employers expect.",
              ]}
              bullets={[
                "Side-by-side before/after suggestions",
                "Keyword gaps for your target titles",
                "Export polished versions instantly",
              ]}
              footer="Upload résumé"
            />
          }
        />

        <AnimatedTile
          href="/sign-up"
          surface="border border-ink-900/8 bg-white"
          span="lg:col-span-2"
          anim={tileMotion[5].anim}
          cycleMs={tileMotion[5].cycleMs}
          delayMs={tileMotion[5].delayMs}
          reducedMotion={prefersReducedMotion}
          front={
            <>
              <TileEyebrow icon={Briefcase} tone="muted">
                Applications sent
              </TileEyebrow>
              <StatBlock value="18" suffix="this month" tone="dark" />
              <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                Track every application from one place — status updates included.
              </p>
              <div className="mt-auto pt-4">
                <FooterLink>View pipeline</FooterLink>
              </div>
            </>
          }
          back={
            <FeatureBack
              title="Applications sent"
              icon={Briefcase}
              tone="muted"
              paragraphs={[
                "One pipeline for every application — submitted, viewed, interview, offer, or pass — with timestamps and notes.",
                "No more spreadsheets or digging through email threads to remember where you stand.",
              ]}
              bullets={[
                "Status changes logged automatically",
                "Follow-up reminders when things go quiet",
                "See which résumé version was used",
              ]}
              footer="View pipeline"
            />
          }
        />

        <AnimatedTile
          href="/sign-up"
          surface="border border-ink-900/8 bg-paper-100"
          span="lg:col-span-2"
          anim={tileMotion[6].anim}
          cycleMs={tileMotion[6].cycleMs}
          delayMs={tileMotion[6].delayMs}
          reducedMotion={prefersReducedMotion}
          front={
            <>
              <TileEyebrow icon={Building2} tone="muted">
                Agencies
              </TileEyebrow>
              <StatBlock value="120+" suffix="vetted" tone="dark" />
              <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                Recruiters who already work with candidates like you.
              </p>
              <div className="mt-auto pt-4">
                <FooterLink>Explore agencies</FooterLink>
              </div>
            </>
          }
          back={
            <FeatureBack
              title="Agencies"
              icon={Building2}
              tone="muted"
              paragraphs={[
                "Browse recruiters and agencies filtered by your industry, level, and location — all vetted for response quality.",
                "See who places candidates with your background and what roles they typically fill.",
              ]}
              bullets={[
                "Direct intro requests from your profile",
                "Agency specialties and recent placements",
                "Opt in only to partners you choose",
              ]}
              footer="Explore agencies"
            />
          }
        />

        <AnimatedTile
          href="/sign-up"
          surface="bg-[#0ea5a0] text-paper-50"
          span="lg:col-span-2"
          anim={tileMotion[7].anim}
          cycleMs={tileMotion[7].cycleMs}
          delayMs={tileMotion[7].delayMs}
          reducedMotion={prefersReducedMotion}
          front={
            <>
              <TileEyebrow icon={BellRing} tone="light">
                Job alerts
              </TileEyebrow>
              <StatBlock value="24" suffix="/ 7 on" tone="light" />
              <p className="mt-2 text-[13px] leading-relaxed text-paper-100/70">
                We watch the market and ping you when a role fits your profile.
              </p>
              <div className="mt-auto pt-4">
                <FooterLink tone="teal">Set alert preferences</FooterLink>
              </div>
            </>
          }
          back={
            <FeatureBack
              title="Job alerts"
              icon={BellRing}
              tone="light"
              paragraphs={[
                "Set once: target titles, salary floor, remote/hybrid, and industries. We monitor feeds around the clock.",
                "Alerts fire only when a role clears your match threshold — not every keyword hit on a job board.",
              ]}
              bullets={[
                "Instant email or in-app notifications",
                "Snooze or tighten rules anytime",
                "Weekly digest of near-miss roles",
              ]}
              footer="Set alert preferences"
              footerTone="teal"
            />
          }
        />
      </motion.div>
    </section>
  );
}
