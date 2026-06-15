import mammoth from "mammoth";
import PDFDocument from "pdfkit";
import WordExtractor from "word-extractor";

type ResumeFileKind = "pdf" | "doc" | "docx";

function getResumeExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) return "";
  return fileName.slice(dotIndex + 1).toLowerCase();
}

/** Figures out whether the upload is PDF, DOC, or DOCX. */
export function getResumeFileKind(
  fileName: string,
  mimeType?: string,
): ResumeFileKind | null {
  const extension = getResumeExtension(fileName);

  if (extension === "pdf" || mimeType === "application/pdf") return "pdf";
  if (
    extension === "docx" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "docx";
  }
  if (extension === "doc" || mimeType === "application/msword") return "doc";

  return null;
}

/** Pulls plain text out of a DOCX buffer using mammoth. */
async function extractTextFromDocx(fileBuffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer: fileBuffer });
  return result.value.trim();
}

/** Pulls plain text out of a legacy .doc buffer using word-extractor. */
async function extractTextFromDoc(fileBuffer: Buffer): Promise<string> {
  const extractor = new WordExtractor();
  const document = await extractor.extract(fileBuffer);
  return document.getBody().trim();
}

/** Builds a simple PDF from plain text so the HR API (PDF-only) can parse it. */
function buildPdfFromText(resumeText: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const pdf = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    pdf.on("data", (chunk: Buffer) => chunks.push(chunk));
    pdf.on("end", () => resolve(Buffer.concat(chunks)));
    pdf.on("error", reject);

    pdf.fontSize(11).text(resumeText || " ", { lineGap: 4 });
    pdf.end();
  });
}

/**
 * The HR backend only accepts PDF uploads.
 * Word files are converted here before we forward them to Railway.
 */
export async function prepareResumePdfForBackend(
  fileBuffer: Buffer,
  originalFileName: string,
  mimeType?: string,
): Promise<{ pdfBuffer: Buffer; pdfFileName: string }> {
  const fileKind = getResumeFileKind(originalFileName, mimeType);

  if (!fileKind) {
    throw new Error(
      "Invalid file type. Please upload a PDF, DOC, or DOCX resume.",
    );
  }

  if (fileKind === "pdf") {
    return { pdfBuffer: fileBuffer, pdfFileName: originalFileName };
  }

  const resumeText =
    fileKind === "docx"
      ? await extractTextFromDocx(fileBuffer)
      : await extractTextFromDoc(fileBuffer);

  if (!resumeText) {
    throw new Error(
      "We could not read text from this Word file. Try exporting it as PDF and upload again.",
    );
  }

  const baseName = originalFileName.replace(/\.(docx?|pdf)$/i, "") || "resume";
  const pdfBuffer = await buildPdfFromText(resumeText);

  return {
    pdfBuffer,
    pdfFileName: `${baseName}.pdf`,
  };
}
