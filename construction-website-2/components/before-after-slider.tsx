"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
  height?: number
  width?: number
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After", 
  className = "",
  height = 400,
  width = 600
}: BeforeAfterSliderProps) {
  const [isSliding, setIsSliding] = useState(false)
  const [slidePosition, setSlidePosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsSliding(true)
  }

  const handleMouseUp = () => {
    setIsSliding(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSliding || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    // Clamp between 0 and 100
    const clampedPercentage = Math.min(100, Math.max(0, percentage))
    setSlidePosition(clampedPercentage)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSliding || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    const clampedPercentage = Math.min(100, Math.max(0, percentage))
    setSlidePosition(clampedPercentage)
  }

  // Add global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsSliding(false)
    const handleGlobalTouchEnd = () => setIsSliding(false)
    
    if (isSliding) {
      document.addEventListener('mouseup', handleGlobalMouseUp)
      document.addEventListener('touchend', handleGlobalTouchEnd)
    }
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.removeEventListener('touchend', handleGlobalTouchEnd)
    }
  }, [isSliding])

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg cursor-ew-resize select-none group",
        className
      )}
      style={{ height, width: "100%", maxWidth: width }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={() => setIsSliding(false)}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          Before
        </div>
      </div>

      {/* After Image (Foreground with clip) */}
      <div 
        className="absolute inset-0 transition-all duration-100 ease-out"
        style={{ clipPath: `inset(0 ${100 - slidePosition}% 0 0)` }}
      >
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          After
        </div>
      </div>

      {/* Divider Line */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all duration-100 ease-out z-10"
        style={{ left: `${slidePosition}%` }}
      >
        {/* Handle */}
        <div 
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 cursor-ew-resize transition-all duration-200",
            "flex items-center justify-center",
            "group-hover:scale-110 group-hover:border-blue-500",
            isSliding && "scale-110 border-blue-500 shadow-xl"
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsSliding(true)}
        >
          {/* Handle Icon */}
          <div className="flex space-x-0.5">
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Drag to compare
      </div>
    </div>
  )
}

// Project showcase variant with title and description
interface ProjectBeforeAfterProps extends BeforeAfterSliderProps {
  title?: string
  description?: string
  category?: string
}

export function ProjectBeforeAfter({
  title,
  description,
  category,
  ...sliderProps
}: ProjectBeforeAfterProps) {
  return (
    <div className="space-y-4">
      {(title || category) && (
        <div className="space-y-2">
          {category && (
            <span className="inline-block bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          )}
          {title && (
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              {title}
            </h3>
          )}
        </div>
      )}
      
      <BeforeAfterSlider {...sliderProps} />
      
      {description && (
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}