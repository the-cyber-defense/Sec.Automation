import { AccessibilityAudit } from "@/components/accessibility-audit"
import { CheckCircle, Eye, Keyboard, Volume2, MousePointer } from "lucide-react"

export const metadata = {
  title: "Accessibility Statement | Solves All Engineering",
  description:
    "Our commitment to web accessibility and compliance with WCAG 2.1 standards. Learn about our accessibility features and testing.",
}

export default function AccessibilityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Accessibility Commitment
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Web Accessibility Statement</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Solves All Engineering is committed to ensuring digital accessibility for people with disabilities. We
              continually improve the user experience for everyone and apply relevant accessibility standards.
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Accessibility Features</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Our website includes numerous accessibility features designed to provide an inclusive experience for all
                users.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessibilityFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-700 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Audit */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AccessibilityAudit />
          </div>
        </div>
      </section>

      {/* Standards Compliance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Standards Compliance</h2>
              <p className="text-gray-700">
                We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-green-800">WCAG 2.1 AA Compliant</h3>
                </div>
                <p className="text-green-700 mb-4">
                  Our website meets the Web Content Accessibility Guidelines 2.1 Level AA standards, ensuring
                  accessibility for users with disabilities.
                </p>
                <ul className="space-y-2 text-green-700">
                  <li>• Color contrast ratios exceed 4.5:1</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Screen reader compatibility</li>
                  <li>• Alternative text for images</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-blue-800">Ongoing Testing</h3>
                </div>
                <p className="text-blue-700 mb-4">
                  We regularly test our website with assistive technologies and conduct accessibility audits to ensure
                  continued compliance.
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li>• Automated accessibility testing</li>
                  <li>• Manual testing with screen readers</li>
                  <li>• Keyboard-only navigation testing</li>
                  <li>• User feedback incorporation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Accessibility */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Accessibility Feedback</h2>
            <p className="text-gray-300 mb-8">
              If you encounter any accessibility barriers on our website or have suggestions for improvement, please
              contact us. We value your feedback and are committed to providing equal access to information and
              functionality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:accessibility@solvesall.org"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Email: accessibility@solvesall.org
              </a>
              <a
                href="tel:+15551234567"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Phone: (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const accessibilityFeatures = [
  {
    title: "Visual Accessibility",
    icon: Eye,
    description: "Enhanced visual accessibility features for users with visual impairments.",
    features: [
      "High contrast color schemes",
      "Scalable text up to 200%",
      "Alternative text for all images",
      "Clear visual focus indicators",
    ],
  },
  {
    title: "Keyboard Navigation",
    icon: Keyboard,
    description: "Full keyboard accessibility for users who cannot use a mouse.",
    features: [
      "Tab navigation through all elements",
      "Skip links for main content",
      "Keyboard shortcuts for common actions",
      "Logical tab order throughout site",
    ],
  },
  {
    title: "Screen Reader Support",
    icon: Volume2,
    description: "Optimized for screen readers and assistive technologies.",
    features: [
      "Semantic HTML structure",
      "ARIA labels and descriptions",
      "Proper heading hierarchy",
      "Form labels and instructions",
    ],
  },
  {
    title: "Motor Accessibility",
    icon: MousePointer,
    description: "Features for users with motor disabilities or limited dexterity.",
    features: [
      "Large touch targets (44px minimum)",
      "No time-sensitive interactions",
      "Drag and drop alternatives",
      "Click target spacing",
    ],
  },
]
