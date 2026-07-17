'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Github, Plus, Loader2, Star, Check, ImageOff } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { useTilt } from "@/hooks/use-tilt"
import { AddProjectDialog } from "@/components/add-project-dialog"

type Project = {
  id: string
  title: string
  category: string
  year: string
  blurb: string
  description: string
  tech: string[]
  highlights: string[]
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
  const [selected, setSelected] = React.useState<Project | null>(null)
  const [filter, setFilter] = React.useState<string>("All")

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

  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter)
  const featured = filtered.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div className="space-y-2">
            <p className="font-mono text-sm text-primary">{"// projects"}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Stuff I&apos;ve <span className="gradient-text">built</span>
            </h2>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-muted-foreground">
              {projects.length} live {projects.length === 1 ? "project" : "projects"} — and you can add your own.
            </p>
            <AddProjectDialog onAdded={load} trigger={
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add a project
              </Button>
            } />
          </div>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-mono text-xs text-muted-foreground mr-1">filter:</span>
          {cats.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all border " +
                (filter === f
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 bg-background/50")
              }
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid place-items-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground font-mono">loading projects…</p>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState onAdded={load} />
        ) : (
          <div className="space-y-6">
            {featured && <FeaturedProject project={featured} onOpen={() => setSelected(featured)} />}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {rest.map((project) => (
                    <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
                  ))}
                </AnimatePresence>
                {/* Add-project CTA card */}
                <AddCtaCard onAdded={load} />
              </div>
            )}
            {!featured && rest.length > 0 && null}
          </div>
        )}
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

/* ----------------------------- Featured card ----------------------------- */

function FeaturedProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const tilt = useTilt(5, 1)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={tilt.style}
        onClick={onOpen}
        className="rounded-xl border bg-card text-card-foreground relative overflow-hidden cursor-pointer group hover:border-primary/40 transition-colors shadow-float"
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-[100px] opacity-25"
          style={{ background: project.accent }}
        />
        <div className="relative grid lg:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="relative min-h-[240px] overflow-hidden border-b lg:border-b-0 lg:border-r border-border/50">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={`${project.title} thumbnail`}
                className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(135deg, ${project.accent}33, transparent)` }}>
                <ImageOff className="h-8 w-8 text-muted-foreground/40" />
              </div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge variant="secondary" className="gap-1 font-mono text-xs backdrop-blur bg-card/80">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> Featured
              </Badge>
            </div>
          </div>

          {/* Details side */}
          <div className="p-7 lg:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono text-xs">{project.category}</Badge>
                <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{project.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{project.blurb}</p>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-2">{"// key numbers"}</p>
                <div className="grid grid-cols-2 gap-2">
                  <Numeral label="Tech used" value={`${project.tech.length}`} accent={project.accent} />
                  <Numeral label="Highlights" value={`${project.highlights.length || "—"}`} accent={project.accent} />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="font-mono text-[11px] font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
              <Button className="w-full gap-2 group/btn">
                Read more
                <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Numeral({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/60 p-3">
      <div className="text-xl font-bold font-mono" style={{ color: accent }}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

/* ----------------------------- Project card ----------------------------- */

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const tilt = useTilt(10, 1.01)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={tilt.style}
        onClick={onOpen}
        className="group h-full cursor-pointer overflow-hidden rounded-xl border bg-card text-card-foreground hover:border-primary/40 transition-colors flex flex-col shadow-float"
      >
        <div className="relative h-36 overflow-hidden border-b border-border/40">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full grid place-items-center"
              style={{ backgroundImage: `linear-gradient(135deg, ${project.accent}40, transparent 70%)` }}
            >
              <div className="text-center">
                <div
                  className="mx-auto mb-1 h-10 w-10 rounded-xl grid place-items-center font-mono font-bold text-lg"
                  style={{ backgroundColor: `${project.accent}22`, color: project.accent }}
                >
                  {project.title[0]}
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/60">your project</span>
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="font-mono text-[10px] backdrop-blur bg-card/70">
              {project.category}
            </Badge>
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
      </motion.div>
    </motion.div>
  )
}

/* ----------------------------- Add CTA card ----------------------------- */

function AddCtaCard({ onAdded }: { onAdded: () => void }) {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
      <AddProjectDialog onAdded={onAdded} trigger={
        <button className="group h-full w-full min-h-[260px] rounded-xl border-2 border-dashed border-border/70 hover:border-primary/50 hover:bg-accent/30 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <Plus className="h-6 w-6" />
          </span>
          <span className="font-medium text-sm">Add your project</span>
          <span className="text-xs text-muted-foreground/70 font-mono">saved to DB → shown here</span>
        </button>
      } />
    </motion.div>
  )
}

/* ----------------------------- Empty state ----------------------------- */

function EmptyState({ onAdded }: { onAdded: () => void }) {
  return (
    <div className="grid place-items-center py-16">
      <div className="text-center max-w-md space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-accent grid place-items-center">
          <Plus className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">No projects here yet</h3>
        <p className="text-sm text-muted-foreground">
          Add your first project — fill in the details and it&apos;ll be saved to the database and shown right here, beautifully.
        </p>
        <AddProjectDialog onAdded={onAdded} trigger={
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add a project
          </Button>
        } />
      </div>
    </div>
  )
}

/* ----------------------------- Dialog ----------------------------- */

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto">
        {project && (
          <>
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-mono font-bold text-lg shadow-lg"
                  style={{ backgroundColor: `${project.accent}22`, color: project.accent }}
                >
                  {project.title[0]}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <DialogTitle className="text-xl">{project.title}</DialogTitle>
                    <Badge variant="outline" className="font-mono text-xs">{project.year}</Badge>
                    {project.featured && (
                      <Badge variant="secondary" className="gap-1 font-mono text-xs">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> Featured
                      </Badge>
                    )}
                  </div>
                  <DialogDescription className="text-sm">{project.category} project</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {project.thumbnail && (
              <div className="relative h-44 sm:h-56 rounded-xl overflow-hidden border border-border/50">
                <img src={project.thumbnail} alt={`${project.title}`} className="object-cover w-full h-full" />
              </div>
            )}

            <div className="space-y-5 mt-2">
              <p className="text-sm leading-relaxed whitespace-pre-line">{project.description}</p>

              {project.highlights.length > 0 && (
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
              )}

              <div>
                <p className="font-mono text-xs text-primary mb-2">{"// tech stack"}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="font-mono text-xs font-normal">{t}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {project.demoUrl && (
                  <Button asChild className="gap-2 flex-1">
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      <ArrowUpRight className="h-4 w-4" /> Live demo
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button asChild variant="outline" className="gap-2 flex-1">
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" /> Source
                    </a>
                  </Button>
                )}
              </div>
              <p className="text-center text-[11px] text-muted-foreground/70 font-mono">
                saved {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
