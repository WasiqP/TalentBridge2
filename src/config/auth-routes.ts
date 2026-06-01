/** Routes that use the minimal auth chrome (no site footer). */
export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/verify",
  "/select-role",
] as const;

export function isAuthRoute(pathname: string) {
  return authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

/** Routes with no site header (focused onboarding chrome). */
export const routesWithoutNav = ["/select-role"] as const;

export function isRouteWithoutNav(pathname: string) {
  return routesWithoutNav.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
