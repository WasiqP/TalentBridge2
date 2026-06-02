"use client";

import dynamic from "next/dynamic";
import { FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PdfCanvasPages = dynamic(
  () =>
    import("@/components/dashboard/dashboard-pdf-canvas-pages").then(
      (mod) => mod.PdfCanvasPages,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-paper-100/80">
        <Loader2 className="h-6 w-6 animate-spin text-ink-500" aria-hidden />
        <span className="sr-only">Loading PDF preview</span>
      </div>
    ),
  },
);

type DashboardPdfViewerProps = {
  fileName?: string;
  fileUrl: string | null;
  mimeType?: string;
  className?: string;
};

function isPdfFile(fileName?: string, mimeType?: string) {
  if (mimeType === "application/pdf") return true;
  const ext = fileName?.split(".").pop()?.toLowerCase();
  return ext === "pdf";
}

export function DashboardPdfViewer({
  fileName,
  fileUrl,
  mimeType,
  className,
}: DashboardPdfViewerProps) {
  const showPdf = Boolean(fileUrl && isPdfFile(fileName, mimeType));

  return (
    <section
      className={cn(
        "flex h-full min-h-0 max-h-full flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]",
        className,
      )}
      aria-label="Uploaded resume preview"
    >
      <div className="flex items-center justify-between border-b border-ink-900/8 px-5 py-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
            Your upload
          </p>
          <p className="mt-1 truncate text-[14px] font-medium text-ink-950">
            {fileName ?? "Resume"}
          </p>
        </div>
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-ink-900/10 bg-paper-100">
          <FileText className="h-5 w-5 text-ink-800" aria-hidden />
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-paper-100/60">
        {showPdf && fileUrl ? (
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <PdfCanvasPages fileUrl={fileUrl} />
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-ink-900/10 bg-paper-50">
              <FileText className="h-7 w-7 text-ink-400" strokeWidth={1.5} />
            </span>
            <p className="text-[15px] font-medium text-ink-950">
              Preview not available
            </p>
            <p className="max-w-[28ch] text-[13px] leading-relaxed text-ink-500">
              Word documents are parsed in the background. PDF uploads show a
              live preview here.
            </p>
            {fileName ? (
              <p className="text-[12px] text-ink-400">{fileName}</p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
