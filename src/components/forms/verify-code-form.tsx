"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState, Suspense } from "react";
import { Loader2 } from "lucide-react";

import { OtpInput } from "@/components/auth/otp-input";
import { Button } from "@/components/ui/button";
import { SELECT_ROLE_PATH } from "@/config/user-roles";

function VerifyCodeFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const flow = searchParams.get("flow") ?? "signup";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendSeconds, setResendSeconds] = useState(45);

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const t = setInterval(() => setResendSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendSeconds]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (code.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, flow }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Verification failed");

      if (flow === "reset") {
        router.push("/sign-in?reset=success");
      } else {
        router.push(SELECT_ROLE_PATH);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendSeconds > 0) return;
    setResendSeconds(45);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => `${a}${"•".repeat(Math.min(b.length, 6))}${c}`)
    : "your email";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-ink-900/8 bg-paper-100 px-4 py-3.5 text-center">
        <p className="text-[13px] text-ink-500">Code sent to</p>
        <p className="mt-0.5 font-medium text-ink-950">{maskedEmail || "your inbox"}</p>
      </div>

      <div>
        <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
          6-digit code
        </p>
        <OtpInput value={code} onChange={setCode} disabled={loading} error={error ?? undefined} />
      </div>

      <Button
        type="submit"
        variant="lime"
        size="lg"
        disabled={loading || code.length !== 6}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying…
          </>
        ) : flow === "reset" ? (
          "Verify & continue"
        ) : (
          "Verify email"
        )}
      </Button>

      <p className="text-center text-[14px] text-ink-500">
        Didn&apos;t receive it?{" "}
        {resendSeconds > 0 ? (
          <span className="text-ink-400">Resend in {resendSeconds}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-ink-950 underline-offset-4 hover:underline"
          >
            Resend code
          </button>
        )}
      </p>

      <p className="text-center text-[14px] text-ink-500">
        <Link
          href="/sign-in"
          className="font-medium text-ink-950 underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </form>
  );
}

export function VerifyCodeForm() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-ink-400" />
        </div>
      }
    >
      <VerifyCodeFormInner />
    </Suspense>
  );
}
