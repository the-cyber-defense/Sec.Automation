import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BeforeAfterSlider } from "@/components/before-after-slider"

export const metadata = {
  title: "Modern Hillside Residence | Solves All Engineering",
  description:
    "Explore our Modern Hillside Residence project featuring innovative engineering solutions, sustainable materials, and contemporary design.",
}

export default function ModernHillsideResidencePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/modern-house-hero.svg"
          alt="Modern Hillside Residence"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
          <div className="max-w-3xl">
            <Badge className="bg-blue-500 text-white mb-4">Residential</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Modern Hillside Residence</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
              A stunning contemporary home featuring innovative engineering solutions, sustainable materials, and
              seamless integration with the natural hillside environment.
            </p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Project Timeline</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">18 Months</p>
                <p className="text-sm text-gray-500">2022 - 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">San Francisco</p>
                <p className="text-sm text-gray-500">California, USA</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Team Size</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">12 Professionals</p>
                <p className="text-sm text-gray-500">Engineers & Architects</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Project Overview</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                This remarkable hillside residence represents the perfect fusion of contemporary architecture and
                innovative engineering. Built on a challenging sloped site, the project required sophisticated
                structural solutions to create a stable, beautiful home that harmonizes with its natural surroundings.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our engineering team developed custom foundation systems and retaining structures to work with the
                natural topography, while incorporating sustainable materials and energy-efficient systems throughout
                the design.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Structural Innovation</h3>
                    <p className="text-gray-600 text-sm">
                      Custom cantilever design maximizing views while ensuring stability
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Sustainable Materials</h3>
                    <p className="text-gray-600 text-sm">
                      Locally sourced stone and certified sustainable wood throughout
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Energy Efficiency</h3>
                    <p className="text-gray-600 text-sm">
                      LEED Gold certification with advanced HVAC and lighting systems
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/construction-site.svg"
                alt="Modern interior design"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Transformation</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              See the dramatic transformation from the original site to the completed modern residence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/images/modern-residence-before.jpg"
              afterImage="/images/modern-residence-after.jpg"
              beforeAlt="Site before construction"
              afterAlt="Completed modern residence"
            />
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Project Gallery</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Explore the architectural details and engineering solutions that make this project exceptional.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/images/modern-residence-interior-1.jpg"
                alt="Living area with wood accents"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/images/modern-residence-staircase-1.jpg"
                alt="Modern staircase design"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/images/modern-residence-staircase-2.jpg"
                alt="Staircase with glass railings"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/images/modern-residence-staircase-3.jpg"
                alt="Architectural staircase details"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/images/modern-residence-dining.jpg"
                alt="Dining area with modern furniture"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/images/modern-residence-entrance.jpg"
                alt="Modern entrance design"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">Technical Specifications</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">Structural Engineering</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Foundation Type:</span>
                    <span className="font-medium">Reinforced Concrete Caissons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frame System:</span>
                    <span className="font-medium">Steel & Concrete Hybrid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seismic Rating:</span>
                    <span className="font-medium">Zone 4 Compliant</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Load Capacity:</span>
                    <span className="font-medium">150 PSF Live Load</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">Sustainability Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">LEED Rating:</span>
                    <span className="font-medium">Gold Certified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Energy Efficiency:</span>
                    <span className="font-medium">40% Above Code</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Water Conservation:</span>
                    <span className="font-medium">30% Reduction</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Renewable Energy:</span>
                    <span className="font-medium">Solar + Geothermal</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Inspired by This Project?</h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-10">
            Let's discuss how we can bring similar innovation and excellence to your next residential project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 md:px-8 w-full sm:w-auto"
              >
                Start Your Project
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 w-full sm:w-auto bg-transparent"
              >
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
