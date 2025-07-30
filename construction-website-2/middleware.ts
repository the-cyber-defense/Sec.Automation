import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Performance and caching headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  // Cache static assets aggressively
  if (
    request.nextUrl.pathname.startsWith('/images/') ||
    request.nextUrl.pathname.startsWith('/_next/static/') ||
    request.nextUrl.pathname.endsWith('.css') ||
    request.nextUrl.pathname.endsWith('.js') ||
    request.nextUrl.pathname.endsWith('.woff2') ||
    request.nextUrl.pathname.endsWith('.woff') ||
    request.nextUrl.pathname.endsWith('.ttf')
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
  }

  // Cache HTML pages for a shorter duration
  if (request.nextUrl.pathname.endsWith('.html') || 
      !request.nextUrl.pathname.includes('.')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
    )
  }

  // Preload critical resources
  response.headers.set('Link', [
    '</images/hero-1.png>; rel=preload; as=image',
    '</_next/static/css/app.css>; rel=preload; as=style',
    '</_next/static/js/main.js>; rel=preload; as=script'
  ].join(', '))

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}