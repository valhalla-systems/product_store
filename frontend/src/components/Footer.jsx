// ✅ ARQUIVO: frontend/src/components/Footer.jsx
//----------------------------------------------------------
// Descrição: Componente de rodapé fixo da aplicação
// com links institucionais e ícones
//----------------------------------------------------------

import { Box, Text, Link, useColorModeValue, HStack, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { GiVikingHelmet } from "react-icons/gi";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual dinamicamente

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box
      as="footer"
      bg={bgColor}
      color={textColor}
      py={4}
      px={6}
      textAlign="center"
      position="fixed"
      bottom="0"
      w="100%"
      zIndex="1000"
      shadow="sm"
    >
      <VStack spacing={2}>
        <HStack justify="center" spacing={1}>
          <Text fontSize="sm">© {currentYear} Vagner Njord ·</Text>
          <Link
            href="https://github.com/valhalla-systems"
            isExternal
            fontWeight="bold"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <FaGithub /> GitHub
          </Link>
        </HStack>

        <Link
          href="https://valhallasystems.site"
          isExternal
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <GiVikingHelmet /> Valhalla Systems
        </Link>
      </VStack>
    </Box>
  );
};

export default Footer;

//----------------------------------------------------------
// Fim do arquivo Footer.jsx
//----------------------------------------------------------