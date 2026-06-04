# TalentBridge — Complete Project Documentation

This document explains **everything** built in the TalentBridge application so far. It is written for developers and technical teammates who need routes, file paths, and APIs.

**For clients and non-technical reviewers:** use the plain-language **[Brand & Design Guide](docs/BRAND-GUIDE.md)** (colors, typography, components, UX). Index: [docs/README.md](docs/README.md).

---

## Table of contents

1. [What is this project?](#1-what-is-this-project)
2. [What is NOT included](#2-what-is-not-included)
3. [How to run the project](#3-how-to-run-the-project)
4. [Technology stack](#4-technology-stack)
5. [Design system](#5-design-system)
6. [Project folder structure](#6-project-folder-structure)
7. [Global layout (every page)](#7-global-layout-every-page)
8. [Complete page inventory](#8-complete-page-inventory)
9. [Home page — section by section](#9-home-page--section-by-section)
10. [Marketing pages — detailed breakdown](#10-marketing-pages--detailed-breakdown)
11. [API routes](#11-api-routes)
12. [SEO and metadata](#12-seo-and-metadata)
13. [Content and data files](#13-content-and-data-files)
14. [Components reference](#14-components-reference)
15. [Motion and animation](#15-motion-and-animation)
16. [Forms and user interactions](#16-forms-and-user-interactions)
17. [Environment variables](#17-environment-variables)
18. [How to change common things](#18-how-to-change-common-things)
19. [Build output summary](#19-build-output-summary)

---

## 1. What is this project?

**TalentBridge** is a **Next.js web application** for an **AI recruiting copilot** — public marketing, account flows, and a **job seeker dashboard** (in progress).

### Product pitch (what the site sells)

TalentBridge helps recruiting teams:

- Parse and rank inbound resumes quickly
- Draft personalized outreach at scale
- Run autonomous sourcing across LinkedIn, GitHub, and portfolios
- Surface pipeline insights and bias-aware shortlists
- Integrate with tools like Greenhouse, Lever, Workday, Notion, and Slack

**Tagline:** *"Hire 10x faster. With ten times the signal."*

### What the application includes today

| Surface | Purpose |
|---------|---------|
| **Marketing site** | Home, features, pricing, blog, contact, legal, solutions — public SEO pages |
| **Authentication** | Sign-in, sign-up, verify email, forgot password, select role |
| **Job seeker dashboard** | Resume upload, AI chat flow, job search, my resumes, profile, settings |
| **API routes** | Contact, health, auth handlers (session/cookie-based; no external DB in repo) |

**Brand and UI standards:** [docs/BRAND-GUIDE.md](docs/BRAND-GUIDE.md)

---

## 2. What is NOT included

| Out of scope | Notes |
|--------------|--------|
| Production CMS | Blog, FAQ, pricing, etc. live in TypeScript files under `src/constants/` |
| Hiring agency dashboard (full) | Route placeholder exists; job seeker dashboard is the main app UI |
| Real ATS integrations | Integration names are display-only on marketing pages |
| Production email | Contact form logs to server console; wire SendGrid/Resend for production |
| Paid GSAP plugins | Text animations use a custom `TextReveal` component instead of SplitText |
| External database | No PostgreSQL/MongoDB in repo; auth APIs are in-memory/session style for dev |
| Social OAuth (live) | Google/Microsoft/LinkedIn buttons are UI-only (“Coming soon”) |

---

## 3. How to run the project

### Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** (comes with Node)

### Setup

```bash
# 1. Go to the project folder
cd TalentBridge2

# 2. Install dependencies
npm install

# 3. Copy environment file (optional for local dev)
copy .env.example .env.local   # Windows
# cp .env.example .env.local   # macOS/Linux

# 4. Start development server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Available scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Starts dev server with Turbopack (hot reload) |
| `npm run build` | Creates optimized production build |
| `npm run start` | Serves the production build (run `build` first) |
| `npm run lint` | Runs ESLint |
| `npm run typecheck` | Runs TypeScript without emitting files |

---

## 4. Technology stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | **Next.js 15** (App Router) | Pages, routing, SSR/SSG, API routes |
| UI library | **React 19** | Components and interactivity |
| Language | **TypeScript** | Type safety |
| Styling | **Tailwind CSS v4** | Utility-first CSS via `@import "tailwindcss"` |
| Smooth scroll | **Lenis** | Butter-smooth page scrolling |
| Scroll animations | **GSAP + ScrollTrigger** | Pinned sections, scroll-linked effects |
| UI animations | **Motion** (`motion/react`) | Fade-up, text reveal, counters, velocity marquees |
| Accessible UI | **Radix UI** | Accordion (FAQ), Tabs (product showcase) |
| Icons | **Lucide React** | Consistent icon set |
| Fonts (Google) | **Outfit**, **Instrument Serif**, **Geist Mono** | Sans, display italic, monospace |

### Path alias

Imports use `@/` which maps to `src/` (configured in `tsconfig.json`).

Example: `import { siteConfig } from "@/config/site"`

---

## 5. Design system

Defined primarily in `src/app/globals.css` using Tailwind v4 `@theme` tokens.

**Client-facing detail (colors, buttons, sections, auth, dashboard):** [docs/BRAND-GUIDE.md](docs/BRAND-GUIDE.md)

### Color tokens

| Token | Example use |
|-------|-------------|
| `ink-50` … `ink-950` | Dark backgrounds, text on light sections |
| `paper-50` … `paper-300` | Light/cream backgrounds |
| `accent-lime` | Primary CTA buttons, highlights |
| `accent-violet` | Secondary accent, gradients |
| `accent-cyan` | Gradients, charts |
| `accent-amber` | CV card variants |

### Typography

| Role | Font | Usage |
|------|------|--------|
| Body / UI | **Outfit** | Headings, paragraphs, buttons, nav |
| Display accent | **Instrument Serif** (italic) | Phrases like *"the signal."*, large stats |
| Code / numbers | **Geist Mono** | Scores, URLs, small labels |

### Utility classes (custom)

| Class | Effect |
|-------|--------|
| `text-gradient-brand` | Lime → cyan → violet gradient text |
| `gradient-mesh` | Soft radial background blobs |
| `bg-grid` / `bg-grid-light` | Subtle blueprint grid (dark/light) |
| `glass` / `glass-light` | Frosted header-style backgrounds |
| `ring-glow-lime` | Lime glow on hover (CTAs) |
| `animate-marquee` | Infinite horizontal scroll (CSS) |

### Layout pattern: containerized heroes

Many heroes are **not full-bleed edge-to-edge**. They sit inside a rounded dark card within `Container size="full"`, on a light `paper-50` page background — similar to modern SaaS sites (Linear/Vercel style).

---

## 6. Project folder structure

```
TalentBridge2/
├── public/                    # Static assets (currently minimal)
├── src/
│   ├── app/                   # Next.js App Router — routes live here
│   │   ├── (marketing)/       # Route group (does not affect URL)
│   │   ├── api/               # Backend API endpoints
│   │   ├── layout.tsx         # Root HTML shell
│   │   ├── page.tsx           # Home page (/)
│   │   ├── globals.css        # Global styles + design tokens
│   │   ├── sitemap.ts         # Auto-generated sitemap.xml
│   │   ├── robots.ts          # robots.txt rules
│   │   ├── opengraph-image.tsx# Social share preview image
│   │   ├── loading.tsx        # Global loading UI
│   │   ├── error.tsx          # Global error UI
│   │   └── not-found.tsx      # 404 page
│   ├── components/
│   │   ├── auth/              # Auth shell, fields, OTP, social row
│   │   ├── dashboard/         # Job seeker shell, search, resumes, settings
│   │   ├── forms/             # Contact, newsletter, sign-in/up, verify, etc.
│   │   ├── layout/            # Header, footer, conditional chrome
│   │   ├── motion/            # Animation primitives
│   │   ├── sections/          # Large page sections
│   │   └── ui/                # Buttons, cards, container, menu, etc.
│   ├── config/                # site, navigation, auth/dashboard routes, menus
│   ├── constants/             # All marketing copy & data
│   ├── hooks/                 # React hooks
│   ├── lib/                   # utils, gsap helper, formatters
│   └── types/                 # TypeScript interfaces
├── .env.example
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── docs/
│   ├── README.md              # Doc index (clients vs developers)
│   └── BRAND-GUIDE.md         # Non-technical brand & UI guide
├── README.md
└── DOCUMENTATION.md           # This file
```

### Route groups explained

`(marketing)` is a **folder name in parentheses**. In Next.js, parentheses mean the folder name **does not appear in the URL**. So `src/app/(marketing)/about/page.tsx` is still served at `/about`, not `/marketing/about`.

---

## 7. Global layout (every page)

**File:** `src/app/layout.tsx`

Every page is wrapped in this structure:

```
<html>
  <body>
    <LenisProvider>                    ← smooth scrolling
      <ConditionalAnnouncementBar />   ← hidden on some auth/dashboard routes
      <ConditionalHeader />          ← hidden on sign-in, sign-up, dashboard
      <main>{children}</main>
      <ConditionalFooter />            ← hidden on minimal auth chrome
    </LenisProvider>
  </body>
</html>
```

**Route-aware chrome:** `src/config/auth-routes.ts` and `src/config/dashboard-routes.ts` drive `conditional-header.tsx`, `conditional-footer.tsx`, and `conditional-announcement-bar.tsx`.

### Announcement bar

- **File:** `src/components/layout/announcement-bar.tsx`
- Dark strip at the very top
- Message: autonomous sourcing is live, link to `/changelog`

### Header

- **File:** `src/components/layout/header.tsx`
- Sticky; becomes slightly frosted/blurred on scroll
- Logo links to `/`
- Desktop nav: Features, Solutions, Customers, Pricing, Changelog, Blog
- CTAs: "Sign in" → `/sign-in`, "Sign up" → `/sign-up`, "Book a demo" → `/contact` (lime)
- Mobile: hamburger menu with same links

### Footer

- **File:** `src/components/layout/footer.tsx`
- Dark section with gradient mesh
- Four link columns: Product, Solutions, Resources, Company
- Newsletter signup form
- Legal links: Privacy, Terms
- Social: Twitter, LinkedIn
- Large watermark text: "TalentBridge"

---

## 8. Complete page inventory

| URL | File path | Type | Purpose |
|-----|-----------|------|---------|
| `/` | `src/app/page.tsx` | Static | Home — full marketing funnel |
| `/features` | `src/app/(marketing)/features/page.tsx` | Static | Deep feature breakdown |
| `/pricing` | `src/app/(marketing)/pricing/page.tsx` | Static | Plans + comparison table |
| `/customers` | `src/app/(marketing)/customers/page.tsx` | Static | Case studies |
| `/solutions/recruiter` | `src/app/(marketing)/solutions/[role]/page.tsx` | SSG | Recruiter-focused pitch |
| `/solutions/hiring-manager` | same | SSG | Hiring manager pitch |
| `/solutions/hr-lead` | same | SSG | HR leader pitch |
| `/about` | `src/app/(marketing)/about/page.tsx` | Static | Mission, team, values, press |
| `/changelog` | `src/app/(marketing)/changelog/page.tsx` | Static | Product release timeline |
| `/blog` | `src/app/(marketing)/blog/page.tsx` | Static | Blog index |
| `/blog/[slug]` | `src/app/(marketing)/blog/[slug]/page.tsx` | SSG | Individual articles (5 posts) |
| `/contact` | `src/app/(marketing)/contact/page.tsx` | Static | Demo request form |
| `/privacy` | `src/app/(marketing)/privacy/page.tsx` | Static | Privacy policy |
| `/terms` | `src/app/(marketing)/terms/page.tsx` | Static | Terms of service |
| `/api/health` | `src/app/api/health/route.ts` | API | Health check JSON |
| `/api/contact` | `src/app/api/contact/route.ts` | API | Form submission handler |
| `/sign-in` | `src/app/(auth)/sign-in/page.tsx` | Static | Sign in (`AuthShell` + `SignInForm`) |
| `/sign-up` | `src/app/(auth)/sign-up/page.tsx` | Static | Create account |
| `/forgot-password` | `src/app/(auth)/forgot-password/page.tsx` | Static | Password reset request |
| `/verify` | `src/app/(auth)/verify/page.tsx` | Static | Email verification code |
| `/select-role` | `src/app/(auth)/select-role/page.tsx` | Static | Post-auth role selection |
| `/dashboard/job-seeker` | `src/app/dashboard/job-seeker/page.tsx` | Client | Main dashboard / resume upload |
| `/dashboard/job-seeker/search` | `src/app/dashboard/job-seeker/search/page.tsx` | Client | Job search |
| `/dashboard/job-seeker/search/[jobId]` | `src/app/dashboard/job-seeker/search/[jobId]/page.tsx` | Client | Job detail |
| `/dashboard/job-seeker/my-resumes` | `src/app/dashboard/job-seeker/my-resumes/page.tsx` | Client | Resume list/editor |
| `/dashboard/job-seeker/profile` | `src/app/dashboard/job-seeker/profile/page.tsx` | Client | Profile |
| `/dashboard/job-seeker/settings` | `src/app/dashboard/job-seeker/settings/page.tsx` | Client | Settings |
| `/sitemap.xml` | `src/app/sitemap.ts` | Generated | SEO sitemap |
| `/robots.txt` | `src/app/robots.ts` | Generated | Crawler rules |
| `/opengraph-image` | `src/app/opengraph-image.tsx` | Dynamic OG | Social preview image |

**Special pages (no marketing content):**

| URL | File | Purpose |
|-----|------|---------|
| 404 | `src/app/not-found.tsx` | Custom "page not found" |
| Error | `src/app/error.tsx` | Runtime error recovery |
| Loading | `src/app/loading.tsx` | Spinner while page loads |

**Total:** ~35+ routes in production build (marketing + auth + dashboard + API).

---

## 9. Home page — section by section

**File:** `src/app/page.tsx`  
**URL:** `/`

Sections appear **top to bottom** in this exact order:

### 9.1 HeroSection

- **File:** `src/components/sections/hero-section.tsx`
- **Layout:** Containerized rounded dark card on light background
- **Content:**
  - Badge: "Multi-agent recruiting · v3.4" + G2 rating chip
  - Headline with animated word reveal: "Hire 10x faster. With ten times *the signal.*"
  - Subtitle describing the AI copilot
  - CTAs: "Book a demo", "Watch 2-min tour"
  - Trust line: 14-day trial, no credit card, etc.
  - Three animated stats: 10x faster sourcing, 3.2x reply rate, 72% less manual work
  - **Product preview mockup:** fake app UI (roles sidebar, agents, candidate shortlist)
  - **Logo strip** inside card footer: Northwind, Quanta, Lumen, etc.

### 9.2 ResumeMarquee

- **File:** `src/components/sections/resume-marquee.tsx`
- **Data:** `src/constants/resume-cards.ts`
- **Behavior:**
  - Two horizontal rows of mini resume/CV cards
  - **Top row** moves right; **bottom row** moves left
  - Speed **increases when user scrolls** (Motion `useVelocity` + spring)
  - Edge fade masks on left/right
- **Cards:** Name, role, score, skills, signal bars; 6 color themes (ink, paper, lime, violet, cyan, amber)
- **Footer pill:** "2,041 resumes parsed today · 18 shortlist · agents live"

### 9.3 BentoFeatures

- **File:** `src/components/sections/bento-features.tsx`
- **Data:** `src/constants/features.ts` (6 features)
- Asymmetric dark bento grid on light background
- Features: Autonomous Sourcing, Signal-First Ranking, Personalized Outreach, Resume Intelligence, Pipeline Insights, Integrations
- Each tile has icon, copy, mini visual (progress bars, chart, outreach preview, etc.)
- Spotlight hover effect on cards

### 9.4 HowItWorksPinned

- **File:** `src/components/sections/how-it-works-pinned.tsx`
- **Animation:** GSAP ScrollTrigger pins section while user scrolls; step highlight updates (01–04)
- **Steps:**
  1. Describe the role
  2. Agents go to work
  3. Review calibrated shortlist
  4. Move to interview, fast
- Right side: live preview panel changes per step

### 9.5 CVGallery

- **File:** `src/components/sections/cv-gallery.tsx`
- **Data:** `src/constants/cv-profiles.ts` (6 full CV profiles)
- **Layout:** 3-column grid (responsive)
- **Interaction:** On hover, CV scrolls down smoothly over **7.5 seconds** to reveal Experience, Education, Skills, Projects
- **Profiles:** Devon Ainsley, Mei Tanaka, Sofia Lindgren, Naomi Rahman, Priya Iyer, Lukas Berger — detailed professional content

### 9.6 ProductShowcase

- **File:** `src/components/sections/product-showcase.tsx`
- **Heading:** "Four surfaces. One *copilot brain.*"
- **Tabs (Radix):** Sourcing, Screening, Outreach, Analytics
- Each tab: title, description, bullet list, dark UI mockup

### 9.7 MetricsCounter

- **File:** `src/components/sections/metrics-counter.tsx`
- **Data:** `src/constants/stats.ts`
- Four large animated counters: 12M+ hours saved, 87% faster shortlists, 70% less busywork, 41% reply rate

### 9.8 TestimonialsMarquee

- **File:** `src/components/sections/testimonials-marquee.tsx`
- **Data:** `src/constants/testimonials.ts` (8 quotes)
- Two rows scrolling in opposite directions (CSS marquee), pause on hover

### 9.9 IntegrationsCloud

- **File:** `src/components/sections/integrations-cloud.tsx`
- **Data:** `src/constants/integrations.ts`
- Dark section with integration name pills (Greenhouse, Lever, Slack, etc.)
- Link: "We'll build it" → contact

### 9.10 PricingSection

- **File:** `src/components/sections/pricing-section.tsx`
- **Data:** `src/constants/pricing.ts`
- Monthly/yearly toggle (yearly saves 20%)
- Three plans: Starter ($49), Growth ($149, popular), Enterprise (custom)
- CTA buttons → `/contact`

### 9.11 FaqSection

- **File:** `src/components/sections/faq-section.tsx`
- **Data:** `src/constants/faq.ts` (6 questions)
- Radix accordion, one open at a time

### 9.12 CtaSection

- **File:** `src/components/sections/cta-section.tsx`
- Final dark rounded banner: "Your next hire is already sourcing themselves."
- CTAs: Book a demo, See pricing

---

## 10. Marketing pages — detailed breakdown

### `/features`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/features/page.tsx` |
| **SEO title** | Features |
| **Hero** | `PageHero` — containerized card |
| **Main** | Sticky left nav (anchor links) + 6 deep feature blocks |
| **Each block** | Icon, title, tagline, long description, 4 bullet cards |
| **Bottom** | IntegrationsCloud, FaqSection, CtaSection |

Feature IDs for anchors: `sourcing`, `ranking`, `outreach`, `screening`, `insights`, `integrations`

---

### `/pricing`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/pricing/page.tsx` |
| **Hero** | PageHero |
| **Plans** | `PricingSection` with `bare` prop (no duplicate heading) |
| **Comparison table** | Categories: Sourcing, Screening & ranking, Outreach, Security, Support |
| **Columns** | Starter / Growth / Enterprise with checkmarks or text values |
| **Bottom** | FaqSection, CtaSection |

---

### `/customers`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/customers/page.tsx` |
| **Data** | `src/constants/customers.ts` |
| **Sections** | PageHero → LogoMarquee → 3 case study cards → CtaSection |
| **Case studies** | Northwind Labs, Lumen Health, Arc Studios — quote, metrics, summary |

---

### `/solutions/[role]`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/solutions/[role]/page.tsx` |
| **Data** | `src/constants/solutions.ts` |
| **Static paths** | `recruiter`, `hiring-manager`, `hr-lead` |
| **Sections** | PageHero → Challenges vs Outcomes grid → 3 capability cards → links to other roles → TestimonialsMarquee → CtaSection |
| **404** | Invalid role slug shows Next.js `notFound()` |

---

### `/about`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/about/page.tsx` |
| **Data** | `src/constants/team.ts` (team + values) |
| **Sections** | PageHero → Mission + stats card → 4 values → 6 team members → Press (Forbes, TechCrunch, Wired) → CtaSection |
| **Anchors** | `#team`, `#press` (footer links to `#careers` on about — careers section is placeholder anchor) |

---

### `/changelog`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/changelog/page.tsx` |
| **Data** | `src/constants/changelog.ts` |
| **UI** | Vertical timeline with pulsing dots, version badges (feature / improvement / fix) |
| **Versions** | v3.4 down to v2.7 |

---

### `/blog`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/blog/page.tsx` |
| **Data** | `src/constants/blog.ts` (5 posts) |
| **Layout** | Featured large card (first post) + 3-column grid for rest |
| **Posts** | See [Blog slugs](#blog-post-slugs) below |

---

### `/blog/[slug]`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/blog/[slug]/page.tsx` |
| **Generation** | `generateStaticParams` from all blog slugs |
| **Layout** | Back link, category badge, animated title, author meta, article body, key takeaway box, 3 related posts, CtaSection |

#### Blog post slugs

| Slug | Title |
|------|-------|
| `ai-recruiting-playbook-2026` | The AI Recruiting Playbook for 2026 |
| `explainable-ranking-bias` | Explainable ranking is the only kind that scales |
| `sourcing-agents-are-here` | Sourcing agents are here. Now what? |
| `bias-audits-quarterly` | Why bias audits should be quarterly, not annual |
| `outreach-that-feels-human` | Outreach that feels human at scale |

---

### `/contact`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/contact/page.tsx` |
| **Layout** | Containerized dark card: left = pitch + contact info, right = white form card |
| **Form** | `ContactForm` → POST `/api/contact` |
| **Fields** | First name, last name, work email, company, team size (select), message (textarea) |
| **Success** | Inline thank-you state (no redirect) |

---

### `/privacy`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/privacy/page.tsx` |
| **Layout** | PageHero + sticky table of contents + 8 legal sections |
| **Topics** | Overview, data collection, usage, sharing, rights, security, retention, contact |

---

### `/terms`

| Item | Detail |
|------|--------|
| **File** | `src/app/(marketing)/terms/page.tsx` |
| **Layout** | Same as privacy |
| **Topics** | Acceptance, service, account, acceptable use, fees, IP, liability, termination, changes |

---

## 11. API routes

### `GET /api/health`

- **File:** `src/app/api/health/route.ts`
- **Response:** JSON health status (for monitoring/uptime checks)

### `POST /api/contact`

- **File:** `src/app/api/contact/route.ts`
- **Body (JSON):** `firstName`, `lastName`, `email`, `company`, `teamSize`, `message`
- **Validation:** Requires `email` and `firstName`
- **Behavior:** Logs payload to server console, returns `{ ok: true }`
- **Errors:** 400 if missing fields, 500 on parse failure

> **Note:** No email service (SendGrid, Resend, etc.) is wired yet. Integrate here for production.

### Auth API (`src/app/api/auth/`)

| Method | Path | File | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/sign-in` | `sign-in/route.ts` | Email/password sign-in; may return `requiresVerification` |
| POST | `/api/auth/sign-up` | `sign-up/route.ts` | Create account |
| POST | `/api/auth/verify` | `verify/route.ts` | Submit email verification code |
| POST | `/api/auth/forgot-password` | `forgot-password/route.ts` | Request password reset |
| POST | `/api/auth/select-role` | `select-role/route.ts` | Persist user role after login |

Forms: `src/components/forms/sign-in-form.tsx`, `sign-up-form.tsx`, `verify-code-form.tsx`, `forgot-password-form.tsx`, `select-role-form.tsx`.

---

## 12. SEO and metadata

### Root metadata

Set in `src/app/layout.tsx`:

- Default title: `TalentBridge — The AI Copilot for Recruiters`
- Title template: `%s · TalentBridge` (per-page titles append brand)
- Description, keywords, Open Graph, Twitter card
- `metadataBase` from `NEXT_PUBLIC_APP_URL`

### Per-page metadata

Most marketing pages export `metadata` with `title` and `description`. Blog and solutions use `generateMetadata` for dynamic titles.

### `sitemap.xml`

- **File:** `src/app/sitemap.ts`
- Includes all static routes, 3 solution URLs, 5 blog URLs
- Home priority: 1.0; others 0.5–0.7

### `robots.txt`

- **File:** `src/app/robots.ts`
- Allows all crawlers on `/`
- Disallows `/api/`
- Points to sitemap URL

### Open Graph image

- **File:** `src/app/opengraph-image.tsx`
- Edge runtime, 1200×630 PNG
- Generated image with headline and brand colors (used when sharing links on social media)

---

## 13. Content and data files

All marketing copy is **editable in code** — no CMS.

| File | Contents |
|------|----------|
| `src/config/site.ts` | Brand name, tagline, description, URL, contact emails, social links |
| `src/config/navigation.ts` | Header nav, footer nav, solutions sub-nav |
| `src/config/auth-routes.ts` | Auth paths, minimal chrome rules |
| `src/config/dashboard-routes.ts` | Job seeker dashboard paths |
| `src/config/job-seeker-menu.ts` | Dashboard sidebar menu items |
| `src/config/user-roles.ts` | Role constants and select-role path |
| `src/constants/features.ts` | 6 product features for bento + features page |
| `src/constants/pricing.ts` | 3 pricing plans |
| `src/constants/faq.ts` | 6 FAQ items |
| `src/constants/testimonials.ts` | 8 customer quotes |
| `src/constants/stats.ts` | Hero stats + metrics section stats |
| `src/constants/customers.ts` | Logo names + 3 case studies |
| `src/constants/integrations.ts` | 18 integration names |
| `src/constants/solutions.ts` | 3 role-based solution pages |
| `src/constants/changelog.ts` | 8 release entries |
| `src/constants/blog.ts` | 5 blog posts (full text in `content` field) |
| `src/constants/team.ts` | 6 team members + 4 company values |
| `src/constants/resume-cards.ts` | 12 mini resume cards for marquee (2 rows of 6) |
| `src/constants/cv-profiles.ts` | 6 full CV profiles for gallery hover scroll |

### Pricing plans summary

| Plan | Monthly | Yearly (per seat) | Highlight |
|------|---------|-------------------|-----------|
| Starter | $49 | $39 | 3 roles, 500 credits |
| Growth | $149 | $119 | Popular; unlimited roles, agents |
| Enterprise | Custom | Custom | SSO, SLA, dedicated CSM |

---

## 14. Components reference

### Layout (`src/components/layout/`)

| Component | Description |
|-----------|-------------|
| `announcement-bar.tsx` | Top promo strip |
| `conditional-announcement-bar.tsx` | Hides bar on auth/dashboard per route |
| `header.tsx` | Sticky nav + mobile menu |
| `conditional-header.tsx` | Hides header on sign-in, sign-up, dashboard |
| `footer.tsx` | Multi-column footer + newsletter |
| `conditional-footer.tsx` | Hides footer on minimal auth routes |

### Sections (`src/components/sections/`)

| Component | Used on |
|-----------|---------|
| `hero-section.tsx` | Home |
| `resume-marquee.tsx` | Home |
| `bento-features.tsx` | Home |
| `how-it-works-pinned.tsx` | Home |
| `cv-gallery.tsx` | Home |
| `product-showcase.tsx` | Home |
| `metrics-counter.tsx` | Home |
| `testimonials-marquee.tsx` | Home, solutions |
| `integrations-cloud.tsx` | Home, features |
| `pricing-section.tsx` | Home, pricing |
| `faq-section.tsx` | Home, features, pricing |
| `cta-section.tsx` | Most pages |
| `page-hero.tsx` | Features, pricing, customers, about, changelog, blog, privacy, terms |
| `logo-marquee.tsx` | Customers (only; home uses hero logo strip instead) |

### UI (`src/components/ui/`)

| Component | Props / notes |
|-----------|----------------|
| `button.tsx` | Variants: primary, secondary, ghost, outline, lime, dark; supports `href` + `asChild` |
| `container.tsx` | Sizes: default, narrow, wide, full |
| `section-heading.tsx` | eyebrow, title, description, centered, light (for dark bg) |
| `badge.tsx` | default, dark, lime, outline |
| `card.tsx` | Card, CardHeader, CardTitle, CardDescription |
| `input.tsx` | Styled text input |
| `logo.tsx` | Brand mark + wordmark |
| `spotlight-card.tsx` | Mouse-following gradient spotlight on hover |
| `staggered-menu.tsx` | Animated sidebar menu (dashboard) |

### Auth (`src/components/auth/`)

| Component | Description |
|-----------|-------------|
| `auth-shell.tsx` | Split marketing + form layout; centered variant; `BackToHomeLink` |
| `auth-field.tsx` | Labeled auth input with error/hint |
| `auth-divider.tsx` | "Or continue with" + `SocialAuthButtons` |
| `otp-input.tsx` | Verification code digit inputs |

### Dashboard (`src/components/dashboard/`)

| Component | Description |
|-----------|-------------|
| `job-seeker-dashboard-shell.tsx` | Sidebar, phases (upload/extract/chat), route layout |
| `dashboard-page-frame.tsx` | Centered page wrapper with fade-in |
| `dashboard-content-panel.tsx` | Main content area |
| `dashboard-resume-dropzone.tsx` | CV upload zone |
| `dashboard-extraction-panel.tsx` | Parsing progress UI |
| `dashboard-chat-panel.tsx` / `dashboard-chat-input.tsx` | AI assistant UI |
| `dashboard-pdf-viewer.tsx` / `dashboard-pdf-canvas-pages.tsx` | Resume preview |
| `dashboard-sidebar-*.tsx` | Search shortcut, role, logout, footer |
| `dashboard-top-actions.tsx` | Sub-page header actions |
| `search/*` | Search bar, filters, result cards, pagination, job sheet |
| `resumes/*` | List items, editor |
| `settings/*` | Sections, toggles, select fields |
| `job-seeker-*-page.tsx` | Composed pages (search, settings, my resumes) |

### Forms (`src/components/forms/`)

| Component | Behavior |
|-----------|----------|
| `contact-form.tsx` | Demo request; POST to API; loading/success/error states |
| `newsletter-form.tsx` | Email capture in footer; client-side "Joined" feedback (no API) |
| `sign-in-form.tsx` | POST `/api/auth/sign-in` → verify or select-role |
| `sign-up-form.tsx` | POST `/api/auth/sign-up` |
| `verify-code-form.tsx` | POST `/api/auth/verify` |
| `forgot-password-form.tsx` | POST `/api/auth/forgot-password` |
| `select-role-form.tsx` | POST `/api/auth/select-role` |

### Motion (`src/components/motion/`)

| Component | Purpose |
|-----------|---------|
| `lenis-provider.tsx` | Global smooth scroll + GSAP ScrollTrigger sync |
| `text-reveal.tsx` | Word/char stagger reveal on scroll |
| `fade-up.tsx` | Fade + translate Y entrance |
| `parallax.tsx` | Scroll-linked vertical parallax |
| `magnetic.tsx` | Cursor-attract hover on CTAs |
| `marquee.tsx` | CSS infinite horizontal scroll (duplicate children) |
| `counter.tsx` | Animated number count-up when in view |
| `pinned-section.tsx` | GSAP pin helper (generic) |

---

## 15. Motion and animation

### Lenis (smooth scroll)

- Wraps entire app in `LenisProvider`
- `requestAnimationFrame` loop calls `lenis.raf()` and `ScrollTrigger.update()`
- `ScrollTrigger.scrollerProxy` connects Lenis to document body

### GSAP

- Registered once in `src/lib/gsap.ts`
- Used in `how-it-works-pinned.tsx` for scroll-pinned step progression

### Motion (Framer Motion)

- Text reveals, fade-ups, product tab transitions, hero entrance, resume marquee velocity

### CSS animations

- Marquee rows (`animate-marquee`, `animate-marquee-reverse`, `animate-marquee-slow`)
- Pulse ring on live agent dots
- CV gallery scroll: `7500ms cubic-bezier` on hover

---

## 16. Forms and user interactions

| Interaction | Location | Result |
|-------------|----------|--------|
| Book a demo | Header, hero, CTAs | Navigates to `/contact` |
| Contact form submit | `/contact` | POST `/api/contact`, success message |
| Newsletter | Footer | Local state only (no backend) |
| Sign in / Sign up | `/sign-in`, `/sign-up` | POST auth APIs; redirect to verify or select-role |
| Select role | `/select-role` | POST `/api/auth/select-role` |
| Job search | Dashboard search | Filters, pagination, job detail sheet |
| Resume upload | Dashboard home | Dropzone → extraction → chat flow |
| Pricing toggle | Home + pricing | Switches monthly/yearly prices |
| FAQ accordion | Home, features, pricing | Expands one question |
| Product tabs | Home showcase | Switches Sourcing/Screening/Outreach/Analytics |
| CV hover | Home gallery | Slow scroll through full resume |
| Resume marquee | Below hero | Speed increases with scroll velocity |
| Mobile menu | Header | Toggle nav drawer |

---

## 17. Environment variables

**File:** `.env.example`

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_APP_URL` | Optional | `https://talentbridge.ai` | Canonical URL for metadata, sitemap, OG |

Copy to `.env.local` for local development:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 18. How to change common things

| I want to change… | Edit this file |
|-------------------|----------------|
| Site name, tagline, emails | `src/config/site.ts` |
| Navigation links | `src/config/navigation.ts` |
| Home section order | `src/app/page.tsx` |
| Pricing amounts | `src/constants/pricing.ts` |
| FAQ questions | `src/constants/faq.ts` |
| Blog posts | `src/constants/blog.ts` |
| Add a solution page | `src/constants/solutions.ts` + auto SSG |
| Hero headline | `src/components/sections/hero-section.tsx` |
| Colors / fonts | `src/app/globals.css` + `src/app/layout.tsx` |
| Footer columns | `src/config/navigation.ts` + `footer.tsx` |
| Contact form fields | `src/components/forms/contact-form.tsx` + `api/contact/route.ts` |
| CV gallery candidates | `src/constants/cv-profiles.ts` |
| Resume marquee cards | `src/constants/resume-cards.ts` |
| Auth marketing copy (checklist, quote) | `src/components/auth/auth-shell.tsx` |
| Dashboard sidebar labels | `src/config/job-seeker-menu.ts` |
| Job seeker settings copy | `src/config/job-seeker-settings.ts` |
| Brand guide for clients | `docs/BRAND-GUIDE.md` |

### Add a new marketing page

1. Create `src/app/(marketing)/your-page/page.tsx`
2. Export `metadata` for SEO
3. Use `PageHero` + sections + optional `CtaSection`
4. Add route to `src/app/sitemap.ts` static routes array
5. Add link in `src/config/navigation.ts` if needed in nav/footer

---

## 19. Build output summary

After `npm run build`, expect approximately:

- **35+ routes** (marketing + auth + dashboard + API + OG image)
- **~102 kB** shared JavaScript (first load)
- Home page ~230 kB first load (due to animations and client sections)

All marketing pages are pre-rendered at build time except:

- `/api/*` (dynamic)
- `/opengraph-image` (edge-generated image)

---

## Quick reference: user journey map

```
Landing (/)
  → Learn features (bento + pinned how-it-work)
  → See resumes (marquee + CV gallery)
  → Product tour (tabs)
  → Social proof (metrics + testimonials)
  → Integrations + Pricing + FAQ
  → CTA → Contact (/contact)

Alternative paths:
  Header → Features / Pricing / Customers / Blog / Changelog
  Header → Sign in / Sign up
  Solutions → Role-specific page → Contact
  Footer → Legal, About, Newsletter

Auth:
  Sign up → Verify (if required) → Select role → Dashboard

Dashboard (job seeker):
  Upload resume → Extraction → Chat
  Sidebar → Search / My resumes / Profile / Settings
```

---

## Document info

| | |
|---|---|
| **Project** | TalentBridge (marketing + auth + job seeker dashboard) |
| **Package name** | `talent-bridge` |
| **Version** | 0.1.0 |
| **Client brand guide** | [docs/BRAND-GUIDE.md](docs/BRAND-GUIDE.md) |
| **Doc index** | [docs/README.md](docs/README.md) |
| **Last documented** | Marketing, auth flows, job seeker dashboard, brand guide split |
| **Maintainer note** | Update this file for technical changes; update BRAND-GUIDE for client-visible UI/brand |

---

*Quick-start: `README.md`. Brand & design (non-technical): [docs/BRAND-GUIDE.md](docs/BRAND-GUIDE.md).*
