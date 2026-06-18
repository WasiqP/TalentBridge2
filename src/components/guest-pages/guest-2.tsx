"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Guest2ChatPanel } from "@/components/guest-pages/guest-2-chat-panel";
import { Guest2ProfilePanel } from "@/components/guest-pages/guest-2-profile-panel";
import { Guest2StepRail } from "@/components/guest-pages/guest-2-step-rail";
import { Guest2UploadPanel } from "@/components/guest-pages/guest-2-upload-panel";
import { Button } from "@/components/ui/button";
import { type ExtractionStep } from "@/components/dashboard/dashboard-extraction-panel";
import type { JobSeekerProfile } from "@/config/job-seeker-profile";
import { fetchCvSuggestions, uploadCvFile } from "@/lib/api/hr-backend-api";
import {
  saveCvSuggestionsToSession,
  saveParsedProfileToSession,
} from "@/lib/api/hr-backend-session";
import { mapCandidateProfileToJobSeekerProfile } from "@/lib/api/map-candidate-profile-to-ui";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const NUDGE_DISMISSED_KEY = "guest2_nudge_dismissed";
const WHEEL_COOLDOWN_MS = 600;
const PANEL_COUNT = 3;
const PROFILE_REDIRECT_MS = 350;

const initialSteps: ExtractionStep[] = [
  { id: "s1", title: "Reading your résumé", status: "pending" },
  { id: "s2", title: "Extracting experience & skills", status: "pending" },
  { id: "s3", title: "Creating your profile draft", status: "pending" },
  { id: "s4", title: "Suggesting improvements", status: "pending" },
];

type FlowPhase = "idle" | "extracting" | "complete" | "error";

function isInsideScrollablePanel(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const panel = target.closest("[data-scroll-panel]");
  if (!(panel instanceof HTMLElement)) return null;
  if (panel.scrollHeight <= panel.clientHeight) return null;
  return panel;
}

function canScrollPanel(panel: HTMLElement, deltaY: number): boolean {
  if (deltaY > 0) {
    return panel.scrollTop + panel.clientHeight < panel.scrollHeight - 1;
  }
  if (deltaY < 0) {
    return panel.scrollTop > 1;
  }
  return false;
}

type GateNudgeProps = {
  open: boolean;
  onDismiss: () => void;
};

function GateNudge({ open, onDismiss }: GateNudgeProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 z-30 flex w-full items-center justify-between gap-4 border-t border-ink-900/10 bg-white px-6 py-4 shadow-[0_-8px_32px_rgba(8,8,12,0.08)] transition-transform duration-300 ease-out sm:px-8",
        open ? "translate-y-0" : "translate-y-full",
      )}
    >
      <p className="text-[13px] text-ink-700 sm:text-sm">
        Sign up to save your profile and apply · 30 seconds
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="lime"
          size="sm"
          href="/sign-up"
          asChild
          className="whitespace-nowrap bg-[#CBFF4D] hover:bg-[#CBFF4D]/90"
        >
          Sign up free →
        </Button>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-full px-3 py-2 text-[13px] text-ink-500 transition hover:bg-ink-900/5 hover:text-ink-900"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

