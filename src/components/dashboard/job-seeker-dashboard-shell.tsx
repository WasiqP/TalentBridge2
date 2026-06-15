"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PanelRightClose } from "lucide-react";

import {
  isJobSeekerStandalonePage,
  JOB_SEEKER_DASHBOARD_PATH,
  JOB_SEEKER_SEARCH_PATH,
} from "@/config/dashboard-routes";

// import { DashboardSidebarFooter } from "@/components/dashboard/dashboard-sidebar-footer";
// import { DashboardSidebarLogout } from "@/components/dashboard/dashboard-sidebar-logout";
// import { DashboardSidebarRole } from "@/components/dashboard/dashboard-sidebar-role";
// import { DashboardSidebarSearch } from "@/components/dashboard/dashboard-sidebar-search";
import { DashboardChatInput } from "@/components/dashboard/dashboard-chat-input";
import {
  type ChatMessage,
  DashboardChatPanel,
} from "@/components/dashboard/dashboard-chat-panel";
import { DashboardContentPanel } from "@/components/dashboard/dashboard-content-panel";
import {
  DashboardExtractionPanel,
  type ExtractionStep,
} from "@/components/dashboard/dashboard-extraction-panel";
import { DashboardBackButton } from "@/components/dashboard/dashboard-back-button";
import {
  DashboardFloatingChat,
  getMockReply,
} from "@/components/dashboard/dashboard-floating-chat";
import { DashboardNextButton } from "@/components/dashboard/dashboard-next-button";
import { DashboardResumeDropzone } from "@/components/dashboard/dashboard-resume-dropzone";
import { DashboardScreenTransition } from "@/components/dashboard/dashboard-screen-transition";
import { ProfileReveal } from "@/components/dashboard/profile/profile-reveal";
import { DashboardTopActions } from "@/components/dashboard/dashboard-top-actions";
// import { StaggeredMenu } from "@/components/ui/staggered-menu";
// import { jobSeekerMenuItems } from "@/config/job-seeker-menu";
import { cn } from "@/lib/utils";

type DashboardPhase = "upload" | "extracting" | "complete";

type JobSeekerDashboardShellProps = {
  children: React.ReactNode;
};

const initialSteps: ExtractionStep[] = [
  { id: "s1", title: "Reading your resume", status: "pending" },
  { id: "s2", title: "Extracting experience & skills", status: "pending" },
  { id: "s3", title: "Creating your profile draft", status: "pending" },
  { id: "s4", title: "Suggesting improvements", status: "pending" },
];

const EXTRACTION_TO_PROFILE_MS = 5200;

const UPLOAD_WELCOME: ChatMessage = {
  id: "upload-welcome",
  role: "assistant",
  content:
    "Hi — ask about roles, salary, or resume tips anytime. Drop your CV on the left when you're ready to build your profile.",
};

const SPLIT_EASE = [0.22, 1, 0.36, 1] as const;

