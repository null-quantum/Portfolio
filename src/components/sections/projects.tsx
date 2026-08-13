'use client'

import { motion } from "framer-motion"
import { Github, Rocket } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PROJECTS, type Project } from "@/lib/portfolio-data"
import { Reveal } from "@/components/reveal"

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal direction="up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <p className="font-mono text-sm text-primary">{"// projects"}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Built &amp; <span className="gradient-text">deployed.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Two real, live applications — open the demo or read the source.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = project.accent
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden shadow-float hover:border-primary/40 transition-colors h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden border-b border-border/50">
          <div
            className="absolute inset-0 grid place-items-center"
            style={{ background: `linear-gradient(160deg, ${accent}1a, transparent 60%, ${accent}10)` }}
          >
            <img
              src={project.thumbnail}
              alt={`${project.title} application thumbnail`}
              className="object-contain h-full w-full p-4"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {project.features.length > 0 && (
            <ul className="mt-3 space-y-1 flex-1">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-[11px] font-normal">
                {t}
              </Badge>
            ))}
          </div>
          {project.backendNote && (
            <p className="mt-2 mb-4 text-xs text-muted-foreground italic">{project.backendNote}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-1">
            {project.demoUrl ? (
              <Button asChild size="sm" className="gap-1.5">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Rocket className="h-3.5 w-3.5" /> Live Demo
                </a>
              </Button>
            ) : (
              <Button size="sm" className="gap-1.5" disabled title="Deployment link coming soon">
                <Rocket className="h-3.5 w-3.5" /> Live Demo (soon)
              </Button>
            )}
            <Button asChild size="sm" variant="outline" className="gap-1.5">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
