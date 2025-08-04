// SolvesAll Engineering Website Data

export const companyInfo = {
  name: "Solves All Engineering",
  tagline: "East Bay's No.1 choice for deck and pavers, retaining wall, grading and drainage.",
  mission: "Protecting your property while preserving the environment.",
  founderBio: "Matt Mahoney has a degree in Environmental Science and decades of construction and storm-water expertise.",
  serviceArea: [
    "Danville", 
    "Orinda", 
    "Lafayette", 
    "Pleasanton", 
    "San Ramon", 
    "Alamo", 
    "Walnut Creek", 
    "Moraga"
  ],
  contact: {
    phone: "(925) 899-8123",
    email: "Matt@solvesall.org",
    address: "Serving the East Bay Area, California"
  }
}

export const services = {
  drainage: {
    title: "Drainage Solutions",
    icon: "droplets",
    description: "Evaluation and custom-engineered solutions for French drains, foundation drains, sump pumps and grading.",
    benefits: "Prevent water intrusion, protect basements, eliminate pooling, and ensure long-term performance.",
    subServices: [
      "French drains",
      "Trench/catch basins", 
      "Sump pump installation",
      "Foundation waterproofing",
      "Crawl space encapsulation",
      "Gutter/downspout extensions"
    ],
    heroImage: "/images/drainage-hero.jpg",
    process: [
      {
        step: "Site Assessment",
        description: "Comprehensive evaluation of drainage issues and water flow patterns"
      },
      {
        step: "Custom Design", 
        description: "Engineering solutions tailored to your specific property needs"
      },
      {
        step: "Professional Installation",
        description: "Expert installation using quality materials and proven techniques"
      },
      {
        step: "Performance Testing",
        description: "Thorough testing to ensure optimal drainage performance"
      }
    ]
  },
  retainingWalls: {
    title: "Retaining Walls",
    icon: "building-2",
    description: "Design and construction of retaining walls, cinder block walls, and decorative walls with materials like stone, concrete, timber.",
    highlights: "Engineering-driven design, custom solutions for slopes, built for strength and aesthetics.",
    materials: ["Natural Stone", "Concrete Block", "Timber", "Engineered Solutions"],
    process: [
      "Site assessment",
      "Engineering & design", 
      "Permitting",
      "Construction",
      "Final walkthrough"
    ],
    heroImage: "/images/retaining-wall-hero.jpg"
  },
  pavers: {
    title: "Decks & Pavers",
    icon: "square-stack",
    description: "Installation of pavers for patios, porches, and walkways. Custom deck construction and outdoor living spaces.",
    applications: ["Patios", "Walkways", "Driveways", "Pool Decks", "Outdoor Living Areas"],
    materials: ["Natural Stone Pavers", "Concrete Pavers", "Composite Decking", "Hardwood Decking"],
    callToAction: "Contact us for a free quote.",
    heroImage: "/images/pavers-hero.jpg"
  },
  grading: {
    title: "Grading & Excavation", 
    icon: "mountain",
    description: "Professional grading services to improve drainage, create level surfaces, and prepare sites for construction.",
    services: ["Site Preparation", "Slope Stabilization", "Drainage Grading", "Excavation Services"],
    heroImage: "/images/grading-hero.jpg"
  }
}

