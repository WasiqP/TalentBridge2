"use client";

import { DashboardSidebarFooter } from "@/components/dashboard/dashboard-sidebar-footer";
import { DashboardSidebarLogout } from "@/components/dashboard/dashboard-sidebar-logout";
import { DashboardSidebarSearch } from "@/components/dashboard/dashboard-sidebar-search";
import { DashboardChatInput } from "@/components/dashboard/dashboard-chat-input";
import { DashboardContentPanel } from "@/components/dashboard/dashboard-content-panel";
import { DashboardResumeDropzone } from "@/components/dashboard/dashboard-resume-dropzone";
import { DashboardTopActions } from "@/components/dashboard/dashboard-top-actions";
import { StaggeredMenu } from "@/components/ui/staggered-menu";
import { jobSeekerMenuItems } from "@/config/job-seeker-menu";

type JobSeekerDashboardShellProps = {
  children: React.ReactNode;
};

export function JobSeekerDashboardShell({
  children,
}: JobSeekerDashboardShellProps) {
  return (
    <div className="relative min-h-svh">
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
        panelHeader={
          <DashboardSidebarSearch placeholder="Search dashboard…" />
        }
        panelFooter={<DashboardSidebarFooter />}
        panelFooterBottom={<DashboardSidebarLogout />}
      />

      <DashboardTopActions />

      <main className="relative z-0 flex min-h-svh flex-col pb-32">
        <DashboardContentPanel>
          <DashboardResumeDropzone />
          {children}
        </DashboardContentPanel>
      </main>

      <DashboardChatInput />

      <style jsx global>{`
        .job-seeker-staggered-menu .staggered-menu-header {
          justify-content: flex-start;
          padding: 1.25rem 1.25rem;
        }

        @media (min-width: 640px) {
          .job-seeker-staggered-menu .staggered-menu-header {
            padding: 1.5rem 2rem;
          }
        }

        .job-seeker-staggered-menu .sm-logo {
          display: none;
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
