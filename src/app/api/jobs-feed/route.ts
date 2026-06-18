import { NextResponse } from "next/server";
import Parser from "rss-parser";

import type { JobPost } from "@/types/jobs";

const RSS_SOURCES = [
  {
    url: "https://remotive.com/remote-jobs/feed",
    source: "remotive",
    category: "Engineering",
  },
  {
    url: "https://weworkremotely.com/categories/remote-full-stack-programming-jobs.rss",
    source: "weworkremotely-fullstack",
    category: "Engineering",
  },
  {
    url: "https://weworkremotely.com/categories/remote-design-jobs.rss",
    source: "weworkremotely-design",
    category: "Design",
  },
] as const;

const TECH_KEYWORDS = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Node",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "Python",
  "Go",
  "Golang",
  "Rust",
  "Swift",
  "Kotlin",
  "Java",
  "Ruby",
  "Rails",
  "PHP",
  "Laravel",
  "Django",
  "Flask",
  "FastAPI",
  "AWS",
  "GCP",
  "Azure",
  "Docker",
  "Kubernetes",
  "Terraform",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Figma",
  "Sketch",
  "Tailwind",
  "CSS",
  "HTML",
  "iOS",
  "Android",
  "Flutter",
  "React Native",
  "SQL",
  "C++",
  "C#",
  ".NET",
  "Elixir",
  "Scala",
  "Product",
  "Marketing",
  "Finance",
  "Sales",
  "DevOps",
  "QA",
  "Data",
  "Machine Learning",
  "AI",
] as const;

const parser = new Parser({
  customFields: {
    item: [["location", "location"]],
  },
});

type RssItem = {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  isoDate?: string;
  location?: string;
  contentSnippet?: string;
  content?: string;
  categories?: string[];
};

function extractCompanyAndTitle(rawTitle: string): { company: string; title: string } {
  const colonIndex = rawTitle.indexOf(":");
  if (colonIndex === -1) {
    return { company: "Unknown", title: rawTitle.trim() };
  }
  return {
    company: rawTitle.slice(0, colonIndex).trim() || "Unknown",
    title: rawTitle.slice(colonIndex + 1).trim() || rawTitle.trim(),
  };
}

function extractTags(text: string): string[] {
  const lower = text.toLowerCase();
  const found = new Set<string>();

  for (const keyword of TECH_KEYWORDS) {
    if (lower.includes(keyword.toLowerCase())) {
      found.add(keyword);
    }
  }

  return Array.from(found).slice(0, 6);
}

function mapItem(
  item: RssItem,
  source: string,
  category: string,
): JobPost | null {
  if (!item.title || !item.link) return null;

  const { company, title } = extractCompanyAndTitle(item.title);
  const body = [item.title, item.contentSnippet, item.content].filter(Boolean).join(" ");
  const location =
    (typeof item.location === "string" && item.location.trim()) || "Remote";

  return {
    id: `${source}-${item.guid ?? item.link}`,
    title,
    company,
    location,
    category,
    postedAt: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
    applyUrl: item.link,
    tags: extractTags(body),
    source,
  };
}

async function fetchFeedJobs(
  url: string,
  source: string,
  category: string,
): Promise<JobPost[]> {
  const response = await fetch(url, { next: { revalidate: 900 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${source}: ${response.status}`);
  }

  const xml = await response.text();
  const feed = await parser.parseString(xml);

  return (feed.items ?? [])
    .map((item) => mapItem(item as RssItem, source, category))
    .filter((job): job is JobPost => job !== null);
}

export async function GET() {
  const results = await Promise.allSettled(
    RSS_SOURCES.map(({ url, source, category }) =>
      fetchFeedJobs(url, source, category),
    ),
  );

  const jobs: JobPost[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      jobs.push(...result.value);
    } else {
      console.error("[jobs-feed] source error:", result.reason);
    }
  }

  jobs.sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
  );

  return NextResponse.json({ jobs, total: jobs.length });
}
