"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";

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
import { DashboardContentPanel } from "@/components/dashboard/dashboard-content-panel";
import {
  DashboardExtractionPanel,
  type ExtractionStep,
} from "@/components/dashboard/dashboard-extraction-panel";
import { DashboardBackButton } from "@/components/dashboard/dashboard-back-button";
import { DashboardFloatingChat } from "@/components/dashboard/dashboard-floating-chat";
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
  const [showExtractionNext, setShowExtractionNext] = useState(false);
  const resumeFileUrlRef = useRef<string | null>(null);
  const extractionAnimatedRef = useRef(false);

  const fileName = useMemo(() => resumeFile?.name, [resumeFile]);

  const screenKey = isStandalonePage ? pathname : phase;

  function handleFileSelected(file: File) {
    if (resumeFileUrlRef.current) {
      URL.revokeObjectURL(resumeFileUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    resumeFileUrlRef.current = url;
    setResumeFile(file);
    setExtractionReady(false);
    setShowExtractionNext(false);
    extractionAnimatedRef.current = false;
    setDirection(1);
    setPhase("extracting");
  }

  function handleNext() {
    if (!isStandalonePage && phase === "extracting" && extractionReady) {
      setDirection(1);
      setPhase("complete");
      return;
    }

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
      setExtractionReady(true);
      setShowExtractionNext(true);
      setSteps((prev) => prev.map((s) => ({ ...s, status: "done" as const })));
      setPhase("extracting");
      return;
    }

    if (phase === "extracting") {
      setDirection(-1);
      extractionAnimatedRef.current = false;
      setExtractionReady(false);
      setShowExtractionNext(false);
      setPhase("upload");
    }
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
    if (extractionAnimatedRef.current) return;

    extractionAnimatedRef.current = true;
    setExtractionReady(false);
    setShowExtractionNext(false);
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
      }, 4900),
    );

    timers.push(
      setTimeout(() => {
        setShowExtractionNext(true);
      }, 5400),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [phase, resumeFile]);

  const showBottomChat = phase === "upload" && !isStandalonePage;
  const showFloatingChat =
    isStandalonePage || phase === "complete" || phase === "extracting";
  const inClickFlow =
    phase === "extracting" ||
    phase === "complete" ||
    pathname === JOB_SEEKER_SEARCH_PATH;
  const showBack = inClickFlow;
  const showNext =
    (!isStandalonePage && phase === "extracting" && showExtractionNext) ||
    (!isStandalonePage && phase === "complete");
  const nextLabel = phase === "complete" ? "Find jobs" : "Next";

  return (
    <div className="relative min-h-svh overflow-x-hidden">
      {/* Sidebar menu disabled for now
      <StaggeredMenu ... />
      */}

      <DashboardTopActions />

      <main
        className={cn(
          "relative z-0 flex min-h-svh flex-col overflow-x-hidden",
          isStandalonePage ? "pb-10" : showBottomChat ? "pb-32" : "pb-6",
        )}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {isStandalonePage ? (
            <DashboardScreenTransition key={screenKey} direction={direction}>
              {children}
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

      {showBottomChat ? <DashboardChatInput /> : null}

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
