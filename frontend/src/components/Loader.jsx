// ✅ ARQUIVO: frontend/src/components/Loader.jsx
//----------------------------------------------------------
// Descrição: Componente de carregamento (loader) reutilizável
// Exibe um spinner centralizado na tela.
// - `size` e `color` podem ser personalizados.
// - `message` é opcional e aparece abaixo do spinner.
//----------------------------------------------------------

import { Flex, Spinner } from "@chakra-ui/react";

const Loader = ({ size = "80px", color = "blue.500", message }) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      w="full"
      py={20}
      gap={4}
    >
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color={color}
        boxSize={size}
      />
      {message && (
        <span style={{ fontSize: "18px", color: "#555", fontWeight: "500" }}>
          {message}
        </span>
      )}
    </Flex>
  );
};

export default Loader;

//----------------------------------------------------------
// Fim do arquivo frontend/src/components/Loader.jsx
//----------------------------------------------------------