import { NextResponse } from "next/server";

import {
  HR_API_BASE_URL,
  HR_API_SUGGESTIONS_PATH,
} from "@/config/hr-backend-api-routes";

/**
 * Same-origin proxy for POST /suggestions.
 * Forwards the parsed profile JSON to Railway without triggering browser CORS.
 */
export async function POST(request: Request) {
  try {
    const profileJson = await request.text();

    if (!profileJson) {
      return NextResponse.json(
        { error: "Missing candidate profile body." },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      `${HR_API_BASE_URL}${HR_API_SUGGESTIONS_PATH}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: profileJson,
      },
    );

    const responseBody = await backendResponse.text();

    return new NextResponse(responseBody, {
      status: backendResponse.status,
      headers: {
        "Content-Type":
          backendResponse.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("[api/hr/suggestions] proxy error", error);
    return NextResponse.json(
      { error: "Could not reach the suggestions service." },
      { status: 502 },
    );
  }
}
