import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { ModernNavbar } from "@/components/modern-navbar"
import "@/app/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Solves All Engineering",
  description:
    "Specializing in stormwater management and construction solutions with unwavering commitment to our clients.",
  openGraph: {
    title: "Solves All Engineering",
    description:
      "Specializing in stormwater management and construction solutions with unwavering commitment to our clients.",
    url: "https://solvesall.org",
    siteName: "Solves All Engineering",
    images: [
      {
        url: "/images/modern-residence-after.jpg",
        width: 1200,
        height: 630,
        alt: "Solves All Engineering - Modern Residence After Project",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Solves All Engineering",
    description:
      "Specializing in stormwater management and construction solutions with unwavering commitment to our clients.",
    images: ["/images/modern-residence-after.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
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
      <body className="bg-white dark:bg-neutral-900">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <ModernNavbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
