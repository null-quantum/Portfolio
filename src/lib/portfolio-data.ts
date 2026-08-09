import type { LucideIcon } from "lucide-react"
import { Bot, Database, GitBranch, Layout } from "lucide-react"

export const PROFILE = {
  name: "Dhruvendra Patel",
  shortName: "dhruv",
  role: "Junior Full-Stack Developer",
  subtitle: "React, Node.js & AI-Driven Workflows",
  tagline: "I build functional, real-world web apps end to end.",
  // Item 1: location confirmed by user as Noida, UP (Delhi NCR).
  location: "Noida, UP, India",
  // TODO(ITEM-1): The three values below are PLACEHOLDERS — confirm & replace
  // with the real URLs/email before deploying. Do NOT ship these as-is.
  email: "dhruvpatel.dev@gmail.com", // TODO: confirm real email
  github: "https://github.com/dhruv", // TODO: confirm real GitHub profile URL
  linkedin: "https://linkedin.com/in/dhruvendrapatel", // TODO: confirm real LinkedIn URL
  resume: "/resume.pdf",
  // Professional 3-sentence About summary.
  bio: [
    "I'm a junior full-stack developer with hands-on experience building web applications using React, Node.js, and modern JavaScript, working across the stack from responsive interfaces to REST APIs and databases.",
    "I'm proficient with modern tech stacks — React, TypeScript, Tailwind, Express, PostgreSQL and MongoDB — and I'm comfortable integrating AI-driven workflows like LLM APIs and prompt engineering into real products.",
    "I'm genuinely enthusiastic about building functional, real-world software, and I learn fastest by shipping projects that solve actual problems.",
  ],
  // Item 4: real numbers only. "Chai" joke stat removed.
  // TODO(ITEM-4): confirm "Months hands-on coding" — temp value 14, replace with real number.
  stats: [
    { label: "Projects built end-to-end", value: 2, suffix: "" },
    { label: "Technologies in my stack", value: 18, suffix: "" },
    { label: "Months hands-on coding", value: 14, suffix: "+" },
  ],
}

// Categorized tech stack — NO percentage bars, just clear groups.
// Item 4 note: technologies count = 6 + 5 + 4 + 3 = 18 (matches stat above).
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

// Two real, deployed projects. Static data — no database.
// Source of truth: the actual GitHub repositories (do not invent features/tech).
export type Project = {
  title: string
  description: string
  tech: string[]
  demoUrl: string
  repoUrl: string
  accent: string
  thumbnail: string
}

export const PROJECTS: Project[] = [
  {
    title: "NutriFit",
    description:
      "AI-powered nutrition and fitness platform that helps users track meals, understand nutrition, generate personalized workouts, and stay consistent with their fitness goals.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Google Gemini AI", "PWA"],
    demoUrl: "https://nutrifit-pi-beige.vercel.app/",
    repoUrl: "https://github.com/null-quantum/nutrifit",
    accent: "oklch(0.58 0.13 140)",
    thumbnail: "/project-nutrifit.png",
  },
  {
    title: "MoneyFlow",
    description:
      "AI-powered personal finance application that lets users record expenses using natural language, parse bank/UPI SMS messages, and understand their spending through an interactive dashboard.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Google Gemini AI", "Zustand", "PWA"],
    // TODO: user to provide the actual MoneyFlow Vercel URL.
    // Left empty on purpose — do NOT invent a URL. Button renders disabled until set.
    demoUrl: "",
    repoUrl: "https://github.com/null-quantum/moneyflow",
    accent: "oklch(0.55 0.1 190)",
    thumbnail: "/project-expense.png",
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
  "Git", "GitHub", "Postman", "Vercel", "Google Gemini", "PWA",
]
