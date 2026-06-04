export type AgencyCandidate = {
  id: string;
  roleId: string;
  name: string;
  currentTitle: string;
  location: string;
  experience: string;
  skills: string[];
  matchPercent: number;
  rating: number;
  reviewCount: number;
  summary: string;
  highlights: string[];
  email: string;
};

const allCandidates: AgencyCandidate[] = [
  {
    id: "c1",
    roleId: "role-1",
    name: "Maya Collins",
    currentTitle: "Lead Product Designer",
    location: "Remote · Toronto",
    experience: "7 years",
    skills: ["Figma", "Design systems", "B2B SaaS"],
    matchPercent: 94,
    rating: 4.8,
    reviewCount: 42,
    summary:
      "Led design for two workflow products with measurable adoption lifts and strong PM partnership.",
    highlights: [
      "Shipped design system used by 6 squads",
      "Portfolio includes ATS-adjacent HR tools",
    ],
    email: "maya.collins@email.com",
  },
  {
    id: "c2",
    roleId: "role-1",
    name: "James Okonkwo",
    currentTitle: "Senior UX Designer",
    location: "Remote · Austin",
    experience: "6 years",
    skills: ["Prototyping", "User research", "Accessibility"],
    matchPercent: 91,
    rating: 4.6,
    reviewCount: 28,
    summary:
      "End-to-end designer with research-led process and enterprise dashboard experience.",
    highlights: ["WCAG 2.2 audits on prior product", "Strong quantitative UX metrics"],
    email: "j.okonkwo@email.com",
  },
  {
    id: "c3",
    roleId: "role-1",
    name: "Sofia Lindström",
    currentTitle: "Product Designer",
    location: "Hybrid · NYC",
    experience: "5 years",
    skills: ["UI", "Motion", "Design ops"],
    matchPercent: 88,
    rating: 4.5,
    reviewCount: 19,
    summary:
      "Visual craft plus systems thinking; comfortable in fast-moving startup cadence.",
    highlights: ["Built component library from scratch", "B2B onboarding flows"],
    email: "sofia.l@email.com",
  },
  {
    id: "c4",
    roleId: "role-1",
    name: "Daniel Park",
    currentTitle: "UX Lead",
    location: "Remote · Seattle",
    experience: "8 years",
    skills: ["Workshop facilitation", "IA", "Figma"],
    matchPercent: 85,
    rating: 4.7,
    reviewCount: 35,
    summary:
      "Cross-functional leader who has mentored junior designers and owned discovery phases.",
    highlights: ["Managed team of 4", "Discovery-to-delivery track record"],
    email: "dpark@email.com",
  },
  {
    id: "c5",
    roleId: "role-1",
    name: "Aisha Rahman",
    currentTitle: "Senior Product Designer",
    location: "Remote · London",
    experience: "6 years",
    skills: ["Design tokens", "React handoff", "SaaS"],
    matchPercent: 82,
    rating: 4.4,
    reviewCount: 22,
    summary:
      "Strong engineer collaboration and token-driven design system maintenance.",
    highlights: ["Engineering design partner award 2024", "Multi-product SaaS background"],
    email: "aisha.r@email.com",
  },
  {
    id: "c6",
    roleId: "role-2",
    name: "Elena Vasquez",
    currentTitle: "Senior PM, Growth",
    location: "Boston · Hybrid",
    experience: "8 years",
    skills: ["Roadmapping", "Healthcare", "Analytics"],
    matchPercent: 92,
    rating: 4.7,
    reviewCount: 31,
    summary:
      "Healthcare product leader with clinician workflow and compliance familiarity.",
    highlights: ["HIPAA training certified", "Launched 3 clinician tools"],
    email: "e.vasquez@email.com",
  },
  {
    id: "c7",
    roleId: "role-2",
    name: "Marcus Chen",
    currentTitle: "Product Manager",
    location: "Remote · US",
    experience: "5 years",
    skills: ["Agile", "Stakeholder mgmt", "SQL"],
    matchPercent: 87,
    rating: 4.5,
    reviewCount: 18,
    summary:
      "Data-informed PM with experience shipping regulated features on schedule.",
    highlights: ["SOC 2 product launches", "Cross-functional squad lead"],
    email: "marcus.chen@email.com",
  },
  {
    id: "c8",
    roleId: "role-3",
    name: "Priya Natarajan",
    currentTitle: "Embedded Engineer",
    location: "Detroit · On-site",
    experience: "6 years",
    skills: ["C", "RTOS", "AUTOSAR"],
    matchPercent: 93,
    rating: 4.9,
    reviewCount: 24,
    summary:
      "Firmware engineer with automotive safety standards and EV platform exposure.",
    highlights: ["ISO 26262 project experience", "CAN bus diagnostics"],
    email: "priya.n@email.com",
  },
  {
    id: "c9",
    roleId: "role-3",
    name: "Tomás Herrera",
    currentTitle: "Software Engineer, Embedded",
    location: "Detroit area",
    experience: "4 years",
    skills: ["C++", "Linux embedded", "Testing"],
    matchPercent: 86,
    rating: 4.3,
    reviewCount: 12,
    summary: "Hands-on implementer with test automation focus on embedded modules.",
    highlights: ["Hardware-in-the-loop testing", "Bootloader updates"],
    email: "t.herrera@email.com",
  },
];

/** Candidates suggested for a newly posted role (paste flow). */
export const newRoleCandidates: AgencyCandidate[] = allCandidates
  .slice(0, 5)
  .map((c, i) => ({
    ...c,
    id: `new-c${i + 1}`,
    roleId: "role-new",
    matchPercent: [96, 91, 89, 84, 80][i] ?? 78,
  }));

export function getCandidatesForRole(roleId: string) {
  if (roleId === "role-new") return newRoleCandidates;
  return allCandidates.filter((c) => c.roleId === roleId);
}
