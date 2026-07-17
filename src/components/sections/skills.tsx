'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { SKILL_GROUPS } from "@/lib/portfolio-data"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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
          style={{
            background: `linear-gradient(90deg, ${color}, ${color})`,
            boxShadow: `0 0 12px ${color}55`,
          }}
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

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28 border-y border-border/40 bg-muted/20">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="font-mono text-sm text-primary mb-2">{"// skills"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            The toolbox, <span className="gradient-text">by category</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Hover any bar to see how I actually use each tool day to day.
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
                <Card className="p-6 h-full hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl"
                      style={{ backgroundColor: `${group.color}1a`, color: group.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{group.category}</h3>
                      <p className="text-xs text-muted-foreground font-mono">
                        {group.skills.length} core tools
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

        {/* Language fluency strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="sm:w-48 shrink-0">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Language fluency
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Lines I&apos;m comfortable writing without docs.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { lang: "TypeScript", yrs: "4y", pct: 95 },
                  { lang: "Python", yrs: "5y", pct: 82 },
                  { lang: "Go", yrs: "2y", pct: 68 },
                  { lang: "Rust", yrs: "1y", pct: 55 },
                  { lang: "SQL", yrs: "6y", pct: 88 },
                  { lang: "Bash", yrs: "6y", pct: 75 },
                ].map((l) => (
                  <div
                    key={l.lang}
                    className={cn(
                      "rounded-xl border border-border/60 bg-background/60 p-3 hover:border-primary/40 transition-colors text-center"
                    )}
                  >
                    <div className="font-mono text-sm font-semibold">{l.lang}</div>
                    <div className="text-[11px] text-muted-foreground">{l.yrs}</div>
                    <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
