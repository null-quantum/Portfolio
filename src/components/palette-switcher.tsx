'use client'

import * as React from "react"
import { Check } from "lucide-react"
import { usePalette } from "@/hooks/use-palette"
import { cn } from "@/lib/utils"

export function PaletteSwitcher({ compact = false }: { compact?: boolean }) {
  const { palette, setPalette, palettes } = usePalette()
  const [open, setOpen] = React.useState(false)

  if (compact) {
    // Inline row of swatches (for mobile menu / footer)
    return (
      <div className="flex items-center gap-1.5">
        {palettes.map((p) => (
          <button
            key={p.id}
            onClick={() => setPalette(p)}
            aria-label={p.name}
            className={cn(
              "h-6 w-6 rounded-full overflow-hidden ring-2 transition-all",
              palette.id === p.id ? "ring-foreground scale-110" : "ring-transparent hover:ring-border"
            )}
          >
            <span className="flex h-full w-full">
              <span className="h-full flex-1" style={{ background: p.swatch[0] }} />
              <span className="h-full flex-1" style={{ background: p.swatch[1] }} />
              <span className="h-full flex-1" style={{ background: p.swatch[2] }} />
            </span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change color palette"
        className="grid h-9 w-9 place-items-center rounded-full border border-border/60 hover:border-primary/40 hover:bg-accent transition-colors overflow-hidden"
      >
        <span className="flex h-4 w-4 rounded-full overflow-hidden">
          <span className="h-full flex-1" style={{ background: palette.swatch[0] }} />
          <span className="h-full flex-1" style={{ background: palette.swatch[1] }} />
          <span className="h-full flex-1" style={{ background: palette.swatch[2] }} />
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-50 w-60 rounded-xl border border-border/70 bg-popover p-2 shadow-float">
            <p className="px-2 py-1.5 font-mono text-[11px] text-muted-foreground">{"// color palette"}</p>
            {palettes.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPalette(p)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors text-left",
                  palette.id === p.id ? "bg-accent" : "hover:bg-accent/50"
                )}
              >
                <span className="flex h-6 w-6 shrink-0 rounded-full overflow-hidden ring-1 ring-border">
                  <span className="h-full flex-1" style={{ background: p.swatch[0] }} />
                  <span className="h-full flex-1" style={{ background: p.swatch[1] }} />
                  <span className="h-full flex-1" style={{ background: p.swatch[2] }} />
                </span>
                <span className="flex-1 truncate text-xs">{p.name}</span>
                {palette.id === p.id && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
