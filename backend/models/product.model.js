// ✅ ARQUIVO: backend/models/product.model.js
//----------------------------------------------------------
// Descrição: Definição do modelo de dados para produtos no MongoDB
//----------------------------------------------------------

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Não permitir preço negativo
    },
    // URL da imagem do produto
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Cria automaticamente os campos createdAt e updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

//----------------------------------------------------------
// Fim do arquivo backend/models/product.model.js
//----------------------------------------------------------