/**
 * Guest hero — copy, stats, and living product story content.
 */

export type GuestHeroStoryPhase = "upload" | "assemble" | "profile" | "match";

export const guestHeroStoryPhaseLabels: Record<GuestHeroStoryPhase, string> = {
  upload: "Drop your CV",
  assemble: "Blocks assembling",
  profile: "Profile ready",
  match: "Roles ranked for you",
};

export const guestHeroStoryWhispers: Record<
  GuestHeroStoryPhase,
  string[]
> = {
  upload: ["Reading file…", "PDF secured"],
  assemble: [
    "Found 8+ years experience",
    "Pulling skills: Figma, React…",
    "Mapping work history",
  ],
  profile: ["96% profile completeness", "LinkedIn link detected"],
  match: ["Scanned 1,200+ open roles", "Top match: 96% fit"],
};

export const guestHeroCopy = {
  eyebrow: "Built for job seekers",
  titleLine1: "Hire 10x faster.",
  titleLine2: "With ten times",
  titleAccent: "the signal.",
  description:
    "TalentDrobe reads your resume, builds a real profile, and ranks roles that fit — so you apply with clarity, not guesswork.",
  primaryCta: "Get started free",
  primaryHref: "/sign-up",
  secondaryCta: "Try the dashboard",
  secondaryHref: "/dashboard/job-seeker",
  footnote: "PDF, DOC & DOCX · No credit card",
  trustLabel: "Real product · not a mockup",
};

export type GuestHeroProductSlide = {
  id: "extraction" | "profile";
  tabLabel: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
};

export const guestHeroProductSlides: GuestHeroProductSlide[] = [
  {
    id: "extraction",
    tabLabel: "CV parsing",
    caption: "Resume upload and live profile assembly",
    imageSrc: "/guest/product-extraction.png",
    imageAlt: "TalentDrobe dashboard extracting a resume into profile blocks",
  },
  {
    id: "profile",
    tabLabel: "Your profile",
    caption: "Structured profile ready to match with roles",
    imageSrc: "/guest/product-profile.png",
    imageAlt: "TalentDrobe parsed job seeker profile screen",
  },
];

export const guestHeroStats = [
  { value: "~10s", label: "To first profile" },
  { value: "96%", label: "Top match score" },
  { value: "0", label: "Long forms" },
] as const;
