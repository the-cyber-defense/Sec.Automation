"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useState, useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render with theme provider but prevent flash with better SSR handling
  if (!mounted) {
    return (
      <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white antialiased min-h-screen transition-colors duration-300">
        <div className="opacity-0 animate-in">
          {children}
        </div>
      </div>
    )
  }

  return (
    <NextThemesProvider {...props}>
      <div className="transition-colors duration-300 ease-out">
        {children}
      </div>
    </NextThemesProvider>
  )
}
