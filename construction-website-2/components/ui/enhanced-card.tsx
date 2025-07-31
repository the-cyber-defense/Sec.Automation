"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "minimal" | "floating" | "glow"
  hover?: "none" | "lift" | "tilt" | "glow" | "scale"
  backdrop?: boolean
  glowColor?: string
  children: React.ReactNode
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ 
    className, 
    variant = "default", 
    hover = "lift", 
    backdrop = false,
    glowColor = "blue",
    children, 
    ...props 
  }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]))
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]))
    
    const [isHovered, setIsHovered] = React.useState(false)
    
    React.useImperativeHandle(ref, () => cardRef.current!)

    const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
      if (!cardRef.current || hover !== "tilt") return
      
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }, [hover, mouseX, mouseY])

    const handleMouseLeave = React.useCallback(() => {
      mouseX.set(0)
      mouseY.set(0)
      setIsHovered(false)
    }, [mouseX, mouseY])

    const baseClasses = "relative overflow-hidden transition-all duration-500"
    
    const variantClasses = {
      default: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-lg",
      glass: "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-white/20 dark:border-neutral-800/50 rounded-3xl shadow-xl",
      gradient: "bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 border border-neutral-200/50 dark:border-neutral-700/50 rounded-3xl shadow-xl",
      minimal: "bg-transparent border-0 rounded-3xl",
      floating: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl shadow-neutral-500/10",
      glow: `bg-white dark:bg-neutral-900 border border-${glowColor}-200 dark:border-${glowColor}-800 rounded-3xl shadow-2xl shadow-${glowColor}-500/20`,
    }

    const hoverVariants = {
      none: {},
      lift: {
        hover: { 
          y: -8, 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          transition: { duration: 0.3, ease: "easeOut" }
        }
      },
      tilt: {
        hover: {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          transition: { duration: 0.1 }
        }
      },
      glow: {
        hover: {
          boxShadow: `0 0 40px rgba(59, 130, 246, 0.3)`,
          borderColor: `rgba(59, 130, 246, 0.5)`,
          transition: { duration: 0.3 }
        }
      },
      scale: {
        hover: {
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" }
        }
      }
    }

    return (
      <motion.div
        ref={cardRef}
        className={cn(baseClasses, variantClasses[variant], className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={hoverVariants[hover].hover}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
        }}
        {...props}
      >
        {/* Background Effects */}
        {backdrop && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 pointer-events-none" />
        )}
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-noise pointer-events-none" />
        
        {/* Glow effect */}
        {variant === "glow" && (
          <div className={`absolute -inset-1 bg-gradient-to-r from-${glowColor}-600 to-${glowColor}-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
        )}
        
        {/* Floating particles effect */}
        {variant === "floating" && isHovered && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: "100%", 
                  opacity: 0 
                }}
                animate={{ 
                  y: "-20%", 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </div>
        )}
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
        </div>

        {/* Content */}
        <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
          {children}
        </div>
      </motion.div>
    )
  },
)
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-3 p-8 pb-4", className)} {...props} />
  ),
)
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <motion.h3 
      ref={ref} 
      className={cn("text-xl font-bold leading-tight tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent", className)} 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      {...props}
    >
      {children}
    </motion.h3>
  ),
)
EnhancedCardTitle.displayName = "EnhancedCardTitle"

const EnhancedCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <motion.p 
      ref={ref} 
      className={cn("text-neutral-600 dark:text-neutral-400 leading-relaxed", className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      {...props} 
    />
  ),
)
EnhancedCardDescription.displayName = "EnhancedCardDescription"

const EnhancedCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-8 pt-0", className)} {...props} />,
)
EnhancedCardContent.displayName = "EnhancedCardContent"

const EnhancedCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <motion.div 
      ref={ref} 
      className={cn("flex items-center p-8 pt-0", className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      {...props} 
    />
  ),
)
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export { 
  EnhancedCard, 
  EnhancedCardHeader, 
  EnhancedCardTitle, 
  EnhancedCardDescription, 
  EnhancedCardContent, 
  EnhancedCardFooter 
}