"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Bell, Shield, SlidersHorizontal, UserRound } from "lucide-react";

import { AuthField } from "@/components/auth/auth-field";
import { DashboardPageFrame } from "@/components/dashboard/dashboard-page-frame";
import { SettingsSection } from "@/components/dashboard/settings/settings-section";
import { SettingsSelectField } from "@/components/dashboard/settings/settings-select-field";
import { SettingsToggleRow } from "@/components/dashboard/settings/settings-toggle-row";
import { Button } from "@/components/ui/button";
import {
  jobSeekerSettingsNav,
  type SettingsSectionId,
} from "@/config/job-seeker-settings";
import { cn } from "@/lib/utils";

const sectionIcons: Record<SettingsSectionId, typeof UserRound> = {
  account: UserRound,
  notifications: Bell,
  preferences: SlidersHorizontal,
  privacy: Shield,
};

export function JobSeekerSettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSectionId>("account");
  const [saved, setSaved] = useState(false);

  const [fullName, setFullName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@example.com");
  const [headline, setHeadline] = useState("Product designer · open to remote");
  const [location, setLocation] = useState("Berlin, Germany");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [jobMatches, setJobMatches] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [applicationUpdates, setApplicationUpdates] = useState(true);

  const [workMode, setWorkMode] = useState("hybrid");
  const [targetRole, setTargetRole] = useState("product-design");
  const [experienceLevel, setExperienceLevel] = useState("mid");

  const [profileVisible, setProfileVisible] = useState(true);
  const [shareWithRecruiters, setShareWithRecruiters] = useState(true);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(true);

  const scrollToSection = useCallback((id: SettingsSectionId) => {
    setActiveSection(id);
    const el = document.getElementById(`settings-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const sections = jobSeekerSettingsNav.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(`settings-${id}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function handleSave() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <DashboardPageFrame>
      <header className="mb-8 sm:mb-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
          Job seeker
        </p>
        <h1 className="mt-2 text-[clamp(2rem,5vw,2.75rem)] font-medium tracking-[-0.03em] text-ink-950">
          Settings
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-500">
          Manage your account, how we notify you, and what recruiters see when
          you apply through TalentBridge.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-10">
        <nav
          aria-label="Settings sections"
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {jobSeekerSettingsNav.map((item) => {
              const Icon = sectionIcons[item.id];
              const isActive = activeSection === item.id;

              return (
                <li key={item.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "flex w-full min-w-[10.5rem] items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition lg:min-w-0",
                      isActive
                        ? "border-ink-900/18 bg-paper-100 shadow-[0_2px_12px_rgba(8,8,12,0.05)]"
                        : "border-transparent bg-transparent hover:border-ink-900/10 hover:bg-paper-100/70",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border",
                        isActive
                          ? "border-ink-900/15 bg-paper-50 text-ink-950"
                          : "border-ink-900/10 bg-paper-50/80 text-ink-600",
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-medium text-ink-950">
                        {item.label}
                      </span>
                      <span className="mt-0.5 hidden text-[12px] leading-snug text-ink-500 lg:block">
                        {item.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-5">
          <SettingsSection
            id="settings-account"
            title="Account"
            description="Your name and contact details appear on applications and your public profile."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <AuthField
                label="Full name"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
              <AuthField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <AuthField
              label="Headline"
              name="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              hint="Shown under your name on your profile."
            />
            <AuthField
              label="Location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoComplete="address-level2"
            />
          </SettingsSection>

          <SettingsSection
            id="settings-notifications"
            title="Notifications"
            description="Choose what we send to your inbox. You can change these anytime."
          >
            <SettingsToggleRow
              label="Email alerts"
              description="Important account and security updates."
              checked={emailAlerts}
              onChange={setEmailAlerts}
            />
            <SettingsToggleRow
              label="New job matches"
              description="When roles match your preferences and resume."
              checked={jobMatches}
              onChange={setJobMatches}
            />
            <SettingsToggleRow
              label="Application status"
              description="When a recruiter views or updates your application."
              checked={applicationUpdates}
              onChange={setApplicationUpdates}
            />
            <SettingsToggleRow
              label="Weekly digest"
              description="A summary of new matches and profile tips."
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
            />
          </SettingsSection>

          <SettingsSection
            id="settings-preferences"
            title="Job preferences"
            description="Helps us rank roles and tailor suggestions after you upload a resume."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SettingsSelectField
                label="Work style"
                value={workMode}
                onChange={setWorkMode}
                options={[
                  { value: "remote", label: "Remote" },
                  { value: "hybrid", label: "Hybrid" },
                  { value: "onsite", label: "On-site" },
                ]}
              />
              <SettingsSelectField
                label="Target role"
                value={targetRole}
                onChange={setTargetRole}
                options={[
                  { value: "product-design", label: "Product design" },
                  { value: "engineering", label: "Engineering" },
                  { value: "marketing", label: "Marketing" },
                  { value: "operations", label: "Operations" },
                ]}
              />
            </div>
            <SettingsSelectField
              label="Experience level"
              value={experienceLevel}
              onChange={setExperienceLevel}
              hint="Used for match scoring, not shown publicly unless you choose."
              options={[
                { value: "entry", label: "Entry level" },
                { value: "mid", label: "Mid level" },
                { value: "senior", label: "Senior" },
                { value: "lead", label: "Lead / principal" },
              ]}
            />
          </SettingsSection>

          <SettingsSection
            id="settings-privacy"
            title="Privacy & data"
            description="Control visibility and how your data is used on TalentBridge."
          >
            <SettingsToggleRow
              label="Public profile"
              description="Allow your profile to appear in recruiter search."
              checked={profileVisible}
              onChange={setProfileVisible}
            />
            <SettingsToggleRow
              label="Share with recruiters on apply"
              description="Send your full profile when you submit an application."
              checked={shareWithRecruiters}
              onChange={setShareWithRecruiters}
            />
            <SettingsToggleRow
              label="Product analytics"
              description="Help us improve matching with anonymized usage data."
              checked={analyticsOptIn}
              onChange={setAnalyticsOptIn}
            />
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button type="button" variant="outline" size="md">
                Download my data
              </Button>
              <Button type="button" variant="ghost" size="md">
                Privacy policy
              </Button>
            </div>
          </SettingsSection>

          <section
            id="settings-danger"
            className="scroll-mt-28 rounded-[28px] border border-red-400/25 bg-red-50/40 p-6 sm:rounded-[32px] sm:p-8"
          >
            <header className="mb-5">
              <h2 className="text-[18px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[20px]">
                Danger zone
              </h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
                Permanently delete your account and all associated data. This
                cannot be undone.
              </p>
            </header>
            <Button type="button" variant="outline" size="md" className="border-red-400/50 text-red-700 hover:border-red-500 hover:bg-red-50">
              Delete account
            </Button>
          </section>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-5 sm:px-6"
      >
        <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl border border-ink-900/12 bg-paper-50/95 px-4 py-3 shadow-[0_8px_32px_rgba(8,8,12,0.1)] backdrop-blur-md sm:px-5">
          <p className="text-[13px] text-ink-500 sm:text-[14px]">
            {saved ? (
              <span className="font-medium text-ink-950">Changes saved.</span>
            ) : (
              "Unsaved changes apply when you save."
            )}
          </p>
          <Button type="button" variant="primary" size="md" onClick={handleSave}>
            {saved ? "Saved" : "Save changes"}
          </Button>
        </div>
      </motion.div>
    </DashboardPageFrame>
  );
}
