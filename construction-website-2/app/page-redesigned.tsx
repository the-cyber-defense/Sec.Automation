"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, Star } from "lucide-react"
import { ModernButton } from "@/components/ui/modern-button"
import { ModernCard } from "@/components/ui/modern-card"
import { ServiceCard } from "@/components/service-card"
import { ProjectBeforeAfter } from "@/components/before-after-slider"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { LazySection, OptimizedMotion } from "@/components/lazy-section"
import { companyInfo, services, projects, testimonials, whyChooseUs, processSteps } from "@/lib/solvesall-data"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-drainage-project.jpg"
            alt="Professional drainage and retaining wall construction"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <OptimizedMotion delay={0}>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-medium">
                  East Bay's #1 Choice for Drainage & Retaining Walls
                </span>
              </div>
            </OptimizedMotion>

            {/* Main Heading */}
            <OptimizedMotion delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {companyInfo.tagline}
              </h1>
            </OptimizedMotion>

            {/* Mission Statement */}
            <OptimizedMotion delay={0.4}>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {companyInfo.mission}
              </p>
            </OptimizedMotion>

            {/* Service Areas */}
            <OptimizedMotion delay={0.6}>
              <div className="flex flex-wrap items-center gap-2 mb-12">
                <span className="text-white/80">Serving:</span>
                {companyInfo.serviceArea.slice(0, 4).map((area, index) => (
                  <span key={area} className="text-white font-medium">
                    {area}{index < 3 ? "," : ""}
                  </span>
                ))}
                <span className="text-white/80">& surrounding areas</span>
              </div>
            </OptimizedMotion>

            {/* CTA Buttons */}
            <OptimizedMotion delay={0.8}>
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/contact">
                  <ModernButton 
                    size="xl" 
                    className="bg-brand-600 hover:bg-brand-700 text-white shadow-xl hover:scale-105 transition-all duration-300"
                    icon={<Phone className="h-5 w-5" />}
                  >
                    Get Free Quote
                  </ModernButton>
                </Link>
                <Link href="/projects">
                  <ModernButton 
                    variant="outline" 
                    size="xl" 
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                    icon={<ArrowRight className="h-5 w-5" />}
                  >
                    View Our Work
                  </ModernButton>
                </Link>
              </div>
            </OptimizedMotion>
          </div>
        </div>

        {/* Floating Contact Info */}
        <OptimizedMotion delay={1}>
          <div className="absolute bottom-8 right-8 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-white space-y-2">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${companyInfo.contact.phone}`} className="hover:text-brand-300 transition-colors">
                    {companyInfo.contact.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${companyInfo.contact.email}`} className="hover:text-brand-300 transition-colors">
                    {companyInfo.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </OptimizedMotion>
      </section>

      {/* Services Section */}
      <LazySection className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <OptimizedMotion>
              <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-6">
                <CheckCircle className="h-4 w-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                  Our Expertise
                </span>
              </div>
            </OptimizedMotion>

            <OptimizedMotion delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
                Professional Construction Services
              </h2>
            </OptimizedMotion>

            <OptimizedMotion delay={0.4}>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                From drainage solutions to retaining walls, we deliver engineering excellence 
                that protects your property and enhances your outdoor living space.
              </p>
            </OptimizedMotion>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <OptimizedMotion delay={0.1}>
              <ServiceCard
                title={services.drainage.title}
                description={services.drainage.description}
                icon="droplets"
                href="/services/drainage"
                features={services.drainage.subServices}
              />
            </OptimizedMotion>

            <OptimizedMotion delay={0.2}>
              <ServiceCard
                title={services.retainingWalls.title}
                description={services.retainingWalls.description}
                icon="building-2"
                href="/services/retaining-walls"
                features={services.retainingWalls.materials}
              />
            </OptimizedMotion>

            <OptimizedMotion delay={0.3}>
              <ServiceCard
                title={services.pavers.title}
                description={services.pavers.description}
                icon="square-stack"
                href="/services/pavers"
                features={services.pavers.applications}
              />
            </OptimizedMotion>

            <OptimizedMotion delay={0.4}>
              <ServiceCard
                title={services.grading.title}
                description={services.grading.description}
                icon="mountain"
                href="/services/grading"
                features={services.grading.services}
              />
            </OptimizedMotion>
          </div>
        </div>
      </LazySection>

      {/* Featured Projects Section */}
      <LazySection className="py-20 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <OptimizedMotion>
              <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-6">
                <ArrowRight className="h-4 w-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                  Our Work
                </span>
              </div>
            </OptimizedMotion>

            <OptimizedMotion delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
                Transforming Properties Across the East Bay
              </h2>
            </OptimizedMotion>

            <OptimizedMotion delay={0.4}>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                See how we've solved complex drainage, retaining wall, and construction challenges 
                for homeowners throughout the East Bay area.
              </p>
            </OptimizedMotion>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.slice(0, 4).map((project, index) => (
              <OptimizedMotion key={project.id} delay={index * 0.2}>
                <div className="space-y-6">
                  <ProjectBeforeAfter
                    title={project.title}
                    category={project.category}
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    beforeAlt={`${project.title} - Before`}
                    afterAlt={`${project.title} - After`}
                    height={300}
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Problem:</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Solution:</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Result:</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">{project.result}</p>
                    </div>
                    
                    <Link href={`/projects/${project.id}`}>
                      <ModernButton variant="outline" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
                        View Full Project
                      </ModernButton>
                    </Link>
                  </div>
                </div>
              </OptimizedMotion>
            ))}
          </div>

          <OptimizedMotion delay={0.8}>
            <div className="text-center mt-12">
              <Link href="/projects">
                <ModernButton size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                  View All Projects
                </ModernButton>
              </Link>
            </div>
          </OptimizedMotion>
        </div>
      </LazySection>

      {/* Why Choose Us Section */}
      <LazySection className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <OptimizedMotion>
              <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-6">
                <Star className="h-4 w-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                  Why Choose Us
                </span>
              </div>
            </OptimizedMotion>

            <OptimizedMotion delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
                East Bay Construction Experts
              </h2>
            </OptimizedMotion>

            <OptimizedMotion delay={0.4}>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                {companyInfo.founderBio}
              </p>
            </OptimizedMotion>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <OptimizedMotion key={feature.title} delay={index * 0.1}>
                <ModernCard className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="mx-auto w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center mb-4">
                    {/* Icon would be rendered here based on feature.icon */}
                    <div className="w-6 h-6 bg-brand-500 rounded" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </ModernCard>
              </OptimizedMotion>
            ))}
          </div>
        </div>
      </LazySection>

      {/* Testimonials Section */}
      <LazySection className="py-20 bg-gradient-to-br from-brand-50 to-white dark:from-brand-950 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <OptimizedMotion>
              <div className="inline-flex items-center space-x-2 bg-brand-100 dark:bg-brand-900/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-6">
                <Star className="h-4 w-4 text-brand-600" />
                <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                  Client Testimonials
                </span>
              </div>
            </OptimizedMotion>

            <OptimizedMotion delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
                What Our Clients Say
              </h2>
            </OptimizedMotion>

            <OptimizedMotion delay={0.4}>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what homeowners across the East Bay 
                have to say about working with Solves All Engineering.
              </p>
            </OptimizedMotion>
          </div>

          <OptimizedMotion delay={0.6}>
            <TestimonialCarousel testimonials={testimonials} />
          </OptimizedMotion>
        </div>
      </LazySection>

      {/* CTA Section */}
      <LazySection className="py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.white/.3)_1px,_transparent_0)] bg-[size:30px_30px]" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <OptimizedMotion>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Solve Your Property Challenges?
              </h2>
            </OptimizedMotion>

            <OptimizedMotion delay={0.2}>
              <p className="text-xl text-white/90 mb-8">
                Get a free consultation and discover how we can protect your property 
                while enhancing your outdoor living space. Licensed, insured, and trusted 
                throughout the East Bay.
              </p>
            </OptimizedMotion>

            <OptimizedMotion delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                <Link href="/contact">
                  <ModernButton
                    size="xl"
                    className="bg-white text-brand-600 hover:bg-neutral-50 shadow-xl hover:scale-105 transition-all duration-300"
                    icon={<Phone className="h-5 w-5" />}
                  >
                    Get Free Quote
                  </ModernButton>
                </Link>
                <Link href={`tel:${companyInfo.contact.phone}`}>
                  <ModernButton
                    variant="outline"
                    size="xl"
                    className="border-white/30 text-white hover:bg-white/10"
                    icon={<Phone className="h-5 w-5" />}
                  >
                    Call {companyInfo.contact.phone}
                  </ModernButton>
                </Link>
              </div>
            </OptimizedMotion>

            <OptimizedMotion delay={0.6}>
              <div className="flex items-center justify-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Free Consultations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Satisfaction Guaranteed</span>
                </div>
              </div>
            </OptimizedMotion>
          </div>
        </div>
      </LazySection>
    </div>
  )
}