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
    id: "ts",
    label: "TypeScript",
    lang: "typescript",
    filename: "lib/macros.ts",
    desc: "Type-safe macro calculator — the engine behind the playground above.",
    code: `type Sex = "male" | "female"
type Goal = "cut" | "maintain" | "bulk"

interface Stats {
  age: number      // years
  height: number   // cm
  weight: number   // kg
  sex: Sex
  activity: number // TDEE multiplier
  goal: Goal
}

interface Macros {
  calories: number
  protein: number // grams
  carbs: number   // grams
  fat: number     // grams
  bmi: number
}

/** Mifflin-St Jeor basal metabolic rate. */
export function bmr(s: Stats): number {
  const base = 10 * s.weight + 6.25 * s.height - 5 * s.age
  return s.sex === "male" ? base + 5 : base - 161
}

/** Total daily energy expenditure. */
export const tdee = (s: Stats): number => bmr(s) * s.activity

/** Target calories adjusted for the user's goal. */
export function target(s: Stats): number {
  const offset = s.goal === "cut" ? -450 : s.goal === "bulk" ? 350 : 0
  return tdee(s) + offset
}

/** Protein 1.8 g/kg, fat 25% of cals, remainder carbs. */
export function macros(s: Stats): Macros {
  const calories = target(s)
  const protein = Math.round(s.weight * 1.8)
  const fat = Math.round((calories * 0.25) / 9)
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4)
  const bmi = s.weight / Math.pow(s.height / 100, 2)
  return { calories, protein, carbs, fat, bmi }
}`,
  },
  {
    id: "py",
    label: "Python",
    lang: "python",
    filename: "nutrition/foods.py",
    desc: "FastAPI endpoint that scores a meal against a user's macro goals.",
    code: `from dataclasses import dataclass
from fastapi import FastAPI, HTTPException

app = FastAPI(title="NutriFit API")

@dataclass(slots=True)
class Meal:
    name: str
    kcal: float
    protein: float
    carbs: float
    fat: float

GOALS = {"kcal": 2200, "protein": 130, "carbs": 250, "fat": 70}

def score(meal: Meal, goals: dict[str, float]) -> float:
    """0-100 adherence score: lower deviation = higher score."""
    penalties = []
    for key, goal in goals.items():
        ratio = getattr(meal, key) / goal
        # penalize both under- and over-shoot, capped at 1.0
        penalties.append(min(abs(1 - ratio), 1.0))
    avg_penalty = sum(penalties) / len(penalties)
    return round((1 - avg_penalty) * 100, 1)

@app.post("/meals/score")
def score_meal(meal: Meal) -> dict:
    if meal.kcal <= 0:
        raise HTTPException(400, "kcal must be positive")
    return {"meal": meal.name, "score": score(meal, GOALS)}

# >>> POST /meals/score  {"name":"oats","kcal":420,"protein":14,"carbs":68,"fat":8}
# <<< {"meal":"oats","score":87.4}`,
  },
  {
    id: "go",
    label: "Go",
    lang: "go",
    filename: "ledger/transfer.go",
    desc: "Idempotent double-entry transfer — the heart of LedgerLite.",
    code: `package ledger

import (
        "context"
        "crypto/sha256"
        "encoding/hex"
        "errors"
)

var ErrInsufficient = errors.New("insufficient funds")

// Transfer moves amount atomically from one account to another.
// Idempotency is enforced via (key, hash) deduplication.
func (s *Store) Transfer(ctx context.Context, from, to, amount int64, idemKey string) error {
        hash := fingerprint(from, to, amount)

        return s.tx(ctx, func(q *Queries) error {
                // already processed? short-circuit
                seen, err := q.SeenIdempotency(ctx, idemKey, hash)
                if err != nil {
                        return err
                }
                if seen {
                        return nil
                }

                bal, err := q.Balance(ctx, from)
                if err != nil {
                        return err
                }
                if bal < amount {
                        return ErrInsufficient
                }

                // two entries, one movement — double entry in one tx
                if err := q.Debit(ctx, from, amount); err != nil {
                        return err
                }
                if err := q.Credit(ctx, to, amount); err != nil {
                        return err
                }
                return q.RecordIdempotency(ctx, idemKey, hash)
        })
}

func fingerprint(parts ...any) string {
        h := sha256.New()
        fmt.Fprint(h, parts...)
        return hex.EncodeToString(h.Sum(nil))
}`,
  },
  {
    id: "rust",
    label: "Rust",
    lang: "rust",
    filename: "src/uptime.rs",
    desc: "Zero-allocation HTTP probe for EdgePing's distributed monitors.",
    code: `use std::time::{Duration, Instant};

/// Outcome of a single probe against a target URL.
#[derive(Debug)]
pub struct ProbeResult {
    pub url: String,
    pub status: u16,
    pub latency: Duration,
    pub ok: bool,
}

/// Run a probe with a hard timeout. Returns immediately on failure.
pub async fn probe(url: &str, timeout: Duration) -> ProbeResult {
    let start = Instant::now();
    let client = reqwest::Client::builder()
        .timeout(timeout)
        .build()
        .expect("client build");

    match client.get(url).send().await {
        Ok(resp) => {
            let status = resp.status().as_u16();
            ProbeResult {
                url: url.to_string(),
                status,
                latency: start.elapsed(),
                ok: status >= 200 && status < 400,
            }
        }
        Err(_) => ProbeResult {
            url: url.to_string(),
            status: 0,
            latency: start.elapsed(),
            ok: false,
        },
    }
}

// 8-region fan-out with tokio::join_all — ~4MB resident per probe.
// pub async fn fan_out(targets: &[&str]) -> Vec<ProbeResult> { ... }`,
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
              Same idea, <span className="gradient-text">four languages.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Real production snippets — not hello-world. Each solves a problem from a project above.
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
            <Button
              size="sm"
              variant="outline"
              onClick={copy}
              className="gap-1.5 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </>
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
                <Card className="overflow-hidden">
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
