import type { GuestAccent } from "@/constants/guest-page";

export type Guest1SlideCategory =
  | "Your journey"
  | "Market pulse"
  | "HR World"
  | "What's new";

export type Guest1FeaturedSlide = {
  id: string;
  category: Guest1SlideCategory;
  icon: string;
  accent: GuestAccent;
  title: string;
  description: string;
  highlights: string[];
};

export type Guest1NewsSlide = {
  id: string;
  category: "HR World" | "Market" | "Policy" | "Hiring trends" | "What's new";
  headline: string;
  excerpt: string;
  source: string;
  published: string;
  pulse?: string;
};

/** Large bento — product journey + market pulse + HR context. */
export const guest1FeaturedSlides: Guest1FeaturedSlide[] = [
  {
    id: "f-1",
    category: "Your journey",
    icon: "ScanLine",
    accent: "lime",
    title: "Profile in seconds",
    description:
      "Upload once. We turn your résumé into a rich, recruiter-ready profile — no manual typing.",
    highlights: ["Product", "React", "TypeScript", "Leadership"],
  },
  {
    id: "f-2",
    category: "Your journey",
    icon: "Sparkles",
    accent: "cyan",
    title: "Explainable matches",
    description: "Every role shows why it fits — no black-box scores.",
    highlights: ["Senior Product Designer · 94% fit", "Lead UX Engineer · 89% fit"],
  },
  {
    id: "f-3",
    category: "Your journey",
    icon: "MessageCircle",
    accent: "violet",
    title: "A career agent that talks",
    description:
      "Ask about salary, switching fields, or what to learn next. It answers with your context.",
    highlights: ["Pivot advice", "Salary benchmarks", "Skill gap plans"],
  },
  {
    id: "f-4",
    category: "Your journey",
    icon: "FileEdit",
    accent: "amber",
    title: "Résumé tailored per role",
    description: "The agent rewrites your résumé for each application automatically.",
    highlights: ["Base résumé saved", "Role-specific draft ready"],
  },
  {
    id: "f-5",
    category: "Your journey",
    icon: "BellRing",
    accent: "lime",
    title: "Always-on job alerts",
    description:
      "Your agent watches the market 24/7 and pings you the moment a strong role opens.",
    highlights: ["4 high-fit alerts today", "12 new roles this week"],
  },
  {
    id: "f-6",
    category: "Your journey",
    icon: "MousePointerClick",
    accent: "violet",
    title: "One-click apply",
    description: "Approve and you're in. No re-entering the same details ten times.",
    highlights: ["18 applications tracked", "6 follow-ups sent"],
  },
  {
    id: "f-7",
    category: "Market pulse",
    icon: "Sparkles",
    accent: "cyan",
    title: "Design roles up 12% this month",
    description: "Product & UX hiring accelerated across mid-market SaaS companies.",
    highlights: ["Remote-friendly: 68%", "Avg. time-to-fill: 28 days"],
  },
  {
    id: "f-8",
    category: "Market pulse",
    icon: "ScanLine",
    accent: "lime",
    title: "AI skills appearing in 41% of PM reqs",
    description: "Job descriptions increasingly mention copilots, LLM workflows, and evals.",
    highlights: ["Prompt design", "AI product sense", "Data literacy"],
  },
  {
    id: "f-9",
    category: "HR World",
    icon: "MessageCircle",
    accent: "violet",
    title: "Employers shift to skills-based hiring",
    description: "More teams drop degree requirements in favor of portfolio and project proof.",
    highlights: ["SHRM", "Workforce trends", "2h ago"],
  },
  {
    id: "f-10",
    category: "HR World",
    icon: "BellRing",
    accent: "amber",
    title: "Return-to-office policies soften",
    description: "Hybrid remains default as talent markets stay competitive in tech hubs.",
    highlights: ["Flexible schedules", "Hub + remote mix"],
  },
  {
    id: "f-11",
    category: "What's new",
    icon: "Sparkles",
    accent: "lime",
    title: "Interview prep mode is live",
    description: "Practice answers tailored to each role before recruiters reach out.",
    highlights: ["New in TalentDrobe", "Just shipped"],
  },
  {
    id: "f-12",
    category: "What's new",
    icon: "FileEdit",
    accent: "cyan",
    title: "Cover letters, agent-written",
    description: "Short, human-sounding letters drafted from your profile and the job post.",
    highlights: ["Beta", "Edit before send"],
  },
];

