import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

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
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Our Portfolio
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Featured Projects</h1>
            <p className="text-lg text-muted-foreground">
              Explore our diverse portfolio of engineering solutions, from residential drainage systems to commercial earth retainment projects.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-border"
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground mb-5 md:mb-6 text-sm sm:text-base">{project.description}</p>
                  <Link href={`/projects/${project.id}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                      View Project Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Our Process
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">How We Deliver Excellence</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our proven project management approach ensures every project is completed on time, within budget, and to the highest standards of quality.
              </p>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/process.png"
                  alt="Engineering process and workflow"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">150+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
              </div>
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

// Process steps for the new section
const processSteps = [
  {
    title: "Project Planning & Design",
    description:
      "We begin with a thorough site assessment to understand your project requirements, existing conditions, and budget. Our team of experts then develops detailed, feasible plans that align with your vision and budget.",
  },
  {
    title: "Quality Materials & Expertise",
    description:
      "We pride ourselves on using only the highest quality materials and employing skilled craftsmen who are certified and trained in their respective fields. This ensures durability, longevity, and the best possible results.",
  },
  {
    title: "Precision Construction",
    description:
      "Our skilled craftsmen execute each phase of the project with precision and attention to detail. We adhere to strict quality control measures and follow proven construction techniques to deliver flawless results.",
  },
  {
    title: "Ongoing Support & Maintenance",
    description:
      "Our commitment to your complete satisfaction extends beyond project completion. We provide ongoing support and maintenance to ensure your project continues to perform optimally and looks its best.",
  },
]
