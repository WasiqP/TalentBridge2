/**
 * Content for the job-seeker guest landing page (`/guest-page`).
 * Kept separate from recruiter-facing marketing data.
 */

export type GuestAccent = "lime" | "violet" | "cyan" | "amber";

export type GuestJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  match: number;
  reason: string;
  tags: string[];
  accent: GuestAccent;
};

export const guestJobs: GuestJob[] = [
  {
    id: "gj1",
    title: "Senior Product Designer",
    company: "Northwind Labs",
    location: "Remote · US",
    type: "Full-time",
    salary: "$150k–$180k",
    match: 96,
    reason: "Your design-systems work maps directly to their B2B SaaS needs.",
    tags: ["Figma", "Design systems", "B2B"],
    accent: "lime",
  },
  {
    id: "gj2",
    title: "Frontend Engineer",
    company: "Cobalt",
    location: "Hybrid · Berlin",
    type: "Full-time",
    salary: "€80k–€105k",
    match: 93,
    reason: "Strong React + TypeScript signal and a shipped design portfolio.",
    tags: ["React", "TypeScript", "UI"],
    accent: "cyan",
  },
  {
    id: "gj3",
    title: "Product Manager, Growth",
    company: "Brightline",
    location: "Remote · EU",
    type: "Full-time",
    salary: "€95k–€120k",
    match: 90,
    reason: "Your activation experiments match their growth roadmap.",
    tags: ["Growth", "Analytics", "Roadmap"],
    accent: "violet",
  },
  {
    id: "gj4",
    title: "UX Researcher",
    company: "Atlas Mobility",
    location: "On-site · Amsterdam",
    type: "Contract",
    salary: "€600/day",
    match: 88,
    reason: "Mixed-methods research experience with regulated products.",
    tags: ["Research", "Interviews", "Synthesis"],
    accent: "amber",
  },
  {
    id: "gj5",
    title: "Design Engineer",
    company: "Verve",
    location: "Remote · Global",
    type: "Full-time",
    salary: "$130k–$160k",
    match: 87,
    reason: "Rare blend of motion design and production React skills.",
    tags: ["Motion", "React", "Prototyping"],
    accent: "lime",
  },
  {
    id: "gj6",
    title: "Staff Product Designer",
    company: "Lumen Health",
    location: "Hybrid · London",
    type: "Full-time",
    salary: "£95k–£120k",
    match: 85,
    reason: "Leadership track record and healthcare domain depth.",
    tags: ["Leadership", "Healthcare", "Strategy"],
    accent: "cyan",
  },
];

export const heroParseSteps = [
  "Reading your résumé",
  "Extracting skills & experience",
  "Building your profile",
  "Matching live roles",
] as const;

export const heroProfileSkills = [
  "Product design",
  "Design systems",
  "Figma",
  "Prototyping",
  "User research",
  "React",
] as const;

export const heroMatches = [
  { title: "Senior Product Designer", company: "Northwind Labs", match: 96, accent: "lime" as GuestAccent },
  { title: "Design Engineer", company: "Verve", match: 91, accent: "cyan" as GuestAccent },
  { title: "Product Manager, Growth", company: "Brightline", match: 88, accent: "violet" as GuestAccent },
];

export type AgentTurn = {
  from: "agent" | "user";
  text: string;
};

export const agentConversation: AgentTurn[] = [
  { from: "agent", text: "Hey Maya — I read your résumé. You're trending toward senior design + systems roles. Want me to focus there?" },
  { from: "user", text: "Yeah, but I'd also consider design-engineering hybrids." },
  { from: "agent", text: "Got it. I found 24 live roles. The strongest is a Senior Product Designer at Northwind — 96% match." },
  { from: "user", text: "What makes it a fit?" },
  { from: "agent", text: "Your design-systems work and B2B portfolio line up exactly. Pay is $150k–$180k, fully remote. Want me to tailor your résumé and apply?" },
  { from: "user", text: "Do it." },
  { from: "agent", text: "Done — tailored résumé sent, plus 3 backups queued. I'll watch for new matches and ping you." },
];

export type JourneyStep = {
  n: string;
  title: string;
  description: string;
  tag: string;
};

export const journeySteps: JourneyStep[] = [
  {
    n: "01",
    title: "Drop your résumé",
    description:
      "One file. No 12-field signup form. We parse it into a structured profile in seconds.",
    tag: "~10 seconds",
  },
  {
    n: "02",
    title: "Meet your agent",
    description:
      "Your AI career agent reads your background and talks through where you fit best.",
    tag: "1 conversation",
  },
  {
    n: "03",
    title: "See ranked matches",
    description:
      "A live feed of roles, each with a match score and the exact reason it fits you.",
    tag: "Explainable",
  },
  {
    n: "04",
    title: "Apply in one click",
    description:
      "The agent tailors your résumé per role and applies — you just approve.",
    tag: "Minimal clicks",
  },
];

export type SeekerFeature = {
  id: string;
  icon: string;
  title: string;
  description: string;
  span: "sm" | "md" | "lg";
  accent: GuestAccent;
};

export const seekerFeatures: SeekerFeature[] = [
  {
    id: "f1",
    icon: "ScanLine",
    title: "Profile in seconds",
    description:
      "Upload once. We turn your résumé into a rich, recruiter-ready profile — no manual typing.",
    span: "lg",
    accent: "lime",
  },
  {
    id: "f2",
    icon: "MessageCircle",
    title: "A career agent that talks",
    description:
      "Ask about salary, switching fields, or what to learn next. It answers with your context.",
    span: "md",
    accent: "violet",
  },
  {
    id: "f3",
    icon: "Sparkles",
    title: "Explainable matches",
    description: "Every role shows why it fits — no black-box scores.",
    span: "sm",
    accent: "cyan",
  },
  {
    id: "f4",
    icon: "FileEdit",
    title: "Résumé tailored per role",
    description: "The agent rewrites your résumé for each application automatically.",
    span: "sm",
    accent: "amber",
  },
  {
    id: "f5",
    icon: "BellRing",
    title: "Always-on job alerts",
    description:
      "Your agent watches the market 24/7 and pings you the moment a strong role opens.",
    span: "md",
    accent: "lime",
  },
  {
    id: "f6",
    icon: "MousePointerClick",
    title: "One-click apply",
    description: "Approve and you're in. No re-entering the same details ten times.",
    span: "lg",
    accent: "violet",
  },
];

export type SeekerMetric = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
};

export const seekerMetrics: SeekerMetric[] = [
  { value: 10, suffix: "s", label: "To build your profile", description: "From résumé upload to a complete, structured profile." },
  { value: 24, label: "Matched roles, instantly", description: "Average live roles surfaced on first upload." },
  { value: 3, suffix: "x", label: "More interviews", description: "Versus applying manually, per early users." },
  { value: 1, label: "Click to apply", description: "The agent tailors and submits — you approve." },
];
