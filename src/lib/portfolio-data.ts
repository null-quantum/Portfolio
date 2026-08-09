import type { LucideIcon } from "lucide-react"
import { Bot, Database, GitBranch, Layout } from "lucide-react"

export const PROFILE = {
  name: "Dhruvendra Patel",
  shortName: "dhruv",
  role: "Entry-Level Full-Stack Developer",
  subtitle: "React · Next.js · TypeScript · Node.js · PostgreSQL",
  tagline: "6 Months Industry Experience · 2+ Deployed Projects · MCA 2026",
  // Location confirmed by user as Noida, UP (Delhi NCR).
  location: "Noida, UP, India",
  // Email confirmed by user. LinkedIn left as an editable placeholder —
  // replace the value below with your real LinkedIn URL anytime.
  email: "dhruvpatel.dev@gmail.com",
  github: "https://github.com/null-quantum",
  linkedin: "https://linkedin.com/in/dhruvendra-patel", // ← EDIT ME: replace with real LinkedIn URL
  resume: "/resume.pdf",
  // Honest, professional, human-written About summary.
  bio: [
    "I'm an entry-level full-stack developer who builds real web applications with React, Next.js, TypeScript, Node.js and PostgreSQL. I've completed a 6-month software development internship and I'm currently completing my MCA.",
    "I've built and deployed two live, open-source projects — NutriFit, an AI-powered nutrition platform, and MoneyFlow, an AI-powered personal finance app — both running on Vercel.",
    "I care about clean UI, responsive design, and code that's easy to maintain. I'm open to entry-level full-stack or frontend developer roles.",
  ],
  stats: [
    { label: "Deployed projects", value: 2, suffix: "+" },
    { label: "Months industry experience", value: 6, suffix: "" },
    { label: "MCA Graduate", text: "2026" },
  ],
  experience: [
    {
      role: "Software Development Intern",
      period: "Dec 2022 – Jun 2023",
      duration: "6 months",
    },
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Sandip University",
      period: "2024 – 2026",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "",
      period: "2019 – 2022",
    },
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
    demoUrl: "https://moneyflow-lemon.vercel.app/",
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
