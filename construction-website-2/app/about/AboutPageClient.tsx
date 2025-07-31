"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Award, Users, Clock, CheckCircle, Star, Quote, Shield, Wrench, Building, TreePine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { ScaleIn } from "@/components/animations/scale-in"
import { CountUp } from "@/components/animations/count-up"

const teamMembers = [
  {
    name: "Michael Rodriguez",
    role: "Founder & Lead Engineer",
    experience: "15+ years",
    specialization: "Structural Engineering",
    image: "/team-engineer.svg",
    bio: "Licensed Professional Engineer with expertise in complex structural solutions and project management.",
  },
  {
    name: "Sarah Chen",
    role: "Senior Project Manager",
    experience: "12+ years",
    specialization: "Project Management",
    image: "/team-manager.svg",
    bio: "Certified Project Management Professional specializing in large-scale construction projects.",
  },
  {
    name: "David Thompson",
    role: "Field Operations Manager",
    experience: "10+ years",
    specialization: "Field Operations",
    image: "/team-supervisor.svg",
    bio: "Expert in field operations and quality control with extensive hands-on construction experience.",
  },
]

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
    image: "/client-avatar-1.svg",
  },
  {
    name: "Robert Kim",
    role: "Property Developer",
    content:
      "Outstanding engineering solutions and project management. They delivered our commercial project on time and within budget.",
    rating: 5,
    image: "/client-avatar-2.svg",
  },
  {
    name: "Lisa Johnson",
    role: "Facility Manager",
    content:
      "Professional, reliable, and knowledgeable. Their stormwater management system has completely solved our flooding issues.",
    rating: 5,
    image: "/client-avatar-3.svg",
  },
]

export default function AboutPageClient() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

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
                  Engineering Excellence Since <span className="text-blue-600">1980</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  We are a team of dedicated engineering professionals committed to solving complex construction
                  challenges with innovative solutions, quality craftsmanship, and exceptional service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Contact Our Team
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    Get Free Quote
                  </Button>
                </div>
              </div>
            </FadeIn>

            <ScaleIn>
              <div className="relative">
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/team-group.svg"
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
                      <CountUp end={150} duration={2} />+
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
                  <CountUp end={45} duration={2} />+
                </div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={150} duration={2} />+
                </div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={98} duration={2} />%
                </div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={1} duration={2} />
                </div>
                <div className="text-gray-600">Expert Team</div>
              </div>
            </div>
          </StaggerIn>
        </div>
      </section>

      {/* Problem-Solving Section - "Where Others See Problems, We See Solutions" */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-6">Problem Solvers</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Where Others See <span className="text-blue-600">Problems</span>, We See <span className="text-blue-600">Solutions</span>
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Solves All Engineering is a <strong className="text-gray-900">Class A General Engineering Contractor</strong> that specializes in hard-to-fix problems: 
                  drainage, earth retainment, and remediation. Our reputation is built on customer satisfaction where other 
                  contractors turn down work or fail to resolve the issues at hand.
                </p>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <ScaleIn>
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/problem-solving.svg"
                    alt="Complex engineering problem solving"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-6 w-6" />
                      <span className="font-semibold">Class A Licensed</span>
                    </div>
                  </div>
                </div>
              </ScaleIn>

              <FadeIn>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Wrench className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Hard-to-Fix Drainage</h3>
                      <p className="text-gray-700 leading-relaxed">
                        When drainage problems persist and other contractors can't find a solution, we step in with 
                        innovative engineering approaches that address the root cause.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Earth Retainment Solutions</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Complex soil stability and earth retainment challenges require specialized expertise. 
                        We design and build lasting solutions for even the most challenging terrain.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TreePine className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Environmental Remediation</h3>
                      <p className="text-gray-700 leading-relaxed">
                        From contaminated soil to erosion control, we tackle environmental challenges with 
                        sustainable engineering solutions that restore and protect your property.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <StaggerIn>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">Customer Satisfaction</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Our reputation is built on delivering results when others can't, ensuring complete customer satisfaction on every project.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                      <Award className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">Built to Last</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Every project we complete is engineered for longevity, using proven methods and quality materials that stand the test of time.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                      <Shield className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">Always Warranted</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We stand behind our work with comprehensive warranties, giving you confidence and peace of mind in our solutions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </StaggerIn>
          </div>
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
                  Founded in 1980 with a vision to provide exceptional engineering solutions, Solves All Engineering has
                  grown to become a trusted partner for complex outdoor construction challenges.
                </p>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/company-history.svg"
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
                      To provide innovative engineering solutions that solve complex construction challenges while
                      maintaining the highest standards of quality, safety, and client satisfaction.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                    <p className="text-gray-700">
                      To be the leading engineering firm in the Bay Area, known for our expertise, reliability, and
                      commitment to excellence in every project we undertake.
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

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Our experienced team of engineers and project managers brings decades of combined expertise to every
                  project, ensuring exceptional results and client satisfaction.
                </p>
              </div>
            </FadeIn>

            <StaggerIn>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    className="group cursor-pointer"
                    onClick={() => setSelectedMember(selectedMember === index ? null : index)}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={member.image || "/construction-professional.svg"}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-sm opacity-90">{member.role}</p>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {member.experience}
                          </Badge>
                          <span className="text-sm text-gray-600">{member.specialization}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{member.bio}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </StaggerIn>
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
                            src={testimonial.image || "/client-avatar-1.svg"}
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
                Contact us today to discuss your engineering needs and discover how we can help solve your construction
                challenges with innovative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Free Consultation
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
