import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card"

// Extended project data with before/after images and detailed information
const projectsData = {
  "hillside-drainage-system": {
    id: "hillside-drainage-system",
    title: "Hillside Drainage System",
    category: "Drainage",
    description:
      "Complete drainage solution for hillside property experiencing severe water intrusion and flooding issues. Custom engineered system with warranty.",
    image: "/images/modern-residence-after.jpg",
    beforeImage: "/images/modern-residence-before.jpg",
    afterImage: "/images/modern-residence-after.jpg",
    location: "Livermore Hills, CA",
    duration: "8 weeks",
    teamSize: "6 engineers",
    completedDate: "March 2024",
    client: "Private Homeowner",
    budget: "$45K",
    details: {
      overview:
        "This hillside drainage project addressed severe water intrusion and flooding issues that had plagued the property for years. Our team designed and implemented a comprehensive drainage system that redirects water flow and prevents future flooding while preserving the natural landscape.",
      challenges: [
        "Steep hillside terrain with unstable soil conditions",
        "Multiple water sources converging on property",
        "Previous failed attempts by other contractors",
        "Need to preserve existing landscaping and structures",
      ],
      solutions: [
        "Custom-designed French drain system with proper grading",
        "Installation of catch basins and underground piping",
        "Soil stabilization using engineered materials",
        "Integrated landscape restoration with native plants",
      ],
      features: [
        "300 linear feet of French drain installation",
        "4 strategically placed catch basins",
        "Underground drainage piping system",
        "Soil stabilization and erosion control",
        "Native plant restoration",
        "5-year warranty on all drainage components",
      ],
      specifications: {
        "Drainage Length": "300 linear feet",
        "Pipe Diameter": "6-inch perforated PVC",
        "Catch Basins": "4 units with grates",
        "Soil Treatment": "Engineered backfill material",
        "Warranty Period": "5 years",
        "Completion Time": "8 weeks",
      },
    },
  },
  "structural-retaining-wall": {
    id: "structural-retaining-wall",
    title: "Structural Retaining Wall",
    category: "Earth Retainment",
    description:
      "Engineered retaining wall solution to prevent soil erosion and provide long-term stability for residential property.",
    image: "/images/modern-residence-staircase-2.jpg",
    beforeImage: "/images/modern-residence-staircase-1.jpg",
    afterImage: "/images/modern-residence-staircase-2.jpg",
    location: "San Ramon, CA",
    duration: "6 weeks",
    teamSize: "8 engineers",
    completedDate: "January 2024",
    client: "Residential Property Owner",
    budget: "$65K",
    details: {
      overview:
        "This structural retaining wall project provided a permanent solution to ongoing soil erosion and slope instability issues. The engineered wall system not only prevents further erosion but also creates usable space and enhances property value.",
      challenges: [
        "Unstable slope with ongoing erosion",
        "Limited access for heavy equipment",
        "Need for proper drainage integration",
        "Matching existing architectural aesthetics",
      ],
      solutions: [
        "Engineered segmental retaining wall system",
        "Integrated drainage behind wall structure",
        "Proper foundation preparation and compaction",
        "Architectural finish matching home exterior",
      ],
      features: [
        "45-foot long engineered retaining wall",
        "8-foot maximum height with terracing",
        "Integrated drainage system",
        "Decorative block finish",
        "Proper backfill and compaction",
        "Lifetime structural warranty",
      ],
      specifications: {
        "Wall Length": "45 linear feet",
        "Maximum Height": "8 feet",
        "Block Type": "Engineered segmental blocks",
        Foundation: "Concrete footing 18 inches deep",
        Drainage: "French drain behind wall",
        Warranty: "Lifetime structural",
      },
    },
  },
  "water-damage-remediation": {
    id: "water-damage-remediation",
    title: "Water Damage Remediation",
    category: "Remediation",
    description:
      "Complete remediation and restoration after water intrusion damage, including structural repairs and moisture control systems.",
    image: "/images/modern-residence-interior-2.jpg",
    beforeImage: "/images/modern-residence-interior-1.jpg",
    afterImage: "/images/modern-residence-interior-2.jpg",
    location: "Pleasanton, CA",
    duration: "12 weeks",
    teamSize: "10 specialists",
    completedDate: "February 2024",
    client: "Insurance Claim - Homeowner",
    budget: "$85K",
    details: {
      overview:
        "This comprehensive water damage remediation project addressed extensive damage from a burst pipe and subsequent flooding. Our team not only restored the damaged areas but also implemented preventive measures to avoid future water intrusion issues.",
      challenges: [
        "Extensive water damage to multiple rooms",
        "Mold growth in wall cavities",
        "Structural damage to flooring systems",
        "Insurance coordination and documentation",
      ],
      solutions: [
        "Complete moisture extraction and drying",
        "Mold remediation following EPA protocols",
        "Structural repairs and reinforcement",
        "Installation of moisture monitoring systems",
      ],
      features: [
        "Complete water extraction and drying",
        "Mold remediation and air quality testing",
        "Structural floor and wall repairs",
        "New moisture-resistant materials",
        "Air quality monitoring systems",
        "2-year warranty on remediation work",
      ],
      specifications: {
        "Affected Area": "1,200 square feet",
        "Drying Time": "10 days",
        "Mold Treatment": "EPA-approved protocols",
        "Air Quality": "Post-remediation testing",
        Materials: "Moisture-resistant replacements",
        Warranty: "2 years",
      },
    },
  },
  "foundation-drainage-repair": {
    id: "foundation-drainage-repair",
    title: "Foundation Drainage Repair",
    category: "Drainage",
    description:
      "Foundation waterproofing and drainage system installation to resolve chronic basement flooding and foundation issues.",
    image: "/images/modern-residence-entrance.jpg",
    beforeImage: "/images/modern-residence-staircase-3.jpg",
    afterImage: "/images/modern-residence-entrance.jpg",
    location: "Dublin, CA",
    duration: "10 weeks",
    teamSize: "7 engineers",
    completedDate: "April 2024",
    client: "Residential Homeowner",
    budget: "$55K",
    details: {
      overview:
        "This foundation drainage repair project solved chronic basement flooding issues that had persisted for over a decade. Our comprehensive approach included exterior waterproofing, drainage system installation, and interior moisture control.",
      challenges: [
        "Chronic basement flooding during winter months",
        "Poor existing drainage around foundation",
        "High water table in the area",
        "Limited access around foundation perimeter",
      ],
      solutions: [
        "Exterior foundation waterproofing membrane",
        "Perimeter drain tile installation",
        "Sump pump system with battery backup",
        "Interior moisture control and ventilation",
      ],
      features: [
        "Complete exterior foundation waterproofing",
        "150 feet of perimeter drain tile",
        "Sump pump with battery backup system",
        "Interior dehumidification system",
        "Landscape grading improvements",
        "10-year waterproofing warranty",
      ],
      specifications: {
        "Waterproofing Area": "800 square feet",
        "Drain Tile Length": "150 linear feet",
        "Sump Pump": "1/2 HP with backup",
        "Membrane Type": "Modified bitumen",
        Grading: "Proper slope away from foundation",
        Warranty: "10 years",
      },
    },
  },
  "slope-stabilization": {
    id: "slope-stabilization",
    title: "Slope Stabilization",
    category: "Earth Retainment",
    description:
      "Comprehensive slope stabilization project using engineered retaining systems and drainage integration.",
    image: "/images/modern-residence-staircase-4.jpg",
    beforeImage: "/images/modern-residence-staircase-3.jpg",
    afterImage: "/images/modern-residence-staircase-4.jpg",
    location: "Castro Valley, CA",
    duration: "14 weeks",
    teamSize: "12 engineers",
    completedDate: "May 2024",
    client: "Municipal Contract",
    budget: "$125K",
    details: {
      overview:
        "This slope stabilization project addressed a critical hillside failure that threatened nearby structures. Our engineered solution combined multiple retaining systems with comprehensive drainage to provide long-term stability.",
      challenges: [
        "Active slope movement threatening structures",
        "Complex geology with multiple soil types",
        "Environmental restrictions and permits",
        "Coordination with municipal requirements",
      ],
      solutions: [
        "Multi-tiered retaining wall system",
        "Soil nailing for additional stability",
        "Comprehensive drainage network",
        "Native vegetation for erosion control",
      ],
      features: [
        "200-foot multi-tiered retaining system",
        "Soil nail reinforcement installation",
        "Integrated drainage collection system",
        "Native plant erosion control",
        "Geotechnical monitoring system",
        "25-year structural warranty",
      ],
      specifications: {
        "Retaining Length": "200 linear feet",
        "Maximum Height": "15 feet",
        "Soil Nails": "48 installed at 6-foot spacing",
        Drainage: "Comprehensive collection system",
        Monitoring: "Automated stability sensors",
        Warranty: "25 years structural",
      },
    },
  },
  "stormwater-management": {
    id: "stormwater-management",
    title: "Stormwater Management System",
    category: "Drainage",
    description:
      "Large-scale stormwater management system designed to handle heavy rainfall and prevent property flooding.",
    image: "/images/modern-residence-dining.jpg",
    beforeImage: "/images/modern-residence-interior-1.jpg",
    afterImage: "/images/modern-residence-dining.jpg",
    location: "Fremont, CA",
    duration: "16 weeks",
    teamSize: "15 engineers",
    completedDate: "June 2024",
    client: "Commercial Property Owner",
    budget: "$185K",
    details: {
      overview:
        "This large-scale stormwater management project created a comprehensive system to handle heavy rainfall and prevent flooding across a commercial property. The system includes detention basins, underground storage, and advanced filtration.",
      challenges: [
        "Large impervious surface area creating runoff",
        "Municipal stormwater regulations compliance",
        "Limited space for traditional detention",
        "Need for water quality treatment",
      ],
      solutions: [
        "Underground detention and storage system",
        "Bioretention areas for water quality",
        "Smart control systems for flow management",
        "Integration with existing infrastructure",
      ],
      features: [
        "50,000-gallon underground detention system",
        "Bioretention gardens for water quality",
        "Smart flow control and monitoring",
        "Permeable paving installation",
        "Native landscaping integration",
        "15-year system warranty",
      ],
      specifications: {
        "Storage Capacity": "50,000 gallons",
        "Bioretention Area": "2,500 square feet",
        "Permeable Paving": "8,000 square feet",
        "Control System": "Automated smart controls",
        Treatment: "Bioretention and filtration",
        Warranty: "15 years",
      },
    },
  },
  "soil-remediation": {
    id: "soil-remediation",
    title: "Contaminated Soil Remediation",
    category: "Remediation",
    description: "Environmental remediation project addressing contaminated soil conditions with engineered solutions.",
    image: "/images/modern-residence-before.jpg",
    beforeImage: "/images/modern-residence-before.jpg",
    afterImage: "/images/modern-residence-after.jpg",
    location: "Hayward, CA",
    duration: "20 weeks",
    teamSize: "18 specialists",
    completedDate: "July 2024",
    client: "Environmental Consulting Firm",
    budget: "$225K",
    details: {
      overview:
        "This environmental remediation project addressed contaminated soil conditions at a former industrial site. Our team implemented advanced remediation techniques to restore the site to residential standards while ensuring environmental compliance.",
      challenges: [
        "Multiple contaminants in soil and groundwater",
        "Strict environmental regulatory requirements",
        "Proximity to residential neighborhoods",
        "Complex geology affecting treatment methods",
      ],
      solutions: [
        "In-situ chemical oxidation treatment",
        "Soil excavation and off-site disposal",
        "Groundwater monitoring and treatment",
        "Long-term monitoring system installation",
      ],
      features: [
        "Treatment of 5,000 cubic yards of soil",
        "In-situ chemical oxidation system",
        "Groundwater monitoring network",
        "Vapor extraction system",
        "Long-term monitoring program",
        "Regulatory compliance certification",
      ],
      specifications: {
        "Soil Volume": "5,000 cubic yards",
        "Treatment Method": "Chemical oxidation",
        "Monitoring Wells": "12 installed",
        "Vapor System": "Soil vapor extraction",
        Compliance: "Residential cleanup standards",
        Monitoring: "5-year program",
      },
    },
  },
  "residential-flooding-solution": {
    id: "residential-flooding-solution",
    title: "Residential Flooding Solution",
    category: "Residential",
    description:
      "Comprehensive flooding solution for residential property including drainage, grading, and waterproofing systems.",
    image: "/images/modern-residence-staircase-1.jpg",
    beforeImage: "/images/modern-residence-before.jpg",
    afterImage: "/images/modern-residence-staircase-1.jpg",
    location: "Union City, CA",
    duration: "12 weeks",
    teamSize: "9 engineers",
    completedDate: "August 2024",
    client: "Residential Homeowner",
    budget: "$75K",
    details: {
      overview:
        "This comprehensive residential flooding solution addressed multiple water intrusion issues affecting a family home. Our integrated approach combined drainage improvements, grading corrections, and waterproofing to provide complete flood protection.",
      challenges: [
        "Multiple sources of water intrusion",
        "Poor site grading directing water toward home",
        "Inadequate existing drainage systems",
        "Basement flooding during heavy rains",
      ],
      solutions: [
        "Complete site regrading for proper drainage",
        "Installation of comprehensive drainage network",
        "Basement waterproofing and sump pump system",
        "Landscape integration with drainage features",
      ],
      features: [
        "Complete site grading and drainage design",
        "400 feet of drainage pipe installation",
        "Basement waterproofing system",
        "Sump pump with backup power",
        "Landscape drainage integration",
        "Comprehensive 7-year warranty",
      ],
      specifications: {
        "Grading Area": "1.5 acres",
        "Drainage Pipe": "400 linear feet",
        Waterproofing: "Full basement perimeter",
        "Sump System": "Dual pump with backup",
        Landscape: "Integrated drainage features",
        Warranty: "7 years comprehensive",
      },
    },
  },
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((id) => ({
    id: id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = projectsData[params.id as keyof typeof projectsData]

  if (!project) {
    return {
      title: "Project Not Found | Solves All Engineering",
    }
  }

  return {
    title: `${project.title} | Solves All Engineering`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectsData[params.id as keyof typeof projectsData]

  if (!project) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/projects">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-200">
              {project.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">{project.description}</p>
          </div>

          {/* Project Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <MapPin className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-sm text-gray-600">{project.location}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Clock className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-gray-600">{project.duration}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Users className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Team Size</h3>
                <p className="text-sm text-gray-600">{project.teamSize}</p>
              </ModernCardContent>
            </ModernCard>
            <ModernCard className="text-center">
              <ModernCardContent className="p-6">
                <Calendar className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Completed</h3>
                <p className="text-sm text-gray-600">{project.completedDate}</p>
              </ModernCardContent>
            </ModernCard>
          </div>
        </div>
      </section>

      {/* Before/After Slider */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Project Transformation</h2>
              <p className="text-lg text-gray-700">See the dramatic transformation from start to finish</p>
            </div>
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              beforeAlt={`${project.title} before construction`}
              afterAlt={`${project.title} after completion`}
              className="shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <ModernCard>
                  <ModernCardHeader>
                    <ModernCardTitle>Project Overview</ModernCardTitle>
                  </ModernCardHeader>
                  <ModernCardContent>
                    <p className="text-gray-700 leading-relaxed">{project.details.overview}</p>
                  </ModernCardContent>
                </ModernCard>

                {/* Challenges & Solutions */}
                <div className="grid md:grid-cols-2 gap-8">
                  <ModernCard>
                    <ModernCardHeader>
                      <ModernCardTitle>Challenges</ModernCardTitle>
                    </ModernCardHeader>
                    <ModernCardContent>
                      <ul className="space-y-3">
                        {project.details.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </ModernCardContent>
                  </ModernCard>

                  <ModernCard>
                    <ModernCardHeader>
                      <ModernCardTitle>Solutions</ModernCardTitle>
                    </ModernCardHeader>
                    <ModernCardContent>
                      <ul className="space-y-3">
                        {project.details.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </ModernCardContent>
                  </ModernCard>
                </div>

                {/* Features */}
                <ModernCard>
                  <ModernCardHeader>
                    <ModernCardTitle>Key Features</ModernCardTitle>
                  </ModernCardHeader>
                  <ModernCardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {project.details.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </ModernCardContent>
                </ModernCard>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info */}
                <ModernCard>
                  <ModernCardHeader>
                    <ModernCardTitle>Project Information</ModernCardTitle>
                  </ModernCardHeader>
                  <ModernCardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Client</h4>
                        <p className="text-sm text-gray-600">{project.client}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Budget</h4>
                        <p className="text-sm text-gray-600">{project.budget}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Location</h4>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Duration</h4>
                        <p className="text-sm text-gray-600">{project.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">Team Size</h4>
                        <p className="text-sm text-gray-600">{project.teamSize}</p>
                      </div>
                    </div>
                  </ModernCardContent>
                </ModernCard>

                {/* Specifications */}
                <ModernCard>
                  <ModernCardHeader>
                    <ModernCardTitle>Specifications</ModernCardTitle>
                  </ModernCardHeader>
                  <ModernCardContent>
                    <div className="space-y-3">
                      {Object.entries(project.details.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-900">{key}:</span>
                          <span className="text-sm text-gray-600 text-right ml-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </ModernCardContent>
                </ModernCard>

                {/* CTA */}
                <ModernCard className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                  <ModernCardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Interested in Similar Work?</h3>
                    <p className="text-sm text-gray-600 mb-4">Contact us to discuss your project requirements</p>
                    <Link href="/contact">
                      <Button className="bg-amber-500 hover:bg-amber-600 text-white">Get in Touch</Button>
                    </Link>
                  </ModernCardContent>
                </ModernCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
