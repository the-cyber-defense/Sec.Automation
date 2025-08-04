"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Droplets, Building2, SquareStack, Mountain } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModernCard } from "@/components/ui/modern-card"
import { ModernButton } from "@/components/ui/modern-button"

// Icon mapping
const iconMap = {
  droplets: Droplets,
  "building-2": Building2,
  "square-stack": SquareStack,
  mountain: Mountain,
}

interface ServiceCardProps {
  title: string
  description: string
  icon?: keyof typeof iconMap
  image?: string
  href: string
  features?: string[]
  className?: string
}

export function ServiceCard({
  title,
  description,
  icon,
  image,
  href,
  features = [],
  className = ""
}: ServiceCardProps) {
  const IconComponent = icon ? iconMap[icon] : null

  return (
    <ModernCard className={cn("group overflow-hidden hover:shadow-xl transition-all duration-300", className)}>
      {/* Header with image or icon */}
      <div className="relative h-48 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950 dark:to-brand-900">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : IconComponent ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 dark:bg-neutral-900/90 p-6 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <IconComponent className="h-12 w-12 text-brand-600 dark:text-brand-400" />
            </div>
          </div>
        ) : null}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features list */}
        {features.length > 0 && (
          <div className="space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-3 flex-shrink-0" />
                {feature}
              </div>
            ))}
            {features.length > 3 && (
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                +{features.length - 3} more services
              </div>
            )}
          </div>
        )}

        {/* Action button */}
        <div className="pt-2">
          <Link href={href}>
            <ModernButton 
              variant="outline" 
              className="w-full group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all duration-300"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Learn More
            </ModernButton>
          </Link>
        </div>
      </div>
    </ModernCard>
  )
}

// Compact horizontal variant
export function ServiceCardHorizontal({
  title,
  description,
  icon,
  href,
  className = ""
}: Omit<ServiceCardProps, 'image' | 'features'>) {
  const IconComponent = icon ? iconMap[icon] : null

  return (
    <Link href={href}>
      <ModernCard className={cn(
        "group p-6 hover:shadow-lg transition-all duration-300 cursor-pointer",
        "flex items-start space-x-4",
        className
      )}>
        {/* Icon */}
        {IconComponent && (
          <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
            <IconComponent className="h-6 w-6 text-brand-600 dark:text-brand-400 group-hover:text-white" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Arrow */}
        <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
      </ModernCard>
    </Link>
  )
}

// Feature highlight variant
export function ServiceHighlight({
  title,
  description,
  icon,
  features = [],
  className = ""
}: Omit<ServiceCardProps, 'href' | 'image'>) {
  const IconComponent = icon ? iconMap[icon] : null

  return (
    <div className={cn("text-center space-y-4", className)}>
      {/* Icon */}
      {IconComponent && (
        <div className="mx-auto w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center">
          <IconComponent className="h-8 w-8 text-brand-600 dark:text-brand-400" />
        </div>
      )}

      {/* Content */}
      <div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center text-sm text-neutral-700 dark:text-neutral-300">
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}