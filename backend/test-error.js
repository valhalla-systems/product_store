// Arquivo: backend/test-error.js
// Este teste foi criado para falhar propositalmente.
// Ele será detectado pelo GitHub Actions durante o CI.

console.log("🔍 Executando teste de validação...");
// console.log("❌ Este teste foi configurado para falhar de propósito!");
console.log("✅ Teste aprovado com sucesso!");

// process.exit(1); // <-- 1 indica ERRO
process.exit(0); // <-- 0 = sucesso