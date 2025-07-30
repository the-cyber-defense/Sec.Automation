# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Commands
```bash
npm run dev          # Start development server (Next.js)
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Package Manager
This project uses `pnpm` as the package manager (pnpm-lock.yaml present).

## Project Architecture

### Framework & Stack
- **Next.js 14.2.16** with App Router architecture
- **TypeScript** with strict configuration
- **Tailwind CSS** with extensive custom design system
- **Framer Motion** for animations and interactions
- **Radix UI** components for accessible UI primitives
- **next-themes** for dark/light theme switching

### Key Architecture Patterns

#### App Router Structure
- Uses Next.js App Router (`app/` directory)
- Layout-based routing with nested layouts
- Client/server component patterns with "use client" directives
- Route groups for organization

#### Component Architecture
- **UI Components**: Reusable design system components in `components/ui/`
- **Feature Components**: Page-specific components (navbar, footer, etc.)
- **Custom Hooks**: Located in `hooks/` directory for reusable logic
- **Utilities**: Helper functions in `lib/utils.ts`

#### Design System
- Comprehensive Tailwind configuration with custom color palette (blue/neutral theme)
- CSS custom properties for theming in `app/globals.css`
- Modern design patterns: glass morphism, gradients, animations
- Responsive-first approach with mobile optimization

#### Project Structure
```
app/                    # Next.js App Router pages
├── (routes)/          # Route groups for different page types
├── layout.tsx         # Root layout with fonts, themes, navigation
├── page.tsx           # Homepage with hero, features, CTA sections
└── globals.css        # Global styles and design system

components/
├── ui/                # Reusable UI components (buttons, cards, etc.)
├── animations/        # Animation components
└── feature-specific/  # Page-specific components

hooks/                 # Custom React hooks
lib/                   # Utility functions and helpers
utils/                 # Additional utility functions
public/images/         # Static assets and images
```

#### Styling Approach
- Tailwind-first with extensive custom utilities
- CSS custom properties for theming
- Component-level styling with cn() utility for class merging
- Responsive design with mobile-first approach
- Dark/light theme support throughout

#### State Management
- React hooks and context for local state
- Theme state managed via next-themes
- No global state management library (uses React's built-in state)

### Important Files
- `tailwind.config.ts`: Comprehensive design system configuration
- `app/layout.tsx`: Root layout with font loading, theme provider, navigation
- `app/globals.css`: Extensive custom CSS with utilities and animations
- `components/modern-navbar.tsx`: Complex navigation component with animations
- `lib/utils.ts`: Core utility functions (cn for class merging)

### Development Notes
- Next.js config disables ESLint and TypeScript errors during builds (for development)
- Images are unoptimized in next.config.mjs
- Uses absolute imports with `@/` prefix
- Extensive use of Framer Motion for page transitions and animations
- Mobile-responsive design with touch-friendly interactions