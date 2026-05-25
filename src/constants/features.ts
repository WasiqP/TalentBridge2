import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    id: "sourcing",
    title: "Autonomous Sourcing",
    description:
      "Agents scan LinkedIn, GitHub, and the open web around the clock — building qualified pipelines while you sleep.",
    icon: "Radar",
    highlights: [
      "Multi-channel sourcing",
      "Boolean-free queries",
      "EU + US sources",
    ],
    span: "xl",
  },
  {
    id: "ranking",
    title: "Signal-First Ranking",
    description:
      "Every candidate is scored against your role rubric with explainable reasoning — no black box.",
    icon: "BarChart3",
    highlights: ["Custom rubrics", "Explainable AI", "Bias guards"],
    span: "md",
  },
  {
    id: "outreach",
    title: "Personalized Outreach",
    description:
      "Drafts written in your voice, referencing real candidate work — replies up 3.2x vs templates.",
    icon: "Mail",
    highlights: ["Tone matching", "Multi-touch sequences", "Reply detection"],
    span: "md",
  },
  {
    id: "screening",
    title: "Resume Intelligence",
    description:
      "Parses 2,000 resumes per minute. Extracts skills, projects, signal strength, and red flags.",
    icon: "FileScan",
    highlights: ["Real-time parsing", "Skills graph", "Duplicate detection"],
    span: "md",
  },
  {
    id: "insights",
    title: "Pipeline Insights",
    description:
      "Live diagnostics across funnel, recruiter load, and time-to-hire — surfaced before you ask.",
    icon: "LineChart",
    highlights: ["Funnel analytics", "Recruiter load", "Forecasts"],
    span: "md",
  },
  {
    id: "integrations",
    title: "Works With Your Stack",
    description:
      "Two-way sync with Greenhouse, Lever, Workday, Ashby, Notion, and Slack — zero data lock-in.",
    icon: "Plug",
    highlights: ["ATS sync", "SSO + SCIM", "Open API"],
    span: "lg",
  },
];
