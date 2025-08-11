import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card"

const project = {
  id: "morgan-territory-walls",
  title: "Morgan Territory Walls",
  category: "Masonry & Stone Work",
  description:
    "Professional masonry work including retaining wall construction and stucco stone veneer finish. All work was self-performed by Solves All Engineering's stone masons.",
  image: "/images/afterMorgan.png",
  beforeImage: "/images/beforeMorgan.png",
  afterImage: "/images/afterMorgan.png",
  location: "Morgan Territory Road, CA",
  duration: "8 weeks",
  teamSize: "4 stone masons",
  completedDate: "October 2024",
  client: "Residential Homeowner",
  budget: "$65K",
  details: {
    overview:
      "A homeowner up on Morgan Territory Road contacted Solves All Engineering to address a section of block wall that was falling over. The project grew in scope when they asked us to build them a retaining wall below their block wall, and then put a stucco and stone veneer finish on the existing wall. All of the work was self-performed by Solves All Engineering's stone masons.",
    challenges: [
      "Existing block wall was failing and falling over",
      "Remote location on Morgan Territory Road with access challenges",
      "Need to stabilize existing wall while adding new construction",
      "Matching aesthetic finish with natural stone and stucco",
    ],
    solutions: [
      "Built additional retaining wall below existing structure for support",
      "Stabilized existing block wall before veneer application",
      "Applied professional stucco and stone veneer finish",
      "All work performed by skilled in-house stone masons",
    ],
    features: [
      "Structural assessment and stabilization of failing wall",
      "New retaining wall construction below existing wall",
      "Professional stucco application over block wall",
      "Natural stone veneer finish for aesthetic enhancement",
      "All work performed by certified stone masons",
      "Enhanced property value and curb appeal",
    ],
    specifications: {
      "Wall Type": "Block wall with retaining support",
      "Finish": "Stucco and natural stone veneer",
      "Craftsmen": "Certified stone masons",
      "Support Wall": "New retaining wall below existing",
      "Materials": "Natural stone and stucco systems",
      "Location": "Remote Morgan Territory Road access",
    },
  },
}

export const metadata = {
  title: `${project.title} | Solves All Engineering`,
  description: project.description,
}

export default function MorganTerritoryProjectPage() {
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
            <Badge variant="secondary" className="mb-4 bg-stone-100 text-stone-700 hover:bg-stone-200">
              {project.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">{project.description}</p>
          </div>

          {/* Project Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <MapPin className="h-8 w-8 text-stone-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-sm text-gray-600">{project.location}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Clock className="h-8 w-8 text-stone-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-gray-600">{project.duration}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Users className="h-8 w-8 text-stone-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Team Size</h3>
                <p className="text-sm text-gray-600">{project.teamSize}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Calendar className="h-8 w-8 text-stone-500 mx-auto mb-3" />
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
              <p className="text-lg text-gray-700">See the transformation from failing wall to beautiful stone and stucco finish</p>
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
                          <CheckCircle className="w-5 h-5 text-stone-500 mt-0.5 mr-3 flex-shrink-0" />
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
                <ModernCard className="bg-gradient-to-br from-stone-50 to-gray-50 border-stone-200">
                  <ModernCardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Need Masonry Work?</h3>
                    <p className="text-sm text-gray-600 mb-4">Contact us to discuss your stone and masonry project needs</p>
                    <Link href="/contact">
                      <Button className="bg-stone-500 hover:bg-stone-600 text-white">Get in Touch</Button>
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