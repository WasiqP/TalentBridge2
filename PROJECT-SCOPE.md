# TalentDrobe — Project Scope

**Purpose of this document:** Train AI assistants (e.g. Claude) on what TalentDrobe is, what is in scope, what is not, and how the codebase is organized. Use this as the single source of truth for product intent, technical boundaries, and current build status.

**Related docs:**
- Developers: [DOCUMENTATION.md](./DOCUMENTATION.md)
- Brand & UI: [docs/BRAND-GUIDE.md](./docs/BRAND-GUIDE.md)
- Quick start: [README.md](./README.md)

---

## 1. Executive summary

**TalentDrobe** is a Next.js web application for an **AI-powered job search and recruiting platform**. The product is pivoting from a recruiter-first marketing pitch toward a **job seeker-first experience**: upload a CV, build a profile, get AI suggestions, and discover ranked roles with explainable fit.

| Attribute | Value |
|-----------|-------|
| **Product name** | TalentDrobe |
| **Repo / package name** | `talent-drobe` (folder may be `TalentBridge2`) |
| **Primary audience (current focus)** | Job seekers |
| **Secondary audience** | Recruiters / hiring agencies |
| **Stage** | Active development — marketing site + job seeker dashboard in progress |
| **Production URL (configured)** | `https://talentdrobe.ai` |

**Current tagline (job seeker):** *"Find roles that actually fit."*

**Legacy recruiter tagline (still on some marketing pages):** *"Hire 10x faster. With ten times the signal."*

---

## 2. Product vision

### Job seeker experience (primary)

TalentDrobe helps candidates:

1. **Upload a CV** (PDF, DOC, DOCX) and parse it into a structured profile via the HR backend API.
2. **Receive AI suggestions** to improve their resume and profile.
3. **Chat with a copilot** about roles, salary, and career moves (mock replies today; real AI integration planned).
4. **Search and browse jobs** with filters, fit scores, and detail views (mock data today).
5. **Manage resumes and settings** in a signed-in dashboard.

### Recruiter / hiring agency experience (secondary)

TalentDrobe also targets recruiting teams with:

- Role and pipeline management UI (partially built).
- Agency dashboard shell with role list, new-role flow, and copilot panels.
- Marketing content about sourcing, ranking, outreach, and integrations.

This surface exists in code but is **not the current product priority**.

---

## 3. What is built today

### 3.1 Surfaces

| Surface | Status | Notes |
|---------|--------|-------|
| **Job seeker home (`/`)** | ✅ Live | Uses `JobSeekerHomePage` — guest hero, bento, product showcase, pricing, FAQ, CTA |
| **Marketing pages** | ✅ Live | Features, pricing, customers, solutions, about, blog, changelog, contact, legal |
| **Guest preview pages (`/guest-1` … `/guest-5`)** | 🟡 Partial | Design options for client review; no site chrome; only `/guest-1` has real UI |
| **Authentication** | ✅ UI + dev APIs | Sign in, sign up, verify, forgot password, select role |
| **Job seeker dashboard** | 🟡 In progress | Resume upload, extraction flow, profile reveal, search, resumes, settings |
| **Hiring agency dashboard** | 🟡 Partial | Home, new role, role detail pages exist; not fully wired |
| **HR backend integration** | ✅ Partial | CV upload + suggestions via Railway API proxy |
| **Contact form API** | ✅ Dev only | Logs to console; no email service |

### 3.2 Guest preview pages (design exploration)

Five bare-canvas landing options for stakeholder review. Configured in `src/config/guest-preview-routes.ts`.

| Route | Component | Status |
|-------|-----------|--------|
| `/guest-1` | `Guest1Page` | Conversation-first hero + chat input + bento section |
| `/guest-2` | `Guest2Page` | Placeholder |
| `/guest-3` | `Guest3Page` | Placeholder |
| `/guest-4` | `Guest4Page` | Placeholder |
| `/guest-5` | `Guest5Page` | Placeholder |

Guest preview routes:
- Have **no** header, footer, or announcement bar (conditional chrome hides them).
- Have **no** marketing splash / nav transition overlay.

### 3.3 Job seeker dashboard flow

**Base path:** `/dashboard/job-seeker`

| Route | Purpose |
|-------|---------|
| `/dashboard/job-seeker` | Main split view: resume upload (left) + chat (right) |
| `/dashboard/job-seeker/search` | Job search with filters |
| `/dashboard/job-seeker/search/[jobId]` | Job detail |
| `/dashboard/job-seeker/my-resumes` | Resume list / editor |
| `/dashboard/job-seeker/profile` | Profile view |
| `/dashboard/job-seeker/settings` | Account settings |

