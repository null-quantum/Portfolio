'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Github, Linkedin, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { PROFILE } from "@/lib/portfolio-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Reveal } from "@/components/reveal"

type Status = "idle" | "loading" | "success" | "error"

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle")
  const [errorMsg, setErrorMsg] = React.useState("")
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    }

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setStatus("error")
        setErrorMsg(json.error ?? "Failed to send message")
        toast({ title: "Couldn't send message", description: json.error ?? "Please try again.", variant: "destructive" })
        return
      }
      setStatus("success")
      form.reset()
      toast({ title: "Message sent! 🎉", description: json.message ?? "I'll get back to you soon.", })
      setTimeout(() => setStatus("idle"), 4000)
    } catch {
      setStatus("error")
      setErrorMsg("Network error — please check your connection.")
      toast({ title: "Network error", description: "Please check your connection and try again.", variant: "destructive" })
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-28 border-t border-border/40 bg-muted/30">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px] -z-10" />

      <div className="mx-auto max-w-5xl px-4 relative">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-mono text-sm text-primary mb-2">{"// contact"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Let&apos;s <span className="gradient-text">talk.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Hiring for a junior role, or just want to chat about a project? My inbox is open.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Info side */}
          <Reveal direction="left" className="lg:col-span-2 space-y-4">
            <Card className="p-6 space-y-5">
              <div>
                <h3 className="font-semibold mb-1">Reach me directly</h3>
                <p className="text-sm text-muted-foreground">Email is the fastest — I reply within a day.</p>
              </div>

              {/* Email in plain text */}
              <div className="space-y-3">
                <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 group">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {PROFILE.email}
                  </span>
                </a>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-muted-foreground">{PROFILE.location}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-mono">{"// find me online"}</p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="gap-1.5">
                    <a href={PROFILE.github} target="_blank" rel="noreferrer">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="gap-1.5">
                    <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
              <p className="font-mono text-xs text-primary mb-1">$ status --availability</p>
              <p className="text-sm">
                Open to <span className="font-semibold text-primary">full-stack developer roles</span> at startups &amp; MNCs — internships and full-time.
              </p>
            </Card>
          </Reveal>

          {/* Form side */}
          <Reveal direction="right" className="lg:col-span-3">
            <Card className="p-6 sm:p-8">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Your name" disabled={status === "loading"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" disabled={status === "loading"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message" name="message" required rows={6}
                    placeholder="Tell me about the role or project…"
                    disabled={status === "loading"} className="resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}
                {status === "success" && (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Message sent! I&apos;ll be in touch soon.
                  </div>
                )}

                <Button type="submit" disabled={status === "loading"} className="w-full gap-2" size="lg">
                  {status === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send message</>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground font-mono">
                  POST /api/contact → saved to database
                </p>
              </form>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
