# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality

**Package Manager**: This project uses `pnpm` as the package manager (confirmed by pnpm-lock.yaml)

## Architecture Overview

This is a Next.js 14 construction company website (Solves All Engineering) built with modern React patterns and Tailwind CSS. The application uses the App Router with TypeScript.

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styled components
- **Animations**: Framer Motion for micro-interactions
- **Theming**: next-themes with light/dark mode support
- **TypeScript**: Strict configuration for type safety
- **State Management**: React hooks and context
- **Icons**: Lucide React for consistent iconography
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: class-variance-authority (cva) for component variants, clsx + tailwind-merge for className handling

### Project Structure

**Core App Pages:**
- `/` - Homepage with hero, services overview, testimonials
- `/about` - Company story and team information  
- `/services` - Service categories and details
- `/services/residential` - Residential-specific services
- `/contact` - Contact form and company information
- `/accessibility` - Accessibility compliance information
- `/projects/[id]` - Dynamic project showcase pages

**Component Architecture:**
- `components/ui/` - Reusable UI primitives (buttons, cards, inputs, etc.) built with Radix UI
- `components/` - Business logic components (navbar, footer, sliders)
- `components/animations/` - Reusable animation components using Framer Motion
- `hooks/` - Custom React hooks for common functionality (responsive, animations, etc.)
- `utils/` - Utility functions including comprehensive accessibility helpers
- `lib/` - Core utilities including the `cn()` function for className merging

### Design System

The application implements a comprehensive design system with:
- **Custom color palette**: Extended neutral and brand colors in tailwind.config.ts (blue-focused brand theme)
- **Typography scale**: Optimized font sizes with proper line heights and letter spacing
- **Font system**: Inter (primary), Space Grotesk (display), JetBrains Mono (code) with strategic loading
- **Accessibility-first approach**: WCAG-compliant color combinations in utils/accessibility-utils.ts
- **Custom animations**: Defined in Tailwind config for consistent motion with reduced-motion support
- **Responsive breakpoints**: Mobile-first design with extensive mobile optimizations
- **CSS Architecture**: Custom utility classes, extensive responsive helpers, and modern CSS patterns

### Key Features

**Accessibility:**
- Comprehensive WCAG compliance utilities
- Color contrast validation functions
- Semantic HTML structure
- Keyboard navigation support
- Screen reader optimization

**Performance:**
- Image optimization with Next.js Image component
- Font optimization with Google Fonts
- Code splitting with dynamic imports
- Build-time optimization

**Theme System:**
- Light/dark mode toggle
- CSS custom properties for dynamic theming
- Consistent color tokens across components

## Important Configuration Notes

- **Next.js Config**: TypeScript and ESLint errors are ignored during builds (`ignoreBuildErrors: true`)
- **Images**: Unoptimized images enabled for static hosting (`unoptimized: true`)
- **Font Loading**: Strategic preloading for Inter font, others load on demand to optimize performance
- **Path Aliases**: `@/` resolves to project root for clean imports
- **shadcn/ui Integration**: Components configured with Radix UI primitives and custom styling
- **ESLint**: Uses Next.js core web vitals configuration with modern flat config format

## Component Development Patterns

**UI Components:**
- Use forwardRef for DOM element access
- Implement className prop merging with `cn()` utility from lib/utils.ts
- Follow Radix UI patterns for accessibility
- Use class-variance-authority (cva) for component variants
- Include displayName for debugging

**Styling Conventions:**
- Use Tailwind utility classes with semantic naming
- Leverage design tokens from tailwind.config.ts (extensive custom palette)
- Apply dark mode variants consistently with CSS custom properties
- Use CSS variables for dynamic theming in globals.css
- Follow mobile-first responsive design principles
- Utilize custom CSS utility classes for complex layouts

**Animation Guidelines:**
- Use framer-motion for complex animations and page transitions
- Prefer CSS animations for simple transitions (defined in globals.css)
- Respect user's reduced motion preferences with @media queries
- Keep animations subtle and purposeful
- Use Framer Motion's viewport animations for scroll-triggered effects

## Business Context

This is a construction/engineering company website specializing in:
- Drainage solutions and stormwater management
- Earth retainment and slope stabilization
- Environmental remediation
- Commercial and residential projects

The site emphasizes trust, expertise, and professional presentation with strong visual hierarchy and clear calls-to-action.

## Code Quality & Standards

**TypeScript Configuration:**
- Strict mode enabled with comprehensive type checking
- ES6 target with ESNext modules for modern JavaScript features
- Path aliases configured for clean imports (`@/*` maps to project root)

