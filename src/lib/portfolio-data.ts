import type { LucideIcon } from "lucide-react"
import { Bot, Database, GitBranch, Layout } from "lucide-react"

export const PROFILE = {
  name: "Dhruvendra Patel",
  shortName: "dhruv",
  role: "Junior Full-Stack Developer",
  subtitle: "React, Node.js & AI-Driven Workflows",
  tagline: "I build functional, real-world web apps end to end.",
  location: "Ahmedabad, India",
  email: "dhruvpatel.dev@gmail.com",
  github: "https://github.com/dhruv",
  linkedin: "https://linkedin.com/in/dhruvendrapatel",
  resume: "/resume.pdf",
  // Professional 3-sentence About summary.
  bio: [
    "I'm a junior full-stack developer with hands-on experience building web applications using React, Node.js, and modern JavaScript, working across the stack from responsive interfaces to REST APIs and databases.",
    "I'm proficient with modern tech stacks — React, TypeScript, Tailwind, Express, PostgreSQL and MongoDB — and I'm comfortable integrating AI-driven workflows like LLM APIs and prompt engineering into real products.",
    "I'm genuinely enthusiastic about building functional, real-world software, and I learn fastest by shipping projects that solve actual problems.",
  ],
  stats: [
    { label: "Projects built end-to-end", value: 5, suffix: "+" },
    { label: "Technologies in my stack", value: 16, suffix: "" },
    { label: "Months hands-on coding", value: 14, suffix: "+" },
    { label: "Cups of chai per build", value: 3, suffix: "" },
  ],
}

// Categorized tech stack — NO percentage bars, just clear groups.
export type TechGroup = {
  category: string
  icon: LucideIcon
  color: string
  skills: string[]
}

export const TECH_STACK: TechGroup[] = [
  {
    category: "Frontend",
    icon: Layout,
    color: "oklch(0.68 0.16 55)",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend & Database",
    icon: Database,
    color: "oklch(0.55 0.1 190)",
    skills: ["Node.js", "Express.js", "REST APIs", "Supabase / PostgreSQL", "MongoDB"],
  },
  {
    category: "Tools & Deployment",
    icon: GitBranch,
    color: "oklch(0.58 0.13 140)",
    skills: ["Git", "GitHub", "Postman", "Vercel"],
  },
  {
    category: "AI & Workflows",
    icon: Bot,
    color: "oklch(0.62 0.18 15)",
    skills: ["Agentic AI Tools", "Prompt Engineering", "LLM API Integration"],
  },
]

// The two main projects — seeded into the database.
export type SeedProject = {
  title: string
  category: string
  year: string
  headline: string
  problem: string
  features: string[]
  role: string
  challenges: string[]
  tech: string[]
  demoUrl: string
  repoUrl: string
  accent: string
  thumbnail: string
  featured: boolean
  order: number
}

export const PROJECT_SEEDS: SeedProject[] = [
  {
    title: "NutriFit Platform",
    category: "Full-Stack",
    year: "2024",
    headline: "A nutrition & fitness app that turns messy meal tracking into clear, visual progress.",
    problem:
      "Most people give up on nutrition tracking because spreadsheets are tedious and fitness apps feel bloated. NutriFit keeps logging fast and shows your progress at a glance, so the habit actually sticks.",
    features: [
      "Log meals and macros in seconds with a simple food search",
      "Personalized calorie & macro targets calculated from your stats",
      "Live progress charts that update the moment you log a meal",
      "Daily goal tracking with streaks to keep you consistent",
    ],
    role:
      "I designed the full-stack architecture end to end — the database schema for foods, meals and goals; the REST API endpoints for logging and retrieval; and the macro-calculation logic based on the Mifflin-St Jeor equation. I used AI tools to speed up scaffolding and debugging while reviewing every line of generated code.",
    challenges: [
      "Fixed state-sync lag where charts weren't reflecting newly logged meals — switched to optimistic updates so the UI updates instantly.",
      "Resolved API validation edge cases where malformed meal data crashed the log endpoint.",
    ],
    tech: ["React.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
    demoUrl: "#",
    repoUrl: "#",
    accent: "oklch(0.58 0.13 140)",
    thumbnail: "/project-nutrifit.png",
    featured: true,
    order: 0,
  },
  {
    title: "AI Expense Tracker PWA",
    category: "Full-Stack",
    year: "2024",
    headline: "A Progressive Web App that logs expenses on the go and auto-categorizes them with AI.",
    problem:
      "Manual expense tracking fails because categorizing each transaction is boring — so people skip it and lose the picture. This PWA lets you log in seconds and hands the categorization to an LLM.",
    features: [
      "Quick expense logging with amount, note and date",
      "AI-powered auto-categorization using LLM API integration",
      "Spending dashboard with category breakdowns and trends",
      "Offline-first PWA that works without a connection and syncs later",
    ],
    role:
      "I designed the PWA architecture (service worker, offline storage), set up the database for transactions, and structured the LLM prompts that categorize expenses. I integrated the LLM API, handled the AI responses safely, and debugged alongside AI tools throughout the build.",
    challenges: [
      "Resolved offline-sync conflicts where duplicate expenses appeared after reconnecting — added idempotency keys to dedupe safely.",
      "Fixed unreliable LLM categorization by tightening the prompt structure and validating API responses before using them.",
    ],
    tech: ["React.js", "Node.js", "LLM API", "Supabase", "Tailwind CSS", "PWA"],
    demoUrl: "#",
    repoUrl: "#",
    accent: "oklch(0.55 0.1 190)",
    thumbnail: "/project-expense.png",
    featured: true,
    order: 1,
  },
]

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Playground", href: "#playground" },
  { label: "Code", href: "#code" },
  { label: "Contact", href: "#contact" },
]

export const MARQUEE_ITEMS = [
  "HTML5", "CSS3", "JavaScript", "React.js", "TypeScript", "Tailwind CSS",
  "Node.js", "Express.js", "REST APIs", "Supabase", "PostgreSQL", "MongoDB",
  "Git", "GitHub", "Postman", "Vercel", "LLM APIs", "Prompt Engineering",
]
