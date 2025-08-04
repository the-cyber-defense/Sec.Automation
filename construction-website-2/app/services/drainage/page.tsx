import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Phone, Droplets, Shield, Clock, Award } from "lucide-react"
import { ModernButton } from "@/components/ui/modern-button"
import { ModernCard } from "@/components/ui/modern-card"
import { ProjectBeforeAfter } from "@/components/before-after-slider"
import { TestimonialCard } from "@/components/testimonial-carousel"
import { services, projects, testimonials, processSteps, companyInfo } from "@/lib/solvesall-data"

export const metadata = {
  title: "Drainage Solutions | French Drains & Foundation Waterproofing | Solves All Engineering",
  description: "Expert drainage solutions in the East Bay. French drains, foundation waterproofing, sump pumps, and grading. Prevent water damage with professional installation.",
  keywords: ["drainage solutions", "French drains", "foundation waterproofing", "sump pump installation", "East Bay drainage", "water damage prevention"]
}

export default function DrainagePage() {
  const drainageService = services.drainage
  const drainageProjects = projects.filter(p => p.category === "Drainage")
  const drainageTestimonials = testimonials.filter(t => t.service.toLowerCase().includes("drainage") || t.service.toLowerCase().includes("french"))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/drainage-hero-background.jpg"
            alt="Professional drainage installation"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-white/80">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <span>/</span>
                <span className="text-white">Drainage Solutions</span>
              </div>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 mb-8">
              <Droplets className="h-4 w-4 text-blue-300" />
              <span className="text-blue-100 font-medium">Professional Drainage Solutions</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {drainageService.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {drainageService.description}
            </p>

            {/* Benefits */}
            <p className="text-lg text-white/80 mb-10">
              {drainageService.benefits}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/contact">
                <ModernButton 
                  size="xl" 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl"
                  icon={<Phone className="h-5 w-5" />}
                >
                  Get Free Quote
                </ModernButton>
              </Link>
              <Link href={`tel:${companyInfo.contact.phone}`}>
                <ModernButton 
                  variant="outline" 
                  size="xl" 
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  icon={<Phone className="h-5 w-5" />}
                >
                  Call {companyInfo.contact.phone}
                </ModernButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
              Comprehensive Drainage Services
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              From French drains to foundation waterproofing, we provide complete drainage solutions 
              to keep your property dry and protected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drainageService.subServices.map((service, index) => (
              <ModernCard key={service} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl flex-shrink-0">
                    <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      {service}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Professional installation and maintenance for optimal water management.
                    </p>
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
              Our Drainage Installation Process
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              We follow a proven process to ensure your drainage system is designed and installed 
              for maximum effectiveness and longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {drainageService.process?.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                  {step.step}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {drainageProjects.length > 0 && (
        <section className="py-20 bg-white dark:bg-neutral-900">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Drainage Projects We've Completed
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                See how we've solved complex drainage challenges for homeowners across the East Bay.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {drainageProjects.map((project) => (
                <div key={project.id} className="space-y-6">
                  <ProjectBeforeAfter
                    title={project.title}
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    beforeAlt={`${project.title} - Before`}
                    afterAlt={`${project.title} - After`}
                    height={300}
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Challenge:</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Our Solution:</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Results:</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">{project.result}</p>
                    </div>
                    
                    <Link href={`/projects/${project.id}`}>
                      <ModernButton variant="outline" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
                        View Full Project
                      </ModernButton>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
              Why Choose Our Drainage Services?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ModernCard className="p-6 text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Licensed & Insured
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Fully licensed contractor with comprehensive insurance coverage for your protection.
              </p>
            </ModernCard>

            <ModernCard className="p-6 text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Environmental Expertise
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Environmental science background ensures sustainable, effective solutions.
              </p>
            </ModernCard>

            <ModernCard className="p-6 text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Proven Experience
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Decades of experience solving drainage challenges throughout the East Bay.
              </p>
            </ModernCard>

            <ModernCard className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Quality Guarantee
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Satisfaction guaranteed with quality materials and expert craftsmanship.
              </p>
            </ModernCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {drainageTestimonials.length > 0 && (
        <section className="py-20 bg-white dark:bg-neutral-900">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                What Our Drainage Clients Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {drainageTestimonials.slice(0, 2).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.white/.3)_1px,_transparent_0)] bg-[size:30px_30px]" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Solve Your Drainage Problems?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Don't let water damage your property. Get a free consultation and learn how our 
              drainage solutions can protect your home and enhance your peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <Link href="/contact">
                <ModernButton
                  size="xl"
                  className="bg-white text-blue-600 hover:bg-neutral-50 shadow-xl"
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

            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Free Consultations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}