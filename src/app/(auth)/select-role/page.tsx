import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { SelectRoleForm } from "@/components/forms/select-role-form";

export const metadata: Metadata = {
  title: "Choose your role",
  description: "Tell us how you'll use TalentBridge — as a job seeker or recruiter.",
  robots: { index: false, follow: false },
};

export default function SelectRolePage() {
  return (
    <AuthShell
      layout="centered"
      title="Choose your role"
      subtitle="This shapes your experience — pick the path that matches how you'll use TalentBridge."
    >
      <SelectRoleForm />
    </AuthShell>
  );
}
