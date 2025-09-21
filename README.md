## 🛍️ Product Store — Projeto CRUD Full-Stack (React + Node + MongoDB)

[![status](https://img.shields.io/badge/status-deployed-success)]()
[![author](https://img.shields.io/badge/author-Vagner%20Njord-blue)](https://github.com/vagner-njord)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📖 Descrição

Este projeto é um **sistema completo de gerenciamento de produtos (CRUD)**, desenvolvido no formato **MERN Stack** usando:

- **Frontend**: React + Vite + Chakra UI
- **State**: Zustand
- **Backend**: Node.js + Express
- **Banco**: MongoDB (Atlas)
- **Deploy**: Render (ou similar)

Ele foi construído passo a passo como parte do livro _React e o Ecossistema Full-Stack_, servindo também como **portfólio profissional**.

---

## ⚡ Funcionalidades principais:

- Criar, listar, editar e remover produtos
- UI responsiva e moderna com Chakra UI
- Integração completa RESTful frontend ↔ backend com autenticação via ↔ banco MongoDB Atlas
- Configuração para produção (backend serve frontend compilado)
- Exemplos de CI (GitHub Actions)
- Deploy em produção (Render.com)

---

## 🛠️ Tecnologias

**Frontend**

- React + Vite
- Chakra UI
- Zustand (state management)

**Backend**

- Node.js
- Express
- Mongoose + MongoDB Atlas

**Infraestrutura**

- Render.com (deploy)
- Git + GitHub (controle de versão)
- GitHub Actions (CI/CD básico)

---

## 🚀 Deploy

🔗 [Acesse a aplicação online](https://product-store-vao3.onrender.com/)

_(Edite o link acima com a URL real do Render após o deploy.)_

---

## ⚙️ Como rodar localmente

## Pré-requisitos

- Node.js LTS (>= 18)
- npm
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) ou instância local
- (Opcional) conta no Render para deploy

---

## Como rodar localmente (desenvolvimento)

1. Clone o repositório:
   git clone https://github.com/valhalla-systems/product_store.git
   cd product_store

Configure variáveis de ambiente:

cd backend
cp .env.example .env

# Edite .env e adicione sua MONGO_URI

Instale dependências:

cd backend && npm install
cd ../frontend && npm install

Rodando em desenvolvimento:

# Terminal 1 (backend)

cd backend
npm run dev

# Terminal 2 (frontend)

cd frontend
npm run dev

Rodando em produção (local):

cd frontend
npm run build

cd ../backend
npm run start

# Acesse em http://localhost:5000

🧑‍💻 Comandos Git úteis

git init # inicializa repositório local

git add . # adiciona alterações

git commit -m "mensagem" # cria commit

git branch -M main # renomeia branch principal

git remote add origin URL # vincula repositório GitHub

git push -u origin main # envia alterações

📘 Boas práticas

Nunca versionar .env (use .env.example no lugar)

Commits pequenos e mensagens claras (feat:, fix:, docs:)

Branches por feature (feature/nome)

Testar build local antes do deploy (npm run build + npm run start)

Configurar variáveis no Render em Environment Variables

🔑 Aprendizados técnicos

Uso do cross-env para compatibilidade entre Windows/Linux

Diferença entre ambiente dev e production

CI/CD com GitHub Actions

Deploy no Render (backend servindo frontend)

✨ Autor

Vagner Njord

📌 Arquiteto de Sistemas | Escritor de React e o Ecossistema Full-Stack

🔗 [LinkedIn](https://www.linkedin.com/in/vagner-bsilva) | [GitHub](https://github.com/valhalla-systems)

📜 Licença

MIT License — sinta-se livre para usar este projeto em estudos ou como base para seu próprio portfólio.
