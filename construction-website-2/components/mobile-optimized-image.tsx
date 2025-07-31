"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MobileOptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  mobileSrc?: string
  mobileWidth?: number
  mobileHeight?: number
  loading?: "lazy" | "eager"
  onLoad?: () => void
  onError?: () => void
}

export function MobileOptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  fill = false,
  placeholder = "empty",
  blurDataURL,
  mobileSrc,
  mobileWidth,
  mobileHeight,
  loading = "lazy",
  onLoad,
  onError,
}: MobileOptimizedImageProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleLoad = () => {
    setImageLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setImageError(true)
    onError?.()
  }

  // Use mobile-specific image if available
  const imageSrc = isMobile && mobileSrc ? mobileSrc : src
  const imageWidth = isMobile && mobileWidth ? mobileWidth : width
  const imageHeight = isMobile && mobileHeight ? mobileHeight : height

  // Optimize quality for mobile
  const optimizedQuality = isMobile ? Math.min(quality, 75) : quality

  // Mobile-specific sizes string
  const mobileOptimizedSizes = isMobile 
    ? "(max-width: 640px) 100vw, 50vw"
    : sizes

  if (imageError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
          className
        )}
        style={{ width: imageWidth, height: imageHeight }}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : imageWidth}
        height={fill ? undefined : imageHeight}
        fill={fill}
        priority={priority}
        quality={optimizedQuality}
        sizes={mobileOptimizedSizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0",
          fill && "object-cover"
        )}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      
      {/* Progressive loading indicator */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

// Hook for responsive image sizes
export function useResponsiveImageSizes() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 640)
      setIsTablet(width >= 640 && width < 1024)
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    getSizes: (mobile = "100vw", tablet = "50vw", desktop = "33vw") => {
      return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`
    },
    getOptimalQuality: (baseQuality = 85) => {
      if (isMobile) return Math.min(baseQuality, 75)
      if (isTablet) return Math.min(baseQuality, 80)
      return baseQuality
    }
  }
}