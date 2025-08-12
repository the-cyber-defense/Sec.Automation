"use client"

import { ReactNode, useEffect, useState } from "react"

interface SmoothRendererProps {
  children: ReactNode
  delay?: number
}

export function SmoothRenderer({ children, delay = 0 }: SmoothRendererProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Ensure DOM is ready and fonts are loaded
    const timer = setTimeout(() => {
      if (document.readyState === 'complete') {
        setIsReady(true)
      } else {
        window.addEventListener('load', () => setIsReady(true))
      }
    }, delay)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', () => setIsReady(true))
    }
  }, [delay])

  return (
    <div 
      className={`transition-all duration-500 ease-out ${
        isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      }`}
      style={{ 
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  )
}