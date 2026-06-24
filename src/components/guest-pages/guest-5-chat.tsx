"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  CheckCircle2,
  ChevronLeft,
  FileText,
  FileUp,
  Sparkles,
} from "lucide-react";

import { DashboardChatInput } from "@/components/dashboard/dashboard-chat-input";
import { getMockReply } from "@/components/dashboard/dashboard-floating-chat";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const SAMPLE_RESUME = "Jordan_Avery_Resume.pdf";

const WELCOME =
  "I'm your TalentDrobe career copilot. Drop your résumé below or ask about roles, salary, and next steps — I'll tailor answers to your goals.";

const STARTER_PROMPTS = [
  "Find remote product roles",
  "What salary should I expect?",
  "Help me switch careers",
  "Polish my résumé bullets",
] as const;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function isAllowedResume(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !["pdf", "doc", "docx"].includes(extension)) return false;
  return file.size <= MAX_RESUME_BYTES;
}

function CopilotAvatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-ink-950 text-accent-lime",
        className,
      )}
    >
      <Bot className="h-4 w-4" aria-hidden />
      <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-paper-50 bg-accent-lime" />
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <CopilotAvatar />
      <div className="inline-flex items-center gap-1.5 rounded-2xl border border-ink-900/8 bg-white px-4 py-3">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-ink-400"
            animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: dot * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: EASE }}
      className={cn("flex items-end gap-2.5", isUser && "justify-end")}
    >
      {!isUser ? <CopilotAvatar className="mb-0.5" /> : null}
      <div
        className={cn(
          "max-w-[min(88%,28rem)] text-pretty rounded-2xl px-4 py-3 text-[14px] leading-relaxed sm:text-[15px]",
          isUser
            ? "bg-ink-950 text-paper-50"
            : "border border-ink-900/8 bg-white text-ink-800",
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function ResumeDropZone({
  onFile,
  compact,
  className,
}: {
  onFile: (fileName: string) => void;
  compact?: boolean;
  className?: string;
}) {
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

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex w-full items-center gap-3 rounded-[6px] border border-dashed border-ink-900/15 bg-paper-100 px-4 py-3 text-left transition-colors hover:border-accent-lime/50 hover:bg-accent-lime/8",
          className,
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={RESUME_ACCEPT}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        <FileUp className="h-4 w-4 shrink-0 text-ink-600" />
        <span className="text-[13px] font-medium text-ink-800">Drop another résumé</span>
      </button>
    );
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={RESUME_ACCEPT}
        className="sr-only"
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
          "flex w-full items-center gap-4 rounded-[6px] border border-dashed px-4 py-4 text-left transition-colors sm:px-5 sm:py-5",
          dragActive
            ? "border-accent-lime bg-accent-lime/12"
            : "border-ink-900/18 bg-white hover:border-accent-lime/45 hover:bg-accent-lime/6",
        )}
      >
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-accent-lime text-ink-950">
          <FileUp className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold text-ink-950">Drop your résumé</span>
          <span className="mt-0.5 block text-[13px] text-ink-500">
            PDF, DOC, DOCX · click or drag — profile ready in ~60s
          </span>
        </span>
      </button>

      {error ? (
        <p className="mt-2 text-[12px] text-red-600">{error}</p>
      ) : (
        <button
          type="button"
          onClick={() => onFile(SAMPLE_RESUME)}
          className="mt-2.5 text-[12px] font-medium text-ink-600 underline-offset-4 transition hover:text-ink-950 hover:underline sm:text-[13px]"
        >
          No résumé handy? Try a sample →
        </button>
      )}
    </div>
  );
}

function ResumeChip({ fileName }: { fileName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-[6px] border border-accent-lime/35 bg-accent-lime/10 px-4 py-3"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-ink-950 text-paper-50">
        <FileText className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-ink-950">{fileName}</p>
        <p className="flex items-center gap-1 text-[12px] text-ink-600">
          <CheckCircle2 className="h-3.5 w-3.5 text-accent-lime-dark" />
          Résumé received — ready to build your profile
        </p>
      </div>
    </motion.div>
  );
}

