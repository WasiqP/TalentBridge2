import type { Solution } from "@/types";

export const solutions: Solution[] = [
  {
    slug: "recruiter",
    title: "For Recruiters",
    hero: "Source smarter. Reply warmer. Close faster.",
    description:
      "Stop drowning in Boolean searches and cold templates. TalentBridge handles the busywork so you can spend your day in real conversations.",
    challenges: [
      "Burned out on sourcing across 8 tabs",
      "Outreach replies hovering near 12%",
      "Spending hours screening unqualified resumes",
      "Reporting that takes longer than the hire",
    ],
    outcomes: [
      { metric: "10x", label: "Faster sourcing per role" },
      { metric: "3.2x", label: "Higher reply rate" },
      { metric: "72%", label: "Less manual work" },
    ],
    capabilities: [
      {
        title: "Autonomous candidate sourcing",
        description:
          "Agents work across LinkedIn, GitHub, and the open web — building qualified pipelines while you focus on conversations.",
      },
      {
        title: "Outreach that sounds like you",
        description:
          "Drafts written in your voice, referencing each candidate's actual work — every sequence is editable before send.",
      },
      {
        title: "One inbox, every channel",
        description:
          "Email, LinkedIn, and SMS replies surface in a single thread per candidate — no more lost messages.",
      },
    ],
  },
  {
    slug: "hiring-manager",
    title: "For Hiring Managers",
    hero: "Better shortlists. Sharper decisions. Less waiting.",
    description:
      "Move from job posted to interview-ready shortlist in under 48 hours, with explainable scoring you can defend in any debrief.",
    challenges: [
      "Recruiters bringing too many off-spec candidates",
      "No visibility into pipeline until it stalls",
      "Scoring decisions that feel arbitrary",
      "Endless calibration loops with the recruiting team",
    ],
    outcomes: [
      { metric: "38h", label: "Time-to-first-interview" },
      { metric: "94%", label: "Shortlist relevance" },
      { metric: "2.5x", label: "Decisions per week" },
    ],
    capabilities: [
      {
        title: "Custom rubrics, explained",
        description:
          "Define what 'great' looks like for your role. Every score comes with a transparent rationale you can challenge.",
      },
      {
        title: "Calibrated shortlists",
        description:
          "Daily shortlists tuned to your feedback — the system learns from every thumbs-up and skip.",
      },
      {
        title: "Pipeline visibility",
        description:
          "Real-time funnel, stage drop-off, and recruiter load — surfaced before your weekly sync.",
      },
    ],
  },
  {
    slug: "hr-lead",
    title: "For HR Leaders",
    hero: "Hiring intelligence at the org level.",
    description:
      "Equip every recruiter with a senior copilot. Standardize quality, surface bias, and prove hiring ROI to the board.",
    challenges: [
      "Inconsistent quality across recruiters",
      "Bias risks with no audit trail",
      "Cost-per-hire creeping up every quarter",
      "Board asks for hiring ROI you can't yet answer",
    ],
    outcomes: [
      { metric: "−54%", label: "Cost-per-hire" },
      { metric: "+38%", label: "Diverse candidate share" },
      { metric: "SOC 2", label: "Type II certified" },
    ],
    capabilities: [
      {
        title: "Built-in bias audits",
        description:
          "Quarterly audit dashboards across role, geography, and source. Mask sensitive attributes during evaluation.",
      },
      {
        title: "Compliance you can defend",
        description:
          "SOC 2 Type II, GDPR, CCPA, EU AI Act ready. Per-role data residency. Full export at any time.",
      },
      {
        title: "Org-level analytics",
        description:
          "Time-to-fill, quality-of-hire, source ROI, recruiter load — answers, not dashboards-of-dashboards.",
      },
    ],
  },
];
