import type { LucideIcon } from "lucide-react"
import {
  Activity, AppWindow, BrainCircuit, Cloud, Database, GitBranch,
  Globe, Layers, Server, ShieldCheck, Sparkles, TerminalSquare, Zap,
} from "lucide-react"

export const PROFILE = {
  name: "Aarav Sharma",
  role: "Full-Stack Developer",
  tagline: "I build fast, interactive web experiences end-to-end.",
  location: "Bengaluru, India",
  email: "hello@aaravsharma.dev",
  github: "https://github.com/aaravsharma",
  linkedin: "https://linkedin.com/in/aaravsharma",
  resume: "#",
  bio: "Full-stack engineer who loves turning ideas into polished, production-ready products. I work across the stack — from typed APIs and Postgres schemas to buttery-smooth React interfaces and real-time features.",
  stats: [
    { label: "Years building for the web", value: 6, suffix: "+" },
    { label: "Projects shipped to production", value: 40, suffix: "+" },
    { label: "Open-source stars earned", value: 2.4, suffix: "k", decimals: 1 },
    { label: "Coffees per release cycle", value: 127, suffix: "" },
  ],
}

export type SkillGroup = {
  category: string
  icon: LucideIcon
  color: string
  skills: { name: string; level: number; note: string }[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    icon: TerminalSquare,
    color: "oklch(0.72 0.16 160)",
    skills: [
      { name: "TypeScript", level: 95, note: "Daily driver for 4+ years" },
      { name: "JavaScript", level: 96, note: "ES2023, async patterns" },
      { name: "Python", level: 82, note: "FastAPI, data scripting" },
      { name: "Go", level: 68, note: "Concurrency, microservices" },
      { name: "Rust", level: 55, note: "CLI tools, wasm" },
      { name: "SQL", level: 88, note: "Postgres, query tuning" },
    ],
  },
  {
    category: "Frontend",
    icon: AppWindow,
    color: "oklch(0.75 0.14 185)",
    skills: [
      { name: "React / Next.js", level: 95, note: "App Router, RSC" },
      { name: "Tailwind CSS", level: 93, note: "Design systems" },
      { name: "Framer Motion", level: 88, note: "Interaction design" },
      { name: "Zustand / TanStack", level: 90, note: "State management" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "oklch(0.78 0.16 80)",
    skills: [
      { name: "Node.js / Bun", level: 92, note: "APIs, workers" },
      { name: "Prisma / Drizzle", level: 90, note: "Type-safe ORM" },
      { name: "PostgreSQL", level: 85, note: "Schemas, indexing" },
      { name: "Redis / Queues", level: 78, note: "Caching, BullMQ" },
      { name: "REST / tRPC", level: 90, note: "API design" },
    ],
  },
  {
    category: "Platform & DevOps",
    icon: Cloud,
    color: "oklch(0.7 0.2 25)",
    skills: [
      { name: "Docker", level: 84, note: "Compose, multi-stage" },
      { name: "CI/CD", level: 80, note: "GitHub Actions" },
      { name: "AWS / Vercel", level: 78, note: "Deploy & scale" },
      { name: "WebSockets", level: 85, note: "Real-time features" },
    ],
  },
]

export type Project = {
  id: string
  title: string
  category: "Full-Stack" | "Frontend" | "Backend" | "AI"
  featured: boolean
  year: string
  blurb: string
  description: string
  tech: string[]
  metrics: { label: string; value: string }[]
  highlights: string[]
  accent: string
  icon: LucideIcon
  links: { demo?: string; repo?: string }
}

export const PROJECTS: Project[] = [
  {
    id: "nutrifit",
    title: "NutriFit Platform",
    category: "Full-Stack",
    featured: true,
    year: "2024",
    blurb: "A full-stack nutrition & fitness platform with meal planning, macro tracking, and live progress analytics.",
    description:
      "NutriFit is an end-to-end health platform that lets users log meals, generate personalized meal plans, track macros against goals, and visualize progress with interactive charts. It includes a real-time activity feed, a coach dashboard, and a recommendation engine powered by a nutrition database.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts", "tRPC", "Redis"],
    metrics: [
      { label: "Active users", value: "12.4k" },
      { label: "Meals logged", value: "1.2M" },
      { label: "p95 API", value: "84ms" },
      { label: "Uptime", value: "99.9%" },
    ],
    highlights: [
      "Designed a normalized Postgres schema with 14 tables for foods, meals, goals, and progress",
      "Built a macro recommendation engine using Mifflin-St Jeor equations + activity multipliers",
      "Implemented real-time progress charts with optimistic updates via TanStack Query",
      "Added a coach dashboard with WebSocket live activity feed",
      "Reduced bundle size 38% with route-level code splitting and RSC",
    ],
    accent: "oklch(0.72 0.16 160)",
    icon: Activity,
    links: { demo: "#", repo: "#" },
  },
  {
    id: "devflow",
    title: "DevFlow CI Dashboard",
    category: "Full-Stack",
    featured: false,
    year: "2023",
    blurb: "Real-time CI/CD observability dashboard aggregating pipeline runs across 40+ repos.",
    description:
      "DevFlow pulls build status from GitHub Actions and renders a live, filterable dashboard with flame-graph timings, failure clustering, and Slack alerts. Built with a WebSocket gateway and a streaming aggregation pipeline.",
    tech: ["Next.js", "Bun", "Socket.io", "PostgreSQL", "Redis", "Docker"],
    metrics: [
      { label: "Repos monitored", value: "42" },
      { label: "Events/day", value: "180k" },
      { label: "Alert latency", value: "<2s" },
    ],
    highlights: [
      "Streaming WebSocket gateway handling 180k events/day",
      "Failure clustering with shared stack-trace fingerprints",
      "Saved engineers ~6 hrs/week of manual triage",
    ],
    accent: "oklch(0.75 0.14 185)",
    icon: GitBranch,
    links: { demo: "#", repo: "#" },
  },
  {
    id: "scribewave",
    title: "ScribeWave AI Notes",
    category: "AI",
    featured: false,
    year: "2024",
    blurb: "AI meeting notetaker that transcribes, summarizes, and extracts action items from audio.",
    description:
      "ScribeWave ingests meeting audio, streams transcripts, and uses an LLM to produce structured notes with action items, decisions, and speaker highlights. Includes a collaborative editor and export to Notion.",
    tech: ["Next.js", "Python", "FastAPI", "Whisper", "LLM", "WebSockets"],
    metrics: [
      { label: "Avg accuracy", value: "96%" },
      { label: "Notes/mo", value: "8.5k" },
      { label: "Languages", value: "11" },
    ],
    highlights: [
      "Streaming transcription with speaker diarization",
      "LLM-powered action-item extraction with confidence scoring",
      "Real-time collaborative note editor",
    ],
    accent: "oklch(0.78 0.16 80)",
    icon: BrainCircuit,
    links: { demo: "#", repo: "#" },
  },
  {
    id: "ledgerlite",
    title: "LedgerLite",
    category: "Backend",
    featured: false,
    year: "2023",
    blurb: "Double-entry accounting API with idempotent transfers and audit-grade ledgers.",
    description:
      "LedgerLite is a financial primitives API: accounts, transfers, and balances with strict double-entry rules, idempotency keys, and append-only audit logs. Built for correctness and speed.",
    tech: ["Go", "PostgreSQL", "Redis", "gRPC", "Docker"],
    metrics: [
      { label: "Throughput", value: "9k rps" },
      { label: "p99 latency", value: "11ms" },
      { label: "Zero discrepancy", value: "✓" },
    ],
    highlights: [
      "Idempotent transfers via key + hash deduplication",
      "Serializable isolation for balance correctness",
      "Append-only event log for full auditability",
    ],
    accent: "oklch(0.7 0.2 25)",
    icon: ShieldCheck,
    links: { demo: "#", repo: "#" },
  },
  {
    id: "pixelcraft",
    title: "PixelCraft UI Kit",
    category: "Frontend",
    featured: false,
    year: "2022",
    blurb: "Accessible, themeable component library with 60+ components and full keyboard support.",
    description:
      "PixelCraft is a React component library focused on accessibility and theming. 60+ components, WAI-ARIA compliant, with a live docs playground and tree-shakeable exports.",
    tech: ["React", "TypeScript", "Radix UI", "Tailwind CSS", "Storybook"],
    metrics: [
      { label: "Components", value: "62" },
      { label: "Weekly DLs", value: "14k" },
      { label: "a11y score", value: "100" },
    ],
    highlights: [
      "Full WAI-ARIA + keyboard navigation",
      "Runtime theme tokens with live preview",
      "Tree-shakeable, <3kb per component",
    ],
    accent: "oklch(0.68 0.18 300)",
    icon: Layers,
    links: { demo: "#", repo: "#" },
  },
  {
    id: "edgeping",
    title: "EdgePing Monitor",
    category: "Backend",
    featured: false,
    year: "2022",
    blurb: "Distributed uptime monitor with multi-region probes and status pages.",
    description:
      "EdgePing runs lightweight probes from 8 regions, aggregates availability, and serves public status pages with incident timelines. Written in Go for minimal resource use.",
    tech: ["Go", "SQLite", "Fly.io", "HTMX", "Prometheus"],
    metrics: [
      { label: "Regions", value: "8" },
      { label: "Checks/min", value: "30k" },
      { label: "Mem/probe", value: "4MB" },
    ],
    highlights: [
      "Multi-region probe mesh with gossip sync",
      "Incident timeline with subscriber webhooks",
      "Sub-100kb status pages via HTMX",
    ],
    accent: "oklch(0.75 0.14 185)",
    icon: Globe,
    links: { demo: "#", repo: "#" },
  },
]

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Playground", href: "#playground" },
  { label: "Code", href: "#code" },
  { label: "Contact", href: "#contact" },
]

export const MARQUEE_ITEMS = [
  "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Prisma",
  "Tailwind CSS", "Go", "Python", "Docker", "Redis", "Bun",
  "tRPC", "Framer Motion", "WebSocket", "Rust", "GraphQL", "AWS",
]
