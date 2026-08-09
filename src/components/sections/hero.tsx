'use client'

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { PROFILE, MARQUEE_ITEMS } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"
import { AnimatedShowcase } from "@/components/animated-showcase"
import { Reveal } from "@/components/reveal"

export function Hero() {
  const { scrollY } = useScroll()
  const blobY = useTransform(scrollY, [0, 600], [0, 120])
  const sceneY = useTransform(scrollY, [0, 600], [0, -50])

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
        className="absolute bottom-1/4 -right-10 -z-10 h-72 w-72 rounded-full blur-[100px] animate-blob"
      >
        <div className="h-full w-full rounded-full" style={{ background: "var(--chart-2)", opacity: 0.2 }} />
      </motion.div>

      <div className="mx-auto max-w-6xl w-full px-4 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left: intro */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal direction="up" duration={0.5}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to Full-Stack Developer roles
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <div className="space-y-3">
              <p className="font-mono text-sm text-primary">Hi, I&apos;m {PROFILE.name}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="gradient-text">{PROFILE.role}</span>
              </h1>
              <p className="text-lg sm:text-2xl text-muted-foreground font-medium">
                {PROFILE.subtitle}
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {PROFILE.tagline} {PROFILE.bio[2]}
            </p>
          </Reveal>

          {/* Primary CTAs */}
          <Reveal direction="up" delay={0.25}>
            <div className="flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" className="btn-blend rounded-full gap-2 group">
                  <a href="#projects">
                    View Projects
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" variant="outline" className="rounded-full gap-2">
                  <a href={PROFILE.resume} download>
                    <Download className="h-4 w-4 text-primary" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </Reveal>

          {/* Social links */}
          <Reveal direction="up" delay={0.32}>
            <div className="flex items-center gap-2">
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
            </div>
          </Reveal>
        </div>

        {/* Right: 2D animated showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{ y: sceneY }}
          className="lg:col-span-5"
        >
          <div className="relative h-[360px] sm:h-[420px]">
            {/* Floating chips around the showcase */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 left-0 z-20 flex items-center gap-3 rounded-2xl border border-border/70 bg-card/90 backdrop-blur p-2 pr-4 shadow-float animate-drift"
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
                <p className="text-[11px] text-muted-foreground font-mono">ready to ship</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-12 right-0 z-20 rounded-2xl border border-border/70 bg-card/90 backdrop-blur p-3 shadow-float font-mono text-[11px] max-w-[220px]"
            >
              <p className="text-foreground/80">
                <span className="text-primary">stack</span> = react · next · ts · node · pg
              </p>
            </motion.div>

            {/* The 2D animated showcase fills the card */}
            <div className="absolute inset-4 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden">
              <AnimatedShowcase />
            </div>
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
