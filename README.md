# TalentDrobe

Next.js application for TalentDrobe — marketing site, authentication, and job seeker dashboard.

## Documentation

| Audience | Guide |
|----------|--------|
| **Clients & stakeholders** (brand, colors, UI) | [docs/BRAND-GUIDE.md](docs/BRAND-GUIDE.md) |
| **Developers** (routes, APIs, file paths) | [DOCUMENTATION.md](DOCUMENTATION.md) |
| **Doc index** | [docs/README.md](docs/README.md) |

## Tech stack

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **ESLint**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run start`| Start production server  |
| `npm run lint` | Run ESLint               |
| `npm run typecheck` | TypeScript check    |

## Project structure

```
src/
├── app/                    # App Router pages & API
│   ├── (marketing)/        # Public marketing pages
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── auth/               # Sign-in/sign-up shell and fields
│   ├── dashboard/          # Job seeker app UI
│   ├── forms/              # Contact, auth, newsletter forms
│   ├── layout/             # Header, footer, conditional chrome
│   ├── sections/           # Page sections (hero, pricing, etc.)
│   └── ui/                 # Reusable UI primitives
├── config/                 # Site & navigation config
├── constants/              # Static content data
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & formatters
└── types/                  # Shared TypeScript types
```

## Pages

**Marketing:** `/`, `/features`, `/pricing`, `/about`, `/blog`, `/contact`, `/customers`, `/changelog`, `/privacy`, `/terms`, `/solutions/[role]`

**Auth:** `/sign-in`, `/sign-up`, `/verify`, `/forgot-password`, `/select-role`

**Dashboard:** `/dashboard/job-seeker`, `/dashboard/job-seeker/search`, `/dashboard/job-seeker/my-resumes`, `/dashboard/job-seeker/profile`, `/dashboard/job-seeker/settings`

## Environment

Copy `.env.example` to `.env.local` and update values.
