import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileOptimizedImage } from "@/components/mobile-optimized-image"

export const metadata = {
  title: "Contact Solves All Engineering | Free Consultation & Quotes | Northern California",
  description:
    "Contact Solves All Engineering for expert drainage, earth retainment, and remediation services. Free consultations and competitive quotes across Northern California.",
  keywords:
    "contact engineering contractor, free consultation, drainage solutions, Northern California, Livermore, quotes",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <MobileOptimizedImage
          src="/images/contact-hero.png"
          alt="Contact Solves All Engineering for professional drainage, earth retainment, and remediation services"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Get in touch with our team to discuss your project needs or request a quote.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Get In Touch
              </div>
              <h2 className="text-4xl font-bold mb-6">We&apos;d Love to Hear From You</h2>
              <p className="text-gray-700 mb-10 text-lg">
                Whether you have a question about our services, want to request a quote, or are ready to start your
                project, we&apos;re here to help.
              </p>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Location</h3>
                    <p className="text-gray-700">552 S P St, Livermore, CA 94550</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone Number</h3>
                    <p className="text-gray-700">(925) 899-8123</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Address</h3>
                    <p className="text-gray-700">Matt@solvesall.org</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Working Hours</h3>
                    <p className="text-gray-700">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-700">Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div id="quote-form" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Request a Free Quote</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Fill out this form to get a detailed, no-obligation quote for your construction project. Our team will
                  analyze your requirements and provide a comprehensive estimate.
                </p>
                <form className="bg-gray-50 dark:bg-gray-800 p-10 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-300 h-[400px] rounded-2xl overflow-hidden relative">
              {/* This would be replaced with an actual map component in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600 text-lg font-medium">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              FAQ
            </div>
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-700 text-lg">Find answers to common questions about our services and process.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const faqs = [
  {
    question: "What types of projects do you handle?",
    answer:
      "We handle a wide range of engineering projects including drainage solutions, earth retainment systems, environmental remediation, stormwater management, and residential flooding solutions. We specialize in the hard-to-fix problems that other contractors turn down.",
  },
  {
    question: "How do I get a quote for my project?",
    answer:
      "You can request a quote by filling out our contact form, calling our office at (925) 899-8123, or sending us an email at Matt@solvesall.org. We'll schedule a consultation to discuss your project needs and provide a detailed estimate.",
  },
  {
    question: "How long does a typical engineering project take?",
    answer:
      "Project timelines vary depending on the scope and complexity. A drainage system installation might take 1-2 weeks, while a large retaining wall project could take several weeks. During our initial consultation, we'll provide an estimated timeline for your specific project.",
  },
  {
    question: "Do you handle permits and approvals?",
    answer:
      "Yes, we handle all necessary permits and regulatory approvals as part of our comprehensive service. Our team is familiar with local building codes and regulations to ensure a smooth approval process.",
  },
  {
    question: "What sets Solves All Engineering apart from other contractors?",
    answer:
      "Solves All Engineering stands out for our specialized expertise in drainage, earth retainment, and remediation. We tackle the hard-to-fix problems others turn down, provide warranty-backed work, and combine environmental science knowledge with practical engineering solutions.",
  },
]
