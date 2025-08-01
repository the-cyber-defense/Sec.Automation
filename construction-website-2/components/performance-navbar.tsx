"use client"

import { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

// Memoized logo component
const Logo = memo(() => (
  <Link href="/" className="flex items-center space-x-2 group">
    <div className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-105">
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <path d="M16 2L4 8v10c0 8 12 12 12 12s12-4 12-12V8L16 2z" fill="url(#logoGradient)" stroke="none" />
        <path
          d="M12 16l3 3 6-6"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      Solves All Engineering
    </span>
  </Link>
))
Logo.displayName = "Logo"

// Memoized navigation links
const NavigationLinks = memo(({ pathname }: { pathname: string }) => (
  <div className="hidden lg:flex items-center space-x-1">
    {navigation.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className={cn(
          "px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 min-h-[44px] flex items-center",
          pathname === item.href 
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" 
            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
        )}
      >
        {item.name}
      </Link>
    ))}
  </div>
))
NavigationLinks.displayName = "NavigationLinks"

// Memoized contact info
const ContactInfo = memo(() => (
  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
    <div className="flex items-center space-x-1">
      <Phone className="h-4 w-4" />
      <a href="tel:+19258998123" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        (925) 899-8123
      </a>
    </div>
    <div className="flex items-center space-x-1">
      <Mail className="h-4 w-4" />
      <a href="mailto:Matt@solvesall.org" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        Matt@solvesall.org
      </a>
    </div>
  </div>
))
ContactInfo.displayName = "ContactInfo"

export function PerformanceNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }
  }, [isScrolled])

  useEffect(() => {
    let ticking = false
    
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", scrollHandler, { passive: true })
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50" 
            : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Logo />
            <NavigationLinks pathname={pathname} />

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              <ContactInfo />
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Quote
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center",
                      pathname === item.href
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-2 px-4">
                      <Phone className="h-4 w-4" />
                      <a href="tel:+19258998123" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        (925) 899-8123
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 px-4">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:Matt@solvesall.org" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Matt@solvesall.org
                      </a>
                    </div>
                  </div>
                  <Link href="/contact" className="block px-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  )
}