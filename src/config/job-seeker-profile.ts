/**
 * Job-seeker profile shape + placeholder data.
 *
 * This is the structured profile the dashboard renders after a resume is
 * parsed. The data below is mock content for the frontend reveal — replace
 * `jobSeekerProfile` with the API response once the backend is wired up.
 */

export type ProfileContactLink = {
  label: string;
  href: string;
};

export type ProfileStat = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
};

export type ProfileSkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export type ProfileExperience = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  /** Parser was unsure about this entry — prompt the user to verify. */
  needsReview?: boolean;
};

export type ProfileCompletionItem = {
  id: string;
  label: string;
  /** Completeness points this action would add. */
  points: number;
  /** Where the action routes — edit form or copilot chat. */
  action: "edit" | "chat";
};

export type ProfileEducation = {
  id: string;
  degree: string;
  school: string;
  start: string;
  end: string;
};

export type ProfileCertification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
};

export type ProfileLanguage = {
  id: string;
  name: string;
  level: string;
};

export type JobSeekerProfile = {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  /** 0–100 — drives the completeness ring. */
  completeness: number;
  /** 0–100 — how confident the parser is about the extracted data. */
  parseConfidence: number;
  links: ProfileContactLink[];
  summary: string;
  stats: ProfileStat[];
  skillGroups: ProfileSkillGroup[];
  experience: ProfileExperience[];
  education: ProfileEducation[];
  certifications: ProfileCertification[];
  languages: ProfileLanguage[];
  /** Quick wins that would raise completeness toward 100%. */
  completionItems: ProfileCompletionItem[];
};

export function getProfileInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function getProfileFirstName(name: string) {
  return name.split(" ")[0] ?? name;
}

/** Placeholder profile — replace with parsed API data later. */
export const jobSeekerProfile: JobSeekerProfile = {
  name: "Jordan Avery",
  headline: "Senior Product Designer",
  location: "Remote · Austin, TX",
  email: "jordan.avery@email.com",
  phone: "+1 (512) 555-0147",
  completeness: 96,
  parseConfidence: 94,
  links: [
    { label: "Portfolio", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
  summary:
    "Senior product designer with 8+ years shaping B2B SaaS workflows for tens of thousands of users. I lead end-to-end design — from discovery and prototyping to design systems and shipped UI — partnering closely with PM and engineering on a fast release cadence.",
  stats: [
    { id: "exp", label: "Years experience", value: 8, suffix: "+" },
    { id: "roles", label: "Roles held", value: 4 },
    { id: "skills", label: "Skills detected", value: 18 },
  ],
  skillGroups: [
    {
      id: "design",
      label: "Design",
      items: [
        "Product Design",
        "Design Systems",
        "Prototyping",
        "User Research",
        "Interaction Design",
        "Accessibility",
      ],
    },
    {
      id: "tools",
      label: "Tools",
      items: ["Figma", "Framer", "Storybook", "Linear", "Notion"],
    },
    {
      id: "technical",
      label: "Technical",
      items: ["HTML/CSS", "React (basics)", "Design Tokens", "A/B Testing"],
    },
  ],
  experience: [
    {
      id: "exp1",
      role: "Senior Product Designer",
      company: "Northwind Labs",
      location: "Remote",
      start: "2021",
      end: "Present",
      current: true,
      summary:
        "Own end-to-end UX for workflow automation used by 40k+ B2B users.",
      highlights: [
        "Built and scaled the design system adopted across 6 product teams",
        "Drove a redesign that lifted activation by 23% quarter over quarter",
        "Ran weekly usability tests to validate flows before engineering handoff",
      ],
    },
    {
      id: "exp2",
      role: "Product Designer",
      company: "Brightline Health",
      location: "Boston, MA",
      start: "2018",
      end: "2021",
      summary:
        "Designed patient-facing portal experiences across web and mobile.",
      highlights: [
        "Shipped a HIPAA-compliant care-plan flow used by 120k patients",
        "Partnered with clinical ops to define and track success metrics",
      ],
    },
    {
      id: "exp3",
      role: "UX Designer",
      company: "Atlas Mobility",
      location: "Detroit, MI",
      start: "2016",
      end: "2018",
      summary:
        "Designed in-vehicle display interfaces for enterprise OEM partners.",
      highlights: [
        "Created the first shared component library for hardware + software teams",
      ],
      needsReview: true,
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "B.F.A. in Interaction Design",
      school: "Rhode Island School of Design",
      start: "2012",
      end: "2016",
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "Nielsen Norman UX Certification",
      issuer: "NN/g",
      year: "2022",
    },
    {
      id: "cert2",
      name: "Accessibility for Web Design",
      issuer: "Deque University",
      year: "2021",
    },
  ],
  languages: [
    { id: "lang1", name: "English", level: "Native" },
    { id: "lang2", name: "Spanish", level: "Professional" },
  ],
  completionItems: [
    { id: "ci1", label: "Confirm your 2016–2018 role dates", points: 2, action: "edit" },
    { id: "ci2", label: "Add a portfolio link", points: 1, action: "edit" },
    { id: "ci3", label: "Set your salary expectations", points: 1, action: "chat" },
  ],
};
