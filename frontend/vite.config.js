// ✅ ARQUIVO: frontend/vite.config.js
//----------------------------------------------------------
// Descrição: Configuração do Vite para o projeto React
//----------------------------------------------------------

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração principal do Vite
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {

      // Redireciona chamadas iniciadas por /api para o servidor backend local
      // Útil para evitar problemas de CORS durante o desenvolvimento
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Aumenta o limite do aviso de tamanho dos chunks de build
    // (sem efeito negativo; apenas evita mensagens de alerta no terminal)
    chunkSizeWarningLimit: 1600,
  },
});

//----------------------------------------------------------
// Fim do arquivo frontend/vite.config.js
//----------------------------------------------------------