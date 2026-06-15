/**
 * TypeScript shapes that match the HR backend OpenAPI contract.
 * Swagger: https://hr-ai-management-system-production.up.railway.app/docs
 */

export type SeniorityLevel = "junior" | "mid" | "senior" | "lead" | "principal";

export type EmploymentPreference = "full-time" | "part-time" | "contract" | "any";

export type SuggestionPriority = "high" | "medium" | "low";

export type ApiWorkExperience = {
  employer: string;
  company_location?: string | null;
  job_title: string;
  employment_type?: EmploymentPreference | null;
  start_date?: string | null;
  end_date?: string | null;
  is_current_role?: boolean;
  duration_years?: number | null;
  responsibilities?: string[];
  achievements?: string[];
  technologies_used?: string[];
};

export type ApiEducation = {
  degree?: string | null;
  field?: string | null;
  institution?: string | null;
  year?: number | null;
};

export type ApiLinks = {
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
};

export type ApiExperienceAnalytics = {
  total_years_experience: number;
  years_in_current_role?: number | null;
  number_of_positions: number;
  number_of_employers: number;
  average_tenure?: number | null;
  career_gaps_present?: boolean;
  management_experience?: boolean;
  functional_domains?: string[];
};

/** Parsed candidate profile returned by /upload_cv inside `data`. */
export type ApiCandidateProfile = {
  full_name: string;
  skills: string[];
  work_experience?: ApiWorkExperience[];
  experience_analytics?: ApiExperienceAnalytics | null;
  seniority_level: SeniorityLevel;
  location: string;
  email: string;
  phone: string;
  tagline?: string | null;
  summary?: string | null;
  is_student?: boolean;
  languages?: string[];
  industries?: string[];
  education?: ApiEducation[];
  certifications?: string[];
  employment_preference?: EmploymentPreference | null;
  projects?: Array<{
    name?: string | null;
    description?: string | null;
    technologies?: string[];
  }>;
  links?: ApiLinks | null;
};

/** Response from POST /upload_cv */
export type ApiUploadCvResponse = {
  status: string;
  missing_required_fields?: string[];
  error?: string | null;
  data?: ApiCandidateProfile | null;
};

/** One improvement suggestion from POST /suggestions */
export type ApiCvSuggestion = {
  category: string;
  suggestion: string;
  priority: SuggestionPriority;
};

/** Response from POST /suggestions */
export type ApiSuggestionsResponse = {
  status: string;
  error?: string | null;
  suggestions?: ApiCvSuggestion[];
};
