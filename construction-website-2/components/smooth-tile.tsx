"use client"

import { ReactNode, useState, useEffect } from "react"
import { motion } from "framer-motion"
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

  useEffect(() => {
    // Prevent SSR/client mismatch by mounting after hydration
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 50 + (index * 10)) // Stagger mounting to prevent simultaneous animations
    
    return () => clearTimeout(timer)
  }, [index])

  if (!isMounted) {
    // Render a placeholder that matches the final dimensions
    return (
      <div className={cn("p-8 h-full opacity-0", className)}>
        <div className="flex flex-col h-full">
          <div className="mb-6">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl" />
          </div>
          <div className="h-6 bg-gray-100 rounded mb-4" />
          <div className="flex-grow">
            <div className="h-4 bg-gray-100 rounded mb-2" />
            <div className="h-4 bg-gray-100 rounded mb-2 w-4/5" />
            <div className="h-4 bg-gray-100 rounded w-3/5" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ 
        duration: 0.7,
        delay: index * 0.08 + delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "tween"
      }}
      style={{ 
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      <ModernCard className={cn(
        "p-8 h-full transition-all duration-500 ease-out hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
        className
      )}>
        {children}
      </ModernCard>
    </motion.div>
  )
}