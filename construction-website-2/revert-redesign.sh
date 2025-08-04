#!/bin/bash

# Revert SolvesAll Engineering Website Redesign
echo "🔄 Reverting SolvesAll Engineering website redesign..."

# Check if backups exist
if [[ -d ".redesign-backups" ]]; then
    echo "📦 Restoring original files from backups..."
    
    # Restore original files if they exist
    if [[ -f ".redesign-backups/page-original.tsx" ]]; then
        cp .redesign-backups/page-original.tsx app/page.tsx
        echo "✅ Original homepage restored"
    fi
    
    if [[ -f ".redesign-backups/layout-original.tsx" ]]; then
        cp .redesign-backups/layout-original.tsx app/layout.tsx
        echo "✅ Original layout restored"
    fi
    
    if [[ -f ".redesign-backups/navbar-original.tsx" ]]; then
        cp .redesign-backups/navbar-original.tsx components/modern-navbar.tsx
        echo "✅ Original navbar restored"
    fi
    
    echo "✅ Successfully reverted to original website design!"
    echo ""
    echo "🧹 Redesign files remain available:"
    echo "  - app/page-redesigned.tsx"
    echo "  - components/solvesall-navbar.tsx"
    echo "  - components/before-after-slider.tsx"
    echo "  - components/testimonial-carousel.tsx"
    echo "  - components/service-card.tsx"
    echo "  - lib/solvesall-data.ts"
    echo ""
    echo "To redeploy redesign, run: ./deploy-redesign.sh"
else
    echo "❌ No backup files found. Cannot revert automatically."
    echo "Please manually restore your original files from git or another backup."
fi