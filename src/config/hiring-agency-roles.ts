export type AgencyRoleStatus = "live" | "draft" | "closed";

export type AgencyRole = {
  id: string;
  jobTitle: string;
  companyName: string;
  companyMeta: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  status: AgencyRoleStatus;
  matchCount: number;
  postedLabel: string;
  description: string;
  highlights: string[];
};

export const agencyRoles: AgencyRole[] = [
  {
    id: "role-1",
    jobTitle: "Senior Product Designer",
    companyName: "Northwind Labs",
    companyMeta: "SaaS · 120–250 employees",
    location: "Remote (US & Canada)",
    employmentType: "Full-time",
    salaryRange: "$140k–$175k",
    status: "live",
    matchCount: 24,
    postedLabel: "Posted 3 days ago",
    description:
      "Own end-to-end UX for workflow automation used by 40k+ B2B users. Partner with PM and engineering on discovery and delivery.",
    highlights: [
      "Figma and design systems required",
      "B2B SaaS portfolio strongly preferred",
    ],
  },
  {
    id: "role-2",
    jobTitle: "Senior Product Manager",
    companyName: "Brightline Health",
    companyMeta: "Healthtech · Series C",
    location: "Hybrid · Boston",
    employmentType: "Full-time",
    salaryRange: "$155k–$190k",
    status: "live",
    matchCount: 18,
    postedLabel: "Posted 1 week ago",
    description:
      "Lead roadmap for clinician-facing tools in a regulated healthcare environment.",
    highlights: ["HIPAA-aware product experience", "Agile squad leadership"],
  },
  {
    id: "role-3",
    jobTitle: "Embedded Software Engineer",
    companyName: "Atlas Mobility",
    companyMeta: "Automotive · OEM supplier",
    location: "On-site · Detroit",
    employmentType: "Full-time",
    salaryRange: "$130k–$165k",
    status: "live",
    matchCount: 31,
    postedLabel: "Posted 5 days ago",
    description:
      "Develop firmware for next-generation EV platforms with safety-critical constraints.",
    highlights: ["C/C++ and RTOS", "AUTOSAR exposure a plus"],
  },
];

const newRolePlaceholder: AgencyRole = {
  id: "role-new",
  jobTitle: "New role",
  companyName: "Your company",
  companyMeta: "Draft · AI extracted",
  location: "To confirm",
  employmentType: "Full-time",
  salaryRange: "To confirm",
  status: "draft",
  matchCount: 5,
  postedLabel: "Just created",
  description:
    "We parsed your job description and matched candidates immediately. Refine details in chat or publish when ready.",
  highlights: ["AI-drafted posting", "Candidates ready to review"],
};

export function getAgencyRole(id: string) {
  if (id === "role-new") return newRolePlaceholder;
  return agencyRoles.find((r) => r.id === id);
}
