"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
  TriangleAlert,
  Upload,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────── score ring ─── */

function ScoreRing({
  value,
  size = 96,
  strokeWidth = 7,
  trackOpacity = 0.08,
  color = "var(--color-ink-950)",
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  trackOpacity?: number;
  color?: string;
}) {
  const r = size / 2 - strokeWidth;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`rgba(15,15,22,${trackOpacity})`}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <span
            className="font-semibold text-ink-950 leading-none"
            style={{ fontSize: size * 0.225 }}
          >
            {value}
          </span>
          <span
            className="text-ink-400 block leading-none"
            style={{ fontSize: size * 0.13 }}
          >
            /100
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── career health widget ─── */

const IMPROVEMENTS = [
  { label: "Add portfolio link", pts: 12 },
  { label: "Fix 2016–2018 dates", pts: 8 },
  { label: "Rewrite opening summary", pts: 6 },
] as const;

const TOP_SKILLS = ["Figma", "Design Systems", "Prototyping", "UX Research"];

function CareerHealthWidget() {
  return (
    <div className="w-full max-w-[368px] rounded-[28px] border border-ink-900/10 bg-white p-6 shadow-[0_32px_64px_-32px_rgba(8,8,12,0.18)]">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-ink-950 text-[15px] font-semibold text-paper-50">
          JA
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium tracking-tight text-ink-950">
            Jordan Avery
          </p>
          <p className="truncate text-[12px] text-ink-500">Senior Product Designer</p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
          </span>
          Active
        </span>
      </div>

      <div className="mb-3 flex items-center gap-4 rounded-2xl bg-paper-50 px-4 py-3">
        <ScoreRing value={78} size={64} strokeWidth={6} trackOpacity={0.1} />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ink-400">
            Résumé Score
          </p>
          <p className="mt-0.5 text-[22px] font-semibold leading-none tracking-tight text-ink-950">
            78
            <span className="text-[13px] font-normal text-ink-400"> /100</span>
          </p>
          <p className="mt-1 text-[11px] text-ink-500">3 quick improvements ready</p>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-paper-50 px-3 py-2.5">
          <p className="text-[20px] font-semibold tracking-tight text-ink-950">23</p>
          <p className="text-[11px] text-ink-500">Active matches</p>
        </div>
        <div className="rounded-2xl bg-paper-50 px-3 py-2.5">
          <p className="text-[17px] font-semibold tracking-tight text-ink-950">$175k</p>
          <p className="text-[11px] text-ink-500">Salary ceiling</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {TOP_SKILLS.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-ink-950/5 px-2.5 py-1 text-[11px] font-medium text-ink-700"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="space-y-1.5">
        {IMPROVEMENTS.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2",
              i === 0
                ? "border-accent-lime/30 bg-accent-lime/8"
                : "border-ink-900/8 bg-white",
            )}
          >
            <ChevronRight
              className={cn("h-3 w-3 shrink-0", i === 0 ? "text-ink-700" : "text-ink-300")}
            />
            <span className="flex-1 text-[12px] text-ink-700">{item.label}</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-ink-500 shadow-[inset_0_0_0_1px_rgba(15,15,22,0.08)]">
              +{item.pts} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── feature panels ─── */

function UploadPanel() {
  const steps = ["Résumé received", "Skills extracted", "Experience mapped", "Profile live"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((p) => (p >= steps.length - 1 ? 0 : p + 1)),
      900,
    );
    return () => window.clearInterval(id);
  }, [steps.length]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-paper-50 px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink-950">
          <FileText className="h-4 w-4 text-paper-50" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-ink-800">resume_jordan_avery.pdf</p>
          <p className="text-[11px] text-ink-400">124 KB · 2 pages</p>
        </div>
        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-lime" />
      </div>
      <div className="space-y-1.5">
        {steps.map((step, i) => (
          <div
            key={step}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors duration-300",
              i <= active ? "bg-ink-950 text-paper-50" : "bg-paper-50 text-ink-400",
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                i <= active ? "bg-white/15 text-paper-50" : "bg-ink-900/8 text-ink-500",
              )}
            >
              {i < active ? "✓" : i + 1}
            </span>
            <span className="text-[12px] font-medium">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScorePanel() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 rounded-2xl bg-paper-50 px-4 py-3">
        <ScoreRing value={78} size={60} strokeWidth={6} />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-400">
            Score improved
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[13px] text-ink-400 line-through">52</span>
            <span className="text-[22px] font-semibold tracking-tight text-ink-950">78</span>
          </div>
          <p className="text-[11px] text-ink-500">after 3 copilot edits</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {[
          { text: "Portfolio link added to header", pts: "+12 pts" },
          { text: "Date gap 2016–18 resolved", pts: "+8 pts" },
          { text: "Opening summary rewritten", pts: "+6 pts" },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2 rounded-xl border border-ink-900/8 bg-white px-3 py-2"
          >
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent-lime" />
            <span className="flex-1 text-[12px] text-ink-700">{item.text}</span>
            <span className="text-[11px] font-medium text-ink-500">{item.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchPanel() {
  const jobs = [
    { role: "Senior Product Designer", company: "Northwind Labs", salary: "$140k–$175k", match: 94 },
    { role: "Lead UX Designer", company: "Meridian AI", salary: "$130k–$160k", match: 90 },
    { role: "Product Design Lead", company: "Strata Health", salary: "$125k–$155k", match: 86 },
  ];
  return (
    <div className="space-y-2">
      {jobs.map((job) => (
        <div
          key={job.company}
          className="flex items-center gap-3 rounded-2xl border border-ink-900/8 bg-white px-4 py-3"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-[11px] font-semibold text-paper-50">
            {job.company.charAt(0)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-ink-900">{job.role}</p>
            <p className="truncate text-[11px] text-ink-500">
              {job.company} · {job.salary}
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
              job.match >= 90
                ? "bg-accent-lime/20 text-ink-800"
                : "bg-ink-950/6 text-ink-600",
            )}
          >
            {job.match}%
          </span>
        </div>
      ))}
    </div>
  );
}

function CopilotPanel() {
  const messages = [
    { role: "user" as const, text: "What are they likely to ask about my 2018 gap?" },
    {
      role: "ai" as const,
      text: "Frame it around the freelance projects you ran — mention the Redbrick Health Systems contract and what you shipped. Interviewers want intent, not just a date.",
    },
    { role: "user" as const, text: "Can you give me a one-liner for that?" },
    {
      role: "ai" as const,
      text: '"I spent that time consulting for early-stage health-tech teams — I owned end-to-end design on three products that launched within 18 months."',
    },
  ];
  return (
    <div className="space-y-2 max-h-[200px] overflow-y-auto" data-lenis-prevent>
      {messages.map((msg, i) => (
        <div
          key={i}
          className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
        >
          <div
            className={cn(
              "max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-relaxed",
              msg.role === "user"
                ? "bg-ink-950 text-paper-50 rounded-br-md"
                : "bg-paper-50 text-ink-800 border border-ink-900/8 rounded-bl-md",
            )}
          >
            {msg.role === "ai" && (
              <span className="mb-1 flex items-center gap-1 text-[10px] font-medium text-ink-400">
                <Sparkles className="h-2.5 w-2.5" />
                Copilot
              </span>
            )}
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────── score meter ─── */

function ScoreMeter({
  value,
  animate,
  color = "var(--color-ink-950)",
  delay = 0.2,
}: {
  value: number;
  animate: boolean;
  color?: string;
  delay?: number;
}) {
  const r = 54;
  const strokeW = 9;
  const size = (r + strokeW) * 2;
  const c = Math.PI * r;
  const offset = c - (c * value) / 100;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={r + strokeW + 2}
        viewBox={`0 0 ${size} ${r + strokeW + 2}`}
        style={{ overflow: "visible", display: "block" }}
      >
        <path
          d={`M ${strokeW} ${r + strokeW} A ${r} ${r} 0 0 1 ${size - strokeW} ${r + strokeW}`}
          fill="none" stroke="rgba(15,15,22,0.08)" strokeWidth={strokeW} strokeLinecap="round"
        />
        <motion.path
          d={`M ${strokeW} ${r + strokeW} A ${r} ${r} 0 0 1 ${size - strokeW} ${r + strokeW}`}
          fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: animate ? offset : c }}
          transition={{ duration: 1.5, ease: EASE, delay }}
        />
      </svg>
      <div className="mt-2 text-center">
        <span className="text-[2.6rem] font-semibold leading-none tracking-tight text-ink-950">{value}</span>
        <span className="text-[12px] text-ink-400">/100</span>
      </div>
    </div>
  );
}

const BEFORE_DIMS = [
  { label: "ATS Compatibility", value: 12, max: 25, delay: 0 },
  { label: "Impact & Outcomes", value: 14, max: 25, delay: 0.07 },
  { label: "Clarity & Narrative", value: 11, max: 25, delay: 0.14 },
  { label: "Completeness", value: 15, max: 25, delay: 0.21 },
] as const;

const AFTER_DIMS = [
  { label: "ATS Compatibility", value: 18, max: 25, delay: 0.05 },
  { label: "Impact & Outcomes", value: 22, max: 25, delay: 0.12 },
  { label: "Clarity & Narrative", value: 16, max: 25, delay: 0.19 },
  { label: "Completeness", value: 22, max: 25, delay: 0.26 },
] as const;

function ScoreReportSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="border-y border-ink-900/8 bg-white px-6 py-16 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
            The TalentDrobe difference
          </p>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold leading-tight tracking-[-0.025em] text-ink-950">
            Most résumés are weaker than you think.
            <br />
            <span className="text-ink-400">Yours doesn&apos;t have to be.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink-500">
            We analyzed 10,000 résumés. The average score before TalentDrobe is&nbsp;
            <span className="font-medium text-ink-800">51/100</span>. After, users average&nbsp;
            <span className="font-medium text-ink-800">83</span> — in under 10 minutes.
          </p>
        </motion.div>

        {/* before / after cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_72px_1fr]">

          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="rounded-[24px] border border-ink-900/10 bg-paper-50 p-6"
          >
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
              Before TalentDrobe
            </p>
            <p className="mb-5 text-[12px] text-ink-500">Average résumé — unoptimized</p>

            <ScoreMeter value={52} animate={inView} color="rgba(15,15,22,0.3)" delay={0.3} />

            <div className="mt-5 space-y-2.5">
              {BEFORE_DIMS.map((d) => (
                <div key={d.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[11px] text-ink-500">{d.label}</span>
                    <span className="text-[11px] font-medium tabular-nums text-ink-500">
                      {d.value}<span className="text-ink-300">/{d.max}</span>
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-ink-950/8">
                    <motion.div
                      className="h-full rounded-full bg-ink-950/30"
                      initial={{ width: 0 }}
                      animate={{ width: inView ? `${(d.value / d.max) * 100}%` : 0 }}
                      transition={{ duration: 1, ease: EASE, delay: d.delay + 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-red-50 px-3 py-2.5">
              <TriangleAlert className="h-3.5 w-3.5 shrink-0 text-red-500" />
              <span className="text-[12px] text-red-700">Rejected by 72% of ATS filters</span>
            </div>
          </motion.div>

          {/* center connector */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="rounded-full bg-accent-lime/20 px-3 py-1.5 text-center">
                <p className="text-[13px] font-bold text-ink-900">+26</p>
                <p className="text-[9px] font-medium uppercase tracking-wide text-ink-500">pts</p>
              </div>
              <div className="h-8 w-px bg-ink-900/10 lg:hidden" />
              <ArrowRight className="hidden h-5 w-5 text-ink-300 lg:block" />
            </motion.div>
          </div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            className="rounded-[24px] border border-ink-900/10 bg-white p-6 shadow-[0_8px_40px_-16px_rgba(8,8,12,0.14)]"
          >
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-600">
              After TalentDrobe
            </p>
            <p className="mb-5 text-[12px] text-ink-500">Same person. Optimized résumé.</p>

            <ScoreMeter value={78} animate={inView} delay={0.4} />

            <div className="mt-5 space-y-2.5">
              {AFTER_DIMS.map((d) => (
                <div key={d.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[11px] text-ink-700">{d.label}</span>
                    <span className="text-[11px] font-medium tabular-nums text-ink-800">
                      {d.value}<span className="text-ink-400">/{d.max}</span>
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-ink-950/8">
                    <motion.div
                      className="h-full rounded-full bg-ink-950"
                      initial={{ width: 0 }}
                      animate={{ width: inView ? `${(d.value / d.max) * 100}%` : 0 }}
                      transition={{ duration: 1, ease: EASE, delay: d.delay + 0.4 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-accent-lime/15 px-3 py-2.5">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-ink-700" />
              <span className="text-[12px] text-ink-700">23 matched roles · 40+ with 3 fixes applied</span>
            </div>
          </motion.div>
        </div>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.5 }}
          className="mt-5 grid grid-cols-3 divide-x divide-ink-900/8 overflow-hidden rounded-[20px] border border-ink-900/8 bg-paper-50"
        >
          {[
            { value: "3", label: "changes made" },
            { value: "+26 pts", label: "score gained" },
            { value: "14", label: "more matches" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-4 text-center">
              <p className="text-[18px] font-semibold tracking-tight text-ink-950">{stat.value}</p>
              <p className="text-[11px] text-ink-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── before / after ─── */

const BEFORE_LINES = [
  { text: "Experienced designer with a strong portfolio and background in product design.", issue: true },
  { text: "Worked at various companies doing design and improving user experiences.", issue: true },
  { text: "Skilled in Figma, prototyping, and working with cross-functional teams.", issue: false },
  { text: "References available on request.", issue: true },
] as const;

const AFTER_LINES = [
  {
    text: "Senior Product Designer with 8 years lifting user activation by 23% at scale — most recently owning design for a workflow tool used by 40k+ B2B users.",
    highlight: true,
  },
  {
    text: "Led design from 0→1 at Northwind Labs (Series B), shipping 14 features across a 2-week cadence while building the design system from scratch.",
    highlight: true,
  },
  { text: "Expert in Figma, design tokens, and component libraries — used by a team of 6 designers.", highlight: false },
] as const;

function BeforeAfterPanel() {
  const [tab, setTab] = useState<"before" | "after">("before");

  return (
    <div className="rounded-[24px] border border-ink-900/10 bg-white overflow-hidden shadow-[0_2px_24px_rgba(8,8,12,0.04)]">
      <div className="flex border-b border-ink-900/8">
        {(["before", "after"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-3 text-[13px] font-medium transition-colors",
              tab === t
                ? "bg-ink-950 text-paper-50"
                : "text-ink-500 hover:text-ink-800 hover:bg-paper-50",
            )}
          >
            {t === "before" ? "Before TalentDrobe" : "After TalentDrobe"}
          </button>
        ))}
      </div>

      <div className="p-5 min-h-[200px]">
        {tab === "before" ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600">
                Score: 52/100
              </span>
              <span className="text-[11px] text-ink-400">3 critical issues detected</span>
            </div>
            {BEFORE_LINES.map((line, i) => (
              <div key={i} className="flex items-start gap-2.5">
                {line.issue ? (
                  <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-200" />
                )}
                <p className={cn("text-[13px] leading-relaxed", line.issue ? "text-ink-600" : "text-ink-400")}>
                  {line.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-full bg-accent-lime/20 px-2.5 py-1 text-[11px] font-medium text-ink-800">
                Score: 78/100
              </span>
              <span className="flex items-center gap-1 text-[11px] text-ink-400">
                <Sparkles className="h-3 w-3" /> Copilot rewrote 3 lines
              </span>
            </div>
            {AFTER_LINES.map((line, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2
                  className={cn(
                    "mt-0.5 h-3.5 w-3.5 shrink-0",
                    line.highlight ? "text-accent-lime" : "text-ink-200",
                  )}
                />
                <p
                  className={cn(
                    "text-[13px] leading-relaxed",
                    line.highlight ? "text-ink-900 font-[450]" : "text-ink-400",
                  )}
                >
                  {line.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BeforeAfterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white border-y border-ink-900/8 px-6 py-16 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 max-w-xl"
        >
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
            Résumé rewrite
          </p>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.025em] text-ink-950">
            See the difference copilot makes.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
            The opening paragraph — the section recruiters read first — rewritten in one click.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <BeforeAfterPanel />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── feature grid ─── */

const FEATURE_PANELS = [
  {
    id: "upload",
    icon: Upload,
    step: "01",
    title: "Upload & Parse",
    tagline: "60 seconds to a live profile",
    description:
      "Drop your résumé and watch TalentDrobe extract every skill, role, and milestone — structured, searchable, and ready to score.",
    Panel: UploadPanel,
  },
  {
    id: "score",
    icon: Target,
    step: "02",
    title: "Score & Improve",
    tagline: "Know exactly what's holding you back",
    description:
      "Your résumé gets a precision score. Every issue comes with a one-click copilot fix — no guesswork, no generic advice.",
    Panel: ScorePanel,
  },
  {
    id: "match",
    icon: Zap,
    step: "03",
    title: "Match & Apply",
    tagline: "Roles ranked by fit, not keywords",
    description:
      "AI reads between the lines to surface roles that match your actual trajectory — salary expectations, culture fit, and growth path included.",
    Panel: MatchPanel,
  },
  {
    id: "copilot",
    icon: MessageCircle,
    step: "04",
    title: "Prepare & Win",
    tagline: "A copilot that knows your story",
    description:
      "TalentDrobe knows your full history. Ask anything — from salary negotiation to behavioral round prep — and get answers rooted in your actual experience.",
    Panel: CopilotPanel,
  },
] as const;

function FeatureCard({
  feature,
  delay,
}: {
  feature: (typeof FEATURE_PANELS)[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = feature.icon;
  const Panel = feature.Panel;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="flex flex-col rounded-[24px] border border-ink-900/10 bg-white p-6 shadow-[0_2px_24px_rgba(8,8,12,0.04)]"
    >
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-950">
            <Icon className="h-4 w-4 text-paper-50" />
          </span>
          <span className="text-[11px] font-medium text-ink-300">{feature.step}</span>
        </div>
        <h3 className="text-[17px] font-semibold tracking-tight text-ink-950">
          {feature.title}
        </h3>
        <p className="mt-0.5 text-[12px] font-medium text-ink-600">{feature.tagline}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{feature.description}</p>
      </div>
      <div className="mt-auto">
        <Panel />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────── sections ─── */

const ANALYZE_STEPS = [
  "Reading résumé structure…",
  "Checking ATS pass rate…",
  "Scanning for impact gaps…",
  "Generating score…",
] as const;

function HeroUploadWidget() {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-[28px] border border-ink-900/10 bg-white shadow-[0_32px_72px_-28px_rgba(8,8,12,0.18)]">
      <div className="p-5">
        <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-ink-900/10 bg-paper-50 px-6 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-950/6">
            <Upload className="h-5 w-5 text-ink-700" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink-800">Drop your résumé here</p>
            <p className="mt-0.5 text-[12px] text-ink-400">PDF or Word · scored in seconds</p>
          </div>
          <button
            type="button"
            className="mt-1 rounded-full bg-ink-950 px-5 py-2 text-[13px] font-medium text-white transition hover:bg-ink-800"
          >
            Browse files
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-ink-900/8 bg-paper-50 px-4 py-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-950">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
        <span className="text-[12px] text-ink-500">AI copilot · ask anything about your résumé</span>
      </div>
    </div>
  );
}

const JOURNEY_STEPS = [
  {
    step: "01",
    label: "Score your résumé",
    sub: "Upload in seconds. AI reads every line and returns a precise score with ranked fixes.",
    badge: "78 / 100",
    badgeNote: "Good — top 32%",
    icon: TrendingUp,
    preview: (
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5">
          <span className="text-[12px] text-ink-700">ATS Compatibility</span>
          <span className="text-[12px] font-medium text-ink-950">18 / 25</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5">
          <span className="text-[12px] text-ink-700">Impact & Outcomes</span>
          <span className="text-[12px] font-medium text-ink-950">22 / 25</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5">
          <span className="text-[12px] text-ink-700">Clarity & Narrative</span>
          <span className="text-[12px] font-medium text-ink-950">16 / 25</span>
        </div>
      </div>
    ),
  },
  {
    step: "02",
    label: "See your matches",
    sub: "Instantly browse roles that fit your score. Salary ranges, match %, company name — all surfaced for you.",
    badge: "23 matches",
    badgeNote: "Ready to apply",
    icon: Target,
    preview: (
      <div className="space-y-2">
        {[
          { title: "Senior Product Designer", co: "Stripe", match: "94%" },
          { title: "Design Systems Lead", co: "Linear", match: "87%" },
          { title: "Product Designer II", co: "Vercel", match: "82%" },
        ].map((j) => (
          <div key={j.title} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5">
            <div className="h-7 w-7 shrink-0 rounded-lg bg-ink-950/8" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-ink-800">{j.title}</p>
              <p className="text-[11px] text-ink-400">{j.co}</p>
            </div>
            <span className="shrink-0 rounded-full bg-accent-lime/20 px-2 py-0.5 text-[11px] font-medium text-ink-800">{j.match}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    step: "03",
    label: "Apply in one tap",
    sub: "Your profile is pre-filled. One click submits to any matched role. Track every application in one place.",
    badge: "Applied ✓",
    badgeNote: "Sent to 23 companies",
    icon: Sparkles,
    preview: (
      <div className="space-y-3">
        <div className="rounded-xl bg-white px-4 py-3">
          <p className="text-[12px] font-medium text-ink-800">Senior Product Designer · Stripe</p>
          <p className="mt-0.5 text-[11px] text-ink-400">$145k – $185k · Remote · 94% match</p>
        </div>
        <button
          type="button"
          className="w-full rounded-xl bg-ink-950 py-2.5 text-[13px] font-medium text-white"
        >
          Apply now — 1 click
        </button>
        <div className="flex items-center gap-1.5 rounded-xl bg-accent-lime/15 px-3 py-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-ink-700" />
          <span className="text-[12px] text-ink-700">Application sent · tracked automatically</span>
        </div>
      </div>
    ),
  },
] as const;

function ApplyJourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      e.stopPropagation();
      rail.scrollLeft += e.deltaY;
    };
    rail.addEventListener("wheel", onWheel, { passive: false });
    return () => rail.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section ref={ref} className="bg-paper-50 py-16">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE }}
        className="mb-8 px-6 lg:px-12 xl:px-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
            The process
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-tight tracking-[-0.025em] text-ink-950">
            Strong résumé. Dozens of companies.
            <br />
            <span className="text-ink-400">Under 3 clicks.</span>
          </h2>
        </div>
      </motion.div>

      {/* horizontal scroll rail */}
      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto px-6 pb-6 lg:px-12 xl:px-20 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {JOURNEY_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
              className="w-[320px] shrink-0 snap-start rounded-[24px] border border-ink-900/10 bg-white p-5"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* step label + badge */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-400">{step.step}</span>
                  <Icon className="h-3.5 w-3.5 text-ink-500" />
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-ink-950">{step.badge}</p>
                  <p className="text-[11px] text-ink-400">{step.badgeNote}</p>
                </div>
              </div>

              {/* preview UI */}
              <div className="mb-4 rounded-2xl bg-paper-50 p-3">
                {step.preview}
              </div>

              {/* title + description */}
              <h3 className="text-[15px] font-semibold text-ink-950">{step.label}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{step.sub}</p>
            </motion.div>
          );
        })}

        {/* end spacer */}
        <div className="w-4 shrink-0" />
      </div>
    </section>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 lg:flex-row lg:gap-16 lg:px-12 xl:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex-1 max-w-[560px]"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-3 py-1.5 shadow-sm">
          <span className="flex h-1.5 w-1.5 rounded-full bg-accent-lime" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
            AI career copilot
          </span>
        </div>

        <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-950">
          Get scored.
          <br />
          Get matched.
          <br />
          <span className="text-ink-400">Get hired.</span>
        </h1>

        <p className="mt-6 max-w-[460px] text-[clamp(0.95rem,1.6vw,1.1rem)] leading-relaxed text-ink-500">
          TalentDrobe analyzes your résumé, identifies exactly what&apos;s holding you back, and
          surfaces roles that actually fit — so recruiters notice you before you even apply.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-6 py-3 text-[14px] font-medium text-paper-50 transition hover:bg-ink-800 active:scale-[0.98]"
          >
            Get my score free
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/12 bg-white px-5 py-3 text-[14px] font-medium text-ink-700 transition hover:border-ink-900/20 hover:bg-paper-50"
          >
            See how it works
          </button>
        </div>

        <p className="mt-4 text-[12px] text-ink-400">
          No credit card · Takes 60 seconds · Free for basics
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
        className="mt-12 w-full flex-shrink-0 lg:mt-0 lg:w-auto"
      >
        <HeroUploadWidget />
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="px-6 py-20 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
            How it works
          </p>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.025em] text-ink-950">
            Four moves. Thirty days.
            <br />
            Your next role.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
            Every step is powered by AI that reads your actual résumé — not a template, not a guess.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURE_PANELS.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="px-6 py-24 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-950">
            <TrendingUp className="h-6 w-6 text-accent-lime" />
          </div>

          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.03em] text-ink-950">
            Your career deserves clarity.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
            Upload your résumé, get your score, and see exactly where you stand — in under 60
            seconds. Free to start, no card needed.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-8 py-3.5 text-[14px] font-medium text-paper-50 transition hover:bg-ink-800 active:scale-[0.98]"
            >
              Upload my résumé
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-white px-6 py-3.5 text-[14px] font-medium text-ink-700 transition hover:bg-paper-50"
            >
              <Sparkles className="h-4 w-4" />
              Ask the copilot first
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] text-ink-400">
            {[
              "No credit card required",
              "Results in 60 seconds",
              "GDPR compliant",
              "Delete anytime",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-ink-300" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── page ─── */

export function Guest4Page() {
  return (
    <main className="min-h-svh bg-paper-50 text-ink-950">
      <HeroSection />
      <ScoreReportSection />
      <ApplyJourneySection />
      <FeaturesSection />
      <BeforeAfterSection />
      <CtaSection />
    </main>
  );
}
