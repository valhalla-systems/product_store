// ✅ ARQUIVO: backend/controllers/product.controller.js
//----------------------------------------------------------
// Descrição: Controladores para manipular produtos no MongoDB
//----------------------------------------------------------

import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Buscar todos os produtos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Retorna todos os documentos da coleção
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

// Buscar um produto específico pelo ID
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

// Criar novo produto (com suporte a upload de imagem via Cloudinary)
export const createProduct = async (req, res) => {
  try {
    const product = req.body; // Dados enviados no body

    // Se o upload veio via multipart/form-data, o multer injeta req.file
    if (req.file && req.file.path) {
      product.image = req.file.path; // URL segura gerada pelo Cloudinary
    }

    // price === undefined garante que valores 0 são permitidos, mas valores ausentes não
    if (!product.name || product.price === undefined || !product.image) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const newProduct = new Product(product);
    await newProduct.save(); // Salva o documento no banco de dados

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

// Atualizar produto completamente (PUT substitui o documento inteiro)
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }

  try {
    // Garante que o corpo seja tratado corretamente mesmo em multipart/form-data
    const productData = { ...req.body };

    // Se houver nova imagem, substitui o campo "image"
    if (req.file && req.file.path) {
      productData.image = req.file.path;
    }

    // Converte o preço para número se vier como string
    if (productData.price !== undefined) {
      productData.price = Number(productData.price);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
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
    console.error("Erro ao atualizar produto:", error.message);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

// Atualização parcial (PATCH altera apenas os campos enviados)
export const patchProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }

  try {
    const updates = { ...req.body };

    // Atualiza a imagem se um novo arquivo for enviado
    if (req.file && req.file.path) {
      updates.image = req.file.path;
    }

    // Converte o preço se vier como string
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

// Deletar produto
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

//----------------------------------------------------------
// Fim do arquivo: backend/controllers/product.controller.js
//----------------------------------------------------------