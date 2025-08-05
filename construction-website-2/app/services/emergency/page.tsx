"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Zap, 
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


const emergencyServices = [
  {
    icon: Zap,
    title: "24/7 Emergency Response",
    description: "Immediate response to water damage emergencies with rapid assessment and mitigation services available around the clock."
  },
  {
    icon: Shield,
    title: "Damage Assessment",
    description: "Professional evaluation of water damage extent and immediate safety concerns with detailed action plans."
  },
  {
    icon: AlertTriangle,
    title: "Immediate Mitigation",
    description: "Quick action to stop ongoing damage and prevent further water intrusion while planning permanent solutions."
  },
  {
    icon: Target,
    title: "Permanent Solutions",
    description: "Follow-up with long-term fixes to prevent future water damage and restore your property to safe conditions."
  }
]

const emergencyProjects = [
  {
    title: "Burst Pipe Emergency Response",
    location: "Pleasanton, CA",
    problem: "Major pipe burst causing flooding in commercial building",
    solution: "Immediate water extraction and emergency drainage system",
    result: "Prevented structural damage and restored operations within 24 hours",
    beforeImage: "/images/project24.png",
    afterImage: "/images/project25.png"
  },
  {
    title: "Storm Damage Emergency Repair",
    location: "Moraga, CA", 
    problem: "Severe storm damage with active water intrusion",
    solution: "Emergency tarping and rapid drainage installation",
    result: "Immediate mitigation with permanent solution implemented",
    beforeImage: "/images/project26.png",
    afterImage: "/images/project27.png"
  }
]

const emergencyTestimonials = [
  {
    name: "Lisa Thompson",
    location: "Pleasanton, CA",
    service: "Emergency Water Damage",
    rating: 5,
    content: "When our pipe burst at 2 AM, Matt was there within an hour. His quick response saved our business from major damage. Incredible service!",
    image: "/images/testimonial-1.png"
  },
  {
    name: "Carlos Rodriguez",
    location: "Moraga, CA", 
    service: "Storm Damage Response",
    rating: 5,
    content: "Professional emergency response during the worst storm we've had. Matt's team worked through the night to protect our home. Cannot thank them enough.",
    image: "/images/testimonial-2.png"
  }
]

export default function EmergencyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-orange-950/20 dark:via-neutral-900 dark:to-orange-950/20 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <nav className="mb-6">
                  <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                    <Link href="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/services" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Services</Link>
                    <span>/</span>
                    <span className="text-orange-600 dark:text-orange-400">Emergency Water Damage</span>
                  </div>
                </nav>

                <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 mb-6 inline-flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>24/7 Emergency Response</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">
                  Emergency <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">Water Damage</span> Response
                </h1>

                <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  Rapid response emergency services for water damage assessment and immediate remediation. 
                  Available 24/7 for urgent water damage situations requiring immediate professional attention.
                </p>

                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                  <Link href="tel:+19258998123">
                    <ModernButton 
                      size="xl" 
                      className="bg-orange-600 hover:bg-orange-700 text-white shadow-xl animate-pulse"
                      icon={<Phone className="h-5 w-5" />}
                    >
                      CALL NOW: (925) 899-8123
                    </ModernButton>
                  </Link>
                  <Link href="/contact">
                    <ModernButton 
                      variant="outline" 
                      size="xl" 
                      className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-950/20"
                      icon={<Zap className="h-5 w-5" />}
                    >
                      Emergency Contact
                    </ModernButton>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    <span>24/7 Availability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    <span>Rapid Response</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    <span>Licensed & Insured</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <ScaleIn>
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/residential-2.png"
                    alt="Emergency water damage response by Solves All Engineering"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-neutral-200/50 dark:border-neutral-700/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">24/7</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Emergency Response</div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Emergency Alert Banner */}
      <section className="bg-orange-600 text-white py-6">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-center">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
            <div>
              <h3 className="font-bold text-lg">WATER EMERGENCY? CALL NOW!</h3>
              <p className="text-orange-100">Every minute counts in water damage situations</p>
            </div>
            <Link href="tel:+19258998123">
              <ModernButton className="bg-white text-orange-600 hover:bg-orange-50 font-bold">
                (925) 899-8123
              </ModernButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Emergency Water Damage Services
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                When water damage strikes, immediate professional response is critical. Our emergency services 
                are available 24/7 to minimize damage and begin restoration immediately.
              </p>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {emergencyServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ModernCard className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-xl flex-shrink-0">
                        <service.icon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
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

      {/* Emergency Steps */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                What to Do in a Water Emergency
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Follow these immediate steps while we're on our way to help minimize damage and ensure safety.
              </p>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Ensure Safety", description: "Turn off electricity to affected areas and avoid standing water near electrical sources." },
                { step: "2", title: "Stop the Source", description: "If possible, shut off the main water supply or locate and address the source of water." },
                { step: "3", title: "Call Us Immediately", description: "Contact Solves All Engineering at (925) 899-8123 for immediate emergency response." },
                { step: "4", title: "Document Damage", description: "Take photos for insurance while waiting for our emergency team to arrive." }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                    {step.title}
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

      {/* Emergency Project Showcases */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 mb-6">
                Emergency Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Emergency Situations We've Handled
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                See how our rapid emergency response has saved properties and prevented major damage across Northern California.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {emergencyProjects.map((project, index) => (
              <StaggerIn key={index}>
                <ModernCard className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-square">
                      <div className="absolute inset-2 rounded-lg overflow-hidden">
                        <Image
                          src={project.beforeImage}
                          alt={`${project.title} - Emergency Situation`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Emergency
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-square">
                      <div className="absolute inset-2 rounded-lg overflow-hidden">
                        <Image
                          src={project.afterImage}
                          alt={`${project.title} - Resolved`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Resolved
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        {project.title}
                      </h3>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        {project.location}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Emergency:</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Our Response:</h4>
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

      {/* Emergency Testimonials */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 mb-6">
                Emergency Client Reviews
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                What Our Emergency Clients Say
              </h2>
            </div>
          </FadeIn>

          <StaggerIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {emergencyTestimonials.map((testimonial, index) => (
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
                        <div className="text-xs text-orange-600 dark:text-orange-400">{testimonial.service}</div>
                      </div>
                    </div>
                  </ModernCard>
                </motion.div>
              ))}
            </div>
          </StaggerIn>
        </div>
      </section>

      {/* Emergency CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.white/.3)_1px,_transparent_0)] bg-[size:30px_30px] animate-pulse" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Don't Wait - Call Now!
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Water damage gets worse every minute. Our emergency response team is standing by 24/7 
                to help minimize damage and begin immediate restoration.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                <Link href="tel:+19258998123">
                  <ModernButton
                    size="xl"
                    className="bg-white text-orange-600 hover:bg-neutral-50 shadow-xl animate-pulse font-bold"
                    icon={<Phone className="h-5 w-5" />}
                  >
                    EMERGENCY: (925) 899-8123
                  </ModernButton>
                </Link>
                <Link href="/contact">
                  <ModernButton
                    variant="outline"
                    size="xl"
                    className="border-white/30 text-white hover:bg-white/10"
                    icon={<Zap className="h-5 w-5" />}
                  >
                    Emergency Contact Form
                  </ModernButton>
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Available 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Rapid Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Licensed & Insured</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}