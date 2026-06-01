import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    console.log("[auth] forgot-password", { email: body.email });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send reset code. Please try again." },
      { status: 500 },
    );
  }
}
