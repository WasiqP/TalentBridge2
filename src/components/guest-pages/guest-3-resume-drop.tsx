"use client";

import { useRef, useState } from "react";
import { FileUp } from "lucide-react";

import { cn } from "@/lib/utils";

const ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const MAX_BYTES = 10 * 1024 * 1024;

function isAllowedResume(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !["pdf", "doc", "docx"].includes(extension)) return false;
  return file.size <= MAX_BYTES;
}

type Guest3ResumeDropProps = {
  onFile: (fileName: string) => void;
  sampleFileName?: string;
  className?: string;
};

/** Compact resume drop — sits below the hero chat bar on guest-3. */
export function Guest3ResumeDrop({
  onFile,
  sampleFileName = "Jordan_Avery_Resume.pdf",
  className,
}: Guest3ResumeDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File) {
    if (!isAllowedResume(file)) {
      setError("Please upload a PDF or Word file under 10 MB.");
      return;
    }
    setError(null);
    onFile(file.name);
  }

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border border-dashed px-4 py-3.5 text-left transition-colors sm:gap-4 sm:px-5 sm:py-4",
          dragActive
            ? "border-accent-lime/55 bg-accent-lime/12"
            : "border-ink-900/18 bg-white/92 hover:border-accent-lime/40 hover:bg-accent-lime/[0.06]",
        )}
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-lime text-ink-950 sm:h-11 sm:w-11">
          <FileUp className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-semibold text-ink-950 sm:text-[15px]">
            Drop your resume here
          </span>
          <span className="mt-0.5 block text-[12px] text-ink-500 sm:text-[13px]">
            PDF, DOC, DOCX · click or drag
          </span>
        </span>
      </button>

      {error ? (
        <p className="mt-2 text-center text-[12px] text-red-600">{error}</p>
      ) : (
        <button
          type="button"
          onClick={() => onFile(sampleFileName)}
          className="mt-2.5 w-full text-[12px] font-medium text-ink-600 underline-offset-4 transition hover:text-ink-950 hover:underline sm:text-[13px]"
        >
          No resume handy? Try a sample →
        </button>
      )}
    </div>
  );
}
