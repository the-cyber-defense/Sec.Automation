"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface ModernHeroProps {
  children: React.ReactNode
  className?: string
  backgroundImage?: string
  gradient?: boolean
  particles?: boolean
  height?: "sm" | "md" | "lg" | "xl" | "full"
}

export function ModernHero({ 
  children, 
  className, 
  backgroundImage, 
  gradient = true,
  particles = false,
  height = "lg" 
}: ModernHeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  const heightClasses = {
    sm: "min-h-[60vh]",
    md: "min-h-[70vh]", 
    lg: "min-h-[85vh]",
    xl: "min-h-[95vh]",
    full: "min-h-screen"
  }

  return (
    <motion.section
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        heightClasses[height],
        className
      )}
      style={{ opacity }}
    >
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: springY, scale }}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      )}

      {/* Gradient Overlay */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20" />
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Particles */}
      {particles && <ParticleField />}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </motion.section>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
        <motion.div
          className="w-1 h-3 bg-white/70 rounded-full mt-2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  )
}

interface HeroContentProps {
  children: React.ReactNode
  className?: string
  center?: boolean
}

export function HeroContent({ children, className, center = true }: HeroContentProps) {
  return (
    <div className={cn(
      "container mx-auto px-6 lg:px-8",
      center && "text-center",
      className
    )}>
      {children}
    </div>
  )
}

interface HeroTitleProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

export function HeroTitle({ children, className, gradient = true }: HeroTitleProps) {
  return (
    <motion.h1
      className={cn(
        "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6",
        gradient && "bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent",
        !gradient && "text-white",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {children}
    </motion.h1>
  )
}

interface HeroSubtitleProps {
  children: React.ReactNode
  className?: string
}

export function HeroSubtitle({ children, className }: HeroSubtitleProps) {
  return (
    <motion.p
      className={cn(
        "text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {children}
    </motion.p>
  )
}

interface HeroActionsProps {
  children: React.ReactNode
  className?: string
}

export function HeroActions({ children, className }: HeroActionsProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {children}
    </motion.div>
  )
}