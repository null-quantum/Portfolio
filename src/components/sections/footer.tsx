'use client'

import { ArrowUp, Github, Linkedin, Mail, Coffee } from "lucide-react"
import { PROFILE, NAV_ITEMS } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/30 bg-grain">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-mono text-sm font-bold">
                {PROFILE.shortName[0]}
              </span>
              <span className="font-mono text-sm font-semibold">
                {PROFILE.shortName}<span className="text-primary">.dev</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {PROFILE.tagline} Built from scratch with React, Next.js, TypeScript and Tailwind CSS.
            </p>
            <div className="flex gap-1">
              <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <a href={`mailto:${PROFILE.email}`} aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-3">{"// navigate"}</p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer tech list — frontend-focused, matches resume. */}
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-3">{"// built with"}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>React · TypeScript · Tailwind</li>
              <li>Node.js · Express · REST APIs</li>
              <li>Google Gemini API · PWA</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono text-center sm:text-left">
            © {year} {PROFILE.name}. Hand-built with <Coffee className="inline h-3 w-3 text-primary" /> and a lot of chai.
          </p>
          <Button asChild variant="outline" size="sm" className="gap-1.5 rounded-full">
            <a href="#top">
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
