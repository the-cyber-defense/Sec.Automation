// Analytics utility for tracking conversions and user interactions
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}

// Google Analytics 4 Event Tracking
export const trackGAEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Facebook Pixel Event Tracking
export const trackFacebookEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters)
  }
}

// Custom Analytics Event Tracking
export const trackEvent = (eventName: string, data: Record<string, any> = {}) => {
  // Track in Google Analytics
  trackGAEvent(eventName, data)
  
  // Track in Facebook Pixel
  trackFacebookEvent(eventName, data)
  
  // Custom event tracking for internal analytics
  if (typeof window !== 'undefined') {
    const customEvent = new CustomEvent('analytics-event', {
      detail: { eventName, data, timestamp: new Date().toISOString() }
    })
    window.dispatchEvent(customEvent)
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, data)
  }
}

// Conversion Tracking Functions
export const trackContactFormSubmission = (formData: {
  projectType: string
  timeline: string
  budget: string
  propertyType: string
  urgency?: string
}) => {
  trackEvent('contact_form_submit', {
    event_category: 'lead_generation',
    event_label: 'contact_form',
    project_type: formData.projectType,
    timeline: formData.timeline,
    budget_range: formData.budget,
    property_type: formData.propertyType,
    urgency: formData.urgency || 'not_specified',
    timestamp: new Date().toISOString()
  })
}

export const trackServicePageView = (serviceName: string) => {
  trackEvent('service_page_view', {
    event_category: 'engagement',
    event_label: 'service_page',
    service_name: serviceName,
    timestamp: new Date().toISOString()
  })
}

export const trackProjectPageView = (projectId: string, projectName: string) => {
  trackEvent('project_page_view', {
    event_category: 'engagement',
    event_label: 'project_page',
    project_id: projectId,
    project_name: projectName,
    timestamp: new Date().toISOString()
  })
}

export const trackPhoneCall = (phoneNumber: string) => {
  trackEvent('phone_call', {
    event_category: 'lead_generation',
    event_label: 'phone_call',
    phone_number: phoneNumber,
    timestamp: new Date().toISOString()
  })
}

export const trackEmailClick = (emailAddress: string) => {
  trackEvent('email_click', {
    event_category: 'lead_generation',
    event_label: 'email_click',
    email_address: emailAddress,
    timestamp: new Date().toISOString()
  })
}

export const trackMapClick = (address: string) => {
  trackEvent('map_click', {
    event_category: 'engagement',
    event_label: 'map_click',
    address: address,
    timestamp: new Date().toISOString()
  })
}

export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: 'scroll_depth',
    scroll_percentage: percentage,
    timestamp: new Date().toISOString()
  })
}

export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', {
    event_category: 'engagement',
    event_label: 'time_on_page',
    time_seconds: seconds,
    timestamp: new Date().toISOString()
  })
}

// Lead Quality Scoring
export const calculateLeadScore = (formData: {
  projectType: string
  timeline: string
  budget: string
  propertyType: string
  urgency?: string
  address?: string
}): number => {
  let score = 0
  
  // Project type scoring
  const projectTypeScores: Record<string, number> = {
    'emergency': 100,
    'flooding': 90,
    'drainage': 85,
    'retaining-wall': 80,
    'concrete-masonry': 75,
    'landscaping': 70,
    'fencing': 65,
    'decks': 60,
    'excavation': 55,
    'remediation': 50,
    'stormwater': 45,
    'other': 30
  }
  
  score += projectTypeScores[formData.projectType] || 0
  
  // Timeline scoring
  const timelineScores: Record<string, number> = {
    'immediate': 100,
    '1-3-months': 80,
    '3-6-months': 60,
    '6-12-months': 40,
    'flexible': 20
  }
  
  score += timelineScores[formData.timeline] || 0
  
  // Budget scoring
  const budgetScores: Record<string, number> = {
    'over-100k': 100,
    '50k-100k': 90,
    '15k-50k': 80,
    '5k-15k': 70,
    'under-5k': 60,
    'to-be-determined': 50
  }
  
  score += budgetScores[formData.budget] || 0
  
  // Property type scoring
  const propertyTypeScores: Record<string, number> = {
    'commercial': 100,
    'industrial': 90,
    'municipal': 85,
    'residential': 70
  }
  
  score += propertyTypeScores[formData.propertyType] || 0
  
  // Urgency scoring
  if (formData.urgency) {
    const urgencyScores: Record<string, number> = {
      'emergency': 100,
      'urgent': 80,
      'normal': 60,
      'low': 40
    }
    score += urgencyScores[formData.urgency] || 0
  }
  
  // Address scoring (local leads get higher scores)
  if (formData.address) {
    const localKeywords = ['livermore', 'pleasanton', 'dublin', 'san ramon', 'danville', 'tracy', 'manteca']
    const hasLocalKeyword = localKeywords.some(keyword => 
      formData.address!.toLowerCase().includes(keyword)
    )
    if (hasLocalKeyword) {
      score += 20
    }
  }
  
  return Math.min(score, 500) // Cap at 500
}

// Export lead scoring for use in contact form
export { calculateLeadScore as getLeadScore }
