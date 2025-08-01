"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)

  useEffect(() => {
    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType("paint")

        const fcp = paint.find((entry) => entry.name === "first-contentful-paint")?.startTime || 0

        // Web Vitals measurement
        let lcp = 0
        let cls = 0
        let fid = 0

        // Largest Contentful Paint
        if ("PerformanceObserver" in window) {
          try {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries()
              const lastEntry = entries[entries.length - 1]
              lcp = lastEntry.startTime
            })
            lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

            // Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!(entry as any).hadRecentInput) {
                  cls += (entry as any).value
                }
              }
            })
            clsObserver.observe({ type: "layout-shift", buffered: true })

            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                fid = (entry as any).processingStart - entry.startTime
              }
            })
            fidObserver.observe({ type: "first-input", buffered: true })
          } catch (e) {
            console.warn("Performance Observer not fully supported")
          }
        }

        const performanceMetrics: PerformanceMetrics = {
          loadTime: navigation.loadEventEnd - navigation.navigationStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
          firstContentfulPaint: fcp,
          largestContentfulPaint: lcp,
          cumulativeLayoutShift: cls,
          firstInputDelay: fid,
        }

        setMetrics(performanceMetrics)

        // Log performance metrics for development
        if (process.env.NODE_ENV === "development") {
          console.group("🚀 Performance Metrics")
          console.log(`Load Time: ${performanceMetrics.loadTime.toFixed(2)}ms`)
          console.log(`DOM Content Loaded: ${performanceMetrics.domContentLoaded.toFixed(2)}ms`)
          console.log(`First Contentful Paint: ${performanceMetrics.firstContentfulPaint.toFixed(2)}ms`)
          console.log(`Largest Contentful Paint: ${performanceMetrics.largestContentfulPaint.toFixed(2)}ms`)
          console.log(`Cumulative Layout Shift: ${performanceMetrics.cumulativeLayoutShift.toFixed(4)}`)
          console.log(`First Input Delay: ${performanceMetrics.firstInputDelay.toFixed(2)}ms`)
          console.groupEnd()
        }
      }
    }

    // Measure performance after page load
    if (document.readyState === "complete") {
      measurePerformance()
    } else {
      window.addEventListener("load", measurePerformance)
      return () => window.removeEventListener("load", measurePerformance)
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development" || !metrics) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="font-bold mb-2">Performance Metrics</div>
      <div className="space-y-1">
        <div>Load: {metrics.loadTime.toFixed(0)}ms</div>
        <div>FCP: {metrics.firstContentfulPaint.toFixed(0)}ms</div>
        <div>LCP: {metrics.largestContentfulPaint.toFixed(0)}ms</div>
        <div>CLS: {metrics.cumulativeLayoutShift.toFixed(4)}</div>
      </div>
    </div>
  )
}
