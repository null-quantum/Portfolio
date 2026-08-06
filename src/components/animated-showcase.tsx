'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

const SCENE_MS = 6000

const SCENES = [
  { id: "ai", label: "AI Engine" },
  { id: "resume", label: "Resume Screening" },
  { id: "code", label: "Shipping Code" },
] as const

export function AnimatedShowcase() {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SCENES.length), SCENE_MS)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative h-full w-full">
      {/* Scene stage */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={SCENES[index].id}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            {SCENES[index].id === "ai" && <AIScene />}
            {SCENES[index].id === "resume" && <ResumeScene />}
            {SCENES[index].id === "code" && <CodeScene />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scene label + dots */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 pb-1">
        <span className="font-mono text-[11px] text-muted-foreground">
          {"// "}{SCENES[index].label}
        </span>
        <div className="flex gap-1.5">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.label}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 28 : 8,
                background: i === index ? "var(--primary)" : "var(--muted-foreground)",
                opacity: i === index ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- Scene 1: AI ----------------------------- */
/* A neural network: nodes pulse, data packets flow along connections.     */

function AIScene() {
  // node positions in a 320x260 viewbox
  const nodes = [
    { x: 50, y: 60 }, { x: 50, y: 130 }, { x: 50, y: 200 },
    { x: 160, y: 40 }, { x: 160, y: 110 }, { x: 160, y: 180 }, { x: 160, y: 230 },
    { x: 270, y: 80 }, { x: 270, y: 150 }, { x: 270, y: 220 },
  ]
  const layers = [
    [0, 1, 2],
    [3, 4, 5, 6],
    [7, 8, 9],
  ]
  const connections: [number, number][] = []
  layers[0].forEach((a) => layers[1].forEach((b) => connections.push([a, b])))
  layers[1].forEach((a) => layers[2].forEach((b) => connections.push([a, b])))

  return (
    <svg viewBox="0 0 320 270" className="h-full w-full max-h-[360px]" role="img" aria-label="Animated neural network">
      <defs>
        <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* connections */}
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--chart-2)"
          strokeWidth="1"
          className="nn-line"
          style={{ animationDelay: `${(i % 6) * 0.3}s` }}
        />
      ))}

      {/* flowing packets along a few connections */}
      {[3, 7, 11, 14, 18].map((ci, k) => {
        const [a, b] = connections[ci]
        const d = `M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`
        return (
          <circle
            key={`p-${k}`}
            r="3"
            fill="var(--chart-3)"
            className="nn-packet"
            style={
              {
                "--flow-path": `path('${d}')`,
                animationDelay: `${k * 0.5}s`,
              } as React.CSSProperties
            }
          />
        )
      })}

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="14" fill="url(#ai-glow)" />
          <circle
            cx={n.x}
            cy={n.y}
            r="7"
            fill={i % 3 === 0 ? "var(--chart-1)" : i % 3 === 1 ? "var(--chart-2)" : "var(--chart-3)"}
            className="nn-node"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        </g>
      ))}

      {/* AI label */}
      <g transform="translate(160, 250)">
        <rect x="-26" y="-12" width="52" height="22" rx="11" fill="var(--card)" stroke="var(--primary)" strokeWidth="1" />
        <text x="0" y="3" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--primary)" fontWeight="700">AI</text>
      </g>
    </svg>
  )
}

/* -------------------------- Scene 2: Resume -------------------------- */
/* A document with a scan beam moving down, checkmarks appearing.        */

