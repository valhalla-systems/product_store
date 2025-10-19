import { create } from "zustand";

/*
----------------------------------------------------------
 🗂️ Store de Produtos (Zustand)
 Agora com suporte a upload de imagem via FormData.
----------------------------------------------------------
*/

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  // Criar produto com upload
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

    try {
      // ✅ Enviando via FormData (não mais JSON)
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", Number(newProduct.price));
      formData.append("description", newProduct.description || "");
      formData.append("image", newProduct.image); // arquivo do input

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData, // não usa Content-Type aqui
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
    set({ loading: true });
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (!res.ok) {
        console.error("Erro ao buscar produtos:", data.message);
        set({ loading: false });
        return { success: false, message: data.message };
      }

      set({ products: data.data, loading: false });
      return { success: true };
    } catch (error) {
      console.error("Erro na requisição:", error.message);
      set({ loading: false });
      return {
        success: false,
        message: "Falha na comunicação com o servidor.",
      };
    }
  },

  // Atualizar produto (com suporte a nova imagem)
  updateProduct: async (pid, updatedProduct) => {
    try {
      const formData = new FormData();
      if (updatedProduct.name) formData.append("name", updatedProduct.name);
      if (updatedProduct.price)
        formData.append("price", Number(updatedProduct.price));
      if (updatedProduct.description)
        formData.append("description", updatedProduct.description);
      if (updatedProduct.image instanceof File)
        formData.append("image", updatedProduct.image); // novo upload

      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        body: formData,
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
}));
