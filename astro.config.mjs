// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypePrettyCode from 'rehype-pretty-code';

/**
 * Parse meta string to extract configurations for rehype-pretty-code
 * @param {string} metaString - The meta string from the code block
 * @returns {Object} - The parsed configuration object
 */
function parseMetaString(metaString) {
  const config = {
    title: null,
    lineNumbers: false,
    highlightLines: [],
    highlightRanges: [],
    diffMode: false,
  };

  if (!metaString) return config;

  // Check for filename or title
  const titleMatch = metaString.match(/title="([^"]+)"|filename="([^"]+)"/);
  if (titleMatch) {
    config.title = titleMatch[1] || titleMatch[2];
  }

  // Check for line numbers
  if (metaString.includes('showLineNumbers') || metaString.includes('lineNumbers')) {
    config.lineNumbers = true;
  }

  // Check for diff mode
  if (metaString.includes('diff')) {
    config.diffMode = true;
  }

  // Extract highlight lines and ranges
  const highlightMatch = metaString.match(/{([^}]+)}/);
  if (highlightMatch) {
    const highlightStr = highlightMatch[1];

    // Process individual highlights and ranges
    highlightStr.split(',').forEach((part) => {
      part = part.trim();
      if (part.includes('-')) {
        // It's a range
        const [start, end] = part.split('-').map(Number);
        config.highlightRanges.push({ start, end });
      } else {
        // It's a single line
        config.highlightLines.push(Number(part));
      }
    });
  }

  return config;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://blog-prodbygus.vercel.app',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    devImageService: 'sharp',
    maxDuration: 60,
    // Add CORS headers for local development and production
    headers: [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ],
  }),
  markdown: {
    // Use rehype-pretty-code for enhanced code blocks
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          // Use a more vibrant theme for better contrast
          theme: {
            dark: 'one-dark-pro',
            light: 'github-light',
          },
          // Enable grid for better line alignment
          grid: true,
          // Keep background colors from the theme
          keepBackground: false,
          // Enable line numbers for all code blocks automatically
          defaultLang: {
            block: 'text',
            inline: 'text',
          },
          // Custom filters for meta strings
          filterMetaString: (string) => string.replace(/filename="[^"]*"/, ''),
          // Callbacks for element manipulation
          onVisitLine(element) {
            // Add padding for line numbers and better readability
            element.properties.className = ['code-line'];
            // Ensure lines wrap properly
            if (!element.properties.style) element.properties.style = '';
            element.properties.style +=
              'white-space: pre-wrap; overflow-wrap: break-word; word-wrap: break-word;';

            // Improve diff highlighting with stronger styling
            if (element.children[0]?.properties?.['data-diff-operation'] === '+') {
              element.properties.className.push('diff', 'add');
              element.properties['data-diff'] = 'add';
              // Add highlighted range data attribute for diff lines
              element.properties['data-highlighted-range'] = 'add';
              // Remover propriedades inline exceto para casos críticos
              element.properties.style += 'display: block;';

              // Add counter increment for line numbers
              element.properties.style += 'counter-increment: line;';
            } else if (element.children[0]?.properties?.['data-diff-operation'] === '-') {
              element.properties.className.push('diff', 'remove');
              element.properties['data-diff'] = 'remove';
              // Add highlighted range data attribute for diff lines
              element.properties['data-highlighted-range'] = 'remove';
              // Remover propriedades inline exceto para casos críticos
              element.properties.style += 'display: block;';

              // Add counter increment for line numbers
              element.properties.style += 'counter-increment: line;';
            } else {
              // Regular line in a diff block or non-diff block
              element.properties.style += 'counter-increment: line;';
            }
          },
          onVisitHighlightedLine(element) {
            // Styling for highlighted lines
            element.properties.className = ['code-line', 'highlighted-line'];
            // Add data attribute for highlighted line
            element.properties['data-highlighted'] = 'true';
          },
          onVisitHighlightedChars(element) {
            // Styling for highlighted characters
            element.properties.className = ['highlighted-chars'];
            // Add data attribute for highlighted characters
            element.properties['data-highlighted-chars'] = 'true';
          },
          // Styling for title element (optional)
          onVisitTitle(element) {
            element.properties.className = ['code-title'];
          },
          // Process meta string for better configuration
          onVisitPreElement(element, meta) {
            // Parse the meta string to get configurations
            const config = parseMetaString(meta);

            // Apply line numbers if specified
            if (config.lineNumbers) {
              element.properties['data-line-numbers'] = '';
            }

            // Apply diff mode if specified
            if (config.diffMode) {
              element.properties['data-diff-mode'] = '';
            }

            // Count lines to set appropriate data attribute for line number digits
            const lineCount = element.children.length;
            if (lineCount < 100) {
              element.properties['data-line-numbers-max-digits'] = '2';
            } else if (lineCount < 1000) {
              element.properties['data-line-numbers-max-digits'] = '3';
            } else {
              element.properties['data-line-numbers-max-digits'] = '4';
            }

            // Add custom border styling
            element.properties.style = 'border: 2px solid rgba(255, 255, 255, 0.65);';
          },
          // Add a root data attribute for easier styling
          onVisitRoot(element) {
            // Default styling for root element
          },
        },
      ],
    ],
  },
  integrations: [
    mdx({
      // Use the same configuration for MDX
      extendMarkdownConfig: true,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: ['/', '/about', '/contact', '/blog'],
    }),
    react(),
    tailwind(),
    icon({
      include: {
        mdi: ['*'], // Include all Material Design Icons
        ph: ['*'], // Include all Phosphor icons
      },
    }),
  ],
  // Image configuration
  image: {
    // Allowed domains for remote images
    domains: ['images.unsplash.com'],
    // Output formats for optimization
    formats: ['webp', 'avif'],
    // Default sizes for responsive images
    sizes: [640, 768, 1024, 1280, 1536],
    // Default quality for optimized images (1-100)
    quality: 80,
  },
});
