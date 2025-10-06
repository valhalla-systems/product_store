import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String, // O nome do produto será sempre uma string
      required: true, // Campo obrigatório: não pode ser salvo sem um nome
    },
    price: {
      type: Number, // O preço deve ser numérico (ex.: 99.90)
      required: true, // Também é obrigatório
      min: 0, // O preço não pode ser negativo
    },
    image: {
      type: String, // Aqui guardamos a URL da imagem
      required: true, // Também obrigatório
    },
  },
  {
    timestamps: true, // Cria automaticamente os campos createdAt e updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
