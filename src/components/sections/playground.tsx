'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { Play, RotateCcw, Terminal as TerminalIcon, Calculator, Activity, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

const STARTER_CODE = `// This code runs in your browser. Edit me!
const fib = (n) => {
  if (n < 2) return n
  let [a, b] = [0, 1]
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b]
  return b
}

const sequence = Array.from({ length: 10 }, (_, i) => fib(i))
console.log("First 10 Fibonacci numbers:")
console.log(sequence)

const sum = sequence.reduce((a, b) => a + b, 0)
console.log("Sum:", sum)
console.log("Average:", (sum / sequence.length).toFixed(2))
`

type LogLine = { kind: "log" | "error" | "info"; text: string }

export function Playground() {
  return (
    <section id="playground" className="relative py-24 sm:py-28 border-y border-border/40 bg-muted/20">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 relative">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-mono text-sm text-primary mb-2">{"// playground"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Don&apos;t just read — <span className="gradient-text">run it.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            A live JavaScript sandbox and a nutrition calculator. Everything here executes in your
            browser, proving the code actually works.
          </p>
        </Reveal>

        <Tabs defaultValue="sandbox" className="w-full">
          <TabsList className="mx-auto mb-6 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="sandbox" className="gap-1.5">
              <TerminalIcon className="h-3.5 w-3.5" /> JS Sandbox
            </TabsTrigger>
            <TabsTrigger value="calc" className="gap-1.5">
              <Calculator className="h-3.5 w-3.5" /> Macro Calc
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sandbox">
            <JSSandbox />
          </TabsContent>
          <TabsContent value="calc">
            <MacroCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

/* ----------------------------- JS Sandbox ----------------------------- */

function JSSandbox() {
  const [code, setCode] = React.useState(STARTER_CODE)
  const [logs, setLogs] = React.useState<LogLine[]>([])
  const [running, setRunning] = React.useState(false)

  const run = () => {
    setRunning(true)
    setLogs([])
    const collected: LogLine[] = []
    const stringify = (args: unknown[]) =>
      args
        .map((a) => {
          if (typeof a === "string") return a
          try {
            return JSON.stringify(a, null, 2)
          } catch {
            return String(a)
          }
        })
        .join(" ")

    const sandboxConsole = {
      log: (...args: unknown[]) => collected.push({ kind: "log", text: stringify(args) }),
      info: (...args: unknown[]) => collected.push({ kind: "info", text: stringify(args) }),
      error: (...args: unknown[]) => collected.push({ kind: "error", text: stringify(args) }),
      warn: (...args: unknown[]) => collected.push({ kind: "error", text: stringify(args) }),
    }

    // Small delay so the running state is perceptible
    setTimeout(() => {
      try {
        const fn = new Function("console", `"use strict";\n${code}`)
        fn(sandboxConsole)
        if (collected.length === 0) {
          collected.push({ kind: "info", text: "✓ Ran with no output. Try console.log(...)" })
        }
      } catch (err) {
        collected.push({
          kind: "error",
          text: `${err instanceof Error ? err.name : "Error"}: ${err instanceof Error ? err.message : String(err)}`,
        })
      }
      setLogs(collected)
      setRunning(false)
    }, 150)
  }

  const reset = () => {
    setCode(STARTER_CODE)
    setLogs([])
  }

  const lineCount = code.split("\n").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        {/* Editor toolbar */}
        <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-muted/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">sandbox.js</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={reset} className="gap-1.5 text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
            <Button size="sm" onClick={run} disabled={running} className="gap-1.5">
              <Play className="h-3.5 w-3.5" /> {running ? "Running…" : "Run"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Editor */}
          <div className="relative">
            <div className="flex">
              {/* line numbers */}
              <pre
                aria-hidden
                className="select-none py-4 px-3 text-right font-mono text-xs text-muted-foreground/50 bg-muted/20 border-r border-border/40 min-w-[3rem]"
              >
                {Array.from({ length: Math.max(lineCount, 18) }, (_, i) => i + 1).join("\n")}
              </pre>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full resize-none bg-transparent p-4 font-mono text-xs sm:text-[13px] leading-[1.6] outline-none min-h-[340px] text-foreground"
                placeholder="// write some JavaScript…"
              />
            </div>
          </div>

          {/* Output */}
          <div className="border-t lg:border-t-0 lg:border-l border-border/50 bg-black/30 dark:bg-black/40">
            <div className="flex items-center gap-2 border-b border-border/40 px-4 py-2">
              <TerminalIcon className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">output</span>
            </div>
            <div className="p-4 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[340px] max-h-[420px] overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-muted-foreground/60">
                  <span className="text-primary">$</span> Press{" "}
                  <span className="rounded bg-muted px-1.5 py-0.5">Run</span> to execute the code →
                </p>
              ) : (
                logs.map((log, i) => (
                  <pre
                    key={i}
                    className={cn(
                      "whitespace-pre-wrap break-words",
                      log.kind === "error"
                        ? "text-red-400"
                        : log.kind === "info"
                        ? "text-emerald-400"
                        : "text-foreground/90"
                    )}
                  >
                    {log.text}
                  </pre>
                ))
              )}
            </div>
          </div>
        </div>
      </Card>
      <p className="mt-3 text-xs text-muted-foreground font-mono text-center">
        ⚡ Code runs locally in your browser via <code>new Function()</code> — no server round-trip.
      </p>
    </motion.div>
  )
}

/* --------------------------- Macro Calculator --------------------------- */

