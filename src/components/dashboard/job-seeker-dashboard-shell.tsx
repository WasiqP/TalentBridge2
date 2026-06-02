"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { isJobSeekerStandalonePage } from "@/config/dashboard-routes";

import { DashboardSidebarFooter } from "@/components/dashboard/dashboard-sidebar-footer";
import { DashboardSidebarLogout } from "@/components/dashboard/dashboard-sidebar-logout";
import { DashboardSidebarRole } from "@/components/dashboard/dashboard-sidebar-role";
import { DashboardSidebarSearch } from "@/components/dashboard/dashboard-sidebar-search";
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
import { DashboardPdfViewer } from "@/components/dashboard/dashboard-pdf-viewer";
import { DashboardResumeDropzone } from "@/components/dashboard/dashboard-resume-dropzone";
import { DashboardTopActions } from "@/components/dashboard/dashboard-top-actions";
import { StaggeredMenu } from "@/components/ui/staggered-menu";
import { jobSeekerMenuItems } from "@/config/job-seeker-menu";
import { cn } from "@/lib/utils";

type DashboardPhase = "upload" | "extracting" | "split";

type JobSeekerDashboardShellProps = {
  children: React.ReactNode;
};

const EXTRACTION_TO_SPLIT_MS = 5000;

const initialSteps: ExtractionStep[] = [
  { id: "s1", title: "Reading your resume", status: "pending" },
  { id: "s2", title: "Extracting experience & skills", status: "pending" },
  { id: "s3", title: "Creating your profile draft", status: "pending" },
  { id: "s4", title: "Suggesting improvements", status: "pending" },
];

