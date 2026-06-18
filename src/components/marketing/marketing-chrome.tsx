"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";

import { NavTransitionOverlay } from "@/components/marketing/nav-transition-overlay";
import { SplashScreen } from "@/components/marketing/splash-screen";
import { isGuestPreviewRoute } from "@/config/guest-preview-routes";
import { isMarketingRoute } from "@/config/marketing-routes";

/** Splash on each marketing page load + lime wipe between client navigations. */
export function MarketingChrome() {
  const pathname = usePathname() ?? "";
  const isMarketing =
    isMarketingRoute(pathname) && !isGuestPreviewRoute(pathname);

  const [showSplash, setShowSplash] = useState(isMarketing);
  const [splashReady, setSplashReady] = useState(!isMarketing);
  const [navTransition, setNavTransition] = useState(false);

  const prevPath = useRef(pathname);
  const skipNavTransition = useRef(true);
  const splashStarted = useRef(isMarketing);

  useEffect(() => {
    if (!isMarketing) {
      setShowSplash(false);
      setSplashReady(true);
      return;
    }

    if (!splashStarted.current) {
      splashStarted.current = true;
      setShowSplash(true);
      setSplashReady(false);
      document.body.style.overflow = "hidden";
    }
  }, [isMarketing]);

  useEffect(() => {
    if (!isMarketing || !splashReady) return;

    if (skipNavTransition.current) {
      skipNavTransition.current = false;
      prevPath.current = pathname;
      return;
    }

    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    setNavTransition(true);
    const timer = window.setTimeout(() => setNavTransition(false), 1000);
    return () => window.clearTimeout(timer);
  }, [pathname, isMarketing, splashReady]);

  function completeSplash() {
    setShowSplash(false);
    setSplashReady(true);
    document.body.style.overflow = "";
  }

  if (!isMarketing) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={completeSplash} />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {navTransition && splashReady ? (
          <NavTransitionOverlay key={pathname} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
