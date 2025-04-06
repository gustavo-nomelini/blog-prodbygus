---
title: 'Demonstração de Blocos de Código Aprimorados'
description: 'Uma demonstração dos novos blocos de código com botão de cópia, numeração de linhas e realce de sintaxe avançado usando Shiki e rehype-pretty-code.'
pubDate: '2023-04-06'
categories: ['desenvolvimento', 'web', 'tutorial']
tags: ['markdown', 'código', 'astro', 'blog', 'shiki', 'syntax-highlighting']
heroImage: '/images/blog/code-demo.jpg'
---

# Demonstração de Blocos de Código Aprimorados

Neste post, vamos demonstrar os recursos aprimorados dos blocos de código no blog, agora usando **Shiki** e **rehype-pretty-code** para uma experiência visual superior:

- **Bordas brancas** para maior contraste e identificação visual
- Botão para copiar código para o clipboard
- **Numeração de linhas** automática
- **Realce de sintaxe avançado** para várias linguagens
- Destaque de linhas específicas
- Destaque de palavras-chave
- **Identificação da linguagem** no topo do bloco
- Exibição de nome do arquivo
- Visualização de diferenças (diff)
- Efeito de foco em trechos específicos

## JavaScript com Numeração de Linhas e Borda Destacada

Veja como criar uma função simples em JavaScript com numeração automática de linhas:

```javascript showLineNumbers
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

## TypeScript com Destaque de Linha

O código abaixo mostra uma interface e classe em TypeScript com destaque nas linhas importantes:

```typescript {3-5,11} showLineNumbers
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

## Destaque de Palavras Específicas

Veja como destacar palavras específicas em um código-fonte React:

```jsx /useState|useEffect|props|children/ showLineNumbers
import React, { useState, useEffect } from 'react';

// Componente de Card com props tipadas
function Card(props) {
  const { title, description, children } = props;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Registra quando o card é expandido
    if (expanded) {
      console.log(`Card "${title}" foi expandido`);
    }
  }, [expanded, title]);

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>

      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Recolher' : 'Expandir'}</button>

      {expanded && <div className="card-content">{children}</div>}
    </div>
  );
}

export default Card;
```

## HTML com Nome de Arquivo

Veja um exemplo de código HTML com nome de arquivo no topo:

```html title="index.html" showLineNumbers
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

```js title="config.js" showDiff showLineNumbers
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

## Foco em Trechos Específicos

Destaque apenas as partes importantes do código:

```python title="app.py" /!focus/ showLineNumbers
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

## CSS com Realce de Syntax Aprimorado

Exemplo de CSS com realce de sintaxe aprimorado:

```css showLineNumbers
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

## Bash com Exemplos de Comandos

Aqui estão alguns comandos úteis para desenvolvimento:

```bash showLineNumbers
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

## JSON com Nome de Arquivo e Numeração

Configuração de um arquivo package.json:

```json title="package.json" showLineNumbers
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

## Grupos de Linhas com IDs

Você pode agrupar linhas destacadas com IDs diferentes para estilizá-las de maneira única:

```typescript {2-4}#imports {7-9}#interface {12-14}#methods showLineNumbers
// Exemplo com diferentes grupos de destaque
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

// Interface do componente
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Componente de botão personalizado
function Button({ label, onClick }: ButtonProps) {
  const handleClick = () => onClick();
  return <button onClick={handleClick}>{label}</button>;
}

export default Button;
```

## Destacando Caracteres com IDs

Você pode destacar caracteres específicos e agrupá-los com IDs diferentes:

```javascript /variável/#v /const/#c /let/#c /função/#f /return/#r showLineNumbers
// Exemplo de diferentes tipos de declarações
const nome = 'PRODBYGUS'; // const é uma declaração de constante
let idade = 30; // let é uma variável que pode ser reatribuída
var antiga = true; // var é uma variável antiga (não recomendada)

// Uma função que usa essas variáveis
function exibirInfo() {
  return `Nome: ${nome}, Idade: ${idade}`; // return retorna o valor
}
```

## Espaços em Branco Visíveis

Este exemplo mostra espaços em branco visíveis para melhor compreensão da indentação:

```python showLineNumbers
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

## Código Inline

Também é possível utilizar código inline com realce de sintaxe, como `const count = 0;`{:js} ou `const [state, setState] = useState(null);`{:jsx}. Isto é muito útil para referenciar variáveis ou funções mencionadas no texto.

## Conclusão

Com essas melhorias, os blocos de código no blog agora têm:

1. **Borda branca** para maior destaque e contraste visual
2. **Identificação de linguagem** no topo do bloco
3. **Botão de copiar** para facilitar o reuso de código
4. **Realce de sintaxe avançado** com Shiki e rehype-pretty-code
5. **Numeração de linhas** automática
6. Opções para **destacar linhas** ou **palavras importantes**
7. Exibição de **nome de arquivo** para contexto
8. Realce de **diferenças (diff)** para mostrar mudanças
9. **Agrupamento** de linhas e caracteres com IDs para estilização específica
10. **Visualização de espaços em branco**
11. Estilo visual consistente com o tema cyberpunk do blog

Isso torna a experiência de leitura e utilização dos exemplos de código muito mais agradável e produtiva!
