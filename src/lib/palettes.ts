// Three blendable color palettes. Each sets primary/ring/accent + the three
// chart colors used by gradient text and the 2D animated showcase.
// The active palette is applied to :root as CSS custom properties.
//
// Hues are chosen to be ANALOGOUS (close on the color wheel) so the
// gradient-text and btn-blend blend smoothly without muddy transitions.

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
      "oklch(0.62 0.14 160)", // jade (hue 160)
      "oklch(0.6 0.11 190)",  // teal (hue 190)
      "oklch(0.5 0.14 240)",  // peacock blue (hue 240)
      "oklch(0.58 0.12 185)", // primary = teal
      "oklch(0.99 0.01 180)",
      "oklch(0.9 0.05 175)",
      "oklch(0.3 0.06 190)",
      "oklch(0.58 0.12 185)"
    ),
  },
  {
    // Enhanced "Neon" → Amethyst: a smooth violet → purple → magenta → lavender
    // spectrum. All hues sit between 280–350° so the gradient blends cleanly
    // through the purple family without clashing.
    id: "amethyst",
    name: "Amethyst (Violet · Purple · Magenta)",
    swatch: ["oklch(0.55 0.2 280)", "oklch(0.58 0.22 315)", "oklch(0.6 0.2 345)"],
    vars: build(
      "oklch(0.55 0.2 280)",  // violet (hue 280)
      "oklch(0.58 0.22 315)", // purple (hue 315)
      "oklch(0.6 0.2 345)",   // magenta (hue 345)
      "oklch(0.58 0.22 315)", // primary = purple
      "oklch(0.99 0.01 320)",
      "oklch(0.92 0.06 315)",
      "oklch(0.34 0.1 300)",
      "oklch(0.58 0.22 315)"
    ),
  },
  {
    // Replaced "Sunset" → Ocean: a cool, professional cyan → azure → indigo
    // gradient. Smooth analogous blues that look clean on the cream background.
    id: "ocean",
    name: "Ocean (Cyan · Azure · Indigo)",
    swatch: ["oklch(0.62 0.12 200)", "oklch(0.55 0.16 230)", "oklch(0.48 0.18 260)"],
    vars: build(
      "oklch(0.62 0.12 200)", // cyan (hue 200)
      "oklch(0.55 0.16 230)", // azure (hue 230)
      "oklch(0.48 0.18 260)", // indigo (hue 260)
      "oklch(0.55 0.16 230)", // primary = azure
      "oklch(0.99 0.01 230)",
      "oklch(0.92 0.05 225)",
      "oklch(0.32 0.08 240)",
      "oklch(0.55 0.16 230)"
    ),
  },
]

export const DEFAULT_PALETTE = PALETTES[0]
