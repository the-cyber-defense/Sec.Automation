"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const modernButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] transform-gpu",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg hover:shadow-xl hover:from-brand-600 hover:to-brand-700 border-0",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700",
        outline:
          "border-2 border-brand-200 bg-transparent text-brand-700 hover:bg-brand-50 hover:border-brand-300 dark:border-brand-800 dark:text-brand-300 dark:hover:bg-brand-950",
        secondary:
          "bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-900 shadow-md hover:shadow-lg hover:from-neutral-200 hover:to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 dark:text-neutral-100",
        ghost: "text-brand-700 hover:bg-brand-50 hover:text-brand-800 dark:text-brand-300 dark:hover:bg-brand-950",
        link: "text-brand-600 underline-offset-4 hover:underline dark:text-brand-400",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 py-1.5 text-xs",
        lg: "h-12 px-8 py-3",
        xl: "h-14 px-10 py-4 text-base",
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
  ({ className, variant, size, asChild = false, icon, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(modernButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </Comp>
    )
  },
)
ModernButton.displayName = "ModernButton"

export { ModernButton, modernButtonVariants }
