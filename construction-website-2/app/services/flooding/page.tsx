"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Home, 
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

export const metadata = {
  title: "Residential Flooding Solutions | Home Water Intrusion Prevention | Solves All Engineering",
  description: "Specialized solutions for homes experiencing flooding, water intrusion, and drainage problems. Expert residential water management and flood prevention.",
  keywords: ["residential flooding", "water intrusion", "home flooding solutions", "basement flooding", "residential drainage"]
}

const floodingSolutions = [
  {
    icon: Home,
    title: "Basement Waterproofing",
    description: "Complete basement waterproofing solutions including interior and exterior drainage systems to keep basements dry."
  },
  {
    icon: Shield,
    title: "Foundation Protection",
    description: "Comprehensive foundation waterproofing and drainage to prevent water damage and structural issues."
  },
  {
    icon: AlertTriangle,
    title: "Emergency Response",
    description: "Rapid response services for active flooding situations with immediate mitigation and long-term solutions."
  },
  {
    icon: Target,
    title: "Water Intrusion Prevention",
    description: "Proactive measures to prevent water intrusion including grading, drainage, and barrier systems."
  }
]

const projectShowcases = [
  {
    title: "Basement Flooding Solution",
    location: "San Ramon, CA",
    problem: "Recurring basement flooding during heavy rains",
    solution: "Complete waterproofing system with interior and exterior drainage",
    result: "Basement remains completely dry during storm seasons",
    beforeImage: "/images/project20.png",
    afterImage: "/images/project21.png"
  },
  {
    title: "Foundation Water Intrusion Fix",
    location: "Alamo, CA", 
    problem: "Water seepage through foundation walls",
    solution: "Foundation sealing with French drain installation",
    result: "Eliminated water intrusion and protected foundation integrity",
    beforeImage: "/images/project22.png",
    afterImage: "/images/project23.png"
  }
]

const testimonials = [
  {
    name: "Jennifer Wilson",
    location: "San Ramon, CA",
    service: "Basement Waterproofing",
    rating: 5,
    content: "Our basement used to flood every winter. Matt's waterproofing system has kept it completely dry for three years now. Excellent work!",
    image: "/images/testimonial-1.png"
  },
  {
    name: "Robert Martinez",
    location: "Alamo, CA", 
    service: "Foundation Protection",
    rating: 5,
    content: "Professional service from start to finish. The foundation water intrusion problem is completely solved. Highly recommend Solves All Engineering.",
    image: "/images/testimonial-2.png"
  }
]

export default function FloodingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-red-950/20 dark:via-neutral-900 dark:to-red-950/20 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <nav className="mb-6">
                  <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                    <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/services" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Services</Link>
                    <span>/</span>
                    <span className="text-red-600 dark:text-red-400">Residential Flooding Solutions</span>
                  </div>
                </nav>

                <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 mb-6 inline-flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Residential Flooding Solutions</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">
                  Residential <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Flooding</span> Solutions
                </h1>

                <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  Specialized solutions for homes experiencing flooding, water intrusion, and drainage problems. 
                  We provide comprehensive residential water management and flood prevention services.
                </p>

                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                  <Link href="/contact">
                    <ModernButton 
                      size="xl" 
                      className="bg-red-600 hover:bg-red-700 text-white shadow-xl"
                      icon={<Phone className="h-5 w-5" />}
                    >
                      Get Emergency Help
                    </ModernButton>
                  </Link>
                  <Link href="tel:+19258998123">
                    <ModernButton 
                      variant="outline" 
                      size="xl" 
                      className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/20"
                      icon={<Phone className="h-5 w-5" />}
                    >
                      Call (925) 899-8123
                    </ModernButton>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>24/7 Emergency Response</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Permanent Solutions</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <ScaleIn>
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/process.png"
                    alt="Professional residential flooding solutions by Solves All Engineering"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-neutral-200/50 dark:border-neutral-700/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">100+</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Homes Protected</div>
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
                Comprehensive Flooding Solutions
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                From emergency response to permanent prevention, we provide complete residential 
                flooding solutions to protect your home and family.
              </p>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {floodingSolutions.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ModernCard className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-xl flex-shrink-0">
                        <service.icon className="h-8 w-8 text-red-600 dark:text-red-400" />
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

      {/* Project Showcases */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 mb-6">
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Flooding Problems We've Solved
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                See how we've permanently solved flooding and water intrusion problems for homeowners across Northern California.
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
                      <Badge variant="outline" className="text-red-600 border-red-600">
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

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 mb-6">
                Client Reviews
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                What Our Flooding Clients Say
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
                        <div className="text-xs text-red-600 dark:text-red-400">{testimonial.service}</div>
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
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Stop Home Flooding Before It Starts
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Don't let flooding damage your home and peace of mind. Get expert flooding solutions 
                tailored to your property's specific needs.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/contact">
                  <ModernButton
                    size="xl"
                    className="bg-white text-red-600 hover:bg-neutral-50 shadow-xl"
                    icon={<Phone className="h-5 w-5" />}
                  >
                    Get Emergency Help
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