// ✅ ARQUIVO: backend/routes/product.route.js
//----------------------------------------------------------
// Descrição: Rotas para manipulação de produtos
//----------------------------------------------------------

import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
  patchProduct,
} from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js"; // Middleware responsável pelo upload (Cloudinary)

const router = express.Router();

// Rotas relacionadas ao recurso "products" (CRUD completo)

// Criar produto (suporte a upload de imagem)
router.post("/", upload.single("image"), createProduct);

// Atualizar produto completamente (PUT substitui o documento inteiro)
router.put("/:id", upload.single("image"), updateProduct);

// Atualização parcial (PATCH) com imagem opcional
router.patch("/:id", upload.single("image"), patchProduct);

// Buscar todos os produtos
router.get("/", getProducts);

// Buscar produto por ID
router.get("/:id", getProductById);

// Deletar produto por ID
router.delete("/:id", deleteProduct);

export default router;

//----------------------------------------------------------
// Fim do arquivo: backend/routes/product.route.js
//----------------------------------------------------------