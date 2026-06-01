"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-ink-900/8 bg-paper-50/80 backdrop-blur-xl"
            : "border-b border-transparent bg-paper-50/0",
        )}
      >
        <Container size="full">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <nav className="hidden items-center gap-1 md:flex">
              {mainNav.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-sm transition",
                      active
                        ? "bg-ink-900/8 text-ink-950"
                        : "text-ink-500 hover:bg-ink-900/5 hover:text-ink-900",
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" href="/sign-in" asChild>
                Sign in
              </Button>
              <Button variant="outline" size="sm" href="/sign-up" asChild>
                Sign up
              </Button>
              <Button size="sm" variant="lime" href="/contact" asChild>
                Book a demo
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {open && (
        <div className="border-t border-ink-900/8 bg-paper-50 md:hidden">
          <Container size="full" className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-[15px] text-ink-700 hover:bg-ink-900/5"
              >
                {item.title}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 pt-2">
              <Button variant="outline" href="/sign-in" asChild>
                Sign in
              </Button>
              <Button variant="lime" href="/sign-up" asChild>
                Sign up
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
