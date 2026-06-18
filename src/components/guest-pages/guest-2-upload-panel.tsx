"use client";

import { useRef, useState } from "react";
import { FileText, FileUp, Sparkles } from "lucide-react";

import {
  DashboardExtractionPanel,
  type ExtractionStep,
} from "@/components/dashboard/dashboard-extraction-panel";
import { cn } from "@/lib/utils";

const ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const MAX_BYTES = 10 * 1024 * 1024;

const PARSE_POINTS = [
  "Work history & dates",
  "Skills & tools",
  "Education & certs",
  "Contact & links",
] as const;

function isAllowedResume(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !["pdf", "doc", "docx"].includes(extension)) return false;
  return file.size <= MAX_BYTES;
}

type Guest2UploadPanelProps = {
  fileName?: string;
  steps: ExtractionStep[];
  isExtracting: boolean;
  isComplete: boolean;
  errorMessage?: string | null;
  onFileSelected: (file: File) => void;
  onRetry?: () => void;
};

/** Panel 2 — résumé drop zone and live extraction progress. */
export function Guest2UploadPanel({
  fileName,
  steps,
  isExtracting,
  isComplete,
  errorMessage,
  onFileSelected,
  onRetry,
}: Guest2UploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showDropzone = !isExtracting && !isComplete && !fileName;

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFile(file: File) {
    if (!isAllowedResume(file)) {
      setError("Please upload a PDF or Word file under 10 MB.");
      return;
    }
    setError(null);
    onFileSelected(file);
  }

  return (
    <section className="flex h-screen w-screen shrink-0 grow-0 basis-[100vw] bg-white px-6 pt-16 pb-8 sm:px-10">
      <div className="mx-auto grid w-full max-w-5xl min-h-0 flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
        <div className="shrink-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
            Step 2
          </p>
          <h2 className="mt-2 text-[32px] font-medium tracking-[-0.03em] text-ink-950 sm:text-[38px]">
            Drop your résumé
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-500">
            We read every section and turn it into a structured profile. You stay
            on this screen while we work — then we take you straight to your
            profile.
          </p>

          <ul className="mt-8 space-y-3">
            {PARSE_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[14px] text-ink-700">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-900/10 bg-white">
                  <Sparkles className="h-3.5 w-3.5 text-ink-700" aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex min-h-0 flex-col justify-center">
          {showDropzone ? (
            <>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = "";
                }}
                aria-hidden
                tabIndex={-1}
              />

              <button
                type="button"
                onClick={openFilePicker}
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
                  "flex min-h-[min(380px,58vh)] w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed px-6 py-10 text-center transition-all",
                  dragActive
                    ? "border-[#CBFF4D] bg-[#CBFF4D]/8 shadow-[0_0_0_4px_rgba(203,255,77,0.15)]"
                    : "border-ink-900/14 bg-white shadow-[0_12px_48px_rgba(8,8,12,0.05)] hover:border-ink-900/22",
                )}
                aria-label="Upload resume. Click to browse or drop a file."
              >
                <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-ink-900/8 bg-ink-900/[0.03]">
                  <FileUp className="h-7 w-7 text-ink-800" strokeWidth={1.75} aria-hidden />
                </span>

                <p className="text-balance text-[clamp(1.15rem,2.5vw,1.45rem)] font-medium tracking-[-0.02em] text-ink-950">
                  Drag & drop your résumé
                </p>
                <p className="mt-2 max-w-[32ch] text-pretty text-[14px] leading-relaxed text-ink-500">
                  Or click to browse — PDF, DOC, or DOCX up to 10 MB.
                </p>

                <ul
                  className="mt-6 flex flex-wrap items-center justify-center gap-2"
                  aria-label="Supported file types"
                >
                  {["PDF", "DOCX", "DOC"].map((format) => (
                    <li
                      key={format}
                      className="rounded-full border border-ink-900/10 bg-ink-900/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-600"
                    >
                      {format}
                    </li>
                  ))}
                </ul>
              </button>

              {error ? (
                <p className="mt-4 text-center text-[13px] font-medium text-red-600" role="alert">
                  {error}
                </p>
              ) : (
                <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-ink-400">
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  Your file is parsed securely and never shared.
                </p>
              )}
            </>
          ) : (
            <div className="w-full">
              <DashboardExtractionPanel
                variant="standalone"
                fileName={fileName}
                steps={steps}
                isComplete={isComplete}
                errorMessage={errorMessage}
                eyebrow="Résumé extraction"
                heading={
                  isComplete
                    ? "Profile ready"
                    : "Building your profile in real time"
                }
                fileHint={
                  isComplete
                    ? "Taking you to your profile…"
                    : "Parsing sections and generating structured data"
                }
                className="border-ink-900/10 bg-white shadow-[0_12px_48px_rgba(8,8,12,0.05)]"
              />

              {errorMessage && onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  className="mt-5 w-full text-center text-[13px] font-medium text-ink-700 underline-offset-4 transition hover:text-ink-950 hover:underline"
                >
                  Try a different file →
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
