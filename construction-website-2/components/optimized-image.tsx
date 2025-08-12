"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  loading?: "lazy" | "eager"
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  loading = "lazy",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Always show background to prevent layout shift */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 transition-opacity duration-500",
        !isLoading && !hasError ? "opacity-0" : "opacity-100"
      )}>
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100" />
        )}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Failed to load image</span>
          </div>
        )}
      </div>
      
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          quality={quality}
          loading={priority ? "eager" : loading}
          className={cn(
            "transition-all duration-500 ease-out",
            isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
          )}
          style={{ willChange: 'opacity, transform' }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
          {...props}
        />
      )}
    </div>
  )
}