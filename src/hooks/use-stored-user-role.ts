"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getRoleDisplayTitle,
  readStoredUserRole,
  USER_ROLE_STORAGE_KEY,
} from "@/config/user-roles";
import type { UserRole } from "@/types/user-role";

type UseStoredUserRoleOptions = {
  /** Used when nothing is stored yet (e.g. job seeker dashboard). */
  fallback?: UserRole;
};

export function useStoredUserRole(options?: UseStoredUserRoleOptions) {
  const fallback = options?.fallback ?? "job-seeker";
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<UserRole>(fallback);

  const sync = useCallback(() => {
    setRole(readStoredUserRole() ?? fallback);
  }, [fallback]);

  useEffect(() => {
    setMounted(true);
    sync();

    function onStorage(e: StorageEvent) {
      if (e.key === USER_ROLE_STORAGE_KEY) sync();
    }

    function onFocus() {
      sync();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, [sync]);

  const displayRole = mounted ? role : fallback;

  return {
    mounted,
    role: displayRole,
    label: getRoleDisplayTitle(displayRole),
  };
}