export const projects = [
  {
    id: "deck-paver-piedmont",
    title: "Deck and Paver in Piedmont, CA",
    category: "Pavers & Decking",
    problem: "Yard abandoned with weeds; a sump pump pit needed covering.",
    solution: "Installed a patio deck over the pit and added pavers.",
    result: "Beautified yard, improved quality of life.",
    beforeImage: "/images/project-1-before.jpg",
    afterImage: "/images/project-1-after.jpg",
    gallery: [
      "/images/project-1-1.jpg",
      "/images/project-1-2.jpg", 
      "/images/project-1-3.jpg"
    ],
    duration: "2 weeks",
    scope: "Custom deck installation, paver patio, landscaping integration"
  },
  {
    id: "drainage-danville",
    title: "Drainage Solution in Danville, CA", 
    category: "Drainage",
    problem: "Flooding and pooling in a drainage ditch.",
    solution: "Improved grade to 1% after city approval and excavated dirt.",
    result: "Water no longer backs up, ditch stays clear.",
    beforeImage: "/images/project-2-before.jpg",
    afterImage: "/images/project-2-after.jpg",
    gallery: [
      "/images/project-2-1.jpg",
      "/images/project-2-2.jpg"
    ],
    duration: "1 week", 
    scope: "Drainage assessment, grading improvement, permit coordination"
  },
  {
    id: "retaining-wall-antioch",
    title: "Retaining Wall in Antioch, CA",
    category: "Retaining Walls", 
    problem: "Sloped side yard with limited space.",
    solution: "Excavated hillside and built a new retaining wall.",
    result: "Created 300 sq. ft. of usable space for a shed and gardening.",
    beforeImage: "/images/project-3-before.jpg",
    afterImage: "/images/project-3-after.jpg",
    gallery: [
      "/images/project-3-1.jpg",
      "/images/project-3-2.jpg",
      "/images/project-3-3.jpg",
      "/images/project-3-4.jpg"
    ],
    duration: "3 weeks",
    scope: "Excavation, engineered retaining wall, site preparation"
  },
  {
    id: "hillside-drainage-system",
    title: "Comprehensive Hillside Drainage",
    category: "Drainage",
    problem: "Severe erosion and water damage on steep hillside property.",
    solution: "Multi-tier drainage system with French drains and graded channels.",
    result: "Eliminated erosion, protected foundation, enhanced property value.",
    beforeImage: "/images/project-4-before.jpg", 
    afterImage: "/images/project-4-after.jpg",
    gallery: [
      "/images/project-4-1.jpg",
      "/images/project-4-2.jpg"
    ],
    duration: "4 weeks",
    scope: "Complex drainage engineering, erosion control, landscape restoration"
  }
]

export const testimonials = [
  {
    id: 1,
    name: "Jamie",
    location: "Morgan Hill",
    rating: 5,
    feedback: "Fantastic job surveying and ensuring proper drainage, with attentive follow-up during storms.",
    service: "Drainage Solutions",
    avatar: "/images/testimonial-1.jpg"
  },
  {
    id: 2, 
    name: "Lisa",
    location: "Livermore",
    rating: 5,
    feedback: "Installed a deep French drain between two storms; professional, communicative, fair pricing.",
    service: "French Drain Installation",
    avatar: "/images/testimonial-2.jpg"
  },
  {
    id: 3,
    name: "Michael",
    location: "Danville", 
    rating: 5,
    feedback: "The retaining wall transformed our unusable slope into beautiful, functional space. Outstanding craftsmanship!",
    service: "Retaining Wall Construction",
    avatar: "/images/testimonial-3.jpg"
  },
  {
    id: 4,
    name: "Sarah",
    location: "Walnut Creek",
    rating: 5, 
    feedback: "Matt's expertise in environmental science really shows. The drainage solution hasn't failed us through multiple storm seasons.",
    service: "Drainage Engineering",
    avatar: "/images/testimonial-4.jpg"
  },
  {
    id: 5,
    name: "Robert",
    location: "Lafayette",
    rating: 5,
    feedback: "Professional from start to finish. The paver patio exceeded our expectations and the cleanup was immaculate.",
    service: "Paver Installation", 
    avatar: "/images/testimonial-5.jpg"
  }
]

export const whyChooseUs = [
  {
    icon: "award",
    title: "Environmental Expertise",
    description: "Led by Matt Mahoney with Environmental Science background, ensuring sustainable solutions."
  },
  {
    icon: "shield-check", 
    title: "East Bay Specialists",
    description: "Deep knowledge of local soil conditions, weather patterns, and permit requirements."
  },
  {
    icon: "clock",
    title: "Proven Track Record",
    description: "Decades of experience with hundreds of successful projects across the East Bay."
  },
  {
    icon: "users",
    title: "Customer-Focused",
    description: "Attentive communication, fair pricing, and follow-up support during storm seasons."
  },
  {
    icon: "tools",
    title: "Quality Craftsmanship", 
    description: "Engineering-driven solutions built for longevity with premium materials."
  },
  {
    icon: "map-pin",
    title: "Local & Licensed",
    description: "Fully licensed contractor serving Danville, Orinda, Lafayette, and surrounding areas."
  }
]

export const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "Free on-site assessment to understand your needs and evaluate the project scope."
  },
  {
    number: "02", 
    title: "Custom Design & Quote",
    description: "Detailed engineering analysis with transparent pricing and project timeline."
  },
  {
    number: "03",
    title: "Permits & Planning", 
    description: "Handle all necessary permits and coordinate with local authorities as needed."
  },
  {
    number: "04",
    title: "Professional Installation",
    description: "Expert construction using quality materials with minimal disruption to your property."
  },
  {
    number: "05",
    title: "Quality Assurance",
    description: "Thorough inspection and testing to ensure optimal performance and your satisfaction."
  }
]