/**
 * Content + types for guest page option 3 (`/guest-3`) — "Seen".
 * A warm scrollytelling story built on the research north star: make the seeker
 * feel seen as a person, not processed as a data point. Framework-agnostic data
 * only (imported by client components and the HR-news API route).
 */

export type Guest3Accent = "lime" | "violet" | "cyan" | "amber";

export const guest3AccentHex: Record<Guest3Accent, string> = {
  lime: "#c1f968",
  violet: "#8b5cf6",
  cyan: "#5eead4",
  amber: "#f5b942",
};

/* ------------------------------------------------------------------ */
/* Act 1 — the perception flip ("data point" vs "person")             */
/* ------------------------------------------------------------------ */

/** The cold, clinical way other platforms "see" a candidate. */
export const perceptionThem = {
  label: "How job boards see you",
  ref: "Candidate #4,182,905",
  fields: [
    { k: "Keywords", v: "12 matched" },
    { k: "Resume", v: "parsed · queued" },
    { k: "Fit score", v: "—" },
    { k: "Status", v: "1 of 2,400 applicants" },
  ],
  caption: "A row in a database. No story. No reply.",
};

/** The warm, human way TalentDrobe sees the same person. */
export const perceptionUs = {
  label: "How TalentDrobe sees you",
  name: "Maya Chen",
  initials: "MC",
  role: "Senior Product Designer · 8 yrs",
  summary:
    "Led 3 design teams, shipped 40+ features, quietly mentors every junior on the floor.",
  strengths: ["Design systems", "0→1 product", "Team leadership"],
  trajectory: "Senior IC → Design leadership",
  caption: "A person with a trajectory — read, understood, and matched.",
};

/* ------------------------------------------------------------------ */
/* Act 2 — matches that explain themselves                            */
/* ------------------------------------------------------------------ */

export type Guest3Match = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  /** Skills that already line up. */
  matched: string[];
  /** A growth edge, framed encouragingly. */
  stretch: string;
  /** Anti-ghost-job trust signal. */
  verified: string;
  accent: Guest3Accent;
};

export const guest3Matches: Guest3Match[] = [
  {
    id: "m1",
    title: "Senior Product Designer",
    company: "Northwind Labs",
    location: "Remote · US",
    salary: "$150k–$180k",
    match: 96,
    matched: ["Design systems", "Figma", "0→1 product"],
    stretch: "Design ops — you're one project away",
    verified: "Real recruiter · replied in 2 days",
    accent: "lime",
  },
  {
    id: "m2",
    title: "Staff Designer, Platform",
    company: "Verve",
    location: "Remote · Global",
    salary: "$165k–$195k",
    match: 92,
    matched: ["Prototyping", "Motion", "Front-end"],
    stretch: "Hardware UX — adjacent to your strengths",
    verified: "Verified role · hiring manager active",
    accent: "cyan",
  },
  {
    id: "m3",
    title: "Design Lead, Growth",
    company: "Brightline",
    location: "Hybrid · EU",
    salary: "€120k–€150k",
    match: 89,
    matched: ["Team leadership", "Experimentation", "Strategy"],
    stretch: "B2C funnels — a fresh surface for you",
    verified: "Real recruiter · 1 day response time",
    accent: "violet",
  },
  {
    id: "m4",
    title: "Principal Product Designer",
    company: "Lumen Health",
    location: "Hybrid · London",
    salary: "£110k–£140k",
    match: 87,
    matched: ["Design systems", "Mentorship", "Accessibility"],
    stretch: "Regulated healthcare — your rigor fits",
    verified: "Verified role · not a ghost listing",
    accent: "amber",
  },
];

/* ------------------------------------------------------------------ */
/* Act 3a — the handshake (no shouting into the void)                  */
/* ------------------------------------------------------------------ */

export const handshakeThem = [
  { label: "You applied", state: "done" as const },
  { label: "Silence", state: "void" as const },
  { label: "Silence", state: "void" as const },
  { label: "Was it even seen?", state: "void" as const },
];

