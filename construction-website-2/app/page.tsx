"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Sparkles, Zap, Shield, Award, Users, Clock } from "lucide-react"
import { ModernButton } from "@/components/ui/modern-button"
import { ModernCard } from "@/components/ui/modern-card"
import { SmoothTile } from "@/components/smooth-tile"
import { LocalSEO } from "@/components/local-seo"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-neutral-900/50" />

        {/* Floating Elements - Optimized for performance */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-brand-500/5 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-brand-400/5 rounded-full"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <div className="container-modern relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                Competitive Pricing & Engineering Excellence
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-hero font-display mb-8"
            >
              Engineering Tomorrow's <span className="gradient-text">Solutions</span> Today
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-12"
            >
              Transform your vision into reality with our innovative engineering solutions. We deliver exceptional
              quality, precision, and expertise for residential, commercial, and industrial projects.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link href="/services">
                <ModernButton size="xl" icon={<ArrowRight className="h-5 w-5" />}>
                  Explore Services
                </ModernButton>
              </Link>
              <Link href="/projects">
                <ModernButton variant="outline" size="xl" icon={<Sparkles className="h-5 w-5" />}>
                  View Projects
                </ModernButton>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto"
            >
              {[
                { number: "150", label: "Projects Completed" },
                { number: "45+", label: "Years Experience" },
                { number: "1", label: "Expert Team" },
                { number: "98%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-neutral-300 dark:border-neutral-700 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-modern">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-6"
            >
              <Zap className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                Why Choose Solves All Engineering
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-display font-display mb-6"
            >
              Excellence in Every Detail
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
            >
              We combine cutting-edge technology with traditional engineering expertise to deliver solutions that exceed
              expectations and stand the test of time.
            </motion.p>
          </div>

          <div className="grid-cards">
            {[
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description:
                  "Every project meets the highest standards of quality and durability, backed by our comprehensive warranty and satisfaction guarantee.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Zap,
                title: "Innovative Solutions",
                description:
                  "We leverage cutting-edge technology and sustainable practices to deliver efficient, future-ready engineering solutions.",
                color: "from-brand-500 to-orange-500",
              },
              {
                icon: Users,
                title: "Expert Team",
                description:
                  "Our skilled professionals bring decades of combined experience and unwavering commitment to excellence in every project.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                description:
                  "We pride ourselves on meeting deadlines and delivering projects on schedule without compromising on quality or safety.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Award,
                title: "Competitive Pricing",
                description:
                  "We offer fair, transparent pricing for all our engineering services without compromising on quality or expertise.",
                color: "from-red-500 to-rose-500",
              },
              {
                icon: CheckCircle,
                title: "Transparent Process",
                description:
                  "Clear communication, detailed planning, and regular updates ensure you're informed throughout every phase of the project.",
                color: "from-indigo-500 to-blue-500",
              },
            ].map((feature, index) => (
              <SmoothTile key={index} index={index} delay={0.2}>
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg transition-transform duration-300 hover:scale-110`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </SmoothTile>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container-modern">
          <div className="grid-features items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 rounded-full px-6 py-3 mb-6">
                <Sparkles className="h-4 w-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Our Services</span>
              </div>

              <h2 className="text-display font-display mb-6">Comprehensive Engineering Solutions</h2>

              <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-8">
                From residential projects to commercial complexes and industrial facilities, we provide end-to-end
                engineering services tailored to your specific needs and vision.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Custom residential engineering and design",
                  "Commercial building development and systems",
                  "Industrial facility engineering and upgrades",
                  "Structural design and project management",
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300">{service}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/services">
                <ModernButton icon={<ArrowRight className="h-4 w-4" />}>Explore All Services</ModernButton>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-large">
                <Image
                  src="/images/modern-residence-after.jpg"
                  alt="Engineering project showcase"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-6 shadow-large"
              >
                <div className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-1">150</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Projects Completed</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-modern">
          <LocalSEO location="Livermore" showFullDetails={true} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="container-modern relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-display font-display text-white mb-6"
            >
              Ready to Build Your Vision?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-body-lg text-white/90 mb-12"
            >
              Transform your ideas into reality with Solves All Engineering's expert services. Contact us today for a
              free consultation and discover how we can bring your project to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link href="/contact">
                <ModernButton
                  variant="secondary"
                  size="xl"
                  icon={<ArrowRight className="h-5 w-5" />}
                  className="bg-white text-brand-600 hover:bg-neutral-50"
                >
                  Get Free Quote
                </ModernButton>
              </Link>
              <Link href="/projects">
                <ModernButton
                  variant="outline"
                  size="xl"
                  icon={<Sparkles className="h-5 w-5" />}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  View Portfolio
                </ModernButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const services = [
  {
    title: "Drainage Solutions",
    description:
      "Comprehensive drainage systems to prevent flooding and water damage on residential and commercial properties.",
    image: "/images/residential-1.png",
    link: "/services/drainage",
  },
  {
    title: "Earth Retainment",
    description:
      "Professional retaining wall construction and slope stabilization for challenging terrain and erosion control.",
    image: "/images/commercial-1.png",
    link: "/services/retainment",
  },
  {
    title: "Remediation Services",
    description: "Environmental remediation and site cleanup services for contaminated soil and water issues.",
    image: "/images/industrial-1.png",
    link: "/services/remediation",
  },
  {
    title: "Stormwater Management",
    description:
      "Advanced stormwater management systems designed to handle Northern California's unique weather patterns.",
    image: "/images/project-3.png",
    link: "/services/stormwater",
  },
  {
    title: "Residential Flooding Solutions",
    description: "Specialized solutions for homes experiencing flooding, water intrusion, and drainage problems.",
    image: "/images/process.png",
    link: "/services/flooding",
  },
  {
    title: "Emergency Water Damage",
    description: "Rapid response emergency services for water damage assessment and immediate remediation.",
    image: "/images/residential-2.png",
    link: "/services/emergency",
  },
]

const processSteps = [
  {
    title: "Initial Consultation",
    description:
      "We begin with a thorough assessment of your property and the specific problems you're facing to determine the best course of action.",
  },
  {
    title: "Design & Planning",
    description:
      "Our engineering team creates detailed plans and visualizations, incorporating your feedback at every stage to develop effective and sustainable solutions.",
  },
  {
    title: "Permitting & Approvals",
    description:
      "We handle all necessary permits and regulatory approvals to ensure your project proceeds smoothly and complies with local regulations.",
  },
  {
    title: "Construction",
    description:
      "Our skilled craftsmen bring your project to life with precision, quality materials, and attention to detail, ensuring long-lasting results.",
  },
  {
    title: "Quality Assurance",
    description:
      "Rigorous quality checks throughout the construction process ensure everything meets our high standards and your complete satisfaction.",
  },
  {
    title: "Project Completion",
    description:
      "We deliver your completed project on time and provide comprehensive support even after completion, ensuring your peace of mind.",
  },
]

const benefits = [
  {
    title: "Environmental Expertise",
    description:
      "Led by Matt, with a strong background in environmental science, ensuring environmentally sound and sustainable solutions.",
  },
  {
    title: "Warranty",
    description:
      "We stand behind our work with a comprehensive warranty, giving you confidence in the quality and durability of our solutions.",
  },
  {
    title: "Problem-Solving Expertise",
    description:
      "We excel at tackling complex engineering challenges, providing innovative and effective solutions tailored to your specific needs.",
  },
  {
    title: "Specialized Equipment",
    description:
      "We utilize specialized equipment and techniques to ensure efficient and precise execution of every project.",
  },
  {
    title: "Competitive Pricing",
    description: "Fair, transparent pricing with no hidden costs or unexpected surprises.",
  },
]
