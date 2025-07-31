"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: "default" | "floating" | "minimal"
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    className, 
    type, 
    label, 
    error, 
    success, 
    hint, 
    leftIcon, 
    rightIcon, 
    variant = "floating",
    placeholder,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type

    const hasError = Boolean(error)
    const hasSuccess = Boolean(success)
    const isFloating = variant === "floating"

    const containerVariants = {
      default: "relative",
      floating: "relative",
      minimal: "relative border-b-2 border-neutral-200 dark:border-neutral-700 focus-within:border-blue-500 transition-colors duration-200"
    }

    const inputVariants = {
      default: cn(
        "w-full px-4 py-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700",
        "rounded-xl transition-all duration-200 placeholder:text-neutral-500",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
        hasError && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
        hasSuccess && "border-green-500 focus:ring-green-500/20 focus:border-green-500",
        leftIcon && "pl-11",
        (rightIcon || isPassword) && "pr-11"
      ),
      floating: cn(
        "w-full px-4 pt-6 pb-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700",
        "rounded-xl transition-all duration-200 placeholder:text-transparent",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
        hasError && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
        hasSuccess && "border-green-500 focus:ring-green-500/20 focus:border-green-500",
        leftIcon && "pl-11",
        (rightIcon || isPassword) && "pr-11"
      ),
      minimal: cn(
        "w-full px-2 py-3 text-sm bg-transparent border-0 border-b-2 border-neutral-200 dark:border-neutral-700",
        "transition-all duration-200 placeholder:text-neutral-500",
        "focus:outline-none focus:border-blue-500",
        hasError && "border-red-500 focus:border-red-500",
        hasSuccess && "border-green-500 focus:border-green-500",
        leftIcon && "pl-8",
        (rightIcon || isPassword) && "pr-8"
      )
    }

    return (
      <div className={cn("space-y-2", containerVariants[variant])}>
        {/* Label for non-floating variants */}
        {label && !isFloating && (
          <motion.label
            className={cn(
              "block text-sm font-medium transition-colors duration-200",
              hasError ? "text-red-600" : hasSuccess ? "text-green-600" : "text-neutral-700 dark:text-neutral-300"
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500",
              variant === "minimal" && "left-0"
            )}>
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <motion.input
            ref={inputRef}
            type={inputType}
            className={cn(inputVariants[variant], className)}
            placeholder={isFloating ? " " : placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            {...props}
          />

          {/* Floating Label */}
          {isFloating && label && (
            <motion.label
              className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none",
                leftIcon && "left-11",
                (isFocused || hasValue) 
                  ? "top-2 text-xs font-medium text-blue-600 dark:text-blue-400" 
                  : "top-1/2 transform -translate-y-1/2 text-sm text-neutral-500"
              )}
              animate={{
                scale: (isFocused || hasValue) ? 0.875 : 1,
                y: (isFocused || hasValue) ? -8 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.label>
          )}

          {/* Right Icons */}
          <div className={cn(
            "absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2",
            variant === "minimal" && "right-0"
          )}>
            {/* Status Icons */}
            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XCircle className="h-4 w-4 text-red-500" />
                </motion.div>
              )}
              {hasSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password Toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}

            {/* Custom Right Icon */}
            {rightIcon && !hasError && !hasSuccess && rightIcon}
          </div>

          {/* Focus Ring Animation */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-xl border-2 border-blue-500/50 pointer-events-none",
                  variant === "minimal" && "rounded-none border-0 border-b-2"
                )}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Helper Text */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              className="flex items-center gap-2 text-sm text-red-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
          {success && !error && (
            <motion.div
              className="flex items-center gap-2 text-sm text-green-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              {success}
            </motion.div>
          )}
          {hint && !error && !success && (
            <motion.div
              className="text-sm text-neutral-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {hint}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
EnhancedInput.displayName = "EnhancedInput"

interface EnhancedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: string
  hint?: string
  variant?: "default" | "floating" | "minimal"
}

const EnhancedTextarea = React.forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({ 
    className, 
    label, 
    error, 
    success, 
    hint, 
    variant = "floating",
    placeholder,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    React.useImperativeHandle(ref, () => textareaRef.current!)

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    const hasError = Boolean(error)
    const hasSuccess = Boolean(success)
    const isFloating = variant === "floating"

    return (
      <div className="space-y-2">
        {/* Label for non-floating variants */}
        {label && !isFloating && (
          <motion.label
            className={cn(
              "block text-sm font-medium transition-colors duration-200",
              hasError ? "text-red-600" : hasSuccess ? "text-green-600" : "text-neutral-700 dark:text-neutral-300"
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}

        {/* Textarea Container */}
        <div className="relative">
          <motion.textarea
            ref={textareaRef}
            className={cn(
              "w-full px-4 py-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700",
              "rounded-xl transition-all duration-200 resize-none",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
              hasError && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
              hasSuccess && "border-green-500 focus:ring-green-500/20 focus:border-green-500",
              isFloating && "pt-6 pb-2 placeholder:text-transparent",
              className
            )}
            placeholder={isFloating ? " " : placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            {...props}
          />

          {/* Floating Label */}
          {isFloating && label && (
            <motion.label
              className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none",
                (isFocused || hasValue) 
                  ? "top-2 text-xs font-medium text-blue-600 dark:text-blue-400" 
                  : "top-4 text-sm text-neutral-500"
              )}
              animate={{
                scale: (isFocused || hasValue) ? 0.875 : 1,
                y: (isFocused || hasValue) ? -4 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.label>
          )}

          {/* Status Icons */}
          <div className="absolute right-3 top-3">
            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XCircle className="h-4 w-4 text-red-500" />
                </motion.div>
              )}
              {hasSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Helper Text */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              className="flex items-center gap-2 text-sm text-red-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
          {success && !error && (
            <motion.div
              className="flex items-center gap-2 text-sm text-green-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              {success}
            </motion.div>
          )}
          {hint && !error && !success && (
            <motion.div
              className="text-sm text-neutral-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {hint}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
EnhancedTextarea.displayName = "EnhancedTextarea"

export { EnhancedInput, EnhancedTextarea }