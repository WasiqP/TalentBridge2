import {
  HR_SESSION_CV_SUGGESTIONS_KEY,
  HR_SESSION_PARSED_PROFILE_KEY,
} from "@/config/hr-backend-api-routes";
import type {
  ApiCandidateProfile,
  ApiCvSuggestion,
} from "@/types/hr-backend";

export function saveParsedProfileToSession(profile: ApiCandidateProfile) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HR_SESSION_PARSED_PROFILE_KEY, JSON.stringify(profile));
}

export function readParsedProfileFromSession(): ApiCandidateProfile | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(HR_SESSION_PARSED_PROFILE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ApiCandidateProfile;
  } catch {
    return null;
  }
}

export function saveCvSuggestionsToSession(suggestions: ApiCvSuggestion[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HR_SESSION_CV_SUGGESTIONS_KEY, JSON.stringify(suggestions));
}

export function readCvSuggestionsFromSession(): ApiCvSuggestion[] {
  if (typeof window === "undefined") return [];

  const raw = sessionStorage.getItem(HR_SESSION_CV_SUGGESTIONS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as ApiCvSuggestion[];
  } catch {
    return [];
  }
}

export function clearHrBackendSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(HR_SESSION_PARSED_PROFILE_KEY);
  sessionStorage.removeItem(HR_SESSION_CV_SUGGESTIONS_KEY);
}
