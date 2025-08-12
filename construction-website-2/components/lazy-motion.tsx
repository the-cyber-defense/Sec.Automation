"use client"

import { lazy, Suspense, type ComponentProps } from "react"

// Lazy load framer-motion components
const LazyMotionDiv = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.div })))
const LazyMotionSection = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.section })))

type MotionDivProps = ComponentProps<"div"> & {
  initial?: any
  animate?: any
  transition?: any
  whileInView?: any
  viewport?: any
}

type MotionSectionProps = ComponentProps<"section"> & {
  initial?: any
  animate?: any
  transition?: any
  whileInView?: any
  viewport?: any
}

export function LazyMotion({ children, ...props }: MotionDivProps) {
  return (
    <Suspense fallback={<div {...props}>{children}</div>}>
      <LazyMotionDiv {...props}>{children}</LazyMotionDiv>
    </Suspense>
  )
}

export function LazyMotionSection({ children, ...props }: MotionSectionProps) {
  return (
    <Suspense fallback={<section {...props}>{children}</section>}>
      <LazyMotionSection {...props}>{children}</LazyMotionSection>
    </Suspense>
  )
}