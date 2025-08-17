# Contact Form Backend Setup

This document explains how to configure and use the contact form backend for the Solves All Engineering website.

## Features

- ✅ **Form Validation**: Client and server-side validation using Zod
- ✅ **Email Notifications**: Professional HTML email templates
- ✅ **Rate Limiting**: Prevents spam with configurable limits
- ✅ **Multiple Email Providers**: Support for Resend, SendGrid, and development console
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages
- ✅ **Responsive UI**: Modern form with loading states and validation feedback

## Setup Instructions

### 1. Environment Variables

Copy `.env.local.example` to `.env.local` and configure your settings:

```bash
cp .env.local.example .env.local
```

#### Required Variables
```env
CONTACT_EMAIL=Matt@solvesall.org
FROM_EMAIL=noreply@solvesall.org
```

#### Email Provider (choose one)

**Option A: Resend (Recommended)**
```env
RESEND_API_KEY=your_resend_api_key_here
```

**Option B: SendGrid**
```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

#### Optional Configuration
```env
# Rate limiting (defaults shown)
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes

NODE_ENV=production  # Set for production
```

### 2. Email Provider Setup

#### Resend (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Add your domain and verify DNS
3. Generate an API key
4. Add to `.env.local` as `RESEND_API_KEY`

#### SendGrid (Alternative)
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Verify sender identity
3. Generate an API key
4. Add to `.env.local` as `SENDGRID_API_KEY`

### 3. Development vs Production

**Development Mode:**
- Emails are logged to console
- Rate limiting uses in-memory store
- Detailed error logging

**Production Mode:**
- Emails sent via configured provider
- Rate limiting should use Redis/database in high-traffic scenarios
- Minimal error exposure to clients

## API Endpoints

### POST /api/contact

Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "phone": "(123) 456-7890",
  "subject": "Project Inquiry",
  "message": "I need help with drainage solutions..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you soon."
}
```

**Error Responses:**

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Please check your form data",
  "errors": [
    {
      "path": ["email"],
      "message": "Invalid email address"
    }
  ]
}
```

**Rate Limited (429):**
```json
{
  "success": false,
  "message": "Too many requests. Please try again after 3:45 PM.",
  "rateLimited": true,
  "resetTime": 1234567890
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Something went wrong. Please try again or contact us directly."
}
```

## Rate Limiting

Default limits:
- **5 requests** per IP address
- **15 minute** window
- In-memory storage (development)

### Production Considerations

For production with multiple servers, consider:

1. **Redis-based rate limiting:**
```typescript
// lib/rate-limit-redis.ts
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export const redisRateLimit = {
  async check(key: string, max: number, windowMs: number) {
    // Implementation using Redis
  }
}
```

2. **Database-based rate limiting:**
```sql
CREATE TABLE rate_limits (
  id VARCHAR(255) PRIMARY KEY,
  count INTEGER DEFAULT 1,
  reset_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Email Templates

The system generates professional HTML emails with:
- Company branding
- Structured contact information
- Readable message formatting
- Timestamp and source tracking
- Mobile-responsive design

### Customizing Templates

Edit `lib/email.ts` function `generateContactEmailTemplate()` to modify:
- Email styling
- Content structure
- Additional fields
- Branding elements

## Security Features

1. **Input Validation**: All fields validated with Zod schemas
2. **Rate Limiting**: Prevents automated spam
3. **XSS Prevention**: All user input properly escaped
4. **CSRF Protection**: Built into Next.js API routes
5. **Error Sanitization**: No sensitive data in client responses

## Monitoring

### Development
- Form submissions logged to console
- Email content displayed in terminal
- Detailed error information

### Production
- Successful submissions logged with timestamp
- Failed submissions logged with error details
- Rate limit violations tracked by IP

### Recommended Monitoring Setup
```typescript
// Add to your logging service
console.log('Contact form metrics:', {
  submissionsToday: count,
  rateLimitHits: hits,
  emailFailures: failures
})
```

## Testing

### Manual Testing
1. Fill out the contact form
2. Check browser network tab for API response
3. Verify email delivery (or console output in dev)
4. Test rate limiting by submitting multiple times

### Automated Testing
```typescript
// Example test
import { POST } from '@/app/api/contact/route'

test('contact form validation', async () => {
  const request = new Request('http://localhost:3000/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      subject: 'Test',
      message: 'Test message content'
    })
  })
  
  const response = await POST(request)
  const data = await response.json()
  
  expect(data.success).toBe(true)
})
```

## Troubleshooting

### Common Issues

**Emails not sending:**
- Check API key configuration
- Verify domain setup with email provider
- Check environment variables

**Rate limiting too strict:**
- Adjust `RATE_LIMIT_MAX_REQUESTS` and `RATE_LIMIT_WINDOW_MS`
- Consider implementing user-specific rate limits

**Form validation errors:**
- Check Zod schema in `app/api/contact/route.ts`
- Verify client-side validation matches server-side

**Build failures:**
- Run `pnpm build` to check for TypeScript errors
- Ensure all dependencies are installed

### Getting Help

For technical support with the contact form:
1. Check browser console for client-side errors
2. Check server logs for API errors
3. Verify email provider status
4. Test with minimal form data

## File Structure

```
app/
├── api/contact/route.ts          # Main API endpoint
├── contact/page.tsx              # Contact page with form
components/
├── contact-form.tsx              # Interactive form component
lib/
├── email.ts                      # Email service providers
├── rate-limit.ts                 # Rate limiting utilities
.env.local.example                # Environment template
CONTACT_FORM_SETUP.md            # This documentation
```

## Future Enhancements

Potential improvements:
- Database integration for form submissions
- Admin dashboard for viewing messages
- Auto-responder emails to users
- Integration with CRM systems
- Advanced analytics and reporting
- Webhook notifications
- File upload support