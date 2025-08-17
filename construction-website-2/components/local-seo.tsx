import { MapPin, Phone, Mail, Clock, Award, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface LocalSEOProps {
  location?: string
  showFullDetails?: boolean
}

export function LocalSEO({ location = 'Livermore', showFullDetails = true }: LocalSEOProps) {
  const serviceAreas = [
    'Livermore, CA',
    'Pleasanton, CA',
    'Dublin, CA', 
    'San Ramon, CA',
    'Danville, CA',
    'Tracy, CA',
    'Manteca, CA',
    'Manteca, CA',
    'Stockton, CA',
    'Fremont, CA',
    'Hayward, CA',
    'San Leandro, CA'
  ]

  const localServices = [
    'Drainage Solutions',
    'Retaining Walls', 
    'Concrete & Masonry',
    'Landscaping',
    'Fencing',
    'Decks & Patios',
    'Excavation & Grading',
    'Environmental Remediation',
    'Stormwater Management',
    'Flooding Solutions',
    'Emergency Services'
  ]

  const localBenefits = [
    'Licensed Class A General Engineering Contractor',
    '45+ Years of Experience in Northern California',
    'Local Knowledge of Soil Conditions & Regulations',
    'Emergency Response Available 24/7',
    'Warranty-Backed Work',
    'Competitive Local Pricing',
    'Familiar with Local Building Codes',
    'Established Relationships with Local Suppliers'
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full px-4 py-2 text-sm font-medium mb-4">
          <MapPin className="h-4 w-4" />
          <span>Local Service Area</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Serving {location} & Surrounding Areas
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Solves All Engineering is your trusted local partner for all engineering and construction needs in Northern California. 
          We understand the unique challenges of our region and provide solutions tailored to local conditions.
        </p>
      </div>

      {showFullDetails && (
        <>
          {/* Service Areas */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Primary Service Areas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {serviceAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>

          {/* Local Services */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Local Engineering Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 border border-blue-200 dark:border-blue-700"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Local Benefits */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Why Choose Local
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 border border-blue-200 dark:border-blue-700"
                >
                  <Award className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Get Your Free Local Consultation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
              <p className="font-semibold text-gray-900 dark:text-white">(925) 899-8123</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-semibold text-gray-900 dark:text-white">Matt@solvesall.org</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Get Free Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* Local Trust Indicators */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Licensed & Bonded</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-blue-500" />
            <span>45+ Years Experience</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span>24/7 Emergency</span>
          </div>
        </div>
      </div>
    </div>
  )
}