function ResumeScene() {
  return (
    <svg viewBox="0 0 320 270" className="h-full w-full max-h-[360px]" role="img" aria-label="Animated resume screening">
      <defs>
        <linearGradient id="scan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--chart-2)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--chart-2)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* document card */}
      <rect x="70" y="20" width="180" height="230" rx="10" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />

      {/* header band */}
      <rect x="70" y="20" width="180" height="28" rx="10" fill="var(--chart-1)" opacity="0.18" />
      <circle cx="92" cy="34" r="9" fill="var(--chart-1)" opacity="0.5" />
      <rect x="108" y="29" width="70" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.5" />
      <rect x="108" y="38" width="40" height="4" rx="2" fill="var(--muted-foreground)" opacity="0.3" />

      {/* text lines */}
      {[62, 74, 86, 104, 116, 128, 146, 158, 170, 188, 200, 212].map((y, i) => (
        <rect
          key={i}
          x="86"
          y={y}
          width={i % 3 === 0 ? 130 : 100}
          height="4"
          rx="2"
          fill="var(--muted-foreground)"
          opacity={0.28 + (i % 3) * 0.06}
        />
      ))}

      {/* scan beam */}
      <g
        className="scan-beam"
        style={{ "--scan-dist": "200px" } as React.CSSProperties}
      >
        <rect x="70" y="48" width="180" height="3" fill="url(#scan-grad)" />
        <rect x="70" y="48" width="180" height="14" fill="var(--chart-2)" opacity="0.08" />
      </g>

      {/* checkmarks appearing as it scans */}
      {[
        { x: 230, y: 70, d: "0.4s" },
        { x: 230, y: 110, d: "1.1s" },
        { x: 230, y: 150, d: "1.8s" },
        { x: 230, y: 195, d: "2.5s" },
      ].map((c, i) => (
        <g key={i} className="check-pop" style={{ animationDelay: c.d, transformOrigin: `${c.x}px ${c.y}px` } as React.CSSProperties}>
          <circle cx={c.x} cy={c.y} r="8" fill="var(--chart-3)" />
          <path d={`M ${c.x - 3.5} ${c.y} l 2.5 2.5 l 4.5 -5`} stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}

      {/* match score ring */}
      <g transform="translate(40, 135)">
        <circle r="26" fill="none" stroke="var(--border)" strokeWidth="5" />
        <circle
          r="26"
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth="5"
          strokeLinecap="round"
          transform="rotate(-90)"
          strokeDasharray="163"
          className="ring-fill"
        />
        <text x="0" y="-1" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="var(--foreground)" fontWeight="700">94%</text>
        <text x="0" y="12" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="var(--muted-foreground)">MATCH</text>
      </g>

      {/* AI badge */}
      <g transform="translate(225, 25)">
        <rect x="-18" y="-9" width="36" height="18" rx="9" fill="var(--primary)" />
        <text x="0" y="3" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--primary-foreground)" fontWeight="700">AI</text>
      </g>
    </svg>
  )
}

/* --------------------------- Scene 3: Code --------------------------- */
/* A terminal window with lines typing in.                              */

function CodeScene() {
  const lines = [
    { w: "70%", c: "var(--chart-1)", kw: "const" },
    { w: "55%", c: "var(--chart-2)" },
    { w: "80%", c: "var(--muted-foreground)" },
    { w: "65%", c: "var(--chart-3)" },
    { w: "72%", c: "var(--chart-2)" },
    { w: "45%", c: "var(--chart-1)" },
  ]
  return (
    <div className="w-full max-w-[340px] rounded-xl border border-border/70 bg-card shadow-float overflow-hidden">
      {/* title bar */}
      <div className="flex items-center gap-1.5 border-b border-border/50 px-3 py-2 bg-muted/40">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 font-mono text-[10px] text-muted-foreground">deploy.ts — shipping</span>
      </div>
      {/* code body */}
      <div className="p-4 font-mono text-[11px] leading-relaxed space-y-1.5 min-h-[180px]">
        {lines.map((l, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-muted-foreground/40 w-4 text-right">{i + 1}</span>
            <span className="type-line" style={{ "--line-w": l.w, color: l.c, animationDelay: `${i * 0.5}s` } as React.CSSProperties}>
              {l.kw ? `${l.kw} build = ` : ""}
              {"█".repeat(Math.round(parseFloat(l.w) / 6))}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-muted-foreground/40 w-4 text-right">$</span>
          <span className="text-primary">deploy</span>
          <span className="code-cursor inline-block h-3 w-1.5 bg-primary" />
        </div>
        <div className="flex items-center gap-1.5 pt-1 text-[10px] text-emerald-500">
          <span>✓</span> built &amp; deployed to Vercel
        </div>
      </div>
    </div>
  )
}
