"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getDashboardPathForRole,
  USER_ROLE_STORAGE_KEY,
  userRoleOptions,
} from "@/config/user-roles";
import type { UserRole } from "@/types/user-role";
import { cn } from "@/lib/utils";

export function SelectRoleForm() {
  const router = useRouter();
  const [selected, setSelected] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleContinue() {
    if (!selected) return;

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/select-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selected }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to save your role");

      sessionStorage.setItem(USER_ROLE_STORAGE_KEY, selected);
      router.push(getDashboardPathForRole(selected));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {userRoleOptions.map(({ id, title, description, icon: Icon }) => {
          const isSelected = selected === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelected(id)}
              aria-pressed={isSelected}
              className={cn(
                "flex min-h-[180px] flex-col items-start gap-4 rounded-[20px] border bg-paper-50 p-6 text-left transition sm:min-h-[200px] sm:p-7",
                isSelected
                  ? "border-ink-950 ring-2 ring-accent-lime/35"
                  : "border-ink-900/12 hover:border-ink-900/25",
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14",
                  isSelected
                    ? "bg-accent-lime/20 text-ink-950"
                    : "bg-ink-900/[0.06] text-ink-700",
                )}
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-[17px] font-medium text-ink-950 sm:text-lg">
                  {title}
                </span>
                <span className="mt-2 block text-pretty text-[14px] leading-relaxed text-ink-500 sm:text-[15px]">
                  {description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <Button
        type="button"
        variant="lime"
        size="lg"
        disabled={!selected || loading}
        onClick={handleContinue}
        className={cn("h-14 w-full text-[16px]", loading && "opacity-80")}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Continuing…
          </>
        ) : (
          "Continue"
        )}
      </Button>

      <p className="text-center text-[14px] text-ink-400">
        You can change this later in account settings.
      </p>
    </div>
  );
}
