'use client'

import * as React from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { PROFILE, MARQUEE_ITEMS } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"

// Lazy-load the 3D scene so it never blocks first paint.
const Scene3D = dynamic(() => import("@/components/scene-3d").then((m) => m.Scene3D), {
  ssr: false,
  loading: () => (
    <div className="grid place-items-center w-full h-full">
      <div className="h-24 w-24 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow" />
    </div>
  ),
})

export function Hero() {
  const { scrollY } = useScroll()
  const blobY = useTransform(scrollY, [0, 600], [0, 120])
  const sceneY = useTransform(scrollY, [0, 600], [0, -60])

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden">
      {/* Warm mesh background */}
      <div className="absolute inset-0 -z-20 bg-mesh" />
      <div className="absolute inset-0 -z-20 bg-grain opacity-50" />
      <motion.div
        style={{ y: blobY }}
        className="absolute top-1/3 -left-20 -z-10 h-80 w-80 rounded-full bg-primary/25 blur-[110px] animate-blob"
      />
      <motion.div
        style={{ y: blobY }}
        className="absolute bottom-1/4 -right-10 -z-10 h-72 w-72 rounded-full bg-chart-2/20 blur-[100px] animate-blob"
      />

      <div className="mx-auto max-w-6xl w-full px-4 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left: intro */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Open to Junior Developer roles
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="space-y-3"
          >
            <p className="font-mono text-sm text-primary">Hi, I&apos;m {PROFILE.name}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              <span className="gradient-text">{PROFILE.role}</span>
            </h1>
            <p className="text-lg sm:text-2xl text-muted-foreground font-medium">
              {PROFILE.subtitle}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {PROFILE.tagline} {PROFILE.bio[2]}
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a href="#projects">
              <Button size="lg" className="rounded-full gap-2 group">
                View Projects
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </a>
            <a href={PROFILE.resume} download>
              <Button size="lg" variant="outline" className="rounded-full gap-2">
                <Download className="h-4 w-4 text-primary" />
                Download Resume
              </Button>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex items-center gap-2"
          >
            <Button asChild variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-border/50">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-border/50">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-border/50">
              <a href={`mailto:${PROFILE.email}`} aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <span className="ml-1 flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <MapPin className="h-3.5 w-3.5" />
              {PROFILE.location}
            </span>
          </motion.div>
        </div>

        {/* Right: 3D scene + floating chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{ y: sceneY }}
          className="lg:col-span-5"
        >
          <div className="relative h-[360px] sm:h-[420px] scene-3d">
            <div className="absolute inset-0">
              <Scene3D />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 left-0 flex items-center gap-3 rounded-2xl border border-border/70 bg-card/90 backdrop-blur p-2 pr-4 shadow-float"
            >
              <img
                src="/avatar-dhruv.png"
                alt="Illustrated avatar of Dhruvendra Patel"
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl object-cover"
                loading="eager"
              />
              <div className="leading-tight">
                <p className="text-xs font-semibold">{PROFILE.name}</p>
                <p className="text-[11px] text-muted-foreground font-mono">junior · ready to ship</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-3 right-0 rounded-2xl border border-border/70 bg-card/90 backdrop-blur p-3 shadow-float font-mono text-[11px] max-w-[220px]"
            >
              <p className="text-foreground/80">
                <span className="text-primary">stack</span> = react · node · ts · llm-apis
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 inset-x-0 border-y border-border/40 bg-background/50 backdrop-blur-sm py-3 overflow-hidden">
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
