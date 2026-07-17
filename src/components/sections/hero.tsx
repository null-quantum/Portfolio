'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, MapPin, Sparkles } from "lucide-react"
import { PROFILE, MARQUEE_ITEMS } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"

const ROLES = [
  "full-stack developer",
  "TypeScript architect",
  "real-time systems builder",
  "UI/UX craftsperson",
  "API designer",
]

function useTypewriter(words: string[], typeSpeed = 80, deleteSpeed = 40, pause = 1600) {
  const [text, setText] = React.useState("")
  const [wordIndex, setWordIndex] = React.useState(0)
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === "") {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
          )
        },
        deleting ? deleteSpeed : typeSpeed
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause])

  return text
}

export function Hero() {
  const typed = useTypewriter(ROLES)

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-chart-2/15 blur-[100px]" />

      <div className="mx-auto max-w-6xl w-full px-4 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left: intro */}
        <div className="lg:col-span-7 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for new projects
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="space-y-3"
          >
            <p className="font-mono text-sm text-primary">{`> whoami`}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Hi, I&apos;m <span className="gradient-text">{PROFILE.name}</span>.
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-semibold">
                a{" "}
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                {typed}
                <span className="cursor-blink text-primary">▋</span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {PROFILE.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a href="#projects">
              <Button size="lg" className="rounded-full gap-2 group">
                Explore my work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </a>
            <a href="#playground">
              <Button size="lg" variant="outline" className="rounded-full gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Try the live playground
              </Button>
            </a>
            <div className="flex items-center gap-1">
              <Button asChild variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono"
          >
            <MapPin className="h-3.5 w-3.5" />
            {PROFILE.location}
          </motion.div>
        </div>

        {/* Right: terminal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="gradient-border scanline relative overflow-hidden shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3 bg-muted/40">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">aarav@portfolio: ~/intro</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed space-y-1.5">
              <p><span className="text-muted-foreground">$</span> <span className="text-primary">cat</span> profile.json</p>
              <pre className="text-xs sm:text-[13px] leading-relaxed text-foreground/90 whitespace-pre-wrap">
{`{
  `}<span className="text-chart-3">"role"</span>{`: `}<span className="text-chart-2">"Full-Stack Developer"</span>{`,
  `}<span className="text-chart-3">"stack"</span>{`: [`}<span className="text-chart-2">"Next.js"</span>{`, `}<span className="text-chart-2">"TS"</span>{`, `}<span className="text-chart-2">"Postgres"</span>{`],
  `}<span className="text-chart-3">"focus"</span>{`: `}<span className="text-chart-2">"interactive UIs & APIs"</span>{`,
  `}<span className="text-chart-3">"shipped"</span>{`: `}<span className="text-chart-4">40</span>{`+,
  `}<span className="text-chart-3">"fun_fact"</span>{`: `}<span className="text-chart-2">"this site runs itself"</span>{`
}`}
              </pre>
              <p className="pt-2"><span className="text-muted-foreground">$</span> <span className="text-primary">./run</span> portfolio<span className="cursor-blink text-primary">▋</span></p>
              <p className="text-emerald-500">✓ compiled in 0.42s — welcome!</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 inset-x-0 border-y border-border/40 bg-background/40 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-mono text-sm text-muted-foreground/70 flex items-center gap-2">
              <span className="text-primary/60">▹</span> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
