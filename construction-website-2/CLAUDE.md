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