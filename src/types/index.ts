export type NavItem = {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  span?: "sm" | "md" | "lg" | "xl";
};

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
  cta: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description?: string;
};

export type CustomerStory = {
  slug: string;
  company: string;
  industry: string;
  logo: string;
  quote: string;
  author: string;
  authorRole: string;
  metrics: { label: string; value: string }[];
  summary: string;
};

export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  type: "feature" | "improvement" | "fix";
  description: string;
  bullets?: string[];
};

export type Solution = {
  slug: "recruiter" | "hiring-manager" | "hr-lead";
  title: string;
  hero: string;
  description: string;
  challenges: string[];
  outcomes: { metric: string; label: string }[];
  capabilities: { title: string; description: string }[];
};

export type Integration = {
  name: string;
  category: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};
