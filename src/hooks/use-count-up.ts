'use client'

import * as React from "react"

/** Displays the final number immediately, with an optional count-up animation
 *  once the element is in view. Falls back to the final value instantly if
 *  IntersectionObserver isn't available or the element is already visible —
 *  so the stat never appears stuck at 0. */
export function useCountUp(end: number, duration = 1400, decimals = 0) {
  // Start at the final value so SSR + first paint always shows the real number.
  const [value, setValue] = React.useState(end)
  const ref = React.useRef<HTMLSpanElement>(null)
  const animated = React.useRef(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    if (animated.current) return
    if (typeof IntersectionObserver === "undefined") return

    const startAnim = () => {
      if (animated.current) return
      animated.current = true
      setValue(0)
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(end * eased)
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            startAnim()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [end, duration])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  return { ref, display }
}
