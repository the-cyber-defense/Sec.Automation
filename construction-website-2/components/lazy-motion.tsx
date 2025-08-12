"use client"

import { lazy, Suspense, type ComponentProps } from "react"
import type { HTMLMotionProps } from "framer-motion"

// Lazy load framer-motion components
const LazyMotionDiv = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.div })))
const LazyMotionSectionComponent = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.section })))

type MotionDivProps = Omit<HTMLMotionProps<"div">, "ref" | "children"> & {
  ref?: React.Ref<HTMLDivElement>
  children: React.ReactNode
}

type MotionSectionProps = Omit<HTMLMotionProps<"section">, "ref" | "children"> & {
  ref?: React.Ref<HTMLElement>
  children: React.ReactNode
}

export function LazyMotion({ children, ...props }: MotionDivProps) {
  return (
    <Suspense fallback={<div>{children}</div>}>
      <LazyMotionDiv {...props}>{children}</LazyMotionDiv>
    </Suspense>
  )
}

export function LazyMotionSection({ children, ...props }: MotionSectionProps) {
  return (
    <Suspense fallback={<section>{children}</section>}>
      <LazyMotionSectionComponent {...props}>{children}</LazyMotionSectionComponent>
    </Suspense>
  )
}