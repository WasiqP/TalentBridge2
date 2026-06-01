import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.email || !body?.code) {
      return NextResponse.json(
        { error: "Email and verification code are required." },
        { status: 400 },
      );
    }

    if (String(body.code).length !== 6) {
      return NextResponse.json(
        { error: "Please enter a valid 6-digit code." },
        { status: 400 },
      );
    }

    console.log("[auth] verify", {
      email: body.email,
      flow: body.flow,
      code: body.code,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 },
    );
  }
}
