export type JobSeekerResume = {
  id: string;
  title: string;
  fileName: string;
  updatedAt: string;
  isPrimary: boolean;
  summary: string;
  skills: string;
  experience: string;
};

export const jobSeekerResumeSeeds: JobSeekerResume[] = [
  {
    id: "r1",
    title: "Product Designer — 2026",
    fileName: "alex-morgan-design-2026.pdf",
    updatedAt: "2026-05-28T14:30:00.000Z",
    isPrimary: true,
    summary:
      "Product designer with 6+ years building B2B SaaS workflows, design systems, and research-led prototypes.",
    skills:
      "Figma, Design systems, User research, Prototyping, HTML/CSS, Accessibility",
    experience:
      "Senior Product Designer · Northwind Labs · 2022–Present\nLed design for workflow automation suite used by 40k+ users.\n\nProduct Designer · Paper & Pixel · 2019–2022\nShipped marketing and product UI for agency clients in fintech and health.",
  },
  {
    id: "r2",
    title: "General — PDF export",
    fileName: "alex-morgan-general.pdf",
    updatedAt: "2026-04-12T09:15:00.000Z",
    isPrimary: false,
    summary:
      "Versatile profile emphasizing cross-functional collaboration and end-to-end delivery.",
    skills: "Workshop facilitation, Roadmapping, Stakeholder management, Figma",
    experience:
      "Product Designer · Various clients · 2019–Present\nConsulting engagements across SaaS, healthcare, and education.",
  },
];

export const MY_RESUMES_STORAGE_KEY = "tb_job_seeker_resumes" as const;
