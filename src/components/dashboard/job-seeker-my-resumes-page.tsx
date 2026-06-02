"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { FileUp, Plus } from "lucide-react";

import { DashboardPageFrame } from "@/components/dashboard/dashboard-page-frame";
import { ResumeEditor } from "@/components/dashboard/resumes/resume-editor";
import { ResumeListItem } from "@/components/dashboard/resumes/resume-list-item";
import { Button } from "@/components/ui/button";
import { JOB_SEEKER_DASHBOARD_PATH } from "@/config/dashboard-routes";
import {
  jobSeekerResumeSeeds,
  MY_RESUMES_STORAGE_KEY,
  type JobSeekerResume,
} from "@/config/job-seeker-resumes";

function loadResumes(): JobSeekerResume[] {
  if (typeof window === "undefined") return jobSeekerResumeSeeds;

  try {
    const raw = localStorage.getItem(MY_RESUMES_STORAGE_KEY);
    if (!raw) return jobSeekerResumeSeeds;
    const parsed = JSON.parse(raw) as JobSeekerResume[];
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : jobSeekerResumeSeeds;
  } catch {
    return jobSeekerResumeSeeds;
  }
}

function persistResumes(resumes: JobSeekerResume[]) {
  localStorage.setItem(MY_RESUMES_STORAGE_KEY, JSON.stringify(resumes));
}

export function JobSeekerMyResumesPage() {
  const [resumes, setResumes] = useState<JobSeekerResume[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadResumes();
    setResumes(stored);
    setSelectedId(stored[0]?.id ?? "");
    setHydrated(true);
  }, []);

  const selected =
    resumes.find((r) => r.id === selectedId) ?? resumes[0] ?? null;

  const persist = useCallback((next: JobSeekerResume[]) => {
    setResumes(next);
    persistResumes(next);
  }, []);

  function handleSave(updated: JobSeekerResume) {
    persist(resumes.map((r) => (r.id === updated.id ? updated : r)));
  }

  function handleSetPrimary(id: string) {
    persist(
      resumes.map((r) => ({
        ...r,
        isPrimary: r.id === id,
      })),
    );
  }

  if (!hydrated) {
    return (
      <DashboardPageFrame className="max-w-6xl">
        <div className="h-40 animate-pulse rounded-3xl bg-paper-100" />
      </DashboardPageFrame>
    );
  }

  return (
    <DashboardPageFrame className="max-w-6xl pb-12 lg:pb-16">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
            Job seeker
          </p>
          <h1 className="mt-2 text-[clamp(2rem,5vw,2.75rem)] font-medium tracking-[-0.03em] text-ink-950">
            My resumes
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-500">
            View every resume you&apos;ve uploaded, edit parsed content, and save
            versions for different applications.
          </p>
        </div>
        <Button
          variant="outline"
          size="md"
          className="gap-2"
          asChild
          href={JOB_SEEKER_DASHBOARD_PATH}
        >
          <>
            <Plus className="h-4 w-4" strokeWidth={2} />
            Upload new
          </>
        </Button>
      </header>

      {resumes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center rounded-[28px] border border-dashed border-ink-900/15 bg-paper-50 px-6 py-16 text-center"
        >
          <FileUp className="h-10 w-10 text-ink-300" strokeWidth={1.5} />
          <p className="mt-4 text-[16px] font-medium text-ink-950">No resumes yet</p>
          <p className="mt-2 max-w-sm text-[14px] text-ink-500">
            Upload a resume from your dashboard and it will appear here for editing.
          </p>
          <Button
            variant="primary"
            size="md"
            className="mt-6"
            asChild
            href={JOB_SEEKER_DASHBOARD_PATH}
          >
            Go to upload
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
          <aside className="space-y-2 lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
              Your files ({resumes.length})
            </p>
            {resumes.map((resume) => (
              <ResumeListItem
                key={resume.id}
                resume={resume}
                selected={resume.id === selectedId}
                onSelect={() => setSelectedId(resume.id)}
              />
            ))}
          </aside>

          <div className="min-w-0">
            {selected ? (
              <ResumeEditor
                resume={selected}
                onSave={handleSave}
                onSetPrimary={handleSetPrimary}
              />
            ) : null}
          </div>
        </div>
      )}
    </DashboardPageFrame>
  );
}
