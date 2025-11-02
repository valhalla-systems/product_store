[🇧🇷 Portuguese Version](./README.pt-BR.md)

# 🛍️ Product Store — Full-Stack CRUD Project (React + Node + MongoDB)

[![status](https://img.shields.io/badge/status-online-success)]()
[![author](https://img.shields.io/badge/author-Vagner%20Njord-blue)](https://github.com/vagner-njord)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📖 Description

**Product Store** is a complete **Full-Stack CRUD system** for product management, developed with the **MERN Stack**:

- **Frontend:** React + Vite + Chakra UI
- **State Management:** Zustand
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Image Hosting:** Cloudinary (signed mode, “Valhalla” preset)
- **Deployment:** Render (or any Node-compatible hosting service)

This project was built step by step as part of the book  
_**“React and the Full-Stack Ecosystem — A Complete Guide to Modern Development”**_,  
and also serves as a **professional portfolio application**.

---

## ⚡ Main Features

- Create, list, edit, and delete products (full CRUD)
- Modern and responsive UI using **Chakra UI**
- RESTful communication between **frontend ↔ backend**
- Integration with **MongoDB Atlas**
- Image upload with **adaptive compression and real-time progress**
- **Spinner overlay** during image upload preview
- **Custom footer** with links and credits
- Ready for production: backend serving the frontend build
- Example **CI pipeline with GitHub Actions**
- Integrated **Cloudinary Signed Upload (Valhalla preset)**

---

## 🛠️ Technologies

### **Frontend**

- React + Vite
- Chakra UI
- Zustand (state management)
- Fetch API (communication with Express backend)

### **Backend**

- Node.js
- Express
- Mongoose + MongoDB Atlas

### **Infrastructure**

- Render.com (deployment)
- Git + GitHub (version control)
- GitHub Actions (CI/CD)
- Cloudinary (image hosting and compression)

---

## 🧱 Project Structure

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
│   ├── 📂public/               # Favicons and manifest
│   ├── 📂src/
│   │   ├── 📂components/       # ProductCard, Footer, Header, etc.
│   │   ├── 📂context/          # ModalContext
│   │   ├── 📂hooks/            # useImageUploader (adaptive compression)
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
├── 📂.github/workflows/        # GitHub Actions (CI/CD)
├── 📃.gitignore
├── 📃LICENSE
├── 📃README.md                 # Main (English) version
└── 📃README.pt-BR.md           # Brazilian Portuguese version
```

---

## 🚀 Deployment

🔗 [Access the live app](https://product-store-2f2y.onrender.com/)

`https://product-store-2f2y.onrender.com/`

(Replace the link above with your real Render deployment URL.)

---

## ⚙️ Local Setup

### Requirements

- Node.js LTS (>= 18)

- npm

- [MongoDB Atlas](https://www.mongodb.com/atlas) account

- (optional) [Cloudinary](https://cloudinary.com/) account for image hosting (free plan)

- (optional) [Render](https://render.com) account for deployment

---

### 🔧 Environment setup by operating system

#### 💡 Notes by operating system

When setting up the project on a “clean” computer, it is important to ensure that the environment is prepared to run Node.js and npm commands.

The instructions below help adjust permissions and basic dependencies on Windows, macOS, and Linux.

---

##### 💻 Windows

Before running npm install or npm run commands, check whether Node.js is installed on the system.

>🟢 Check installation

```bash
node -v
npm -v
```

If the terminal does not recognize the commands, install Node.js LTS (>= 18):

[Node.js](https://nodejs.org/pt) — Official download

The installer includes npm (Node Package Manager).

>💡 After installation, close and reopen the terminal so the commands are recognized.

---

Windows may require permission to execute scripts before using npm commands (such as npm run dev or npm start).

Open PowerShell in Administrator mode and run:

`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

✅ This command allows the execution of locally stored digital-signed scripts.

To revert the permission (optional):

`Set-ExecutionPolicy Undefined -Scope CurrentUser`

It is recommended to use PowerShell or the integrated VSCode terminal.

Avoid using the Command Prompt (cmd), as it may present incompatibilities with npm scripts.

---

##### 🍎 macOS

Install Node.js using [Homebrew](https://brew.sh/)

`brew install node`

macOS already allows npm script execution without additional configuration.

If you encounter any permission issues when installing dependencies:

`sudo chown -R $(whoami) ~/.npm`

If Git is not installed yet (required to clone repositories):

`brew install git`

---

##### 🐧 Linux (Ubuntu, Debian, Fedora, etc.)

Install Node.js and npm (recommended LTS version):

```bash
sudo apt update
sudo apt install -y nodejs npm
```

>💡 Alternatively, use Node Version Manager (nvm) to manage multiple Node versions.

Verify everything is installed correctly:

```bash
node -v
npm -v
git --version
```

If you experience permission issues with npm:

```bash
sudo chown -R $USER:$(id -gn $USER) ~/.config
sudo chown -R $USER:$(id -gn $USER) ~/.npm
```

No additional execution configuration is required — the Linux terminal allows npm scripts by default.

---

##### ✅ Universal tip

Before installing dependencies, ensure the three commands below return their version numbers:

```bash
node -v
npm -v
git --version
```

>🎯 If all respond correctly, the environment is ready.

---

### **Step-by-step**

1️⃣ Clone the repository

`git clone https://github.com/valhalla-systems/product_store.git`

`cd product_store`

2️⃣ Configure environment variables

`cd backend`

`cp .env.example .env`

Then, open .env and add your MongoDB connection string:

`MONGO_URI=your_mongodb_connection_string`

> 💡 In MongoDB Atlas, create a project named mern-project, set up a free Cluster, create a Database User with read/write access, and copy your connection string in the format:

`mongodb+srv://<USER>:<PASSWORD>@cluster0.mongodb.net/<DB_NAME>?retryWrites=true&w=majority&appName=Cluster0`

3️⃣ Configure Cloudinary (image upload)

1. Create a free Cloudinary account.

2. In the dashboard, go to: Settings → Upload → Upload Presets → Add Upload Preset.

3. Create a preset named Valhalla with these settings:

_Mode: Signed_

_Overwrite: true_

_Use filename: true_

_Unique filename: true_

_Use filename as display name: true_

_Type: upload_

4. Copy your credentials (cloud name, API key, API secret).

5. In your .env, add:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ Note: The free Cloudinary plan has image size and resolution limits.

#### Complete .env file

```bash
MONGO_URI=your_mongo_uri_here
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudnary_name_here
CLOUDINARY_API_KEY=your_cloudnary_key_here
CLOUDINARY_API_SECRET=your_cloudnary_secret_here
NODE_ENV=development
```

4️⃣ Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

5️⃣ Run in development mode

>⚠️ Important note:
>The frontend communicates with the backend through the _/api_ route.
>Therefore, **the backend must be running before** starting the frontend.

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

Then open: http://localhost:5173

6️⃣ Run in production mode (locally)

```bash
cd frontend
npm run build
cd ../backend
npm run start
```

Then open: http://localhost:5000

---

## 📦 npm Scripts

### Frontend

```bash
npm run dev # Start Vite development server

npm run build # Build for production

npm run preview # Preview local production build
```

### Backend

```bash
npm run dev # Run with Nodemon

npm run start # Start production server
```

---

## ☁️ Deploy on Render

1. Create an account on Render.com.

2. Click New → Web Service → Connect to GitHub Repository.

3. Select your product_store repository.

4. Set up with the following settings:

**Root Directory:** `backend`

**Build Command:** `npm install && cd ../frontend && npm install && npm run build && cd ../backend`

**Start Command:** `npm start`

5. Add your .env variables in the Environment Variables section.

After deployment, the backend will automatically serve the built frontend.

---

## 📘 Best Practices

Never commit .env — use .env.example

Write small, descriptive commits (feat:, fix:, docs:)

Use feature branches (feature/new-feature)

Test your local build before deploying (npm run build + npm run start)

Properly configure Render environment variables

Use cross-env for Windows/Linux compatibility

---

## 🧠 Technical Highlights

Adaptive image compression with live preview and overlay spinner

Cloudinary Signed Upload integration (Valhalla preset)

Toast notifications and real-time feedback

Responsive modern footer

CI/CD pipeline with GitHub Actions

Backend serving frontend build in production

---

## 🧑‍💻 Useful Git Commands

```bash
git init

git add .

git commit -m "first commit"

git branch -M main

git remote add origin https://github.com/valhalla-systems/product_store.git

git push -u origin main
```

---

## 🖼️ Interface

**Demo on Youtube**

[![Demo on Youtube](https://img.youtube.com/vi/MY7LsosRVgQ/hqdefault.jpg)](https://www.youtube.com/watch?v=MY7LsosRVgQ)

---

## ✨ Author

**Vagner Njord**

🧭 Systems Architect | Author of React and the Full-Stack Ecosystem

🔗 [LinkedIn](https://www.linkedin.com/in/vagner-bsilva) | [GitHub](https://github.com/valhalla-systems) | [Youtube](https://www.youtube.com/@Valhalla-Systems)

---

## 📜 License
MIT License — feel free to use this project for learning or as a foundation for your own portfolio.
