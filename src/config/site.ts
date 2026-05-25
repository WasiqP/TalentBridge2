export const siteConfig = {
  name: "TalentBridge",
  tagline: "The AI Copilot for Recruiters",
  description:
    "TalentBridge is an AI recruiting copilot that sources, screens, and engages candidates 10x faster — giving every recruiter superhuman signal.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://talentbridge.ai",
  twitter: "@talentbridgeai",
  contact: {
    email: "hello@talentbridge.ai",
    sales: "sales@talentbridge.ai",
    address: "548 Market Street, San Francisco, CA 94104",
  },
  links: {
    twitter: "https://x.com/talentbridgeai",
    github: "https://github.com/talentbridge",
    linkedin: "https://linkedin.com/company/talentbridge",
    youtube: "https://youtube.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
