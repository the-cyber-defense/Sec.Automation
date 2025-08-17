// Simple in-memory rate limiting
// In production, you should use Redis or a database for persistence

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export interface RateLimitOptions {
  maxRequests: number
  windowMs: number
  keyGenerator?: (identifier: string) => string
}

export function rateLimit(options: RateLimitOptions) {
  const {
    maxRequests = 5,
    windowMs = 15 * 60 * 1000, // 15 minutes
    keyGenerator = (id: string) => id
  } = options

  return {
    check: (identifier: string): { allowed: boolean; remaining: number; resetTime: number } => {
      const key = keyGenerator(identifier)
      const now = Date.now()
      
      // Clean up expired entries
      for (const [k, entry] of rateLimitStore.entries()) {
        if (entry.resetTime <= now) {
          rateLimitStore.delete(k)
        }
      }
      
      let entry = rateLimitStore.get(key)
      
      if (!entry || entry.resetTime <= now) {
        // Create new entry or reset expired one
        entry = {
          count: 1,
          resetTime: now + windowMs
        }
        rateLimitStore.set(key, entry)
        
        return {
          allowed: true,
          remaining: maxRequests - 1,
          resetTime: entry.resetTime
        }
      }
      
      if (entry.count >= maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          resetTime: entry.resetTime
        }
      }
      
      entry.count++
      
      return {
        allowed: true,
        remaining: maxRequests - entry.count,
        resetTime: entry.resetTime
      }
    },
    
    reset: (identifier: string): void => {
      const key = keyGenerator(identifier)
      rateLimitStore.delete(key)
    }
  }
}

// Pre-configured rate limiter for contact form
export const contactFormRateLimit = rateLimit({
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'),
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  keyGenerator: (ip: string) => `contact:${ip}`
})

// Utility to get client IP from request
export function getClientIP(request: Request): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp
  }
  
  // Fallback (this won't work in production but is useful for development)
  return '127.0.0.1'
}