export type Guest5ChatProps = {
  className?: string;
  seedMessage?: string;
  seedFileName?: string;
  onBack: () => void;
};

/** Full chat experience for guest option 5 — flat, MVP-focused. */
export function Guest5Chat({ className, seedMessage, seedFileName, onBack }: Guest5ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", content: WELCOME },
  ]);
  const [typing, setTyping] = useState(false);
  const [resumeFile, setResumeFile] = useState<string | null>(seedFileName ?? null);
  const [showResumeDrop, setShowResumeDrop] = useState(!seedFileName);
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seededRef = useRef(false);

  const hasUserMessages = messages.some((m) => m.role === "user");

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, resumeFile, showResumeDrop, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    };
  }, []);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: `u_${Date.now()}`, role: "user", content: trimmed }]);
    setTyping(true);

    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    replyTimerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `a_${Date.now()}`, role: "assistant", content: getMockReply(trimmed) },
      ]);
    }, 650);
  }, []);

  const handleResume = useCallback((fileName: string) => {
    setResumeFile(fileName);
    setShowResumeDrop(false);
    setTyping(true);

    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    replyTimerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a_resume_${Date.now()}`,
          role: "assistant",
          content: `Got it — “${fileName}” is uploaded ✓ I can extract your skills, experience, and match you to live roles. Ask me anything while I work, or sign up to save your profile.`,
        },
      ]);
    }, 800);
  }, []);

  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;

    if (seedFileName) {
      handleResume(seedFileName);
    }
    if (seedMessage?.trim()) {
      sendMessage(seedMessage);
    }
  }, [seedFileName, seedMessage, handleResume, sendMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn("mx-auto flex w-full max-w-3xl flex-col", className)}
    >
      <div className="flex min-h-[min(72svh,40rem)] flex-col overflow-hidden rounded-[6px] border border-ink-900/10 bg-white sm:min-h-[min(78svh,44rem)]">
        {/* Chat header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-ink-900/8 px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border border-ink-900/10 text-ink-800 transition hover:bg-paper-100"
            aria-label="Back to explore"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
          </button>
          <CopilotAvatar className="h-9 w-9" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-ink-950">Career copilot</p>
            <p className="flex items-center gap-1.5 text-[12px] text-ink-500">
              <Sparkles className="h-3 w-3 text-accent-lime-dark" aria-hidden />
              Online · ready to help
            </p>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-ink-900/8 bg-paper-50 px-2.5 py-1 text-[11px] font-medium text-ink-600 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
            MVP preview
          </span>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5"
          data-lenis-prevent
        >
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>
            {typing ? <TypingIndicator /> : null}
          </div>

          {/* Résumé zone */}
          <div className="mt-5 space-y-3">
            {resumeFile && !showResumeDrop ? (
              <>
                <ResumeChip fileName={resumeFile} />
                <ResumeDropZone compact onFile={handleResume} />
              </>
            ) : (
              <ResumeDropZone onFile={handleResume} />
            )}
          </div>

          {/* Starter prompts */}
          {!hasUserMessages && !typing ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
              className="mt-5 flex flex-wrap gap-2 pl-10 sm:pl-11"
            >
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-ink-900/10 bg-paper-50 px-3 py-1.5 text-[12px] font-medium text-ink-700 transition hover:border-accent-lime/40 hover:bg-accent-lime/10 hover:text-ink-950"
                >
                  {prompt}
                </button>
              ))}
            </motion.div>
          ) : null}
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-ink-900/8 bg-paper-50 px-4 py-4 sm:px-5">
          <DashboardChatInput
            variant="inline"
            showAttach
            showDisclaimer={false}
            placeholder="Ask about roles, salary, or your résumé…"
            onSend={sendMessage}
            onFileSelect={(file) => handleResume(file.name)}
            className="[&_form>div]:border-ink-900/10 [&_form>div]:bg-white [&_form>div]:shadow-none"
          />
          <p className="mt-2 text-center text-[11px] text-ink-400">
            AI copilot can make mistakes · Verify important details
          </p>
        </div>
      </div>
    </motion.div>
  );
}
