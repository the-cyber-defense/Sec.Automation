"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Sparkles, Zap, Shield, Award, Users, Clock } from "lucide-react"
import { ModernButton } from "@/components/ui/modern-button"
import { ModernCard } from "@/components/ui/modern-card"
import { LazySection, OptimizedMotion } from "@/components/lazy-section"
import { useScrollAnimation } from "@/hooks/use-optimized-motion"

export default function HomePage() {
  const { ref: heroRef, animationClass: heroClass } = useScrollAnimation()
  const { ref: featuresRef, animationClass: featuresClass } = useScrollAnimation()

  return (
    <div className="min-h-screen">
      {/* Hero Section - Optimized */}
      <section 
        ref={heroRef}
        className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 transition-all duration-700 ${heroClass}`}
      >
        {/* Simplified Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.neutral.300)_1px,_transparent_0)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,_theme(colors.neutral.700)_1px,_transparent_0)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-neutral-900/50" />

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-8">
              <Sparkles className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                Competitive Pricing & Engineering Excellence
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-neutral-900 dark:text-white">
              Engineering Tomorrow's <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">Solutions</span> Today
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-12">
              Transform your vision into reality with our innovative engineering solutions. We deliver exceptional
              quality, precision, and expertise for residential, commercial, and industrial projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/services">
                <ModernButton size="xl" icon={<ArrowRight className="h-5 w-5" />}>
                  Explore Services
                </ModernButton>
              </Link>
              <Link href="/projects">
                <ModernButton variant="outline" size="xl" icon={<Sparkles className="h-5 w-5" />}>
                  View Projects
                </ModernButton>
              </Link>
            </div>

            {/* Stats - Static for better performance */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto">
              {[
                { number: "150+", label: "Projects Completed" },
                { number: "45+", label: "Years Experience" },
                { number: "1", label: "Expert Team" },
                { number: "98%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-neutral-300 dark:border-neutral-700 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Section - Lazy Loaded */}
      <LazySection className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-6">
              <Zap className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                Why Choose Solves All Engineering
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
              Excellence in Every Detail
            </h2>

            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              We combine cutting-edge technology with traditional engineering expertise to deliver solutions that exceed
              expectations and stand the test of time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description:
                  "Every project meets the highest standards of quality and durability, backed by our comprehensive warranty and satisfaction guarantee.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Zap,
                title: "Innovative Solutions",
                description:
                  "We leverage cutting-edge technology and sustainable practices to deliver efficient, future-ready engineering solutions.",
                color: "from-brand-500 to-orange-500",
              },
              {
                icon: Users,
                title: "Expert Team",
                description:
                  "Our skilled professionals bring decades of combined experience and unwavering commitment to excellence in every project.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                description:
                  "We pride ourselves on meeting deadlines and delivering projects on schedule without compromising on quality or safety.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Award,
                title: "Competitive Pricing",
                description:
                  "We offer fair, transparent pricing for all our engineering services without compromising on quality or expertise.",
                color: "from-red-500 to-rose-500",
              },
              {
                icon: CheckCircle,
                title: "Transparent Process",
                description:
                  "Clear communication, detailed planning, and regular updates ensure you're informed throughout every phase of the project.",
                color: "from-indigo-500 to-blue-500",
              },
            ].map((feature, index) => (
              <OptimizedMotion key={index} delay={index * 0.1}>
                <ModernCard className="p-8 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                      {feature.title}
                    </h3>

                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </ModernCard>
              </OptimizedMotion>
            ))}
          </div>
        </div>
      </LazySection>

      {/* Services Preview Section - Lazy Loaded */}
      <LazySection className="py-20 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-6">
                <Sparkles className="h-4 w-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Our Services</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
                Comprehensive Engineering Solutions
              </h2>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
                From residential projects to commercial complexes and industrial facilities, we provide end-to-end
                engineering services tailored to your specific needs and vision.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Custom residential engineering and design",
                  "Commercial building development and systems",
                  "Industrial facility engineering and upgrades",
                  "Structural design and project management",
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300">{service}</span>
                  </div>
                ))}
              </div>

              <Link href="/services">
                <ModernButton icon={<ArrowRight className="h-4 w-4" />}>Explore All Services</ModernButton>
              </Link>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/modern-residence-after.jpg"
                  alt="Engineering project showcase"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-neutral-200/50 dark:border-neutral-700/50">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">150+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* CTA Section */}
      <LazySection className="py-20 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.white/.3)_1px,_transparent_0)] bg-[size:30px_30px]" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build Your Vision?
            </h2>

            <p className="text-xl text-white/90 mb-12">
              Transform your ideas into reality with Solves All Engineering's expert services. Contact us today for a
              free consultation and discover how we can bring your project to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/contact">
                <ModernButton
                  variant="secondary"
                  size="xl"
                  icon={<ArrowRight className="h-5 w-5" />}
                  className="bg-white text-brand-600 hover:bg-neutral-50"
                >
                  Get Free Quote
                </ModernButton>
              </Link>
              <Link href="/projects">
                <ModernButton
                  variant="outline"
                  size="xl"
                  icon={<Sparkles className="h-5 w-5" />}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  View Portfolio
                </ModernButton>
              </Link>
            </div>
          </div>
        </div>
      </LazySection>
    </div>
  )
}