function MacroCalculator() {
  const [age, setAge] = React.useState(28)
  const [height, setHeight] = React.useState(175) // cm
  const [weight, setWeight] = React.useState(72) // kg
  const [sex, setSex] = React.useState<"male" | "female">("male")
  const [activity, setActivity] = React.useState(1.55)
  const [goal, setGoal] = React.useState<"cut" | "maintain" | "bulk">("maintain")

  // Mifflin-St Jeor BMR
  const bmr = React.useMemo(() => {
    const base = 10 * weight + 6.25 * height - 5 * age
    return sex === "male" ? base + 5 : base - 161
  }, [age, height, weight, sex])

  const tdee = bmr * activity
  const target = goal === "cut" ? tdee - 450 : goal === "bulk" ? tdee + 350 : tdee

  // Macro split: protein 1.8g/kg, fat 25% of cals, rest carbs
  const protein = Math.round(weight * 1.8)
  const fat = Math.round((target * 0.25) / 9)
  const carbs = Math.round((target - protein * 4 - fat * 9) / 4)

  // BMI
  const bmi = weight / Math.pow(height / 100, 2)
  const bmiCat =
    bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese"
  const bmiColor =
    bmiCat === "Healthy"
      ? "oklch(0.72 0.16 160)"
      : bmiCat === "Underweight"
      ? "oklch(0.75 0.14 185)"
      : "oklch(0.7 0.2 25)"

  const activityOptions = [
    { label: "Sedentary", value: 1.2, desc: "Little/no exercise" },
    { label: "Light", value: 1.375, desc: "1-3 days/wk" },
    { label: "Moderate", value: 1.55, desc: "3-5 days/wk" },
    { label: "Active", value: 1.725, desc: "6-7 days/wk" },
    { label: "Athlete", value: 1.9, desc: "2x/day training" },
  ]

  const goalOptions = [
    { label: "Cut", value: "cut" as const, emoji: "🔥", desc: "−450 kcal" },
    { label: "Maintain", value: "maintain" as const, emoji: "⚖️", desc: "±0 kcal" },
    { label: "Bulk", value: "bulk" as const, emoji: "💪", desc: "+350 kcal" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="grid lg:grid-cols-5 gap-5"
    >
      {/* Inputs */}
      <Card className="lg:col-span-3 p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Your stats</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Age</Label>
              <span className="font-mono text-sm text-primary">{age}y</span>
            </div>
            <Slider value={[age]} min={15} max={80} step={1} onValueChange={(v) => setAge(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Height</Label>
              <span className="font-mono text-sm text-primary">{height}cm</span>
            </div>
            <Slider value={[height]} min={140} max={210} step={1} onValueChange={(v) => setHeight(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Weight</Label>
              <span className="font-mono text-sm text-primary">{weight}kg</span>
            </div>
            <Slider value={[weight]} min={40} max={140} step={1} onValueChange={(v) => setWeight(v[0])} />
          </div>
          <div className="space-y-2">
            <Label>Sex</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["male", "female"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSex(s)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm capitalize transition-colors",
                    sex === s
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border/60 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Activity level</Label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {activityOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActivity(opt.value)}
                className={cn(
                  "rounded-lg border px-2 py-2 text-center transition-colors",
                  activity === opt.value
                    ? "border-primary bg-primary/10"
                    : "border-border/60 hover:border-primary/40"
                )}
              >
                <div className="text-xs font-medium">{opt.label}</div>
                <div className="text-[10px] text-muted-foreground">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Goal</Label>
          <div className="grid grid-cols-3 gap-2">
            {goalOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setGoal(opt.value)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-center transition-colors",
                  goal === opt.value
                    ? "border-primary bg-primary/10"
                    : "border-border/60 hover:border-primary/40"
                )}
              >
                <div className="text-lg">{opt.emoji}</div>
                <div className="text-xs font-medium">{opt.label}</div>
                <div className="text-[10px] text-muted-foreground">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card className="lg:col-span-2 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Your targets</h3>
        </div>

        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 to-transparent p-5 text-center">
          <p className="font-mono text-xs text-muted-foreground">daily calories</p>
          <p className="text-4xl font-bold font-mono mt-1 text-primary">{Math.round(target)}</p>
          <p className="text-xs text-muted-foreground mt-1">kcal / day</p>
        </div>

        <div className="mt-4 space-y-3">
          <p className="font-mono text-xs text-muted-foreground">{"// macro split"}</p>
          {[
            { label: "Protein", grams: protein, color: "oklch(0.72 0.16 160)", kcal: protein * 4 },
            { label: "Carbs", grams: carbs, color: "oklch(0.78 0.16 80)", kcal: carbs * 4 },
            { label: "Fat", grams: fat, color: "oklch(0.7 0.2 25)", kcal: fat * 9 },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{m.label}</span>
                <span className="font-mono text-muted-foreground">
                  {m.grams}g · {m.kcal} kcal
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  key={`${m.grams}-${goal}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((m.kcal / target) * 100, 100)}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full rounded-full"
                  style={{ background: m.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-border/50 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/50 p-3 text-center">
            <p className="font-mono text-xs text-muted-foreground">BMR</p>
            <p className="text-lg font-bold font-mono">{Math.round(bmr)}</p>
            <p className="text-[10px] text-muted-foreground">at rest</p>
          </div>
          <div className="rounded-xl border border-border/50 p-3 text-center">
            <p className="font-mono text-xs text-muted-foreground">BMI</p>
            <p className="text-lg font-bold font-mono" style={{ color: bmiColor }}>
              {bmi.toFixed(1)}
            </p>
            <p className="text-[10px]" style={{ color: bmiColor }}>{bmiCat}</p>
          </div>
        </div>

        <p className="mt-auto pt-4 text-[11px] text-muted-foreground font-mono">
          Uses Mifflin-St Jeor + activity factors — the same math behind NutriFit.
        </p>
      </Card>
    </motion.div>
  )
}
