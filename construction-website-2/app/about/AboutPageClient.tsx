"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Award, Users, Clock, CheckCircle, Star, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { ScaleIn } from "@/components/animations/scale-in"
import { CountUp } from "@/components/animations/count-up"


const achievements = [
  {
    icon: Award,
    title: "Licensed Professionals",
    description: "All our engineers are licensed and certified professionals",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced team with combined 50+ years in engineering",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "98% of projects completed on time and within budget",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Rigorous quality control processes on every project",
  },
]

const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "Homeowner",
    content:
      "Solves All Engineering transformed our problematic hillside drainage. Their professional approach and quality work exceeded our expectations.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=JM",
  },
  {
    name: "Robert Kim",
    role: "Property Developer",
    content:
      "Outstanding engineering solutions and project management. They delivered our commercial project on time and within budget.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=RK",
  },
  {
    name: "Lisa Johnson",
    role: "Facility Manager",
    content:
      "Professional, reliable, and knowledgeable. Their stormwater management system has completely solved our flooding issues.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=LJ",
  },
]

export default function AboutPageClient() {

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn>
              <div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-6">About Solves All Engineering</Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                  Engineering Excellence Since <span className="text-blue-600">2023</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Solves All Engineering was started in 2023 by Matt Mahoney. We bring a heavy civil approach to dealing with residential issues to build robust solutions to the problems homeowners often face.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    View Our Projects
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    Contact Our Team
                  </Button>
                </div>
              </div>
            </FadeIn>

            <ScaleIn>
              <div className="relative">
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=500&width=600&text=Solves+All+Engineering+Team"
                    alt="Solves All Engineering team at work"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      <CountUp end={150} duration={2} />
                    </div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <StaggerIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={150} duration={2} />
                </div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={10} duration={2} />+
                </div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={1} duration={2} />
                </div>
                <div className="text-gray-600">Expert Team</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={98} duration={2} />%
                </div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </StaggerIn>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Solves All Engineering was started in 2023 by Matt Mahoney. Matt had 10 years of experience working for environmental restoration contractors, managing stormwater and groundwater projects on large construction projects throughout Northern California.
                </p>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Company+History+and+Growth"
                    alt="Company history and growth"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>

              <FadeIn>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                    <p className="text-gray-700">
                      We realized that many homeowners in the Bay Area face issues from living on steep hillsides, and the associated problems of poor drainage and earth movement that come with steep terrain. We bring a heavy civil approach to dealing with residential issues to build robust solutions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Our Expanded Services</h3>
                    <p className="text-gray-700">
                      As our staff has grown, we've expanded our expertise to include all "outside" services for homeowners, including fencing, concrete and masonry, deck builds, landscaping etc.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Our Values</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        Quality and craftsmanship in every project
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        Transparent communication and honest pricing
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        Safety first in all our operations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        Continuous innovation and improvement
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Founder</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Learn about the expertise and vision behind Solves All Engineering's commitment to excellence.
                </p>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScaleIn>
                <div className="relative">
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/founder.png"
                      alt="Matt Mahoney - Founder of Solves All Engineering"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </ScaleIn>

              <FadeIn>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Matt Mahoney</h3>
                    <p className="text-lg text-blue-600 font-medium mb-4">Founder & Lead Engineer</p>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-6">Environmental Science Degree</Badge>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Matt had 10 years of experience working for environmental restoration contractors, managing stormwater 
                      and groundwater projects on large construction projects throughout Northern California.
                    </p>
                    <p>
                      We realized that many homeowners in the Bay Area face issues from living on steep hillsides, and the 
                      associated problems of poor drainage and earth movement that come with steep terrain. We bring a heavy 
                      civil approach to dealing with residential issues to build robust solutions to the problems homeowners 
                      often face.
                    </p>
                    <p>
                      As our staff has grown, we've expanded our expertise to include all "outside" services for homeowners, 
                      including fencing, concrete and masonry, deck builds, landscaping etc. Contact us today to discuss your 
                      project needs.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">Environmental Science expertise</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">10+ years in construction & stormwater</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">Northern California project experience</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">Specialized in drainage & water management</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Our commitment to excellence, combined with our expertise and experience, makes us the trusted choice
                  for engineering solutions.
                </p>
              </div>
            </FadeIn>

            <StaggerIn>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                        <achievement.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-lg mb-3">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Don't just take our word for it. Here's what our satisfied clients have to say about working with
                  Solves All Engineering.
                </p>
              </div>
            </FadeIn>

            <StaggerIn>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-blue-200 mb-4" />
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
            </StaggerIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Contact us today to discuss your project needs. We bring proven expertise in stormwater management, 
                drainage solutions, and all "outside" services for homeowners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Contact Us Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Discuss Your Project
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
