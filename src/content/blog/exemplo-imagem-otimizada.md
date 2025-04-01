---
title: 'Exemplo de Imagens Otimizadas'
description: 'Demonstração do sistema de otimização de imagens do Astro Assets'
pubDate: 'Apr 01 2024'
heroImage: '/blog-placeholder-1.jpg'
tags: ['Astro', 'Performance', 'Imagens']
category: 'tutorial'
author: 'Gustavo Lopes Nomelini'
---

# Demonstração de Imagens Otimizadas

Neste post, demonstraremos como as imagens são otimizadas automaticamente pelo Astro Assets. Este sistema converte imagens para formatos modernos como WebP, redimensiona-as para vários tamanhos e aplica técnicas de carregamento avançadas.

## Imagem com caminho público

Esta é uma imagem servida diretamente da pasta `public`:

![Imagem da pasta pública](/blog-placeholder-5.jpg)

## Imagem carregada através do sistema Astro Assets

Agora a mesma imagem, mas otimizada pelo Astro Assets:

![Imagem otimizada](/src/assets/images/blog/blog-placeholder-1.jpg)

## Imagem com tamanho personalizado

Podemos definir dimensões específicas:

![Imagem com dimensões personalizadas](/src/assets/images/blog/blog-placeholder-2.jpg){width=500 height=300}

## Teste de Responsividade

Estas imagens devem se adaptar automaticamente a diferentes tamanhos de tela:

![Imagem responsiva 1](/src/assets/images/blog/blog-placeholder-3.jpg)

![Imagem responsiva 2](/src/assets/images/blog/blog-placeholder-4.jpg)

## Imagem externa

O Astro também pode otimizar imagens de fontes externas:

![Imagem do Unsplash](https://images.unsplash.com/photo-1710423666295-2fb0483471ff)

## Benefícios

- **Redução do tamanho dos arquivos**: imagens 30-70% menores
- **Formatos modernos**: conversão automática para WebP
- **Múltiplos tamanhos**: geração automática de imagens responsivas
- **Carregamento otimizado**: lazy loading e dimensões explícitas para evitar CLS
- **Melhor SEO**: melhores pontuações de Core Web Vitals

Implemente o Astro Assets em seu site e veja a diferença no desempenho!
