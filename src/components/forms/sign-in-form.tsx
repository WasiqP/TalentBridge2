"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

import { AuthDivider, SocialAuthButtons } from "@/components/auth/auth-divider";
import { AuthField } from "@/components/auth/auth-field";
import { Button } from "@/components/ui/button";
import { SELECT_ROLE_PATH } from "@/config/user-roles";
import { cn } from "@/lib/utils";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sign in failed");

      if (data.requiresVerification) {
        router.push(`/verify?email=${encodeURIComponent(email)}`);
        return;
      }
      router.push(SELECT_ROLE_PATH);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <SocialAuthButtons />
      <AuthDivider />

      <AuthField
        label="Work email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
            Password
          </span>
          <Link
            href="/forgot-password"
            className="text-[13px] font-medium text-ink-700 underline-offset-4 hover:text-ink-950 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex h-12 w-full rounded-2xl border border-ink-900/12 bg-paper-50 px-4 text-[15px] text-ink-900 transition placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-lime/30"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="h-4 w-4 rounded border-ink-900/20 text-ink-950 focus:ring-accent-lime"
        />
        <span className="text-[14px] text-ink-600">Keep me signed in for 30 days</span>
      </label>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="lime"
        size="lg"
        disabled={loading}
        className={cn("w-full", loading && "opacity-80")}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <p className="text-center text-[14px] text-ink-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-ink-950 underline-offset-4 hover:underline"
        >
          Create one free
        </Link>
      </p>
    </form>
  );
}
