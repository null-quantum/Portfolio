'use client'

import { motion } from "framer-motion"
import { TECH_STACK } from "@/lib/portfolio-data"
import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28 border-y border-border/40 bg-muted/30">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 relative">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-sm text-primary mb-2">{"// tech stack"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Tools I build <span className="gradient-text">with every day</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Organized by where I use them — from the UI all the way to deployment and AI workflows.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {TECH_STACK.map((group, gi) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.55, delay: gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="p-6 h-full card-lift hover:border-primary/30">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl"
                      style={{ backgroundColor: `${group.color}1f`, color: group.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{group.category}</h3>
                      <p className="text-xs text-muted-foreground font-mono">
                        {group.skills.length} {group.skills.length === 1 ? "tool" : "tools"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: gi * 0.05 + si * 0.03 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
