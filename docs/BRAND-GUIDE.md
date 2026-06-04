# TalentBridge — Brand & Design Guide

**Who this is for:** Clients, stakeholders, marketers, and anyone reviewing TalentBridge without reading code.

**What this covers:** How the product looks and feels today — colors, fonts, buttons, page sections, sign-in screens, and the job seeker dashboard — plus where written content lives if you need updates.

**For developers:** See [DOCUMENTATION.md](../DOCUMENTATION.md) for technical setup, file paths, and APIs.

---

## Table of contents

1. [Words we use](#1-words-we-use)
2. [Introduction](#2-introduction)
3. [Brand identity](#3-brand-identity)
4. [Color palette](#4-color-palette)
5. [Typography](#5-typography)
6. [Visual style rules](#6-visual-style-rules)
7. [Buttons](#7-buttons)
8. [Labels and tags](#8-labels-and-tags)
9. [Headings on pages](#9-headings-on-pages)
10. [Forms and inputs](#10-forms-and-inputs)
11. [Cards and page width](#11-cards-and-page-width)
12. [Global chrome (header, footer, banner)](#12-global-chrome-header-footer-banner)
13. [Marketing website sections](#13-marketing-website-sections)
14. [Sign-in and sign-up experience](#14-sign-in-and-sign-up-experience)
15. [Job seeker dashboard](#15-job-seeker-dashboard)
16. [Motion and feel](#16-motion-and-feel)
17. [Do’s and don’ts](#17-dos-and-donts)
18. [Changing copy (for clients)](#18-changing-copy-for-clients)
19. [Component catalog](#19-component-catalog)
20. [Appendix: quick reference](#20-appendix-quick-reference)

---

## 1. Words we use

| Term | Plain meaning |
|------|----------------|
| **Component** | A reusable piece of the interface (e.g. a button style used everywhere). |
| **CTA** | Call to action — the main button you want someone to click (e.g. “Book a demo”). |
| **Hero** | The large top section of a page with headline and primary buttons. |
| **Panel** | A boxed area with its own background (often dark on light pages). |
| **Marquee** | Content that scrolls horizontally in a loop (e.g. resume cards). |
| **Dashboard** | The signed-in area for job seekers after login. |
| **Chrome** | Shared parts on many pages: top banner, navigation bar, footer. |

---

## 2. Introduction

**TalentBridge** is presented as an **AI recruiting copilot** — software that helps recruiting teams source, screen, and engage candidates faster.

The experience today has three main areas:

| Area | What visitors see |
|------|-------------------|
| **Marketing website** | Public pages: home, features, pricing, blog, contact, and more. |
| **Account screens** | Sign in, sign up, verify email, forgot password, choose role. |
| **Job seeker dashboard** | Tools for candidates: resume upload, job search, profile, settings. |

**Overall look:** Warm off-white backgrounds, deep near-black panels, bright **lime green** for primary actions, and soft **violet / cyan** accents in gradients. Corners are generously rounded; typography is clean and modern with occasional **italic serif** emphasis on key phrases.

**Tagline used across the site:** *“Hire 10x faster. With ten times the signal.”*

---

## 3. Brand identity

### Name and positioning

| Item | Value |
|------|--------|
| Product name | **TalentBridge** |
| Short descriptor | The AI Copilot for Recruiters |
| Long description | AI recruiting copilot that sources, screens, and engages candidates 10x faster |

### Logo

The logo has two parts:

1. **Icon** — A small rounded square with a lime → cyan → violet gradient and a simple “bridge” mark inside.
2. **Wordmark** — The text “TalentBridge” beside the icon.

**When to use which version:**

| Version | Use on |
|---------|--------|
| **Dark text logo** (default) | Light backgrounds — marketing pages, sign-up form side, dashboard on light areas. |
| **Light text logo** | Dark backgrounds — auth marketing panel, dark hero cards, footer. |

The logo always links to the home page unless you are already in a focused flow (e.g. dashboard menu).

### Voice and tone

- **Confident and clear** — Short sentences, concrete benefits (speed, signal, trial).
- **Professional but modern** — Not corporate-stiff; feels like a premium SaaS product.
- **Proof-oriented** — Stats, testimonials, certifications (e.g. SOC 2 mention on auth panel).

### Social and contact (brand constants)

| Channel | Typical use |
|---------|-------------|
| hello@talentbridge.ai | General contact |
| sales@talentbridge.ai | Sales / demo |
| Twitter / LinkedIn / GitHub | Linked from footer and metadata |

---

## 4. Color palette

Colors are chosen to feel **warm, high-contrast, and energetic**. Below are the exact hex codes used in the product.

### Main brand colors

| Friendly name | Hex | Where you see it |
|---------------|-----|------------------|
| **Lime** (primary action) | `#c1f968` | Sign in, Create account, “Book a demo,” main CTAs |
| **Lime (pressed / hover)** | `#9adc36` | Hover state on lime buttons |
| **Warm paper** (page background) | `#fbfaf6` | Most light pages and form backgrounds |
| **Paper tint** | `#f5f3ec` | Secondary buttons, subtle panels |
| **Ink black** (deepest dark) | `#08080c` | Dark hero cards, auth left panel, deep UI |
| **Ink near-black** | `#0e0e14` | Body text on light backgrounds |
| **Violet accent** | `#8b5cf6` | Gradients, decorative glows |
| **Cyan accent** | `#5eead4` | Gradients, charts, resume card themes |
| **Amber accent** | `#f5b942` | Resume / CV card color variants |

### Brand gradient (text and decoration)

Important phrases sometimes use a **lime → cyan → violet** gradient on the text itself (e.g. *“the signal.”* in headlines). Gradient stops: `#c1f968` → `#5eead4` → `#8b5cf6`.

### Ink scale (grays and darks)

Used for text, borders, and dark UI. Lighter numbers = lighter gray.

| Step | Hex | Typical use |
|------|-----|-------------|
| Ink 50 | `#f5f5f7` | Very light text on dark panels |
| Ink 200 | `#c4c4cd` | Muted borders |
| Ink 400 | `#6b6b78` | Placeholder text |
| Ink 500 | `#4d4d58` | Secondary labels, form labels |
| Ink 700 | `#1f1f27` | Strong secondary text |
| Ink 900 | `#0e0e14` | Primary body text |
| Ink 950 | `#08080c` | Dark backgrounds |

### Paper scale (warm lights)

| Step | Hex | Typical use |
|------|-----|-------------|
| Paper 50 | `#fbfaf6` | Main page background |
| Paper 100 | `#f5f3ec` | Secondary surfaces |
| Paper 200 | `#ebe8dd` | Dividers, hover on secondary buttons |
| Paper 300 | `#d8d4c4` | Stronger borders on cream areas |

### Selection highlight

When users select text on the site, the highlight is **lime background** with **dark text** — consistent with the brand action color.

---

## 5. Typography

Three font families work together. You do not need to install them; they load automatically on the website.

| Role | Font name | What it’s used for |
|------|-----------|-------------------|
| **Primary UI** | **Outfit** | Headlines, paragraphs, buttons, navigation, forms — almost everything. |
| **Display accent** | **Instrument Serif** (italic) | Emphasis in headlines, e.g. *“the signal.”* — elegant contrast to Outfit. |
| **Numbers & code** | **Geist Mono** | Scores, stats, technical labels, monospace snippets. |

### Size and style habits

- **Headlines** — Large, medium weight, tight letter-spacing (slightly “pulled together”).
- **Eyebrow labels** — Small ALL CAPS pills above section titles (e.g. “AI RECRUITING COPILOT”).
- **Form labels** — Small uppercase labels above fields on auth screens.
- **Body** — Comfortable line height; gray (`Ink 500`) for secondary explanations.

---

## 6. Visual style rules

### Page layout pattern

Many marketing sections use a **light page** (`Warm paper`) with a **dark rounded card** inside — not edge-to-edge full width. This matches modern SaaS sites (clean frame, focused content).

### Corner rounding

| Size | Approximate use |
|------|-----------------|
| Small (8px) | Tiny elements |
| Medium–large (12–24px) | Inputs, cards |
| Extra large (32px+) | Hero panels, auth card |
| Full pill | Buttons, badges, nav pills |

### Background effects

| Effect | What it looks like | Where |
|--------|-------------------|--------|
| **Grid** | Subtle blueprint lines | Dark panels (auth left, heroes) |
| **Gradient mesh** | Soft colored blobs (lime, violet, cyan) | Dark sections, footer |
| **Glass** | Frosted semi-transparent bar | Sticky header when scrolling |
| **Noise** | Fine grain texture | Occasionally on rich backgrounds |
| **Lime glow** | Soft green halo on hover | Primary lime buttons |

### Icons

Icons are simple line icons (consistent stroke weight) from the **Lucide** set — arrows, checks, menu, etc.

---

## 7. Buttons

Buttons are **pill-shaped** (fully rounded ends). Six styles are used depending on context.

| Style | Appearance | Use when |
|-------|------------|----------|
| **Lime** | Bright green background, dark text; glow on hover | **Main action** — Sign in, Create account, Book a demo |
| **Primary** | Near-black background, light text | Strong action on light backgrounds when lime isn’t used |
| **Secondary** | Cream/gray fill, light border | Less prominent actions |
| **Outline** | Transparent with border | Sign up in header, secondary choices |
| **Ghost** | Text only, light hover wash | Sign in in header, low emphasis |
| **Dark** | Translucent on dark heroes | Buttons sitting on dark panels |

### Sizes

| Size | Feel |
|------|------|
| Small | Compact header actions |
| Medium | Default |
| Large / Extra large | Hero and form submit (Sign in, Create account) |

**Rule of thumb for clients:** One **lime** button per visible section = the thing you want users to do next.

---

## 8. Labels and tags

**Badges** are small rounded pills for status or categories.

| Variant | Look | Use |
|---------|------|-----|
| Default | Light gray border, soft fill | General labels (e.g. version tags) |
| Lime | Green tint | Highlights, “live” features |
| Dark | Light border on dark bg | Tags on hero cards |
| Outline | Border only | Neutral tags |

---

## 9. Headings on pages

**Section headings** appear on marketing pages and some inner pages.

| Part | Description |
|------|-------------|
| **Eyebrow** (optional) | Small pill with a dot + short label (e.g. “Pricing”) |
| **Title** | Large headline — can include gradient serif phrase |
| **Description** (optional) | Gray paragraph under the title |
| **Centered mode** | Title and text centered for feature/pricing intros |
| **Light mode** | White text when sitting on dark backgrounds |

---

## 10. Forms and inputs

### Auth fields (sign-in, sign-up, verify)

- **Label** — Small uppercase gray text above the field.
- **Input** — Tall rounded rectangle, cream background, subtle border; **lime ring** when focused.
- **Error** — Red border and red message below the field.
- **Hint** — Light gray helper text when no error.

Password fields match the same shape; “Forgot password?” is a text link aligned with the label row.

### Contact and marketing forms

- Similar rounded inputs; may use shared **Input** styling.
- Submit uses **lime** or **primary** button; success and error messages in colored boxes.

### Newsletter (footer)

- Single email field + submit; shows a simple “Joined” confirmation on the page (no page reload).

### OTP / verification

- Separate **one-time code** boxes for email verification — spaced digit inputs.

### Social login row

- Three equal buttons: **Google**, **Microsoft**, **LinkedIn** (with brand-colored icons).
- Divider line with “OR CONTINUE WITH” between social and email/password.

---

## 11. Cards and page width

### Content width (Container)

Pages limit how wide content spreads on large monitors:

| Width name | Purpose |
|------------|---------|
| **Narrow** | Legal text, focused articles |
| **Default** | Most marketing sections |
| **Wide** | Spacious layouts |
| **Full** | Maximum width (e.g. header, large heroes) — up to ~1440px |

Side padding keeps content readable on phones and tablets.

### Cards

- **Standard card** — Rounded rectangle, light border, cream fill, padding inside.
- **Spotlight card** — On hover, a soft light follows the cursor (used on feature grids).

### Auth card

- Centered panel, max width ~920px, split in two on desktop (see §14).

---

## 12. Global chrome (header, footer, banner)

### Announcement bar

- Thin strip at the very top of **marketing pages**.
- Dark background; short promo message with link (e.g. changelog).
- **Hidden** on sign-in, sign-up, and dashboard routes for a cleaner focus.

### Header (navigation)

- **Sticky** at top; becomes slightly **frosted glass** when you scroll.
- **Logo** left; **links** center (Home, Features, Solutions, Customers, Pricing, Changelog, Blog).
- **Right actions:** Sign in (ghost), Sign up (outline), Book a demo (lime).
- **Mobile:** Hamburger opens a stacked menu with the same links and buttons.
- **Hidden** on sign-in, sign-up, and entire dashboard.

### Footer

- **Dark** section with gradient mesh; multiple link columns (Product, Solutions, Resources, Company).
- **Newsletter** signup, legal links (Privacy, Terms), social icons.
- Large decorative “TalentBridge” watermark.
- **Hidden** on auth routes that use minimal chrome (sign-in, sign-up, etc.).

---

## 13. Marketing website sections

These are the large blocks visitors see. The **home page** uses most of them in order; other pages reuse subsets.

| Section | What visitors see | Also on |
|---------|---------------------|---------|
| **Hero** | Dark rounded card: headline, stats, demo CTAs, fake product preview, customer logos | Home |
| **Resume marquee** | Two scrolling rows of mini resume cards; speed reacts to scroll | Home |
| **Bento features** | Asymmetric grid of 6 feature tiles with icons and mini visuals | Home, Features |
| **How it works (pinned)** | Scroll story: 4 steps stay pinned while text updates | Home |
| **CV gallery** | Hover a candidate card to slowly scroll their full CV | Home |
| **Product showcase** | Tabs: Sourcing, Screening, Outreach, Analytics | Home |
| **Metrics counter** | Animated numbers (e.g. faster sourcing %) | Home |
| **Testimonials marquee** | Scrolling customer quotes | Home, Solutions |
| **Integrations cloud** | Logo/name cloud of ATS and tools | Home, Features |
| **Pricing** | 3 plans, monthly/yearly toggle, feature lists | Home, Pricing |
| **FAQ** | Expandable questions (accordion) | Home, Features, Pricing |
| **CTA band** | Final push to book demo or sign up | Most marketing pages |
| **Page hero** | Smaller hero for inner pages (title + subtitle) | Features, Pricing, About, Blog, etc. |
| **Logo marquee** | Customer logos scrolling | Customers |

### Public marketing URLs (quick list)

`/`, `/features`, `/pricing`, `/customers`, `/about`, `/changelog`, `/blog`, `/blog/[article]`, `/contact`, `/privacy`, `/terms`, `/solutions/recruiter`, `/solutions/hiring-manager`, `/solutions/hr-lead`

---

## 14. Sign-in and sign-up experience

### Layout

- Full-page **warm paper** background.
- **Back to home** pill button — top-left **outside** the main card, links to `/`.
- Centered **card** with rounded corners and light border.

### Split card (desktop)

| Left half (dark) | Right half (light) |
|------------------|-------------------|
| Logo (light), “AI recruiting copilot” badge | “Welcome back” or “Create your account” |
| Headline + short pitch | Social login buttons |
| Checklist (SOC 2, trial, setup time) | Email / password fields |
| Customer quote | Checkbox, lime **Sign in** or **Create account** |
| “Explore the product” link | Link to switch sign-in ↔ sign-up |

On **mobile**, the dark marketing half is hidden; logo appears above the form.

### Other auth pages

| Page | Purpose |
|------|---------|
| **Forgot password** | Reset email flow |
| **Verify** | Enter email verification code |
| **Select role** | Choose job seeker vs hiring role after login |

Auth pages use **no site header** on sign-in/sign-up for minimal distraction; some still show footer rules per route.

### Account URLs

`/sign-in`, `/sign-up`, `/forgot-password`, `/verify`, `/select-role`

---

## 15. Job seeker dashboard

After sign-in, job seekers enter a **dedicated workspace** without the marketing header/footer.

### Navigation

- **Sidebar menu** (staggered animated list): Dashboard, Applications, My resumes, Search, Profile, Settings.
- **Role indicator** and **logout** in sidebar footer.
- **Search shortcut** in sidebar where relevant.

### Main dashboard home

- **Resume dropzone** — Upload area to start parsing a CV.
- **Extraction panel** — Progress while resume is processed.
- **Chat panel / input** — AI assistant at bottom on main flow (hidden on standalone sub-pages).
- Content sits in a **centered frame** with gentle fade-in when the page loads.

### Standalone sub-pages (no upload/chat chrome)

| Page | What users do |
|------|----------------|
| **Search** | Search jobs, filters, result cards, pagination, job detail sheet |
| **My resumes** | List and edit resumes |
| **Profile** | View/edit profile |
| **Settings** | Toggles and dropdowns (notifications, preferences) |

### Dashboard URLs

| Path | Area |
|------|------|
| `/dashboard/job-seeker` | Main dashboard / upload |
| `/dashboard/job-seeker/search` | Job search |
| `/dashboard/job-seeker/search/[jobId]` | Job detail |
| `/dashboard/job-seeker/my-resumes` | Resumes |
| `/dashboard/job-seeker/profile` | Profile |
| `/dashboard/job-seeker/settings` | Settings |

### Dashboard visual style

- Stays on brand: **paper** backgrounds, **ink** text, **lime** accents for primary actions.
- Cards and panels reuse rounded corners and subtle borders from marketing.
- **PDF viewer** for resume preview; **animated pagination** on search results.

---

## 16. Motion and feel

Movement is **subtle and premium**, not flashy.

| Effect | User perception |
|--------|-----------------|
| **Smooth scrolling** | Whole page glides smoothly instead of jerky jumps |
| **Fade up** | Sections gently rise and fade in as you scroll to them |
| **Text reveal** | Headline words appear in sequence |
| **Counters** | Statistics count up when they enter view |
| **Marquees** | Logos and resumes drift horizontally; resume speed can follow scroll |
| **Pinned “how it works”** | Section sticks while steps change on scroll |
| **Magnetic buttons** | Primary buttons slightly follow the cursor on desktop |
| **Page transitions** | Dashboard content fades in softly |

---

## 17. Do’s and don’ts

### Do

- Use **lime** for the single most important action per screen.
- Use **warm paper** backgrounds for light marketing and forms.
- Use **dark ink panels** for heroes and auth marketing side.
- Use **Instrument Serif italic** only for short emphasis phrases, not whole paragraphs.
- Keep corners **rounded** consistently with existing screens.
- Keep body copy in **Outfit** for readability.

### Don’t

- Don’t introduce new bright colors outside the palette (red is reserved for errors).
- Don’t use lime for large background areas — it’s for actions and highlights.
- Don’t use multiple competing lime buttons in one view.
- Don’t use the serif font for long body text or form labels.
- Don’t mix sharp square corners with the rest of the product.
- Don’t add a second navigation bar on dashboard or auth focus pages.

---

## 18. Changing copy (for clients)

Your team can request text changes; a developer updates the files below. This table maps **what you want to change** → **where it lives** (no coding required to understand).

| You want to change… | Where it lives (for your dev team) |
|-------------------|-------------------------------------|
| Site name, tagline, emails, social links | Site settings file |
| Top menu and footer links | Navigation config |
| Pricing plans and prices | Pricing content file |
| FAQ questions and answers | FAQ content file |
| Blog posts | Blog content file |
| Customer stories and logos | Customers content file |
| Feature list and descriptions | Features content file |
| Home section order | Home page composition file |
| Auth panel checklist and quote | Auth shell component |
| Job seeker menu labels | Job seeker menu config |
| Colors or fonts | Global styles + font setup |

---

## 19. Component catalog

Grouped for easy review. Each item: **what it looks like → where it appears → why it exists**.

### 1. Brand and navigation

| Name | What it looks like | Where | Purpose |
|------|-------------------|-------|---------|
| **Logo** | Gradient icon + “TalentBridge” wordmark | Header, footer, auth, dashboard | Brand home link |
| **Header** | Sticky frosted nav with links and CTAs | Marketing pages | Global navigation |
| **Footer** | Dark multi-column links + newsletter | Marketing pages | Links, legal, email capture |
| **Announcement bar** | Thin top promo strip | Marketing pages | Highlight news / releases |
| **Conditional header/footer** | (Behavior, not visible) | Hides chrome on auth/dashboard | Focused experiences |
| **Staggered menu** | Animated vertical nav list | Dashboard sidebar | Section navigation |

### 2. Actions

| Name | What it looks like | Where | Purpose |
|------|-------------------|-------|---------|
| **Button** | Pill buttons, 6 color variants | Everywhere | Clicks and navigation |
| **Badge** | Small labeled pill | Heroes, features | Status / category |
| **Magnetic wrapper** | Subtle hover pull on CTAs | Hero buttons | Delight on desktop |

### 3. Content layout

| Name | What it looks like | Where | Purpose |
|------|-------------------|-------|---------|
| **Container** | Max-width wrapper with side padding | Sections | Readable line length |
| **Section heading** | Eyebrow + title + description | Marketing sections | Section intros |
| **Card** | Bordered rounded box | Pricing, features, forms | Group related content |
| **Spotlight card** | Card with cursor-following glow | Bento features | Interactive emphasis |

### 4. Forms

| Name | What it looks like | Where | Purpose |
|------|-------------------|-------|---------|
| **Auth field** | Labeled rounded input | Sign-in, sign-up | Account fields |
| **Input** | Styled text field | Contact, misc | General forms |
| **Sign-in form** | Social + email + password + remember me | `/sign-in` | Login |
| **Sign-up form** | Name, email, company, password, terms | `/sign-up` | Registration |
| **Forgot password form** | Email to reset | `/forgot-password` | Recovery |
| **Verify code form** | OTP entry | `/verify` | Email verification |
| **Select role form** | Role choice cards | `/select-role` | Post-login routing |
| **Contact form** | Demo request fields | `/contact` | Sales leads |
| **Newsletter form** | Email only | Footer | Mailing list |
| **OTP input** | Digit boxes | Verify flow | Code entry |
| **Social auth buttons** | Google / Microsoft / LinkedIn row | Auth forms | Social sign-in (UI ready) |
| **Auth divider** | “OR CONTINUE WITH” line | Auth forms | Separates social vs email |

### 5. Marketing sections

| Name | What it looks like | Where | Purpose |
|------|-------------------|-------|---------|
| **Hero section** | Dark card, headline, stats, product mock | Home | First impression |
| **Resume marquee** | Scrolling mini CV cards | Home | Show product signal |
| **Bento features** | Feature grid with visuals | Home, Features | Product capabilities |
| **How it works pinned** | Scroll-pinned 4 steps | Home | Explain workflow |
| **CV gallery** | Hover-to-scroll full CVs | Home | Deep resume demo |
| **Product showcase** | Tabbed product areas | Home | Feature depth |
| **Metrics counter** | Animated stat numbers | Home | Social proof |
| **Testimonials marquee** | Scrolling quotes | Home, Solutions | Trust |
| **Integrations cloud** | Tool names/logos | Home, Features | Ecosystem |
| **Pricing section** | Plans + toggle | Home, Pricing | Commercial |
| **FAQ section** | Accordion Q&A | Home, Features, Pricing | Objections |
| **CTA section** | Closing headline + buttons | Many pages | Convert |
| **Page hero** | Inner page title block | About, Blog, etc. | Page context |
| **Logo marquee** | Customer logos scroll | Customers | Logos |

### 6. Auth screens

| Name | What it looks like | Where | Purpose |
|------|-------------------|-------|---------|
| **Auth shell** | Split marketing + form card | Sign-in, sign-up | Branded auth layout |
| **Back to home link** | Top-left pill outside card | Auth split layout | Exit to marketing site |

### 7. Dashboard (job seeker)

| Name | What it looks like | Where | Purpose |
|------|-------------------|-------|---------|
| **Dashboard shell** | Sidebar + main area + optional chat | Job seeker routes | App frame |
| **Page frame** | Centered content with fade-in | Dashboard pages | Consistent layout |
| **Content panel** | Main white/content area wrapper | Dashboard | Hold page body |
| **Resume dropzone** | Upload target zone | Dashboard home | Start CV upload |
| **Extraction panel** | Loading / parsing state | Dashboard home | Processing feedback |
| **Chat panel / input** | AI chat UI | Dashboard home | Assistant |
| **PDF viewer / canvas pages** | Resume preview | Dashboard | View document |
| **Search bar** | Query input | Search page | Find jobs |
| **Search filters panel** | Filter controls | Search | Narrow results |
| **Search result card** | Job listing tile | Search | Result display |
| **Job detail bottom sheet** | Slide-up job info | Search mobile/desktop | Job details |
| **Animated pagination** | Page controls | Search | Browse results |
| **Resume list item** | Row per resume | My resumes | List CVs |
| **Resume editor** | Edit resume UI | My resumes | Update CV |
| **Settings section** | Grouped settings block | Settings | Organize prefs |
| **Settings toggle row** | On/off switch row | Settings | Boolean prefs |
| **Settings select field** | Dropdown setting | Settings | Choice prefs |
| **Sidebar search** | Quick search in nav | Sidebar | Shortcut |
| **Sidebar role / logout** | Role label + sign out | Sidebar footer | Account exit |
| **Top actions** | Header actions on sub-pages | Dashboard | Page tools |
| **Job seeker pages** | Composed full pages | Search, settings, etc. | Route content |

### 8. Motion and polish

| Name | What it looks like | Where | Purpose |
|------|-------------------|-------|---------|
| **Lenis provider** | Smooth scroll sitewide | All pages | Scroll feel |
| **Fade up** | Enter animation | Sections | Reveal on scroll |
| **Text reveal** | Word/char animation | Heroes | Dramatic headlines |
| **Parallax** | Layer shift on scroll | Decorative | Depth |
| **Marquee** | Infinite horizontal scroll | Logos, testimonials | Movement |
| **Counter** | Number count-up | Metrics | Impact |
| **Pinned section** | GSAP pin helper | How it works | Scroll storytelling |

---

## 20. Appendix: quick reference

### Color hex cheat sheet

| Name | Hex |
|------|-----|
| Lime | `#c1f968` |
| Lime dark | `#9adc36` |
| Paper 50 | `#fbfaf6` |
| Paper 100 | `#f5f3ec` |
| Ink 950 | `#08080c` |
| Ink 900 | `#0e0e14` |
| Ink 500 | `#4d4d58` |
| Violet | `#8b5cf6` |
| Cyan | `#5eead4` |
| Amber | `#f5b942` |

### Button cheat sheet

| Need | Use |
|------|-----|
| Main conversion | **Lime** |
| Secondary on light bg | **Primary** or **Outline** |
| Low emphasis | **Ghost** |
| On dark hero | **Dark** or **Lime** |

### Font cheat sheet

| Need | Font |
|------|------|
| Almost everything | **Outfit** |
| Short fancy emphasis | **Instrument Serif** italic |
| Stats / code | **Geist Mono** |

---

## Document info

| | |
|---|---|
| **Audience** | Non-technical clients and stakeholders |
| **Companion doc** | [DOCUMENTATION.md](../DOCUMENTATION.md) (developers) |
| **Index** | [docs/README.md](./README.md) |
| **Product** | TalentBridge |
| **Maintainer note** | Update when new UI areas ship (e.g. hiring agency dashboard) |

---

*Questions about brand usage? Share this guide with your design and development partners so everyone uses the same colors, buttons, and patterns.*
