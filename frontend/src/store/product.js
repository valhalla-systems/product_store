// ✅ ARQUIVO: frontend/src/store/product.js
//----------------------------------------------------------
// Descrição: Store Zustand para gerenciamento de produtos
//----------------------------------------------------------

import { create } from "zustand";

export const useProductStore = create((set) => ({

  // -------------------------------------------------------------
  // 🔹 Estado global principal
  // -------------------------------------------------------------

  // Indica se há algum modal aberto na aplicação
  isAnyModalOpen: false,

  // Permite alterar o estado global dos modais
  setIsAnyModalOpen: (v) =>
  set({ isAnyModalOpen: v }),
  
  // Lista global de produtos carregados do backend
  products: [],

  // Indica se há operação de carregamento em andamento
  loading: false,

  // Atualiza toda a lista de produtos de uma vez
  setProducts: (products) => set({ products }),

  // -------------------------------------------------------------
  // 🔸 Criar produto (com upload de imagem)
  // -------------------------------------------------------------
  // Envia os dados do produto usando FormData para incluir o arquivo de imagem.
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || newProduct.price === undefined || newProduct.price === null) {
      return {
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios.",
      };
    }

    // Evita múltiplos envios simultâneos do mesmo produto
    if (newProduct._isSubmitting) {
      return {
        success: false,
        message: "Aguarde, o produto já está sendo criado...",
      };
    }
    newProduct._isSubmitting = true;

    try {
      // Envio via FormData para suportar imagens (multipart/form-data)
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", Number(newProduct.price));
      formData.append("description", newProduct.description || "");
      formData.append("image", newProduct.image); // arquivo do input

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Erro ao criar produto.",
        };
      }

      // Atualiza o estado global adicionando o novo produto à lista existente
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
      
      // Remove a flag de bloqueio de envio duplicado
      delete newProduct._isSubmitting;
    }
  },

  // -------------------------------------------------------------
  // 🔸 Buscar produtos
  // -------------------------------------------------------------
  // Obtém a lista de produtos diretamente do backend e atualiza o estado global.
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

  // -------------------------------------------------------------
  // 🔸 Atualizar produto (com suporte a nova imagem)
  // -------------------------------------------------------------
  // Envia os campos alterados via FormData, incluindo imagem opcional.
  updateProduct: async (pid, updatedProduct) => {
    try {
      const formData = new FormData();

      if (updatedProduct.name) formData.append("name", updatedProduct.name);
      if (updatedProduct.price !== undefined && updatedProduct.price !== null) {
        formData.append("price", Number(updatedProduct.price));
      }

      if (updatedProduct.description)
        formData.append("description", updatedProduct.description);

      // Apenas adiciona a imagem se for um novo arquivo (File ou Blob)
      if (
        updatedProduct.image &&
        (updatedProduct.image instanceof File ||
          updatedProduct.image instanceof Blob)
      ) {
        formData.append("image", updatedProduct.image);
      }

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

      // Substitui o produto alterado mantendo o restante da lista
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

  // -------------------------------------------------------------
  // 🔸 Deletar produto
  // -------------------------------------------------------------
  // Remove o produto tanto no backend quanto no estado global.
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

      // Atualiza a lista removendo o produto correspondente
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

//----------------------------------------------------------
// Fim do arquivo product.js
//----------------------------------------------------------