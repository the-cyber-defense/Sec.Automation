"use client"

import { ReactNode, Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"

interface PerformanceWrapperProps {
  children: ReactNode
}

function PageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="h-16 bg-gray-200"></div>
      <div className="h-96 bg-gray-100"></div>
      <div className="container mx-auto px-4 py-20">
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PerformanceWrapper({ children }: PerformanceWrapperProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {children}
      <Analytics />
    </Suspense>
  )
}