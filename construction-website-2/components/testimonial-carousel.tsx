"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  feedback: string
  service: string
  avatar: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = ""
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isHovered, testimonials.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div 
      className={cn("relative max-w-4xl mx-auto", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main testimonial display */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-lg border border-neutral-200 dark:border-neutral-800">
        {/* Quote icon */}
        <div className="absolute top-6 left-6">
          <Quote className="h-8 w-8 text-brand-200 dark:text-brand-800" />
        </div>

        <div className="space-y-6">
          {/* Stars */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "h-5 w-5",
                  i < currentTestimonial.rating 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-300 dark:text-gray-600"
                )}
              />
            ))}
          </div>

          {/* Testimonial text */}
          <blockquote className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
            "{currentTestimonial.feedback}"
          </blockquote>

          {/* Service tag */}
          <div className="inline-block bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-3 py-1 rounded-full text-sm font-medium">
            {currentTestimonial.service}
          </div>

          {/* Customer info */}
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
              <Image
                src={currentTestimonial.avatar}
                alt={`${currentTestimonial.name} avatar`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <div className="font-semibold text-neutral-900 dark:text-white">
                {currentTestimonial.name}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {currentTestimonial.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      {testimonials.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-700 shadow-lg"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-700 shadow-lg"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {testimonials.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-brand-500 w-8"
                  : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500"
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Compact version for smaller spaces
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md border border-neutral-200 dark:border-neutral-800 h-full">
      <div className="space-y-4">
        {/* Stars */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star 
              key={i} 
              className={cn(
                "h-4 w-4",
                i < testimonial.rating 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          ))}
        </div>

        {/* Testimonial text */}
        <blockquote className="text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-4">
          "{testimonial.feedback}"
        </blockquote>

        {/* Customer info */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
            <Image
              src={testimonial.avatar}
              alt={`${testimonial.name} avatar`}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white text-sm">
              {testimonial.name}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {testimonial.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}