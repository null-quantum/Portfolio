'use client'

import * as React from "react"
import { Loader2, Plus, Sparkles, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

const CATEGORIES = ["Full-Stack", "Frontend", "Backend", "API", "3D", "Animation"] as const
const ACCENTS = [
  { label: "Marigold", value: "oklch(0.68 0.16 55)" },
  { label: "Teal", value: "oklch(0.55 0.1 190)" },
  { label: "Sage", value: "oklch(0.58 0.13 140)" },
  { label: "Terracotta", value: "oklch(0.62 0.18 15)" },
  { label: "Plum", value: "oklch(0.52 0.12 290)" },
]

export function AddProjectDialog({
  onAdded,
  trigger,
}: {
  onAdded: () => void
  trigger: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      title: String(fd.get("title") ?? ""),
      category: String(fd.get("category") ?? "Full-Stack"),
      year: String(fd.get("year") ?? new Date().getFullYear().toString()),
      headline: String(fd.get("headline") ?? ""),
      problem: String(fd.get("problem") ?? ""),
      features: String(fd.get("features") ?? ""),
      role: String(fd.get("role") ?? ""),
      challenges: String(fd.get("challenges") ?? ""),
      tech: String(fd.get("tech") ?? ""),
      demoUrl: String(fd.get("demoUrl") ?? ""),
      repoUrl: String(fd.get("repoUrl") ?? ""),
      accent: String(fd.get("accent") ?? "oklch(0.55 0.1 190)"),
    }

    setLoading(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        toast({ title: "Couldn't save", description: json.error ?? "Please check your inputs.", variant: "destructive" })
        setLoading(false)
        return
      }
      toast({ title: "Project added! 🎉", description: json.message ?? "Saved and now showing on the site." })
      form.reset()
      setOpen(false)
      onAdded()
    } catch {
      toast({ title: "Network error", description: "Please check your connection and try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Add a project
          </DialogTitle>
          <DialogDescription>
            Fill in the case study — it gets saved to the database and shows up here as a full case-study card.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project title *</Label>
              <Input id="title" name="title" required placeholder="My Awesome App" maxLength={80} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input id="year" name="year" required placeholder="2024" defaultValue="2024" maxLength={8} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                name="category"
                defaultValue="Full-Stack"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Accent color</Label>
              <div className="flex flex-wrap gap-2 pt-1">
                {ACCENTS.map((a) => (
                  <label key={a.value} className="cursor-pointer">
                    <input type="radio" name="accent" value={a.value} defaultChecked={a.label === "Teal"} className="sr-only peer" />
                    <span
                      className="block h-7 w-7 rounded-full border-2 border-transparent peer-checked:border-foreground transition-all"
                      style={{ backgroundColor: a.value }}
                      title={a.label}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Headline (one-line real-world purpose)</Label>
            <Input id="headline" name="headline" maxLength={180} placeholder="A web app that turns X into Y." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem">Problem Statement</Label>
            <Textarea id="problem" name="problem" rows={3} maxLength={800}
              placeholder="What exact problem does this app solve?" className="resize-none" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Core Features (one per line)</Label>
            <Textarea id="features" name="features" rows={3} maxLength={800}
              placeholder={"Quick login with OAuth\nDashboard with charts\n..."} className="resize-none" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">My Role &amp; Architecture</Label>
            <Textarea id="role" name="role" rows={3} maxLength={800}
              placeholder="Your role in system design, database setup, prompt structuring, debugging with AI tools…"
              className="resize-none" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenges">Technical Challenges Solved (one per line)</Label>
            <Textarea id="challenges" name="challenges" rows={2} maxLength={800}
              placeholder={"Fixed state sync bug with optimistic updates\nResolved API validation edge cases"}
              className="resize-none" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech">Tech stack *</Label>
            <Input id="tech" name="tech" required placeholder="React.js, Node.js, Express, PostgreSQL" />
            <p className="text-xs text-muted-foreground font-mono">comma-separated</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="demoUrl">Live Demo URL</Label>
              <Input id="demoUrl" name="demoUrl" placeholder="https://…vercel.app" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repoUrl">GitHub URL</Label>
              <Input id="repoUrl" name="repoUrl" placeholder="https://github.com/…" />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
            ) : (
              <><Upload className="h-4 w-4" /> Save &amp; publish</>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground font-mono">
            POST /api/projects → stored in SQLite
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
