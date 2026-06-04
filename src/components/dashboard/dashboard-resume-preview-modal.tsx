"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { DashboardPdfViewer } from "@/components/dashboard/dashboard-pdf-viewer";

type DashboardResumePreviewModalProps = {
  open: boolean;
  onClose: () => void;
  fileName?: string;
  fileUrl: string | null;
  mimeType?: string;
};

export function DashboardResumePreviewModal({
  open,
  onClose,
  fileName,
  fileUrl,
  mimeType,
}: DashboardResumePreviewModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
            aria-label="Close resume preview"
            onClick={onClose}
          />
          <motion.div
            className="relative flex h-[min(88vh,720px)] w-full max-w-2xl flex-col"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-2 right-0 z-10 inline-flex h-10 w-10 translate-y-[-100%] items-center justify-center rounded-full border border-ink-900/10 bg-paper-50 text-ink-800 shadow-sm transition hover:bg-paper-100 sm:right-2"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
            <DashboardPdfViewer
              className="h-full min-h-0"
              fileName={fileName}
              fileUrl={fileUrl}
              mimeType={mimeType}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
