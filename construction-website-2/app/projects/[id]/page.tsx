import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, MapPin, CheckCircle, Phone } from "lucide-react"
import { ModernButton } from "@/components/ui/modern-button"
import { ModernCard } from "@/components/ui/modern-card"
import { ProjectBeforeAfter } from "@/components/before-after-slider"
import { projects, companyInfo } from "@/lib/solvesall-data"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id)
  
  if (!project) {
    return {
      title: "Project Not Found | Solves All Engineering"
    }
  }

  return {
    title: `${project.title} | Project Gallery | Solves All Engineering`,
    description: `${project.problem} See how Solves All Engineering solved this ${project.category.toLowerCase()} challenge in the East Bay.`,
    keywords: [project.category.toLowerCase(), "East Bay construction", "drainage solutions", "retaining walls", "before and after"]
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id)
  
  if (!project) {
    notFound()
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.afterImage}
            alt={`${project.title} - Completed project`}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link 
                href="/projects" 
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Projects</span>
              </Link>
            </div>

            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-white/80">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                <span>/</span>
                <span className="text-white">{project.title}</span>
              </div>
            </nav>

            {/* Category Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 mb-8">
              <span className="text-blue-100 font-medium">{project.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>

            {/* Project Details */}
            <div className="flex flex-wrap items-center gap-6 text-white/90 mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Duration: {project.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>East Bay Area</span>
              </div>
            </div>

            {/* Scope */}
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              {project.scope}
            </p>

            {/* CTA */}
            <Link href="/contact">
              <ModernButton 
                size="xl" 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl"
                icon={<Phone className="h-5 w-5" />}
              >
                Get Similar Results
              </ModernButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Before & After Comparison */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
              Transformation Results
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              See the dramatic improvement this project made to the property's functionality and appearance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ProjectBeforeAfter
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              beforeAlt={`${project.title} - Before construction`}
              afterAlt={`${project.title} - After construction`}
              height={500}
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Problem, Solution, Result */}
            <div className="lg:col-span-2 space-y-12">
              <ModernCard className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl flex-shrink-0">
                    <div className="w-6 h-6 bg-red-500 rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      The Challenge
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      Our Solution
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      The Results
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                      {project.result}
                    </p>
                  </div>
                </div>
              </ModernCard>
            </div>

            {/* Project Info Sidebar */}
            <div className="space-y-8">
              <ModernCard className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Category</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">{project.category}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Duration</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">{project.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Scope</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">{project.scope}</p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  Ready for Similar Results?
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Get a free consultation to discuss your {project.category.toLowerCase()} needs.
                </p>
                <div className="space-y-3">
                  <Link href="/contact" className="block">
                    <ModernButton className="w-full" icon={<Phone className="h-4 w-4" />}>
                      Get Free Quote
                    </ModernButton>
                  </Link>
                  <Link href={`tel:${companyInfo.contact.phone}`} className="block">
                    <ModernButton variant="outline" className="w-full" icon={<Phone className="h-4 w-4" />}>
                      Call {companyInfo.contact.phone}
                    </ModernButton>
                  </Link>
                </div>
              </ModernCard>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 bg-white dark:bg-neutral-900">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Project Gallery
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                Additional photos from this project showing our attention to detail and quality craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="aspect-[4/3] relative rounded-lg overflow-hidden group">
                  <Image
                    src={image}
                    alt={`${project.title} - Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Similar Projects
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                See other {project.category.toLowerCase()} projects we've completed in the East Bay.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {relatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`} className="group">
                  <ModernCard className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[16/10] relative">
                      <Image
                        src={relatedProject.afterImage}
                        alt={relatedProject.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 1200px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {relatedProject.category}
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        {relatedProject.problem}
                      </p>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                        <span>View Project</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </ModernCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}