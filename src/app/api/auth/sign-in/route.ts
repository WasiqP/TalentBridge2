import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.email || !body?.password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    console.log("[auth] sign-in", { email: body.email, remember: body.remember });

    return NextResponse.json({
      ok: true,
      requiresVerification: false,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in. Please try again." },
      { status: 500 },
    );
  }
}
