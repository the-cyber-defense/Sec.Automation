"use client"

import { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { companyInfo } from "@/lib/solvesall-data"

const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "Services", 
    href: "/services",
    subItems: [
      { name: "Drainage Solutions", href: "/services/drainage" },
      { name: "Retaining Walls", href: "/services/retaining-walls" },
      { name: "Decks & Pavers", href: "/services/pavers" },
      { name: "Grading & Excavation", href: "/services/grading" }
    ]
  },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

// Memoized logo component
const Logo = memo(() => (
  <Link href="/" className="flex items-center space-x-3 group">
    <div className="w-10 h-10 md:w-12 md:h-12 transition-transform group-hover:scale-105">
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        {/* House/Building Shape */}
        <path 
          d="M24 4L8 16v20c0 2 2 4 4 4h24c2 0 4-2 4-4V16L24 4z" 
          fill="url(#logoGradient)" 
          stroke="none" 
        />
        {/* Drainage lines */}
        <path 
          d="M16 24h16M16 28h12M16 32h8" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        {/* Foundation line */}
        <path 
          d="M12 36h24" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
      </svg>
    </div>
    <div>
      <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        Solves All Engineering
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
        East Bay Drainage & Construction
      </div>
    </div>
  </Link>
))
Logo.displayName = "Logo"

// Memoized contact info
const ContactInfo = memo(() => (
  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
    <div className="flex items-center space-x-2">
      <Phone className="h-4 w-4" />
      <a 
        href={`tel:${companyInfo.contact.phone}`} 
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
      >
        {companyInfo.contact.phone}
      </a>
    </div>
    <div className="flex items-center space-x-2">
      <Mail className="h-4 w-4" />
      <a 
        href={`mailto:${companyInfo.contact.email}`} 
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {companyInfo.contact.email}
      </a>
    </div>
  </div>
))
ContactInfo.displayName = "ContactInfo"

// Dropdown menu component
function DropdownMenu({ item, pathname }: { item: any, pathname: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={cn(
          "flex items-center space-x-1 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 min-h-[44px]",
          pathname.startsWith(item.href) 
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" 
            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
        )}
      >
        <span>{item.name}</span>
        {item.subItems && <ChevronDown className="h-4 w-4" />}
      </Link>

      {item.subItems && isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {item.subItems.map((subItem: any) => (
            <Link
              key={subItem.name}
              href={subItem.href}
              className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function SolvesAllNavbar() {
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
          <div className="flex items-center justify-between h-18 md:h-20">
            <Logo />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => 
                item.subItems ? (
                  <DropdownMenu key={item.name} item={item} pathname={pathname} />
                ) : (
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
                )
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <ContactInfo />
              <ThemeToggle />
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Free Quote
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
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center",
                        pathname === item.href || pathname.startsWith(item.href)
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800",
                      )}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Mobile sub-items */}
                    {item.subItems && (
                      <div className="ml-4 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-2 px-4">
                      <Phone className="h-4 w-4" />
                      <a 
                        href={`tel:${companyInfo.contact.phone}`} 
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                      >
                        {companyInfo.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 px-4">
                      <Mail className="h-4 w-4" />
                      <a 
                        href={`mailto:${companyInfo.contact.email}`} 
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {companyInfo.contact.email}
                      </a>
                    </div>
                  </div>
                  <Link href="/contact" className="block px-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      Get Free Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-18 md:h-20" />
    </>
  )
}