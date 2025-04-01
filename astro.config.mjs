// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://prodbygus.com',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind(),
    icon({
      include: {
        mdi: ['*'], // Incluir todos os ícones do Material Design Icons
        ph: ['*'], // Incluir todos os ícones do Phosphor
      },
    }),
  ],
});
