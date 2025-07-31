"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "dots" | "pulse" | "bounce"
  className?: string
}

export function LoadingSpinner({ size = "md", variant = "default", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              "bg-blue-500 rounded-full",
              size === "sm" ? "h-2 w-2" : size === "md" ? "h-3 w-3" : "h-4 w-4"
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={cn(
          "bg-blue-500 rounded-full",
          sizeClasses[size],
          className
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )
  }

  if (variant === "bounce") {
    return (
      <div className={cn("flex items-end space-x-1", className)}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={cn(
              "bg-blue-500 rounded-sm",
              size === "sm" ? "w-1 h-2" : size === "md" ? "w-1.5 h-3" : "w-2 h-4"
            )}
            animate={{
              scaleY: [1, 2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <Loader2 className={cn("animate-spin text-blue-500", sizeClasses[size], className)} />
  )
}

interface SkeletonProps {
  className?: string
  variant?: "default" | "circular" | "rectangular" | "text"
  animation?: "pulse" | "wave" | "none"
}

export function Skeleton({ className, variant = "default", animation = "pulse" }: SkeletonProps) {
  const baseClasses = "bg-neutral-200 dark:bg-neutral-800"
  
  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-none",
    text: "rounded h-4"
  }

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "skeleton",
    none: ""
  }

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
    />
  )
}

interface ProgressBarProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  variant?: "default" | "gradient" | "striped"
  className?: string
  showPercentage?: boolean
}

export function ProgressBar({ 
  value, 
  max = 100, 
  size = "md", 
  variant = "default",
  className,
  showPercentage = false
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  }

  const variantClasses = {
    default: "bg-blue-500",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
    striped: "bg-blue-500 bg-stripes"
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className={cn(
        "w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <motion.div
          className={cn(
            "h-full transition-all duration-500",
            variantClasses[variant]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}

export function LoadingCard({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 space-y-4", className)}>
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="flex space-x-4">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" variant="pulse" />
        <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
      </div>
    </div>
  )
}

interface ButtonLoadingProps {
  loading?: boolean
  children: React.ReactNode
  className?: string
}

export function ButtonLoading({ loading, children, className }: ButtonLoadingProps) {
  return (
    <div className={cn("relative", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 rounded-inherit">
          <LoadingSpinner size="sm" />
        </div>
      )}
      <div className={loading ? "opacity-50" : ""}>
        {children}
      </div>
    </div>
  )
}