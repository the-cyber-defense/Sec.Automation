"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "minimal"
  hover?: boolean
  children: React.ReactNode
  animated?: boolean
}

const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ className, variant = "default", hover = true, children, animated = true, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden transition-all duration-500"

    const variantClasses = {
      default: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-soft",
      glass: "glass rounded-3xl shadow-soft",
      gradient:
        "bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl shadow-soft",
      minimal: "bg-transparent border-0 rounded-3xl",
    }

    const hoverClasses = hover
      ? "hover:shadow-large hover:-translate-y-1 hover:border-neutral-300/50 dark:hover:border-neutral-700/50"
      : ""

    const content = (
      <>
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-noise pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </>
    )

    // Filter out props that are incompatible with motion.div
    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      onTransitionEnd,
      onLoad,
      onError,
      onAbort,
      onCanPlay,
      onCanPlayThrough,
      onDurationChange,
      onEmptied,
      onEncrypted,
      onEnded,
      onLoadedData,
      onLoadedMetadata,
      onPause,
      onPlay,
      onPlaying,
      onProgress,
      onRateChange,
      onSeeked,
      onSeeking,
      onStalled,
      onSuspend,
      onTimeUpdate,
      onVolumeChange,
      onWaiting,
      ...motionProps
    } = props

    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={cn(baseClasses, variantClasses[variant], hoverClasses, className)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          {...motionProps}
        >
          {content}
        </motion.div>
      )
    }

    return (
      <div ref={ref} className={cn(baseClasses, variantClasses[variant], hoverClasses, className)} {...props}>
        {content}
      </div>
    )
  },
)
ModernCard.displayName = "ModernCard"

const ModernCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 p-8 pb-4", className)} {...props} />
  ),
)
ModernCardHeader.displayName = "ModernCardHeader"

const ModernCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-heading font-display leading-tight tracking-tight", className)} {...props}>
      {children}
    </h3>
  ),
)
ModernCardTitle.displayName = "ModernCardTitle"

const ModernCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-body text-neutral-600 dark:text-neutral-400", className)} {...props} />
  ),
)
ModernCardDescription.displayName = "ModernCardDescription"

const ModernCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-8 pt-0", className)} {...props} />,
)
ModernCardContent.displayName = "ModernCardContent"

const ModernCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-8 pt-0", className)} {...props} />
  ),
)
ModernCardFooter.displayName = "ModernCardFooter"

export { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardDescription, ModernCardContent, ModernCardFooter }
