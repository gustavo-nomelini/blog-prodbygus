# PRODBYGUS - Blog Pessoal

![PRODBYGUS Blog](https://via.placeholder.com/1200x630/2a2a2a/ffffff?text=PRODBYGUS+Blog)

Este é o repositório do blog pessoal **PRODBYGUS**, um site moderno construído com Astro e Tailwind CSS, focado em performance e experiência do usuário.

## 📋 Visão Geral

PRODBYGUS é um blog pessoal com design minimalista e elegante, oferecendo uma experiência de navegação fluida e agradável. O site foi desenvolvido utilizando o framework Astro, que combina o melhor de SSG (Static Site Generation) e hidratação parcial para uma performance excepcional.

### ✨ Características

- 🚀 **Alta Performance**: Site otimizado com Astro 5.5+
- 🔄 **Modo SSR com Vercel Adapter**: Geração dinâmica de páginas com adaptador Vercel
- 🎨 **Design Responsivo**: Layout adaptativo para dispositivos móveis, tablets e desktops
- 🌓 **Tema Escuro/Claro**: Suporte a preferências de tema do usuário
- 📝 **Blog com MDX**: Suporte a posts em Markdown e MDX com rendering avançado
- 🎯 **Efeitos de Transição**: Animações suaves com Framer Motion
- 🖥️ **Componentes React**: Integração com React 19 para UI interativa
- 🧩 **Componentes Cyber**: UI com estilo ciberpunk moderna
- 🖌️ **Categorias e Filtros**: Sistema de categorização e filtragem de posts
- 💫 **Code Blocks Aprimorados**: Blocos de código destacados com rehype-pretty-code e Shiki
- 🔍 **SEO Otimizado**: Metadados, Open Graph, Schema.org e estrutura semântica
- 📱 **PWA Ready**: Disponível para instalação como aplicativo
- 📊 **Web Analytics**: Integração com Vercel Analytics para métricas de uso
- 📬 **Formulário de Contato**: Sistema completo de envio de mensagens via email utilizando Nodemailer
- 🗺️ **Integração com Mapa**: Visualização da localização com Leaflet e OpenStreetMap
- 📱 **Otimização de Imagens**: Processamento automático de imagens para performance
- 📰 **RSS Feed**: Feed RSS para inscrição automática em novos conteúdos

## 🛠️ Tecnologias

- [Astro 5.5+](https://astro.build/) - Framework web para sites orientados a conteúdo
- [React 19](https://react.dev/) - Biblioteca JavaScript para interfaces de usuário
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado
- [MDX](https://mdxjs.com/) - Markdown com JSX para conteúdo interativo
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações para React
- [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/) - Realce de sintaxe para blocos de código
- [Shiki](https://shiki.style/) - Gerador de destaque de sintaxe de alta fidelidade
- [Nodemailer](https://nodemailer.com/) - Biblioteca JavaScript para envio de emails
- [Leaflet](https://leafletjs.com/) - Biblioteca JavaScript para mapas interativos
- [Astro Icon](https://github.com/natemoo-re/astro-icon) - Integração de ícones para Astro
- [Vercel](https://vercel.com/) - Plataforma de deploy e hospedagem

## 🚀 Estrutura do Projeto

```text
├── public/              # Arquivos estáticos (imagens, fontes, etc.)
├── src/
│   ├── assets/          # Recursos como imagens e fontes
│   ├── components/      # Componentes Astro e React reutilizáveis
│   │   ├── BlogAdapter.jsx     # Adaptador para posts do blog
│   │   ├── CategoryBadge.astro # Badge para categorias
│   │   ├── CodeBlock.astro     # Blocos de código aprimorados
│   │   ├── Contact.astro       # Seção de contato com formulário
│   │   ├── ContactForm.astro   # Formulário de contato com validação
│   │   ├── CyberComponents/    # Componentes com estilo ciberpunk
│   │   ├── Footer.astro        # Rodapé do site
│   │   ├── Header.astro        # Cabeçalho com navegação
│   │   ├── Map.astro           # Componente de mapa com Leaflet
│   │   └── TransitionEffect.jsx # Efeitos de transição de página
│   │
│   ├── content/         # Coleções de conteúdo (blog posts, etc.)
│   │   └── blog/        # Posts do blog em Markdown/MDX
│   │
│   ├── layouts/         # Layouts de página
│   │   ├── BlogPost.astro   # Layout para posts do blog
│   │   └── Layout.astro     # Layout base para todas as páginas
│   │
│   ├── pages/           # Páginas do site
│   │   ├── api/         # Endpoints de API
│   │   │   └── contact.js   # API para processamento do formulário
│   │   │
│   │   ├── about.astro      # Página "Sobre"
│   │   ├── blog/            # Páginas relacionadas ao blog
│   │   ├── category/        # Páginas de categorias
│   │   ├── contact.astro    # Página de contato
│   │   └── index.astro      # Página inicial
│   │
│   ├── styles/          # Estilos globais e utilitários
│   │   └── globals.css  # Estilos globais e variáveis CSS
│   │
│   └── utils/           # Utilitários e helpers
│       └── date.ts      # Formatação de datas
│
├── .env                 # Variáveis de ambiente (não versionado)
├── .env.example         # Exemplo de variáveis de ambiente
├── astro.config.mjs     # Configuração do Astro
├── package.json         # Dependências e scripts
├── tailwind.config.mjs  # Configuração do Tailwind CSS
├── tsconfig.json        # Configuração do TypeScript
└── vercel.json          # Configuração para deploy no Vercel
```

## 🖥️ Funcionalidades Principais

### Sistema de Blog Aprimorado

O blog agora conta com:

- Filtragem de posts por categoria
- Badges de categoria visualmente destacados
- Sistema robusto de renderização de Markdown/MDX
- Blocos de código com destaque de sintaxe avançado
- Suporte para código com highlighting de linhas e palavras
- Botão de cópia de código
- Formatação de data localizada

### Componentes Cyber

Uma coleção de componentes React com estilo ciberpunk moderno:

- CyberHeader - Cabeçalho com efeitos visuais
- CyberFooter - Rodapé com estilo ciberpunk
- CyberPostCard - Cards de post com design futurista
- CyberPostGrid - Grid de posts com layout dinâmico
- CyberButton - Botões com efeitos visuais
- CyberBackground - Fundos animados

### Efeitos de Transição

Implementação de transições suaves entre páginas usando Framer Motion, proporcionando uma experiência de navegação mais fluida e profissional.

### Otimização de Imagens Avançada

Sistema de otimização de imagens com:

- Conversão automática para formatos modernos (WebP, AVIF)
- Dimensionamento responsivo
- Lazy loading para melhor performance
- Componentes especializados para imagens em Markdown

### Formulário de Contato

Implementamos um completo sistema de contato com:

- Formulário com validação de campos
- Envio de emails usando Nodemailer
- Feedback visual para o usuário
- Tratamento de erros
- Link direto para WhatsApp

Para configurar o envio de emails:

1. Configure as credenciais SMTP no arquivo `.env`:

```
# SMTP Settings for Nodemailer
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_email_password
MAIL_FROM=your_email@example.com
MAIL_TO=your_email@example.com
```

### Mapa Interativo

O componente de mapa utiliza a biblioteca Leaflet com OpenStreetMap para exibir a localização. Não é necessária nenhuma API key para utilizar este recurso.

### Analytics

Integração com Vercel Analytics para rastreamento de métricas de uso do site, permitindo análise de tráfego e comportamento dos usuários.

## 🧞 Comandos

Execute estes comandos a partir da raiz do projeto:

| Comando             | Ação                                                   |
| :------------------ | :----------------------------------------------------- |
| `npm install`       | Instala as dependências                                |
| `npm run dev`       | Inicia servidor de desenvolvimento em `localhost:4321` |
| `npm run build`     | Compila o site para produção em `./dist/`              |
| `npm run preview`   | Visualiza a versão de produção localmente              |
| `npm run astro ...` | Executa comandos do CLI do Astro                       |

## 🚀 Implantação

Este site está configurado para implantação no Vercel, utilizando o adaptador `@astrojs/vercel` para SSR (Server-Side Rendering).

### Implantação no Vercel

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente (veja `.env.example`)
3. O adaptador Vercel já está configurado no `astro.config.mjs`
4. O arquivo `vercel.json` contém configurações adicionais para o deployment

## 📝 To-Do

Lista de melhorias e recursos futuros:

- [ ] Adicionar sistema de comentários
- [ ] Implementar sistema de newsletter
- [ ] Melhorar acessibilidade (WCAG AAA)
- [ ] Adicionar suporte a internacionalização (i18n)
- [ ] Implementar pesquisa de conteúdo
- [ ] Adicionar testes automatizados
- [ ] Integrar sistema de preview para novos posts
- [ ] Adicionar modo de leitura focada para artigos

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

---

Desenvolvido com ❤️ por [PRODBYGUS](https://twitter.com/prodbygus)
