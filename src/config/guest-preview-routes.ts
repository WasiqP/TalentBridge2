/** Client preview pages — bare canvas, no site chrome. */
export const guestPreviewRoutes = [
  "/guest-1",
  "/guest-2",
  "/guest-3",
  "/guest-4",
  "/guest-5",
] as const;

export function isGuestPreviewRoute(pathname: string) {
  return guestPreviewRoutes.some((route) => pathname === route);
}
