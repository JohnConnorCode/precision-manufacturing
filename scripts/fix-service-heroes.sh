#!/bin/bash

# Service pages with their appropriate industrial images
declare -A SERVICE_IMAGES=(
  ["adaptive-machining"]="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad"
  ["engineering"]="https://images.unsplash.com/photo-1581092918482-a8fee14d45f0"
  ["metrology"]="https://images.unsplash.com/photo-1537462589942-f3e10db0e074"
  ["predictive-analytics"]="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1"
)

# Fix each service page
for service in "${!SERVICE_IMAGES[@]}"; do
  file="app/services/${service}/page.tsx"
  image="${SERVICE_IMAGES[$service]}"

  echo "Updating ${service} page..."

  # Update hero section to match Industries page style
  sed -i '' 's/min-h-\[80vh\]/min-h-[70vh]/g' "$file"

  # Update background overlays to be consistent
  sed -i '' 's/bg-gradient-to-b from-slate-950\/70 via-slate-950\/50 to-background/bg-gradient-to-b from-slate-950\/90 via-slate-950\/80 to-slate-950\/95/g' "$file"

  # Add brand gradient overlay if not present
  if ! grep -q "from-cyan-950/30" "$file"; then
    sed -i '' '/bg-gradient-to-b from-slate-950/a\
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/30 via-transparent to-blue-950/30" />' "$file"
  fi

  # Update container padding to be consistent
  sed -i '' 's/py-32 md:py-40 lg:py-48//g' "$file"
  sed -i '' 's/<div className="container relative z-10">/<div className="container relative z-10">/g' "$file"

  # Update className for motion divs to be consistent
  sed -i '' 's/className="max-w-4xl mx-auto"/className="text-center max-w-4xl mx-auto"/g' "$file"
done

echo "All service pages updated!"