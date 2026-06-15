/**
 * HR backend connectivity — base URL and endpoint paths.
 *
 * Browser calls same-origin `/api/hr/*` proxies (no CORS).
 * Those routes forward to Railway using HR_API_BASE_URL.
 * Docs: https://hr-ai-management-system-production.up.railway.app/docs
 */

/** Railway API root — used by server-side proxy routes. */
export const HR_API_BASE_URL =
  process.env.HR_API_BASE_URL ??
  process.env.NEXT_PUBLIC_HR_API_BASE_URL ??
  "https://hr-ai-management-system-production.up.railway.app";

/** POST — upload a CV file and get a parsed candidate profile back. */
export const HR_API_UPLOAD_CV_PATH = "/upload_cv";

/** POST — send a parsed profile and get CV improvement suggestions back. */
export const HR_API_SUGGESTIONS_PATH = "/suggestions";

/** Same-origin URLs the frontend should call (avoids CORS). */
export const HR_CLIENT_UPLOAD_CV_URL = "/api/hr/upload_cv";
export const HR_CLIENT_SUGGESTIONS_URL = "/api/hr/suggestions";

/** Keys used in sessionStorage so profile + suggestions survive page navigation. */
export const HR_SESSION_PARSED_PROFILE_KEY = "talentdrobe:hr-parsed-profile";
export const HR_SESSION_CV_SUGGESTIONS_KEY = "talentdrobe:hr-cv-suggestions";
