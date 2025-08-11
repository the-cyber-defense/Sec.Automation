import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card"

const project = {
  id: "alamo-yard-refresh",
  title: "Alamo Yard Refresh",
  category: "Complete Landscaping",
  description:
    "Complete backyard transformation with pool deck, paver patios, landscaping, and outdoor amenities. Project required 7 concrete trucks, 2000 square feet of pavers, and 3000 square feet of sod.",
  image: "/images/afterAlamo.png",
  beforeImage: "/images/beforeAlamo.png",
  afterImage: "/images/afterAlamo.png",
  location: "Alamo, CA",
  duration: "10 weeks",
  teamSize: "8 crew members",
  completedDate: "August 2024",
  client: "Residential Homeowner",
  budget: "$125K",
  details: {
    overview:
      "A homeowner in Alamo, CA contacted Solves All Engineering to give their backyard a makeover. The client provided us with designed plans for how the yard would look, and we went to work. The project started with the demolition of their existing concrete pool deck and grading of yard. We put down a layer of base rock and rebar then poured the pool deck and sidewalks. Once the concrete was cured, we built 3 paver patios, installed a hot tub, and then installed a new lawn and sprinkler system, outdoor pavilion, and outdoor kitchen. The project required 7 concrete trucks, 2000 square feet of pavers, and 3000 square feet of sod.",
    challenges: [
      "Complete demolition of existing concrete pool deck",
      "Coordinating multiple phases: concrete, paving, landscaping",
      "Installing complex outdoor amenities and utilities",
      "Ensuring proper grading and drainage for large-scale project",
    ],
    solutions: [
      "Systematic demolition and site preparation",
      "Professional concrete work with proper base and reinforcement",
      "Expert paver installation across multiple patio areas",
      "Complete landscaping with irrigation and outdoor amenities",
    ],
    features: [
      "Complete concrete pool deck replacement",
      "3 separate paver patio installations totaling 2000 sq ft",
      "Professional hot tub installation and integration",
      "New lawn installation with 3000 sq ft of sod",
      "Complete sprinkler system design and installation",
      "Custom outdoor pavilion and outdoor kitchen construction",
    ],
    specifications: {
      "Concrete Trucks": "7 trucks for deck and sidewalks",
      "Paver Area": "2000 square feet across 3 patios",
      "Sod Installation": "3000 square feet of new lawn",
      "Hot Tub": "Professional installation with utilities",
      "Irrigation": "Complete sprinkler system",
      "Outdoor Features": "Pavilion and outdoor kitchen",
    },
  },
}

export const metadata = {
  title: `${project.title} | Solves All Engineering`,
  description: project.description,
}

export default function AlamoProjectPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/projects">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
              {project.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">{project.description}</p>
          </div>

          {/* Project Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <MapPin className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-sm text-gray-600">{project.location}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-gray-600">{project.duration}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Team Size</h3>
                <p className="text-sm text-gray-600">{project.teamSize}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Calendar className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Completed</h3>
                <p className="text-sm text-gray-600">{project.completedDate}</p>
              </ModernCardContent>
            </ModernCard>
          </div>
        </div>
      </section>

      {/* Before/After Slider */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Project Transformation</h2>
              <p className="text-lg text-gray-700">See the complete backyard makeover from demolition to beautiful outdoor living space</p>
            </div>
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              beforeAlt={`${project.title} before construction`}
              afterAlt={`${project.title} after completion`}
              className="shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <ModernCard>
                  <ModernCardHeader>
                    <ModernCardTitle>Project Overview</ModernCardTitle>
                  </ModernCardHeader>
                  <ModernCardContent>
                    <p className="text-gray-700 leading-relaxed">{project.details.overview}</p>
                  </ModernCardContent>
                </ModernCard>

                {/* Challenges & Solutions */}
                <div className="grid md:grid-cols-2 gap-8">
                  <ModernCard>
                    <ModernCardHeader>
                      <ModernCardTitle>Challenges</ModernCardTitle>
                    </ModernCardHeader>
                    <ModernCardContent>
                      <ul className="space-y-3">
                        {project.details.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </ModernCardContent>
                  </ModernCard>

                  <ModernCard>
                    <ModernCardHeader>
                      <ModernCardTitle>Solutions</ModernCardTitle>
                    </ModernCardHeader>
                    <ModernCardContent>
                      <ul className="space-y-3">
                        {project.details.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </ModernCardContent>
                  </ModernCard>
                </div>

                {/* Features */}
                <ModernCard>
                  <ModernCardHeader>
                    <ModernCardTitle>Key Features</ModernCardTitle>
                  </ModernCardHeader>
                  <ModernCardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {project.details.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </ModernCardContent>
                </ModernCard>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info */}
                <ModernCard>
                  <ModernCardHeader>
                    <ModernCardTitle>Project Information</ModernCardTitle>
                  </ModernCardHeader>
                  <ModernCardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Client</h4>
                        <p className="text-sm text-gray-600">{project.client}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Budget</h4>
                        <p className="text-sm text-gray-600">{project.budget}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Location</h4>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Duration</h4>
                        <p className="text-sm text-gray-600">{project.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Team Size</h4>
                        <p className="text-sm text-gray-600">{project.teamSize}</p>
                      </div>
                    </div>
                  </ModernCardContent>
                </ModernCard>

                {/* Specifications */}
                <ModernCard>
                  <ModernCardHeader>
                    <ModernCardTitle>Specifications</ModernCardTitle>
                  </ModernCardHeader>
                  <ModernCardContent>
                    <div className="space-y-3">
                      {Object.entries(project.details.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-900">{key}:</span>
                          <span className="text-sm text-gray-600 text-right ml-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </ModernCardContent>
                </ModernCard>

                {/* CTA */}
                <ModernCard className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <ModernCardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Planning a Backyard Makeover?</h3>
                    <p className="text-sm text-gray-600 mb-4">Contact us to discuss your landscaping and outdoor living project</p>
                    <Link href="/contact">
                      <Button className="bg-green-500 hover:bg-green-600 text-white">Get in Touch</Button>
                    </Link>
                  </ModernCardContent>
                </ModernCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}