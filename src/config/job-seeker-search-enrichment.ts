import type {
  CategoryFilter,
  CompanySizeFilter,
  WorkTypeFilter,
} from "@/config/job-seeker-search-filters";

export type JobSeekerSearchResultCore = {
  id: string;
  jobTitle: string;
  companyName: string;
  /** Optional logo URL — when omitted, UI shows initials placeholder. */
  companyLogoUrl?: string;
  companyMeta: string;
  salaryRange: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  highlights: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  workTypes: WorkTypeFilter[];
  categories: CategoryFilter[];
  companySize: CompanySizeFilter;
};

export type JobSeekerSearchResultDetail = {
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyAbout: string;
  companyWebsite: string;
  hiringAgencyName: string;
  hiringAgencyAbout: string;
  hiringAgencyEmail: string;
  hiringAgencyRating: number;
  postedAt: string;
  applicantsCount: number;
};

export type JobSeekerSearchResultEnriched = JobSeekerSearchResultCore &
  JobSeekerSearchResultDetail;

type HiringAgency = {
  name: string;
  about: string;
  email: string;
  rating: number;
};

const HIRING_AGENCIES: Record<string, HiringAgency> = {
  "1": {
    name: "Bridgeport Recruiting",
    about:
      "Specialists in product design and design-ops placements for B2B SaaS teams across North America.",
    email: "northwind@bridgeport-recruit.com",
    rating: 4.8,
  },
  "2": {
    name: "MedHire Collective",
    about:
      "Healthcare-focused talent partners placing product and engineering leaders in regulated environments.",
    email: "brightline@medhire.co",
    rating: 4.5,
  },
  "3": {
    name: "MotorWorks Talent",
    about:
      "Automotive and mobility engineering recruiters with OEM and tier-one supplier networks.",
    email: "atlas@motorworks-talent.com",
    rating: 4.9,
  },
  "4": {
    name: "Canvas Creative Staffing",
    about:
      "Boutique agency placing brand and marketing designers with studios and in-house teams.",
    email: "hello@canvas-creative.staff",
    rating: 4.6,
  },
  "5": {
    name: "Summit Talent Desk",
    about:
      "In-house recruiting desk for Summit Finance enterprise operations and risk roles.",
    email: "careers@summit-talent.com",
    rating: 4.3,
  },
  "6": {
    name: "GreenPath Hiring",
    about:
      "Climate and energy tech recruiters focused on software roles at Series A–C startups.",
    email: "roles@greenpath-hiring.io",
    rating: 4.7,
  },
  "7": {
    name: "Harbor Talent EU",
    about:
      "European growth and lifecycle marketing placements for retail and e-commerce brands.",
    email: "jobs@harbor-talent.eu",
    rating: 4.4,
  },
  "8": {
    name: "RoboHire Labs",
    about:
      "Robotics and embedded systems specialists for R&D labs and industrial automation.",
    email: "vertex@robohire.labs",
    rating: 4.8,
  },
  "9": {
    name: "LegalTech Partners",
    about:
      "Product and operations hires for legal-tech startups serving enterprise counsel teams.",
    email: "cedar@legaltech-partners.com",
    rating: 4.2,
  },
  "10": {
    name: "Skyline Staffing",
    about:
      "Travel and hospitality CX recruiters for global airlines and loyalty programs.",
    email: "orbit@skyline-staffing.com",
    rating: 4.4,
  },
  "11": {
    name: "Kite Studio Network",
    about:
      "Design agency collective matching product designers with early-stage startup engagements.",
    email: "talent@kite-studio.network",
    rating: 4.9,
  },
  "12": {
    name: "DataCraft Recruiting",
    about:
      "Analytics and data-viz design placements for B2B SaaS and enterprise BI teams.",
    email: "pulse@datacraft-recruit.com",
    rating: 4.6,
  },
  "13": {
    name: "BioPath Careers",
    about:
      "Life sciences operations and regulatory hiring for biotech and pharma sponsors.",
    email: "greenfield@biopath.careers",
    rating: 4.1,
  },
  "14": {
    name: "MediaMakers Talent",
    about:
      "Editorial product and publishing tech recruiters across UK and EU media groups.",
    email: "relay@mediamakers.talent",
    rating: 4.3,
  },
  "15": {
    name: "ShieldForce Hiring",
    about:
      "Cybersecurity engineering specialists for enterprise detection and response platforms.",
    email: "forge@shieldforce.hiring",
    rating: 4.7,
  },
  "16": {
    name: "LearnWell Recruiters",
    about:
      "EdTech instructional design and curriculum roles for K–12 and higher-ed platforms.",
    email: "nest@learnwell-recruiters.com",
    rating: 4.5,
  },
};

