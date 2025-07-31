"use client"
import { useEffect, useRef, useState } from "react"

export interface TouchGesture {
  startX: number
  startY: number
  currentX: number
  currentY: number
  deltaX: number
  deltaY: number
  direction: "left" | "right" | "up" | "down" | null
  distance: number
  velocity: number
}

interface UseTouchGesturesOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onTouchStart?: (gesture: TouchGesture) => void
  onTouchMove?: (gesture: TouchGesture) => void
  onTouchEnd?: (gesture: TouchGesture) => void
  minSwipeDistance?: number
  maxSwipeTime?: number
}

export function useTouchGestures<T extends HTMLElement>(
  options: UseTouchGesturesOptions = {}
) {
  const ref = useRef<T>(null)
  const [gesture, setGesture] = useState<TouchGesture | null>(null)
  const startTimeRef = useRef<number>(0)

  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    minSwipeDistance = 50,
    maxSwipeTime = 300,
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let startTouch: Touch | null = null

    const handleTouchStart = (e: TouchEvent) => {
      startTouch = e.touches[0]
      startTimeRef.current = Date.now()
      
      const initialGesture: TouchGesture = {
        startX: startTouch.clientX,
        startY: startTouch.clientY,
        currentX: startTouch.clientX,
        currentY: startTouch.clientY,
        deltaX: 0,
        deltaY: 0,
        direction: null,
        distance: 0,
        velocity: 0,
      }
      
      setGesture(initialGesture)
      onTouchStart?.(initialGesture)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!startTouch) return
      
      const currentTouch = e.touches[0]
      const deltaX = currentTouch.clientX - startTouch.clientX
      const deltaY = currentTouch.clientY - startTouch.clientY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const time = Date.now() - startTimeRef.current
      const velocity = distance / time

      let direction: TouchGesture["direction"] = null
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? "right" : "left"
      } else {
        direction = deltaY > 0 ? "down" : "up"
      }

      const currentGesture: TouchGesture = {
        startX: startTouch.clientX,
        startY: startTouch.clientY,
        currentX: currentTouch.clientX,
        currentY: currentTouch.clientY,
        deltaX,
        deltaY,
        direction,
        distance,
        velocity,
      }

      setGesture(currentGesture)
      onTouchMove?.(currentGesture)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startTouch || !gesture) return

      const time = Date.now() - startTimeRef.current
      const { deltaX, deltaY, distance, direction } = gesture

      // Trigger swipe callbacks if conditions are met
      if (distance >= minSwipeDistance && time <= maxSwipeTime) {
        switch (direction) {
          case "left":
            onSwipeLeft?.()
            break
          case "right":
            onSwipeRight?.()
            break
          case "up":
            onSwipeUp?.()
            break
          case "down":
            onSwipeDown?.()
            break
        }
      }

      onTouchEnd?.(gesture)
      setGesture(null)
      startTouch = null
    }

    // Add passive listeners for better performance
    element.addEventListener("touchstart", handleTouchStart, { passive: true })
    element.addEventListener("touchmove", handleTouchMove, { passive: true })
    element.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    minSwipeDistance,
    maxSwipeTime,
  ])

  return { ref, gesture }
}