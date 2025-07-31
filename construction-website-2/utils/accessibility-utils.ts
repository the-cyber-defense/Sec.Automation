// Color contrast calculation utilities for WCAG compliance
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 0

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

export function isWCAGCompliant(ratio: number, level: "AA" | "AAA" = "AA", isLargeText = false): boolean {
  if (level === "AAA") {
    return isLargeText ? ratio >= 4.5 : ratio >= 7
  }
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

// Comprehensive color palette with WCAG-compliant combinations
export const colorPalette = {
  // Primary colors - Blue theme
  blue: {
    50: "#eff6ff", // rgb(239, 246, 255)
    100: "#dbeafe", // rgb(219, 234, 254)
    200: "#bfdbfe", // rgb(191, 219, 254)
    300: "#93c5fd", // rgb(147, 197, 253)
    400: "#60a5fa", // rgb(96, 165, 250)
    500: "#3b82f6", // rgb(59, 130, 246)
    600: "#2563eb", // rgb(37, 99, 235)
    700: "#1d4ed8", // rgb(29, 78, 216)
    800: "#1e40af", // rgb(30, 64, 175)
    900: "#1e3a8a", // rgb(30, 58, 138)
  },
  // Neutral colors
  neutral: {
    50: "#fafafa", // rgb(250, 250, 250)
    100: "#f5f5f5", // rgb(245, 245, 245)
    200: "#e5e5e5", // rgb(229, 229, 229)
    300: "#d4d4d4", // rgb(212, 212, 212)
    400: "#a3a3a3", // rgb(163, 163, 163)
    500: "#737373", // rgb(115, 115, 115)
    600: "#525252", // rgb(82, 82, 82)
    700: "#404040", // rgb(64, 64, 64)
    800: "#262626", // rgb(38, 38, 38)
    900: "#171717", // rgb(23, 23, 23)
  },
  // Gray colors (Tailwind standard)
  gray: {
    50: "#f9fafb", // rgb(249, 250, 251)
    100: "#f3f4f6", // rgb(243, 244, 246)
    200: "#e5e7eb", // rgb(229, 231, 235)
    300: "#d1d5db", // rgb(209, 213, 219)
    400: "#9ca3af", // rgb(156, 163, 175)
    500: "#6b7280", // rgb(107, 114, 128)
    600: "#4b5563", // rgb(75, 85, 99)
    700: "#374151", // rgb(55, 65, 81)
    800: "#1f2937", // rgb(31, 41, 55)
    900: "#111827", // rgb(17, 24, 39)
  },
  // Semantic colors
  white: "#ffffff", // rgb(255, 255, 255)
  black: "#000000", // rgb(0, 0, 0)

  // Success colors
  green: {
    100: "#dcfce7", // rgb(220, 252, 231)
    500: "#22c55e", // rgb(34, 197, 94)
    600: "#16a34a", // rgb(22, 163, 74)
    700: "#15803d", // rgb(21, 128, 61)
    800: "#166534", // rgb(22, 101, 52)
  },

  // Warning colors
  yellow: {
    100: "#fef3c7", // rgb(254, 243, 199)
    500: "#eab308", // rgb(234, 179, 8)
    600: "#ca8a04", // rgb(202, 138, 4)
    700: "#a16207", // rgb(161, 98, 7)
    800: "#854d0e", // rgb(133, 77, 14)
  },

  // Error colors
  red: {
    100: "#fee2e2", // rgb(254, 226, 226)
    500: "#ef4444", // rgb(239, 68, 68)
    600: "#dc2626", // rgb(220, 38, 38)
    700: "#b91c1c", // rgb(185, 28, 28)
    800: "#991b1b", // rgb(153, 27, 27)
  },
}

// WCAG-compliant color combinations
export const wcagCompliantCombinations = [
  // Primary text combinations
  {
    name: "Primary Heading",
    foreground: colorPalette.gray[900],
    background: colorPalette.white,
    usage: "Main headings (H1, H2)",
  },
  {
    name: "Secondary Heading",
    foreground: colorPalette.gray[800],
    background: colorPalette.white,
    usage: "Sub headings (H3, H4)",
  },
  { name: "Body Text", foreground: colorPalette.gray[700], background: colorPalette.white, usage: "Main content text" },
  {
    name: "Muted Text",
    foreground: colorPalette.gray[600],
    background: colorPalette.white,
    usage: "Secondary text, captions",
  },

  // Button combinations
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
    name: "Secondary Button",
    foreground: colorPalette.gray[700],
    background: colorPalette.gray[100],
    usage: "Secondary buttons",
  },
  {
    name: "Outline Button",
    foreground: colorPalette.blue[700],
    background: colorPalette.white,
    usage: "Outline style buttons",
  },

  // Navigation combinations
  {
    name: "Navigation Links",
    foreground: colorPalette.gray[700],
    background: colorPalette.white,
    usage: "Navigation menu items",
  },
  {
    name: "Active Navigation",
    foreground: colorPalette.blue[700],
    background: colorPalette.blue[50],
    usage: "Active navigation states",
  },

  // Badge and tag combinations
  {
    name: "Info Badge",
    foreground: colorPalette.blue[800],
    background: colorPalette.blue[100],
    usage: "Information badges",
  },
  {
    name: "Success Badge",
    foreground: colorPalette.green[800],
    background: colorPalette.green[100],
    usage: "Success indicators",
  },
  {
    name: "Warning Badge",
    foreground: colorPalette.yellow[800],
    background: colorPalette.yellow[100],
    usage: "Warning indicators",
  },
  {
    name: "Error Badge",
    foreground: colorPalette.red[800],
    background: colorPalette.red[100],
    usage: "Error indicators",
  },

  // Dark theme combinations
  {
    name: "Dark Primary Text",
    foreground: colorPalette.gray[100],
    background: colorPalette.gray[900],
    usage: "Dark mode headings",
  },
  {
    name: "Dark Body Text",
    foreground: colorPalette.gray[300],
    background: colorPalette.gray[900],
    usage: "Dark mode body text",
  },
  {
    name: "Dark Muted Text",
    foreground: colorPalette.gray[400],
    background: colorPalette.gray[900],
    usage: "Dark mode secondary text",
  },

  // Footer combinations
  {
    name: "Footer Text",
    foreground: colorPalette.gray[300],
    background: colorPalette.gray[900],
    usage: "Footer content",
  },
  {
    name: "Footer Links",
    foreground: colorPalette.gray[400],
    background: colorPalette.gray[900],
    usage: "Footer links",
  },

  // Form combinations
  {
    name: "Form Labels",
    foreground: colorPalette.gray[700],
    background: colorPalette.white,
    usage: "Form field labels",
  },
  {
    name: "Form Placeholders",
    foreground: colorPalette.gray[500],
    background: colorPalette.white,
    usage: "Input placeholders",
  },
  { name: "Form Borders", foreground: colorPalette.gray[300], background: colorPalette.white, usage: "Input borders" },
]

