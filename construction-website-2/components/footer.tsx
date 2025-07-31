"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { ModernButton } from "@/components/ui/modern-button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: "Residential Engineering", href: "/services/residential" },
    { name: "Commercial Projects", href: "/services/commercial" },
    { name: "Stormwater Management", href: "/services/stormwater" },
  ]

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Accessibility", href: "/accessibility" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ]

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      <motion.div
        className="absolute top-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-neutral-700/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                Get the latest updates on our projects, engineering insights, and industry news delivered to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ModernButton className="w-full sm:w-auto">Subscribe</ModernButton>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold">Solves All Engineering</div>
                  <div className="text-sm text-neutral-400">Engineering Excellence</div>
                </div>
              </Link>

              <p className="text-neutral-400 mb-6 max-w-md">
                Specializing in stormwater management and construction solutions with unwavering commitment to our
                clients. We deliver innovative engineering solutions that exceed expectations.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-neutral-400">
                  <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>552 S P St, Livermore, CA 94550</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-400">
                  <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>(925) 899-8123</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-400">
                  <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Matt@solvesall.org</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-400">
                  <Clock className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Mon - Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 2:00 PM</span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <ArrowRight className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-bold mb-6">Company</h4>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <ArrowRight className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div className="mt-8">
                <h5 className="text-sm font-semibold mb-4 text-neutral-300">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="p-2 rounded-lg bg-neutral-800/50 hover:bg-blue-500 transition-colors duration-200 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-5 w-5 text-neutral-400 group-hover:text-white transition-colors duration-200" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-neutral-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-neutral-400 text-sm">© {currentYear} Solves All Engineering. All rights reserved.</div>

            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <div className="flex items-center space-x-2 text-neutral-400">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>WCAG 2.1 AA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
