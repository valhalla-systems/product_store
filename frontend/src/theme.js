import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

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
  components: {
    Button: {
      variants: {
        solid: (props) => {
          const { colorScheme, colorMode } = props;

          // 👉 Se o dev definiu um colorScheme (green, red, etc.), não sobrescreve
          if (colorScheme && !["brand"].includes(colorScheme)) {
            return {};
          }

          // 👉 Padrão: usa brand
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
