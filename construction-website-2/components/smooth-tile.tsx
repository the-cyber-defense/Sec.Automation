"use client"

import { ReactNode, useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ModernCard } from "@/components/ui/modern-card"
import { cn } from "@/lib/utils"

interface SmoothTileProps {
  children: ReactNode
  index: number
  className?: string
  delay?: number
}

export function SmoothTile({ children, index, className, delay = 0 }: SmoothTileProps) {
  const [isMounted, setIsMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Prevent SSR/client mismatch by mounting after hydration
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 20 + (index * 5)) // Reduced delay for better performance
    
    return () => clearTimeout(timer)
  }, [index])

  if (!isMounted) {
    // Render a placeholder that matches the final dimensions
    return (
      <div className={cn("p-8 h-full opacity-0", className)}>
        <div className="flex flex-col h-full">
          <div className="mb-6">
            <div className="w-14 h-14 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
          </div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded mb-4" />
          <div className="flex-grow">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded mb-2" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded mb-2 w-4/5" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/5" />
          </div>
        </div>
      </div>
    )
  }

  // Skip animations if user prefers reduced motion
  if (shouldReduceMotion) {
    return (
      <div className={cn("p-8 h-full", className)}>
        <ModernCard 
          animated={false}
          className="p-8 h-full"
        >
          {children}
        </ModernCard>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: "-50px" }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.05 + delay,
        ease: "easeOut"
      }}
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
    >
      <ModernCard 
        animated={false}
        className={cn(
          "p-8 h-full transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.01] hover:-translate-y-0.5",
          className
        )}
      >
        {children}
      </ModernCard>
    </motion.div>
  )
}