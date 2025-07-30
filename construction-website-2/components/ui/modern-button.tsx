"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const modernButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 active:scale-[0.98]",
        outline:
          "border-2 border-blue-200 bg-white/80 backdrop-blur-sm text-blue-700 hover:bg-blue-50 hover:border-blue-300 active:scale-[0.98]",
        secondary:
          "bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-900 shadow-md hover:shadow-lg hover:from-neutral-200 hover:to-neutral-300 active:scale-[0.98]",
        ghost: "text-blue-700 hover:bg-blue-50 hover:text-blue-800 active:scale-[0.98]",
        link: "text-blue-600 underline-offset-4 hover:underline active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        xl: "h-14 px-10 py-4 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ModernButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof modernButtonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  loading?: boolean
}

const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ className, variant, size, asChild = false, icon, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
        <Comp className={cn(modernButtonVariants({ variant, size, className }))} ref={ref} {...props}>
          {/* Background gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Content */}
          <div className="relative flex items-center gap-2">
            {loading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              icon && <span className="flex-shrink-0">{icon}</span>
            )}
            {children}
          </div>
        </Comp>
      </motion.div>
    )
  },
)
ModernButton.displayName = "ModernButton"

export { ModernButton, modernButtonVariants }
