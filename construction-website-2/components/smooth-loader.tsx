"use client"

import { useState, useEffect, ReactNode } from "react"

interface SmoothLoaderProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function SmoothLoader({ children, delay = 50, className = "" }: SmoothLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div 
      className={`transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Skeleton components for smooth loading states
export function SkeletonText({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}>
      &nbsp;
    </div>
  )
}

export function SkeletonImage({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  )
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 ${className}`}>
      <SkeletonImage className="h-48 mb-4" />
      <SkeletonText className="h-6 mb-2" />
      <SkeletonText className="h-4 mb-2 w-3/4" />
      <SkeletonText className="h-4 w-1/2" />
    </div>
  )
}