**Accessibility Standards:**
- Comprehensive WCAG compliance utilities in `utils/accessibility-utils.ts`
- Color contrast validation functions and WCAG-compliant color combinations
- Semantic HTML structure with proper ARIA attributes
- Mobile-friendly touch targets (44px minimum)
- Screen reader optimization and keyboard navigation support

**Performance Optimizations:**
- Strategic font loading with preload for critical fonts
- Next.js Image component for optimized images
- Custom performance monitoring component
- Reduced motion preferences respected
- Modern CSS with container queries and custom properties

## Important Files & Utilities

**Key Utility Files:**
- `lib/utils.ts` - Core `cn()` function for className merging using clsx + tailwind-merge
- `utils/accessibility-utils.ts` - Comprehensive WCAG compliance and color contrast utilities
- `utils/image-utils.ts` - Image optimization helpers
- `utils/performance-utils.ts` - Performance monitoring utilities

**Configuration Files:**
- `components.json` - shadcn/ui configuration with Radix UI integration
- `tailwind.config.ts` - Extensive custom design tokens and animations
- `app/globals.css` - Comprehensive CSS architecture with custom utilities
## Performance Optimizations Applied

### Font Loading Optimizations:
- Reduced from 3 Google Fonts to 1 (Inter only) for faster loading
- Added fallback fonts for better loading experience
- Strategic preloading for critical fonts

### Animation Performance:
- Replaced heavy Framer Motion animations with CSS-based alternatives
- Added reduced motion preference detection
- Used Intersection Observer for scroll-triggered animations
- Memoized components to prevent unnecessary re-renders

### Component Optimizations:
- Created performance-optimized navbar with throttled scroll handling
- Implemented lazy loading for non-critical sections
- Added Suspense boundaries for better loading states
- Optimized re-renders with React.memo and useCallback

### Dark Mode Improvements:
- Fixed theme provider configuration to enable system theme detection
- Added proper hydration handling to prevent flash
- Enhanced theme toggle with better UX and accessibility

### CSS Optimizations:
- Reduced CSS bundle size by removing unused animations
- Optimized custom utility classes for better performance
- Improved critical CSS loading path
- Added print styles for better document printing

### Bundle Size Reductions:
- Lazy loaded non-critical components
- Optimized image loading with proper sizing and lazy loading
- Reduced JavaScript bundle size through code splitting

### Performance Monitoring:
- Added performance hooks for monitoring render performance
- Implemented intersection observer-based animations
- Optimized scroll event handling with requestAnimationFrame

To revert optimizations, run: `./revert.sh`

## SolvesAll Engineering Website Redesign

### New Features Implemented:

**Interactive Before-and-After Slider:**
- Fully responsive drag-to-compare functionality
- Touch and mouse support for all devices
- Smooth animations and visual feedback
- Mobile-optimized interaction patterns

**Testimonial Carousel:**
- Auto-playing testimonial rotation
- Star ratings and customer avatars
- Pause on hover functionality
- Mobile-friendly navigation

**Service Cards with Icons:**
- Icon-based service cards with hover effects
- Feature lists and expandable content
- Direct links to detailed service pages
- Responsive grid layouts

**Enhanced Navigation:**
- Dropdown menus for service categories
- Improved contact information display
- Better mobile menu with service sub-items
- SolvesAll branding and logo integration

**Project Showcase Pages:**
- Individual project galleries with before/after comparisons
- Problem-solution-result narrative structure
- Related projects suggestions
- SEO-optimized dynamic routing

**Content & Data Structure:**
- Complete SolvesAll company information
- East Bay service area focus
- Environmental expertise highlighting
- Real project case studies and testimonials

### Design Guidelines Applied:
- High-resolution hero images with clear CTAs
- Icon-based service cards with "Learn More" links
- Interactive before-and-after project showcases
- Individual project pages with photo galleries
- Testimonial carousel with ratings
- Responsive, accessible, minimalistic design
- Sticky contact/quote buttons
- Streamlined navigation with dropdowns

### Files Created:
- `lib/solvesall-data.ts` - Comprehensive company data
- `components/before-after-slider.tsx` - Interactive comparison slider
- `components/testimonial-carousel.tsx` - Auto-rotating testimonials
- `components/service-card.tsx` - Icon-based service cards
- `components/solvesall-navbar.tsx` - Updated navigation
- `app/page-redesigned.tsx` - New homepage design
- `app/services/drainage/page.tsx` - Detailed service page
- `app/projects/[id]/page.tsx` - Dynamic project pages

To revert redesign, run: `./revert-redesign.sh`
