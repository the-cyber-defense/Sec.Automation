import { z } from 'zod'

// Email data schema
export const emailSchema = z.object({
  to: z.string().email(),
  from: z.string().email(),
  replyTo: z.string().email().optional(),
  subject: z.string().min(1),
  html: z.string().min(1),
  text: z.string().min(1),
})

export type EmailData = z.infer<typeof emailSchema>

export interface EmailProvider {
  send(data: EmailData): Promise<boolean>
}

// Resend Provider (recommended for production)
export class ResendProvider implements EmailProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(data: EmailData): Promise<boolean> {
    try {
      // In production, you would use the Resend SDK:
      // const { Resend } = require('resend')
      // const resend = new Resend(this.apiKey)
      // await resend.emails.send(data)
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error('Resend API error:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Resend send error:', error)
      return false
    }
  }
}

// SendGrid Provider (alternative)
export class SendGridProvider implements EmailProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(data: EmailData): Promise<boolean> {
    try {
      const sgData = {
        personalizations: [
          {
            to: [{ email: data.to }],
            subject: data.subject,
          },
        ],
        from: { email: data.from },
        reply_to: data.replyTo ? { email: data.replyTo } : undefined,
        content: [
          {
            type: 'text/plain',
            value: data.text,
          },
          {
            type: 'text/html',
            value: data.html,
          },
        ],
      }

      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sgData),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error('SendGrid API error:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('SendGrid send error:', error)
      return false
    }
  }
}

// Console Provider (for development)
export class ConsoleProvider implements EmailProvider {
  async send(data: EmailData): Promise<boolean> {
    console.log('\n📧 ===== EMAIL SENT IN DEVELOPMENT =====')
    console.log('To:', data.to)
    console.log('From:', data.from)
    if (data.replyTo) console.log('Reply-To:', data.replyTo)
    console.log('Subject:', data.subject)
    console.log('\n--- Text Content ---')
    console.log(data.text)
    console.log('\n--- HTML Content ---')
    console.log(data.html)
    console.log('=====================================\n')
    return true
  }
}

// Email service factory
export function createEmailProvider(): EmailProvider {
  if (process.env.NODE_ENV === 'development') {
    return new ConsoleProvider()
  }

  // Check for Resend API key first (recommended)
  if (process.env.RESEND_API_KEY) {
    return new ResendProvider(process.env.RESEND_API_KEY)
  }

  // Fall back to SendGrid
  if (process.env.SENDGRID_API_KEY) {
    return new SendGridProvider(process.env.SENDGRID_API_KEY)
  }

  // If no email provider is configured, use console for now
  console.warn('No email provider configured. Using console output.')
  return new ConsoleProvider()
}

// Email template generator
export function generateContactEmailTemplate(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  projectType?: string
  timeline?: string
  budget?: string
  propertyType?: string
  address?: string
  urgency?: string
}): { html: string; text: string } {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Solves All Engineering</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
        
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Information</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #475569; display: inline-block; width: 80px;">Name:</strong>
            <span style="color: #1e293b;">${data.name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #475569; display: inline-block; width: 80px;">Email:</strong>
            <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #475569; display: inline-block; width: 80px;">Phone:</strong>
            <a href="tel:${data.phone.replace(/\D/g, '')}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
          </div>
          
          <div>
            <strong style="color: #475569; display: inline-block; width: 80px;">Subject:</strong>
            <span style="color: #1e293b;">${data.subject}</span>
          </div>
        </div>
        
        ${data.projectType ? `
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Project Details</h2>
          
          ${data.projectType ? `<div style="margin-bottom: 15px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Project Type:</strong>
            <span style="color: #1e293b;">${data.projectType}</span>
          </div>` : ''}
          
          ${data.timeline ? `<div style="margin-bottom: 15px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Timeline:</strong>
            <span style="color: #1e293b;">${data.timeline}</span>
          </div>` : ''}
          
          ${data.budget ? `<div style="margin-bottom: 15px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Budget Range:</strong>
            <span style="color: #1e293b;">${data.budget}</span>
          </div>` : ''}
          
          ${data.propertyType ? `<div style="margin-bottom: 15px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Property Type:</strong>
            <span style="color: #1e293b;">${data.propertyType}</span>
          </div>` : ''}
          
          ${data.address ? `<div style="margin-bottom: 15px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Address:</strong>
            <span style="color: #1e293b;">${data.address}</span>
          </div>` : ''}
          
          ${data.urgency ? `<div>
            <strong style="color: #475569; display: inline-block; width: 120px;">Urgency:</strong>
            <span style="color: #1e293b;">${data.urgency}</span>
          </div>` : ''}
        </div>
        ` : ''}
        
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Message</h2>
          <div style="background: #f1f5f9; padding: 20px; border-radius: 6px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #334155;">${data.message}</p>
          </div>
        </div>
        
        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
          <p style="margin: 0; color: #1e40af; font-size: 14px;">
            📅 Received: ${timestamp} (Pacific Time)<br>
            🌐 Source: Solves All Engineering Contact Form
          </p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #64748b; font-size: 13px;">
            This email was automatically generated from your website contact form.
          </p>
        </div>
        
      </div>
      
    </body>
    </html>
  `

  const text = `
NEW CONTACT FORM SUBMISSION
Solves All Engineering

CONTACT INFORMATION
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}

${data.projectType ? `PROJECT DETAILS
Project Type: ${data.projectType}
${data.timeline ? `Timeline: ${data.timeline}` : ''}
${data.budget ? `Budget Range: ${data.budget}` : ''}
${data.propertyType ? `Property Type: ${data.propertyType}` : ''}
${data.address ? `Address: ${data.address}` : ''}
${data.urgency ? `Urgency: ${data.urgency}` : ''}

` : ''}MESSAGE
${data.message}

---
Received: ${timestamp} (Pacific Time)
Source: Solves All Engineering Contact Form

This email was automatically generated from your website contact form.
  `

  return { html: html.trim(), text: text.trim() }
}