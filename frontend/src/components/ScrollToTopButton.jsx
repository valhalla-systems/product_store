import { useEffect, useState } from "react";
import { IconButton, useColorMode, Fade } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { keyframes } from "@emotion/react";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const ScrollToTopButton = ({
  bottom = "30px", // 🆕 Nova prop: controla a distância do botão até o rodapé
  right = "30px", // 🆕 Nova prop: controla a distância lateral
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fade in={isVisible}>
      <IconButton
        aria-label="Voltar ao topo"
        icon={<FaArrowUp />}
        position="fixed"
        bottom={bottom} // 🆕 Agora o valor é dinâmico via props
        right={right} // 🆕 Também ajustável via props
        borderRadius="full"
        size="lg"
        colorScheme="brand"
        bg={colorMode === "light" ? "brand.light" : "brand.dark"}
        _hover={{
          bg: colorMode === "light" ? "blue.600" : "teal.400",
        }}
        onClick={scrollToTop}
        shadow="md"
        zIndex="2000"
        animation={`${bounce} 2s infinite`}
      />
    </Fade>
  );
};

export default ScrollToTopButton;
