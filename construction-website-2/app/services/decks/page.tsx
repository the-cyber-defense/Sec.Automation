"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Star, Quote, Home, Hammer, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    title: "Custom Deck Design",
    description: "Custom deck designs tailored to your home and outdoor living needs",
    icon: CheckCircle,
  },
  {
    title: "Wood Deck Construction",
    description: "Traditional wood decks using quality lumber and materials",
    icon: CheckCircle,
  },
  {
    title: "Composite Decking",
    description: "Low-maintenance composite decking in various colors and styles",
    icon: CheckCircle,
  },
  {
    title: "Multi-Level Decks",
    description: "Complex multi-level deck designs for challenging terrain",
    icon: CheckCircle,
  },
  {
    title: "Deck Repair & Restoration",
    description: "Professional deck repair, refinishing, and restoration services",
    icon: CheckCircle,
  },
  {
    title: "Railings & Accessories",
    description: "Custom railings, stairs, and deck accessories for safety and style",
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
    title: "Custom Planning",
    description: "Detailed deck design and material selection",
    icon: Home,
  },
  {
    title: "Permits & Approval",
    description: "Handling necessary permits and building code compliance",
    icon: CheckCircle,
  },
  {
    title: "Construction",
    description: "Professional deck construction with quality craftsmanship",
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
    name: "Ashley Thompson",
    role: "Homeowner",
    content: "Amazing deck construction that transformed our backyard into an outdoor oasis. Quality work and attention to detail.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=AT",
  },
  {
    name: "James Miller",
    role: "Property Owner",
    content: "Professional multi-level deck installation that perfectly matches our home's architecture. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=JM",
  },
]

export default function DecksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/project16.png"
          alt="Professional deck construction and outdoor living space creation"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 mb-4">Decks</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Custom Deck Construction
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            Custom deck construction and repair using quality materials for outdoor entertaining, relaxation, and adding value to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Deck Services</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From design to construction and maintenance, we provide comprehensive deck services 
              to create beautiful outdoor living spaces that enhance your home's value.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                    <service.icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Deck Construction Process</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our comprehensive approach ensures your deck project is completed with quality materials and expert craftsmanship.
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
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-6">
                    <step.icon className="h-6 w-6 text-orange-600" />
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
              Read what homeowners say about our deck construction quality and professional service.
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
                  <Quote className="h-8 w-8 text-orange-200 mb-4" />
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
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Dream Deck?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Contact us today to discuss your deck construction needs and get a free estimate for your custom outdoor living space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
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