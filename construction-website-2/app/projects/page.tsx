import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Recent Projects | Pittsburg, Alamo & Morgan Territory | Solves All Engineering",
  description:
    "View Solves All Engineering's recent completed projects including retaining walls, decks, landscaping, and masonry work across Northern California.",
  keywords:
    "retaining wall projects, deck construction, landscaping, masonry work, Northern California construction projects",
}

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/images/modern-residence-after.jpg"
          alt="Completed engineering projects showcasing drainage, earth retainment, and remediation solutions"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">Our Projects</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl">
            See our recent completed projects showcasing retaining walls, decks, landscaping, and comprehensive "outside" services for homeowners.
          </p>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3 md:mb-4">
              Our Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">Recent Projects</h2>
            <p className="text-base md:text-lg text-gray-700">
              View our recent completed projects showcasing the quality and craftsmanship we bring to every homeowner project.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3 md:mb-4">
                Our Approach
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Our Project Approach</h2>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                Every project we undertake follows a systematic approach to ensure quality craftsmanship, timeliness, and
                lasting results that exceed homeowner expectations.
              </p>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm md:text-base">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Site Assessment</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      We begin with comprehensive site evaluation to understand your project needs and existing conditions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm md:text-base">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Planning & Design</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      We develop detailed plans and select quality materials to ensure your project meets your vision and budget.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm md:text-base">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Professional Construction</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      Our skilled craftsmen execute each phase with precision, using proper techniques and quality materials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm md:text-base">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Quality Completion</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      We ensure every detail meets our high standards and provide ongoing support for your complete satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl mt-8 md:mt-0">
              <Image
                src="/images/modern-residence-after.jpg"
                alt="Engineering process showing professional construction and project management"
                fill
                className="object-cover"
                quality={75}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Solve Your Problem?</h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-10">
            Contact us today to discuss your project needs. We provide comprehensive \"outside\" services for homeowners 
            with quality craftsmanship and professional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 md:px-8 w-full sm:w-auto"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden group h-full hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 sm:h-56 md:h-64 w-full">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.alt || `${project.title} - ${project.category} project by Solves All Engineering`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 md:p-6 w-full">
            <h3 className="text-lg md:text-xl font-bold text-white">{project.title}</h3>
            <p className="text-blue-300 mb-4">{project.category}</p>
            <Link href={`/projects/${project.id}`}>
              <Button variant="outline" className="text-white border-white hover:bg-white/20 bg-transparent">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">{project.title}</CardTitle>
        <CardDescription className="text-blue-600">{project.category}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
        <p className="text-gray-700 text-sm sm:text-base">{project.description}</p>
      </CardContent>
      <CardFooter className="p-4 md:p-6 pt-0">
        <Link href={`/projects/${project.id}`} className="w-full">
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-sm sm:text-base w-full bg-transparent"
          >
            View Project Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

// Recent projects data
const projects = [
  {
    id: "pittsburg-retaining-wall-deck",
    title: "Pittsburg Retaining Wall and Deck",
    category: "Retaining Walls & Decks",
    description:
      "Complete reconstruction of failing retaining wall, deck, and fence using concrete block construction. Project required easement permit for canal service road access.",
    image: "/images/afterRetainingwall.png",
    alt: "Pittsburg retaining wall, deck, and fence reconstruction project",
  },
  {
    id: "alamo-yard-refresh",
    title: "Alamo Yard Refresh",
    category: "Complete Landscaping",
    description:
      "Complete backyard transformation including pool deck replacement, paver patios, landscaping, and outdoor amenities. Project involved 7 concrete trucks, 2000 sq ft of pavers, and 3000 sq ft of sod.",
    image: "/images/Alamo2.png",
    alt: "Alamo complete backyard makeover with pool deck, patios, and landscaping",
  },
  {
    id: "morgan-territory-walls",
    title: "Morgan Territory Walls",
    category: "Masonry & Stone Work",
    description:
      "Professional masonry work addressing failing block wall with retaining wall construction and stucco stone veneer finish. All work self-performed by certified stone masons.",
    image: "/images/afterMorgan.png",
    alt: "Morgan Territory retaining wall construction with stucco and stone veneer finish",
  },
]
