import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Home, Hammer, Square, Grid3X3, Building, Layers, TreePine } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Residential Engineering Services | Solves All Engineering | Northern California",
  description:
    "Explore Solves All Engineering's residential services including pavers, hardscapes, masonry, and retaining walls for Northern California homes.",
}

export default function ResidentialServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src="/images/residential-1.png" alt="Residential construction" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Residential Engineering Services</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Expert outdoor construction, hardscapes, and structural solutions for your home.
          </p>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Residential Services
              </div>
              <h2 className="text-4xl font-bold mb-6">Transform Your Outdoor Living Spaces</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                At Solves All Engineering, we specialize in creating beautiful, functional outdoor spaces that enhance
                your home's value and your family's lifestyle. From elegant paver patios to sturdy retaining walls,
                we bring your yard vision to life with expert craftsmanship.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Whether you need a welcoming front porch, a stunning backyard patio, or structural retaining walls,
                our experienced team combines traditional masonry techniques with modern engineering to deliver
                lasting results that exceed your expectations.
              </p>
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/residential-2.png" alt="Residential construction" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              What We Offer
            </div>
            <h2 className="text-4xl font-bold mb-6">Our Residential Outdoor Services</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              We provide comprehensive outdoor construction services including pavers, hardscapes, masonry, and retaining walls
              to transform your residential property.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {residentialServices.map((service, index) => (
              <div key={index} className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Our Process
            </div>
            <h2 className="text-4xl font-bold mb-6">How We Transform Your Outdoor Spaces</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Our streamlined process ensures a smooth experience from design consultation to project completion.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>

              {/* Process steps */}
              <div className="space-y-12 relative">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 relative">
                      <div className="bg-gray-50 dark:bg-neutral-800 p-8 rounded-2xl shadow-sm relative z-10">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                          <span className="text-blue-700 font-bold text-xl">{index + 1}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                      </div>
                      {/* Circle on the timeline */}
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

      {/* Projects Showcase */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Our Portfolio
            </div>
            <h2 className="text-4xl font-bold mb-6">Featured Outdoor Projects</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Explore some of our recent residential outdoor projects that showcase our expertise in pavers, hardscapes, and masonry.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {residentialProjects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-md">
                <div className="relative h-80 w-full">
                  <Image
                    src={project.image || "/project-placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="font-bold text-xl text-white">{project.title}</h3>
                      <p className="text-blue-300 mb-4">{project.location}</p>
                      <div>
                        <Button variant="outline" className="text-white border-white hover:bg-white dark:bg-neutral-900/20 bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Client Testimonials
            </div>
            <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Hear from homeowners who have trusted us with their outdoor construction and hardscape projects.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-neutral-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-blue-300">
                    <Image
                      src={testimonial.avatar || "/project-placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-blue-600">{testimonial.project}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 dark:bg-neutral-950 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Outdoor Space?</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Contact us today for a free consultation and discover how Solves All Engineering can bring your outdoor vision to
            life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8">
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
const residentialServices = [
  {
    title: "Paver Patios",
    description: "Create stunning outdoor living spaces with expertly installed paver patios. From intimate gathering areas to expansive entertainment zones.",
    icon: Square,
    features: [
      "Natural stone and concrete pavers",
      "Custom patterns and designs",
      "Proper base preparation",
      "Long-lasting installation",
    ],
  },
  {
    title: "Porch Installation",
    description: "Enhance your home's curb appeal with beautiful paver porches that welcome guests in style.",
    icon: Home,
    features: [
      "Weather-resistant materials",
      "Slip-resistant surfaces",
      "Complementary design integration",
      "Professional craftsmanship",
    ],
  },
  {
    title: "Walkways & Paths",
    description: "Guide visitors through your landscape with elegantly designed paver walkways and garden trails.",
    icon: Grid3X3,
    features: [
      "Functional pathway design",
      "ADA compliant options",
      "Drainage considerations",
      "Landscape integration",
    ],
  },
  {
    title: "Custom Masonry",
    description: "Bring architectural character to your outdoor spaces with custom masonry work and decorative walls.",
    icon: Hammer,
    features: [
      "Natural stone and brick work",
      "Custom design consultation",
      "Structural integrity focus",
      "Timeless aesthetic appeal",
    ],
  },
  {
    title: "Concrete Retaining Walls",
    description: "Engineered concrete retaining walls for maximum durability and load-bearing capacity.",
    icon: Building,
    features: [
      "Reinforced concrete construction",
      "Custom height and length",
      "Drainage integration",
      "Decorative finish options",
    ],
  },
  {
    title: "Interlocking Block Systems",
    description: "Modular interlocking block walls offering both strength and aesthetic appeal for residential applications.",
    icon: Layers,
    features: [
      "Modular design flexibility",
      "Natural drainage properties",
      "Multiple color options",
      "Cost-effective installation",
    ],
  },
]

const processSteps = [
  {
    title: "Site Assessment",
    description:
      "We begin with a thorough assessment of your outdoor space, soil conditions, and drainage requirements for your project.",
  },
  {
    title: "Design & Planning",
    description:
      "Our team creates detailed plans and visualizations of your outdoor space, incorporating your vision and practical considerations.",
  },
  {
    title: "Material Selection",
    description:
      "We guide you through selecting the right pavers, stones, and materials that balance durability, aesthetics, and budget.",
  },
  {
    title: "Preparation & Installation",
    description:
      "Our skilled craftsmen prepare the site properly and install your pavers, walls, or masonry with precision and attention to detail.",
  },
  {
    title: "Quality Assurance",
    description:
      "Rigorous quality checks ensure proper drainage, structural integrity, and that your project meets our high standards.",
  },
  {
    title: "Final Inspection",
    description:
      "We conduct a comprehensive walkthrough to ensure every detail meets your expectations and provide maintenance guidance.",
  },
]

const residentialProjects = [
  {
    id: "hillside-patio",
    title: "Hillside Paver Patio",
    location: "Livermore Hills",
    image: "/images/residential-1.png",
  },
  {
    id: "retaining-wall",
    title: "Terraced Retaining Walls",
    location: "Bay Area Residence",
    image: "/images/residential-2.png",
  },
  {
    id: "front-walkway",
    title: "Elegant Front Walkway",
    location: "Northern California",
    image: "/images/residential-3.png",
  },
]

const testimonials = [
  {
    name: "Emily & David Thompson",
    project: "Paver Patio & Walkway",
    quote:
      "Solves All Engineering transformed our backyard into an amazing outdoor living space. The paver patio and walkways are beautiful and have held up perfectly through multiple seasons.",
    avatar: "/images/testimonial-1.png",
  },
  {
    name: "Michael Rodriguez",
    project: "Retaining Wall & Landscaping",
    quote:
      "The retaining wall project was handled with expertise and care. They solved our drainage issues while creating a beautiful terraced landscape that we absolutely love.",
    avatar: "/images/testimonial-2.png",
  },
]
