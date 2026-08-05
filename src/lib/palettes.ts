// Three blendable color palettes. Each sets primary/ring/accent + the three
// chart colors used by gradient text and the 2D animated showcase.
// The active palette is applied to :root as CSS custom properties.

export type Palette = {
  id: string
  name: string
  swatch: [string, string, string] // for the switcher preview
  vars: Record<string, string>
}

const build = (
  c1: string, c2: string, c3: string,
  primary: string, primaryFg: string,
  accent: string, accentFg: string, ring: string
): Palette["vars"] => ({
  "--primary": primary,
  "--primary-foreground": primaryFg,
  "--ring": ring,
  "--chart-1": c1,
  "--chart-2": c2,
  "--chart-3": c3,
  "--accent": accent,
  "--accent-foreground": accentFg,
  "--sidebar-primary": primary,
  "--sidebar-ring": ring,
})

export const PALETTES: Palette[] = [
  {
    id: "aurora",
    name: "Aurora (Jade · Teal · Peacock)",
    swatch: ["oklch(0.62 0.14 160)", "oklch(0.6 0.11 190)", "oklch(0.5 0.14 240)"],
    vars: build(
      "oklch(0.62 0.14 160)", // jade
      "oklch(0.6 0.11 190)",  // teal
      "oklch(0.5 0.14 240)",  // peacock blue
      "oklch(0.58 0.12 185)", // primary = teal
      "oklch(0.99 0.01 180)",
      "oklch(0.9 0.05 175)",
      "oklch(0.3 0.06 190)",
      "oklch(0.58 0.12 185)"
    ),
  },
  {
    id: "neon",
    name: "Neon (Crimson · Magenta · Violet)",
    swatch: ["oklch(0.55 0.22 25)", "oklch(0.6 0.25 340)", "oklch(0.55 0.2 290)"],
    vars: build(
      "oklch(0.55 0.22 25)",  // crimson
      "oklch(0.6 0.25 340)",  // magenta
      "oklch(0.55 0.2 290)",  // violet
      "oklch(0.58 0.24 335)", // primary = magenta
      "oklch(0.99 0.01 340)",
      "oklch(0.92 0.06 330)",
      "oklch(0.32 0.08 320)",
      "oklch(0.58 0.24 335)"
    ),
  },
  {
    id: "sunset",
    name: "Sunset (Amber · Coral · Rose)",
    swatch: ["oklch(0.75 0.15 75)", "oklch(0.68 0.18 40)", "oklch(0.65 0.2 15)"],
    vars: build(
      "oklch(0.75 0.15 75)",  // amber
      "oklch(0.68 0.18 40)",  // coral
      "oklch(0.65 0.2 15)",   // rose
      "oklch(0.66 0.19 40)",  // primary = coral
      "oklch(0.99 0.01 60)",
      "oklch(0.92 0.06 45)",
      "oklch(0.32 0.08 30)",
      "oklch(0.66 0.19 40)"
    ),
  },
]

export const DEFAULT_PALETTE = PALETTES[0]
