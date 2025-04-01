#!/bin/bash

# Script to update CSS variable references across the codebase
# Created for PRODBYGUS by Claude 3.7

echo "Starting CSS variable name updates..."

# Define the mappings
MAPPINGS=(
  "s/--foreground/--text/g"
  "s/--foreground-muted/--text-muted/g"
  "s/--color1/--primary/g"
  "s/--color2/--secondary/g"
  "s/--color3/--accent/g"
  "s/--color4/--surface/g"
  "s/--color5/--highlight/g"
  "s/--color1-rgb/--primary-rgb/g"
  "s/--color2-rgb/--secondary-rgb/g"
  "s/--color3-rgb/--accent-rgb/g"
  "s/--color4-rgb/--surface-rgb/g"
  "s/--color5-rgb/--highlight-rgb/g"
  "s/--glow-color/--glow-rgb/g"
  "s/--font-family-main/--font-family-mono/g"
)

# Files to process
DIRECTORIES=(
  "./src/components"
  "./src/layouts"
  "./src/pages" 
)

# File extensions to process
EXTENSIONS=("astro" "tsx" "jsx" "ts" "js" "css")

# Print header
echo "====================================="
echo "CSS Variable Name Update"
echo "====================================="

# Create a temporary file for sed operations
TEMP_FILE=$(mktemp)

# Loop through directories and file extensions
for dir in "${DIRECTORIES[@]}"; do
  echo "Processing directory: $dir"
  
  for ext in "${EXTENSIONS[@]}"; do
    echo "  Looking for .$ext files..."
    
    # Find files with the given extension
    FILES=$(find "$dir" -type f -name "*.$ext" 2>/dev/null)
    
    # Process each file
    for file in $FILES; do
      echo "    Processing: $file"
      
      # Apply all mappings to the file
      cp "$file" "$TEMP_FILE"
      
      for mapping in "${MAPPINGS[@]}"; do
        sed -i '' "$mapping" "$TEMP_FILE"
      done
      
      # Check if the file was modified
      if ! cmp -s "$file" "$TEMP_FILE"; then
        cp "$TEMP_FILE" "$file"
        echo "      ✓ Updated"
      else
        echo "      - No changes needed"
      fi
    done
  done
done

# Clean up
rm "$TEMP_FILE"

echo "====================================="
echo "Update complete!"
echo "====================================="
