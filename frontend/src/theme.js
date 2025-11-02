// ✅ ARQUIVO: frontend/src/theme.js
//----------------------------------------------------------
// Descrição: Tema personalizado para a aplicação usando Chakra UI
//----------------------------------------------------------

import { extendTheme } from "@chakra-ui/react";

// Configurações iniciais do tema
const config = {
  initialColorMode: "light", // Define o tema padrão como claro
  useSystemColorMode: false, // Ignora o tema do sistema operacional
};

// Estilos globais aplicados ao body da aplicação
const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === "light" ? "gray.50" : "gray.800",
      color: props.colorMode === "light" ? "gray.800" : "gray.100",
      fontFamily: "Inter, system-ui, sans-serif",
      lineHeight: "1.6",
    },
  }),
};

// Paleta personalizada da marca
const colors = {
  brand: {
    light: "#3182CE", // azul no modo claro
    dark: "#38B2AC", // teal no modo escuro
  },
};

const theme = extendTheme({
  config,
  styles,
  colors,

  // Personalização de componentes padrão do Chakra
  components: {

    // Override no estilo do botão
    Button: {
      variants: {
        solid: (props) => {
          const { colorScheme, colorMode } = props;

          // Só aplica o estilo custom quando colorScheme="brand"
          if (colorScheme && !["brand"].includes(colorScheme)) {
            return {};
          }
          return {
            bg: colorMode === "light" ? "brand.light" : "brand.dark",
            color: "white",
            _hover: {
              bg: colorMode === "light" ? "blue.600" : "teal.400",
            },
          };
        },
      },
    },

    // Override nos links
    Link: {
      baseStyle: (props) => ({
        color: props.colorMode === "light" ? "brand.light" : "brand.dark",
        fontWeight: "medium",
        _hover: {
          textDecoration: "underline",
        },
      }),
    },
  },
});

export default theme;

//----------------------------------------------------------
// Fim do arquivo frontend/src/theme.js
//----------------------------------------------------------