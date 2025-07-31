# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality

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
- `components/ui/` - Reusable UI primitives (buttons, cards, inputs, etc.)
- `components/` - Business logic components (navbar, footer, sliders)
- `components/animations/` - Reusable animation components
- `hooks/` - Custom React hooks for common functionality
- `utils/` - Utility functions including accessibility helpers

### Design System

The application implements a comprehensive design system with:
- **Custom color palette**: Extended neutral and brand colors in tailwind.config.ts
- **Typography scale**: Optimized font sizes with proper line heights and letter spacing
- **Accessibility-first approach**: WCAG-compliant color combinations in utils/accessibility-utils.ts
- **Custom animations**: Defined in Tailwind config for consistent motion
- **Responsive breakpoints**: Mobile-first design with container queries

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
- **Images**: Unoptimized images enabled for static hosting
- **Font Loading**: Strategic preloading for Inter font, others load on demand
- **Path Aliases**: `@/` resolves to project root for clean imports

## Component Development Patterns

**UI Components:**
- Use forwardRef for DOM element access
- Implement className prop merging with `cn()` utility
- Follow Radix UI patterns for accessibility
- Include displayName for debugging

**Styling Conventions:**
- Use Tailwind utility classes with semantic naming
- Leverage design tokens from tailwind.config.ts
- Apply dark mode variants consistently
- Use CSS variables for dynamic theming

**Animation Guidelines:**
- Use framer-motion for complex animations
- Prefer CSS animations for simple transitions
- Respect user's reduced motion preferences
- Keep animations subtle and purposeful

## Business Context

This is a construction/engineering company website specializing in:
- Drainage solutions and stormwater management
- Earth retainment and slope stabilization
- Environmental remediation
- Commercial and residential projects

The site emphasizes trust, expertise, and professional presentation with strong visual hierarchy and clear calls-to-action.