# Email Analyst 

Interface web para classificação inteligente de emails utilizando a API do Gemini.

## Tecnologias

- **React 19** - Biblioteca UI
- **Vite 7** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **TailwindCSS 4** - Estilização
- **React Hook Form + Zod** - Gerenciamento e validação de formulários
- **Axios** - Cliente HTTP

## Pré-requisitos

- Node.js 20.19+ e npm/yarn/pnpm instalados
- Backend da aplicação rodando (veja [repositório do backend](https://github.com/gabrielsouzam/email-analyst-api))

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/gabrielsouzam/email-analyst.git
cd email-analyst

# Instale as dependências
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:5000
```

> **Nota:** Ajuste a URL para o endereço onde seu backend está rodando.

## Como rodar o projeto

### Modo Desenvolvimento
```bash
npm run dev
```
Acesse: `http://localhost:5173`


## Funcionalidades

- Upload de arquivos (.txt, .pdf)
- Entrada manual de texto de email
- Classificação automática (Produtivo/Improdutivo)
- Sugestão de resposta automática

## Deploy

- A aplicação pode ser acessada [Clicando aqui](https://email-analyst.vercel.app/)

## Autor

Desenvolvido por Gabriel Mendes 💙!