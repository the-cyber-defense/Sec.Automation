"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Mountain, 
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


const retainmentServices = [
  {
    icon: Mountain,
    title: "Retaining Walls",
    description: "Custom-designed retaining walls using concrete, stone, and engineered materials for maximum durability and aesthetic appeal."
  },
  {
    icon: Shield,
    title: "Slope Stabilization",
    description: "Professional slope stabilization solutions to prevent landslides and erosion on challenging hillside properties."
  },
  {
    icon: Wrench,
    title: "Erosion Control",
    description: "Comprehensive erosion control systems including terracing, drainage integration, and soil reinforcement techniques."
  },
  {
    icon: Target,
    title: "Soil Engineering",
    description: "Expert soil analysis and engineering solutions for optimal foundation support and long-term stability."
  }
]

const processSteps = [
  {
    step: "Site Analysis",
    description: "Comprehensive geotechnical analysis of soil conditions, slope angles, and environmental factors."
  },
  {
    step: "Engineering Design", 
    description: "Custom retaining wall design with proper drainage integration and load calculations for safety."
  },
  {
    step: "Material Selection",
    description: "Selection of appropriate materials based on aesthetic preferences, budget, and structural requirements."
  },
  {
    step: "Professional Construction",
    description: "Expert installation with proper foundation work, drainage systems, and quality craftsmanship."
  }
]

const projectShowcases = [
  {
    title: "Hillside Retaining Wall System",
    location: "Lafayette, CA",
    problem: "Severe slope erosion threatening property foundation",
    solution: "Multi-tiered retaining wall with integrated drainage",
    result: "Complete slope stabilization and enhanced property value",
    beforeImage: "/images/project12.png",
    afterImage: "/images/project13.png"
  },
  {
    title: "Commercial Slope Stabilization",
    location: "Danville, CA", 
    problem: "Unstable hillside affecting building safety",
    solution: "Engineered retaining system with soil reinforcement",
    result: "Permanent slope stability and code compliance",
    beforeImage: "/images/project14.png",
    afterImage: "/images/project15.png"
  }
]

const testimonials = [
  {
    name: "Michael Thompson",
    location: "Orinda, CA",
    service: "Retaining Wall Construction",
    rating: 5,
    content: "Solves All Engineering transformed our unstable hillside into a beautiful, functional space. Their engineering expertise is unmatched.",
    image: "/images/testimonial-1.png"
  },
  {
    name: "Sarah Davis",
    location: "Walnut Creek, CA", 
    service: "Slope Stabilization",
    rating: 5,
    content: "Professional, reliable, and knowledgeable. Our slope has been completely stable since Matt's team completed the work.",
    image: "/images/testimonial-2.png"
  }
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Engineering Expertise",
    description: "Professional engineering design ensures structural integrity and long-term performance."
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed contractor with comprehensive insurance for your protection and peace of mind."
  },
  {
    icon: Clock,
    title: "Proven Track Record", 
    description: "Decades of experience with challenging Northern California terrain and soil conditions."
  },
  {
    icon: Users,
    title: "Quality Guarantee",
    description: "We stand behind our retaining wall construction with comprehensive warranties and guarantees."
  }
]

export default function RetainmentPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-green-950/20 dark:via-neutral-900 dark:to-green-950/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.green.300)_1px,_transparent_0)] bg-[size:20px_20px]" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                {/* Breadcrumb */}
                <nav className="mb-6">
                  <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                    <Link href="/" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/services" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Services</Link>
                    <span>/</span>
                    <span className="text-green-600 dark:text-green-400">Earth Retainment</span>
                  </div>
                </nav>

                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 mb-6 inline-flex items-center space-x-2">
                  <Mountain className="h-4 w-4" />
                  <span>Professional Earth Retainment</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">
                  Earth <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Retainment</span> Solutions
                </h1>

                <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  Professional retaining wall construction and slope stabilization for challenging terrain. 
                  We specialize in engineered solutions that provide lasting erosion control and enhance property value.
                </p>

                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                  <Link href="/contact">
                    <ModernButton 
                      size="xl" 
                      className="bg-green-600 hover:bg-green-700 text-white shadow-xl"
                      icon={<Phone className="h-5 w-5" />}
                    >
                      Get Free Consultation
                    </ModernButton>
                  </Link>
                  <Link href="tel:+19258998123">
                    <ModernButton 
                      variant="outline" 
                      size="xl" 
                      className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950/20"
                      icon={<Phone className="h-5 w-5" />}
                    >
                      Call (925) 899-8123
                    </ModernButton>
                  </Link>
                </div>

                {/* Key Benefits */}
                <div className="flex flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Free Site Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Engineered Solutions</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <ScaleIn>
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/afterRetainingwall.png"
                    alt="Professional retaining wall construction by Solves All Engineering"
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
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">50+</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Retaining Walls Built</div>
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
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 mb-6">
                Our Specialties
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Comprehensive Retainment Services
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                From retaining walls to slope stabilization, we provide engineered solutions 
                for challenging terrain and long-term erosion control.
              </p>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {retainmentServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ModernCard className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl flex-shrink-0">
                        <service.icon className="h-8 w-8 text-green-600 dark:text-green-400" />
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
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 mb-6">
                Our Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                How We Build Retaining Solutions
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Our proven process ensures your retaining wall is engineered for maximum effectiveness, 
                safety, and long-term durability.
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
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
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
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 mb-6">
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Retaining Wall Projects We've Completed
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                See how we've solved challenging slope and erosion problems for property owners across Northern California.
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
                        <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                      <Badge variant="outline" className="text-green-600 border-green-600">
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 mb-6">
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
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full mb-6">
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
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 mb-6">
                Client Reviews
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                What Our Retaining Wall Clients Say
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
                        <div className="text-xs text-green-600 dark:text-green-400">{testimonial.service}</div>
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
      <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.white/.3)_1px,_transparent_0)] bg-[size:30px_30px]" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Stabilize Your Property?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Don't let erosion damage your property. Get a free site analysis and learn how our 
                retaining wall solutions can protect and enhance your land.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                <Link href="/contact">
                  <ModernButton
                    size="xl"
                    className="bg-white text-green-600 hover:bg-neutral-50 shadow-xl"
                    icon={<Phone className="h-5 w-5" />}
                  >
                    Get Free Site Analysis
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
                  <span>Free Site Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Engineered Solutions</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}