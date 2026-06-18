"use client";

import { usePathname } from "next/navigation";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { isRouteWithoutNav } from "@/config/auth-routes";
import { isDashboardRoute } from "@/config/dashboard-routes";
import { isGuestPreviewRoute } from "@/config/guest-preview-routes";

export function ConditionalAnnouncementBar() {
  const pathname = usePathname();

  if (
    isRouteWithoutNav(pathname) ||
    isDashboardRoute(pathname) ||
    isGuestPreviewRoute(pathname ?? "")
  ) {
    return null;
  }

  return <AnnouncementBar />;
}
