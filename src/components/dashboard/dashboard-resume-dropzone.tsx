"use client";

import { useRef, useState } from "react";
import { FileUp } from "lucide-react";

import { cn } from "@/lib/utils";

const formats = ["PDF", "DOCX", "DOC"] as const;

const ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const MAX_BYTES = 10 * 1024 * 1024;

function isAllowedResume(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !["pdf", "doc", "docx"].includes(extension)) return false;
  return file.size <= MAX_BYTES;
}

export function DashboardResumeDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFile(file: File) {
    if (!isAllowedResume(file)) {
      setError("Please upload a PDF or Word file under 10 MB.");
      setSelectedFile(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
    console.log("[resume-upload]", { name: file.name, size: file.size, type: file.type });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="relative flex w-full min-h-[min(320px,45vh)] flex-col">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={handleInputChange}
        aria-hidden
        tabIndex={-1}
      />

      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent-lime/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-6 h-36 w-36 rounded-full bg-accent-violet/10 blur-3xl"
        aria-hidden
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
          "relative flex w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-[22px] border border-dashed px-6 py-10 text-left transition-colors sm:rounded-[26px] sm:px-10 sm:py-12",
          dragActive
            ? "border-accent-lime bg-accent-lime/10"
            : "border-ink-900/18 bg-paper-100/50 hover:border-ink-900/28 hover:bg-paper-100/80",
        )}
        aria-label="Upload resume. Click to browse or drop a file."
      >
        <div className="flex flex-col items-center text-center">
          <span className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-ink-900/8 bg-paper-50 shadow-sm">
            <span
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-lime/30 via-accent-cyan/20 to-accent-violet/15"
              aria-hidden
            />
            <FileUp
              className="relative h-7 w-7 text-ink-950"
              strokeWidth={1.75}
              aria-hidden
            />
          </span>

          <h2 className="text-balance text-[clamp(1.25rem,3vw,1.5rem)] font-medium tracking-[-0.02em] text-ink-950">
            {selectedFile ? selectedFile.name : "Drop your resume here"}
          </h2>
          <p className="mt-2 max-w-[28ch] text-pretty text-[14px] leading-relaxed text-ink-500 sm:text-[15px]">
            {selectedFile
              ? "File ready. Click to choose a different resume."
              : "Drag and drop your file into this area, or click to browse from your device."}
          </p>

          <ul
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
            aria-label="Supported file types"
          >
            {formats.map((format) => (
              <li
                key={format}
                className="rounded-full border border-ink-900/10 bg-paper-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-600"
              >
                {format}
              </li>
            ))}
          </ul>

          {error ? (
            <p className="mt-4 text-[13px] font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : (
            <p className="mt-6 text-[12px] text-ink-400">
              Max 10 MB · We&apos;ll parse your experience automatically
            </p>
          )}
        </div>
      </button>
    </div>
  );
}
