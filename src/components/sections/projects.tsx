'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Github, Star, Check } from "lucide-react"
import { PROJECTS, type Project } from "@/lib/portfolio-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const FILTERS = ["All", "Full-Stack", "Frontend", "Backend", "AI"] as const
type Filter = (typeof FILTERS)[number]

export function Projects() {
  const [filter, setFilter] = React.useState<Filter>("All")
  const [selected, setSelected] = React.useState<Project | null>(null)

  const featured = PROJECTS.find((p) => p.featured)!
  const rest = PROJECTS.filter((p) => !p.featured)
  const filtered = filter === "All" ? rest : rest.filter((p) => p.category === filter)

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
              Things I&apos;ve <span className="gradient-text">built & shipped</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            From health platforms to distributed monitors. Click any card for the full case study.
          </p>
        </motion.div>

        {/* Featured project */}
        <FeaturedProject project={featured} onOpen={() => setSelected(featured)} />

        {/* Filter bar */}
        <div className="mt-14 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground mr-1">filter:</span>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all border",
                filter === f
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 bg-background/50"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
            ))}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && (
          <div className="mt-10 text-center text-muted-foreground font-mono text-sm py-10 border border-dashed border-border/60 rounded-2xl">
            no projects in this category yet — come back soon!
          </div>
        )}
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function FeaturedProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const Icon = project.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <Card
        className="relative overflow-hidden cursor-pointer group hover:border-primary/40 transition-all"
        onClick={onOpen}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-[100px] opacity-30"
          style={{ background: project.accent }}
        />
        <div className="relative grid lg:grid-cols-2 gap-0">
          {/* Visual side */}
          <div className="relative p-8 lg:p-10 flex flex-col justify-between min-h-[280px]">
            <div className="flex items-start justify-between">
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl shadow-lg"
                style={{ backgroundColor: `${project.accent}22`, color: project.accent }}
              >
                <Icon className="h-7 w-7" />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1 font-mono text-xs">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  Featured
                </Badge>
                <Badge variant="outline" className="font-mono text-xs">{project.year}</Badge>
              </div>
            </div>
            <div className="mt-8">
              <p className="font-mono text-xs text-muted-foreground mb-1">{project.category}</p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{project.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed max-w-md">{project.blurb}</p>
            </div>
          </div>

          {/* Details side */}
          <div className="p-8 lg:p-10 bg-muted/30 border-t lg:border-t-0 lg:border-l border-border/50 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs text-muted-foreground mb-3">{"// key metrics"}</p>
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-border/50 bg-background/60 p-3"
                  >
                    <div className="text-xl font-bold font-mono" style={{ color: project.accent }}>
                      {m.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="font-mono text-[11px] font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
              <Button className="w-full gap-2 group/btn">
                Read case study
                <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const Icon = project.icon
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
    >
      <Card
        className="group h-full cursor-pointer overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
        onClick={onOpen}
      >
        <div className="relative h-32 overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div
            className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full blur-[50px] opacity-40"
            style={{ background: project.accent }}
          />
          <div className="absolute inset-0 flex items-center justify-between p-5">
            <div
              className="grid h-12 w-12 place-items-center rounded-xl shadow-lg"
              style={{ backgroundColor: `${project.accent}22`, color: project.accent }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex gap-1.5">
              <Badge variant="outline" className="font-mono text-[10px]">{project.category}</Badge>
            </div>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold">{project.title}</h3>
            <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {project.blurb}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 3).map((t) => (
                <Badge key={t} variant="secondary" className="font-mono text-[10px] font-normal">
                  {t}
                </Badge>
              ))}
              {project.tech.length > 3 && (
                <span className="font-mono text-[10px] text-muted-foreground self-center">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const Icon = project?.icon
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        {project && Icon && (
          <>
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl shadow-lg"
                  style={{ backgroundColor: `${project.accent}22`, color: project.accent }}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-xl">{project.title}</DialogTitle>
                    <Badge variant="outline" className="font-mono text-xs">{project.year}</Badge>
                  </div>
                  <DialogDescription className="text-sm">
                    {project.category} project
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5 mt-2">
              <p className="text-sm leading-relaxed">{project.description}</p>

              <div>
                <p className="font-mono text-xs text-primary mb-2">{"// highlights"}</p>
                <ul className="space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs text-primary mb-2">{"// metrics"}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg border border-border/50 bg-muted/40 p-2.5 text-center">
                      <div className="text-lg font-bold font-mono" style={{ color: project.accent }}>
                        {m.value}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-xs text-primary mb-2">{"// tech stack"}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="font-mono text-xs font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {project.links.demo && (
                  <Button asChild className="gap-2 flex-1">
                    <a href={project.links.demo} target="_blank" rel="noreferrer">
                      <ArrowUpRight className="h-4 w-4" /> Live demo
                    </a>
                  </Button>
                )}
                {project.links.repo && (
                  <Button asChild variant="outline" className="gap-2 flex-1">
                    <a href={project.links.repo} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" /> Source
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
