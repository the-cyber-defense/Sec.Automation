"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  cls: number | null
  fid: number | null
  ttfb: number | null
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
  })

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== "development") return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case "paint":
            if (entry.name === "first-contentful-paint") {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }))
            }
            break
          case "largest-contentful-paint":
            setMetrics((prev) => ({ ...prev, lcp: entry.startTime }))
            break
          case "layout-shift":
            if (!(entry as any).hadRecentInput) {
              setMetrics((prev) => ({ ...prev, cls: (prev.cls || 0) + (entry as any).value }))
            }
            break
          case "first-input":
            setMetrics((prev) => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }))
            break
          case "navigation":
            setMetrics((prev) => ({ ...prev, ttfb: (entry as any).responseStart }))
            break
        }
      }
    })

    observer.observe({ entryTypes: ["paint", "largest-contentful-paint", "layout-shift", "first-input", "navigation"] })

    return () => observer.disconnect()
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="space-y-1">
        <div>FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : "..."}</div>
        <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : "..."}</div>
        <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : "..."}</div>
        <div>FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : "..."}</div>
        <div>TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : "..."}</div>
      </div>
    </div>
  )
}
