"use client"
import { useState } from "react"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { getContrastRatio, isWCAGCompliant, colorPalette } from "@/utils/accessibility-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ColorCombination {
  name: string
  foreground: string
  background: string
  usage: string
}

const colorCombinations: ColorCombination[] = [
  {
    name: "Primary Button",
    foreground: colorPalette.white,
    background: colorPalette.blue[600],
    usage: "Main call-to-action buttons",
  },
  {
    name: "Primary Button Hover",
    foreground: colorPalette.white,
    background: colorPalette.blue[700],
    usage: "Button hover states",
  },
  {
    name: "Body Text",
    foreground: colorPalette.neutral[700],
    background: colorPalette.white,
    usage: "Main content text",
  },
  {
    name: "Heading Text",
    foreground: colorPalette.neutral[900],
    background: colorPalette.white,
    usage: "Page headings and titles",
  },
  {
    name: "Info Badge",
    foreground: colorPalette.blue[700],
    background: colorPalette.blue[100],
    usage: "Information badges and tags",
  },
  {
    name: "Navigation Links",
    foreground: colorPalette.neutral[800],
    background: colorPalette.white,
    usage: "Navigation menu items",
  },
  {
    name: "Muted Text",
    foreground: colorPalette.neutral[600],
    background: colorPalette.white,
    usage: "Secondary text and descriptions",
  },
  {
    name: "Footer Text",
    foreground: colorPalette.neutral[400],
    background: colorPalette.neutral[900],
    usage: "Footer content and links",
  },
]

export function AccessibilityAudit() {
  const [selectedLevel, setSelectedLevel] = useState<"AA" | "AAA">("AA")

  const getComplianceIcon = (ratio: number, level: "AA" | "AAA") => {
    if (isWCAGCompliant(ratio, "AAA")) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    } else if (isWCAGCompliant(ratio, "AA")) {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getComplianceBadge = (ratio: number) => {
    if (isWCAGCompliant(ratio, "AAA")) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">AAA</Badge>
    } else if (isWCAGCompliant(ratio, "AA")) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">AA</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Fail</Badge>
    }
  }

  const overallCompliance = colorCombinations.filter((combo) => {
    const ratio = getContrastRatio(combo.foreground, combo.background)
    return isWCAGCompliant(ratio, selectedLevel)
  }).length

  const compliancePercentage = Math.round((overallCompliance / colorCombinations.length) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Accessibility Audit</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This audit verifies that all color combinations meet WCAG 2.1 accessibility standards for color contrast.
        </p>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Compliance Score</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedLevel("AA")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedLevel === "AA" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                WCAG AA
              </button>
              <button
                onClick={() => setSelectedLevel("AAA")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedLevel === "AAA" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                WCAG AAA
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-green-600">{compliancePercentage}%</div>
              <div className="text-gray-600">
                {overallCompliance} of {colorCombinations.length} combinations pass {selectedLevel} standards
              </div>
            </div>
            <div className="w-24 h-24 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${compliancePercentage}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Combinations */}
      <div className="grid gap-6">
        <h3 className="text-2xl font-bold">Color Combination Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {colorCombinations.map((combo, index) => {
            const ratio = getContrastRatio(combo.foreground, combo.background)
            const isCompliant = isWCAGCompliant(ratio, selectedLevel)

            return (
              <Card key={index} className={`border-2 ${isCompliant ? "border-green-200" : "border-red-200"}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{combo.name}</span>
                    {getComplianceIcon(ratio, selectedLevel)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Color Preview */}
                  <div
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: combo.background,
                      color: combo.foreground,
                      borderColor: combo.foreground + "20",
                    }}
                  >
                    <div className="font-semibold">Sample Text</div>
                    <div className="text-sm opacity-90">{combo.usage}</div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-700">Contrast Ratio</div>
                      <div className="text-2xl font-bold">{ratio.toFixed(2)}:1</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Compliance</div>
                      <div className="mt-1">{getComplianceBadge(ratio)}</div>
                    </div>
                  </div>

                  {/* Color Values */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="font-medium text-gray-600">Foreground</div>
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded">{combo.foreground}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-600">Background</div>
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded">{combo.background}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Standards Information */}
      <Card>
        <CardHeader>
          <CardTitle>WCAG 2.1 Standards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Level AA Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Normal text: 4.5:1 minimum contrast ratio</li>
                <li>• Large text (18pt+ or 14pt+ bold): 3:1 minimum</li>
                <li>• UI components and graphics: 3:1 minimum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Level AAA Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Normal text: 7:1 minimum contrast ratio</li>
                <li>• Large text (18pt+ or 14pt+ bold): 4.5:1 minimum</li>
                <li>• Enhanced accessibility for all users</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
