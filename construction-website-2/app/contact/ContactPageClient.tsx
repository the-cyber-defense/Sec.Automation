"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone, Clock, ArrowRight, Send, MessageSquare, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "(925) 899-8123",
    href: "tel:(925)899-8123",
    description: "Call us directly for immediate assistance",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@solvesall.org",
    href: "mailto:info@solvesall.org",
    description: "Send us a detailed message about your project",
  },
  {
    icon: MapPin,
    title: "Service Area",
    value: "Northern California",
    href: "#",
    description: "Livermore, Bay Area, and surrounding regions",
  },
  {
    icon: Clock,
    title: "Emergency Service",
    value: "24/7 Available",
    href: "tel:(925)899-8123",
    description: "Emergency drainage and water issues",
  },
]

const services = [
  "Drainage & Waterproofing",
  "Stormwater Compliance",
  "Retaining Walls",
  "Environmental Remediation",
  "Underground Infrastructure",
  "Pavers & Hardscapes",
  "Emergency Repairs",
  "Other (Please specify)"
]

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    urgency: "normal"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  Thank You!
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
                  Your message has been received. We'll get back to you within 24 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/">
                  <Button size="lg" className="px-8 py-4">
                    Back to Home
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="px-8 py-4">
                    View Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-700/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Get In Touch</span>
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[0.9] tracking-tight">
                <span className="block">Let's Discuss</span>
                <span className="block text-blue-600 dark:text-blue-400">Your Project</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
                Ready to solve your engineering challenges? Get a free consultation and discover how we can bring your project to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours with a detailed response.
                </p>
              </div>

              <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
                <CardContent className="p-8 lg:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="h-12 text-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="h-12 text-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                          placeholder="(925) 555-0123"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 text-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Service Needed
                      </Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full h-12 text-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a service...</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Project Urgency
                      </Label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full h-12 text-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                      >
                        <option value="normal">Normal Timeline</option>
                        <option value="urgent">Urgent (Within 1 week)</option>
                        <option value="emergency">Emergency (ASAP)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Project Details *
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full text-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white resize-none"
                        placeholder="Please describe your project, location, timeline, and any specific challenges you're facing..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-3 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Get In Touch
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Prefer to contact us directly? Here are all the ways you can reach our team.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                          <info.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {info.title}
                          </h3>
                          {info.href && info.href !== "#" ? (
                            <a
                              href={info.href}
                              className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <div className="text-xl font-semibold text-gray-900 dark:text-white">
                              {info.value}
                            </div>
                          )}
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Emergency Contact */}
              <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2">
                        Emergency Services
                      </h3>
                      <p className="text-red-700 dark:text-red-400 mb-3">
                        Experiencing flooding, drainage failures, or structural issues? We provide 24/7 emergency response for critical situations.
                      </p>
                      <a href="tel:(925)899-8123">
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                        >
                          Call Emergency Line
                          <Phone className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
              >
                <MapPin className="h-4 w-4" />
                <span>Service Areas</span>
              </Badge>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block">Serving Northern</span>
                <span className="block text-blue-600 dark:text-blue-400">California</span>
              </h2>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
                Based in Livermore, we provide comprehensive engineering services throughout the Bay Area and Northern California region.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
              <CardContent className="p-8 lg:p-12">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    "Livermore", "Dublin", "Pleasanton", "San Ramon", "Danville", "Castro Valley",
                    "Hayward", "Fremont", "Union City", "Newark", "Milpitas", "San Jose",
                    "Mountain View", "Palo Alto", "Redwood City", "San Mateo", "Foster City", "And Surrounding Areas"
                  ].map((city) => (
                    <div key={city} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{city}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}