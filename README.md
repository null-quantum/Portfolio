# Dhruvendra Patel — Portfolio

My personal developer portfolio. Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

Live projects featured on the site:

- **NutriFit** — AI-powered nutrition & fitness platform → [Live](https://nutrifit-pi-beige.vercel.app/) · [Code](https://github.com/null-quantum/nutrifit)
- **MoneyFlow** — AI-powered personal finance app → [Live](https://moneyflow-lemon.vercel.app/) · [Code](https://github.com/null-quantum/moneyflow)

## Tech

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Framer Motion (scroll animations & micro-interactions)
- Prisma + SQLite (contact form messages)
- 3 switchable color palettes, light/dark theme

## Run locally

```bash
bun install
bun run db:push   # creates the local SQLite db
bun run dev       # starts on http://localhost:3000
```

You'll need a `.env` file with:

```
DATABASE_URL="file:./db/custom.db"
```

## Deploy on Vercel

The portfolio is ready for Vercel. The contact form uses SQLite by default, which works locally but won't persist on Vercel's read-only filesystem. To make the contact form work in production, either connect a Postgres database (Supabase, Neon, etc.) via the `DATABASE_URL` env var, or swap it for a form service.

The projects section is fully static — no database needed.

## Structure

```
src/
  app/           # layout, page, API routes
  components/    # UI + section components
  lib/           # portfolio data, utils, palettes
  hooks/         # custom React hooks
```
