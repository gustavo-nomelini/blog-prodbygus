// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypePrettyCode from 'rehype-pretty-code';

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
          // Enable line numbers for all code blocks
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
              // Remover propriedades inline exceto para casos críticos
              element.properties.style += 'display: block;';
            } else if (element.children[0]?.properties?.['data-diff-operation'] === '-') {
              element.properties.className.push('diff', 'remove');
              element.properties['data-diff'] = 'remove';
              // Remover propriedades inline exceto para casos críticos
              element.properties.style += 'display: block;';
            }
          },
          onVisitHighlightedLine(element) {
            // Styling for highlighted lines
            element.properties.className = ['code-line', 'highlighted-line'];
          },
          onVisitHighlightedChars(element) {
            // Styling for highlighted characters
            element.properties.className = ['highlighted-chars'];
          },
          // Styling for title element (optional)
          onVisitTitle(element) {
            element.properties.className = ['code-title'];
          },
          // Add a root data attribute for easier styling
          onVisitRoot(element) {
            // Always add line numbers to every code block
            element.properties['data-line-numbers'] = '';

            // Add custom border styling
            if (element.tagName === 'pre') {
              element.properties.style = 'border: 2px solid rgba(255, 255, 255, 0.65);';
            }
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
