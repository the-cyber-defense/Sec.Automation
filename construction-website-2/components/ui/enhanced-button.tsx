"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2, ChevronRight } from "lucide-react"

const enhancedButtonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 border border-blue-500/20",
        secondary:
          "rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-white text-slate-900 shadow-lg shadow-slate-500/10 hover:shadow-xl hover:shadow-slate-500/20 hover:-translate-y-0.5 active:translate-y-0 border border-slate-200",
        outline:
          "rounded-2xl border-2 border-blue-200 bg-white/80 backdrop-blur-sm text-blue-700 shadow-sm hover:bg-blue-50 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
        ghost: 
          "rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
        gradient:
          "rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0",
        success:
          "rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        sm: "h-9 px-4 py-2 text-sm",
        default: "h-11 px-6 py-2.5 text-sm",
        lg: "h-12 px-8 py-3 text-base",
        xl: "h-14 px-10 py-4 text-lg",
        icon: "h-11 w-11",
      },
      style: {
        default: "",
        magnetic: "will-change-transform",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      style: "default",
    },
  },
)

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  magnetic?: boolean
  pulse?: boolean
  expandOnHover?: boolean
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    style,
    asChild = false, 
    icon, 
    rightIcon,
    loading, 
    magnetic = false,
    pulse = false,
    expandOnHover = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = React.useState(false)
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    
    React.useImperativeHandle(ref, () => buttonRef.current!)

    const Comp = asChild ? Slot : "button"

    const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
      if (!magnetic || !buttonRef.current) return
      
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      setMousePosition({ x, y })
    }, [magnetic])

    const handleMouseLeave = React.useCallback(() => {
      setMousePosition({ x: 0, y: 0 })
      setIsHovered(false)
    }, [])

    const magneticStyle = magnetic && !disabled ? {
      transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
    } : {}

    return (
      <motion.div 
        className="inline-block"
        style={magneticStyle}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <Comp 
          ref={buttonRef}
          className={cn(
            enhancedButtonVariants({ variant, size, style, className }),
            pulse && "animate-pulse",
            magnetic && "cursor-pointer",
          )}
          disabled={disabled || loading}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer" />
          
          {/* Ripple effect container */}
          <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className={cn(
            "relative flex items-center gap-2 transition-all duration-200",
            expandOnHover && "group-hover:gap-3"
          )}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              icon && (
                <motion.span 
                  className="flex-shrink-0"
                  animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {icon}
                </motion.span>
              )
            )}
            
            <motion.span
              animate={expandOnHover && isHovered ? { x: 2 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.span>
            
            {rightIcon && (
              <motion.span 
                className="flex-shrink-0"
                animate={isHovered ? { x: 2 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {rightIcon}
              </motion.span>
            )}
            
            {expandOnHover && !rightIcon && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.span>
            )}
          </div>
        </Comp>
      </motion.div>
    )
  },
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, enhancedButtonVariants }