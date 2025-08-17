"use client"

import { useState } from 'react'
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { trackContactFormSubmission, getLeadScore } from '@/lib/analytics'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  projectType: string
  timeline: string
  budget: string
  propertyType: string
  address: string
  urgency: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  projectType?: string
  timeline?: string
  budget?: string
  propertyType?: string
  address?: string
  urgency?: string
  general?: string
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: '',
    timeline: '',
    budget: '',
    propertyType: '',
    address: '',
    urgency: '',
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name is too long'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.length > 200) {
      newErrors.subject = 'Subject is too long'
    }

    // Project Type validation
    if (!formData.projectType.trim()) {
      newErrors.projectType = 'Project type is required'
    }

    // Timeline validation
    if (!formData.timeline.trim()) {
      newErrors.timeline = 'Timeline is required'
    }

    // Budget validation
    if (!formData.budget.trim()) {
      newErrors.budget = 'Budget range is required'
    }

    // Property Type validation
    if (!formData.propertyType.trim()) {
      newErrors.propertyType = 'Property type is required'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message is too long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setSubmissionState('submitting')
    setErrors({})

    try {
      // Track form submission analytics
      trackContactFormSubmission({
        projectType: formData.projectType,
        timeline: formData.timeline,
        budget: formData.budget,
        propertyType: formData.propertyType,
        urgency: formData.urgency
      })

      // Calculate lead score
      const leadScore = getLeadScore({
        projectType: formData.projectType,
        timeline: formData.timeline,
        budget: formData.budget,
        propertyType: formData.propertyType,
        urgency: formData.urgency,
        address: formData.address
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, leadScore }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmissionState('success')
        setSuccessMessage(result.message)
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          projectType: '',
          timeline: '',
          budget: '',
          propertyType: '',
          address: '',
          urgency: '',
        })
      } else {
        setSubmissionState('error')
        if (result.errors) {
          // Handle validation errors from server
          const serverErrors: FormErrors = {}
          result.errors.forEach((error: any) => {
            serverErrors[error.path[0] as keyof FormErrors] = error.message
          })
          setErrors(serverErrors)
        } else {
          setErrors({ general: result.message || 'Something went wrong. Please try again.' })
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmissionState('error')
      setErrors({ general: 'Network error. Please check your connection and try again.' })
    }
  }

  const resetForm = () => {
    setSubmissionState('idle')
    setErrors({})
    setSuccessMessage('')
  }

  if (submissionState === 'success') {
    return (
      <div className="bg-card text-card-foreground p-10 rounded-2xl shadow-sm border border-border">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4 text-green-700">Message Sent Successfully!</h3>
          <p className="text-muted-foreground mb-6">{successMessage}</p>
          <Button onClick={resetForm} className="bg-blue-500 hover:bg-blue-600">
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card text-card-foreground p-10 rounded-2xl shadow-sm border border-border">
      <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
      
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{errors.general}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
              errors.name ? "border-red-300 focus:ring-red-500" : "border-input"
            )}
            placeholder="John Doe"
            disabled={submissionState === 'submitting'}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
              errors.email ? "border-red-300 focus:ring-red-500" : "border-input"
            )}
            placeholder="your.email@example.com"
            disabled={submissionState === 'submitting'}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={cn(
            "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
            errors.phone ? "border-red-300 focus:ring-red-500" : "border-input"
          )}
          placeholder="(123) 456-7890"
          disabled={submissionState === 'submitting'}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={cn(
            "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
            errors.subject ? "border-red-300 focus:ring-red-500" : "border-input"
          )}
          placeholder="Project Inquiry"
          disabled={submissionState === 'submitting'}
        />
        {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
      </div>

      {/* Project Details Section */}
      <div className="mb-6 p-6 bg-muted/30 rounded-lg border border-border">
        <h4 className="text-lg font-semibold mb-4 text-foreground">Project Details</h4>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
              Project Type <span className="text-red-500">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                errors.projectType ? "border-red-300 focus:ring-red-500" : "border-input"
              )}
              disabled={submissionState === 'submitting'}
            >
              <option value="">Select project type</option>
              <option value="drainage">Drainage Solutions</option>
              <option value="retaining-wall">Retaining Walls</option>
              <option value="concrete-masonry">Concrete & Masonry</option>
              <option value="landscaping">Landscaping</option>
              <option value="fencing">Fencing</option>
              <option value="decks">Decks & Patios</option>
              <option value="excavation">Excavation & Grading</option>
              <option value="remediation">Environmental Remediation</option>
              <option value="stormwater">Stormwater Management</option>
              <option value="flooding">Flooding Solutions</option>
              <option value="emergency">Emergency Services</option>
              <option value="other">Other</option>
            </select>
            {errors.projectType && <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>}
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-2">
              Timeline <span className="text-red-500">*</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                errors.timeline ? "border-red-300 focus:ring-red-500" : "border-input"
              )}
              disabled={submissionState === 'submitting'}
            >
              <option value="">Select timeline</option>
              <option value="immediate">Immediate (Emergency)</option>
              <option value="1-3-months">1-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-12-months">6-12 months</option>
              <option value="flexible">Flexible</option>
            </select>
            {errors.timeline && <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
              Budget Range <span className="text-red-500">*</span>
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                errors.budget ? "border-red-300 focus:ring-red-500" : "border-input"
              )}
              disabled={submissionState === 'submitting'}
            >
              <option value="">Select budget range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-15k">$5,000 - $15,000</option>
              <option value="15k-50k">$15,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="over-100k">Over $100,000</option>
              <option value="to-be-determined">To be determined</option>
            </select>
            {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
          </div>

          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-foreground mb-2">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                errors.propertyType ? "border-red-300 focus:ring-red-500" : "border-input"
              )}
              disabled={submissionState === 'submitting'}
            >
              <option value="">Select property type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="municipal">Municipal/Government</option>
            </select>
            {errors.propertyType && <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
              Project Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                errors.address ? "border-red-300 focus:ring-red-500" : "border-input"
              )}
              placeholder="123 Main St, City, CA 94550"
              disabled={submissionState === 'submitting'}
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-foreground mb-2">
              Urgency Level
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                errors.urgency ? "border-red-300 focus:ring-red-500" : "border-input"
              )}
              disabled={submissionState === 'submitting'}
            >
              <option value="">Select urgency</option>
              <option value="emergency">Emergency (24-48 hours)</option>
              <option value="urgent">Urgent (1-2 weeks)</option>
              <option value="normal">Normal (1-2 months)</option>
              <option value="low">Low (Flexible timeline)</option>
            </select>
            {errors.urgency && <p className="mt-1 text-sm text-red-600">{errors.urgency}</p>}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          className={cn(
            "w-full px-4 py-3 border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical",
            errors.message ? "border-red-300 focus:ring-red-500" : "border-input"
          )}
          placeholder="Tell us about your project..."
          disabled={submissionState === 'submitting'}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <Button 
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={submissionState === 'submitting'}
      >
        {submissionState === 'submitting' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}