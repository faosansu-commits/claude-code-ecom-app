# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (Next.js App Router, Turbopack default in this Next.js version)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint via `eslint-config-next` flat config (`eslint.config.mjs`)

There is no test runner configured yet — no test script, framework, or test files exist in this repo.

## Architecture

This is a from-scratch `create-next-app` project (App Router, TypeScript, Tailwind CSS v4) that has not yet been built out — `src/app/` currently contains only the default scaffold (`layout.tsx`, `page.tsx`, `globals.css`). There is no additional structure (no `components/`, `lib/`, API routes, or data layer) established yet, so don't assume conventions beyond what's in `src/app/`.

- Path alias `@/*` maps to `./src/*` (`tsconfig.json`).
- Tailwind v4 is wired through `@tailwindcss/postcss` (`postcss.config.mjs`) rather than a `tailwind.config.*` file — theme customization belongs in `globals.css` via `@theme`/CSS variables, not a JS config.
- `next.config.ts` is currently empty — add config options there as needed.

## Environment variables

The contact form (`/contact`) sends email via [Resend](https://resend.com). Set these server-only vars (no `NEXT_PUBLIC_` prefix — `.env*` is gitignored, no `.env.example` is committed):

| Variable | Example |
|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxx` |
| `CONTACT_FROM_EMAIL` | `JHOOWA <noreply@yourdomain.com>` (use `onboarding@resend.dev` in development) |
| `CONTACT_TO_EMAIL` | `support@jhoowa.co.th` |

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
