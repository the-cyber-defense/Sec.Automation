import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Engineering Projects Portfolio | Drainage & Earth Retainment | Solves All Engineering",
  description:
    "Explore Solves All Engineering's portfolio of completed projects specializing in drainage, earth retainment, and remediation solutions across Northern California.",
  keywords:
    "engineering projects, drainage solutions, earth retainment, remediation, Northern California, construction portfolio",
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
            Explore our portfolio of successful drainage, earth retainment, and remediation projects that showcase our
            engineering expertise.
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">Featured Projects</h2>
            <p className="text-base md:text-lg text-gray-700">
              Browse through our diverse portfolio of completed engineering projects specializing in hard-to-fix
              problems.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="all" className="mb-8 md:mb-12">
              <div className="flex justify-center overflow-x-auto pb-2 -mx-4 px-4">
                <TabsList className="flex space-x-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="all" className="px-4 py-2 text-sm rounded-md">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="drainage" className="px-4 py-2 text-sm rounded-md">
                    Drainage
                  </TabsTrigger>
                  <TabsTrigger value="retainment" className="px-4 py-2 text-sm rounded-md">
                    Earth Retainment
                  </TabsTrigger>
                  <TabsTrigger value="remediation" className="px-4 py-2 text-sm rounded-md">
                    Remediation
                  </TabsTrigger>
                  <TabsTrigger value="residential" className="px-4 py-2 text-sm rounded-md">
                    Residential
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-6 md:mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="drainage" className="mt-6 md:mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {projects
                    .filter((project) => project.category === "Drainage")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="retainment" className="mt-6 md:mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {projects
                    .filter((project) => project.category === "Earth Retainment")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="remediation" className="mt-6 md:mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {projects
                    .filter((project) => project.category === "Remediation")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="residential" className="mt-6 md:mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {projects
                    .filter((project) => project.category === "Residential")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Before/After Showcase */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3 md:mb-4">
              Transformations
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">Before & After Results</h2>
            <p className="text-base md:text-lg text-gray-700">
              See the dramatic transformations we achieve through our specialized engineering solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Hillside Drainage Project */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-2">
                <div className="relative h-48">
                  <Image
                    src="/images/modern-residence-before.jpg"
                    alt="Before drainage solution - property experiencing flooding and water damage issues"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Before
                  </div>
                </div>
                <div className="relative h-48">
                  <Image
                    src="/images/modern-residence-after.jpg"
                    alt="After drainage solution - completed professional drainage system preventing flooding"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    After
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Hillside Drainage System</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Complete drainage solution for hillside property experiencing severe water intrusion and flooding
                  issues.
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>Drainage Solution</span>
                </div>
              </div>
            </div>

            {/* Retaining Wall Project */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-2">
                <div className="relative h-48">
                  <Image
                    src="/images/modern-residence-staircase-1.jpg"
                    alt="Before retaining wall construction - unstable slope with erosion issues"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Before
                  </div>
                </div>
                <div className="relative h-48">
                  <Image
                    src="/images/modern-residence-staircase-2.jpg"
                    alt="After retaining wall construction - engineered stone retaining wall providing slope stability"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    After
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Structural Retaining Wall</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Engineered retaining wall solution to prevent soil erosion and provide long-term stability.
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>Earth Retainment</span>
                </div>
              </div>
            </div>

            {/* Interior Remediation */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-2">
                <div className="relative h-48">
                  <Image
                    src="/images/modern-residence-interior-1.jpg"
                    alt="Before remediation - interior space with water damage and structural issues"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Before
                  </div>
                </div>
                <div className="relative h-48">
                  <Image
                    src="/images/modern-residence-interior-2.jpg"
                    alt="After remediation - fully restored interior space with professional finishes"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    After
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Water Damage Remediation</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Complete remediation and restoration after water intrusion damage, including structural repairs.
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>Remediation</span>
                </div>
              </div>
            </div>

            {/* Entrance Improvement */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-2">
                <div className="relative h-48">
                  <Image
                    src="/images/modern-residence-staircase-3.jpg"
                    alt="Before entrance improvement - unstable entrance area needing structural work"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Before
                  </div>
                </div>
                <div className="relative h-48">
                  <Image
                    src="/images/modern-residence-entrance.jpg"
                    alt="After entrance improvement - professionally stabilized entrance with proper drainage"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    After
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Entrance Stabilization</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Structural improvements to entrance area including drainage and foundation stabilization.
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>Residential</span>
                </div>
              </div>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">How We Solve Complex Problems</h2>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                Every project we undertake follows a rigorous engineering process to ensure quality, timeliness, and
                long-lasting solutions with warranty protection.
              </p>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm md:text-base">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Problem Assessment</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      We begin with comprehensive site analysis to identify root causes of drainage, retainment, or
                      remediation issues.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm md:text-base">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Engineered Solutions</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      We design custom solutions using proven engineering principles and quality materials for lasting
                      results.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm md:text-base">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Expert Implementation</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      Our skilled team executes each phase with precision, managing both stormwater and earthwork
                      requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm md:text-base">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Warranty & Follow-up</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      All projects come with warranty protection and follow-up to ensure long-term performance and
                      client satisfaction.
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
            Contact us today to discuss your drainage, earth retainment, or remediation needs. We specialize in the
            hard-to-fix problems other contractors turn down.
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
          src={project.image || "/project-placeholder.svg"}
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

// Updated projects data focused on Solves All Engineering specialties
const projects = [
  {
    id: "hillside-drainage-system",
    title: "Hillside Drainage System",
    category: "Drainage",
    description:
      "Complete drainage solution for hillside property experiencing severe water intrusion and flooding issues. Custom engineered system with warranty.",
    image: "/images/modern-residence-after.jpg",
    alt: "Hillside drainage system project preventing flooding and water intrusion",
  },
  {
    id: "structural-retaining-wall",
    title: "Structural Retaining Wall",
    category: "Earth Retainment",
    description:
      "Engineered retaining wall solution to prevent soil erosion and provide long-term stability for residential property.",
    image: "/images/modern-residence-staircase-2.jpg",
    alt: "Structural retaining wall construction for slope stabilization",
  },
  {
    id: "water-damage-remediation",
    title: "Water Damage Remediation",
    category: "Remediation",
    description:
      "Complete remediation and restoration after water intrusion damage, including structural repairs and moisture control systems.",
    image: "/images/modern-residence-interior-2.jpg",
    alt: "Water damage remediation and structural restoration project",
  },
  {
    id: "foundation-drainage-repair",
    title: "Foundation Drainage Repair",
    category: "Drainage",
    description:
      "Foundation waterproofing and drainage system installation to resolve chronic basement flooding and foundation issues.",
    image: "/images/modern-residence-entrance.jpg",
    alt: "Foundation drainage repair and waterproofing system installation",
  },
  {
    id: "slope-stabilization",
    title: "Slope Stabilization",
    category: "Earth Retainment",
    description:
      "Comprehensive slope stabilization project using engineered retaining systems and drainage integration.",
    image: "/images/modern-residence-staircase-4.jpg",
    alt: "Slope stabilization project with engineered retaining systems",
  },
  {
    id: "stormwater-management",
    title: "Stormwater Management System",
    category: "Drainage",
    description:
      "Large-scale stormwater management system designed to handle heavy rainfall and prevent property flooding.",
    image: "/images/modern-residence-dining.jpg",
    alt: "Stormwater management system for heavy rainfall protection",
  },
  {
    id: "soil-remediation",
    title: "Contaminated Soil Remediation",
    category: "Remediation",
    description: "Environmental remediation project addressing contaminated soil conditions with engineered solutions.",
    image: "/images/modern-residence-before.jpg",
    alt: "Contaminated soil remediation and environmental cleanup project",
  },
  {
    id: "residential-flooding-solution",
    title: "Residential Flooding Solution",
    category: "Residential",
    description:
      "Comprehensive flooding solution for residential property including drainage, grading, and waterproofing systems.",
    image: "/images/modern-residence-staircase-1.jpg",
    alt: "Residential flooding solution with comprehensive drainage and waterproofing",
  },
]