// Function to validate all color combinations
export function validateAllCombinations(): { passed: number; failed: number; total: number; results: any[] } {
  const results = wcagCompliantCombinations.map((combo) => {
    const ratio = getContrastRatio(combo.foreground, combo.background)
    const isAACompliant = isWCAGCompliant(ratio, "AA")
    const isAAACompliant = isWCAGCompliant(ratio, "AAA")

    return {
      ...combo,
      ratio: Math.round(ratio * 100) / 100,
      isAACompliant,
      isAAACompliant,
      status: isAAACompliant ? "AAA" : isAACompliant ? "AA" : "FAIL",
    }
  })

  const passed = results.filter((r) => r.isAACompliant).length
  const failed = results.filter((r) => !r.isAACompliant).length

  return {
    passed,
    failed,
    total: results.length,
    results,
  }
}

// Function to get contrast ratio grade
export function getContrastGrade(ratio: number): { grade: string; color: string; description: string } {
  if (ratio >= 7) {
    return { grade: "AAA", color: "green", description: "Enhanced accessibility" }
  } else if (ratio >= 4.5) {
    return { grade: "AA", color: "blue", description: "Standard accessibility" }
  } else if (ratio >= 3) {
    return { grade: "AA Large", color: "yellow", description: "Large text only" }
  } else {
    return { grade: "FAIL", color: "red", description: "Does not meet standards" }
  }
}
