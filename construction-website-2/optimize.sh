#!/bin/bash

# Performance Optimization Script for Solves All Engineering
echo "🚀 Optimizing Solves All Engineering website for performance..."

# Backup original files
echo "📦 Creating backups..."
cp app/layout.tsx app/layout.original.tsx 2>/dev/null || echo "layout.tsx backup already exists"
cp app/page.tsx app/page.original.tsx 2>/dev/null || echo "page.tsx backup already exists"
cp app/globals.css app/globals.original.css 2>/dev/null || echo "globals.css backup already exists"

# Switch to optimized versions
echo "⚡ Switching to optimized versions..."
cp app/layout-optimized.tsx app/layout.tsx
cp app/page-optimized.tsx app/page.tsx
cp app/globals-optimized.css app/globals.css

# Update CLAUDE.md with optimizations info
echo "📝 Updating CLAUDE.md with optimization details..."
cat >> CLAUDE.md << 'EOF'

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
EOF

echo "✅ Performance optimizations applied successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Run 'pnpm dev' to test the optimized version"
echo "2. Run 'pnpm build' to check build performance"
echo "3. Test dark mode functionality"
echo "4. Verify mobile performance"
echo ""
echo "📊 Expected improvements:"
echo "- Faster initial page load (reduced font loading)"
echo "- Better dark mode functionality"
echo "- Smoother animations and interactions"
echo "- Reduced JavaScript bundle size"
echo "- Better mobile performance"