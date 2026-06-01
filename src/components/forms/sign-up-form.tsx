"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

import { AuthDivider, SocialAuthButtons } from "@/components/auth/auth-divider";
import { AuthField } from "@/components/auth/auth-field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sign up failed");

      router.push(`/verify?email=${encodeURIComponent(form.email)}`);
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

      <div className="grid gap-5 sm:grid-cols-2">
        <AuthField
          label="First name"
          name="firstName"
          autoComplete="given-name"
          placeholder="Maya"
          required
          value={form.firstName}
          onChange={(e) => update("firstName", e.target.value)}
        />
        <AuthField
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          placeholder="Collins"
          required
          value={form.lastName}
          onChange={(e) => update("lastName", e.target.value)}
        />
      </div>

      <AuthField
        label="Work email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        required
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />

      <AuthField
        label="Company"
        name="company"
        autoComplete="organization"
        placeholder="Northwind Labs"
        required
        value={form.company}
        onChange={(e) => update("company", e.target.value)}
      />

      <AuthField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="At least 8 characters"
        required
        hint="Use 8+ characters with a number and symbol."
        value={form.password}
        onChange={(e) => update("password", e.target.value)}
      />

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-ink-900/20 text-ink-950 focus:ring-accent-lime"
        />
        <span className="text-[13px] leading-relaxed text-ink-600">
          I agree to the{" "}
          <Link href="/terms" className="font-medium text-ink-950 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-ink-950 hover:underline">
            Privacy Policy
          </Link>
          .
        </span>
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
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-center text-[14px] text-ink-500">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-ink-950 underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
