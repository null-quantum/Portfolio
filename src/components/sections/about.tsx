'use client'

import { motion } from "framer-motion"
import { Code2, Coffee, Rocket, Users } from "lucide-react"
import { PROFILE } from "@/lib/portfolio-data"
import { useCountUp } from "@/hooks/use-count-up"
import { Card } from "@/components/ui/card"

function StatCard({
  stat,
  index,
}: {
  stat: { label: string; value: number; suffix: string; decimals?: number }
  index: number
}) {
  const { ref, display } = useCountUp(stat.value, 1600, stat.decimals ?? 0)
  const icons = [Rocket, Code2, Users, Coffee]
  const Icon = icons[index % icons.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Card className="relative overflow-hidden p-5 hover:border-primary/40 transition-colors group">
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
        <Icon className="h-5 w-5 text-primary mb-3" />
        <div className="text-3xl font-bold tracking-tight font-mono">
          <span ref={ref}>{display}</span>
          <span className="text-primary">{stat.suffix}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground leading-snug">{stat.label}</p>
      </Card>
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-5 space-y-5">
            <p className="font-mono text-sm text-primary">{"// about"}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Engineer who ships, <br className="hidden sm:block" />
              <span className="gradient-text">not just prototypes.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              I&apos;m {PROFILE.name}, a {PROFILE.role.toLowerCase()} based in {PROFILE.location}. My
              sweet spot is the seam between a clean, typed API and a delightful frontend — the place
              where good architecture becomes a great user experience.
            </p>
            <p>
              Over the last few years I&apos;ve built nutrition platforms, real-time dashboards, AI
              notetakers, and financial APIs. I care about correctness, performance budgets, and the
              hundred small interactions that make software feel alive.
            </p>
            <p>
              When I&apos;m not shipping, I write about systems design, contribute to open source,
              and over-engineer my own dotfiles.
            </p>
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PROFILE.stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
