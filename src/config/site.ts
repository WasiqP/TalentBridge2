export const siteConfig = {
  name: "TalentDrobe",
  tagline: "Find roles that actually fit",
  description:
    "TalentDrobe helps job seekers upload a CV, build a profile, and discover ranked roles with explainable fit — less noise, more signal.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://talentdrobe.ai",
  twitter: "@talentdrobeai",
  contact: {
    email: "hello@talentdrobe.ai",
    sales: "sales@talentdrobe.ai",
    address: "548 Market Street, San Francisco, CA 94104",
  },
  links: {
    twitter: "https://x.com/talentdrobeai",
    github: "https://github.com/talentdrobe",
    linkedin: "https://linkedin.com/company/talentdrobe",
    youtube: "https://youtube.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
