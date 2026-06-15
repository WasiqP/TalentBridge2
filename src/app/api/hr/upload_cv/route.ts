import { NextResponse } from "next/server";

import { HR_API_BASE_URL, HR_API_UPLOAD_CV_PATH } from "@/config/hr-backend-api-routes";
import { prepareResumePdfForBackend } from "@/lib/api/convert-resume-to-pdf";

/**
 * Same-origin proxy for POST /upload_cv.
 * Accepts PDF, DOC, and DOCX from the browser, converts Word files to PDF,
 * then forwards a PDF to Railway (their API only accepts PDF today).
 */
export async function POST(request: Request) {
  try {
    const incomingForm = await request.formData();
    const cvFile = incomingForm.get("file");

    if (!cvFile || !(cvFile instanceof Blob)) {
      return NextResponse.json({ error: "Missing CV file." }, { status: 400 });
    }

    const originalFileName =
      cvFile instanceof File && cvFile.name ? cvFile.name : "resume.pdf";
    const mimeType = cvFile instanceof File ? cvFile.type : undefined;
    const fileBuffer = Buffer.from(await cvFile.arrayBuffer());

    // Word uploads are turned into PDF here so the backend parser can read them.
    const { pdfBuffer, pdfFileName } = await prepareResumePdfForBackend(
      fileBuffer,
      originalFileName,
      mimeType,
    );

    const backendForm = new FormData();
    const pdfBlob = new Blob([new Uint8Array(pdfBuffer)], {
      type: "application/pdf",
    });
    backendForm.append("file", pdfBlob, pdfFileName);

    const backendResponse = await fetch(
      `${HR_API_BASE_URL}${HR_API_UPLOAD_CV_PATH}`,
      {
        method: "POST",
        body: backendForm,
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
    if (error instanceof Error && error.message.includes("Invalid file type")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof Error && error.message.includes("could not read text")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("[api/hr/upload_cv] proxy error", error);
    return NextResponse.json(
      { error: "Could not reach the CV parsing service." },
      { status: 502 },
    );
  }
}