/** Design option 2 — horizontal scroll: chat → résumé → profile at `/guest-2`. */
export function Guest2Page() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wheelCooldownRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const nudgeDismissedRef = useRef(false);
  const redirectTimerRef = useRef<number | null>(null);
  const flowLockedRef = useRef(false);

  const [panel, setPanel] = useState(0);
  const [flowPhase, setFlowPhase] = useState<FlowPhase>("idle");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | undefined>();
  const [steps, setSteps] = useState<ExtractionStep[]>(initialSteps);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [parsedProfile, setParsedProfile] = useState<JobSeekerProfile | null>(null);
  const [nudgeOpen, setNudgeOpen] = useState(false);

  const isExtracting = flowPhase === "extracting";
  const isComplete = flowPhase === "complete";
  const profileReady = isComplete && parsedProfile !== null;
  const flowLocked = isExtracting;
  flowLockedRef.current = flowLocked;

  const maxPanel = profileReady ? PANEL_COUNT - 1 : 1;

  const goToPanel = useCallback(
    (index: number) => {
      if (flowLocked) return;
      if (index > maxPanel) return;
      setPanel(Math.max(0, Math.min(PANEL_COUNT - 1, index)));
    },
    [flowLocked, maxPanel],
  );

  const goNext = useCallback(() => {
    if (flowLocked) return;
    setPanel((current) => Math.min(maxPanel, current + 1));
  }, [flowLocked, maxPanel]);

  const goPrev = useCallback(() => {
    if (flowLocked) return;
    setPanel((current) => Math.max(0, current - 1));
  }, [flowLocked]);

  const openNudge = useCallback(() => {
    if (!nudgeDismissedRef.current) {
      setNudgeOpen(true);
    }
  }, []);

  const dismissNudge = useCallback(() => {
    nudgeDismissedRef.current = true;
    sessionStorage.setItem(NUDGE_DISMISSED_KEY, "1");
    setNudgeOpen(false);
  }, []);

  const resetUpload = useCallback(() => {
    setFlowPhase("idle");
    setResumeFile(null);
    setFileName(undefined);
    setSteps(initialSteps);
    setExtractionError(null);
    setParsedProfile(null);
    setPanel(1);
  }, []);

  const handleFileSelected = useCallback((file: File) => {
    setResumeFile(file);
    setFileName(file.name);
    setFlowPhase("extracting");
    setExtractionError(null);
    setParsedProfile(null);
    setPanel(1);
    setSteps([
      { id: "s1", title: "Reading your résumé", status: "running" },
      { id: "s2", title: "Extracting experience & skills", status: "pending" },
      { id: "s3", title: "Creating your profile draft", status: "pending" },
      { id: "s4", title: "Suggesting improvements", status: "pending" },
    ]);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(NUDGE_DISMISSED_KEY) === "1") {
      nudgeDismissedRef.current = true;
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.overflow = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    if (panel > maxPanel) {
      setPanel(maxPanel);
    }
  }, [panel, maxPanel]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.to(track, {
      x: `${-(panel * 100)}vw`,
      duration: flowLockedRef.current ? 0.5 : 0.65,
      ease: "power3.inOut",
    });
  }, [panel]);

  useEffect(() => {
    if (flowPhase !== "extracting" || !resumeFile) return;

    let cancelled = false;

    async function runCvParsingFlow() {
      try {
        const uploadResult = await uploadCvFile(resumeFile!);
        if (cancelled) return;

        if (!uploadResult.parsedProfile) {
          throw new Error("The API did not return profile data for this file.");
        }

        saveParsedProfileToSession(uploadResult.parsedProfile);

        setSteps((prev) =>
          prev.map((step) =>
            step.id === "s1"
              ? { ...step, status: "done" }
              : step.id === "s2"
                ? { ...step, status: "done" }
                : step.id === "s3"
                  ? { ...step, status: "running" }
                  : step,
          ),
        );

        setSteps((prev) =>
          prev.map((step) =>
            step.id === "s3"
              ? { ...step, status: "done" }
              : step.id === "s4"
                ? { ...step, status: "running" }
                : step,
          ),
        );

        let suggestions: Awaited<ReturnType<typeof fetchCvSuggestions>> = [];
        try {
          suggestions = await fetchCvSuggestions(uploadResult.parsedProfile);
          saveCvSuggestionsToSession(suggestions);
        } catch {
          // Profile still renders if suggestions are unavailable.
        }
        if (cancelled) return;

        setParsedProfile(
          mapCandidateProfileToJobSeekerProfile(uploadResult.parsedProfile, {
            uploadStatus: uploadResult.uploadStatus,
            missingRequiredFields: uploadResult.missingRequiredFields,
            apiSuggestions: suggestions,
          }),
        );

        setSteps((prev) => prev.map((step) => ({ ...step, status: "done" })));
        setFlowPhase("complete");

        if (redirectTimerRef.current) {
          clearTimeout(redirectTimerRef.current);
        }
        redirectTimerRef.current = window.setTimeout(() => {
          redirectTimerRef.current = null;
          if (!cancelled) setPanel(2);
        }, PROFILE_REDIRECT_MS);
      } catch (error) {
        if (cancelled) return;

        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while parsing your CV.";

        setExtractionError(message);
        setFlowPhase("error");
      }
    }

    runCvParsingFlow();

    return () => {
      cancelled = true;
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, [flowPhase, resumeFile]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    function handleWheel(event: WheelEvent) {
      const scrollablePanel = isInsideScrollablePanel(event.target);
      if (scrollablePanel && canScrollPanel(scrollablePanel, event.deltaY)) {
        return;
      }

      if (flowLocked) {
        event.preventDefault();
        return;
      }

      event.preventDefault();

      if (wheelCooldownRef.current) return;

      const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
      if (delta === 0) return;

      wheelCooldownRef.current = true;
      window.setTimeout(() => {
        wheelCooldownRef.current = false;
      }, WHEEL_COOLDOWN_MS);

      if (delta > 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    function handleTouchStart(event: TouchEvent) {
      touchStartXRef.current = event.touches[0]?.clientX ?? null;
    }

    function handleTouchEnd(event: TouchEvent) {
      if (flowLocked) return;

      const startX = touchStartXRef.current;
      const endX = event.changedTouches[0]?.clientX;
      touchStartXRef.current = null;
      if (startX == null || endX == null) return;

      const delta = endX - startX;
      if (Math.abs(delta) < 50) return;

      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev, flowLocked]);

  return (
    <div
      ref={wrapperRef}
      data-lenis-prevent
      data-lenis-prevent-wheel
      className="relative h-screen w-screen overflow-hidden bg-white"
    >
      <Guest2StepRail
        activeStep={panel}
        profileReady={profileReady}
        locked={isExtracting}
        onStepClick={goToPanel}
      />

      <div ref={trackRef} className="flex h-full w-[300vw] will-change-transform">
        <Guest2ChatPanel onContinue={() => goToPanel(1)} />

        <Guest2UploadPanel
          fileName={fileName}
          steps={steps}
          isExtracting={isExtracting || flowPhase === "error"}
          isComplete={isComplete}
          errorMessage={extractionError}
          onFileSelected={handleFileSelected}
          onRetry={resetUpload}
        />

        {profileReady && parsedProfile ? (
          <Guest2ProfilePanel
            profile={parsedProfile}
            fileName={fileName}
            onSaveClick={openNudge}
          />
        ) : (
          <section className="flex h-screen w-screen shrink-0 grow-0 basis-[100vw] items-center justify-center bg-white px-6 pt-16">
            <div className="max-w-md text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
                Step 3
              </p>
              <h2 className="mt-2 text-[28px] font-medium tracking-[-0.025em] text-ink-950">
                Profile unlocks after upload
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
                Drop your résumé on the previous step. We&apos;ll parse it and
                bring you here automatically.
              </p>
            </div>
          </section>
        )}
      </div>

      {panel > 0 && !flowLocked ? (
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-800 shadow-sm transition hover:bg-ink-900/[0.03]"
          aria-label="Previous panel"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      ) : null}

      {panel < maxPanel && !flowLocked ? (
        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-800 shadow-sm transition hover:bg-ink-900/[0.03]"
          aria-label="Next panel"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      ) : null}

      <GateNudge open={nudgeOpen} onDismiss={dismissNudge} />
    </div>
  );
}
