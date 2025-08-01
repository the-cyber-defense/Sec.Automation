import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Droplets, Shield, Wrench, Building, Hammer, TreePine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Engineering Services | Drainage, Earth Retainment & Remediation | Solves All Engineering",
  description:
    "Professional drainage solutions, earth retainment systems, and environmental remediation services across Northern California. Expert engineering contractors with warranty-backed work.",
  keywords:
    "drainage solutions, earth retainment, remediation services, stormwater management, Northern California engineering, construction services",
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-700/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
              >
                <Wrench className="h-4 w-4" />
                <span>Our Services</span>
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[0.9] tracking-tight">
                <span className="block">Engineering</span>
                <span className="block text-blue-600 dark:text-blue-400">Excellence</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
                Comprehensive solutions for drainage, earth retainment, and environmental challenges across Northern California.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
              >
                <Building className="h-4 w-4" />
                <span>What We Offer</span>
              </Badge>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block">Comprehensive</span>
                <span className="block text-blue-600 dark:text-blue-400">Engineering Solutions</span>
              </h2>
              
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                From concept to completion, we provide end-to-end services to bring your vision to life with precision and excellence.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-56 lg:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <div className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                  <Link href={service.link}>
                    <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Our Process</span>
              </Badge>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block">How We</span>
                <span className="block text-blue-600 dark:text-blue-400">Deliver Excellence</span>
              </h2>
              
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                Our streamlined process ensures a smooth experience from initial consultation to project completion.
              </p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line - hidden on mobile, visible on larger screens */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-800 hidden md:block"></div>

              {/* Process steps - mobile optimized */}
              <div className="space-y-8 md:space-y-12 relative">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 relative w-full">
                      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10">
                        <CardContent className="p-8 lg:p-10">
                          <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                            <span className="text-blue-700 dark:text-blue-400 font-bold text-xl">{index + 1}</span>
                          </div>
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                        </CardContent>
                      </Card>
                      {/* Circle on the timeline - hidden on mobile */}
                      <div className="absolute top-1/2 left-0 md:left-auto md:right-0 transform translate-y-[-50%] translate-x-[-50%] md:translate-x-[50%] w-6 h-6 bg-blue-500 rounded-full border-4 border-white z-20 hidden md:block"></div>
                    </div>
                    <div className="md:w-1/2 hidden md:block">{/* This div is just for spacing in the timeline */}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image
                src="/images/quality.png"
                alt="High-quality engineering construction work showing attention to detail and professional craftsmanship"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-6">
                <Badge 
                  variant="secondary" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0"
                >
                  <Shield className="h-4 w-4" />
                  <span>Why Choose Us</span>
                </Badge>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="block">The Solves All</span>
                  <span className="block text-blue-600 dark:text-blue-400">Difference</span>
                </h2>
                
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  When you choose Solves All Engineering, you're choosing a partner committed to excellence, innovation, and your complete satisfaction.
                </p>
              </div>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
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
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Ready to Start</span>
                <span className="block">Your Project?</span>
              </h2>

              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto font-light">
                Contact us today for a free consultation and discover how Solves All Engineering can bring your vision to life.
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
              <a href="tel:+19258998123">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 h-auto border-2 border-white text-white hover:bg-white/20 bg-transparent font-semibold transition-all duration-300"
                >
                  Call Now: (925) 899-8123
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Services data with updated content and icons
const services = [
  {
    title: "Drainage & Waterproofing Solutions",
    description: "Solves All Engineering can evaluate your existing infrastructure and develop a plan for addressing problems. We specialize in French drains, foundation drains, sump pumps, and grading for management of surface flow.",
    image: "/images/residential-1.png",
    alt: "Professional drainage and waterproofing solutions including French drains and foundation systems",
    link: "/services/drainage",
    icon: Droplets,
  },
  {
    title: "Retaining & Cinder Block Walls",
    description: "Structural earth retainment solutions including engineered retaining walls, cinder block construction, and slope stabilization for challenging terrain and erosion control.",
    image: "/images/commercial-1.png",
    alt: "Engineered retaining wall and cinder block construction for slope stabilization",
    link: "/services/retaining-walls",
    icon: Shield,
  },
  {
    title: "Pavers & Hardscapes",
    description: "Professional hardscape installation including pavers, walkways, patios, and decorative concrete work designed to enhance your property's functionality and aesthetic appeal.",
    image: "/images/project-3.png",
    alt: "Professional paver and hardscape installation for residential and commercial properties",
    link: "/services/pavers",
    icon: Hammer,
  },
  {
    title: "Stormwater Compliance & BMPs",
    description: "Solves All Engineering can work with you or your QISP to implement ERA Level 2 BMPs. We don't sell a product. We build solutions.",
    image: "/images/industrial-1.png",
    alt: "Stormwater compliance and BMP implementation for regulatory compliance",
    link: "/services/stormwater",
    icon: Building,
  },
  {
    title: "Environmental Remediation",
    description: "Comprehensive environmental cleanup services including contaminated soil remediation, groundwater treatment, and site restoration for industrial and commercial properties.",
    image: "/images/process.png",
    alt: "Environmental remediation and contaminated site cleanup services",
    link: "/services/remediation",
    icon: TreePine,
  },
  {
    title: "Underground Infrastructure",
    description: "Specialized underground utility installation, repair, and maintenance including sewer systems, water lines, electrical conduits, and telecommunications infrastructure.",
    image: "/images/residential-2.png",
    alt: "Underground infrastructure installation and utility system construction",
    link: "/services/infrastructure",
    icon: Wrench,
  },
]

const processSteps = [
  {
    title: "Initial Consultation",
    description:
      "We begin with a thorough assessment of your property and the specific problems you're facing to determine the best course of action.",
  },
  {
    title: "Design & Planning",
    description:
      "Our engineering team creates detailed plans and visualizations, incorporating your feedback at every stage to develop effective and sustainable solutions.",
  },
  {
    title: "Permitting & Approvals",
    description:
      "We handle all necessary permits and regulatory approvals to ensure your project proceeds smoothly and complies with local regulations.",
  },
  {
    title: "Construction",
    description:
      "Our skilled craftsmen bring your project to life with precision, quality materials, and attention to detail, ensuring long-lasting results.",
  },
  {
    title: "Quality Assurance",
    description:
      "Rigorous quality checks throughout the construction process ensure everything meets our high standards and your complete satisfaction.",
  },
  {
    title: "Project Completion",
    description:
      "We deliver your completed project on time and provide comprehensive support even after completion, ensuring your peace of mind.",
  },
]

const benefits = [
  {
    title: "Environmental Expertise",
    description:
      "Led by Matt, with a strong background in environmental science, ensuring environmentally sound and sustainable solutions.",
  },
  {
    title: "Warranty",
    description:
      "We stand behind our work with a comprehensive warranty, giving you confidence in the quality and durability of our solutions.",
  },
  {
    title: "Problem-Solving Expertise",
    description:
      "We excel at tackling complex engineering challenges, providing innovative and effective solutions tailored to your specific needs.",
  },
  {
    title: "Specialized Equipment",
    description:
      "We utilize specialized equipment and techniques to ensure efficient and precise execution of every project.",
  },
  {
    title: "Competitive Pricing",
    description: "Fair, transparent pricing with no hidden costs or unexpected surprises.",
  },
]
