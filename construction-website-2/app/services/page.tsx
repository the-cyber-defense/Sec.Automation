import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

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
      <section className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/images/services-hero.png"
          alt="Professional engineering services including drainage, earth retainment, and remediation solutions"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">Engineering Solutions</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl">
            Specialized drainage, earth retainment, and remediation services for Northern California's toughest
            challenges.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium mb-3 md:mb-4">
              What We Offer
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">
              Comprehensive Engineering Solutions
            </h2>
            <p className="text-base md:text-lg text-gray-700">
              From concept to completion, we provide end-to-end services to bring your vision to life with precision and
              excellence.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{service.title}</h3>
                  <p className="text-gray-700 mb-5 md:mb-6 text-sm sm:text-base">{service.description}</p>
                  <Link href={service.link}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                      Learn More
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
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium mb-3 md:mb-4">
              Our Process
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">How We Work</h2>
            <p className="text-base md:text-lg text-gray-700">
              Our streamlined process ensures a smooth experience from initial consultation to project completion.
            </p>
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
                      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md relative z-10">
                        <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4">
                          <span className="text-blue-700 font-bold text-lg md:text-xl">{index + 1}</span>
                        </div>
                        <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">{step.title}</h3>
                        <p className="text-gray-700 text-sm sm:text-base">{step.description}</p>
                      </div>
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
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
              <Image
                src="/images/quality.png"
                alt="High-quality engineering construction work showing attention to detail and professional craftsmanship"
                fill
                className="object-cover"
                quality={75}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium mb-3 md:mb-4">
                Why Choose Us
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">
                The Solves All Engineering Difference
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-5 md:mb-8">
                When you choose Solves All Engineering, you're choosing a partner committed to excellence, innovation,
                and your complete satisfaction.
              </p>
              <div className="space-y-4 md:space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-500 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">{benefit.title}</h3>
                      <p className="text-gray-700 text-sm sm:text-base">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Start Your Project?</h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-10">
            Contact us today for a free consultation and discover how Solves All Engineering can bring your vision to
            life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 md:px-8 w-full sm:w-auto"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const services = [
  {
    title: "Drainage Solutions",
    description:
      "Comprehensive drainage systems including French drains, foundation drains, sump pumps, and grading for surface water management.",
    image: "/images/residential-1.png",
    alt: "Professional drainage system installation preventing flooding and water damage",
    link: "/services/drainage-solutions",
  },
  {
    title: "Earth Retainment",
    description:
      "Professional retaining wall construction and slope stabilization for challenging terrain and erosion control.",
    image: "/images/commercial-1.png",
    alt: "Engineered retaining wall construction for slope stabilization and erosion control",
    link: "/services/retainment",
  },
  {
    title: "Remediation Services",
    description: "Environmental remediation and site cleanup services for contaminated soil and water issues.",
    image: "/images/industrial-1.png",
    alt: "Environmental remediation and contaminated soil cleanup services",
    link: "/services/remediation",
  },
  {
    title: "Stormwater Management",
    description:
      "Advanced stormwater management systems designed to handle Northern California's unique weather patterns.",
    image: "/images/project-3.png",
    alt: "Advanced stormwater management system designed for Northern California weather",
    link: "/services/stormwater",
  },
  {
    title: "Residential Flooding Solutions",
    description: "Specialized solutions for homes experiencing flooding, water intrusion, and drainage problems.",
    image: "/images/process.png",
    alt: "Residential flooding solutions and water intrusion prevention systems",
    link: "/services/flooding",
  },
  {
    title: "Emergency Water Damage",
    description: "Rapid response emergency services for water damage assessment and immediate remediation.",
    image: "/images/residential-2.png",
    alt: "Emergency water damage response and immediate remediation services",
    link: "/services/emergency",
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
