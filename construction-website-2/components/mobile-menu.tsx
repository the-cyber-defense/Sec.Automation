"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Home, Info, Wrench, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "Contact", href: "/contact", icon: Phone },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">Solves All</div>
                    <div className="text-xs text-gray-600">Engineering</div>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 py-6">
                <nav className="space-y-2 px-6">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                          pathname === item.href
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 space-y-4">
                <Link href="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Free Quote</Button>
                </Link>
                <div className="text-center text-sm text-gray-600">
                  <div className="font-medium">Call Us Today</div>
                  <div className="text-blue-600">(510) 555-0123</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
