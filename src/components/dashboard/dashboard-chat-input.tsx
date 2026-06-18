"use client";

import { type FormEvent, useId, useRef, useState } from "react";
import { ArrowUp, Paperclip, X } from "lucide-react";

import { cn } from "@/lib/utils";

const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;

function isAllowedResume(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !["pdf", "doc", "docx"].includes(extension)) return false;
  return file.size <= MAX_RESUME_BYTES;
}

type DashboardChatInputProps = {
  variant?: "fixed" | "inline";
  placeholder?: string;
  onSend?: (message: string) => void;
  /** Fires when the user focuses the composer — use to expand into a split chat layout. */
  onEngage?: () => void;
  onFileSelect?: (file: File) => void;
  showAttach?: boolean;
  className?: string;
  showDisclaimer?: boolean;
};

export function DashboardChatInput({
  variant = "fixed",
  placeholder = "Ask anything about your job search…",
  onSend,
  onEngage,
  onFileSelect,
  showAttach = false,
  className,
  showDisclaimer = true,
}: DashboardChatInputProps) {
  const [message, setMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!isAllowedResume(file)) {
      setFileError("Please upload a PDF or Word file under 10 MB.");
      return;
    }

    setFileError(null);
    setAttachedFile(file);
    onFileSelect?.(file);
    console.log("[dashboard-chat-attach]", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
  }

  function clearAttachment() {
    setAttachedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed && !attachedFile) return;

    onSend?.(trimmed);
    console.log("[dashboard-chat]", trimmed, attachedFile?.name ?? null);
    setMessage("");
    clearAttachment();
  }

  const canSend = message.trim().length > 0 || attachedFile !== null;

  const wrapperClass =
    variant === "fixed"
      ? "pointer-events-none fixed inset-x-0 bottom-0 z-[15] flex justify-center px-4 pb-5 sm:px-6 sm:pb-6"
      : "w-full";

  const formClass =
    variant === "fixed" ? "pointer-events-auto w-full max-w-2xl" : "w-full";

  return (
    <div className={cn(wrapperClass, className)} aria-label="Chat composer">
      <form onSubmit={handleSubmit} className={formClass}>
        {showAttach && attachedFile ? (
          <div className="mb-2 flex justify-center">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-ink-900/10 bg-paper-100 px-3 py-1.5 text-[12px] text-ink-700">
              <Paperclip className="h-3.5 w-3.5 shrink-0 text-ink-500" aria-hidden />
              <span className="truncate">{attachedFile.name}</span>
              <button
                type="button"
                onClick={clearAttachment}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-900/8 hover:text-ink-900"
                aria-label="Remove attachment"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          </div>
        ) : null}

        <div
          className={cn(
            "flex items-end gap-2 rounded-[1.75rem] border border-ink-900/12 bg-paper-50 py-2.5 shadow-[0_4px_24px_rgba(8,8,12,0.08)] transition",
            showAttach ? "pl-4 pr-2.5 sm:pr-3" : "px-4",
            "focus-within:border-ink-900/25 focus-within:shadow-[0_8px_32px_rgba(8,8,12,0.1)]",
          )}
        >
          <label className="sr-only" htmlFor={id}>
            Message
          </label>
          <textarea
            id={id}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => onEngage?.()}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder={placeholder}
            className="max-h-32 min-h-[2.25rem] min-w-0 flex-1 resize-none bg-transparent py-1.5 text-[15px] leading-relaxed text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
          {showAttach ? (
            <div className="flex shrink-0 items-end gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept={RESUME_ACCEPT}
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
                onClick={() => fileInputRef.current?.click()}
                className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-900/6 hover:text-ink-900"
                aria-label="Attach resume"
              >
                <Paperclip className="h-4 w-4" strokeWidth={2.25} />
              </button>
              <button
                type="submit"
                disabled={!canSend}
                aria-label="Send message"
                className={cn(
                  "mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition",
                  canSend
                    ? "bg-ink-950 text-paper-50 hover:bg-ink-800"
                    : "bg-ink-900/10 text-ink-400",
                )}
              >
                <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!canSend}
              aria-label="Send message"
              className={cn(
                "mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition",
                canSend
                  ? "bg-ink-950 text-paper-50 hover:bg-ink-800"
                  : "bg-ink-900/10 text-ink-400",
              )}
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          )}
        </div>
        {showDisclaimer ? (
          <p className="mt-2 text-center text-[11px] text-ink-400">
            AI copilot can make mistakes. Verify important details.
          </p>
        ) : null}
        {showAttach && fileError ? (
          <p className="mt-2 text-center text-[11px] text-red-600">{fileError}</p>
        ) : null}
      </form>
    </div>
  );
}
