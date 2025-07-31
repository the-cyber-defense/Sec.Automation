"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { ModernButton } from "@/components/ui/modern-button"

export function ModernNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    {
      label: "Services",
      items: [
        { href: "/services/residential", label: "Residential" },
        { href: "/services/commercial", label: "Commercial" },
      ],
    },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const handleThemeToggle = () => {
    if (!mounted) return
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-lg border-b border-neutral-200/50 dark:border-neutral-800/50"
            : "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl shadow-md border-b border-white/20 dark:border-neutral-800/30",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-neutral-900/10 pointer-events-none" />

        <nav className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group relative z-10">
              <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-neutral-900 dark:text-white drop-shadow-sm">
                  Solves All Engineering
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 -mt-1 font-medium">
                  Engineering Excellence
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 relative z-10">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  item={item}
                  pathname={pathname}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4 relative z-10">
              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  onClick={handleThemeToggle}
                  className="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 transition-all duration-200 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? (
                        <Sun className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Moon className="h-5 w-5 text-neutral-700" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              )}

              {/* CTA Button */}
              <div className="hidden md:block">
                <Link href="/contact">
                  <ModernButton size="default" className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    Get Quote
                  </ModernButton>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 transition-all duration-200 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    ) : (
                      <Menu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl z-50 lg:hidden overflow-y-auto border-l border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200/50 dark:border-neutral-800/50 pb-4">
                  <div className="text-lg font-bold text-neutral-900 dark:text-white">Menu</div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors duration-200"
                  >
                    <X className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                  </button>
                </div>

                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <MobileNavItem
                      key={index}
                      item={item}
                      pathname={pathname}
                      onClose={() => setIsMobileMenuOpen(false)}
                      delay={index * 0.1}
                    />
                  ))}
                </div>

                <div className="pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <ModernButton className="w-full shadow-lg" size="lg">
                      Get Free Quote
                    </ModernButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function NavItem({ item, pathname, activeDropdown, setActiveDropdown }: any) {
  const isActive = item.href ? pathname === item.href : item.items?.some((subItem: any) => pathname === subItem.href)

  if (item.items) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setActiveDropdown(item.label)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button
          className={cn(
            "flex items-center space-x-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 backdrop-blur-sm border shadow-sm",
            isActive
              ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 border-blue-200/50 dark:border-blue-800/50"
              : "text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 bg-white/50 dark:bg-neutral-900/50 border-neutral-200/30 dark:border-neutral-700/30 hover:border-blue-200/50 dark:hover:border-blue-800/50",
          )}
        >
          <span>{item.label}</span>
          <motion.div animate={{ rotate: activeDropdown === item.label ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {activeDropdown === item.label && (
            <motion.div
              className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl p-2 border border-neutral-200/50 dark:border-neutral-800/50"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {item.items.map((subItem: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={subItem.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      pathname === subItem.href
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80",
                    )}
                  >
                    {subItem.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 backdrop-blur-sm border shadow-sm",
        isActive
          ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 border-blue-200/50 dark:border-blue-800/50"
          : "text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 bg-white/50 dark:bg-neutral-900/50 border-neutral-200/30 dark:border-neutral-700/30 hover:border-blue-200/50 dark:hover:border-blue-800/50",
      )}
    >
      {item.label}
    </Link>
  )
}

function MobileNavItem({ item, pathname, onClose, delay }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const isActive = item.href ? pathname === item.href : item.items?.some((subItem: any) => pathname === subItem.href)

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.3 }}>
      {item.items ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center justify-between w-full px-4 py-3 rounded-xl text-left transition-all duration-200 font-medium",
              isActive
                ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50"
                : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80",
            )}
          >
            <span>{item.label}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mt-2 ml-4 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.items.map((subItem: any, index: number) => (
                  <Link
                    key={index}
                    href={subItem.href}
                    onClick={onClose}
                    className={cn(
                      "block px-4 py-2 rounded-lg text-sm transition-all duration-200 font-medium",
                      pathname === subItem.href
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80",
                    )}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          href={item.href}
          onClick={onClose}
          className={cn(
            "block px-4 py-3 rounded-xl font-medium transition-all duration-200",
            isActive
              ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50"
              : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80",
          )}
        >
          {item.label}
        </Link>
      )}
    </motion.div>
  )
}
