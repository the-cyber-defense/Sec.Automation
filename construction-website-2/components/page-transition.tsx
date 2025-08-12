"use client"

import { useState, useEffect, ReactNode } from "react"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Reset visibility on route change
    setIsVisible(false)
    
    // Small delay to prevent flash
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div 
      className={`transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        willChange: 'opacity',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      {children}
    </div>
  )
}