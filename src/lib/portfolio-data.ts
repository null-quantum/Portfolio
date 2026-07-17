import type { LucideIcon } from "lucide-react"
import {
  Boxes, Code2, Database, GitBranch, Layout, Layers, Server,
  Sparkles, TerminalSquare, Wand2, Wind, Zap,
} from "lucide-react"

export const PROFILE = {
  name: "Dhruvendra Patel",
  shortName: "dhruv",
  role: "Full-Stack Developer",
  tagline: "I build interactive, animated web apps end to end.",
  location: "Ahmedabad, India",
  email: "dhruvpatel.dev@gmail.com",
  github: "https://github.com/dhruv",
  linkedin: "https://linkedin.com/in/dhruvendrapatel",
  resume: "#",
  bio: "Hey, I'm Dhruv. I got into web dev through pure curiosity and now I can't stop building. My toolkit is Next.js, React, TypeScript and Tailwind on the front, Node.js + Prisma + SQLite on the back, with Framer Motion and React 3D for the fun stuff. I care about interfaces that feel alive — small motions, real interactions, pages that respond instead of just sitting there.",
  bioLong:
    "I'm still early in the journey and learning fast. This site is part portfolio, part proof that I can actually ship: there's a live JavaScript sandbox that runs in your browser, a macro calculator powered by the same math as my NutriFit project, and a section where you can add your own project that gets saved to a real database. Poke around — everything works.",
  stats: [
    { label: "Months hands-on with React", value: 14, suffix: "+" },
    { label: "Things I've built so far", value: 9, suffix: "" },
    { label: "Tools in my daily stack", value: 13, suffix: "" },
    { label: "Cups of chai per build", value: 3, suffix: "" },
  ],
}

// The actual stack Dhruv has learned — kept honest.
export type SkillGroup = {
  category: string
  icon: LucideIcon
  color: string
  skills: { name: string; level: number; note: string }[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    icon: Layout,
    color: "oklch(0.68 0.16 55)",
    skills: [
      { name: "React", level: 88, note: "Hooks, context, suspense" },
      { name: "Next.js (App Router)", level: 85, note: "RSC, route handlers, layouts" },
      { name: "TypeScript", level: 82, note: "Generics, inference, zod" },
      { name: "Tailwind CSS", level: 90, note: "Design tokens, responsive" },
      { name: "HTML & CSS", level: 92, note: "Semantic, flex/grid, animations" },
      { name: "JavaScript", level: 90, note: "ES2023, async, DOM" },
    ],
  },
  {
    category: "Animation & 3D",
    icon: Wand2,
    color: "oklch(0.55 0.1 190)",
    skills: [
      { name: "Framer Motion", level: 84, note: "Variants, gestures, scroll" },
      { name: "React 3D (R3F)", level: 68, note: "three.js scenes, drei helpers" },
      { name: "CSS 3D Transforms", level: 80, note: "Perspective, parallax" },
      { name: "Lottie / SVG motion", level: 70, note: "Lightweight micro-interactions" },
    ],
  },
  {
    category: "State & Data",
    icon: Boxes,
    color: "oklch(0.58 0.13 140)",
    skills: [
      { name: "Zustand", level: 86, note: "Stores, selectors, persist" },
      { name: "React Query", level: 78, note: "Caching, mutations" },
      { name: "Prisma ORM", level: 82, note: "Schema, migrations, relations" },
      { name: "SQLite", level: 80, note: "Queries, indexes" },
    ],
  },
  {
    category: "Backend & APIs",
    icon: Server,
    color: "oklch(0.62 0.18 15)",
    skills: [
      { name: "Node.js", level: 80, note: "Express, route handlers" },
      { name: "REST API design", level: 82, note: "Validation, status codes" },
      { name: "Next.js API routes", level: 84, note: "Server endpoints" },
      { name: "Auth basics", level: 65, note: "Sessions, JWT" },
    ],
  },
]

// The one real featured project — seeded into the database.
export const FEATURED_PROJECT = {
  title: "NutriFit Platform",
  category: "Full-Stack",
  year: "2024",
  blurb: "A nutrition & fitness web app for logging meals, hitting macro goals, and watching progress move on live charts.",
  description:
    "NutriFit started as a personal tool — I wanted to track what I ate without spreadsheets. It grew into a small full-stack app: log meals and workouts, set macro targets based on your stats, and see progress update live. The macro math uses the Mifflin-St Jeor equation (you can play with the same formula in the Playground below). Built with Next.js, TypeScript, Prisma and SQLite, with Framer Motion keeping the charts and transitions smooth.",
  tech: ["Next.js", "TypeScript", "Prisma", "SQLite", "Tailwind", "Framer Motion", "Zustand"],
  metrics: [
    { label: "Meals tracked", value: "1.2k" },
    { label: "Tables in schema", value: "8" },
    { label: "Bundle (gzip)", value: "94kb" },
    { label: "Lighthouse", value: "98" },
  ],
  highlights: [
    "Typed Prisma schema with foods, meals, goals and progress",
    "Macro targets computed from real BMR/TDEE equations",
    "Optimistic UI updates with Zustand + React Query",
    "Animated charts that don't jank on re-render",
  ],
  accent: "oklch(0.68 0.16 55)",
  thumbnail: "/project-nutrifit.png",
  demo: "#",
  repo: "#",
}

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Playground", href: "#playground" },
  { label: "Code", href: "#code" },
  { label: "Contact", href: "#contact" },
]

export const MARQUEE_ITEMS = [
  "Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "React 3D",
  "Zustand", "Node.js", "Prisma", "SQLite", "HTML", "CSS", "JavaScript", "REST API",
]
