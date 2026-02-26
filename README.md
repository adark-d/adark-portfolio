# ▲dark. Portfolio

The personal portfolio of David Adarkwah, Senior AI & Data Engineer based in London. Built as a production-grade Next.js application and deployed on AWS infrastructure.

Live at **[dadark.dev](https://dadark.dev)**

## Overview

This is not a template or a starter kit. It is a fully custom portfolio engineered from scratch with a focus on performance, clean architecture, and a strong visual identity. The site features a command palette (⌘K), an animated project drawer, a tech radar, and a full experience timeline — all server-rendered where possible and client-interactive where necessary.

## Tech Stack

| Concern      | Choice                            |
| ------------ | --------------------------------- |
| Framework    | Next.js 16 (App Router)           |
| Language     | TypeScript                        |
| Styling      | Tailwind CSS v4                   |
| Icons        | Lucide React                      |
| Fonts        | Geist Sans · Playfair Display     |
| Code Quality | Prettier + TypeScript strict mode |
| Hosting      | AWS Amplify                       |
| CDN          | AWS CloudFront                    |
| DNS          | AWS Route 53                      |
| SSL          | AWS ACM (us-east-1)               |
| Domain       | dadark.dev                        |

## Project Structure

```
adark-portfolio/
├── public/
│   ├── david-cv.pdf            # Downloadable CV
│   └── og-image.jpeg           # Open Graph preview image (1200x630)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — fonts, metadata, Open Graph
│   │   ├── page.tsx            # Entry point — assembles all sections, manages global state
│   │   └── globals.css         # Tailwind v4 theme (colors, fonts, animations)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Fixed nav — scroll-aware style, ⌘K trigger
│   │   │   ├── Footer.tsx           # Footer with inline logo
│   │   │   ├── LivePulse.tsx        # Animated availability indicator (desktop only)
│   │   │   └── DeveloperConsole.tsx # ⌘K command palette — navigation + actions
│   │   ├── sections/
│   │   │   ├── Hero.tsx             # Full-height landing section
│   │   │   ├── About.tsx            # Philosophy, experience timeline, awards
│   │   │   ├── ExpertiseRadar.tsx   # Tech radar — Adopt / Trial / Assess
│   │   │   ├── SelectedWorks.tsx    # Project grid — triggers ProjectDrawer
│   │   │   └── Contact.tsx          # Contact CTA with calendar, email, CV links
│   │   └── ui/
│   │       ├── TextureOverlay.tsx   # Fixed grain texture (SVG noise, mix-blend-multiply)
│   │       └── ProjectDrawer.tsx    # Slide-in panel with full project details
│   ├── data/
│   │   └── content.ts          # Single source of truth for all portfolio content
│   └── types/
│       └── index.ts            # TypeScript interfaces for all data shapes
├── .prettierrc                 # Prettier config (single quotes, no semi, Tailwind sort)
├── next.config.ts              # Image domain whitelist
├── postcss.config.mjs          # Tailwind v4 PostCSS plugin
└── tsconfig.json
```

## Getting Started

You will need Node.js 20 LTS. If you use nvm run `nvm use 20` before starting.

```bash
git clone https://github.com/adark-d/adark-portfolio.git
cd adark-portfolio
npm install
npm run dev
```

The development server starts at [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Production build — run this before deploying
npm run start        # Serve the production build locally
npm run format       # Format all files with Prettier
npm run typecheck    # Run TypeScript compiler check without emitting files
```

## Updating Content

All portfolio content — personal info, experience, projects, tech radar, and awards — lives in a single file: `src/data/content.ts`. No component changes are needed for content updates. The TypeScript interfaces in `src/types/index.ts` document the expected shape of every data object.

## Architecture Notes

**Server-first rendering.** Components are server components by default. Only components that require browser APIs or React state are marked `"use client"`. This keeps the initial payload small and pages fast.

**Tailwind v4.** There is no `tailwind.config.ts` in this project. Tailwind v4 is configured entirely through the `@theme` directive in `globals.css`. Custom colors, fonts, and keyframe animations are all defined there.

**ProjectDrawer rendered at root level.** The drawer is intentionally rendered outside `<main>` in `page.tsx`. This avoids z-index stacking context conflicts with the fixed navbar — a common issue when modals or drawers are nested inside positioned containers.

## Deployment

Every push to `main` triggers an automatic production deployment via AWS Amplify. The deployment pipeline is:

```
GitHub (main branch)
  → AWS Amplify (Next.js build + hosting)
    → CloudFront (CDN + SSL termination)
      → Route 53 (DNS → dadark.dev)
```

The SSL certificate is provisioned in `us-east-1` via AWS ACM, which is required by CloudFront regardless of the application region.

## License

MIT
