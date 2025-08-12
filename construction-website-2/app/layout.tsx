import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import dynamic from "next/dynamic"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { ModernNavbar } from "@/components/modern-navbar"

import "@/app/globals.css"

// Lazy load performance monitor since it's not critical for initial render
const PerformanceMonitor = dynamic(
  () => import("@/components/performance-monitor").then(mod => ({ default: mod.PerformanceMonitor })),
  { 
    ssr: false,
    loading: () => null
  }
)

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
  weight: ["400", "600", "700"],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: {
    default: "Solves All Engineering | Drainage, Earth Retainment & Remediation | Northern California",
    template: "%s | Solves All Engineering",
  },
  description:
    "Northern California's premier Class A General Engineering Contractor specializing in drainage solutions, earth retainment, and environmental remediation. Expert engineering services with warranty protection.",
  keywords: [
    "engineering contractor",
    "drainage solutions",
    "earth retainment",
    "environmental remediation",
    "Northern California",
    "Livermore",
    "stormwater management",
    "construction services",
  ],
  authors: [{ name: "Solves All Engineering" }],
  creator: "Solves All Engineering",
  publisher: "Solves All Engineering",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://solvesall.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Solves All Engineering | Expert Drainage & Earth Retainment Solutions",
    description:
      "Northern California's premier engineering contractor specializing in drainage, earth retainment, and remediation solutions. Expert services with warranty protection.",
    url: "https://solvesall.org",
    siteName: "Solves All Engineering",
    images: [
      {
        url: "/images/modern-residence-after.jpg",
        width: 1200,
        height: 630,
        alt: "Solves All Engineering - Professional drainage and earth retainment solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Solves All Engineering | Expert Engineering Solutions",
    description:
      "Northern California's premier engineering contractor specializing in drainage, earth retainment, and remediation solutions.",
    images: ["/images/modern-residence-after.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/images/modern-residence-after.jpg" as="image" type="image/jpeg" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="bg-white text-neutral-900 antialiased min-h-screen">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false} 
          storageKey="solves-all-theme" 
          disableTransitionOnChange={true}
        >
          <ModernNavbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <PerformanceMonitor />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
