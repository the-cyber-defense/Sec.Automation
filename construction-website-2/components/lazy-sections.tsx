"use client"

import { lazy, Suspense } from "react"

// Lazy load heavy sections that aren't immediately visible
const TestimonialsSection = lazy(() => import("./sections/testimonials-section"))
const ProjectsSection = lazy(() => import("./sections/projects-section"))
const ProcessSection = lazy(() => import("./sections/process-section"))

interface LazySectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

function SectionSkeleton() {
  return (
    <div className="py-20 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LazySection({ children, fallback = <SectionSkeleton /> }: LazySectionProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

export { TestimonialsSection, ProjectsSection, ProcessSection }