'use client'

import * as React from "react"
import { motion, useInView, type Variants } from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "none"

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
}

type RevealProps = {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  /** amount of element visible before triggering (0-1) */
  amount?: number
  /** disable the exit fade-out (default: enabled) */
  once?: boolean
}

/**
 * Scroll-aware reveal: elements fall/slide in when entering the viewport and
 * gently fade + blur out when leaving. Uses Framer Motion's useInView.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  amount = 0.15,
  once = false,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount, once })

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset[direction].x,
      y: offset[direction].y,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Staggered container — children with <RevealItem> animate in sequence. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  amount = 0.15,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  amount?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount, once: false })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  direction = "up",
  duration = 0.6,
}: {
  children: React.ReactNode
  className?: string
  direction?: Direction
  duration?: number
}) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset[direction].x,
      y: offset[direction].y,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  }
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
