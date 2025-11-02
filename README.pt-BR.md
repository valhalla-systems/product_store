[🇺🇸 English Version](./README.md)

# 🛍️ Product Store — Projeto CRUD Full-Stack (React + Node + MongoDB)

[![status](https://img.shields.io/badge/status-online-success)]()
[![author](https://img.shields.io/badge/author-Vagner%20Njord-blue)](https://github.com/vagner-njord)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📖 Descrição

O **Product Store** é um sistema **CRUD Full-Stack completo** para gerenciamento de produtos, desenvolvido com o **MERN Stack**:

- **Frontend:** React + Vite + Chakra UI
- **Gerenciamento de estado:** Zustand
- **Backend:** Node.js + Express
- **Banco de dados:** MongoDB Atlas
- **Hospedagem de imagens:** Cloudinary (modo _signed_, preset “Valhalla”)
- **Deploy:** Render (ou outro serviço compatível com Node.js)

O projeto foi desenvolvido passo a passo como parte do livro  
_**“React e o Ecossistema Full-Stack — Guia Completo de Desenvolvimento Moderno”**_,  
servindo também como **portfólio profissional**.

---

## ⚡ Funcionalidades principais

- Criar, listar, editar e remover produtos (CRUD completo)
- Interface moderna e responsiva com **Chakra UI**
- Comunicação RESTful entre **frontend ↔ backend**
- Integração com banco de dados **MongoDB Atlas**
- Upload de imagens com **compressão adaptativa e progresso em tempo real**
- **Spinner** sobreposto no preview durante o upload
- **Footer personalizado** com links e créditos
- Configuração pronta para produção (backend servindo o build do frontend)
- Exemplo de pipeline CI com **GitHub Actions**
- Integração com **Cloudinary (preset Valhalla, modo signed)**

---

## 🛠️ Tecnologias

### **Frontend**

- React + Vite
- Chakra UI
- Zustand (state management)
- Fetch API (comunicação com o backend Express)

### **Backend**

- Node.js
- Express
- Mongoose + MongoDB Atlas

### **Infraestrutura**

- Render.com (deploy)
- Git + GitHub (versionamento)
- GitHub Actions (CI/CD)
- Cloudinary (hospedagem e compressão de imagens)

---

## 🧱 Estrutura do Projeto

```bash
📂product_store/
│
├── 📂backend/                  # Express + MongoDB + API
│   ├── 📂config/
│   ├── 📂controllers/
│   ├── 📂middlewares/
│   ├── 📂models/
│   ├── 📂routes/
│   ├── 📃.env.example
│   ├── 📃package-lock.json
│   ├── 📃package.json
│   └── 📃server.js
│
├── 📂frontend/                 # React + Vite + Chakra UI
│   ├── 📂public/               # Favicons e manifesto
│   ├── 📂src/
│   │   ├── 📂components/       # ProductCard, Footer, Header, etc.
│   │   ├── 📂context/          # ModalContext
│   │   ├── 📂hooks/            # useImageUploader (compressão adaptativa)
│   │   ├── 📂pages/            # CreatePage, HomePage, etc.
│   │   ├── 📂store/            # Zustand global store
│   │   ├── 📃App.jsx
│   │   ├── 📃main.jsx
│   │   └── 📃theme.js
│   │
│   ├── 📃.gitignore
│   ├── 📃README.md
│   ├── 📃eslint.config.js
│   ├── 📃index.html
│   ├── 📃package-lock.json
│   ├── 📃package.json
│   └── 📃vite.config.js
│
├── 📂.github/workflows/        # Ações GitHub (CI/CD)
├── 📃.gitignore
├── 📃LICENSE
├── 📃README.md                 # Versão principal (Inglês)
└── 📃README.pt-BR.md           # Versão Português do Brasil
```

---

## 🚀 Deploy

🔗 [Acesse a aplicação online](https://product-store-2f2y.onrender.com/)

`https://product-store-2f2y.onrender.com/`

(Substitua o link acima pela URL real após o deploy no Render.)

---

## ⚙️ Configuração e execução local

### Pré-requisitos

- Node.js LTS (>= 18)

- npm

- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas)

- (opcional) [Cloudinary](https://cloudinary.com/) para hospedagem de imagens (plano grátis)

- (Opcional) Conta no [Render](https://render.com) para deploy

---

### 🔧 Configuração do ambiente por sistema operacional

#### 💡 Observações por sistema operacional

Ao configurar o projeto em um computador “limpo”, é importante garantir que o ambiente esteja preparado para executar comandos Node.js e npm.

As instruções abaixo ajudam a ajustar eventuais permissões e dependências básicas em Windows, macOS e Linux.

---

##### 💻 Windows

Antes de executar os comandos npm install ou npm run, verifique se o Node.js está instalado no sistema.

>🟢 Verificar instalação

```bash
node -v
npm -v
```

Se o terminal não reconhecer os comandos, instale o Node.js LTS (>= 18):

[Node.js](https://nodejs.org/pt) — Download oficial

O instalador inclui o npm (Node Package Manager).

>💡 Após a instalação, feche e reabra o terminal para que os comandos sejam reconhecidos.

---

O Windows pode exigir permissão para execução de scripts antes de usar comandos npm (como npm run dev ou npm start).

Execute o PowerShell em modo Administrador e digite:

`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

✅ Este comando autoriza a execução de scripts locais assinados digitalmente.

Para reverter a permissão (opcional):

`Set-ExecutionPolicy Undefined -Scope CurrentUser`

Recomenda-se usar o PowerShell ou o terminal integrado do VSCode.

Evite usar o Prompt de Comando (cmd), pois ele pode apresentar incompatibilidades com scripts npm.

---

##### 🍎 macOS

Instale o Node.js usando o [Homebrew](https://brew.sh/)

`brew install node`

O macOS já permite execução de scripts npm sem configurações adicionais.

Se houver algum erro de permissão ao instalar dependências:

`sudo chown -R $(whoami) ~/.npm`

Caso o Git ainda não esteja instalado (necessário para clonar repositórios):

`brew install git`

---

##### 🐧 Linux (Ubuntu, Debian, Fedora, etc.)

Instale Node.js e npm (versão LTS recomendada):

```bash
sudo apt update
sudo apt install -y nodejs npm
```

>💡 Alternativamente, use o Node Version Manager (nvm) para gerenciar múltiplas versões do Node.

Verifique se tudo está instalado corretamente:

```bash
node -v
npm -v
git --version
```

Caso enfrente problemas de permissão com o npm:

```bash
sudo chown -R $USER:$(id -gn $USER) ~/.config
sudo chown -R $USER:$(id -gn $USER) ~/.npm
```

Nenhuma configuração adicional de execução é necessária — o terminal Linux já permite scripts npm por padrão.

---

##### ✅ Dica universal

Antes de iniciar a instalação das dependências, verifique se os três comandos abaixo retornam suas respectivas versões:

```bash
node -v
npm -v
git --version
```

>🎯 Se todos responderem corretamente, o ambiente está pronto

---

### **Passo a passo**

1️⃣ Clonar o repositório

`git clone https://github.com/valhalla-systems/product_store.git`

`cd product_store`

2️⃣ Configurar variáveis de ambiente

`cd backend`

`cp .env.example .env`

Em seguida, edite o arquivo .env e adicione a conexão com o banco de dados:

`MONGO_URI=sua_string_de_conexao_mongodb`

> 💡 No MongoDB Atlas, crie um projeto denominado **mern-project** e crie um Cluster gratuito, configure um Database User com permissões de leitura e escrita e copie a string de conexão no formato:

`mongodb+srv://<USUARIO>:<SENHA>@cluster0.mongodb.net/<NOME_DO_BANCO>?retryWrites=true&w=majority&appName=Cluster0`

3️⃣ Configurar Cloudinary (upload de imagens)

1. Crie uma conta gratuita no Cloudinary.

2. No painel, vá em Settings → Upload → Upload Presets → Add Upload Preset.

3. Configure o preset chamado Valhalla com as seguintes definições:

_Mode: Signed_

_Overwrite: true_

_Use filename: true (preservar nome original)_

_Unique filename: true (evitar colisões)_

_Use filename as display name: true_

_Type: upload_

4. Copie suas credenciais (cloud name, API key e API secret).

5. No arquivo .env, adicione:

```bash
CLOUDINARY_CLOUD_NAME=seu_cloudinary_cloud_name
CLOUDINARY_API_KEY=sua_cloudinary_api_key
CLOUDINARY_API_SECRET=sua_cloudinar_api_secret
```

> ⚠️ Importante: o plano gratuito do Cloudinary impõe restrições de resolução e tamanho máximo das imagens.

#### Arquivo .env completo

```bash
MONGO_URI=sua_string_de_conexao_mongodb
PORT=5000
CLOUDINARY_CLOUD_NAME=seu_cloudinary_cloud_name
CLOUDINARY_API_KEY=sua_cloudinary_api_key
CLOUDINARY_API_SECRET=sua_cloudinar_api_secret
NODE_ENV=development
```

4️⃣ Instalar dependências

```bash
cd backend && npm install
cd ../frontend && npm install
```

5️⃣ Rodar em modo de desenvolvimento

> ⚠️ Observação importante:
> O frontend se comunica com o backend através da rota _/api_.
> Portanto, **o backend deve estar rodando antes** de iniciar o frontend.

#### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

#### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Acesse: http://localhost:5173

6️⃣ Rodar em modo de produção (local)

```bash
cd frontend
npm run build
cd ../backend
npm run start
```

Acesse: http://localhost:5000

---

## 📦 Scripts npm

### Frontend

```bash
npm run dev # Inicia o servidor Vite

npm run build # Compila o projeto para produção

npm run preview # Visualiza o build localmente
```

### Backend

```bash
npm run dev # Executa com Nodemon

npm run start # Inicia em modo produção
```

---

## ☁️ Deploy no Render

1. Crie uma conta em Render.com.

2. Clique em New → Web Service → Connect to GitHub Repository.

3. Escolha o repositório product_store.

4. Configure:

**Root Directory:** `backend`

**Build Command:** `npm install && cd ../frontend && npm install && npm run build && cd ../backend`

**Start Command:** `npm start`

5. Adicione as variáveis de ambiente do .env na aba Environment Variables.

Após o deploy, o backend servirá automaticamente o build do frontend.

---

## 📘 Boas práticas

Nunca versionar .env — use .env.example

Commits pequenos e descritivos (feat:, fix:, docs:)

Branches separadas por feature (feature/nova-funcionalidade)

Testar o build local antes do deploy (npm run build + npm run start)

Configurar corretamente variáveis no Render

Usar cross-env para compatibilidade entre Windows e Linux

---

## 🧠 Destaques técnicos

Compressão adaptativa de imagens com preview e spinner sobreposto

Integração Cloudinary Signed Upload (preset “Valhalla”)

Toasts informativos e feedback visual em tempo real

Footer moderno e responsivo

Pipeline CI/CD com GitHub Actions

Backend servindo o build do frontend (modo produção)

---

## 🧑‍💻 Comandos Git úteis

```bash
git init

git add .

git commit -m "primeiro commit"

git branch -M main

git remote add origin https://github.com/valhalla-systems/product_store.git

git push -u origin main
```

---

## 🖼️ Interface

**Demonstração no Youtube**

[![Demonstração no Youtube](https://img.youtube.com/vi/MY7LsosRVgQ/hqdefault.jpg)](https://www.youtube.com/watch?v=MY7LsosRVgQ)

---

## ✨ Autor

**Vagner Njord**

🧭 Arquiteto de Sistemas | Autor de React e o Ecossistema Full-Stack

🔗 [LinkedIn](https://www.linkedin.com/in/vagner-bsilva) | [GitHub](https://github.com/valhalla-systems) | [Youtube](https://www.youtube.com/@Valhalla-Systems)

---

## 📜 Licença

Licença MIT — sinta-se livre para usar este projeto em estudos ou como base para o seu próprio portfólio.
