"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Star, Quote, Leaf, Droplets, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    title: "Landscape Design",
    description: "Custom landscape design plans tailored to your property and preferences",
    icon: CheckCircle,
  },
  {
    title: "Plant Installation",
    description: "Professional installation of trees, shrubs, and plants for beautiful outdoor spaces",
    icon: CheckCircle,
  },
  {
    title: "Irrigation Systems",
    description: "Efficient irrigation system design and installation for healthy landscapes",
    icon: CheckCircle,
  },
  {
    title: "Hardscape Installation",
    description: "Patios, walkways, and decorative elements to enhance your outdoor living",
    icon: CheckCircle,
  },
  {
    title: "Garden Maintenance",
    description: "Ongoing maintenance services to keep your landscape looking its best",
    icon: CheckCircle,
  },
  {
    title: "Drainage Integration",
    description: "Landscape solutions that work with proper drainage and water management",
    icon: CheckCircle,
  },
]

const processSteps = [
  {
    title: "Design Consultation",
    description: "Understanding your vision and site assessment",
    icon: Users,
  },
  {
    title: "Landscape Planning",
    description: "Custom design and plant selection for your space",
    icon: Leaf,
  },
  {
    title: "Site Preparation",
    description: "Soil preparation and hardscape installation",
    icon: CheckCircle,
  },
  {
    title: "Installation",
    description: "Professional planting and irrigation system setup",
    icon: Droplets,
  },
  {
    title: "Final Touches",
    description: "Finishing details and maintenance instructions",
    icon: Award,
  },
]

const testimonials = [
  {
    name: "Jennifer Walsh",
    role: "Homeowner",
    content: "Beautiful landscape transformation that exceeded our expectations. The design is both functional and stunning.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=JW",
  },
  {
    name: "Robert Kim",
    role: "Property Owner",
    content: "Professional landscaping service with excellent plant selection and irrigation design. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=RK",
  },
]

export default function LandscapingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/project12.png"
          alt="Professional landscaping design and installation services"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4">Landscaping</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Professional Landscaping Services
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            Complete landscaping services including design, installation, irrigation, and maintenance for beautiful outdoor spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Free Consultation
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Landscaping Services</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From design to maintenance, we provide comprehensive landscaping services to create and maintain 
              beautiful, functional outdoor spaces that enhance your property value.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <service.icon className="h-8 w-8 text-green-600" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recent Landscaping Projects</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See the beautiful transformations we create through thoughtful design and professional installation.
            </p>
          </div>
          
          {/* Before/After Project 1 */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Complete Landscape Transformation</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-center">Before</h4>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/project16.png"
                    alt="Before landscape transformation"
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
                    src="/images/project17.png"
                    alt="After landscape transformation"
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
            <h3 className="text-2xl font-bold text-center mb-8">Garden Design & Irrigation Installation</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-center">Before</h4>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/project18.png"
                    alt="Before garden design project"
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
                    src="/images/project19.png"
                    alt="After garden design project"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Landscaping Process</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our comprehensive approach ensures your landscape project is completed with attention to detail and quality craftsmanship.
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
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-6">
                    <step.icon className="h-6 w-6 text-green-600" />
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
              Read what homeowners say about our landscaping design and installation quality.
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
                  <Quote className="h-8 w-8 text-green-200 mb-4" />
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
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Outdoor Space?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Contact us today to discuss your landscaping vision and get a free consultation for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  Get Free Consultation
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