**Upload → extract → profile flow:**

1. User drops CV on `DashboardResumeDropzone`.
2. File is sent to `POST /api/hr/upload_cv` (proxies to Railway HR API).
3. Animated extraction steps run in `DashboardExtractionPanel`.
4. Parsed profile is mapped to UI shape and stored in `sessionStorage`.
5. Suggestions fetched via `POST /api/hr/suggestions`.
6. `ProfileReveal` and `DashboardProfileBuildCanvas` show the result.

**Chat:** `DashboardChatInput`, `DashboardChatPanel`, `DashboardFloatingChat` — uses mock replies (`getMockReply`) for now.

### 3.4 Hiring agency dashboard

**Base path:** `/dashboard/hiring-agency`

| Route | Purpose |
|-------|---------|
| `/dashboard/hiring-agency` | Recruiter home — role list |
| `/dashboard/hiring-agency/new` | Create new role |
| `/dashboard/hiring-agency/roles/[roleId]` | Role detail / copilot |

### 3.5 Authentication & roles

| Route | Purpose |
|-------|---------|
| `/sign-in` | Email/password sign-in |
| `/sign-up` | Account creation |
| `/verify` | Email verification code |
| `/forgot-password` | Password reset request |
| `/select-role` | Choose job seeker vs recruiter |

**Roles:** `job-seeker` | `recruiter` (stored in `sessionStorage` under `tb_user_role`).

Auth APIs live under `src/app/api/auth/*` — session/cookie style for development; **no external database in repo**.

### 3.6 Marketing site

Full public site at standard SaaS paths. Home (`/`) is now the **job seeker landing**, not the old recruiter hero.

Legacy `/guest-page` redirects to `/`.

Marketing pages use `MarketingChrome`: splash screen on load + lime wipe between navigations.

**Marketing routes include:** `/features`, `/pricing`, `/customers`, `/solutions/[role]`, `/about`, `/changelog`, `/blog`, `/blog/[slug]`, `/contact`, `/privacy`, `/terms`.

---

## 4. What is NOT in scope (yet)

| Item | Notes |
|------|-------|
| **Production CMS** | All copy lives in `src/constants/` and `src/config/` TypeScript files |
| **External database** | No PostgreSQL, MongoDB, etc. Auth is in-memory/session for dev |
| **Real job search API** | `src/config/job-seeker-search.ts` uses placeholder results |
| **Live AI chat** | Dashboard chat returns mock replies |
| **Production email** | Contact form logs to server console only |
| **Social OAuth** | Google / Microsoft / LinkedIn buttons are UI-only ("Coming soon") |
| **Real ATS integrations** | Greenhouse, Lever, etc. are display names on marketing pages |
| **Paid GSAP plugins** | Custom `TextReveal` used instead of SplitText |
| **Guest pages 2–5** | Design placeholders only |
| **Full hiring agency product** | Shell exists; not production-ready |

Do **not** assume these exist or wire them without explicit instruction.

---

## 5. Technology stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in `globals.css`) |
| Smooth scroll | Lenis |
| Scroll animations | GSAP + ScrollTrigger |
| UI motion | Motion (`motion/react`) |
| Accessible primitives | Radix UI (Accordion, Dialog, Tabs, Tooltip) |
| Icons | Lucide React |
| Fonts | Outfit (UI), Instrument Serif (display italic), Geist Mono (code/numbers) |
| Document parsing | mammoth, pdfjs-dist, word-extractor (resume handling) |

**Path alias:** `@/` → `src/`

**Scripts:**

```bash
npm run dev        # Dev server (Turbopack)
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

---

## 6. External integrations

### HR backend API (Railway)

| Item | Value |
|------|-------|
| **Base URL** | `https://hr-ai-management-system-production.up.railway.app` |
| **Swagger** | https://hr-ai-management-system-production.up.railway.app/docs |
| **Env vars** | `HR_API_BASE_URL`, `NEXT_PUBLIC_HR_API_BASE_URL` |

**Proxied endpoints (same-origin, no CORS):**

| Client URL | Backend path | Purpose |
|------------|--------------|---------|
| `POST /api/hr/upload_cv` | `/upload_cv` | Parse CV → structured candidate profile |
| `POST /api/hr/suggestions` | `/suggestions` | CV improvement suggestions |

