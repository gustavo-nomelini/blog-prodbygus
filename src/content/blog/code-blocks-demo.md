---
title: 'Demonstração de Blocos de Código Aprimorados'
description: 'Uma demonstração dos novos blocos de código com botão de cópia, numeração de linhas e realce de sintaxe avançado.'
pubDate: '2023-04-06'
categories: ['desenvolvimento', 'web', 'tutorial']
tags: ['markdown', 'código', 'astro', 'blog']
heroImage: '/images/blog/code-demo.jpg'
---

# Demonstração de Blocos de Código Aprimorados

Neste post, vamos demonstrar os recursos aprimorados dos blocos de código no blog, incluindo:

- Botão para copiar código para o clipboard
- Realce de sintaxe para várias linguagens
- Numeração de linhas automática
- Destaque de linhas específicas
- Destaque de palavras-chave
- Exibição de nome do arquivo
- Visualização de diferenças (diff)
- Efeito de foco em trechos específicos

## JavaScript com botão de copiar

Veja como criar uma função simples em JavaScript:

```javascript
// Função de saudação personalizada
function saudacao(nome) {
  // Verifica se o nome foi fornecido
  if (!nome) {
    nome = 'visitante';
  }

  // Retorna a mensagem de saudação
  return `Olá, ${nome}! Bem-vindo ao blog.`;
}

// Exemplos de uso
console.log(saudacao('PRODBYGUS'));
console.log(saudacao());
```

## TypeScript com destaque de linha

O código abaixo mostra uma interface e classe em TypeScript com destaque nas linhas importantes:

```typescript {3-5,11}
// Define a interface para um usuário
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

// Implementa a classe que utiliza a interface
class GerenciadorUsuarios {
  private usuarios: Usuario[] = [];

  adicionarUsuario(usuario: Usuario): void {
    this.usuarios.push(usuario);
    console.log(`Usuário ${usuario.nome} adicionado com sucesso!`);
  }

  buscarUsuarioPorId(id: number): Usuario | undefined {
    return this.usuarios.find((usuario) => usuario.id === id);
  }
}
```

## Destaque de palavras específicas

Veja como destacar palavras específicas em um código-fonte:

```javascript /const|let|import|export/
// Importa módulos necessários
import { useState, useEffect } from 'react';

// Componente React com destaque em palavras-chave
export function Counter() {
  const [count, setCount] = useState(0);
  let lastUpdated = new Date();

  // Efeito para atualizar o título da página
  useEffect(() => {
    document.title = `Contador: ${count}`;
    lastUpdated = new Date();
  }, [count]);

  // Função para incrementar o contador
  const increment = () => setCount(count + 1);

  return (
    <div>
      <p>Contagem: {count}</p>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}
```

## HTML com nome de arquivo

Veja um exemplo de código HTML com nome de arquivo:

```html title="index.html"
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meu Site</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header>
      <h1>Bem-vindo ao Meu Site</h1>
      <nav>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/sobre">Sobre</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contato">Contato</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <h2>Título do Artigo</h2>
        <p>Conteúdo do artigo aqui...</p>
      </article>
    </main>

    <footer>
      <p>&copy; 2023 PRODBYGUS - Todos os direitos reservados</p>
    </footer>

    <script src="script.js"></script>
  </body>
</html>
```

## Mostrar Diferenças (Diff)

Confira as mudanças feitas em um arquivo de configuração:

```js title="config.js" showDiff
// Configuração antiga
const config = {
  theme: 'dark',
  version: '1.0.0',
- apiKey: '123456',
+ apiKey: process.env.API_KEY,
  features: {
    comments: true,
-   analytics: false,
+   analytics: true,
    search: true
  },
- maxResults: 50
+ maxResults: 100,
+ enableCache: true
};

export default config;
```

## Foco em trechos específicos

Destaque apenas as partes importantes do código:

```python title="app.py" /!focus/
import os
from flask import Flask, render_template, request
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv() # !focus

# Inicializa a aplicação Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') # !focus

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    api_key = os.getenv('API_KEY') # !focus
    # Lógica para buscar dados usando a API key
    return {'success': True, 'data': [1, 2, 3]}

if __name__ == '__main__':
    app.run(debug=True)
```

## CSS com suporte a Tailwind

Exemplo de CSS e classes Tailwind:

```css
/* Variáveis CSS personalizadas */
:root {
  --primary: #9f70a9;
  --secondary: #544158;
  --accent: #c2a5c7;
  --background: #2a212c;
}

/* Classes personalizadas */
.card {
  background-color: var(--background);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: var(--accent);
  transform: translateY(-2px);
}
```

## Bash com exemplos de comandos

Aqui estão alguns comandos úteis para desenvolvimento:

```bash
# Iniciar um novo projeto Astro
npm create astro@latest

# Instalar dependências
npm install tailwindcss @astrojs/tailwind

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar a build de produção localmente
npm run preview
```

## Código JSON com nome de arquivo

Configuração de um arquivo package.json:

```json title="package.json"
{
  "name": "blog-prodbygus",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/mdx": "^1.0.0",
    "@astrojs/react": "^3.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "astro": "^3.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.3"
  }
}
```

## Espaços em branco visíveis

Este exemplo mostra espaços em branco visíveis:

```python
def calcular_media(notas):
    # Os espaços e tabulações são visíveis
    total = 0
    quantidade = len(notas)

    for nota in notas:
        total += nota

    media = total / quantidade
    return media

# Exemplo com tabs intencionais
def formatar_nome(nome, sobrenome):
	nome_completo = f"{nome} {sobrenome}"
	return nome_completo.title()
```

## Conclusão

Com essas melhorias, os blocos de código no blog agora têm:

1. Botão de copiar para facilitar o reuso de código
2. Realce de sintaxe avançado com Shiki para melhor legibilidade
3. Numeração de linhas automática
4. Opções para destacar linhas ou palavras importantes
5. Exibição de nome de arquivo para contexto
6. Realce de diferenças (diff) para mostrar mudanças
7. Foco em trechos específicos para destacar partes importantes
8. Visualização de espaços em branco
9. Estilo visual consistente com o tema do blog

Isso torna a experiência de leitura e utilização dos exemplos de código muito mais agradável e produtiva!
