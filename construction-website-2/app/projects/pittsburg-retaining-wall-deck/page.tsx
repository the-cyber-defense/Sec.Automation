import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card"

const project = {
  id: "pittsburg-retaining-wall-deck",
  title: "Pittsburg Retaining Wall and Deck",
  category: "Retaining Walls & Decks",
  description:
    "Complete reconstruction of failing retaining wall, deck, and fence with concrete block construction. Worked with easement permit from canal service road.",
  image: "/images/project9.png",
  beforeImage: "/images/project8.png",
  afterImage: "/images/project9.png",
  location: "Pittsburg, CA",
  duration: "6 weeks",
  teamSize: "5 crew members",
  completedDate: "September 2024",
  client: "Residential Homeowner",
  budget: "$45K",
  details: {
    overview:
      "Solves All Engineering was contacted to address a failing retaining wall, deck, and fence in the client's backyard. We procured an easement permit to allow us to work from the canal service road behind the residence then set to work. We demolished the client's old wall, deck, and fence and then built a concrete block retaining wall to last. Once the wall was backfilled and compacted, we built a new fence and deck for the client, then restored our work area on the canal road to finish the project.",
    challenges: [
      "Failing retaining wall threatening property stability",
      "Limited access requiring easement permit from canal authority",
      "Complete demolition of existing structures needed",
      "Working from canal service road with restricted equipment access",
    ],
    solutions: [
      "Secured easement permit for canal service road access",
      "Complete demolition and removal of old structures",
      "Built durable concrete block retaining wall system",
      "Proper backfilling and compaction for long-term stability",
    ],
    features: [
      "Complete demolition of old wall, deck, and fence",
      "New concrete block retaining wall construction",
      "Professional backfilling and compaction",
      "New fence installation matching property aesthetics",
      "Custom deck construction with quality materials",
      "Canal service road restoration to original condition",
    ],
    specifications: {
      "Retaining Wall": "Concrete block construction",
      "Access Method": "Canal service road easement",
      "Demolition": "Complete removal of existing structures",
      "Backfill": "Proper compaction and drainage",
      "Fence Type": "Custom residential fencing",
      "Deck Materials": "Pressure-treated lumber construction",
    },
  },
}

export const metadata = {
  title: `${project.title} | Solves All Engineering`,
  description: project.description,
}

export default function PittsburgProjectPage() {
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
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              {project.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">{project.description}</p>
          </div>

          {/* Project Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-sm text-gray-600">{project.location}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-gray-600">{project.duration}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Team Size</h3>
                <p className="text-sm text-gray-600">{project.teamSize}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-3" />
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
              <p className="text-lg text-gray-700">See the complete reconstruction from failing structures to durable new construction</p>
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
                          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
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
                <ModernCard className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <ModernCardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Need Similar Work?</h3>
                    <p className="text-sm text-gray-600 mb-4">Contact us to discuss your retaining wall and deck needs</p>
                    <Link href="/contact">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">Get in Touch</Button>
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