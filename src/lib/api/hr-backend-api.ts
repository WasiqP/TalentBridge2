/**
 * Async functions that talk to the HR backend API.
 *
 * Base URL and paths live in `src/config/hr-backend-api-routes.ts`.
 * Swagger docs: https://hr-ai-management-system-production.up.railway.app/docs
 */

import {
  HR_CLIENT_SUGGESTIONS_URL,
  HR_CLIENT_UPLOAD_CV_URL,
} from "@/config/hr-backend-api-routes";
import type {
  ApiCandidateProfile,
  ApiCvSuggestion,
  ApiSuggestionsResponse,
  ApiUploadCvResponse,
} from "@/types/hr-backend";

type ApiErrorBody = {
  detail?: string | Array<{ msg?: string }>;
  error?: string;
  message?: string;
};

/** Reads a failed response and returns a short human-readable message. */
async function readApiErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ApiErrorBody;

    if (typeof body.detail === "string") return body.detail;
    if (Array.isArray(body.detail) && body.detail[0]?.msg) {
      return body.detail[0].msg ?? "The request was invalid.";
    }
    if (body.error) {
      if (body.error.includes("Only PDFs are accepted")) {
        return "This file could not be processed. Try a PDF, DOC, or DOCX resume.";
      }
      return body.error;
    }
    if (body.message) return body.message;
  } catch {
    // Response body was not JSON — fall through to generic message.
  }

  return `Request failed (${response.status}). Please try again.`;
}

/**
 * Upload a CV file to the backend.
 *
 * The backend reads the PDF, parses it, and returns structured candidate data
 * inside `data` when parsing succeeds (or partially succeeds).
 */
export async function uploadCvFile(cvFile: File): Promise<{
  parsedProfile: ApiCandidateProfile | null;
  uploadStatus: string;
  missingRequiredFields: string[];
}> {
  // Build multipart form data — backend expects the field name `file`.
  const formData = new FormData();
  formData.append("file", cvFile, cvFile.name);

  const response = await fetch(HR_CLIENT_UPLOAD_CV_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const message = await readApiErrorMessage(response);
    throw new Error(message);
  }

  const result = (await response.json()) as ApiUploadCvResponse;

  // Hard failure — no usable profile data came back.
  if (result.error && !result.data) {
    throw new Error(
      result.error === "unable_to_extract_cv_content"
        ? "We could not read text from this file. Try a clearer PDF export of your resume."
        : result.error,
    );
  }

  return {
    parsedProfile: result.data ?? null,
    uploadStatus: result.status,
    missingRequiredFields: result.missing_required_fields ?? [],
  };
}

/**
 * Ask the backend for CV improvement suggestions.
 *
 * Input is the parsed CandidateProfile (not the raw file).
 * Output is a list of prioritized suggestions for the profile screen.
 */
export async function fetchCvSuggestions(
  candidateProfile: ApiCandidateProfile,
): Promise<ApiCvSuggestion[]> {
  const response = await fetch(HR_CLIENT_SUGGESTIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(candidateProfile),
  });

  if (!response.ok) {
    const message = await readApiErrorMessage(response);
    throw new Error(message);
  }

  const result = (await response.json()) as ApiSuggestionsResponse;

  if (result.status === "failed" || result.error) {
    throw new Error(result.error ?? "Could not load suggestions right now.");
  }

  return result.suggestions ?? [];
}
