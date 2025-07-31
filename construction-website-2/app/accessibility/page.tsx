import { AccessibilityAudit } from "@/components/accessibility-audit"
import { Eye, Keyboard, Volume2, MousePointer } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility Audit - WCAG 2.1 Compliance",
  description:
    "Comprehensive accessibility audit showing WCAG 2.1 color contrast compliance for all text and UI elements on the Solves All Engineering website.",
  keywords: ["accessibility", "WCAG 2.1", "color contrast", "compliance", "audit"],
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <AccessibilityAudit />
      </div>
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
