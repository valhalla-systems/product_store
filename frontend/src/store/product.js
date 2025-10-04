import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  // Criar produto
  createProduct: async (newProduct) => {
    // Validação básica
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios.",
      };
    }

    // Flag para evitar chamadas duplicadas
    if (newProduct._isSubmitting) {
      return {
        success: false,
        message: "Aguarde, o produto já está sendo criado...",
      };
    }
    newProduct._isSubmitting = true;

    // Conversão do preço para número
    const productToSend = {
      ...newProduct,
      price: Number(newProduct.price),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToSend),
      });

      const data = await res.json();

      // Checagem de res.ok + padronização de erro
      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Erro ao criar produto.",
        };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return {
        success: true,
        message: data.message || "Produto criado com sucesso!",
      };
    } catch (error) {
      // Tratamento de erro mais robusto
      console.error("Erro na requisição:", error.message);
      return {
        success: false,
        message: "Falha na comunicação com o servidor.",
      };
    } finally {
      // Libera a flag após a tentativa
      delete newProduct._isSubmitting;
    }
  },

  // Buscar produtos
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      // Verificação de res.ok
      if (!res.ok) {
        console.error("Erro ao buscar produtos:", data.message);
        return { success: false, message: data.message };
      }

      set({ products: data.data });
      return { success: true };
    } catch (error) {
      // Tratamento de erro robusto
      console.error("Erro na requisição:", error.message);
      return {
        success: false,
        message: "Falha na comunicação com o servidor.",
      };
    }
  },

  // Deletar produto
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
      const data = await res.json();

      // Verificação de res.ok e sucesso
      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Erro ao excluir produto.",
        };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      // Tratamento de erro robusto
      console.error("Erro na requisição:", error.message);
      return {
        success: false,
        message: "Falha na comunicação com o servidor.",
      };
    }
  },

  // Atualizar produto
  updateProduct: async (pid, updatedProduct) => {
    // Conversão de preço se existir
    const productToSend = {
      ...updatedProduct,
      ...(updatedProduct.price && { price: Number(updatedProduct.price) }),
    };

    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToSend),
      });

      const data = await res.json();

      // Verificação de res.ok e sucesso
      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Erro ao atualizar produto.",
        };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      // Tratamento de erro robusto
      console.error("Erro na requisição:", error.message);
      return {
        success: false,
        message: "Falha na comunicação com o servidor.",
      };
    }
  },
}));
