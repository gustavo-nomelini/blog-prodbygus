// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers';
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
    shikiConfig: {
      // Escolher o tema
      theme: 'github-dark',
      // Habilitar transformadores para realce
      transformers: [
        // Permite destaque de linhas com ```js {1,3-5}
        transformerMetaHighlight(),
        // Permite destaque de palavras com ```js /foo/
        transformerMetaWordHighlight(),
        // Adiciona transformadores de notação
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        // Visualização de espaços em branco
        transformerRenderWhitespace({ character: '·' }),
      ],
      // Suporte a temas claro/escuro
      experimentalThemes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // Implementar wrapper para botão copiar
      wrapperClassName: (code) => `code-block ${code}`,
      // Mostrar números de linha
      showLineNumbers: true,
      // Classes para linhas destacadas
      meta: {
        classLineNumber: 'line-number',
        classHighlight: 'highlighted-line',
        classWordHighlight: 'highlighted-word',
      },
      // Largura de tab em espaços
      tabSize: 2,
    },
  },
  integrations: [
    mdx({
      // Usar a mesma configuração para MDX
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
