"use client";

import Link from "next/link";

import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Twitter", href: siteConfig.links.twitter },
] as const;

export function DashboardSidebarFooter() {
  const year = new Date().getFullYear();

  return (
    <div className="sm-sidebar-footer space-y-2.5">
      <nav
        className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-600"
        aria-label="Social and legal links"
      >
        {socialLinks.map(({ label, href }, index) => (
          <span key={label} className="inline-flex items-center gap-3">
            {index > 0 ? (
              <span className="text-ink-300" aria-hidden>
                ·
              </span>
            ) : null}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition hover:text-ink-950"
            >
              {label}
            </a>
          </span>
        ))}
        {footerNav.legal.map((item) => (
          <span key={item.href} className="inline-flex items-center gap-3">
            <span className="text-ink-300" aria-hidden>
              ·
            </span>
            <Link
              href={item.href}
              className="font-medium transition hover:text-ink-950"
            >
              {item.title}
            </Link>
          </span>
        ))}
      </nav>

      <p className="text-[11px] leading-snug text-ink-400" suppressHydrationWarning>
        © {year} {siteConfig.name}
      </p>
    </div>
  );
}
