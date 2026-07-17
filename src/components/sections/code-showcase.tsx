'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy, Check, Code2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

type Sample = {
  id: string
  label: string
  lang: string
  filename: string
  desc: string
  code: string
}

const SAMPLES: Sample[] = [
  {
    id: "next",
    label: "Next.js API",
    lang: "typescript",
    filename: "app/api/meals/route.ts",
    desc: "A typed route handler that logs a meal with validation — the kind of endpoint NutriFit uses.",
    code: `import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().min(1).max(80),
  kcal: z.number().min(0).max(5000),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
  loggedAt: z.string().datetime().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message },
      { status: 400 }
    );
  }

  const meal = await db.meal.create({
    data: {
      ...parsed.data,
      loggedAt: parsed.data.loggedAt ?? new Date().toISOString(),
    },
  });

  return NextResponse.json({ ok: true, id: meal.id });
}`,
  },
  {
    id: "zustand",
    label: "React + Zustand",
    lang: "tsx",
    filename: "store/useMacroStore.ts",
    desc: "A Zustand store for macro goals with a small React hook — the state behind the playground calculator.",
    code: `import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Stats {
  age: number;
  height: number; // cm
  weight: number; // kg
  sex: "male" | "female";
  activity: number;
  goal: "cut" | "maintain" | "bulk";
}

interface MacroState extends Stats {
  set: (patch: Partial<Stats>) => void;
  reset: () => void;
}

export const useMacroStore = create<MacroState>()(
  persist(
    (set) => ({
      age: 22,
      height: 175,
      weight: 72,
      sex: "male",
      activity: 1.55,
      goal: "maintain",
      set: (patch) => set(patch),
      reset: () =>
        set({ age: 22, height: 175, weight: 72, sex: "male", activity: 1.55, goal: "maintain" }),
    }),
    { name: "macro-store" }
  )
);

// Mifflin-St Jeor, the same formula NutriFit uses
export function bmr(s: Stats) {
  const base = 10 * s.weight + 6.25 * s.height - 5 * s.age;
  return s.sex === "male" ? base + 5 : base - 161;
}

export function target(s: Stats) {
  const offset = s.goal === "cut" ? -450 : s.goal === "bulk" ? 350 : 0;
  return bmr(s) * s.activity + offset;
}`,
  },
  {
    id: "prisma",
    label: "Prisma",
    lang: "prisma",
    filename: "prisma/schema.prisma",
    desc: "The NutriFit data model — foods, meals, goals and progress, all related and typed.",
    code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Food {
  id       String  @id @default(cuid())
  name     String
  kcal     Float
  protein  Float
  carbs    Float
  fat      Float
  meals    Meal[]
}

model Meal {
  id        String   @id @default(cuid())
  name      String
  kcal      Float
  protein   Float
  carbs     Float
  fat       Float
  loggedAt  DateTime @default(now())
  foodId    String?
  food      Food?    @relation(fields: [foodId], references: [id])

  @@index([loggedAt])
}

model Goal {
  id        String  @id @default(cuid())
  kcal      Float
  protein   Float
  carbs     Float
  fat       Float
  active    Boolean @default(true)
}`,
  },
  {
    id: "motion",
    label: "Framer Motion",
    lang: "tsx",
    filename: "components/TiltCard.tsx",
    desc: "A reusable tilt-on-hover card with spring physics — the same idea powering the project cards above.",
    code: `import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";

export function TiltCard({ children }: { children: ReactNode }) {
  // raw pointer position (0 → 1)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // springy smoothing so it eases instead of snapping
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  // map 0..1 to a small rotation
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="rounded-2xl border bg-card p-6 shadow-float"
    >
      {children}
    </motion.div>
  );
}`,
  },
]

export function CodeShowcase() {
  const [active, setActive] = React.useState(SAMPLES[0].id)
  const [copied, setCopied] = React.useState(false)
  const sample = SAMPLES.find((s) => s.id === active)!

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sample.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <section id="code" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div className="space-y-2">
            <p className="font-mono text-sm text-primary">{"// code"}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Real snippets, <span className="gradient-text">my real stack.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Each one is the actual pattern behind a piece of this site or NutriFit. Copy whatever helps.
          </p>
        </motion.div>

        <Tabs value={active} onValueChange={setActive} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-4">
              {SAMPLES.map((s) => (
                <TabsTrigger key={s.id} value={s.id} className="font-mono text-xs">
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button size="sm" variant="outline" onClick={copy} className="gap-1.5 shrink-0">
              {copied ? (
                <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</>
              ) : (
                <><Copy className="h-3.5 w-3.5" /> Copy</>
              )}
            </Button>
          </div>

          {SAMPLES.map((s) => (
            <TabsContent key={s.id} value={s.id}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden shadow-float">
                  <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      <span className="font-mono text-xs text-muted-foreground">{s.filename}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground/70 uppercase tracking-wider">
                      {s.lang}
                    </span>
                  </div>
                  <p className="px-4 pt-3 text-xs text-muted-foreground">{s.desc}</p>
                  <div className="overflow-x-auto text-[13px] leading-relaxed">
                    <SyntaxHighlighter
                      language={s.lang}
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        background: "transparent",
                        padding: "1rem 1.25rem",
                        fontSize: "13px",
                      }}
                      codeTagProps={{ style: { fontFamily: "var(--font-jb-mono), monospace" } }}
                      showLineNumbers
                      lineNumberStyle={{ color: "#6b7280", paddingRight: "1rem", userSelect: "none" }}
                    >
                      {s.code}
                    </SyntaxHighlighter>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
