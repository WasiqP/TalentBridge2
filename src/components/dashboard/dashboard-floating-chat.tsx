"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Maximize2,
  MessageCircle,
  Minimize2,
  Sparkles,
  X,
} from "lucide-react";

import {
  type ChatMessage,
  DashboardChatPanel,
} from "@/components/dashboard/dashboard-chat-panel";
import { getProfileFirstName, jobSeekerProfile } from "@/config/job-seeker-profile";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `Hi ${getProfileFirstName(jobSeekerProfile.name)} — I'm your TalentBridge copilot. Ask me to refine your profile, suggest roles, or improve your resume bullets.`,
};

function getMockReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("role") || lower.includes("job")) {
    return "Based on your profile, Senior Product Designer and Design Lead roles are a strong fit. Want me to prioritize remote, hybrid, or on-site opportunities?";
  }
  if (lower.includes("skill")) {
    return "Your top detected skills are Product Design, Design Systems, and User Research. I can suggest 2–3 more to strengthen your profile for leadership roles.";
  }
  if (lower.includes("resume") || lower.includes("bullet")) {
    return "Try leading each bullet with an outcome: \"Drove a redesign that lifted activation by 23%\" reads stronger than \"Worked on redesign.\" I can rewrite a section if you paste it here.";
  }
  if (lower.includes("salary") || lower.includes("pay")) {
    return "For your experience level and location, comparable roles typically range $140k–$175k. I can help you position for the upper band once you share target companies.";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! Your profile looks 96% complete. What would you like to work on — job matches, profile polish, or interview prep?";
  }

  return "Got it. I'll use that to tailor suggestions. You can ask about roles, skills, resume wording, or salary positioning.";
}

type DashboardFloatingChatProps = {
  className?: string;
};

export function DashboardFloatingChat({ className }: DashboardFloatingChatProps) {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSend = useCallback((message: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `u_${Date.now()}`, role: "user", content: message, ts: Date.now() },
    ]);

    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);

    replyTimerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          content: getMockReply(message),
          ts: Date.now(),
        },
      ]);
    }, 550);
  }, []);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (fullscreen) {
          setFullscreen(false);
        } else {
          setOpen(false);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, fullscreen]);

  function handleClose() {
    setOpen(false);
    setFullscreen(false);
  }

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-40", className)}>
      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "pointer-events-auto absolute inset-0 bg-ink-950/20 backdrop-blur-[2px]",
              fullscreen ? "cursor-default" : "cursor-pointer",
            )}
            aria-label="Close chat"
            onClick={() => {
              if (!fullscreen) handleClose();
            }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key={fullscreen ? "chat-fullscreen" : "chat-panel"}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.32, ease: EASE }}
            className={cn(
              "pointer-events-auto absolute flex flex-col overflow-hidden border border-ink-900/12 bg-paper-50 shadow-[0_24px_80px_rgba(8,8,12,0.18)]",
              fullscreen
                ? "inset-3 rounded-[28px] sm:inset-5 sm:rounded-[32px]"
                : "bottom-24 right-5 h-[min(620px,calc(100vh-7rem))] w-[min(420px,calc(100vw-2.5rem))] rounded-[28px] sm:right-6 sm:rounded-[32px]",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="TalentBridge copilot chat"
          >
            <div className="flex items-center justify-between gap-3 border-b border-ink-900/8 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-accent-lime/35 bg-accent-lime/20 text-ink-950">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                    Copilot
                  </p>
                  <p className="truncate text-[14px] font-medium text-ink-950">
                    TalentBridge assistant
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setFullscreen((v) => !v)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink-900/10 bg-paper-100 text-ink-800 transition hover:border-ink-900/20 hover:bg-paper-200"
                  aria-label={fullscreen ? "Exit full screen" : "Enter full screen"}
                >
                  {fullscreen ? (
                    <Minimize2 className="h-4 w-4" aria-hidden />
                  ) : (
                    <Maximize2 className="h-4 w-4" aria-hidden />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink-900/10 bg-paper-100 text-ink-800 transition hover:border-ink-900/20 hover:bg-paper-200"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1">
              <DashboardChatPanel
                embedded
                className="h-full"
                messages={messages}
                onSend={handleSend}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!open ? (
          <motion.button
            key="chat-fab"
            type="button"
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={() => setOpen(true)}
            className="pointer-events-auto absolute bottom-6 right-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink-950 text-paper-50 shadow-[0_8px_32px_rgba(8,8,12,0.28)] transition hover:bg-ink-800 hover:shadow-[0_12px_40px_rgba(8,8,12,0.32)] sm:bottom-7 sm:right-6"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden />
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-60" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent-lime" />
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
