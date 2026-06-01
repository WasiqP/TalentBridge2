import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.email || !body?.password || !body?.firstName) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (String(body.password).length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    console.log("[auth] sign-up", {
      email: body.email,
      company: body.company,
    });

    return NextResponse.json({ ok: true, requiresVerification: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to create account. Please try again." },
      { status: 500 },
    );
  }
}
