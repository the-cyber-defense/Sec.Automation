"use client"

import { lazy, Suspense } from "react"
import { motion } from "framer-motion"

// Lazy loading wrapper for heavy sections
export function LazySection({ 
  children, 
  fallback,
  className = "",
  ...props 
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  [key: string]: any
}) {
  return (
    <Suspense fallback={fallback || <div className={`min-h-[200px] ${className}`} />}>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={className}
        {...props}
      >
        {children}
      </motion.section>
    </Suspense>
  )
}

// Optimized motion wrapper with reduced complexity
export function OptimizedMotion({ 
  children, 
  delay = 0,
  className = "",
  ...props 
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  [key: string]: any
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Optimized easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}