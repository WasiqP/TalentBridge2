"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";

import { cn } from "@/lib/utils";

type PdfCanvasPagesProps = {
  fileUrl: string;
};

let workerConfigured = false;

async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");

  if (!workerConfigured && typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
    workerConfigured = true;
  }

  return pdfjs;
}

export function PdfCanvasPages({ fileUrl }: PdfCanvasPagesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [pageCount, setPageCount] = useState(0);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const taskRef = useRef<PDFDocumentLoadingTask | null>(null);
  const paintTokenRef = useRef(0);
  const lastWidthRef = useRef(0);
  const isReadyRef = useRef(false);

  const paintPages = useCallback(async (showLoading: boolean) => {
    const target = scrollRef.current;
    const wrapper = wrapperRef.current;
    if (!target || !wrapper || !pdfRef.current) return false;

    const containerWidth = wrapper.clientWidth;
    if (containerWidth < 1) return false;

    const token = ++paintTokenRef.current;
    if (showLoading) setStatus("loading");

    target.innerHTML = "";
    const pdf = pdfRef.current;

    try {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        if (token !== paintTokenRef.current) return false;

        const page = await pdf.getPage(pageNum);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.className = "mx-auto block max-w-full bg-paper-50 shadow-sm";
        canvas.setAttribute("role", "img");
        canvas.setAttribute(
          "aria-label",
          `Page ${pageNum} of ${pdf.numPages}`,
        );

        const pageWrap = document.createElement("div");
        pageWrap.className = "mb-3 last:mb-0";
        pageWrap.appendChild(canvas);
        target.appendChild(pageWrap);

        await page.render({ canvas, viewport }).promise;
      }

      if (token !== paintTokenRef.current) return false;

      lastWidthRef.current = containerWidth;
      setStatus("ready");
      isReadyRef.current = true;
      return true;
    } catch {
      if (token === paintTokenRef.current) setStatus("error");
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    isReadyRef.current = false;
    paintTokenRef.current += 1;

    async function cleanupPdf() {
      paintTokenRef.current += 1;
      if (pdfRef.current) {
        try {
          await pdfRef.current.cleanup();
        } catch {
          /* ignore */
        }
        pdfRef.current = null;
      }
      if (taskRef.current) {
        try {
          await taskRef.current.destroy();
        } catch {
          /* ignore */
        }
        taskRef.current = null;
      }
    }

    async function load() {
      setStatus("loading");
      setPageCount(0);
      if (scrollRef.current) scrollRef.current.innerHTML = "";

      try {
        await cleanupPdf();
        if (cancelled) return;

        const pdfjs = await loadPdfJs();
        const task = pdfjs.getDocument({ url: fileUrl });
        taskRef.current = task;
        const pdf = await task.promise;
        if (cancelled) {
          await pdf.cleanup();
          await task.destroy();
          return;
        }

        pdfRef.current = pdf;
        setPageCount(pdf.numPages);

        // Wait until layout gives us a real width (avoids 0-width paint + resize loop).
        for (let attempt = 0; attempt < 20; attempt++) {
          if (cancelled) return;
          const painted = await paintPages(true);
          if (painted) return;
          await new Promise((r) => requestAnimationFrame(r));
        }

        if (!cancelled) setStatus("error");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void load();

    return () => {
      cancelled = true;
      isReadyRef.current = false;
      void cleanupPdf();
    };
  }, [fileUrl, paintPages]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width < 1 || !isReadyRef.current || !pdfRef.current) return;
      if (Math.abs(width - lastWidthRef.current) < 16) return;

      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        void paintPages(false);
      }, 250);
    });

    observer.observe(wrapper);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, [fileUrl, paintPages]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-full min-h-0 w-full overflow-hidden"
    >
      {status === "loading" ? (
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-paper-100/80">
          <Loader2 className="h-6 w-6 animate-spin text-ink-500" aria-hidden />
          <span className="sr-only">Loading PDF</span>
        </div>
      ) : null}
      {status === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="text-[14px] font-medium text-ink-950">
            Could not preview this PDF
          </p>
          <p className="text-[13px] text-ink-500">Try uploading the file again.</p>
        </div>
      ) : null}
      <div
        ref={scrollRef}
        data-lenis-prevent
        data-lenis-prevent-wheel
        onWheel={(e) => e.stopPropagation()}
        className={cn(
          "absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-3 sm:px-4 sm:py-4",
          status === "error" && "hidden",
        )}
        aria-label={
          pageCount > 0 ? `PDF document, ${pageCount} pages` : "PDF document"
        }
      />
    </div>
  );
}
