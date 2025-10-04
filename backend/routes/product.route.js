import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
  patchProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.patch("/:id", patchProduct);

export default router;
