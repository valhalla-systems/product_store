// ✅ ARQUIVO: frontend/src/main.jsx
//----------------------------------------------------------
// Descrição: Ponto de entrada da aplicação React
//----------------------------------------------------------

import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import theme from "./theme"; // nosso tema customizado

ReactDOM.createRoot(document.getElementById("root")).render(
  
  // StrictMode ajuda a identificar efeitos colaterais e práticas inseguras durante o desenvolvimento
  // OBS: ele executa alguns trechos duas vezes *somente em dev*, o que é normal
  <React.StrictMode>
    <ChakraProvider theme={theme}>

      {/* 
        Garante que o modo de cor (claro/escuro) seja aplicado imediatamente,
        evitando "flash" de tema incorreto antes do carregamento da UI.
      */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

//----------------------------------------------------------
// Fim do arquivo frontend/src/main.jsx
//----------------------------------------------------------