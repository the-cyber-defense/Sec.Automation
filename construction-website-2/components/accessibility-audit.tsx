"use client"
import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, XCircle, Eye, Palette, Monitor } from "lucide-react"
import { isWCAGCompliant, validateAllCombinations, getContrastGrade } from "@/utils/accessibility-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AccessibilityAudit() {
  const [selectedLevel, setSelectedLevel] = useState<"AA" | "AAA">("AA")
  const [validationResults, setValidationResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const results = validateAllCombinations()
    setValidationResults(results)
    setIsLoading(false)
  }, [])

  const getComplianceIcon = (ratio: number, level: "AA" | "AAA") => {
    if (isWCAGCompliant(ratio, "AAA")) {
      return <CheckCircle className="h-5 w-5 text-green-600" />
    } else if (isWCAGCompliant(ratio, "AA")) {
      return <AlertCircle className="h-5 w-5 text-blue-600" />
    } else {
      return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getComplianceBadge = (ratio: number) => {
    const grade = getContrastGrade(ratio)
    const colorMap = {
      green: "bg-green-100 text-green-800 hover:bg-green-100",
      blue: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      red: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return <Badge className={colorMap[grade.color as keyof typeof colorMap]}>{grade.grade}</Badge>
  }

  if (isLoading || !validationResults) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing color contrast ratios...</p>
        </div>
      </div>
    )
  }

  const overallCompliance = validationResults.results.filter((combo: any) => {
    return isWCAGCompliant(combo.ratio, selectedLevel)
  }).length

  const compliancePercentage = Math.round((overallCompliance / validationResults.total) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <Eye className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">WCAG 2.1 Accessibility Audit</h1>
        </div>
        <p className="text-xl text-gray-600 leading-relaxed">
          Comprehensive analysis of color contrast ratios to ensure all text meets Web Content Accessibility Guidelines
          (WCAG) 2.1 standards for optimal readability and accessibility.
        </p>
      </div>

      {/* Overall Compliance Score */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-2xl">
            <div className="flex items-center">
              <Monitor className="h-6 w-6 text-blue-600 mr-2" />
              <span>Overall Compliance Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setSelectedLevel("AA")}
                variant={selectedLevel === "AA" ? "default" : "outline"}
                size="sm"
                className="font-semibold"
              >
                WCAG AA
              </Button>
              <Button
                onClick={() => setSelectedLevel("AAA")}
                variant={selectedLevel === "AAA" ? "default" : "outline"}
                size="sm"
                className="font-semibold"
              >
                WCAG AAA
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-6xl font-bold text-green-600 mb-2">{compliancePercentage}%</div>
              <div className="text-lg text-gray-700 mb-4">
                <strong>{overallCompliance}</strong> of <strong>{validationResults.total}</strong> combinations pass{" "}
                {selectedLevel} standards
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>
                    {validationResults.results.filter((r: any) => r.status === "AAA").length} combinations achieve AAA
                    level
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <AlertCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>
                    {validationResults.results.filter((r: any) => r.status === "AA").length} combinations meet AA
                    standard
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <XCircle className="h-4 w-4 text-red-600 mr-2" />
                  <span>
                    {validationResults.results.filter((r: any) => r.status === "FAIL").length} combinations need
                    improvement
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
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
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="combinations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="combinations" className="flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Color Combinations
          </TabsTrigger>
          <TabsTrigger value="summary">Compliance Summary</TabsTrigger>
          <TabsTrigger value="guidelines">WCAG Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="combinations" className="space-y-6">
          <div className="grid gap-6">
            <h3 className="text-2xl font-bold text-gray-900">Detailed Color Combination Analysis</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {validationResults.results.map((combo: any, index: number) => {
                const isCompliant = isWCAGCompliant(combo.ratio, selectedLevel)
                const grade = getContrastGrade(combo.ratio)

                return (
                  <Card
                    key={index}
                    className={`border-2 transition-all hover:shadow-lg ${
                      isCompliant ? "border-green-200 bg-green-50/30" : "border-red-200 bg-red-50/30"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="text-gray-900">{combo.name}</span>
                        {getComplianceIcon(combo.ratio, selectedLevel)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Color Preview */}
                      <div
                        className="p-4 rounded-xl border-2 min-h-[80px] flex flex-col justify-center"
                        style={{
                          backgroundColor: combo.background,
                          color: combo.foreground,
                          borderColor: combo.foreground + "20",
                        }}
                      >
                        <div className="font-semibold text-lg mb-1">Sample Text</div>
                        <div className="text-sm opacity-90">{combo.usage}</div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-600 mb-1">Contrast Ratio</div>
                          <div className="text-2xl font-bold text-gray-900">{combo.ratio}:1</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-600 mb-1">Compliance</div>
                          <div className="mt-1">{getComplianceBadge(combo.ratio)}</div>
                        </div>
                      </div>

                      {/* Color Values */}
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-600">Foreground:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded font-mono">{combo.foreground}</code>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-600">Background:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded font-mono">{combo.background}</code>
                        </div>
                      </div>

                      {/* Grade Description */}
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <strong>{grade.grade}:</strong> {grade.description}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Compliance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {validationResults.results.filter((r: any) => r.status === "AAA").length}
                  </div>
                  <div className="text-sm font-medium text-green-800">AAA Compliant</div>
                  <div className="text-xs text-green-600 mt-1">Enhanced accessibility</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {validationResults.results.filter((r: any) => r.status === "AA").length}
                  </div>
                  <div className="text-sm font-medium text-blue-800">AA Compliant</div>
                  <div className="text-xs text-blue-600 mt-1">Standard accessibility</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {validationResults.results.filter((r: any) => r.status === "FAIL").length}
                  </div>
                  <div className="text-sm font-medium text-red-800">Non-Compliant</div>
                  <div className="text-xs text-red-600 mt-1">Needs improvement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">WCAG 2.1 Color Contrast Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-blue-600">Level AA Requirements</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Normal text:</strong> 4.5:1 minimum contrast ratio
                        <div className="text-sm text-gray-600">Text smaller than 18pt or 14pt bold</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Large text:</strong> 3:1 minimum contrast ratio
                        <div className="text-sm text-gray-600">Text 18pt+ or 14pt+ bold</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>UI components:</strong> 3:1 minimum contrast ratio
                        <div className="text-sm text-gray-600">Buttons, form controls, focus indicators</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-green-600">Level AAA Requirements</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Normal text:</strong> 7:1 minimum contrast ratio
                        <div className="text-sm text-gray-600">Enhanced accessibility standard</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Large text:</strong> 4.5:1 minimum contrast ratio
                        <div className="text-sm text-gray-600">Higher standard for large text</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Benefits:</strong> Better for users with visual impairments
                        <div className="text-sm text-gray-600">Recommended for critical applications</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h5 className="font-semibold text-lg mb-3 text-blue-800">Why Color Contrast Matters</h5>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <ul className="space-y-2">
                    <li>• Improves readability for all users</li>
                    <li>• Essential for users with visual impairments</li>
                    <li>• Better usability in bright environments</li>
                    <li>• Reduces eye strain and fatigue</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>• Legal compliance requirements</li>
                    <li>• Better SEO and user experience</li>
                    <li>• Supports assistive technologies</li>
                    <li>• Professional and inclusive design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
