import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/forms/sign-up-form";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Start your 14-day free trial. No credit card required.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <AuthShell
      fullViewport
      title="Create your account"
      subtitle="Free for 14 days. Set up your first role in under 30 minutes."
    >
      <SignUpForm />
    </AuthShell>
  );
}
