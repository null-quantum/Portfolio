'use client'

import { motion } from "framer-motion"
import { BookOpen, Briefcase, Wrench } from "lucide-react"
import { PROFILE } from "@/lib/portfolio-data"
import { useCountUp } from "@/hooks/use-count-up"
import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"

function StatCard({
  stat,
  index,
}: {
  stat: { label: string; value: number; suffix: string; decimals?: number }
  index: number
}) {
  const { ref, display } = useCountUp(stat.value, 1500, stat.decimals ?? 0)
  const icons = [Briefcase, Wrench, BookOpen]
  const Icon = icons[index % icons.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="relative overflow-hidden p-5 card-lift hover:border-primary/40">
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/8" />
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
        <Reveal direction="up" className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="font-mono text-sm text-primary">{"// about me"}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Junior dev, <br className="hidden sm:block" />
              <span className="gradient-text">built different.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {PROFILE.bio.map((sentence, i) => (
              <p key={i}>{sentence}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PROFILE.stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
