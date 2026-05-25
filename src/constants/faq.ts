import type { FaqItem } from "@/types";

export const faqItems: FaqItem[] = [
  {
    id: "how-it-works",
    question: "How does TalentBridge actually work?",
    answer:
      "TalentBridge is a multi-agent system that pairs with your ATS. Once you describe a role, agents source from LinkedIn, GitHub, and the open web, score candidates against your rubric, and draft personalized outreach. You stay in the loop — every decision is explainable.",
  },
  {
    id: "ats",
    question: "Do I have to replace my ATS?",
    answer:
      "No. TalentBridge is designed to sit on top of Greenhouse, Lever, Workday, and Ashby with two-way sync. Your team keeps its current workflow — we just remove the manual grind.",
  },
  {
    id: "data",
    question: "What happens to my candidate data?",
    answer:
      "Your data is yours. We are SOC 2 Type II certified, GDPR + CCPA compliant, encrypt at rest and in transit, and never train shared models on your data. You can export or delete everything at any time.",
  },
  {
    id: "bias",
    question: "How do you prevent bias in AI ranking?",
    answer:
      "Every ranking comes with explainable reasoning, and we offer adjustable bias guards that mask names, photos, schools, and locations during evaluation. We publish a quarterly bias audit you can share with your team.",
  },
  {
    id: "trial",
    question: "Is there a free trial?",
    answer:
      "Yes — 14 days, no credit card required. You get full access to the Starter tier so you can run a real role end-to-end. Most teams see measurable wins inside week one.",
  },
  {
    id: "rollout",
    question: "How long does it take to roll out?",
    answer:
      "Most teams are live in under 30 minutes. ATS sync, SSO, and rubric setup happen in a single guided onboarding session. Enterprise rollouts with custom models take 1–2 weeks.",
  },
];
