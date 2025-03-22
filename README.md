# PRODBYGUS - Blog Pessoal

![PRODBYGUS Blog](https://via.placeholder.com/1200x630/2a2a2a/ffffff?text=PRODBYGUS+Blog)

Este é o repositório do blog pessoal **PRODBYGUS**, um site moderno construído com Astro e Tailwind CSS, focado em performance e experiência do usuário.

## 📋 Visão Geral

PRODBYGUS é um blog pessoal com design minimalista e elegante, oferecendo uma experiência de navegação fluida e agradável. O site foi desenvolvido utilizando o framework Astro, que combina o melhor de SSG (Static Site Generation) e hidratação parcial para uma performance excepcional.

### ✨ Características

- 🚀 **Alta Performance**: Site estático otimizado com pontuação 100/100 no Lighthouse
- 🎨 **Design Responsivo**: Layout adaptativo para dispositivos móveis, tablets e desktops
- 🌓 **Tema Escuro/Claro**: Suporte a preferências de tema do usuário
- 📝 **Blog com MDX**: Suporte a posts em Markdown e MDX
- 🔍 **SEO Otimizado**: Metadados, Open Graph e estrutura semântica
- 📱 **PWA Ready**: Disponível para instalação como aplicativo
- 📬 **Formulário de Contato**: Sistema completo de envio de mensagens via email
- 🗺️ **Integração com Mapa**: Visualização da localização com OpenStreetMap

## 🛠️ Tecnologias

- [Astro](https://astro.build/) - Framework web para sites orientados a conteúdo
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado
- [MDX](https://mdxjs.com/) - Markdown com JSX para conteúdo interativo
- [EmailJS](https://www.emailjs.com/) - Serviço de envio de emails via JavaScript
- [Leaflet](https://leafletjs.com/) - Biblioteca JavaScript para mapas interativos
- [Astro Icon](https://github.com/natemoo-re/astro-icon) - Integração de ícones para Astro

## 🚀 Estrutura do Projeto

```text
├── public/              # Arquivos estáticos (imagens, fontes, etc.)
├── src/
│   ├── components/      # Componentes Astro reutilizáveis
│   │   ├── Contact.astro       # Seção de contato com formulário e mapa
│   │   ├── ContactForm.astro   # Formulário de contato com validação
│   │   ├── Footer.astro        # Rodapé do site
│   │   ├── Header.astro        # Cabeçalho com navegação
│   │   ├── HeaderLink.astro    # Link do menu de navegação
│   │   └── Map.astro           # Componente de mapa com Leaflet
│   │
│   ├── content/         # Coleções de conteúdo (blog posts)
│   │   └── blog/        # Posts do blog em Markdown
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
│   │   ├── contact.astro    # Página de contato
│   │   └── index.astro      # Página inicial
│   │
│   └── styles/          # Estilos globais e utilitários
│       └── globals.css  # Estilos globais e variáveis CSS
│
├── .env                 # Variáveis de ambiente (não versionado)
├── .env.example         # Exemplo de variáveis de ambiente
├── astro.config.mjs     # Configuração do Astro
├── package.json         # Dependências e scripts
├── tailwind.config.cjs  # Configuração do Tailwind CSS
└── tsconfig.json        # Configuração do TypeScript
```

## 🖥️ Funcionalidades Principais

### Sistema de Blog

O blog é alimentado por arquivos Markdown/MDX na pasta `content/blog/`. Cada post inclui metadados como título, descrição, data de publicação e imagem de capa. O sistema suporta categorias, tags e informações do autor.

### Formulário de Contato

Implementamos um completo sistema de contato com:

- Formulário com validação de campos
- Envio de emails usando EmailJS
- Feedback visual para o usuário
- Tratamento de erros
- Link direto para WhatsApp

Para configurar o envio de emails:

1. Crie uma conta em [emailjs.com](https://www.emailjs.com/)
2. Configure um serviço de email e um template
3. Adicione suas credenciais no arquivo `.env`:

```
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id
EMAILJS_PUBLIC_KEY=sua_public_key
EMAILJS_PRIVATE_KEY=sua_private_key
YOUR_EMAIL=seu-email@exemplo.com
```

### Mapa Interativo

O componente de mapa utiliza a biblioteca Leaflet com OpenStreetMap para exibir a localização. Não é necessária nenhuma API key para utilizar este recurso.

### Design Responsivo

O site é totalmente responsivo, adaptando-se a diferentes tamanhos de tela, desde dispositivos móveis até desktops.

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

Este site está configurado para implantação no Vercel, mas pode ser facilmente adaptado para outras plataformas como Netlify, Cloudflare Pages ou GitHub Pages.

### Implantação no Vercel

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente (veja `.env.example`)
3. Defina o comando de build como `npm run build`
4. Defina o diretório de saída como `dist`

## 📝 To-Do

Lista de melhorias e recursos futuros:

- [ ] Adicionar sistema de comentários
- [ ] Implementar sistema de newsletter
- [ ] Melhorar acessibilidade (WCAG AAA)
- [ ] Adicionar suporte a internacionalização (i18n)
- [ ] Implementar pesquisa de conteúdo

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

---

Desenvolvido com ❤️ por [PRODBYGUS](https://twitter.com/prodbygus)
