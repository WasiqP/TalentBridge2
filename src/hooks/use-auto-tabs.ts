"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type UseAutoTabsOptions = {
  intervalMs?: number;
};

export function useAutoTabs<T extends string>(
  tabIds: readonly T[],
  { intervalMs = 5500 }: UseAutoTabsOptions = {},
) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion === true;

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const autoPaused = useRef(false);
  const startedAt = useRef(0);
  const pausedElapsed = useRef(0);

  const activeTab = tabIds[activeIndex] ?? tabIds[0];

  const resetTimer = useCallback(() => {
    startedAt.current = performance.now();
    pausedElapsed.current = 0;
    setProgress(0);
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      const safeIndex =
        ((index % tabIds.length) + tabIds.length) % tabIds.length;
      setActiveIndex(safeIndex);
      resetTimer();
    },
    [resetTimer, tabIds.length],
  );

  const setActiveTab = useCallback(
    (id: T) => {
      const index = tabIds.indexOf(id);
      if (index >= 0) goToIndex(index);
    },
    [goToIndex, tabIds],
  );

  const pauseAuto = useCallback(() => {
    if (autoPaused.current) return;
    autoPaused.current = true;
    pausedElapsed.current = performance.now() - startedAt.current;
  }, []);

  const resumeAuto = useCallback(() => {
    if (!autoPaused.current) return;
    autoPaused.current = false;
    startedAt.current = performance.now() - pausedElapsed.current;
  }, []);

  useEffect(() => {
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    if (reducedMotion || tabIds.length < 2) return;

    let frame = 0;

    const tick = (now: number) => {
      if (!autoPaused.current) {
        const elapsed = now - startedAt.current;
        const nextProgress = Math.min(elapsed / intervalMs, 1);
        setProgress(nextProgress);

        if (nextProgress >= 1) {
          setActiveIndex((current) => (current + 1) % tabIds.length);
          startedAt.current = now;
          setProgress(0);
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [intervalMs, reducedMotion, tabIds.length]);

  return {
    activeTab,
    activeIndex,
    progress,
    setActiveTab,
    pauseAuto,
    resumeAuto,
  };
}
