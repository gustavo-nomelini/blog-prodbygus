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
  site: 'https://blog-prodbygus.vercel.app',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    devImageService: 'sharp',
    maxDuration: 60,
  }),
  integrations: [
    mdx(),
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
        mdi: ['*'], // Incluir todos os ícones do Material Design Icons
        ph: ['*'], // Incluir todos os ícones do Phosphor
      },
    }),
  ],
  // Configuração para imagens
  image: {
    // Domínios permitidos para imagens remotas
    domains: ['images.unsplash.com'],
    // Formatos de saída para otimização
    formats: ['webp', 'avif'],
    // Tamanhos padrão para imagens responsivas
    sizes: [640, 768, 1024, 1280, 1536],
    // Qualidade padrão para imagens otimizadas (1-100)
    quality: 80,
    // Configuração correta para o serviço de imagem
    // O serviço é configurado automaticamente pelo adapter Vercel
    // então não precisamos defini-lo explicitamente aqui
  },
});