/** Bottom bento — HR World RSS-style feed (mock curated headlines). */
export const guest1HrNewsSlides: Guest1NewsSlide[] = [
  {
    id: "n-1",
    category: "HR World",
    headline: "Layoff pace slows as hiring intent steadies in tech",
    excerpt:
      "Employers are reopening reqs in product and data roles while staying cautious on generalist hires.",
    source: "HR Executive",
    published: "12m ago",
    pulse: "Hiring stabilizing",
  },
  {
    id: "n-2",
    category: "Market",
    headline: "Salary bands widen for senior ICs in AI-adjacent roles",
    excerpt:
      "Compensation reviews show a premium for candidates who can ship with modern ML tooling.",
    source: "Market Watch",
    published: "28m ago",
    pulse: "+8% YoY",
  },
  {
    id: "n-3",
    category: "Policy",
    headline: "EU transparency rules push clearer job posts",
    excerpt:
      "More companies publish salary ranges upfront — a win for candidates comparing offers.",
    source: "Policy Desk",
    published: "45m ago",
  },
  {
    id: "n-4",
    category: "Hiring trends",
    headline: "Portfolio beats pedigree in design hiring screens",
    excerpt:
      "Recruiters report case studies and shipped work outweigh school brand in first-pass reviews.",
    source: "Talent Signal",
    published: "1h ago",
  },
  {
    id: "n-5",
    category: "HR World",
    headline: "Internal mobility programs expand at Fortune 500 firms",
    excerpt:
      "Reskilling budgets rise as companies try to fill critical roles without external searches.",
    source: "HR Executive",
    published: "1h ago",
  },
  {
    id: "n-6",
    category: "Market",
    headline: "Contract-to-hire conversions climb in Q2",
    excerpt:
      "Teams test fit before full-time offers, especially for product and growth roles.",
    source: "Labor Index",
    published: "2h ago",
  },
  {
    id: "n-7",
    category: "What's new",
    headline: "TalentDrobe: smarter follow-up drafts after apply",
    excerpt:
      "Agents now suggest polite nudges tailored to each company's hiring timeline.",
    source: "Product Updates",
    published: "Today",
  },
  {
    id: "n-8",
    category: "Hiring trends",
    headline: "Async interviews remain common for first rounds",
    excerpt:
      "Recorded screens save recruiter time; candidates get more flexibility to prepare.",
    source: "Recruiter Weekly",
    published: "2h ago",
  },
  {
    id: "n-9",
    category: "Policy",
    headline: "Pay equity audits drive tighter leveling frameworks",
    excerpt:
      "HR teams standardize titles and bands to reduce offer variance across demographics.",
    source: "Policy Desk",
    published: "3h ago",
  },
  {
    id: "n-10",
    category: "HR World",
    headline: "Employee wellbeing budgets shift toward career coaching",
    excerpt:
      "L&D spend moves from generic courses to personalized career navigation support.",
    source: "HR Executive",
    published: "3h ago",
  },
  {
    id: "n-11",
    category: "Market",
    headline: "Startup hiring thaws in fintech and health tech",
    excerpt:
      "Seed-Series B companies add first product hires after a quiet stretch.",
    source: "Market Watch",
    published: "4h ago",
  },
  {
    id: "n-12",
    category: "Hiring trends",
    headline: "Referrals still top source for senior hires",
    excerpt:
      "Networks matter, but outbound agents are closing the gap for passive candidates.",
    source: "Talent Signal",
    published: "4h ago",
  },
  {
    id: "n-13",
    category: "What's new",
    headline: "Market radar: weekly digest in your inbox",
    excerpt:
      "A Sunday summary of roles, trends, and news matched to your target path.",
    source: "TalentDrobe",
    published: "New",
  },
  {
    id: "n-14",
    category: "HR World",
    headline: "DEI programs evolve toward measurable access outcomes",
    excerpt:
      "Leaders focus on pipeline diversity and structured interviews over slogan-led campaigns.",
    source: "HR Executive",
    published: "5h ago",
  },
  {
    id: "n-15",
    category: "Market",
    headline: "Green-tech roles see fastest growth in engineering",
    excerpt:
      "Climate startups compete for full-stack and hardware-software hybrid profiles.",
    source: "Labor Index",
    published: "6h ago",
  },
  {
    id: "n-16",
    category: "Hiring trends",
    headline: "Job seekers apply to fewer, better-fit roles",
    excerpt:
      "Spray-and-pray declines as agents prioritize quality matches over volume.",
    source: "Recruiter Weekly",
    published: "6h ago",
  },
];

export const guest1FeaturedFeedLabel = "Your search · Live pulse";
export const guest1NewsFeedLabel = "HR World · RSS feed";
