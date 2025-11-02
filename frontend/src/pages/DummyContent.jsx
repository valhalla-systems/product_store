// ✅ ARQUIVO: frontend/src/pages/DummyContent.jsx
//----------------------------------------------------------
// Descrição: Componente de conteúdo fictício para teste de rolagem
// Útil para testar o botão ScrollToTop ou layouts mais longos.
//----------------------------------------------------------

import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";

export default function DummyContent() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <VStack spacing={6} p={8}>
      {Array.from({ length: 30 }).map((_, index) => (
        <Box
          key={index}
          p={6}
          bg={bg}
          borderRadius="lg"
          boxShadow="md"
          w="100%"
        >
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            Bloco de conteúdo {index + 1}
          </Text>
          <Text color={textColor}>
            Este é apenas um conteúdo de teste para preencher a página e
            permitir que possamos rolar a tela. Assim conseguimos verificar se o
            botão de voltar ao topo aparece e funciona corretamente.
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

//----------------------------------------------------------
// Fim do arquivo frontend/src/pages/DummyContent.jsx
//----------------------------------------------------------