import type { ChangelogEntry } from "@/types";

export const changelog: ChangelogEntry[] = [
  {
    version: "v3.4",
    date: "May 14, 2026",
    title: "Autonomous sourcing agents, GA",
    type: "feature",
    description:
      "Sourcing agents now run continuously across LinkedIn, GitHub, and the open web, building pipelines without manual triggers.",
    bullets: [
      "Per-role sourcing budgets",
      "Source diversity scoring",
      "Live activity feed in the recruiter dashboard",
    ],
  },
  {
    version: "v3.3",
    date: "April 28, 2026",
    title: "Explainable ranking 2.0",
    type: "improvement",
    description:
      "Every candidate score now ships with a structured rationale and confidence interval.",
    bullets: [
      "Structured pros / cons / gaps",
      "Confidence intervals on every signal",
      "One-click feedback that re-tunes the model",
    ],
  },
  {
    version: "v3.2",
    date: "April 6, 2026",
    title: "Workday + SmartRecruiters sync",
    type: "feature",
    description:
      "Two-way sync now available for Workday and SmartRecruiters, joining the existing Greenhouse, Lever, and Ashby integrations.",
  },
  {
    version: "v3.1",
    date: "March 18, 2026",
    title: "Bias audit dashboard",
    type: "feature",
    description:
      "A new quarterly bias audit dashboard, with masking controls and exportable reports for legal review.",
  },
  {
    version: "v3.0",
    date: "February 28, 2026",
    title: "Multi-agent pipeline mode",
    type: "feature",
    description:
      "The biggest release yet — TalentBridge is now a true multi-agent system. Sourcing, screening, outreach, and scheduling agents all coordinate in the background.",
    bullets: [
      "Per-role agent budgets",
      "Recruiter approval checkpoints",
      "Streaming activity log",
    ],
  },
  {
    version: "v2.9",
    date: "February 4, 2026",
    title: "Performance + reliability",
    type: "improvement",
    description:
      "P99 latency cut by 38% across all dashboards. New caching layer and SOC 2 Type II certification finalized.",
  },
  {
    version: "v2.8",
    date: "January 12, 2026",
    title: "Inbox unification",
    type: "improvement",
    description:
      "Email, LinkedIn, and SMS replies now surface in a single threaded view per candidate.",
  },
  {
    version: "v2.7",
    date: "December 9, 2025",
    title: "Outreach sequence editor",
    type: "feature",
    description:
      "Build multi-touch sequences with conditional logic — no separate tool required.",
  },
];
