"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Star, Quote, Zap, Truck, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    title: "Site Preparation",
    description: "Complete site clearing and preparation for construction projects",
    icon: CheckCircle,
  },
  {
    title: "Foundation Excavation",
    description: "Precise excavation for foundations and structural elements",
    icon: CheckCircle,
  },
  {
    title: "Drainage Grading",
    description: "Proper grading for surface water management and drainage",
    icon: CheckCircle,
  },
  {
    title: "Landscape Grading",
    description: "Site grading for landscaping and outdoor space preparation",
    icon: CheckCircle,
  },
  {
    title: "Utility Trenching",
    description: "Safe excavation for utility line installation and repairs",
    icon: CheckCircle,
  },
  {
    title: "Slope Stabilization",
    description: "Grading and preparation for erosion control and slope stability",
    icon: CheckCircle,
  },
]

const processSteps = [
  {
    title: "Site Survey",
    description: "Detailed topographical assessment and planning",
    icon: Users,
  },
  {
    title: "Permit & Planning",
    description: "Securing necessary permits and creating work plans",
    icon: CheckCircle,
  },
  {
    title: "Excavation",
    description: "Precise excavation using professional equipment",
    icon: Zap,
  },
  {
    title: "Grading & Compaction",
    description: "Proper grading and soil compaction for stability",
    icon: Truck,
  },
  {
    title: "Final Inspection",
    description: "Quality assurance and project completion verification",
    icon: Award,
  },
]

const testimonials = [
  {
    name: "David Chen",
    role: "Homeowner",
    content: "Excellent excavation work for our new foundation. Professional and efficient service.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=DC",
  },
  {
    name: "Lisa Martinez",
    role: "Property Developer",
    content: "Perfect grading for our drainage system. The water flow issues are completely resolved.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=LM",
  },
]

export default function ExcavationGradingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/project10.png"
          alt="Professional excavation and grading services"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 mb-4">Excavation & Grading</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Expert Excavation & Grading Services
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            Professional site preparation, excavation, and grading services for construction, drainage, and landscaping projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Excavation & Grading Services</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From site preparation to precise grading, we provide comprehensive excavation services 
              with professional equipment and experienced operators.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                    <service.icon className="h-8 w-8 text-amber-600" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recent Excavation & Grading Projects</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See the precision and quality we bring to every excavation and grading project.
            </p>
          </div>
          
          {/* Before/After Project 1 */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Foundation Excavation & Site Preparation</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-center">Before</h4>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/project12.png"
                    alt="Before excavation and site preparation"
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
                    src="/images/project13.png"
                    alt="After excavation and site preparation"
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
            <h3 className="text-2xl font-bold text-center mb-8">Drainage Grading & Slope Management</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-center">Before</h4>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/project14.png"
                    alt="Before drainage grading project"
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
                    src="/images/project15.png"
                    alt="After drainage grading project"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Excavation & Grading Process</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our systematic approach ensures safe, efficient, and precise excavation and grading work.
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
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-6">
                    <step.icon className="h-6 w-6 text-amber-600" />
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
              Read what property owners say about our excavation and grading expertise and professionalism.
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
                  <Quote className="h-8 w-8 text-amber-200 mb-4" />
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
      <section className="py-20 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Excavation & Grading Project?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Contact us today to discuss your excavation and grading needs and get a free estimate for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
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