'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUpRight, Github, Plus, Loader2, Rocket, Target, Wrench,
  ListChecks, UserCog, AlertTriangle,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AddProjectDialog } from "@/components/add-project-dialog"

type Project = {
  id: string
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
  createdAt: string
}

export function Projects() {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)

  const load = React.useCallback(async () => {
    try {
      const res = await fetch("/api/projects", { cache: "no-store" })
      const json = await res.json()
      setProjects(json.projects ?? [])
    } catch {
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    load()
  }, [load])

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-2">
            <p className="font-mono text-sm text-primary">{"// projects"}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Case studies, <span className="gradient-text">not just screenshots.</span>
            </h2>
          </div>
          <div className="text-right space-y-2">
            <p className="text-sm text-muted-foreground">
              {projects.length} {projects.length === 1 ? "project" : "projects"} — each with the problem, the build, and the bugs I fixed.
            </p>
            <AddProjectDialog onAdded={load} trigger={
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add a project
              </Button>
            } />
          </div>
        </motion.div>

        {loading ? (
          <div className="grid place-items-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground font-mono">loading projects…</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="grid place-items-center py-16">
            <div className="text-center max-w-md space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent grid place-items-center">
                <Plus className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">No projects yet</h3>
              <AddProjectDialog onAdded={load} trigger={
                <Button className="gap-2"><Plus className="h-4 w-4" /> Add your first project</Button>
              } />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {projects.map((project, i) => (
                <CaseStudyCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}

/* --------------------------- Case study card --------------------------- */

function CaseStudyCard({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1
  const accent = project.accent

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      <Card className="overflow-hidden shadow-float hover:border-primary/40 transition-colors">
        <div className={`grid lg:grid-cols-2 ${reverse ? "lg:[direction:rtl]" : ""}`}>
          {/* Image side */}
          <div className="relative min-h-[240px] lg:min-h-[420px] overflow-hidden border-b lg:border-b-0 border-border/50 [direction:ltr]">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={`${project.title} thumbnail`}
                className="object-cover w-full h-full absolute inset-0"
                loading="lazy"
              />
            ) : (
              <div
                className="w-full h-full grid place-items-center"
                style={{ backgroundImage: `linear-gradient(135deg, ${accent}40, transparent 70%)` }}
              >
                <div className="text-center">
                  <div
                    className="mx-auto mb-2 h-16 w-16 rounded-2xl grid place-items-center font-mono font-bold text-2xl"
                    style={{ backgroundColor: `${accent}22`, color: accent }}
                  >
                    {project.title[0]}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/60">your project</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="secondary" className="font-mono text-xs backdrop-blur bg-card/85 gap-1">
                <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                {project.category}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs backdrop-blur bg-card/85">{project.year}</Badge>
            </div>
          </div>

          {/* Content side */}
          <div className="p-7 sm:p-8 [direction:ltr] flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{project.title}</h3>
            {project.headline && (
              <p className="mt-2 text-base font-medium" style={{ color: accent }}>
                {project.headline}
              </p>
            )}

            {project.problem && (
              <CaseBlock icon={Target} label="Problem Statement" accent={accent}>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
              </CaseBlock>
            )}

            {project.features.length > 0 && (
              <CaseBlock icon={ListChecks} label="Core Features" accent={accent}>
                <ul className="space-y-1.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CaseBlock>
            )}

            {project.role && (
              <CaseBlock icon={UserCog} label="My Role & Architecture" accent={accent}>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.role}</p>
              </CaseBlock>
            )}

            {project.challenges.length > 0 && (
              <CaseBlock icon={AlertTriangle} label="Technical Challenges Solved" accent={accent}>
                <ul className="space-y-1.5">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                      <Wrench className="h-4 w-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </CaseBlock>
            )}

            {/* Tech + actions */}
            <div className="mt-auto pt-5">
              {project.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="font-mono text-[11px] font-normal">{t}</Badge>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" className="gap-1.5">
                  <a href={project.demoUrl || "#"} target="_blank" rel="noreferrer">
                    <Rocket className="h-3.5 w-3.5" /> Live Demo
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="gap-1.5">
                  <a href={project.repoUrl || "#"} target="_blank" rel="noreferrer">
                    <Github className="h-3.5 w-3.5" /> GitHub Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function CaseBlock({
  icon: Icon, label, accent, children,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-4">
      <p className="flex items-center gap-1.5 font-mono text-xs mb-1.5" style={{ color: accent }}>
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      {children}
    </div>
  )
}
