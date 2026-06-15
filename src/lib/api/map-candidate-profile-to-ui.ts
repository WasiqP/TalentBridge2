import type {
  ApiCandidateProfile,
  ApiCvSuggestion,
} from "@/types/hr-backend";
import type {
  JobSeekerProfile,
  ProfileCompletionItem,
  ProfileEducation,
  ProfileExperience,
  ProfileLanguage,
  ProfileSkillGroup,
} from "@/config/job-seeker-profile";

function formatYear(value?: string | null) {
  if (!value) return "";
  const match = value.match(/\d{4}/);
  return match?.[0] ?? value;
}

function mapLinks(links?: ApiCandidateProfile["links"]) {
  if (!links) return [];

  const items: JobSeekerProfile["links"] = [];

  if (links.portfolio) {
    items.push({ label: "Portfolio", href: links.portfolio });
  }
  if (links.linkedin) {
    items.push({ label: "LinkedIn", href: links.linkedin });
  }
  if (links.github) {
    items.push({ label: "GitHub", href: links.github });
  }

  return items;
}

function mapExperience(
  workExperience: ApiCandidateProfile["work_experience"] = [],
): ProfileExperience[] {
  return workExperience.map((job, index) => {
    const highlights = [
      ...(job.responsibilities ?? []),
      ...(job.achievements ?? []),
    ].filter(Boolean);

    const summary =
      highlights[0] ??
      `Worked as ${job.job_title} at ${job.employer}.`;

    return {
      id: `exp-${index}`,
      role: job.job_title,
      company: job.employer,
      location: job.company_location ?? "—",
      start: formatYear(job.start_date) || "—",
      end: job.is_current_role ? "Present" : formatYear(job.end_date) || "—",
      current: job.is_current_role ?? false,
      summary,
      highlights: highlights.slice(0, 4),
      needsReview: !job.start_date || !job.end_date,
    };
  });
}

function mapEducation(education: ApiCandidateProfile["education"] = []): ProfileEducation[] {
  return education.map((edu, index) => {
    const degreeParts = [edu.degree, edu.field].filter(Boolean);
    const year = edu.year ? String(edu.year) : "";

    return {
      id: `edu-${index}`,
      degree: degreeParts.join(" in ") || "Education",
      school: edu.institution ?? "—",
      start: year,
      end: year,
    };
  });
}

function mapLanguages(languages: string[] = []): ProfileLanguage[] {
  return languages.map((name, index) => ({
    id: `lang-${index}`,
    name,
    level: "Listed on CV",
  }));
}

function mapSkillGroups(skills: string[] = []): ProfileSkillGroup[] {
  if (skills.length === 0) return [];

  return [
    {
      id: "detected",
      label: "Detected skills",
      items: skills,
    },
  ];
}

function mapStats(analytics?: ApiCandidateProfile["experience_analytics"], skillsCount = 0) {
  const years = analytics?.total_years_experience ?? 0;
  const roles = analytics?.number_of_positions ?? 0;

  return [
    {
      id: "exp",
      label: "Years experience",
      value: Math.round(years),
      suffix: years > 0 ? "+" : undefined,
    },
    {
      id: "roles",
      label: "Roles held",
      value: roles,
    },
    {
      id: "skills",
      label: "Skills detected",
      value: skillsCount,
    },
  ];
}

function mapSuggestionsToCompletionItems(
  suggestions: ApiCvSuggestion[] = [],
): ProfileCompletionItem[] {
  return suggestions.slice(0, 5).map((item, index) => ({
    id: `api-suggestion-${index}`,
    label: item.suggestion,
    points: item.priority === "high" ? 2 : 1,
    action: "chat",
  }));
}

function estimateCompleteness(
  profile: ApiCandidateProfile,
  uploadStatus: string,
  missingFields: string[] = [],
) {
  if (uploadStatus === "complete") return 96;
  if (missingFields.length === 0) return 88;

  const penalty = Math.min(missingFields.length * 4, 24);
  return Math.max(72, 96 - penalty);
}

/**
 * Turns the backend CandidateProfile into the UI profile shape
 * used by ProfileReveal and related dashboard components.
 */
export function mapCandidateProfileToJobSeekerProfile(
  apiProfile: ApiCandidateProfile,
  options?: {
    uploadStatus?: string;
    missingRequiredFields?: string[];
    apiSuggestions?: ApiCvSuggestion[];
  },
): JobSeekerProfile {
  const uploadStatus = options?.uploadStatus ?? "complete";
  const missingFields = options?.missingRequiredFields ?? [];
  const suggestions = options?.apiSuggestions ?? [];

  const headline =
    apiProfile.tagline?.trim() ||
    `${apiProfile.seniority_level.charAt(0).toUpperCase()}${apiProfile.seniority_level.slice(1)} professional`;

  return {
    name: apiProfile.full_name,
    headline,
    location: apiProfile.location,
    email: apiProfile.email,
    phone: apiProfile.phone,
    completeness: estimateCompleteness(apiProfile, uploadStatus, missingFields),
    parseConfidence: uploadStatus === "complete" ? 94 : 86,
    links: mapLinks(apiProfile.links),
    summary:
      apiProfile.summary?.trim() ||
      "We extracted the key details from your CV. Review each section below and confirm anything that needs a quick edit.",
    stats: mapStats(apiProfile.experience_analytics, apiProfile.skills.length),
    skillGroups: mapSkillGroups(apiProfile.skills),
    experience: mapExperience(apiProfile.work_experience),
    education: mapEducation(apiProfile.education),
    certifications: (apiProfile.certifications ?? []).map((name, index) => ({
      id: `cert-${index}`,
      name,
      issuer: "Listed on CV",
      year: "—",
    })),
    languages: mapLanguages(apiProfile.languages),
    completionItems: mapSuggestionsToCompletionItems(suggestions),
  };
}
