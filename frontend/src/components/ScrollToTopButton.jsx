// ✅ ARQUIVO: frontend/src/components/ScrollToTopButton.jsx
//----------------------------------------------------------
// Descrição: Componente de botão para rolar a página para o topo
// Agora ele também se oculta automaticamente quando há algum modal aberto.
//----------------------------------------------------------

import { useEffect, useState } from "react";
import { IconButton, useColorMode, Fade } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { keyframes } from "@emotion/react";
import { useModal } from "../context/ModalContext";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const ScrollToTopButton = ({
  bottom = "30px",
  right = "30px",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { colorMode } = useColorMode();
  const { isAnyModalOpen } = useModal();

  // Exibe o botão apenas após o usuário rolar mais de 200px na tela
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Retorna suavemente ao topo
  };

  // O botão só é mostrado quando há rolagem suficiente e nenhum modal aberto
  const shouldShow = isVisible && !isAnyModalOpen;

  return (
    <Fade in={shouldShow}>
      <IconButton
        aria-label="Voltar ao topo"
        icon={<FaArrowUp />}
        position="fixed"
        bottom={bottom}
        right={right}
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

//----------------------------------------------------------
// Fim do arquivo frontend/src/components/ScrollToTopButton.jsx
//----------------------------------------------------------