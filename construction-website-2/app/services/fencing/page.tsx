"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Star, Quote, Shield, Hammer, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    title: "Wood Fencing",
    description: "Custom wood fences for privacy, security, and aesthetic appeal",
    icon: CheckCircle,
  },
  {
    title: "Vinyl Fencing",
    description: "Low-maintenance vinyl fencing in various styles and colors",
    icon: CheckCircle,
  },
  {
    title: "Chain Link Fencing",
    description: "Durable chain link fences for security and property definition",
    icon: CheckCircle,
  },
  {
    title: "Decorative Fencing",
    description: "Ornamental and decorative fencing for enhanced curb appeal",
    icon: CheckCircle,
  },
  {
    title: "Gate Installation",
    description: "Custom gates with hardware and automation options",
    icon: CheckCircle,
  },
  {
    title: "Fence Repair",
    description: "Professional fence repair and maintenance services",
    icon: CheckCircle,
  },
]

const processSteps = [
  {
    title: "Property Assessment",
    description: "Site evaluation and boundary line confirmation",
    icon: Users,
  },
  {
    title: "Design & Materials",
    description: "Fence design selection and material recommendations",
    icon: CheckCircle,
  },
  {
    title: "Permit Process",
    description: "Handling necessary permits and HOA approvals",
    icon: Shield,
  },
  {
    title: "Installation",
    description: "Professional fence installation with quality craftsmanship",
    icon: Hammer,
  },
  {
    title: "Final Inspection",
    description: "Quality assurance and customer walkthrough",
    icon: Award,
  },
]

const testimonials = [
  {
    name: "Maria Gonzalez",
    role: "Homeowner",
    content: "Beautiful wood fence installation with excellent craftsmanship. Professional service from start to finish.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=MG",
  },
  {
    name: "Tom Wilson",
    role: "Property Owner",
    content: "Great work on our vinyl fence and automatic gate. Quality materials and professional installation.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=TW",
  },
]

export default function FencingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/project14.png"
          alt="Professional fencing installation services"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 mb-4">Fencing</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Professional Fencing Services
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            Custom fence installation including wood, vinyl, chain link, and decorative fencing for privacy, security, and property definition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Free Estimate
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Fencing Services</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From privacy fences to decorative boundaries, we provide professional fencing services 
              with quality materials and expert installation for lasting value.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                    <service.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recent Fencing Projects</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See the quality and craftsmanship we bring to every fencing project, from simple boundaries to custom designs.
            </p>
          </div>
          
          {/* Before/After Project 1 */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Privacy Fence Installation</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-center">Before</h4>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/project20.png"
                    alt="Before fence installation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-center">After</h4>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/project21.png"
                    alt="After fence installation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Project 2 */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Decorative Fencing & Gate Installation</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-center">Before</h4>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/project22.png"
                    alt="Before decorative fencing project"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-center">After</h4>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/project23.png"
                    alt="After decorative fencing project"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Fencing Installation Process</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our systematic approach ensures proper installation with attention to property lines, permits, and quality craftsmanship.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                    <step.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Read what homeowners say about our fencing installation quality and professional service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-purple-200 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Fencing Project?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Contact us today to discuss your fencing needs and get a free estimate for your custom fence installation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Get Free Estimate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}