export const handshakeUs = [
  { label: "You applied", time: "Mon", state: "done" as const },
  { label: "A human opened it", time: "Mon", state: "done" as const },
  { label: "Shortlisted", time: "Tue", state: "done" as const },
  { label: "They replied", time: "Wed", state: "active" as const },
];

/* ------------------------------------------------------------------ */
/* Act 3b — HR universe (live RSS)                                     */
/* ------------------------------------------------------------------ */

/** A normalized item from the HR-news RSS aggregator (`/api/hr-news`). */
export type HrSignal = {
  id: string;
  title: string;
  source: string;
  link: string;
  isoDate: string;
  snippet: string;
  category: string;
};

export const guest3HrPillars = [
  "Funding & hiring waves before they hit the boards",
  "Real-time salary & demand shifts in your niche",
  "Layoffs, policy, and people moves that matter to you",
] as const;

export type Guest3Agency = {
  id: string;
  name: string;
  specialty: string;
  roles: string;
  location: string;
  blurb: string;
};

export const guest3Agencies: Guest3Agency[] = [
  {
    id: "ag1",
    name: "Michael Page",
    specialty: "Product & Design",
    roles: "12 open roles",
    location: "Remote · US & EU",
    blurb: "Places senior ICs and design leads at mid-market SaaS firms.",
  },
  {
    id: "ag2",
    name: "Hired",
    specialty: "Engineering & Data",
    roles: "28 open roles",
    location: "Remote · Global",
    blurb: "Tech-focused recruiters with fast intro loops.",
  },
  {
    id: "ag3",
    name: "Creative Circle",
    specialty: "Creative & Brand",
    roles: "9 open roles",
    location: "Hybrid · NYC",
    blurb: "Agencies and in-house teams hiring designers and writers.",
  },
  {
    id: "ag4",
    name: "Robert Half",
    specialty: "Finance & Ops",
    roles: "16 open roles",
    location: "Hybrid · US",
    blurb: "Contract and full-time roles with clear pay bands upfront.",
  },
];

export type Guest3HowToStep = {
  step: number;
  title: string;
  detail: string;
};

export const guest3HowToSteps: Guest3HowToStep[] = [
  {
    step: 1,
    title: "Drop your résumé",
    detail: "We build your profile in seconds — skills, roles, and preferences included.",
  },
  {
    step: 2,
    title: "See roles that fit",
    detail: "Live jobs ranked by match %. Every listing shows why it fits you.",
  },
  {
    step: 3,
    title: "Ask the copilot",
    detail: "Salary, career pivots, skill gaps — answered using your real profile.",
  },
  {
    step: 4,
    title: "Apply in one click",
    detail: "Your agent tailors your résumé per role. You review and approve.",
  },
];

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

export const guest3Copy = {
  hero: {
    eyebrow: "Career intelligence, with a pulse",
    titleLead: "Other platforms see a data point.",
    titleAccent: "We see you.",
    description:
      "LinkedIn and Indeed process you into a profile and a number. TalentDrobe reads your story, explains every match, and never leaves you shouting into the void.",
    primaryCta: "Start free",
    primaryHref: "/sign-up",
    secondaryCta: "See how it sees you",
    footnote: "PDF, DOC & DOCX · No credit card",
  },
  matches: {
    eyebrow: "No black box",
    title: "Matches that explain themselves.",
    description:
      "Every role comes with the why, the pay, and a real human behind it — the three things every other platform hides.",
  },
  universe: {
    eyebrow: "More than a job portal",
    title: "Your HR universe, watched for you.",
    description:
      "While you live your life, your agent reads the whole talent market — so you move on opportunity before everyone else does.",
  },
  handshake: {
    eyebrow: "No more void",
    title: "Every application gets a human on the other side.",
    description:
      "The biggest failure in hiring is silence. We close the loop — you always know where you stand.",
  },
  cta: {
    title: "You deserve to be seen.",
    titleAccent: "Let's start.",
    description:
      "Drop your résumé once. The AI reads you, explains your matches, watches your market, and keeps a human in the loop.",
    primaryCta: "Start free",
    primaryHref: "/sign-up",
    secondaryCta: "Log in",
    secondaryHref: "/sign-in",
    footnote: "Built for job seekers · No credit card",
  },
};
