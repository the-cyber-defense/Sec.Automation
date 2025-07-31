"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

export interface NotificationProps {
  id: string
  title?: string
  message: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: (id: string) => void
  action?: {
    label: string
    onClick: () => void
  }
}

const NotificationContext = React.createContext<{
  notifications: NotificationProps[]
  addNotification: (notification: Omit<NotificationProps, "id">) => void
  removeNotification: (id: string) => void
}>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
})

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = React.useState<NotificationProps[]>([])

  const addNotification = React.useCallback((notification: Omit<NotificationProps, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }, [])

  const removeNotification = React.useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

function NotificationContainer() {
  const { notifications } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function Notification({ id, title, message, type = "info", onClose, action }: NotificationProps) {
  const { removeNotification } = useNotifications()

  const handleClose = () => {
    onClose?.(id)
    removeNotification(id)
  }

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const colors = {
    success: {
      bg: "bg-green-50 dark:bg-green-950/20",
      border: "border-green-200 dark:border-green-800",
      icon: "text-green-500",
      text: "text-green-800 dark:text-green-200"
    },
    error: {
      bg: "bg-red-50 dark:bg-red-950/20",
      border: "border-red-200 dark:border-red-800",
      icon: "text-red-500",
      text: "text-red-800 dark:text-red-200"
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-950/20",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: "text-yellow-500",
      text: "text-yellow-800 dark:text-yellow-200"
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-500",
      text: "text-blue-800 dark:text-blue-200"
    }
  }

  const Icon = icons[type]
  const colorScheme = colors[type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative p-4 rounded-xl shadow-lg backdrop-blur-sm border",
        colorScheme.bg,
        colorScheme.border
      )}
    >
      <div className="flex items-start space-x-3">
        <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", colorScheme.icon)} />
        
        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn("text-sm font-semibold", colorScheme.text)}>
              {title}
            </p>
          )}
          <p className={cn("text-sm", colorScheme.text, title && "mt-1")}>
            {message}
          </p>
          
          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                "mt-2 text-sm font-medium underline hover:no-underline transition-all duration-200",
                colorScheme.text
              )}
            >
              {action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={handleClose}
          className={cn(
            "flex-shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200",
            colorScheme.text
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

// Convenience functions
export const toast = {
  success: (message: string, options?: Partial<NotificationProps>) => {
    const { addNotification } = React.useContext(NotificationContext)
    addNotification({ message, type: "success", ...options })
  },
  error: (message: string, options?: Partial<NotificationProps>) => {
    const { addNotification } = React.useContext(NotificationContext)
    addNotification({ message, type: "error", ...options })
  },
  warning: (message: string, options?: Partial<NotificationProps>) => {
    const { addNotification } = React.useContext(NotificationContext)
    addNotification({ message, type: "warning", ...options })
  },
  info: (message: string, options?: Partial<NotificationProps>) => {
    const { addNotification } = React.useContext(NotificationContext)
    addNotification({ message, type: "info", ...options })
  },
}

// Hook to use toast anywhere
export function useToast() {
  const { addNotification } = useNotifications()
  
  return {
    success: (message: string, options?: Partial<NotificationProps>) =>
      addNotification({ message, type: "success", ...options }),
    error: (message: string, options?: Partial<NotificationProps>) =>
      addNotification({ message, type: "error", ...options }),
    warning: (message: string, options?: Partial<NotificationProps>) =>
      addNotification({ message, type: "warning", ...options }),
    info: (message: string, options?: Partial<NotificationProps>) =>
      addNotification({ message, type: "info", ...options }),
  }
}