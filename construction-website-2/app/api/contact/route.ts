import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createEmailProvider, generateContactEmailTemplate } from '@/lib/email'
import { contactFormRateLimit, getClientIP } from '@/lib/rate-limit'

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required').max(20, 'Phone number is too long'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body)
    
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = contactFormRateLimit.check(clientIP)
    
    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime)
      return NextResponse.json(
        { 
          success: false, 
          message: `Too many requests. Please try again after ${resetDate.toLocaleTimeString()}.`,
          rateLimited: true,
          resetTime: rateLimitResult.resetTime
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': process.env.RATE_LIMIT_MAX_REQUESTS || '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      )
    }
    
    // Send email notification
    const emailSent = await sendContactEmail(validatedData)
    
    if (!emailSent) {
      throw new Error('Failed to send email')
    }
    
    // Log successful submission
    console.log('Contact form submitted successfully:', {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      timestamp: new Date().toISOString(),
    })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you soon.' 
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': process.env.RATE_LIMIT_MAX_REQUESTS || '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        }
      }
    )
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your form data',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}

async function sendContactEmail(data: z.infer<typeof contactFormSchema>) {
  try {
    const emailProvider = createEmailProvider()
    const { html, text } = generateContactEmailTemplate(data)
    
    const emailData = {
      to: process.env.CONTACT_EMAIL || 'Matt@solvesall.org',
      from: process.env.FROM_EMAIL || 'noreply@solvesall.org',
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      html,
      text,
    }
    
    return await emailProvider.send(emailData)
  } catch (error) {
    console.error('Email service error:', error)
    return false
  }
}