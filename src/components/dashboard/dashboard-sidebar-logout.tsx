"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { USER_ROLE_STORAGE_KEY } from "@/config/user-roles";

export function DashboardSidebarLogout() {
  const router = useRouter();

  function handleLogout() {
    sessionStorage.removeItem(USER_ROLE_STORAGE_KEY);
    router.push("/sign-in");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-[14px] font-medium text-ink-700 transition hover:border-ink-900/20 hover:bg-paper-100 hover:text-ink-950"
    >
      <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} />
      Log out
    </button>
  );
}
