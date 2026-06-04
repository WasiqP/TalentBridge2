"use client";

import { useEffect, useMemo, useRef } from "react";
import { Bot, FileUp, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import type { ChatMessage } from "@/components/dashboard/dashboard-chat-panel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AgencyPostCopilotPanelProps = {
  messages: ChatMessage[];
  jdText: string;
  onJdTextChange: (value: string) => void;
  onPublish: () => void;
  onUploadJd: () => void;
  publishDisabled?: boolean;
  className?: string;
};

export function AgencyPostCopilotPanel({
  messages,
  jdText,
  onJdTextChange,
  onPublish,
  onUploadJd,
  publishDisabled = false,
  className,
}: AgencyPostCopilotPanelProps) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const rendered = useMemo(() => messages, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [rendered.length]);

  return (
    <section
      className={cn(
        "flex h-full min-h-0 max-h-full flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]",
        className,
      )}
      aria-label="Post a role copilot"
    >
      <div className="border-b border-ink-900/8 px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
          Copilot
        </p>
        <p className="mt-1 text-[14px] font-medium text-ink-950">
          Paste or upload a job description
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-500">
          No long forms — we draft the posting and surface matched candidates.
        </p>
      </div>

      <div
        className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
        data-lenis-prevent
        data-lenis-prevent-wheel
        onWheel={(e) => e.stopPropagation()}
      >
        {rendered.length === 0 ? (
          <p className="text-[14px] leading-relaxed text-ink-400">
            Drop in a JD below or upload a file. I&apos;ll extract requirements
            and find talent.
          </p>
        ) : null}

        <AnimatePresence initial={false}>
          {rendered.map((m) => {
            const isUser = m.role === "user";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex gap-3",
                  isUser ? "justify-end" : "justify-start",
                )}
              >
                {!isUser ? (
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-ink-900/10 bg-paper-100 text-ink-700">
                    <Bot className="h-4.5 w-4.5" aria-hidden />
                  </span>
                ) : null}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed sm:text-[15px]",
                    isUser
                      ? "bg-ink-950 text-paper-50"
                      : "border border-ink-900/10 bg-paper-100 text-ink-800",
                  )}
                >
                  {m.content}
                </div>
                {isUser ? (
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-ink-900/10 bg-paper-100 text-ink-700">
                    <UserRound className="h-4.5 w-4.5" aria-hidden />
                  </span>
                ) : null}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="space-y-3 border-t border-ink-900/8 px-4 py-4 sm:px-5">
        <label className="block">
          <span className="sr-only">Job description</span>
          <textarea
            value={jdText}
            onChange={(e) => onJdTextChange(e.target.value)}
            rows={4}
            placeholder="Paste the full job description here…"
            className="w-full resize-none rounded-2xl border border-ink-900/12 bg-paper-100 px-4 py-3 text-[14px] leading-relaxed text-ink-900 placeholder:text-ink-400 focus:border-ink-900/25 focus:outline-none focus:ring-2 focus:ring-accent-lime/40 sm:text-[15px]"
          />
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            size="md"
            className="flex-1 gap-2"
            onClick={onUploadJd}
          >
            <FileUp className="h-4 w-4" aria-hidden />
            Upload JD
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="flex-1"
            disabled={publishDisabled}
            onClick={onPublish}
          >
            Create posting & find talent
          </Button>
        </div>
      </div>
    </section>
  );
}