const POSTED_LABELS = [
  "Posted today",
  "Posted 1 day ago",
  "Posted 3 days ago",
  "Posted 5 days ago",
  "Posted 1 week ago",
];

function companySlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);
}

function responsibilitiesFor(job: JobSeekerSearchResultCore): string[] {
  const base = [
    `Lead day-to-day delivery for the ${job.jobTitle} role within ${job.companyName}.`,
    "Collaborate with cross-functional partners on roadmap planning, reviews, and retrospectives.",
    "Document decisions, metrics, and handoffs so stakeholders stay aligned.",
    "Contribute to team rituals and mentor junior teammates when appropriate.",
  ];

  if (job.categories.includes("design")) {
    base.push(
      "Present work-in-progress to design critique and incorporate feedback into shipped outcomes.",
    );
  }
  if (job.categories.includes("engineering")) {
    base.push(
      "Write maintainable code, participate in code review, and support production reliability.",
    );
  }
  if (job.categories.includes("product")) {
    base.push(
      "Translate customer insights into prioritized backlog items with clear success criteria.",
    );
  }

  return base;
}

function requirementsFor(job: JobSeekerSearchResultCore): string[] {
  return [
    `${job.experience} of relevant experience in a similar ${job.employmentType.toLowerCase()} role.`,
    `Proven track record in ${job.tags.join(", ").toLowerCase()} environments.`,
    "Excellent written and verbal communication with distributed teams.",
    "Comfort working autonomously while keeping managers and partners informed.",
    ...job.highlights.filter((h) => !h.toLowerCase().includes("stipend") && !h.toLowerCase().includes("equity")),
  ];
}

function benefitsFor(job: JobSeekerSearchResultCore): string[] {
  const perks = [
    `Competitive compensation: ${job.salaryRange}.`,
    `${job.employmentType} schedule · ${job.location}.`,
    "Medical, dental, and vision coverage (region-dependent).",
    "Paid time off and company holidays.",
  ];

  if (job.workTypes.includes("remote")) {
    perks.push("Remote work setup stipend and async-friendly collaboration norms.");
  }
  if (job.companySize === "startup") {
    perks.push("Equity participation and high-visibility impact on company direction.");
  }
  if (job.companySize === "enterprise") {
    perks.push("Structured career paths, internal mobility, and learning platforms.");
  }

  job.highlights.forEach((h) => {
    if (
      h.toLowerCase().includes("equity") ||
      h.toLowerCase().includes("stipend") ||
      h.toLowerCase().includes("pto") ||
      h.toLowerCase().includes("bonus") ||
      h.toLowerCase().includes("benefit")
    ) {
      perks.push(h);
    }
  });

  return perks;
}

export function enrichJobSearchResult(
  job: JobSeekerSearchResultCore,
): JobSeekerSearchResultEnriched {
  const agency = HIRING_AGENCIES[job.id] ?? HIRING_AGENCIES["1"]!;
  const postedAt =
    POSTED_LABELS[parseInt(job.id, 10) % POSTED_LABELS.length] ?? "Posted recently";

  return {
    ...job,
    fullDescription: `${job.description}\n\nYou will report to a functional lead at ${job.companyName} and work closely with peers across ${job.categories.join(", ")}. This is a ${job.employmentType.toLowerCase()} opportunity based in ${job.location}. The team values clear communication, measurable outcomes, and thoughtful craft in everything shipped to customers.`,
    responsibilities: responsibilitiesFor(job),
    requirements: requirementsFor(job),
    benefits: benefitsFor(job),
    companyAbout: `${job.companyName} operates in ${job.companyMeta}. Employees rate the organization ${job.rating.toFixed(1)} out of 5 across ${job.reviewCount} reviews on TalentBridge. The company invests in cross-functional teams, transparent goal-setting, and hiring people who raise the bar for their discipline.`,
    companyWebsite: `https://${companySlug(job.companyName)}.com`,
    hiringAgencyName: agency.name,
    hiringAgencyAbout: agency.about,
    hiringAgencyEmail: agency.email,
    hiringAgencyRating: agency.rating,
    postedAt,
    applicantsCount: 12 + parseInt(job.id, 10) * 9,
  };
}
