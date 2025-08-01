import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Star, Users, Award, Clock, Shield, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-700/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge 
                    variant="secondary" 
                    className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
                  >
                    <Award className="h-4 w-4" />
                    <span>Class A General Engineering Contractor</span>
                  </Badge>

                  <div className="space-y-4">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white leading-[0.9] tracking-tight">
                      <span className="block">Expert</span>
                      <span className="block text-blue-600 dark:text-blue-400">Engineering</span>
                      <span className="block">Solutions</span>
                    </h1>
                    
                    <div className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-600 dark:text-gray-300 leading-relaxed">
                      <span className="block">Transforming challenges into</span>
                      <span className="block font-medium text-gray-800 dark:text-gray-200">lasting solutions across Northern California</span>
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto lg:mx-0">
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                      From complex drainage systems to structural retaining walls and environmental remediation—we tackle the projects others won't, delivering engineered solutions that stand the test of time.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="text-lg px-10 py-6 h-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Get Free Consultation
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-10 py-6 h-auto border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 bg-transparent transition-all duration-300"
                    >
                      View Our Work
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-12 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-semibold">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                      <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className="font-semibold">5-Star Rated</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-semibold">Warranty Backed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:ml-8">
              <div className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <Image
                  src="/images/modern-residence-after.jpg"
                  alt="Professional engineering project showcasing expert drainage and earth retainment solutions by Solves All Engineering"
                  fill
                  className="object-cover"
                  priority
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Projects Completed</div>
                  </div>
                  <div className="w-px h-16 bg-gray-200 dark:bg-gray-600" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">15+</div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
              >
                <Target className="h-4 w-4" />
                <span>Our Specializations</span>
              </Badge>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block">Engineering Solutions</span>
                <span className="block text-blue-600 dark:text-blue-400">That Actually Work</span>
              </h2>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                From residential drainage to commercial stormwater compliance and environmental remediation—we engineer comprehensive solutions for the most challenging projects with precision and regulatory expertise.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <Badge className="bg-white/95 text-gray-900 hover:bg-white font-semibold">
                      {service.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="space-y-4 p-8">
                  <CardTitle className="text-2xl lg:text-3xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base lg:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 p-8">
                  <div className="space-y-6">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={service.link} className="block">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 bg-transparent transition-all duration-300 py-6 text-lg font-semibold"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
      <section className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <Badge 
                  variant="secondary" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
                >
                  <Zap className="h-4 w-4" />
                  <span>The Difference</span>
                </Badge>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="block">Why Choose</span>
                  <span className="block text-blue-600 dark:text-blue-400">Solves All Engineering</span>
                </h2>

                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  We're not just contractors—we're problem solvers who combine engineering expertise with practical experience to deliver solutions that last.
                </p>
              </div>

              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-6 p-6 rounded-2xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                      <benefit.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/quality.png"
                  alt="High-quality engineering construction work showing attention to detail and professional craftsmanship by Solves All Engineering team"
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Achievement Card */}
              <div className="absolute -top-8 -right-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">100%</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Ready to Solve Your</span>
                <span className="block">Engineering Challenge?</span>
              </h2>

              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto font-light">
                Don't let complex drainage, structural, or environmental issues hold back your project. Get expert engineering solutions with a free consultation today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 py-6 h-auto bg-white text-blue-600 hover:bg-gray-100 shadow-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Link href="tel:(925)899-8123">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 h-auto border-2 border-white text-white hover:bg-white/20 bg-transparent font-semibold transition-all duration-300"
                >
                  Call (925) 899-8123
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 pt-12 border-t border-blue-500/30">
              <div className="flex items-center space-x-3 text-blue-100">
                <div className="p-2 bg-white/20 rounded-full">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="font-semibold">24/7 Emergency Service</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <div className="p-2 bg-white/20 rounded-full">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="font-semibold">Free Estimates</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <div className="p-2 bg-white/20 rounded-full">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="font-semibold">Warranty Backed</span>
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
    title: "Drainage & Waterproofing Solutions",
    category: "Residential",
    description:
      "Solves All Engineering can evaluate your existing infrastructure and develop a plan for addressing problems. We specialize in French drains, foundation drains, sump pumps, and grading for management of surface flow.",
    image: "/images/residential-1.png",
    alt: "Professional drainage and waterproofing solutions including French drains and foundation waterproofing",
    features: [
      "French drains installation",
      "Foundation drains systems",
      "Sump pump installation",
      "Surface flow grading",
    ],
    link: "/services/residential",
  },
  {
    title: "Stormwater Compliance & BMPs",
    category: "Commercial",
    description:
      "Solves All Engineering can work with you or your QISP to implement ERA Level 2 BMPs. We don't sell a product. We build solutions. We can modify your facility's drainage to reduce sampling requirements, segregate non-industrial water from pollutant sources, or prepare your stormwater for BMP installation.",
    image: "/images/commercial-1.png",
    alt: "Commercial stormwater compliance and BMP implementation services",
    features: [
      "BMP implementation & maintenance",
      "ERA Level 2 BMP solutions",
      "Drainage modification for compliance",
      "Non-industrial water segregation"
    ],
    link: "/services",
  },
  {
    title: "Environmental Site Remediation",
    category: "Commercial",
    description: 
      "Solves All Engineering has the expertise to clean up areas of erosion and contamination, and then implement corrective actions to prevent future degradation. We have worked for facilities dealing with Clean Water Act citizen lawsuits and property owners with Lake and Streambed Alteration Agreements from the Department of Fish and Wildlife.",
    image: "/images/industrial-1.png",
    alt: "Environmental site remediation and contamination cleanup services",
    features: [
      "Erosion and contamination cleanup",
      "Clean Water Act compliance",
      "Lake & Streambed Alteration Agreements",
      "Corrective action implementation"
    ],
    link: "/services",
  },
  {
    title: "Underground Infrastructure",
    category: "Commercial",
    description:
      "Complete underground infrastructure solutions including pumping systems, water treatment, and retention/detention system installation. Our team designs and builds comprehensive underground systems tailored to your facility's specific requirements.",
    image: "/images/commercial-2.png",
    alt: "Underground infrastructure and pumping system installation",
    features: [
      "Pumping system installation",
      "Water treatment solutions",
      "Retention & detention systems",
      "Underground utility infrastructure"
    ],
    link: "/services",
  },
  {
    title: "Retaining & Cinder Block Walls",
    category: "Structural Solutions",
    description:
      "Solves All Engineering builds retaining walls big and small out of concrete, interlocking block, cinder block, and timber. We also work with structural engineers on projects where stamped civil drawings are required for the building permit.",
    image: "/images/project-1.png",
    alt: "Professional retaining wall construction using concrete, interlocking block, cinder block, and timber",
    features: [
      "Concrete retaining walls",
      "Interlocking block systems", 
      "Cinder block construction",
      "Stamped civil drawings coordination"
    ],
    link: "/services",
  },
  {
    title: "Pavers, Hardscapes & Masonry",
    category: "Landscape Solutions",
    description: 
      "Solves All Engineering specializes in the installation of pavers for patios, porches, and walkways. Talk to us about what you're envisioning for your yard and we'll help bring it to life.",
    image: "/images/project-2.png",
    alt: "Professional paver installation for patios, porches, walkways and hardscape design",
    features: [
      "Patio paver installation",
      "Porch construction", 
      "Walkway design & installation",
      "Custom hardscape solutions"
    ],
    link: "/services",
  },
]

const benefits = [
  {
    icon: Award,
    title: "Expert Engineering",
    description:
      "Led by Matt Mahoney with extensive environmental science background, ensuring every project meets the highest technical standards and regulatory requirements.",
  },
  {
    icon: Shield,
    title: "Warranty Protection",
    description:
      "We stand behind our work with comprehensive warranties and insurance coverage, giving you complete confidence in our solutions.",
  },
  {
    icon: Users,
    title: "Problem-Solving Specialists",
    description:
      "We thrive on complex challenges that others avoid, bringing innovative engineering solutions to seemingly impossible problems.",
  },
  {
    icon: Clock,
    title: "Reliable Partnership",
    description:
      "From initial consultation to project completion, we deliver on time with transparent communication and professional service throughout.",
  },
]