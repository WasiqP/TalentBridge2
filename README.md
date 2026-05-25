# TalentBridge

Next.js foundation for an AI SaaS marketing platform, inspired by modern landing-page patterns.

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
│   ├── forms/              # Contact, newsletter forms
│   ├── layout/             # Header, footer
│   ├── sections/           # Page sections (hero, pricing, etc.)
│   └── ui/                 # Reusable UI primitives
├── config/                 # Site & navigation config
├── constants/              # Static content data
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & formatters
└── types/                  # Shared TypeScript types
```

## Pages

- `/` — Home
- `/about` — About
- `/features` — Features
- `/pricing` — Pricing
- `/blog` — Blog listing
- `/blog/[slug]` — Blog post
- `/contact` — Contact form
- `/privacy` — Privacy policy
- `/terms` — Terms of service

## Environment

Copy `.env.example` to `.env.local` and update values.
