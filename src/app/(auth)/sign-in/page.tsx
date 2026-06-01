import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/forms/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your TalentBridge account.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your recruiting copilot — pick up right where your pipeline left off."
    >
      <SignInForm />
    </AuthShell>
  );
}
