// Arquivo: frontend/test-front.js
console.log("🔍 Rodando testes simulados do frontend...");

// Vamos simular um erro típico de frontend:
const tituloEsperado = "Loja de Produtos";
// const tituloRenderizado = "Loja de ProdutosX"; // ❌ errado de propósito
const tituloRenderizado = "Loja de Produtos"; // ✅ erro corrigido

if (tituloEsperado !== tituloRenderizado) {
    console.error("❌ Erro: O título renderizado não corresponde ao esperado!");
    process.exit(1); // falha
}

console.log("✅ Testes do frontend passaram!");
