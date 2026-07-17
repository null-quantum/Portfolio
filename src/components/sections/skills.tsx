'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { SKILL_GROUPS } from "@/lib/portfolio-data"
import { Card } from "@/components/ui/card"

function SkillBar({
  skill,
  color,
  delay,
}: {
  skill: { name: string; level: number; note: string }
  color: string
  delay: number
}) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {skill.level}%
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color})`, boxShadow: `0 0 10px ${color}55` }}
        />
      </div>
      <motion.p
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
        className="text-xs text-muted-foreground overflow-hidden font-mono"
      >
        {skill.note}
      </motion.p>
    </div>
  )
}

const STACK_PILLS = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript",
  "Node.js", "Framer Motion", "React 3D", "Zustand", "Prisma", "SQLite", "REST API",
]

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28 border-y border-border/40 bg-muted/30">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="font-mono text-sm text-primary mb-2">{"// what I work with"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            The stack I&apos;ve <span className="gradient-text">actually learned</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Hover a bar to see how I tend to use each one. No buzzword padding — these are the tools I reach for.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {SKILL_GROUPS.map((group, gi) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
              >
                <Card className="p-6 h-full card-lift hover:border-primary/30">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl"
                      style={{ backgroundColor: `${group.color}1f`, color: group.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{group.category}</h3>
                      <p className="text-xs text-muted-foreground font-mono">
                        {group.skills.length} tools
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {group.skills.map((skill, si) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        color={group.color}
                        delay={gi * 0.05 + si * 0.04}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Quick stack pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="p-6">
            <p className="font-mono text-xs text-muted-foreground mb-3 text-center">
              {"// the full list, in one breath"}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {STACK_PILLS.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-mono hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
