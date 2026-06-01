import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { VerifyCodeForm } from "@/components/forms/verify-code-form";

export const metadata: Metadata = {
  title: "Verify email",
  description: "Enter your verification code.",
  robots: { index: false, follow: false },
};

export default function VerifyPage() {
  return (
    <AuthShell
      title="Check your email"
      subtitle="Enter the 6-digit code we sent you. It expires in 10 minutes."
    >
      <VerifyCodeForm />
    </AuthShell>
  );
}
