#!/bin/bash

# SolvesAll.org Website Redesign Deployment Script
echo "🚀 Deploying SolvesAll Engineering website redesign..."

# Create backup directory if it doesn't exist
mkdir -p .redesign-backups

# Backup current files
echo "📦 Creating backups of current files..."
cp app/page.tsx .redesign-backups/page-original.tsx 2>/dev/null || echo "No original page.tsx found"
cp app/layout.tsx .redesign-backups/layout-original.tsx 2>/dev/null || echo "No original layout.tsx found"
cp components/modern-navbar.tsx .redesign-backups/navbar-original.tsx 2>/dev/null || echo "No original navbar found"

# Deploy redesigned components
echo "✨ Deploying redesigned components..."

# Replace homepage with redesigned version
cp app/page-redesigned.tsx app/page.tsx
echo "✅ Homepage updated with SolvesAll redesign"

# Replace navbar with SolvesAll navbar
cp components/solvesall-navbar.tsx components/modern-navbar.tsx
echo "✅ Navigation updated with SolvesAll branding and services"

# Update layout to use new navbar
echo "⚙️ Updating layout imports..."
sed -i '' 's/PerformanceNavbar/ModernNavbar/g' app/layout.tsx
sed -i '' 's/performance-navbar/modern-navbar/g' app/layout.tsx

# Create required service directories
echo "📁 Creating service page directories..."
mkdir -p app/services/retaining-walls
mkdir -p app/services/pavers
mkdir -p app/services/grading

# Create basic service pages (simplified versions)
echo "📄 Creating additional service pages..."

# Retaining Walls page
cat > app/services/retaining-walls/page.tsx << 'EOF'
import { redirect } from 'next/navigation'

export default function RetainingWallsPage() {
  redirect('/services/drainage')
}
EOF

# Pavers page  
cat > app/services/pavers/page.tsx << 'EOF'
import { redirect } from 'next/navigation'

export default function PaversPage() {
  redirect('/services/drainage')
}
EOF

# Grading page
cat > app/services/grading/page.tsx << 'EOF'
import { redirect } from 'next/navigation'

export default function GradingPage() {
  redirect('/services/drainage')
}
EOF

# Update CLAUDE.md with redesign information
echo "📝 Updating CLAUDE.md with redesign details..."
cat >> CLAUDE.md << 'EOF'

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
EOF

echo "✅ SolvesAll Engineering website redesign deployed successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Run 'pnpm dev' to test the redesigned website"
echo "2. Check all navigation links and interactions"
echo "3. Test before-and-after sliders on different devices"
echo "4. Verify testimonial carousel functionality"
echo "5. Review project showcase pages"
echo ""
echo "📊 New features available:"
echo "- Interactive before-and-after project comparisons"
echo "- Auto-rotating testimonial carousel"
echo "- Enhanced service navigation with dropdowns"
echo "- Comprehensive project galleries"
echo "- Mobile-optimized responsive design"
echo "- SolvesAll branding and East Bay focus"