"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { isAuthRoute } from "@/config/auth-routes";
import { isDashboardRoute } from "@/config/dashboard-routes";

export function ConditionalFooter() {
  const pathname = usePathname();

  if (isAuthRoute(pathname) || isDashboardRoute(pathname)) {
    return null;
  }

  return <Footer />;
}
