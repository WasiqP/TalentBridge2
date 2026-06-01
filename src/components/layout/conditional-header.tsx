"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/header";
import { isRouteWithoutNav } from "@/config/auth-routes";
import { isDashboardRoute } from "@/config/dashboard-routes";

export function ConditionalHeader() {
  const pathname = usePathname();

  if (isRouteWithoutNav(pathname) || isDashboardRoute(pathname)) {
    return null;
  }

  return <Header />;
}