export function JobSeekerDashboardShell({
  children,
}: JobSeekerDashboardShellProps) {
  const pathname = usePathname();
  const isStandalonePage = isJobSeekerStandalonePage(pathname);

  const [phase, setPhase] = useState<DashboardPhase>("upload");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileUrl, setResumeFileUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [steps, setSteps] = useState<ExtractionStep[]>(initialSteps);
  const resumeFileUrlRef = useRef<string | null>(null);

  const fileName = useMemo(() => resumeFile?.name, [resumeFile]);

  function handleFileSelected(file: File) {
    if (resumeFileUrlRef.current) {
      URL.revokeObjectURL(resumeFileUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    resumeFileUrlRef.current = url;
    setResumeFile(file);
    setResumeFileUrl(url);
    setPhase("extracting");
  }

  useEffect(() => {
    return () => {
      if (resumeFileUrlRef.current) {
        URL.revokeObjectURL(resumeFileUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (phase !== "extracting" || !resumeFile) return;

    setMessages([
      {
        id: "m0",
        role: "assistant",
        content:
          "Resume received. I’ll extract key details and build your profile in real time.",
      },
    ]);
    setSteps([
      { id: "s1", title: "Reading your resume", status: "running" },
      { id: "s2", title: "Extracting experience & skills", status: "pending" },
      { id: "s3", title: "Creating your profile draft", status: "pending" },
      { id: "s4", title: "Suggesting improvements", status: "pending" },
    ]);

    const timers: Array<ReturnType<typeof setTimeout>> = [];

    timers.push(
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: "m1",
            role: "assistant",
            content:
              "I’m scanning sections: contact info, summary, experience, education, and skills.",
          },
        ]);
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
        setMessages((prev) => [
          ...prev,
          {
            id: "m2",
            role: "assistant",
            content:
              "Next: I’ll normalize your titles, dates, and skills so recruiters can search you properly.",
          },
        ]);
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
        setMessages((prev) => [
          ...prev,
          {
            id: "m3",
            role: "assistant",
            content:
              "Profile draft created. I’ll now suggest improvements and ask a few quick questions.",
          },
        ]);
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
        setMessages((prev) => [
          ...prev,
          {
            id: "m4",
            role: "assistant",
            content:
              "What roles are you targeting right now (title + location or remote)?",
          },
        ]);
        setSteps((prev) =>
          prev.map((s) => (s.id === "s4" ? { ...s, status: "done" } : s)),
        );
      }, 4300),
    );

    timers.push(
      setTimeout(() => {
        setPhase("split");
      }, EXTRACTION_TO_SPLIT_MS),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [phase, resumeFile]);

  function handleSend(message: string) {
    setMessages((prev) => [
      ...prev,
      { id: `u_${Date.now()}`, role: "user", content: message, ts: Date.now() },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          content: "Got it — I’ll tailor suggestions based on that.",
          ts: Date.now(),
        },
      ]);
    }, 600);
  }

  const showBottomChat = phase === "upload" && !isStandalonePage;
  const isSplitView = phase === "split" && !isStandalonePage;

  return (
    <div className={cn("relative", isSplitView ? "h-svh overflow-hidden" : "min-h-svh")}>
      <StaggeredMenu
        position="left"
        isFixed
        items={jobSeekerMenuItems}
        displaySocials={false}
        displayItemNumbering
        colors={["#fbfaf6", "#ebe9e3", "#141418"]}
        menuButtonColor="#08080c"
        openMenuButtonColor="#08080c"
        accentColor="#c1f968"
        changeMenuColorOnOpen={false}
        closeOnClickAway
        className="job-seeker-staggered-menu"
        logoUrl=""
        panelToolbar={<DashboardSidebarRole />}
        panelHeader={
          <DashboardSidebarSearch placeholder="Search dashboard…" />
        }
        panelFooter={<DashboardSidebarFooter />}
        panelFooterBottom={<DashboardSidebarLogout />}
      />

      <DashboardTopActions />

      <main
        className={cn(
          "relative z-0 flex flex-col",
          isSplitView
            ? "h-full min-h-0 overflow-hidden"
            : "min-h-svh",
          isStandalonePage ? "pb-10" : showBottomChat ? "pb-32" : isSplitView ? "pb-0" : "pb-6",
        )}
      >
        {isStandalonePage ? (
          children
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            {phase === "upload" ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <DashboardContentPanel>
                  <DashboardResumeDropzone onFileSelected={handleFileSelected} />
                  {children}
                </DashboardContentPanel>
              </motion.div>
            ) : phase === "extracting" ? (
              <motion.div
                key="extracting"
                className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 pt-24 pb-8 sm:px-6"
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <DashboardExtractionPanel
                  variant="standalone"
                  fileName={fileName}
                  steps={steps}
                />
              </motion.div>
            ) : (
              <motion.div
                key="split"
                className="mx-auto flex h-full min-h-0 w-full max-w-[90rem] flex-col overflow-hidden px-3 pt-[5.5rem] sm:px-5 lg:px-8 lg:pt-24"
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-5 overflow-hidden lg:grid-cols-2 lg:grid-rows-1 lg:gap-6 xl:gap-8">
                  <motion.div
                    className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <DashboardChatPanel
                      className="h-full min-h-0"
                      messages={messages}
                      onSend={handleSend}
                    />
                  </motion.div>
                  <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
                    <DashboardPdfViewer
                      className="h-full min-h-0"
                      fileName={fileName}
                      fileUrl={resumeFileUrl}
                      mimeType={resumeFile?.type}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {showBottomChat ? <DashboardChatInput /> : null}

      <style jsx global>{`
        .job-seeker-staggered-menu .staggered-menu-header {
          justify-content: flex-start;
          padding: 1.25rem 1.25rem;
        }

        .job-seeker-staggered-menu .sm-header-leading {
          gap: 0;
        }

        @media (min-width: 640px) {
          .job-seeker-staggered-menu .staggered-menu-header {
            padding: 1.5rem 2rem;
          }
        }

        .job-seeker-staggered-menu .sm-logo {
          display: none;
        }

        .job-seeker-staggered-menu .sm-panel-toolbar {
          margin-top: -3.25rem;
          margin-bottom: 0.25rem;
          min-height: 2.75rem;
        }

        .job-seeker-staggered-menu .sm-toggle {
          z-index: 30;
          padding: 0.65rem 0.85rem;
          border-radius: 1rem;
          border: 1px solid rgba(8, 8, 12, 0.12);
          background: #fbfaf6;
          color: #08080c !important;
        }

        .job-seeker-staggered-menu[data-open] .sm-toggle {
          border-color: rgba(8, 8, 12, 0.12);
          background: #fbfaf6;
          color: #08080c !important;
          box-shadow: 0 2px 12px rgba(8, 8, 12, 0.08);
        }

        .job-seeker-staggered-menu .staggered-menu-panel,
        .job-seeker-staggered-menu .sm-prelayers {
          width: clamp(300px, 44vw, 480px);
        }

        .job-seeker-staggered-menu .staggered-menu-panel {
          padding: 5.5em 2rem 2rem 2rem;
        }

        .job-seeker-staggered-menu .sm-panel-header {
          margin-bottom: 1.25rem;
        }

        .job-seeker-staggered-menu .sm-panel-list {
          margin-top: 0;
        }

        .job-seeker-staggered-menu .sm-panel-footer {
          padding-top: 1rem;
          margin-top: 1.5rem;
        }

        .job-seeker-staggered-menu .sm-panel-footer-bottom {
          padding-top: 0.5rem;
          padding-bottom: 0.25rem;
        }

        .job-seeker-staggered-menu .sm-panel-itemWrap {
          overflow: visible;
        }

        .job-seeker-staggered-menu .sm-panel-item {
          display: block;
          width: 100%;
          max-width: 100%;
          font-size: clamp(1.75rem, 4.5vw, 2.35rem);
          letter-spacing: -0.03em;
          padding-right: 2.75rem;
          white-space: normal;
        }

        .job-seeker-staggered-menu
          .sm-panel-list[data-numbering]
          .sm-panel-item::after {
          right: 0;
          top: 0.12em;
          font-size: 0.8125rem;
        }
      `}</style>
    </div>
  );
}
