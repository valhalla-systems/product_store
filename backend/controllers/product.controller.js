// ✅ ARQUIVO: backend/controllers/product.controller.jsjs

import mongoose from "mongoose";
import Product from "../models/product.model.js";

/*
----------------------------------------------------------
 Controlador de Produtos
 Agora com suporte a upload via Cloudinary
----------------------------------------------------------
*/

// 📦 Buscar todos os produtos
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

// 🔍 Buscar produto por ID
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
    res.status(500).json({
      success: false,
      message: "Erro ao buscar produto.",
    });
  }
};

// ➕ Criar produto (com suporte a upload Cloudinary)
export const createProduct = async (req, res) => {
  try {
    const product = req.body;

    // Se o upload veio via multipart/form-data, o multer injeta req.file
    if (req.file && req.file.path) {
      product.image = req.file.path; // URL segura do Cloudinary
    }

    if (!product.name || product.price === undefined || !product.image) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const newProduct = new Product(product);
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: `Produto "${newProduct.name}" criado com sucesso.`,
      data: newProduct,
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

// 🔄 Atualizar produto (PUT)
// 🔄 Atualizar produto (PUT)
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }

  try {
    // 🧩 Garantir que o req.body seja um objeto mesmo em multipart/form-data
    const productData = { ...req.body };

    // Cloudinary injeta o caminho da imagem em req.file.path
    if (req.file && req.file.path) {
      productData.image = req.file.path;
    }

    // Converte o preço para número se vier como string
    if (productData.price !== undefined) {
      productData.price = Number(productData.price);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
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
    console.error("Erro ao atualizar produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

// ✏️ Atualizar parcialmente (PATCH)
export const patchProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }

  try {
    const updates = { ...req.body };

    if (req.file && req.file.path) {
      updates.image = req.file.path;
    }

    if (updates.price !== undefined) {
      updates.price = Number(updates.price);
    }

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
    console.error("Erro ao atualizar parcialmente:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

// ❌ Deletar produto
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
