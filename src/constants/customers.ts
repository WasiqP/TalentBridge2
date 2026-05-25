import type { CustomerStory } from "@/types";

export const customerLogos = [
  "Northwind",
  "Quanta",
  "Lumen",
  "Arc Studios",
  "Helio AI",
  "Northstack",
  "Atlas",
  "Vela",
  "Foundry",
  "Orbital",
  "Nimbus",
  "Cascade",
];

export const customerStories: CustomerStory[] = [
  {
    slug: "northwind",
    company: "Northwind Labs",
    industry: "AI infrastructure",
    logo: "Northwind",
    quote:
      "Our recruiters used to spend the first three hours of every day on sourcing. Now they spend it on conversations.",
    author: "Maya Collins",
    authorRole: "Head of Talent",
    metrics: [
      { label: "Time-to-first-interview", value: "11d → 38h" },
      { label: "Reply rate on outreach", value: "41%" },
      { label: "Recruiter NPS", value: "+62" },
    ],
    summary:
      "How a 320-person AI infra startup tripled outbound pipeline while cutting recruiter load by 70%.",
  },
  {
    slug: "lumen-health",
    company: "Lumen Health",
    industry: "Digital health",
    logo: "Lumen",
    quote:
      "The bias audit dashboard moved from a side conversation to a board-level metric. That alone justified the spend.",
    author: "Ava Carter",
    authorRole: "Recruiting Lead",
    metrics: [
      { label: "Senior eng time-to-fill", value: "−54%" },
      { label: "Diverse candidate share", value: "+38%" },
      { label: "Cost-per-hire", value: "−$2.4k" },
    ],
    summary:
      "How a 90-person digital health team built an explainable, bias-audited hiring pipeline from day one.",
  },
  {
    slug: "arc-studios",
    company: "Arc Studios",
    industry: "Creative tech",
    logo: "Arc",
    quote:
      "It feels less like a tool and more like a senior recruiter who never sleeps. Our pipeline tripled in a quarter.",
    author: "Jordan Reyes",
    authorRole: "Founder",
    metrics: [
      { label: "Outbound pipeline", value: "3.1x" },
      { label: "Tools consolidated", value: "4 → 1" },
      { label: "Hires per recruiter", value: "+220%" },
    ],
    summary:
      "How a 12-person creative studio scaled to 40 hires in 9 months without adding a single recruiter.",
  },
];
