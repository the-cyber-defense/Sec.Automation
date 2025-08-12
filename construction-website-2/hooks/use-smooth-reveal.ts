"use client"

import { useState, useEffect, useRef } from "react"

interface UseSmoothRevealOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
}

export function useSmoothReveal({ 
  threshold = 0.2, 
  rootMargin = "0px 0px -50px 0px",
  delay = 0
}: UseSmoothRevealOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay to prevent flash
          setTimeout(() => {
            setIsVisible(true)
            // Mark as ready after animation starts
            setTimeout(() => setIsReady(true), 100)
          }, delay)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, delay])

  return { ref, isVisible, isReady }
}