import { isAuthRoute } from "@/config/auth-routes";
import { isDashboardRoute } from "@/config/dashboard-routes";

/** Marketing pages use splash + lime page transitions. */
export function isMarketingRoute(pathname: string) {
  if (!pathname) return false;
  if (isDashboardRoute(pathname)) return false;
  if (isAuthRoute(pathname)) return false;
  return true;
}

/** Same as Book a demo button — `bg-accent-lime`. */
export const MARKETING_TRANSITION_COLOR = "var(--color-accent-lime)";