**Session keys:**
- `talentdrobe:hr-parsed-profile`
- `talentdrobe:hr-cv-suggestions`

Config: `src/config/hr-backend-api-routes.ts`  
Client: `src/lib/api/hr-backend-api.ts`  
Types: `src/types/hr-backend.ts`

### Environment variables

See `.env.example`:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
HR_API_BASE_URL=https://hr-ai-management-system-production.up.railway.app
NEXT_PUBLIC_HR_API_BASE_URL=https://hr-ai-management-system-production.up.railway.app
```

---

## 7. Design system (summary)

Defined in `src/app/globals.css` via Tailwind v4 `@theme` tokens.

| Token family | Use |
|--------------|-----|
| `ink-50` … `ink-950` | Dark text, dark panels |
| `paper-50` … `paper-300` | Warm off-white backgrounds |
| `accent-lime` | Primary CTAs |
| `accent-violet`, `accent-cyan` | Gradients, accents |
| `accent-amber` | CV card variants |

**Visual style:** Warm off-white pages, deep near-black rounded panels, lime primary buttons, violet/cyan gradients, generous border radius, Instrument Serif italic for emphasis.

**Layout pattern:** Many heroes sit inside a rounded dark card within `Container size="full"` on a light `paper-50` background (Linear/Vercel-style).

Full brand rules: [docs/BRAND-GUIDE.md](./docs/BRAND-GUIDE.md)

---

## 8. Project structure

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public pages (route group — not in URL)
│   ├── (auth)/                   # Sign-in, sign-up, verify, etc.
│   ├── dashboard/
│   │   ├── job-seeker/           # Job seeker app
│   │   └── hiring-agency/        # Recruiter app
│   ├── api/
│   │   ├── auth/                 # Dev auth handlers
│   │   ├── hr/                   # HR backend proxies
│   │   ├── contact/
│   │   └── health/
│   ├── layout.tsx                # Root layout + Lenis
│   ├── page.tsx                  # Home (job seeker landing)
│   └── globals.css               # Design tokens
├── components/
│   ├── auth/                     # Auth shell, fields
│   ├── dashboard/                # Dashboard UI (largest area)
│   ├── guest/                    # Job seeker marketing sections
│   ├── guest-pages/              # /guest-1 … /guest-5 previews
│   ├── home/                     # JobSeekerHomePage
│   ├── layout/                   # Header, footer, conditional chrome
│   ├── marketing/                # Splash, nav transitions
│   ├── sections/                 # Reusable marketing sections
│   └── ui/                       # Button, Container, Logo, etc.
├── config/                       # Routes, site config, navigation, APIs
├── constants/                    # Static marketing copy & data
├── hooks/                        # Custom React hooks
├── lib/                          # Utils, API clients, formatters
└── types/                        # Shared TypeScript types
```

---

## 9. Key configuration files

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Brand name, tagline, URL, contact, social links |
| `src/config/navigation.ts` | Header and footer nav |
| `src/config/auth-routes.ts` | Auth paths; minimal chrome rules |
| `src/config/dashboard-routes.ts` | Dashboard paths and layout helpers |
| `src/config/marketing-routes.ts` | Marketing vs dashboard vs auth detection |
| `src/config/guest-preview-routes.ts` | Guest page routes (no chrome) |
| `src/config/hr-backend-api-routes.ts` | HR API URLs and session keys |
| `src/config/job-seeker-search.ts` | Mock job search data |
| `src/config/job-seeker-profile.ts` | Job seeker profile shape |
| `src/config/user-roles.ts` | Role options and storage |

---

## 10. Route-aware layout chrome

`src/app/layout.tsx` wraps every page with:

```
LenisProvider
  ConditionalAnnouncementBar   ← hidden on auth, dashboard, guest previews
  ConditionalHeader            ← hidden on sign-in, sign-up, dashboard, guest previews
  <main>{children}</main>
  ConditionalFooter            ← hidden on minimal auth + guest previews
```

**MarketingChrome** (splash + lime nav transition) applies only to marketing routes, excluding guest previews.

---

## 11. API routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Contact form (logs to console) |
| POST | `/api/auth/sign-in` | Sign in |
| POST | `/api/auth/sign-up` | Sign up |
| POST | `/api/auth/verify` | Email verification |
| POST | `/api/auth/forgot-password` | Password reset |
| POST | `/api/auth/select-role` | Persist user role |
| POST | `/api/hr/upload_cv` | Proxy CV upload to Railway |
| POST | `/api/hr/suggestions` | Proxy suggestions to Railway |

