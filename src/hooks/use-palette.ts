'use client'

import * as React from "react"
import { PALETTES, DEFAULT_PALETTE, type Palette } from "@/lib/palettes"

const STORAGE_KEY = "portfolio-palette"

function applyPalette(p: Palette) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v))
}

export function usePalette() {
  const [palette, setPalette] = React.useState<Palette>(DEFAULT_PALETTE)

  // Load persisted choice on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const found = PALETTES.find((p) => p.id === saved)
        if (found) {
          setPalette(found)
          applyPalette(found)
          return
        }
      }
    } catch {
      /* ignore */
    }
    applyPalette(DEFAULT_PALETTE)
  }, [])

  const change = React.useCallback((p: Palette) => {
    setPalette(p)
    applyPalette(p)
    try {
      localStorage.setItem(STORAGE_KEY, p.id)
    } catch {
      /* ignore */
    }
  }, [])

  return { palette, setPalette: change, palettes: PALETTES }
}
