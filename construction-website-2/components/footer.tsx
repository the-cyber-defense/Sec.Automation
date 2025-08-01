"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Award, Shield, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  <path d="M16 2L4 8v10c0 8 12 12 12 12s12-4 12-12V8L16 2z" fill="url(#logoGradient)" stroke="none" />
                  <path
                    d="M12 16l3 3 6-6"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Solves All Engineering</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-base leading-relaxed mb-6">
              Northern California's premier Class A General Engineering Contractor specializing in drainage solutions, earth retainment, and environmental remediation since 2008.
            </p>
            
            {/* Credentials */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-800/50">
                <Award className="h-3 w-3 mr-1" />
                Licensed Contractor
              </Badge>
              <Badge variant="secondary" className="bg-green-900/30 text-green-300 border-green-800/50">
                <Shield className="h-3 w-3 mr-1" />
                Fully Insured
              </Badge>
              <Badge variant="secondary" className="bg-purple-900/30 text-purple-300 border-purple-800/50">
                <Clock className="h-3 w-3 mr-1" />
                24/7 Emergency
              </Badge>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white dark:text-gray-100">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300"
                >
                  Drainage & Waterproofing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300"
                >
                  Retaining & Cinder Block Walls
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300"
                >
                  Environmental Remediation
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300"
                >
                  Stormwater Compliance
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block py-2 hover:pl-2 transition-all duration-300"
                >
                  Pavers & Hardscapes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white dark:text-gray-100">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 dark:text-blue-300 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-gray-300 dark:text-gray-400 text-base block">552 S P St</span>
                  <span className="text-gray-300 dark:text-gray-400 text-base">Livermore, CA 94550</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 dark:text-blue-300 flex-shrink-0" />
                <div>
                  <a href="tel:+19258998123" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block">
                    (925) 899-8123
                  </a>
                  <span className="text-gray-500 dark:text-gray-500 text-sm">24/7 Emergency Line</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 dark:text-blue-300 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:Matt@solvesall.org"
                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-base block"
                  >
                    Matt@solvesall.org
                  </a>
                  <span className="text-gray-500 dark:text-gray-500 text-sm">Response within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-12 mb-12">
          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-800/30 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Emergency Services Available</h3>
                <p className="text-red-300">24/7 Response for Critical Water & Drainage Issues</p>
              </div>
            </div>
            <a href="tel:+19258998123">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Call Emergency Line: (925) 899-8123
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 dark:text-gray-500 text-base mb-2">
                © 2024 Solves All Engineering. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-600 text-sm">
                Licensed General Engineering Contractor • License #123456
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              <Link href="/privacy" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white text-base transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white text-base transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white text-base transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          
          {/* Additional certifications and badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4 border-t border-gray-800 dark:border-gray-700">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-600 text-sm">
              <Shield className="h-4 w-4" />
              <span>Fully Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>BBB Accredited</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-600 text-sm">
              <Award className="h-4 w-4" />
              <span>Warranty Backed Work</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for mobile bottom navigation if needed */}
      <div className="h-safe-area-inset-bottom" />
    </footer>
  )
}
