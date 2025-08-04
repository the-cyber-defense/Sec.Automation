#!/bin/bash

# Revert Performance Optimizations Script
echo "🔄 Reverting to original versions..."

# Check if backups exist
if [[ -f "app/layout.original.tsx" && -f "app/page.original.tsx" && -f "app/globals.original.css" ]]; then
    # Restore original files
    cp app/layout.original.tsx app/layout.tsx
    cp app/page.original.tsx app/page.tsx
    cp app/globals.original.css app/globals.css
    
    echo "✅ Successfully reverted to original versions!"
    echo "🧹 You may want to clean up the optimization files:"
    echo "  - app/layout-optimized.tsx"
    echo "  - app/page-optimized.tsx" 
    echo "  - app/globals-optimized.css"
    echo "  - components/performance-navbar.tsx"
    echo "  - components/lazy-section.tsx"
    echo "  - hooks/use-optimized-motion.ts"
else
    echo "❌ Backup files not found. Cannot revert automatically."
    echo "Please manually restore your original files."
fi