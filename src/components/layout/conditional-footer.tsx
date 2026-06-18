"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { isAuthRoute } from "@/config/auth-routes";
import { isDashboardRoute } from "@/config/dashboard-routes";
import { isGuestPreviewRoute } from "@/config/guest-preview-routes";

export function ConditionalFooter() {
  const pathname = usePathname();

  if (
    isAuthRoute(pathname) ||
    isDashboardRoute(pathname) ||
    isGuestPreviewRoute(pathname ?? "")
  ) {
    return null;
  }

  return <Footer />;
}
