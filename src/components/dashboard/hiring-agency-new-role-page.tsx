"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { AgencyPostCopilotPanel } from "@/components/dashboard/agency/agency-post-copilot-panel";
import type { ChatMessage } from "@/components/dashboard/dashboard-chat-panel";
import {
  DashboardExtractionPanel,
  type ExtractionStep,
} from "@/components/dashboard/dashboard-extraction-panel";
import {
  DashboardHiddenResumeInput,
  type DashboardHiddenResumeInputHandle,
} from "@/components/dashboard/dashboard-hidden-resume-input";
import { hiringAgencyRolePath } from "@/config/dashboard-routes";
import { cn } from "@/lib/utils";

type Phase = "intake" | "extracting";

const EXTRACTION_MS = 4500;

const JD_ACCEPT =
  ".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";

const initialSteps: ExtractionStep[] = [
  { id: "j1", title: "Reading job description", status: "pending" },
  { id: "j2", title: "Extracting requirements & seniority", status: "pending" },
  { id: "j3", title: "Drafting posting", status: "pending" },
  { id: "j4", title: "Matching candidates", status: "pending" },
];

const postSteps = initialSteps;

export function HiringAgencyNewRolePage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intake");
  const [jdText, setJdText] = useState("");
  const [jdFileName, setJdFileName] = useState<string | undefined>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [steps, setSteps] = useState<ExtractionStep[]>(postSteps);
  const uploadRef = useRef<DashboardHiddenResumeInputHandle>(null);

  const canPublish = jdText.trim().length > 20 || Boolean(jdFileName);

  function startExtraction(sourceLabel: string) {
    setPhase("extracting");
    setMessages([
      {
        id: "n0",
        role: "assistant",
        content: `Got it — working from ${sourceLabel}.`,
      },
    ]);
    setSteps([
      { id: "j1", title: "Reading job description", status: "running" },
      { id: "j2", title: "Extracting requirements & seniority", status: "pending" },
      { id: "j3", title: "Drafting posting", status: "pending" },
      { id: "j4", title: "Matching candidates", status: "pending" },
    ]);
  }

  function handlePublish() {
    if (!canPublish) return;
    const label = jdFileName ?? "your pasted description";
    startExtraction(label);
  }

  function handleFile(file: File) {
    setJdFileName(file.name);
    if (!jdText.trim()) {
      setJdText(
        `Senior role at our company. See attached: ${file.name}. (Demo — paste full JD for richer extraction.)`,
      );
    }
    startExtraction(file.name);
  }

  useEffect(() => {
    if (phase !== "extracting") return;

    const timers: Array<ReturnType<typeof setTimeout>> = [];

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) =>
            s.id === "j1"
              ? { ...s, status: "done" }
              : s.id === "j2"
                ? { ...s, status: "running" }
                : s,
          ),
        );
      }, 800),
    );
    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) =>
            s.id === "j2"
              ? { ...s, status: "done" }
              : s.id === "j3"
                ? { ...s, status: "running" }
                : s,
          ),
        );
      }, 1800),
    );
    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) =>
            s.id === "j3"
              ? { ...s, status: "done" }
              : s.id === "j4"
                ? { ...s, status: "running" }
                : s,
          ),
        );
      }, 2800),
    );
    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) => (s.id === "j4" ? { ...s, status: "done" } : s)),
        );
      }, 3600),
    );
    timers.push(
      setTimeout(() => {
        router.push(hiringAgencyRolePath("role-new"));
      }, EXTRACTION_MS),
    );

    return () => timers.forEach(clearTimeout);
  }, [phase, router]);

  return (
    <div className={cn("relative min-h-svh", phase === "intake" && "pb-10")}>
      <main className="relative z-0 flex flex-col min-h-svh">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "intake" ? (
            <motion.div
              key="intake"
              className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 pt-24 pb-10 sm:px-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                  Post a role
                </p>
                <h1 className="mt-2 text-balance text-[22px] font-medium tracking-[-0.03em] text-ink-950 sm:text-[26px]">
                  Paste a JD. Skip the form.
                </h1>
              </div>
              <AgencyPostCopilotPanel
                messages={messages}
                jdText={jdText}
                onJdTextChange={setJdText}
                onPublish={handlePublish}
                onUploadJd={() => uploadRef.current?.open()}
                publishDisabled={!canPublish}
                className="min-h-[min(520px,70vh)]"
              />
            </motion.div>
          ) : (
            <motion.div
              key="extracting"
              className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 pt-24 pb-8 sm:px-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <DashboardExtractionPanel
                variant="standalone"
                fileName={jdFileName}
                steps={steps}
                eyebrow="Job posting"
                heading="Building your role & finding talent"
                fileHint="Structuring requirements and ranking candidates"
                ariaLabel="Job posting extraction progress"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <DashboardHiddenResumeInput
        ref={uploadRef}
        accept={JD_ACCEPT}
        onFileSelected={handleFile}
      />
    </div>
  );
}
