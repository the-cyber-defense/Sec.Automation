"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Leaf, 
  Shield, 
  Clock, 
  Award,
  Wrench,
  Target,
  Users,
  Star,
  AlertTriangle
} from "lucide-react"

import { ModernButton } from "@/components/ui/modern-button"
import { ModernCard } from "@/components/ui/modern-card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { ScaleIn } from "@/components/animations/scale-in"


const remediationServices = [
  {
    icon: Leaf,
    title: "Soil Remediation",
    description: "Professional cleanup of contaminated soil using proven environmental science techniques and sustainable methods."
  },
  {
    icon: Shield,
    title: "Water Quality Restoration",
    description: "Advanced water treatment and remediation services to restore clean, safe groundwater and surface water."
  },
  {
    icon: AlertTriangle,
    title: "Hazardous Material Cleanup",
    description: "Safe removal and disposal of hazardous materials with full regulatory compliance and environmental protection."
  },
  {
    icon: Target,
    title: "Site Assessment",
    description: "Comprehensive environmental site assessments and contamination analysis using advanced testing methods."
  }
]

const processSteps = [
  {
    step: "Environmental Assessment",
    description: "Comprehensive site evaluation and contamination testing to determine the scope and nature of environmental issues."
  },
  {
    step: "Remediation Planning", 
    description: "Development of customized remediation strategy based on contamination type, regulations, and site conditions."
  },
  {
    step: "Regulatory Approval",
    description: "Coordination with environmental agencies and obtaining necessary permits for remediation activities."
  },
  {
    step: "Professional Remediation",
    description: "Expert implementation of remediation plan with ongoing monitoring and compliance verification."
  }
]

const projectShowcases = [
  {
    title: "Industrial Site Soil Remediation",
    location: "San Ramon, CA",
    problem: "Legacy contamination affecting groundwater quality",
    solution: "In-situ soil treatment with monitoring wells",
    result: "Complete soil remediation and regulatory compliance",
    beforeImage: "/images/project16.png",
    afterImage: "/images/project17.png"
  },
  {
    title: "Residential Water Quality Restoration",
    location: "Pleasanton, CA", 
    problem: "Contaminated groundwater from previous land use",
    solution: "Advanced water treatment and soil stabilization",
    result: "Restored water quality and safe property use",
    beforeImage: "/images/project18.png",
    afterImage: "/images/project19.png"
  }
]

const testimonials = [
  {
    name: "David Rodriguez",
    location: "Alamo, CA",
    service: "Soil Remediation",
    rating: 5,
    content: "Matt's environmental science background made all the difference. Professional, thorough, and environmentally responsible approach.",
    image: "/images/testimonial-1.png"
  },
  {
    name: "Patricia Kim",
    location: "Moraga, CA", 
    service: "Water Quality Restoration",
    rating: 5,
    content: "Excellent work on our contaminated groundwater issue. Matt handled all the regulatory requirements professionally.",
    image: "/images/testimonial-2.png"
  }
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Environmental Science Expertise",
    description: "Led by Matt Mahoney with environmental science degree and deep understanding of remediation processes."
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description: "Full compliance with all environmental regulations and agency requirements for safe, legal remediation."
  },
  {
    icon: Clock,
    title: "Proven Methods", 
    description: "Time-tested remediation techniques with successful track record across Northern California."
  },
  {
    icon: Users,
    title: "Complete Solutions",
    description: "End-to-end remediation services from assessment through completion and ongoing monitoring."
  }
]

export default function RemediationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-emerald-950/20 dark:via-neutral-900 dark:to-emerald-950/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.emerald.300)_1px,_transparent_0)] bg-[size:20px_20px]" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                {/* Breadcrumb */}
                <nav className="mb-6">
                  <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                    <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/services" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Services</Link>
                    <span>/</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Remediation Services</span>
                  </div>
                </nav>

                <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 mb-6 inline-flex items-center space-x-2">
                  <Leaf className="h-4 w-4" />
                  <span>Environmental Remediation</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">
                  Environmental <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">Remediation</span> Services
                </h1>

                <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  Professional environmental remediation and site cleanup services for contaminated soil and water issues. 
                  Led by environmental science expertise with sustainable, compliant solutions.
                </p>

                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                  <Link href="/contact">
                    <ModernButton 
                      size="xl" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl"
                      icon={<Phone className="h-5 w-5" />}
                    >
                      Get Environmental Assessment
                    </ModernButton>
                  </Link>
                  <Link href="tel:+19258998123">
                    <ModernButton 
                      variant="outline" 
                      size="xl" 
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/20"
                      icon={<Phone className="h-5 w-5" />}
                    >
                      Call (925) 899-8123
                    </ModernButton>
                  </Link>
                </div>

                {/* Key Benefits */}
                <div className="flex flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>Environmental Science Expertise</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>Regulatory Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>Sustainable Methods</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <ScaleIn>
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/industrial-1.png"
                    alt="Professional environmental remediation by Solves All Engineering"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-neutral-200/50 dark:border-neutral-700/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">25+</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Sites Remediated</div>
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
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 mb-6">
                Our Specialties
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Comprehensive Remediation Services
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                From soil cleanup to water restoration, we provide complete environmental remediation 
                services with scientific expertise and regulatory compliance.
              </p>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remediationServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ModernCard className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-xl flex-shrink-0">
                        <service.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
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

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 mb-6">
                Our Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                How We Handle Environmental Remediation
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Our proven remediation process ensures safe, compliant, and effective cleanup 
                of contaminated sites with ongoing monitoring and verification.
              </p>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                    {step.step}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </StaggerIn>
        </div>
      </section>

      {/* Project Showcases */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 mb-6">
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Remediation Projects We've Completed
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                See how we've successfully remediated contaminated sites and restored environmental quality across Northern California.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projectShowcases.map((project, index) => (
              <StaggerIn key={index}>
                <ModernCard className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-square">
                      <div className="absolute inset-2 rounded-lg overflow-hidden">
                        <Image
                          src={project.beforeImage}
                          alt={`${project.title} - Before`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Before
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-square">
                      <div className="absolute inset-2 rounded-lg overflow-hidden">
                        <Image
                          src={project.afterImage}
                          alt={`${project.title} - After`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          After
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        {project.title}
                      </h3>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                        {project.location}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Challenge:</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Our Solution:</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">{project.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Results:</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">{project.result}</p>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              </StaggerIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 mb-6">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                The Solves All Engineering Advantage
              </h2>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ModernCard className="p-6 text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full mb-6">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </ModernCard>
                </motion.div>
              ))}
            </div>
          </StaggerIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 mb-6">
                Client Reviews
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                What Our Remediation Clients Say
              </h2>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ModernCard className="p-8 h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">{testimonial.location}</div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">{testimonial.service}</div>
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
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.white/.3)_1px,_transparent_0)] bg-[size:30px_30px]" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Need Environmental Remediation?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Don't let contamination threaten your property or community. Get a professional environmental 
                assessment and learn how our remediation services can restore your site safely.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                <Link href="/contact">
                  <ModernButton
                    size="xl"
                    className="bg-white text-emerald-600 hover:bg-neutral-50 shadow-xl"
                    icon={<Phone className="h-5 w-5" />}
                  >
                    Get Environmental Assessment
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

              <div className="flex items-center justify-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Environmental Science Led</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Regulatory Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Sustainable Methods</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}