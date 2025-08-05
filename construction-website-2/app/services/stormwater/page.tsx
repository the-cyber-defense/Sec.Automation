"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  CloudRain, 
  Shield, 
  Clock, 
  Award,
  Wrench,
  Target,
  Users,
  Star
} from "lucide-react"

import { ModernButton } from "@/components/ui/modern-button"
import { ModernCard } from "@/components/ui/modern-card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { ScaleIn } from "@/components/animations/scale-in"


const stormwaterServices = [
  {
    icon: CloudRain,
    title: "Stormwater Systems",
    description: "Custom-designed stormwater management systems to handle Northern California's intense seasonal rainfall patterns."
  },
  {
    icon: Shield,
    title: "Flood Control",
    description: "Comprehensive flood prevention systems including retention basins, culverts, and overflow management."
  },
  {
    icon: Wrench,
    title: "System Maintenance",
    description: "Regular maintenance and cleaning of stormwater systems to ensure optimal performance during heavy rains."
  },
  {
    icon: Target,
    title: "Code Compliance",
    description: "Ensuring all stormwater systems meet local regulations and environmental protection requirements."
  }
]

export default function StormwaterPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-sky-50 via-white to-sky-100 dark:from-sky-950/20 dark:via-neutral-900 dark:to-sky-950/20 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <nav className="mb-6">
                  <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                    <Link href="/" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/services" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Services</Link>
                    <span>/</span>
                    <span className="text-sky-600 dark:text-sky-400">Stormwater Management</span>
                  </div>
                </nav>

                <Badge className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-900/50 mb-6 inline-flex items-center space-x-2">
                  <CloudRain className="h-4 w-4" />
                  <span>Stormwater Management Systems</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">
                  Stormwater <span className="bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">Management</span> Solutions
                </h1>

                <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  Advanced stormwater management systems designed to handle Northern California's unique weather patterns. 
                  Professional flood control and drainage solutions for residential and commercial properties.
                </p>

                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                  <Link href="/contact">
                    <ModernButton 
                      size="xl" 
                      className="bg-sky-600 hover:bg-sky-700 text-white shadow-xl"
                      icon={<Phone className="h-5 w-5" />}
                    >
                      Get System Design
                    </ModernButton>
                  </Link>
                  <Link href="tel:+19258998123">
                    <ModernButton 
                      variant="outline" 
                      size="xl" 
                      className="border-sky-600 text-sky-600 hover:bg-sky-50 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-950/20"
                      icon={<Phone className="h-5 w-5" />}
                    >
                      Call (925) 899-8123
                    </ModernButton>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <span>California Weather Expertise</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <span>Code Compliant Systems</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <span>Flood Prevention</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <ScaleIn>
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/project-3.png"
                    alt="Professional stormwater management system by Solves All Engineering"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-neutral-200/50 dark:border-neutral-700/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-1">75+</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Stormwater Systems</div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Comprehensive Stormwater Services
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                From system design to maintenance, we provide complete stormwater management 
                solutions tailored to Northern California's challenging weather conditions.
              </p>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stormwaterServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ModernCard className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="bg-sky-100 dark:bg-sky-900/30 p-4 rounded-xl flex-shrink-0">
                        <service.icon className="h-8 w-8 text-sky-600 dark:text-sky-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                          {service.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </ModernCard>
                </motion.div>
              ))}
            </div>
          </StaggerIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready for Better Stormwater Management?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Don't let seasonal storms damage your property. Get a professional stormwater system 
                designed for Northern California's unique weather challenges.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/contact">
                  <ModernButton
                    size="xl"
                    className="bg-white text-sky-600 hover:bg-neutral-50 shadow-xl"
                    icon={<Phone className="h-5 w-5" />}
                  >
                    Get System Design
                  </ModernButton>
                </Link>
                <Link href="tel:+19258998123">
                  <ModernButton
                    variant="outline"
                    size="xl"
                    className="border-white/30 text-white hover:bg-white/10"
                    icon={<Phone className="h-5 w-5" />}
                  >
                    Call (925) 899-8123
                  </ModernButton>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}