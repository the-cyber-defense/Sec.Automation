import Image from "next/image"

import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { LocalSEO } from "@/components/local-seo"

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
        <Image
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Get In Touch
              </div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">We'd Love to Hear From You</h2>
              <p className="text-muted-foreground mb-10 text-lg">
                Whether you have a question about our services, want to request a quote, or are ready to start your
                project, we're here to help.
              </p>
              <ContactInfo />
            </div>
            <div>
              <div id="quote-form" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Request a Free Quote</h3>
                <p className="text-muted-foreground mb-6">
                  Fill out this form to get a detailed, no-obligation quote for your construction project. Our team will
                  analyze your requirements and provide a comprehensive estimate.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              FAQ
            </div>
            <h2 className="text-4xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Find answers to common questions about our services and process.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

            {/* Local SEO Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <LocalSEO location="Livermore" showFullDetails={true} />
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