---

## 12. Content & data

No CMS. All marketing copy is editable in TypeScript:

| File | Contents |
|------|----------|
| `src/constants/features.ts` | Product features |
| `src/constants/pricing.ts` | Pricing plans |
| `src/constants/faq.ts` | FAQ items |
| `src/constants/testimonials.ts` | Customer quotes |
| `src/constants/blog.ts` | Blog posts |
| `src/constants/changelog.ts` | Release notes |
| `src/constants/solutions.ts` | Role-based solution pages |
| `src/constants/guest-hero.ts` | Guest/marketing hero copy |

---

## 13. Current priorities & open work

Based on codebase state and recent changes:

### High priority

1. **Guest landing design** — flesh out `/guest-2` through `/guest-5`; `/guest-1` is the reference (conversation-first + bento).
2. **Job seeker dashboard** — complete profile build canvas, wire real chat AI, persist profile beyond sessionStorage.
3. **Job search** — replace mock data in `job-seeker-search.ts` with real API.
4. **Home page alignment** — ensure all marketing copy reflects job seeker positioning (some recruiter copy may remain on `/features`, `/solutions`, etc.).

### Medium priority

5. **Auth productionization** — database, real email verification, OAuth.
6. **Contact form** — integrate SendGrid / Resend.
7. **Hiring agency dashboard** — complete role creation and candidate pipeline flows.
8. **Resume editor** — PDF export, multiple resume versions.

### Low priority / deferred

9. CMS or headless content for blog/FAQ.
10. ATS integrations (marketing display only today).
11. Recruiter-focused home page (archived at `src/app/_archive/recruiter-home`).

---

## 14. Coding conventions for AI assistants

When working in this repo:

1. **Minimize scope** — small, focused diffs; do not refactor unrelated code.
2. **Match existing patterns** — read surrounding files before adding components; reuse `Button`, `Container`, dashboard shells, guest sections.
3. **Use `@/` imports** — never relative paths that cross major boundaries unnecessarily.
4. **Respect route groups** — `(marketing)` and `(auth)` do not appear in URLs.
5. **Conditional chrome** — new public preview routes should be added to `guest-preview-routes.ts` if they need bare canvas.
6. **HR API calls** — always go through `/api/hr/*` proxies from the browser, never direct Railway calls (CORS).
7. **Styling** — Tailwind utility classes + design tokens from `globals.css`; no inline hex unless matching an existing pattern.
8. **Motion** — prefer `motion/react` for UI; GSAP for scroll-pinned sections; respect `prefers-reduced-motion` where implemented.
9. **Content changes** — edit `src/constants/` or `src/config/site.ts`, not hardcoded strings in components.
10. **Do not commit** `.next/` build output.

---

## 15. User roles & personas

| Persona | Role ID | Dashboard | Primary goals |
|---------|---------|-----------|---------------|
| Job seeker | `job-seeker` | `/dashboard/job-seeker` | Upload CV, get matches, apply |
| Recruiter | `recruiter` | `/dashboard/hiring-agency` | Post roles, source candidates, manage pipeline |

---

## 16. Success criteria (definition of done)

A feature is considered complete when:

- [ ] Works on desktop and mobile breakpoints used elsewhere in the app
- [ ] Uses design tokens (no one-off colors outside the system)
- [ ] TypeScript passes (`npm run typecheck`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Route is registered and appears in correct chrome context (marketing vs dashboard vs guest)
- [ ] Loading, empty, and error states are handled for async flows
- [ ] API errors surface user-friendly messages (see `readApiErrorMessage` pattern)

---

## 17. Glossary

| Term | Meaning |
|------|---------|
| **Chrome** | Shared UI: announcement bar, header, footer |
| **Guest preview** | `/guest-1` … `/guest-5` design options without site chrome |
| **HR backend** | Railway-hosted API for CV parsing and suggestions |
| **Signal** | Product concept — quality/fit of a match vs noise |
| **Standalone page** | Dashboard sub-route that uses full-page layout (search, profile, settings) |
| **Split layout** | Dashboard home: content left, chat right |

---

## 18. Document maintenance

Update this file when:

- Product positioning changes (job seeker vs recruiter focus)
- New major surfaces or routes are added
- External APIs are integrated or replaced
- Items move from "not in scope" to "in scope"

**Last reviewed:** June 2026  
**Codebase:** TalentBridge2 / `talent-drobe` v0.1.0
