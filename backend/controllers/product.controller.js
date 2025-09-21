import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // O cliente enviará os dados do produto no corpo da requisição

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Erro ao salvar o produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

export const patchProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Erro ao atualizar parcialmente o produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }

    res
      .status(200)
      .json({ success: true, message: "Produto removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover o produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};
