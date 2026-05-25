import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    name: "Maya Collins",
    role: "Co-founder & CEO",
    bio: "Ex-Head of Talent at Northwind. 12 years scaling hiring orgs from 10 to 4,000.",
  },
  {
    name: "Ethan Walker",
    role: "Co-founder & CTO",
    bio: "Former staff engineer at a frontier AI lab. Built the inference stack powering our agents.",
  },
  {
    name: "Naomi Rahman",
    role: "Head of Engineering",
    bio: "Previously led platform engineering at Quanta. Open-source maintainer, marathon runner.",
  },
  {
    name: "Priya Patel",
    role: "Head of Trust & Safety",
    bio: "Built bias audit programs at three Fortune 500s. Writes the rules so we can defend them.",
  },
  {
    name: "Lucas Fernandes",
    role: "Founding Recruiter",
    bio: "20 years in technical recruiting. The voice of our customers, every day.",
  },
  {
    name: "Ava Carter",
    role: "Head of Design",
    bio: "Designed product at two unicorns. Believes great tools disappear into the work.",
  },
];

export const values = [
  {
    title: "Recruiters first",
    description:
      "Every feature ships only after a real recruiter says 'this saves my Tuesday.'",
  },
  {
    title: "Explainable by default",
    description:
      "If our AI can't explain its reasoning, we don't ship it. No black boxes.",
  },
  {
    title: "Bias is a bug",
    description:
      "We publish a quarterly bias audit and treat unfair outcomes as P0 incidents.",
  },
  {
    title: "Boring infrastructure",
    description:
      "We invest in reliability before features. Recruiters can't afford a flaky tool.",
  },
];
