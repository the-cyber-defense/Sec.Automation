"use client"
import { useState, useEffect } from "react"

export interface ImageOptimizationConfig {
  // Mobile breakpoint
  mobileBreakpoint?: number
  // Quality settings
  mobileQuality?: number
  tabletQuality?: number
  desktopQuality?: number
  // Lazy loading
  enableLazyLoading?: boolean
  // Progressive loading
  enableProgressiveLoading?: boolean
  // WebP support detection
  enableWebP?: boolean
}

const defaultConfig: ImageOptimizationConfig = {
  mobileBreakpoint: 640,
  mobileQuality: 75,
  tabletQuality: 80,
  desktopQuality: 85,
  enableLazyLoading: true,
  enableProgressiveLoading: true,
  enableWebP: true,
}

export function useImageOptimization(config: ImageOptimizationConfig = {}) {
  const finalConfig = { ...defaultConfig, ...config }
  
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [supportsWebP, setSupportsWebP] = useState(false)
  const [connectionSpeed, setConnectionSpeed] = useState<string>('fast')

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      setIsMobile(width < finalConfig.mobileBreakpoint!)
      setIsTablet(width >= finalConfig.mobileBreakpoint! && width < 1024)
    }

    const checkWebPSupport = () => {
      if (finalConfig.enableWebP) {
        const canvas = document.createElement('canvas')
        canvas.width = 1
        canvas.height = 1
        const ctx = canvas.getContext('2d')
        if (ctx) {
          setSupportsWebP(canvas.toDataURL('image/webp').indexOf('webp') > -1)
        }
      }
    }

    const checkConnectionSpeed = () => {
      // @ts-ignore
      if ('connection' in navigator) {
        // @ts-ignore
        const connection = navigator.connection
        const effectiveType = connection?.effectiveType || 'fast'
        setConnectionSpeed(effectiveType.includes('slow') || effectiveType === '2g' ? 'slow' : 'fast')
      }
    }

    updateDeviceInfo()
    checkWebPSupport()
    checkConnectionSpeed()

    window.addEventListener('resize', updateDeviceInfo)
    return () => window.removeEventListener('resize', updateDeviceInfo)
  }, [finalConfig.mobileBreakpoint, finalConfig.enableWebP])

  const getOptimalQuality = (baseQuality?: number) => {
    const quality = baseQuality || finalConfig.desktopQuality!
    
    if (connectionSpeed === 'slow') {
      return Math.min(quality - 10, 65)
    }
    
    if (isMobile) {
      return Math.min(quality, finalConfig.mobileQuality!)
    }
    
    if (isTablet) {
      return Math.min(quality, finalConfig.tabletQuality!)
    }
    
    return quality
  }

  const getOptimalSizes = (mobileSizes = '100vw', tabletSizes = '50vw', desktopSizes = '33vw') => {
    return `(max-width: ${finalConfig.mobileBreakpoint}px) ${mobileSizes}, (max-width: 1024px) ${tabletSizes}, ${desktopSizes}`
  }

  const getOptimalFormat = (originalSrc: string) => {
    if (supportsWebP && originalSrc.match(/\.(jpg|jpeg|png)$/i)) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    }
    return originalSrc
  }

  const shouldUseLazyLoading = (priority?: boolean) => {
    return finalConfig.enableLazyLoading && !priority
  }

  const getLoadingStrategy = (priority?: boolean) => {
    if (priority) return 'eager'
    if (connectionSpeed === 'slow') return 'lazy'
    return finalConfig.enableLazyLoading ? 'lazy' : 'eager'
  }

  return {
    // Device info
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    
    // Capabilities
    supportsWebP,
    connectionSpeed,
    
    // Optimization helpers
    getOptimalQuality,
    getOptimalSizes,
    getOptimalFormat,
    shouldUseLazyLoading,
    getLoadingStrategy,
    
    // Utility functions
    getSrcSet: (baseSrc: string, sizes: number[] = [480, 768, 1024, 1280]) => {
      return sizes
        .map(size => `${baseSrc}?w=${size}&q=${getOptimalQuality()} ${size}w`)
        .join(', ')
    },
    
    getResponsiveProps: (src: string, options: {
      priority?: boolean
      quality?: number
      mobileSizes?: string
      tabletSizes?: string
      desktopSizes?: string
    } = {}) => ({
      src: getOptimalFormat(src),
      quality: getOptimalQuality(options.quality),
      sizes: getOptimalSizes(options.mobileSizes, options.tabletSizes, options.desktopSizes),
      loading: getLoadingStrategy(options.priority) as 'lazy' | 'eager',
      priority: options.priority || false,
    }),
  }
}

// Performance monitoring hook
export function useImagePerformance() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    cacheHit: false,
    size: 0,
  })

  const trackImageLoad = (src: string, startTime: number) => {
    const endTime = performance.now()
    const loadTime = endTime - startTime
    
    // Check if image was cached
    const cacheHit = loadTime < 50 // Cached images typically load in < 50ms
    
    setMetrics(prev => ({
      ...prev,
      loadTime,
      cacheHit,
    }))

    // Report to analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'image_load', {
        load_time: loadTime,
        cache_hit: cacheHit,
        image_src: src,
      })
    }
  }

  return { metrics, trackImageLoad }
}