import { NextResponse } from "next/server";
import Parser from "rss-parser";

import type { HrSignal } from "@/constants/guest-3";

/**
 * Live HR-niche news aggregator for the guest-3 "HR universe" scene.
 * Pulls a handful of HR / talent / future-of-work feeds and normalizes them
 * into `HrSignal` items. Mirrors the resilient pattern in `/api/jobs-feed`.
 */
const RSS_SOURCES = [
  { url: "https://www.hrdive.com/feeds/news/", source: "HR Dive", category: "HR" },
  { url: "https://hrexecutive.com/feed/", source: "HR Executive", category: "Leadership" },
  { url: "https://www.tlnt.com/feed/", source: "TLNT", category: "Talent" },
  { url: "https://resources.workable.com/feed", source: "Workable", category: "Hiring" },
] as const;

const parser = new Parser();

type RssItem = {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  isoDate?: string;
  contentSnippet?: string;
  content?: string;
};

function clean(text: string, max = 160): string {
  const stripped = text
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length > max ? `${stripped.slice(0, max).trim()}…` : stripped;
}

function mapItem(item: RssItem, source: string, category: string): HrSignal | null {
  if (!item.title || !item.link) return null;

  const snippetRaw = item.contentSnippet ?? item.content ?? "";

  return {
    id: `${source}-${item.guid ?? item.link}`,
    title: clean(item.title, 120),
    source,
    link: item.link,
    isoDate: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
    snippet: clean(snippetRaw),
    category,
  };
}

async function fetchSignals(
  url: string,
  source: string,
  category: string,
): Promise<HrSignal[]> {
  const response = await fetch(url, { next: { revalidate: 1800 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${source}: ${response.status}`);
  }

  const xml = await response.text();
  const feed = await parser.parseString(xml);

  return (feed.items ?? [])
    .slice(0, 8)
    .map((item) => mapItem(item as RssItem, source, category))
    .filter((signal): signal is HrSignal => signal !== null);
}

export async function GET() {
  const results = await Promise.allSettled(
    RSS_SOURCES.map(({ url, source, category }) =>
      fetchSignals(url, source, category),
    ),
  );

  const signals: HrSignal[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      signals.push(...result.value);
    } else {
      console.error("[hr-news] source error:", result.reason);
    }
  }

  signals.sort(
    (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
  );

  return NextResponse.json({ signals: signals.slice(0, 24), total: signals.length });
}
