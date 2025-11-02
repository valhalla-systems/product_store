// ✅ ARQUIVO: frontend/eslint.config.js
//----------------------------------------------------------
// Descrição: Configuração principal do ESLint para o projeto React + Vite
//----------------------------------------------------------

module.exports = {
  root: true, // Define este arquivo como a raiz da configuração do ESLint
  env: { 
    browser: true, // Habilita variáveis globais do navegador (window, document, etc.)
    es2020: true, // Define suporte à sintaxe moderna do ECMAScript 2020
  },
  
  // Conjuntos de regras pré-definidos recomendados para React e boas práticas gerais
  extends: [
    "eslint:recommended",             // Regras básicas recomendadas pelo ESLint
    "plugin:react/recommended",       // Regras específicas para componentes React
    "plugin:react/jsx-runtime",       // Ajusta regras para o novo JSX transform (React 17+)
    "plugin:react-hooks/recommended", // Boas práticas no uso de hooks (useEffect, useState, etc.)
  ],
  
  // Ignora arquivos/pastas onde a análise não é necessária
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  
  // Define o parser e o suporte à sintaxe de módulos ES
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  
  // Informa ao ESLint qual versão do React está sendo usada
  settings: { react: { version: "18.2" } },
  
  // Plugins adicionais usados para regras específicas
  plugins: ["react-refresh"],
  
  // Personalização das regras do projeto
  rules: {
    "react/prop-types": "off", // Desativa verificação de PropTypes (não usada com TypeScript ou props simples)
    "react/jsx-no-target-blank": "off", // Permite <a target="_blank"> sem exigir rel="noopener noreferrer"
    "react-refresh/only-export-components": [
      "warn", // Exibe aviso se componentes não forem exportados corretamente com React Refresh
      { allowConstantExport: true }, // Permite exportações constantes fora de componentes
    ],
  },
};

//----------------------------------------------------------
// Fim do arquivo eslint.config.js
//----------------------------------------------------------