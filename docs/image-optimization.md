# Guia de Otimização de Imagens

Este projeto implementa o sistema `astro:assets` para otimização de imagens, oferecendo carregamento mais rápido, tamanhos responsivos e melhor experiência do usuário.

## Benefícios

- **Redução de tamanho**: Imagens convertidas para WebP (30-70% menores)
- **Carregamento otimizado**: Lazy loading e dimensões explícitas para evitar CLS (Cumulative Layout Shift)
- **Formatos modernos**: Suporte para WebP e AVIF
- **Responsividade**: Geração automática de imagens em múltiplos tamanhos
- **SEO**: Melhores pontuações no Core Web Vitals

## Como usar

### 1. Em componentes Astro/React/JSX

```astro
---
import { Image } from 'astro:assets';
import minhaImagem from '../assets/images/minha-imagem.jpg';
// OU
import OptimizedImage from '../components/OptimizedImage.astro';
---

<!-- Usando o componente Image do Astro -->
<Image
  src={minhaImagem}
  alt="Descrição da imagem"
  width={800}
  height={600}
  format="webp"
  quality={80}
/>

<!-- OU usando nosso componente personalizado -->
<OptimizedImage
  src={minhaImagem}
  alt="Descrição da imagem"
  width={800}
  height={600}
/>
```

### 2. Em posts Markdown

Para imagens em arquivos Markdown, simplesmente use a sintaxe normal de Markdown, mas com caminhos específicos:

```markdown
<!-- Imagem da pasta pública (não otimizada) -->

![Descrição](/caminho/para/imagem.jpg)

<!-- Imagem otimizada: use o caminho completo começando com /src/assets/ -->

![Descrição](/src/assets/images/blog/imagem.jpg)

<!-- Imagem com dimensões personalizadas -->

![Descrição](/src/assets/images/blog/imagem.jpg){width=500 height=300}

<!-- Imagens externas de domínios permitidos também são otimizadas -->

![Descrição](https://images.unsplash.com/photo-xyz)
```

### 3. Em frontmatter de posts

Para especificar a imagem principal no frontmatter de um post:

```yaml
---
title: 'Meu Post'
description: 'Descrição do post'
# Imagem da pasta pública
heroImage: '/imagem.jpg'
# OU imagem importada (necessário importar)
# Você pode usar o caminho completo para ser processado pelo MarkdownImage
heroImage: '/src/assets/images/blog/imagem.jpg'
---
```

### 4. Importando imagens em scripts Astro

Para importar imagens dinamicamente em scripts Astro:

```astro
---
import { importImage } from '../utils/importImage';

// Importar uma imagem específica
const minhaImagem = await importImage('/src/assets/images/blog/imagem.jpg');
---
```

## Dicas para otimização

1. **Forneça sempre width e height**: Evita layout shifts durante o carregamento
2. **Use srcset para imagens responsivas**: Automaticamente com o componente Image do Astro
3. **Formate para WebP/AVIF**: Maior compressão sem perda de qualidade significativa
4. **Otimize antes de fazer upload**: Mesmo com processamento automático, comece com imagens de qualidade
5. **Verifique dimensões**: Não carregue imagens maiores que o necessário

## Formatos suportados

- JPEG/JPG
- PNG
- WebP
- AVIF
- GIF

## Configuração atual

As configurações de otimização estão em `astro.config.mjs`:

```js
image: {
  // Domínios permitidos para imagens remotas
  domains: ['images.unsplash.com'],
  // Formatos de saída para otimização
  formats: ['webp', 'avif'],
  // Tamanhos padrão para imagens responsivas
  sizes: [640, 768, 1024, 1280, 1536],
  // Qualidade padrão para imagens otimizadas (1-100)
  quality: 80,
  // Usar 'sharp' como serviço de processamento de imagens
  service: 'sharp',
}
```
