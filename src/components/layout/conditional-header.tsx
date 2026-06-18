"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/header";
import { isRouteWithoutNav } from "@/config/auth-routes";
import { isDashboardRoute } from "@/config/dashboard-routes";
import { isGuestPreviewRoute } from "@/config/guest-preview-routes";

export function ConditionalHeader() {
  const pathname = usePathname();

  if (
    isRouteWithoutNav(pathname) ||
    isDashboardRoute(pathname) ||
    isGuestPreviewRoute(pathname ?? "")
  ) {
    return null;
  }

  return <Header />;
}
