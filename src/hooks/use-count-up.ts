'use client'

import * as React from "react"

/** Animates a number from 0 to `end` when the element scrolls into view.
 *  Robust: low threshold, checks initial viewport state, re-triggers on re-entry. */
export function useCountUp(end: number, duration = 1600, decimals = 0) {
  const [value, setValue] = React.useState(0)
  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    let raf = 0
    const animate = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(end * eased)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(node)

    // Fallback: if already in viewport on mount, start immediately.
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animate()
      observer.disconnect()
    }

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  return { ref, display }
}
