// ✅ ARQUIVO: backend/server.js
//----------------------------------------------------------
// Descrição: Inicialização do servidor Express + conexão MongoDB
//----------------------------------------------------------

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Habilita o parsing do corpo das requisições JSON

// Necessário para lidar com formulários multipart (ex.: upload de imagem)
app.use(express.urlencoded({ extended: true }));

// Rotas relacionadas ao recurso "products"
app.use("/api/products", productRoutes);

// Servindo o frontend em produção
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Conectar ao banco e só depois iniciar o servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao banco:", error.message);
    process.exit(1); // encerra a aplicação em caso de falha crítica na conexão
  });

//----------------------------------------------------------
// Fim do arquivo backend/server.js
//----------------------------------------------------------
