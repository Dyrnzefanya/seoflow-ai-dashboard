# SEOFlow AI Dashboard

> An AI-powered SEO operating system — monitor SEO performance, AI visibility, GEO/AEO presence, and keyword rankings in one unified modern dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Status](https://img.shields.io/badge/Status-Frontend%20MVP%20Complete-10b981?style=flat-square)

---

## Live Demo

> **[Live Demo →](https://your-demo-url.vercel.app)**
> *(Deploy to Vercel and replace this link)*

---

## Overview

SEOFlow is a SaaS dashboard prototype built for SEO specialists, digital marketers, and business owners who need to track their full digital presence — including traditional search rankings **and** visibility in AI-generated answers.

The core problem it solves: professionals today must juggle Google Search Console, Google Analytics, spreadsheets, and AI tools separately. SEOFlow unifies SEO, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), and AI visibility monitoring into a single, high-signal interface.

The frontend MVP is fully complete with a production-grade design system, 9 pages, and a modular component library — ready for backend integration.

---

## Screenshots

> *Add screenshots after deploying. Suggested captures:*
> - `docs/screenshots/landing.png` — Landing / marketing page
> - `docs/screenshots/dashboard.png` — Dashboard overview with score rings
> - `docs/screenshots/keywords.png` — Keyword tracking table
> - `docs/screenshots/ai-visibility.png` — AI platform visibility chart
> - `docs/screenshots/recommendations.png` — AI recommendations panel

---

## Key Features

### Dashboard Overview
- Dual animated score rings: **SEO Score** and **AI Visibility Score**
- 4 KPI cards (traffic, AI visibility, keywords ranked, reports)
- 12-month organic + paid traffic trend chart
- Per-platform AI visibility breakdown (ChatGPT, Google AI, Perplexity, Gemini, Bing Copilot)
- Top recommendations widget + keyword rankings table

### SEO Performance
- Clicks, impressions, CTR, and average position metrics
- Technical health panel with issue flagging
- Top performing pages table (GSC-ready structure)

### AI Visibility Monitoring
- GEO/AEO presence tracking per AI platform
- AEO schema opportunity table with impact scoring
- Overall AI presence score ring with contextual copy

### AI Recommendations Engine
- 8 prioritised recommendations with High / Medium / Low severity
- Per-recommendation: category, effort level, impact estimate, projected gain
- Business-friendly, concise language (no jargon)

### Keyword Tracking
- 12 keywords with position badges, ranking delta, search volume, and keyword difficulty bars
- Filter tabs: All / Top 10 / Movers / Opportunities / Declining
- Search intent categorisation

### Weekly Reports
- Latest report hero banner with PDF export and share UI
- Report history table (5 weeks)
- AI Insight of the Week callout

### Workflow / Kanban
- Sprint progress bar
- 3-column Kanban board (To Do / In Progress / Done)
- Task cards with priority badges and due dates

### Additional Pages
- `/settings` — Account info and integrations placeholder
- `/` — Full marketing landing page with feature grid, stats, and CTAs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Library | React 19 |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Font | Geist (via `next/font`) |
| Utilities | clsx + tailwind-merge |
| **Planned** Auth | Clerk |
| **Planned** Database | Supabase (PostgreSQL) |
| **Planned** AI APIs | Claude API (Anthropic), OpenAI, Gemini |
| **Planned** Analytics | Google Search Console API, GA4 API |
| **Planned** Hosting | Vercel + Cloudflare |
| **Planned** Automation | n8n |

---

## Project Architecture

```
seoflow/
├── src/
│   ├── app/
│   │   ├── globals.css                    # Design tokens, keyframes, utilities
│   │   ├── layout.tsx                     # Root layout (Geist font, dark bg)
│   │   ├── page.tsx                       # Landing / marketing page
│   │   └── (dashboard)/
│   │       ├── layout.tsx                 # Dashboard shell (sidebar + mobile nav)
│   │       ├── dashboard/page.tsx         # Overview — scores, KPIs, charts
│   │       ├── seo/page.tsx               # SEO Performance
│   │       ├── ai-visibility/page.tsx     # GEO / AEO / platform scores
│   │       ├── recommendations/page.tsx   # AI Recommendations
│   │       ├── keywords/page.tsx          # Keyword Tracking
│   │       ├── reports/page.tsx           # Weekly Reports
│   │       ├── workflow/page.tsx          # Kanban Workflow
│   │       └── settings/page.tsx         # Settings
│   ├── components/
│   │   ├── layout/
│   │   │   ├── sidebar.tsx                # Desktop sidebar + mobile drawer
│   │   │   ├── topbar.tsx                 # Sticky topbar (search, date range)
│   │   │   ├── dashboard-shell.tsx        # Shell + grid layout helpers
│   │   │   └── mobile-nav-context.tsx     # React context for mobile nav state
│   │   ├── ui/
│   │   │   ├── card.tsx                   # Card, CardHeader, CardContent
│   │   │   ├── badge.tsx                  # Badge — 6 variants
│   │   │   ├── kpi-card.tsx               # KPI metric card with trend indicator
│   │   │   └── score-ring.tsx             # Animated SVG score ring
│   │   ├── charts/
│   │   │   ├── traffic-chart.tsx          # AreaChart (organic + paid)
│   │   │   └── ai-visibility-chart.tsx    # Progress bar chart per platform
│   │   └── dashboard/
│   │       ├── recommendations-widget.tsx # Priority-sorted recommendation list
│   │       ├── keyword-table.tsx          # Rankings table with position badges
│   │       └── top-pages-table.tsx        # GSC top pages table
│   └── lib/
│       ├── placeholder-data.ts            # All mock data (single source of truth)
│       └── utils.ts                       # cn() helper
└── package.json
```

### Route Group Pattern

The `(dashboard)` route group applies a shared layout (sidebar + mobile nav) to all dashboard routes without affecting the URL structure. The landing page at `/` sits outside this group with no sidebar.

### Design System

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#070c18` | Page background |
| `--bg-card` | `#0f1929` | Card backgrounds |
| `--border` | `#1a2d42` | All borders |
| `--accent` | `#10b981` | Emerald green primary |
| `--text-primary` | `#f0f4f8` | Headlines, values |
| `--text-secondary` | `#8ca4be` | Body text |
| `--text-muted` | `#415a72` | Labels, table headers |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-username/seoflow.git
cd seoflow
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check (tsc --noEmit)
```

### Environment Variables

Create `seoflow/.env.local` when adding backend integrations:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk (authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Google APIs
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# AI APIs
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GEMINI_API_KEY=
```

---

## MVP Status

The current version is a **complete frontend prototype** with production-quality UI and realistic placeholder data. No backend integrations exist yet.

| Area | Status |
|---|---|
| Project setup | Complete |
| Landing / marketing page | Complete |
| Dashboard shell & layout | Complete |
| All 9 dashboard pages | Complete |
| Reusable component library | Complete |
| Mobile responsive layout | Complete |
| Placeholder data layer | Complete |
| Visual polish — premium SaaS feel | Complete |
| Authentication (Clerk) | Not started |
| Supabase / database | Not started |
| Google Search Console API | Not started |
| GA4 API | Not started |
| AI recommendation engine (Claude API) | Not started |
| PDF report export | Not started |
| Real keyword tracking | Not started |

All 10 routes build as static pages with zero TypeScript or ESLint errors.

---

## Roadmap

### Phase 2 — Real Data Layer
- Clerk authentication + route protection
- Supabase + PostgreSQL schema (users, projects, keyword_rankings, ai_recommendations)
- Onboarding flow: user enters domain and selects GSC property
- Google Search Console API integration (clicks, impressions, CTR, position)
- Replace all placeholder data with live Supabase queries

### Phase 3 — AI Intelligence Layer
- Claude API integration: generate structured recommendations from site context
- AI visibility checking per platform (OpenAI, Gemini, Perplexity)
- GA4 API for traffic segmentation (organic vs. paid)
- PDF report export via Puppeteer or `@react-pdf/renderer`

### Phase 4 — Power Features
- Competitor keyword tracking
- Content scoring per page (GEO/AEO optimisation level)
- Rank change alerts (email / Slack via n8n)
- Multi-project support (track multiple domains)

### Phase 5 — Agency & Team
- Client workspaces with white-label reporting
- Team roles: Admin / Editor / Viewer
- Shareable public report links
- Bulk keyword CSV import

### Phase 6 — Monetisation
- Stripe subscription billing (Free / Pro / Agency tiers)
- Usage metering (keywords tracked, AI checks per month)
- Referral system

---

## Portfolio Context

This project was designed and built as a full-stack SaaS prototype to demonstrate:

- **Product thinking** — solving a real fragmentation problem in the SEO/AI visibility tooling space
- **Frontend engineering** — Next.js App Router with TypeScript, modular component design, and a custom design system at scale
- **UX design sensibility** — Vercel + Linear-inspired dark dashboard aesthetic; information hierarchy optimised for fast comprehension
- **Architecture planning** — full backend integration roadmap with Supabase, Clerk, Google APIs, and Claude API already specced and ready to build
- **Modern AI awareness** — GEO and AEO monitoring reflects the emerging shift from traditional search to AI-generated answers

The frontend was built to production standards: zero build errors, fully responsive, custom CSS animation system, and a complete reusable component library — not a theme or template.

---

## Contributing

This is a personal portfolio project. Issues and feedback are welcome via GitHub Issues.

---

## License

MIT License. See `LICENSE` for details.

---

*Built with Next.js, TypeScript, and Tailwind CSS. Designed for the AI-first search era.*
