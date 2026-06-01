import { NextResponse } from "next/server";

import type { UserRole } from "@/types/user-role";

const validRoles: UserRole[] = ["job-seeker", "recruiter"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const role = body?.role as UserRole | undefined;

    if (!role || !validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Please select a valid role." },
        { status: 400 },
      );
    }

    console.log("[auth] select-role", { role });

    return NextResponse.json({ ok: true, role });
  } catch {
    return NextResponse.json(
      { error: "Unable to save your role. Please try again." },
      { status: 500 },
    );
  }
}
