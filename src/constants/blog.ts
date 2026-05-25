import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-recruiting-playbook-2026",
    title: "The AI Recruiting Playbook for 2026",
    excerpt:
      "How leading talent orgs are restructuring around recruiter copilots — and what to copy this quarter.",
    content:
      "AI recruiting is no longer a curiosity. The teams that moved first now hire 3.2x faster than their peers, and the gap is widening every quarter. This playbook walks through the four phases of adoption we see at TalentBridge: copilot trial, sourcing automation, pipeline intelligence, and full multi-agent rollout. We'll cover the rubric design, change-management traps, and the specific metrics to instrument before week one.",
    date: "May 12, 2026",
    author: "Ariana Malik",
    authorRole: "Head of Research",
    category: "Playbooks",
    readTime: "9 min read",
  },
  {
    slug: "explainable-ranking-bias",
    title: "Explainable ranking is the only kind that scales",
    excerpt:
      "Why opaque AI scoring fails the moment your legal team asks 'show me why' — and how to design around it.",
    content:
      "When a recruiter or candidate asks why a score exists, your AI needs an answer. Black-box ranking systems collapse under that pressure — they create legal risk, erode trust, and make calibration impossible. In this post we walk through how TalentBridge generates structured pros/cons/gaps for every candidate, and the engineering decisions behind making explainability the default rather than an afterthought.",
    date: "April 30, 2026",
    author: "Naomi Rahman",
    authorRole: "Principal Engineer",
    category: "Engineering",
    readTime: "7 min read",
  },
  {
    slug: "sourcing-agents-are-here",
    title: "Sourcing agents are here. Now what?",
    excerpt:
      "A practical guide to deploying autonomous sourcing agents without losing the recruiter craft.",
    content:
      "Sourcing agents shipped, and the question every recruiter is asking is: what's left for me? Quite a lot, actually. The most successful teams use agents to compress the boring 70% — the searching, the parsing, the first-touch drafting — while doubling down on the parts only humans can do: positioning, negotiation, judgment, taste. This post is the playbook.",
    date: "April 18, 2026",
    author: "Lucas Fernandes",
    authorRole: "Founding Recruiter",
    category: "Playbooks",
    readTime: "11 min read",
  },
  {
    slug: "bias-audits-quarterly",
    title: "Why bias audits should be quarterly, not annual",
    excerpt:
      "What we learned from running bias audits across 12,000 hires — and the cadence that actually moves the needle.",
    content:
      "Annual bias audits look great on a compliance slide and almost never change a hiring outcome. Quarterly audits, paired with masking and live feedback loops, do. We'll share the framework we built with our customers' DEI leads and how we publish a public bias audit every quarter ourselves.",
    date: "March 22, 2026",
    author: "Priya Patel",
    authorRole: "Head of Trust & Safety",
    category: "Trust",
    readTime: "6 min read",
  },
  {
    slug: "outreach-that-feels-human",
    title: "Outreach that feels human at scale",
    excerpt:
      "A teardown of the messages with the highest reply rates across 280k sends — and the patterns you can steal.",
    content:
      "We pulled the top 5% of outreach replies across 280,000 sends. The patterns are surprisingly consistent: real specificity, a single ask, a clear out, and a voice that sounds like the recruiter who wrote it. This post breaks down five sequences with annotated examples, and the prompt scaffolding behind them.",
    date: "March 3, 2026",
    author: "Maya Collins",
    authorRole: "Head of Customer Success",
    category: "Playbooks",
    readTime: "8 min read",
  },
];
