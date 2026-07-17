'use client'

import * as React from "react"
import { useMotionValue, useSpring, useTransform, type MotionStyle } from "framer-motion"

/**
 * Lightweight 3D tilt that follows the pointer using Framer Motion springs.
 * Returns spreadable props for a motion element: { onMouseMove, onMouseLeave, style }.
 */
export function useTilt(max = 12, scale = 1.0) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 200, damping: 18 })
  const sy = useSpring(py, { stiffness: 200, damping: 18 })
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const rotateY = useTransform(sx, [0, 1], [-max, max])

  const onMouseMove = React.useCallback((e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }, [px, py])

  const onMouseLeave = React.useCallback(() => {
    px.set(0.5)
    py.set(0.5)
  }, [px, py])

  const style: MotionStyle = {
    rotateX,
    rotateY,
    transformPerspective: 900,
    scale,
    transformStyle: "preserve-3d",
  }

  return { onMouseMove, onMouseLeave, style }
}
