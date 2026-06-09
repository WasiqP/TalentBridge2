"use client";

import { usePathname } from "next/navigation";

// import { DashboardSidebarFooter } from "@/components/dashboard/dashboard-sidebar-footer";
// import { DashboardSidebarLogout } from "@/components/dashboard/dashboard-sidebar-logout";
// import { DashboardSidebarRole } from "@/components/dashboard/dashboard-sidebar-role";
// import { DashboardSidebarSearch } from "@/components/dashboard/dashboard-sidebar-search";
import { DashboardTopActions } from "@/components/dashboard/dashboard-top-actions";
// import { StaggeredMenu } from "@/components/ui/staggered-menu";
import { isHiringAgencyStandalonePage } from "@/config/dashboard-routes";
// import { hiringAgencyMenuItems } from "@/config/hiring-agency-menu";
import { cn } from "@/lib/utils";

type HiringAgencyDashboardShellProps = {
  children: React.ReactNode;
};

export function HiringAgencyDashboardShell({
  children,
}: HiringAgencyDashboardShellProps) {
  const pathname = usePathname();
  const isStandalonePage = isHiringAgencyStandalonePage(pathname);

  return (
    <div className="relative min-h-svh">
      {/* Sidebar menu disabled for now
      <StaggeredMenu
        position="left"
        isFixed
        items={hiringAgencyMenuItems}
        displaySocials={false}
        displayItemNumbering
        colors={["#fbfaf6", "#ebe9e3", "#141418"]}
        menuButtonColor="#08080c"
        openMenuButtonColor="#08080c"
        accentColor="#c1f968"
        changeMenuColorOnOpen={false}
        closeOnClickAway
        className="hiring-agency-staggered-menu"
        logoUrl=""
        panelToolbar={<DashboardSidebarRole fallback="recruiter" />}
        panelHeader={
          <DashboardSidebarSearch placeholder="Search roles & candidates…" />
        }
        panelFooter={<DashboardSidebarFooter />}
        panelFooterBottom={<DashboardSidebarLogout />}
      />
      */}

      <DashboardTopActions />

      <main
        className={cn(
          "relative z-0 flex flex-col min-h-svh",
          isStandalonePage ? "pb-10" : "pb-6",
        )}
      >
        {children}
      </main>

      {/* Staggered menu styles disabled for now
      <style jsx global>{`
        .hiring-agency-staggered-menu .staggered-menu-header {
          justify-content: flex-start;
          padding: 1.25rem 1.25rem;
        }

        .hiring-agency-staggered-menu .sm-header-leading {
          gap: 0;
        }

        @media (min-width: 640px) {
          .hiring-agency-staggered-menu .staggered-menu-header {
            padding: 1.5rem 2rem;
          }
        }

        .hiring-agency-staggered-menu .sm-logo {
          display: none;
        }

        .hiring-agency-staggered-menu .sm-panel-toolbar {
          margin-top: -3.25rem;
          margin-bottom: 0.25rem;
          min-height: 2.75rem;
        }

        .hiring-agency-staggered-menu .sm-toggle {
          z-index: 30;
          padding: 0.65rem 0.85rem;
          border-radius: 1rem;
          border: 1px solid rgba(8, 8, 12, 0.12);
          background: #fbfaf6;
          color: #08080c !important;
        }

        .hiring-agency-staggered-menu[data-open] .sm-toggle {
          border-color: rgba(8, 8, 12, 0.12);
          background: #fbfaf6;
          color: #08080c !important;
          box-shadow: 0 2px 12px rgba(8, 8, 12, 0.08);
        }

        .hiring-agency-staggered-menu .staggered-menu-panel,
        .hiring-agency-staggered-menu .sm-prelayers {
          width: clamp(300px, 44vw, 480px);
        }

        .hiring-agency-staggered-menu .staggered-menu-panel {
          padding: 5.5em 2rem 2rem 2rem;
        }

        .hiring-agency-staggered-menu .sm-panel-header {
          margin-bottom: 1.25rem;
        }

        .hiring-agency-staggered-menu .sm-panel-list {
          margin-top: 0;
        }

        .hiring-agency-staggered-menu .sm-panel-footer {
          padding-top: 1rem;
          margin-top: 1.5rem;
        }

        .hiring-agency-staggered-menu .sm-panel-footer-bottom {
          padding-top: 0.5rem;
          padding-bottom: 0.25rem;
        }

        .hiring-agency-staggered-menu .sm-panel-itemWrap {
          overflow: visible;
        }

        .hiring-agency-staggered-menu .sm-panel-item {
          display: block;
          width: 100%;
          max-width: 100%;
          font-size: clamp(1.75rem, 4.5vw, 2.35rem);
          letter-spacing: -0.03em;
          padding-right: 2.75rem;
          white-space: normal;
        }

        .hiring-agency-staggered-menu
          .sm-panel-list[data-numbering]
          .sm-panel-item::after {
          right: 0;
          top: 0.12em;
          font-size: 0.8125rem;
        }
      `}</style>
      */}
    </div>
  );
}
