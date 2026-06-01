"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ArrowLeft, Check, Loader2, Mail } from "lucide-react";

import { AuthField } from "@/components/auth/auth-field";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-lime/15 text-accent-lime">
          <Check className="h-7 w-7" strokeWidth={2} />
        </span>
        <h2 className="mt-6 text-xl font-medium tracking-tight text-ink-950">
          Check your inbox
        </h2>
        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink-500">
          If an account exists for{" "}
          <span className="font-medium text-ink-900">{email}</span>, we sent a
          6-digit code to reset your password.
        </p>
        <Button
          type="button"
          variant="lime"
          size="lg"
          className="mt-8 w-full"
          onClick={() =>
            router.push(`/verify?email=${encodeURIComponent(email)}&flow=reset`)
          }
        >
          Enter verification code
        </Button>
        <Link
          href="/sign-in"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-ink-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-start gap-3 rounded-2xl border border-ink-900/8 bg-paper-100 px-4 py-3.5">
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" />
        <p className="text-pretty text-[13px] leading-relaxed text-ink-600">
          Enter the email you use for TalentBridge. We&apos;ll send a one-time
          code to verify it&apos;s you.
        </p>
      </div>

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

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" variant="lime" size="lg" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending code…
          </>
        ) : (
          "Send reset code"
        )}
      </Button>

      <Link
        href="/sign-in"
        className="flex items-center justify-center gap-1.5 text-sm font-medium text-ink-600 hover:text-ink-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </form>
  );
}
