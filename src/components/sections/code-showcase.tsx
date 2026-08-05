'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy, Check, Code2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"

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
    id: "express",
    label: "Express API",
    lang: "javascript",
    filename: "server/routes/expenses.js",
    desc: "A REST endpoint that logs an expense with validation — the kind of route the Expense Tracker PWA calls.",
    code: `import express from "express";
import { z } from "zod";

const router = express.Router();

const expenseSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  note: z.string().min(1).max(120),
  category: z.string().optional(),
  date: z.string().datetime().optional(),
});

// POST /api/expenses — log a new expense
router.post("/", async (req, res) => {
  const parsed = expenseSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues[0]?.message,
    });
  }

  const expense = await db.expense.create({
    data: {
      ...parsed.data,
      date: parsed.data.date ?? new Date().toISOString(),
      userId: req.user.id,
    },
  });

  res.status(201).json({ ok: true, expense });
});

export default router;`,
  },
  {
    id: "react",
    label: "React + TS",
    lang: "tsx",
    filename: "components/ExpenseForm.tsx",
    desc: "A controlled React form with TypeScript — the quick-log input from the Expense Tracker.",
    code: `import { useState } from "react";

interface ExpenseFormProps {
  onSubmit: (expense: { amount: number; note: string }) => Promise<void>;
}

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ amount: Number(amount), note });
      setAmount("");
      setNote("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Log"}
      </button>
    </form>
  );
}`,
  },
  {
    id: "supabase",
    label: "Supabase",
    lang: "javascript",
    filename: "lib/expenses.js",
    desc: "Fetching a user's spending grouped by category from Supabase/PostgreSQL for the dashboard.",
    code: `import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Get this month's spend grouped by category
export async function getMonthlyBreakdown(userId) {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("expenses")
    .select("amount, category")
    .eq("user_id", userId)
    .gte("date", startOfMonth.toISOString());

  if (error) throw error;

  // aggregate in JS — small result set
  const byCategory = data.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});

  return byCategory;
}`,
  },
  {
    id: "llm",
    label: "LLM Integration",
    lang: "javascript",
    filename: "lib/categorize.js",
    desc: "Auto-categorizing an expense with a structured LLM prompt — the AI core of the Expense Tracker.",
    code: `// Auto-categorize an expense using an LLM API.
// The prompt is tightly structured so the model returns clean JSON.

const CATEGORIES = ["food", "transport", "bills", "shopping", "other"];

export async function categorizeExpense({ amount, note }) {
  const prompt = [
    "You are an expense categorizer.",
    "Categorize this expense into exactly ONE of: " + CATEGORIES.join(", ") + ".",
    'Expense: "' + note + '" (amount: ' + amount + ")",
    "",
    'Respond ONLY as JSON: {"category": "<one of the categories>"}',
  ].join("\\n");

  const res = await fetch(process.env.LLM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.LLM_API_KEY,
    },
    body: JSON.stringify({ prompt, temperature: 0 }),
  });

  const json = await res.json();
  const text = json.choices[0].message.content;
  const parsed = JSON.parse(text);

  // validate before trusting the AI output
  return CATEGORIES.includes(parsed.category) ? parsed.category : "other";
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
        <Reveal direction="up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <p className="font-mono text-sm text-primary">{"// code"}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Real snippets, <span className="gradient-text">my real stack.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Each one is the actual pattern behind a piece of my projects. Copy whatever helps.
          </p>
        </Reveal>

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
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                      customStyle={{ margin: 0, background: "transparent", padding: "1rem 1.25rem", fontSize: "13px" }}
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
