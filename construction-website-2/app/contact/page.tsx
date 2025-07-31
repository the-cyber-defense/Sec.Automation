import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { MobileOptimizedImage } from "@/components/mobile-optimized-image"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { EnhancedInput, EnhancedTextarea } from "@/components/ui/enhanced-form"
import { EnhancedButton } from "@/components/ui/enhanced-button"

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
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Get In Touch
              </div>
              <h2 className="text-4xl font-bold mb-6">We&apos;d Love to Hear From You</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-10 text-lg">
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
                    <p className="text-gray-700 dark:text-gray-300">552 S P St, Livermore, CA 94550</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone Number</h3>
                    <p className="text-gray-700 dark:text-gray-300">(925) 899-8123</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Address</h3>
                    <p className="text-gray-700 dark:text-gray-300">Matt@solvesall.org</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Working Hours</h3>
                    <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-700 dark:text-gray-300">Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div id="quote-form" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white dark:text-white">Request a Free Quote</h3>
                <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-6">
                  Fill out this form to get a detailed, no-obligation quote for your construction project. Our team will
                  analyze your requirements and provide a comprehensive estimate.
                </p>
                <EnhancedCard variant="glass" className="p-10 shadow-large">
                  <h3 className="text-2xl font-bold mb-8 text-gradient">Send Us a Message</h3>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <EnhancedInput
                        label="Your Name"
                        placeholder="John Doe"
                        variant="floating"
                        leftIcon={<Mail className="h-4 w-4" />}
                      />
                      <EnhancedInput
                        label="Email Address"
                        type="email"
                        placeholder="your.email@example.com"
                        variant="floating"
                        leftIcon={<Mail className="h-4 w-4" />}
                      />
                    </div>
                    
                    <EnhancedInput
                      label="Phone Number"
                      type="tel"
                      placeholder="(123) 456-7890"
                      variant="floating"
                      leftIcon={<Phone className="h-4 w-4" />}
                    />
                    
                    <EnhancedInput
                      label="Subject"
                      placeholder="Project Inquiry"
                      variant="floating"
                    />
                    
                    <EnhancedTextarea
                      label="Your Message"
                      placeholder="Tell us about your project..."
                      variant="floating"
                      rows={4}
                    />
                    
                    <EnhancedButton 
                      variant="primary" 
                      size="lg" 
                      className="w-full" 
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                      magnetic
                    >
                      Send Message
                    </EnhancedButton>
                  </form>
                </EnhancedCard>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              FAQ
            </div>
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">Find answers to common questions about our services and process.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
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
