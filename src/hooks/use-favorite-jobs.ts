"use client";

import { useCallback, useEffect, useState } from "react";

const FAVORITE_JOBS_STORAGE_KEY = "tb_favorite_job_ids";

function readFavoriteIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITE_JOBS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function writeFavoriteIds(ids: string[]) {
  localStorage.setItem(FAVORITE_JOBS_STORAGE_KEY, JSON.stringify(ids));
}

export function useFavoriteJobs() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavoriteIds(readFavoriteIds());
  }, []);

  const isFavorite = useCallback(
    (jobId: string) => favoriteIds.includes(jobId),
    [favoriteIds],
  );

  const toggleFavorite = useCallback((jobId: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId];
      writeFavoriteIds(next);
      return next;
    });
  }, []);

  return { mounted, favoriteIds, isFavorite, toggleFavorite };
}
