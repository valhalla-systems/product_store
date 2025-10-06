import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  loading: false, // ✅ ADICIONADO: estado de carregamento

  setProducts: (products) => set({ products }),

  // Criar produto
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios.",
      };
    }

    if (newProduct._isSubmitting) {
      return {
        success: false,
        message: "Aguarde, o produto já está sendo criado...",
      };
    }
    newProduct._isSubmitting = true;

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
      console.error("Erro na requisição:", error.message);
      return {
        success: false,
        message: "Falha na comunicação com o servidor.",
      };
    } finally {
      delete newProduct._isSubmitting;
    }
  },

  // Buscar produtos
  fetchProducts: async () => {
    set({ loading: true }); // ✅ ADICIONADO: inicia carregamento
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (!res.ok) {
        console.error("Erro ao buscar produtos:", data.message);
        set({ loading: false }); // ✅ ADICIONADO
        return { success: false, message: data.message };
      }

      set({ products: data.data, loading: false }); // ✅ ADICIONADO
      return { success: true };
    } catch (error) {
      console.error("Erro na requisição:", error.message);
      set({ loading: false }); // ✅ ADICIONADO
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
      console.error("Erro na requisição:", error.message);
      return {
        success: false,
        message: "Falha na comunicação com o servidor.",
      };
    }
  },

  // Atualizar produto
  updateProduct: async (pid, updatedProduct) => {
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
      console.error("Erro na requisição:", error.message);
      return {
        success: false,
        message: "Falha na comunicação com o servidor.",
      };
    }
  },
}));