export function JobSeekerDashboardShell({
  children,
}: JobSeekerDashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isStandalonePage = isJobSeekerStandalonePage(pathname);

  const [phase, setPhase] = useState<DashboardPhase>("upload");
  const [direction, setDirection] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [steps, setSteps] = useState<ExtractionStep[]>(initialSteps);
  const [extractionReady, setExtractionReady] = useState(false);
  const [uploadChatOpen, setUploadChatOpen] = useState(false);
  const [uploadMessages, setUploadMessages] = useState<ChatMessage[]>([]);
  const resumeFileUrlRef = useRef<string | null>(null);
  const extractionAnimatedRef = useRef(false);
  const uploadReplyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fileName = useMemo(() => resumeFile?.name, [resumeFile]);

  const screenKey = isStandalonePage ? pathname : phase;

  function resetUploadChat() {
    setUploadChatOpen(false);
    setUploadMessages([]);
    if (uploadReplyTimerRef.current) {
      clearTimeout(uploadReplyTimerRef.current);
      uploadReplyTimerRef.current = null;
    }
  }

  function engageUploadChat() {
    setUploadChatOpen(true);
    setUploadMessages((prev) => (prev.length > 0 ? prev : [UPLOAD_WELCOME]));
  }

  const handleUploadChatSend = useCallback((message: string) => {
    setUploadChatOpen(true);
    setUploadMessages((prev) => {
      const base = prev.length > 0 ? prev : [UPLOAD_WELCOME];
      return [
        ...base,
        { id: `u_${Date.now()}`, role: "user", content: message, ts: Date.now() },
      ];
    });

    if (uploadReplyTimerRef.current) clearTimeout(uploadReplyTimerRef.current);

    uploadReplyTimerRef.current = setTimeout(() => {
      setUploadMessages((prev) => [
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

  function handleFileSelected(file: File) {
    if (resumeFileUrlRef.current) {
      URL.revokeObjectURL(resumeFileUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    resumeFileUrlRef.current = url;
    setResumeFile(file);
    resetUploadChat();
    setExtractionReady(false);
    extractionAnimatedRef.current = false;
    setDirection(1);
    setPhase("extracting");
  }

  function handleNext() {
    if (!isStandalonePage && phase === "complete") {
      setDirection(1);
      router.push(JOB_SEEKER_SEARCH_PATH);
    }
  }

  function handleBack() {
    if (pathname === JOB_SEEKER_SEARCH_PATH) {
      setDirection(-1);
      router.push(JOB_SEEKER_DASHBOARD_PATH);
      return;
    }

    if (phase === "complete") {
      setDirection(-1);
      extractionAnimatedRef.current = false;
      setExtractionReady(false);
      setSteps(initialSteps);
      resetUploadChat();
      setPhase("upload");
      return;
    }

    if (phase === "extracting") {
      setDirection(-1);
      extractionAnimatedRef.current = false;
      setExtractionReady(false);
      setPhase("upload");
    }
  }

  useEffect(() => {
    return () => {
      if (resumeFileUrlRef.current) {
        URL.revokeObjectURL(resumeFileUrlRef.current);
      }
      if (uploadReplyTimerRef.current) {
        clearTimeout(uploadReplyTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (phase !== "extracting" || !resumeFile) return;
    if (extractionAnimatedRef.current) return;

    extractionAnimatedRef.current = true;
    setExtractionReady(false);
    setSteps([
      { id: "s1", title: "Reading your resume", status: "running" },
      { id: "s2", title: "Extracting experience & skills", status: "pending" },
      { id: "s3", title: "Creating your profile draft", status: "pending" },
      { id: "s4", title: "Suggesting improvements", status: "pending" },
    ]);

    const timers: Array<ReturnType<typeof setTimeout>> = [];

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) =>
            s.id === "s1"
              ? { ...s, status: "done" }
              : s.id === "s2"
                ? { ...s, status: "running" }
                : s,
          ),
        );
      }, 900),
    );

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) =>
            s.id === "s2"
              ? { ...s, status: "done" }
              : s.id === "s3"
                ? { ...s, status: "running" }
                : s,
          ),
        );
      }, 1900),
    );

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) =>
            s.id === "s3"
              ? { ...s, status: "done" }
              : s.id === "s4"
                ? { ...s, status: "running" }
                : s,
          ),
        );
      }, 3100),
    );

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) => (s.id === "s4" ? { ...s, status: "done" } : s)),
        );
      }, 4300),
    );

    timers.push(
      setTimeout(() => {
        setExtractionReady(true);
      }, 4300),
    );

    timers.push(
      setTimeout(() => {
        setDirection(1);
        setPhase("complete");
      }, EXTRACTION_TO_PROFILE_MS),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [phase, resumeFile]);

  const showBottomChat =
    phase === "upload" && !isStandalonePage && !uploadChatOpen;
  const isUploadSplit = phase === "upload" && uploadChatOpen && !isStandalonePage;
  const showFloatingChat =
    isStandalonePage || phase === "complete" || phase === "extracting";
  const inClickFlow =
    phase === "extracting" ||
    phase === "complete" ||
    pathname === JOB_SEEKER_SEARCH_PATH;
  const showBack = inClickFlow;
  const showNext = !isStandalonePage && phase === "complete";
  const nextLabel = "Find jobs";

  return (
    <div
      className={cn(
        "relative overflow-x-hidden",
        isUploadSplit ? "h-svh overflow-hidden" : "min-h-svh",
      )}
    >
      {/* Sidebar menu disabled for now
      <StaggeredMenu ... />
      */}

      <DashboardTopActions />

      <main
        className={cn(
          "relative z-0 flex flex-col overflow-x-hidden",
          isUploadSplit
            ? "h-full min-h-0 overflow-hidden pb-0"
            : cn("min-h-svh", showBottomChat ? "pb-32" : "pb-6"),
          isStandalonePage && !isUploadSplit && "pb-10",
        )}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {isStandalonePage ? (
            <DashboardScreenTransition key={screenKey} direction={direction}>
              {children}
            </DashboardScreenTransition>
          ) : phase === "upload" && uploadChatOpen ? (
            <DashboardScreenTransition key={`${screenKey}-split`} direction={direction}>
              <motion.div
                className="mx-auto flex h-full min-h-0 w-full max-w-[96rem] flex-col overflow-hidden px-2 pt-[4.5rem] pb-5 sm:px-3 sm:pt-[5rem] sm:pb-6 lg:px-5 lg:pt-[5.5rem] lg:pb-7"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: SPLIT_EASE }}
              >
                <div className="grid min-h-0 max-h-[calc(100svh-7.25rem)] flex-1 grid-cols-1 grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-4 overflow-hidden sm:max-h-[calc(100svh-7.75rem)] sm:gap-5 lg:max-h-[calc(100svh-8.25rem)] lg:grid-cols-[minmax(0,1fr)_minmax(300px,34%)] lg:grid-rows-1 lg:gap-5 xl:gap-6">
                  <motion.div
                    className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05, duration: 0.45, ease: SPLIT_EASE }}
                  >
                    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]">
                      <div className="border-b border-ink-900/8 px-5 py-4">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                          Get started
                        </p>
                        <p className="mt-1 text-[14px] font-medium text-ink-950">
                          Upload your resume
                        </p>
                      </div>
                      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
                        <DashboardResumeDropzone onFileSelected={handleFileSelected} />
                      </div>
                    </section>
                  </motion.div>

                  <motion.div
                    className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12, duration: 0.45, ease: SPLIT_EASE }}
                  >
                    <DashboardChatPanel
                      className="h-full min-h-0"
                      messages={uploadMessages}
                      onSend={handleUploadChatSend}
                      eyebrow="Copilot"
                      title="Ask before you upload"
                      headerAction={
                        <button
                          type="button"
                          onClick={() => setUploadChatOpen(false)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink-900/10 bg-paper-100 text-ink-600 transition hover:border-ink-900/18 hover:text-ink-950"
                          aria-label="Close chat and expand upload"
                        >
                          <PanelRightClose className="h-4 w-4" aria-hidden />
                        </button>
                      }
                    />
                  </motion.div>
                </div>
              </motion.div>
            </DashboardScreenTransition>
          ) : phase === "upload" ? (
            <DashboardScreenTransition key={screenKey} direction={direction}>
              <DashboardContentPanel>
                <DashboardResumeDropzone onFileSelected={handleFileSelected} />
              </DashboardContentPanel>
            </DashboardScreenTransition>
          ) : phase === "extracting" ? (
            <DashboardScreenTransition key={screenKey} direction={direction}>
              <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 pt-24 pb-8 sm:px-6">
                <DashboardExtractionPanel
                  variant="standalone"
                  fileName={fileName}
                  steps={steps}
                  isComplete={extractionReady}
                />
              </div>
            </DashboardScreenTransition>
          ) : (
            <DashboardScreenTransition key={screenKey} direction={direction}>
              <ProfileReveal fileName={fileName} />
            </DashboardScreenTransition>
          )}
        </AnimatePresence>
      </main>

      {showBottomChat ? (
        <DashboardChatInput
          onEngage={engageUploadChat}
          onSend={handleUploadChatSend}
        />
      ) : null}

      {showFloatingChat ? <DashboardFloatingChat /> : null}

      <AnimatePresence>
        {showBack ? (
          <DashboardBackButton key="dashboard-back" onClick={handleBack} />
        ) : null}
        {showNext ? (
          <DashboardNextButton
            key="dashboard-next"
            onClick={handleNext}
            label={nextLabel}
          />
        ) : null}
      </AnimatePresence>

      {/* Staggered menu styles disabled for now
      <style jsx global>{`...`}</style>
      */}
    </div>
  );
}
