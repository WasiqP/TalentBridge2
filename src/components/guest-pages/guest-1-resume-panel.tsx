"use client";

import { useEffect, useRef, useState } from "react";
import { FileUp } from "lucide-react";

import { DashboardPdfViewer } from "@/components/dashboard/dashboard-pdf-viewer";
import { cn } from "@/lib/utils";

const ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const MAX_BYTES = 10 * 1024 * 1024;

function isAllowedResume(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !["pdf", "doc", "docx"].includes(extension)) return false;
  return file.size <= MAX_BYTES;
}

type Guest1ResumePanelProps = {
  className?: string;
};

/** Left-panel resume upload and preview for guest option 1. */
export function Guest1ResumePanel({ className }: Guest1ResumePanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileUrlRef = useRef<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    };
  }, []);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFile(next: File) {
    if (!isAllowedResume(next)) {
      setError("Please upload a PDF or Word file under 10 MB.");
      return;
    }

    setError(null);
    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);

    const url = URL.createObjectURL(next);
    fileUrlRef.current = url;
    setFile(next);
    setFileUrl(url);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.files?.[0];
    if (next) handleFile(next);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const next = e.dataTransfer.files?.[0];
    if (next) handleFile(next);
  }

  if (file && fileUrl) {
    return (
      <div className={cn("flex h-full min-h-0 flex-col", className)}>
        <DashboardPdfViewer
          fileName={file.name}
          fileUrl={fileUrl}
          mimeType={file.type}
          className="h-full min-h-0 flex-1 rounded-[24px] border-2 border-ink-900/18 shadow-none"
        />
        <button
          type="button"
          onClick={openFilePicker}
          className="mt-3 shrink-0 self-center text-[12px] font-medium text-ink-500 transition hover:text-ink-950"
        >
          Upload a different resume
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={handleInputChange}
          aria-hidden
          tabIndex={-1}
        />
      </div>
    );
  }

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={handleInputChange}
        aria-hidden
        tabIndex={-1}
      />

      <button
        type="button"
        onClick={openFilePicker}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }}
        onDrop={handleDrop}
        className={cn(
          "flex h-full min-h-[10rem] flex-1 cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed px-6 py-10 text-center transition-colors",
          dragActive
            ? "border-accent-lime bg-accent-lime/10"
            : "border-ink-900/22 bg-paper-50/55 hover:border-ink-900/32 hover:bg-paper-50/75",
          "backdrop-blur-xl backdrop-saturate-150",
        )}
        aria-label="Upload resume. Click to browse or drop a file."
      >
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-ink-900/8 bg-paper-50 shadow-sm">
          <FileUp className="h-6 w-6 text-ink-800" strokeWidth={1.75} aria-hidden />
        </span>

        <h2 className="text-balance text-[clamp(1.1rem,2.5vw,1.35rem)] font-medium tracking-[-0.02em] text-ink-950">
          Please upload your resume
        </h2>
        <p className="mt-2 max-w-[26ch] text-pretty text-[13px] leading-relaxed text-ink-500 sm:text-[14px]">
          Drag and drop your file here, or click to browse from your device.
        </p>

        <ul
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
          aria-label="Supported file types"
        >
          {["PDF", "DOCX", "DOC"].map((format) => (
            <li
              key={format}
              className="rounded-full border border-ink-900/10 bg-paper-50/90 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-600"
            >
              {format}
            </li>
          ))}
        </ul>

        {error ? (
          <p className="mt-4 text-[12px] font-medium text-red-600" role="alert">
            {error}
          </p>
        ) : (
          <p className="mt-4 text-[11px] text-ink-400">Max 10 MB</p>
        )}
      </button>
    </div>
  );
}
