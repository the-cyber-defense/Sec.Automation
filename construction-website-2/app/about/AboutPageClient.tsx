"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Award, Users, Clock, CheckCircle, Star, Quote, Shield, Target, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { number: "500+", label: "Projects Completed", icon: CheckCircle },
  { number: "15+", label: "Years Experience", icon: Clock },
  { number: "100%", label: "Client Satisfaction", icon: Star },
  { number: "24/7", label: "Emergency Service", icon: Shield },
]

const values = [
  {
    icon: Award,
    title: "Engineering Excellence",
    description: "Every project is approached with technical precision and innovative problem-solving, ensuring solutions that meet the highest engineering standards.",
  },
  {
    icon: Shield,
    title: "Reliability & Trust",
    description: "Licensed, insured, and warranty-backed work gives our clients complete confidence in our solutions and long-term partnership.",
  },
  {
    icon: Target,
    title: "Precision Execution",
    description: "From initial assessment to final delivery, we execute each phase with meticulous attention to detail and regulatory compliance.",
  },
  {
    icon: Zap,
    title: "Innovative Solutions",
    description: "We tackle the challenges others won't, bringing creative engineering approaches to complex drainage, structural, and environmental problems.",
  },
]

const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "Homeowner, Livermore",
    content:
      "Solves All Engineering completely transformed our problematic hillside drainage. Matt and his team's professional approach and quality work exceeded our expectations. No more flooding issues!",
    rating: 5,
    image: "/placeholder-user.jpg",
  },
  {
    name: "Robert Kim", 
    role: "Commercial Property Developer",
    content:
      "Outstanding stormwater compliance solutions and project management. They delivered our BMP implementation on time, within budget, and passed all regulatory inspections.",
    rating: 5,
    image: "/placeholder-user.jpg",
  },
  {
    name: "Lisa Johnson",
    role: "Facility Manager, Industrial Complex",
    content:
      "Professional, reliable, and incredibly knowledgeable about environmental regulations. Their remediation work has completely solved our compliance issues.",
    rating: 5,
    image: "/placeholder-user.jpg",
  },
]

export default function AboutPageClient() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        
        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-700/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge 
                    variant="secondary" 
                    className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
                  >
                    <Award className="h-4 w-4" />
                    <span>About Our Company</span>
                  </Badge>

                  <div className="space-y-4">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[0.9] tracking-tight">
                      <span className="block">Engineering</span>
                      <span className="block text-blue-600 dark:text-blue-400">Solutions</span>
                      <span className="block">Since 2008</span>
                    </h1>
                    
                    <div className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-600 dark:text-gray-300 leading-relaxed">
                      <span className="block">Leading Northern California with</span>
                      <span className="block font-medium text-gray-800 dark:text-gray-200">innovative engineering excellence</span>
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto lg:mx-0">
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                      Founded by Matt Mahoney with extensive environmental science expertise, Solves All Engineering has been transforming complex drainage, structural, and environmental challenges into lasting solutions across Northern California.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button
                    size="lg"
                    className="text-lg px-10 py-6 h-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Our Services
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-10 py-6 h-auto border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 bg-transparent transition-all duration-300"
                  >
                    View Projects
                  </Button>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative lg:ml-8">
              <div className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <Image
                  src="/images/about-team.png"
                  alt="Solves All Engineering team providing expert drainage and construction solutions"
                  fill
                  className="object-cover"
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge 
                  variant="secondary" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
                >
                  <Users className="h-4 w-4" />
                  <span>Our Story</span>
                </Badge>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="block">Built on</span>
                  <span className="block text-blue-600 dark:text-blue-400">Engineering Excellence</span>
                </h2>

                <div className="space-y-6 text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Founded in 2008 by Matt Mahoney, Solves All Engineering emerged from a vision to tackle the most challenging engineering problems that other contractors wouldn't touch. With his extensive background in environmental science and engineering, Matt saw an opportunity to bring innovative, scientifically-sound solutions to Northern California's complex infrastructure challenges.
                  </p>
                  <p>
                    What started as a specialized drainage solutions company has evolved into a comprehensive engineering firm. We now handle everything from residential French drain installations to commercial stormwater compliance and large-scale environmental remediation projects.
                  </p>
                  <p>
                    Our reputation is built on taking on the "impossible" projects—the ones where other contractors say "it can't be done." We combine technical expertise with creative problem-solving to deliver solutions that not only work but exceed expectations.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-story.png"
                  alt="Solves All Engineering project showcasing our engineering expertise and problem-solving approach"
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Achievement Card */}
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Class A</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">General Engineering<br />Contractor License</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
              >
                <Target className="h-4 w-4" />
                <span>Our Values</span>
              </Badge>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block">What Drives</span>
                <span className="block text-blue-600 dark:text-blue-400">Everything We Do</span>
              </h2>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                Our core values shape every project, every decision, and every client relationship we build.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                      <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
              >
                <Quote className="h-4 w-4" />
                <span>Client Testimonials</span>
              </Badge>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block">What Our Clients</span>
                <span className="block text-blue-600 dark:text-blue-400">Say About Us</span>
              </h2>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 lg:gap-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
                    <CardContent className="p-8 lg:p-12">
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            "{testimonial.content}"
                          </blockquote>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Ready to Work</span>
                <span className="block">With the Experts?</span>
              </h2>

              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto font-light">
                Experience the Solves All Engineering difference. Let's discuss your project and discover how our expertise can bring your vision to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-6 h-auto bg-white text-blue-600 hover:bg-gray-100 shadow-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 h-auto border-2 border-white text-white hover:bg-white/20 bg-transparent font-semibold transition-all duration-300"
              >
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}