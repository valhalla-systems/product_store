import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
  patchProduct,
} from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js"; // ✅ Novo middleware de upload

/*
----------------------------------------------------------
 Rotas de Produtos
 Agora com suporte a upload via Cloudinary
----------------------------------------------------------
*/

const router = express.Router();

// Criar produto (com imagem)
router.post("/", upload.single("image"), createProduct);

// Atualizar produto (com imagem)
router.put("/:id", upload.single("image"), updateProduct);

// Atualização parcial (PATCH) com imagem opcional
router.patch("/:id", upload.single("image"), patchProduct);

// Buscar e deletar
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;
