import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const groups = [
  { label: "Product", items: footerNav.product },
  { label: "Solutions", items: footerNav.solutions },
  { label: "Resources", items: footerNav.resources },
  { label: "Company", items: footerNav.company },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-paper-50">
      <div className="absolute inset-0 gradient-mesh opacity-40" aria-hidden />
      <Container size="full" className="relative py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-pretty text-base leading-relaxed text-paper-100/65">
              {siteConfig.description}
            </p>
            <div className="mt-10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-paper-100/45">
                Get the newsletter
              </p>
              <p className="mt-2 text-sm text-paper-100/70">
                Hiring insights, product updates, no spam.
              </p>
              <div className="mt-4 max-w-sm">
                <NewsletterForm dark />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {groups.map((group) => (
              <div key={group.label}>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-paper-100/45">
                  {group.label}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[14px] text-paper-100/80 transition hover:text-paper-50"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper-50/8 pt-8 text-sm text-paper-100/55 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            {footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-paper-50"
              >
                {item.title}
              </Link>
            ))}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-paper-50"
            >
              Twitter
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-paper-50"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none mt-16 flex items-center justify-center text-[20vw] font-serif italic leading-none text-paper-50/[0.035] sm:text-[18vw]"
        >
          TalentBridge
        </div>
      </Container>
    </footer>
  );
}
