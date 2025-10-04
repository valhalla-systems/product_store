import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import theme from "./theme"; // nosso tema customizado

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* Script que aplica o tema salvo (claro ou escuro) logo no início */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
