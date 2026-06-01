"use client";

import { usePathname } from "next/navigation";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { isRouteWithoutNav } from "@/config/auth-routes";
import { isDashboardRoute } from "@/config/dashboard-routes";

export function ConditionalAnnouncementBar() {
  const pathname = usePathname();

  if (isRouteWithoutNav(pathname) || isDashboardRoute(pathname)) {
    return null;
  }

  return <AnnouncementBar />;
}
