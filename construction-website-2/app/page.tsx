import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Star, Users, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium">
                  <Award className="h-4 w-4" />
                  <span>Class A General Engineering Contractor</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  <span className="block">Expert Engineering</span>
                  <span className="block text-blue-600">Solutions</span>
                  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-gray-600 mt-4">
                    for Northern California
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Specializing in <strong className="text-gray-900">drainage solutions</strong>,{" "}
                  <strong className="text-gray-900">earth retainment</strong>, and{" "}
                  <strong className="text-gray-900">environmental remediation</strong>. We solve the hard-to-fix
                  problems other contractors turn down.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 h-auto bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-4 h-auto border-2 border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    View Our Work
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">5-Star Rated</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Award className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Warranty Backed</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/modern-residence-after.jpg"
                  alt="Professional engineering project showcasing expert drainage and earth retainment solutions by Solves All Engineering"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">10+</div>
                    <div className="text-sm text-gray-600">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <Badge variant="secondary" className="inline-flex items-center space-x-2 px-4 py-2">
              <Users className="h-4 w-4" />
              <span>Our Expertise</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Engineering Solutions That
              <span className="block text-blue-600">Actually Work</span>
            </h2>

            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We specialize in the challenging projects that require both technical expertise and practical experience.
              Our solutions are designed to last, backed by comprehensive warranties.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white">{service.category}</Badge>
                  </div>
                </div>

                <CardHeader className="space-y-4">
                  <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={service.link} className="block">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-50 group-hover:border-blue-500 group-hover:text-blue-600 bg-transparent"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="inline-flex items-center space-x-2 px-4 py-2">
                  <Award className="h-4 w-4" />
                  <span>Why Choose Us</span>
                </Badge>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  The Solves All Engineering
                  <span className="block text-blue-600">Difference</span>
                </h2>

                <p className="text-xl text-gray-700 leading-relaxed">
                  When you choose Solves All Engineering, you're choosing a partner committed to excellence, innovation,
                  and your complete satisfaction. We don't just fix problems—we solve them permanently.
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/quality.png"
                  alt="High-quality engineering construction work showing attention to detail and professional craftsmanship by Solves All Engineering team"
                  fill
                  className="object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Floating Achievement Card */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600 font-medium">Satisfaction Rate</div>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready to Solve Your
                <span className="block">Engineering Challenge?</span>
              </h2>

              <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Don't let drainage, earth retainment, or remediation problems persist. Contact us today for a free
                consultation and discover how we can help.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4 h-auto bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="tel:(925)899-8123">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-2 border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Call (925) 899-8123
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-blue-500/30">
              <div className="flex items-center space-x-2 text-blue-100">
                <Clock className="h-5 w-5" />
                <span className="font-medium">24/7 Emergency Service</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Free Estimates</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Award className="h-5 w-5" />
                <span className="font-medium">Warranty Backed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Data
const services = [
  {
    title: "Drainage Solutions",
    category: "Water Management",
    description:
      "Comprehensive drainage systems designed to prevent flooding and water damage on residential and commercial properties.",
    image: "/images/residential-1.png",
    alt: "Professional drainage system installation preventing flooding and water damage",
    features: [
      "French drain installation",
      "Surface water management",
      "Foundation waterproofing",
      "Storm drain systems",
    ],
    link: "/services",
  },
  {
    title: "Earth Retainment",
    category: "Structural Solutions",
    description:
      "Professional retaining wall construction and slope stabilization for challenging terrain and erosion control.",
    image: "/images/commercial-1.png",
    alt: "Engineered retaining wall construction for slope stabilization and erosion control",
    features: ["Retaining wall construction", "Slope stabilization", "Erosion control systems", "Soil reinforcement"],
    link: "/services",
  },
  {
    title: "Environmental Remediation",
    category: "Environmental Services",
    description: "Expert environmental cleanup and remediation services for contaminated soil and water issues.",
    image: "/images/industrial-1.png",
    alt: "Environmental remediation and contaminated soil cleanup services",
    features: ["Soil remediation", "Groundwater treatment", "Contamination assessment", "Environmental compliance"],
    link: "/services",
  },
]

const benefits = [
  {
    icon: Award,
    title: "Expert Engineering",
    description:
      "Led by Matt Mahoney with extensive environmental science background, ensuring technically sound and sustainable solutions.",
  },
  {
    icon: CheckCircle,
    title: "Warranty Protection",
    description:
      "We stand behind our work with comprehensive warranties, giving you confidence in the quality and durability of our solutions.",
  },
  {
    icon: Users,
    title: "Problem-Solving Specialists",
    description:
      "We excel at tackling complex engineering challenges that other contractors turn down, providing innovative solutions.",
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description:
      "Timely project completion with transparent communication throughout the entire process, from consultation to completion.",
  },
]
