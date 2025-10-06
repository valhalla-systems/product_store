import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Buscar todos
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

// Buscar por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID inválido." });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Erro ao buscar produto:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro ao buscar produto." });
  }
};

// Criar produto
export const createProduct = async (req, res) => {
  const product = req.body;
  // Aqui, price undefined permite 0, e nega menor do que 0
  if (!product.name || !product.price === undefined || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: `Produto "${newProduct.name}" criado com sucesso.`,
      data: newProduct,
    });
  } catch (error) {
    console.error("Erro ao salvar o produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

// Atualizar por completo (PUT)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true, // garante validação ao atualizar
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }

    res.status(200).json({
      success: true,
      message: `Produto "${updatedProduct.name}" atualizado com sucesso.`,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

// Atualizar parcial (PATCH)
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
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }

    res.status(200).json({
      success: true,
      message: `Produto "${updatedProduct.name}" atualizado com sucesso.`,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Erro ao atualizar parcialmente o produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

// Deletar
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

    res.status(200).json({
      success: true,
      message: `Produto "${deletedProduct.name}" removido com sucesso.`,
    });
  } catch (error) {
    console.error("Erro ao deletar produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};
