"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { FileUp, Sparkles, X } from "lucide-react";

import { DashboardPdfViewer } from "@/components/dashboard/dashboard-pdf-viewer";
import { Guest1ProfileFlow } from "@/components/guest-pages/guest-1-profile-flow";
import type { ExtractionStep } from "@/components/dashboard/dashboard-extraction-panel";
import { Button } from "@/components/ui/button";
import { jobSeekerProfile } from "@/config/job-seeker-profile";
import { cn } from "@/lib/utils";

const PROFILE_STEPS = [
  { id: "read", title: "Reading your résumé", detail: "Parsing sections, dates, and layout" },
  { id: "extract", title: "Extracting experience & skills", detail: "Roles, skills, and impact" },
  { id: "structure", title: "Structuring your profile", detail: "Identity, experience, education" },
  { id: "insights", title: "Generating insights", detail: "Strengths and quick wins" },
];
const STEP_MS = 850;

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
  /** Fires whenever a résumé is accepted — lets the chat announce it. */
  onUploaded?: (fileName: string) => void;
  /** Fires when a résumé is ready to build or cleared. */
  onReadyChange?: (ready: boolean) => void;
  /** Fires once when profile assembly reaches 100%. */
  onProfileComplete?: () => void;
};

export type Guest1ResumePanelHandle = {
  startBuild: () => void;
  reset: () => void;
};

/** Left-panel resume upload and preview for guest option 1. */
export const Guest1ResumePanel = forwardRef<Guest1ResumePanelHandle, Guest1ResumePanelProps>(
  function Guest1ResumePanel({ className, onUploaded, onReadyChange, onProfileComplete }, ref) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileUrlRef = useRef<string | null>(null);
  const profileCompleteFiredRef = useRef(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"resume" | "build">("resume");
  const [runningIndex, setRunningIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    };
  }, []);

  /* Drive the profile build once the user clicks "Create my profile". */
  useEffect(() => {
    if (mode !== "build") return;
    const id = window.setInterval(() => {
      setRunningIndex((n) => (n >= PROFILE_STEPS.length ? n : n + 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [mode]);

  const steps: ExtractionStep[] = PROFILE_STEPS.map((s, i) => ({
    ...s,
    status: i < runningIndex ? "done" : i === runningIndex ? "running" : "pending",
  }));
  const buildComplete = runningIndex >= PROFILE_STEPS.length;

  const startBuild = useCallback(() => {
    if (!file) return;
    setShowPrompt(false);
    setRunningIndex(0);
    profileCompleteFiredRef.current = false;
    setMode("build");
  }, [file]);

  const reset = useCallback(() => {
    if (fileUrlRef.current) {
      URL.revokeObjectURL(fileUrlRef.current);
      fileUrlRef.current = null;
    }
    setFile(null);
    setFileUrl(null);
    setMode("resume");
    setRunningIndex(0);
    setShowPrompt(true);
    setError(null);
    setDragActive(false);
    profileCompleteFiredRef.current = false;
    onReadyChange?.(false);
  }, [onReadyChange]);

  useImperativeHandle(ref, () => ({ startBuild, reset }), [startBuild, reset]);

  useEffect(() => {
    onReadyChange?.(Boolean(file));
  }, [file, onReadyChange]);

  useEffect(() => {
    if (mode !== "build" || !buildComplete || profileCompleteFiredRef.current) return;
    profileCompleteFiredRef.current = true;
    onProfileComplete?.();
  }, [mode, buildComplete, onProfileComplete]);

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
    setMode("resume");
    setRunningIndex(0);
    setShowPrompt(true);
    onUploaded?.(next.name);
    onReadyChange?.(true);
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
    const hiddenInput = (
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={handleInputChange}
        aria-hidden
        tabIndex={-1}
      />
    );

    /* Full flow — extract, assemble, and final profile in one container. */
    if (mode === "build") {
      return (
        <>
          <Guest1ProfileFlow
            className={className}
            fileName={file.name}
            fileUrl={fileUrl}
            mimeType={file.type}
            steps={steps}
            buildComplete={buildComplete}
            profile={jobSeekerProfile}
            onUploadDifferent={openFilePicker}
          />
          {hiddenInput}
        </>
      );
    }

    /* Résumé preview — top actions + a dismissible centered prompt. */
    return (
      <div className={cn("flex h-full min-h-0 flex-col", className)}>
        {/* Always-available top actions */}
        <div className="mb-3 flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-ink-900/8 bg-paper-50/90 px-3 py-2.5 sm:px-4">
          <p className="min-w-0 truncate text-[12px] font-medium text-ink-700 sm:text-[13px]">
            {file.name}
          </p>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openFilePicker}
              className="hidden text-[12px] font-medium text-ink-500 transition hover:text-ink-950 sm:inline"
            >
              Upload different
            </button>
            <Button variant="lime" size="sm" onClick={startBuild}>
              <Sparkles className="h-4 w-4" />
              Create my profile
            </Button>
          </div>
        </div>

        <div className="relative h-full min-h-0 flex-1">
          <DashboardPdfViewer
            fileName={file.name}
            fileUrl={fileUrl}
            mimeType={file.type}
            className="h-full min-h-0 rounded-[24px] border-2 border-ink-900/18 shadow-none"
          />

          {/* Dismissible notice — light scrim so the résumé stays readable underneath */}
          {showPrompt ? (
            <div className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-ink-950/[0.06]">
              <div
                role="dialog"
                aria-labelledby="guest1-upload-dialog-title"
                aria-describedby="guest1-upload-dialog-desc"
                className="relative mx-4 w-full max-w-xs rounded-3xl border border-ink-900/10 bg-paper-50 p-6 pt-7 text-center shadow-[0_20px_50px_-24px_rgba(8,8,12,0.35)]"
              >
                <button
                  type="button"
                  onClick={() => setShowPrompt(false)}
                  aria-label="Close and view résumé"
                  className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-900/10 bg-paper-50 text-ink-500 transition hover:border-ink-900/20 hover:bg-paper-100 hover:text-ink-900"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-accent-lime">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3
                  id="guest1-upload-dialog-title"
                  className="mt-4 text-[16px] font-medium tracking-tight text-ink-950"
                >
                  Résumé uploaded
                </h3>
                <p
                  id="guest1-upload-dialog-desc"
                  className="mt-1.5 text-[13px] leading-relaxed text-ink-500"
                >
                  We&apos;ve initialized your CV. Use{" "}
                  <span className="font-medium text-ink-700">Create my profile</span> above when
                  you&apos;re ready — or close this to review your résumé first.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPrompt(false)}
                  className="mt-4 text-[12px] font-medium text-ink-600 underline-offset-2 transition hover:text-ink-950 hover:underline"
                >
                  View my résumé
                </button>
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="mt-2 block w-full text-[12px] font-medium text-ink-500 transition hover:text-ink-950 sm:hidden"
                >
                  Upload a different resume
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {hiddenInput}
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
  },
);
