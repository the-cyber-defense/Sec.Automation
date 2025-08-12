"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScaleInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  scale?: number
  once?: boolean
  threshold?: number
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  scale = 0.95,
  once = true,
  threshold = 0.1,
}: ScaleInProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: {
      opacity: 0,
      scale,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOutCubic",
      },
    },
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={prefersReducedMotion ? {} : (variants as any)}
    >
      {children}
    </motion.div>
  )
}
