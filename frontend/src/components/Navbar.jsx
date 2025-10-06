import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaHome,
  FaPlus,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      bg={bgColor}
      px={4}
      shadow="sm"
      position="fixed"
      top="0"
      w="100%"
      zIndex="1000"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Marca / título */}
        <HStack spacing={2} alignItems="center">
          <FaShoppingCart
            color={colorMode === "light" ? "#3182CE" : "#38B2AC"}
          />
          <Text
            fontWeight="bold"
            fontSize="lg"
            color={colorMode === "light" ? "brand.light" : "brand.dark"}
          >
            Loja de Produtos
          </Text>
        </HStack>

        {/* Menu desktop */}
        <HStack
          spacing={6}
          alignItems="center"
          display={{ base: "none", md: "flex" }}
        >
          <Link
            as={RouterLink}
            to="/"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <FaHome /> Home
          </Link>
          <Link
            as={RouterLink}
            to="/create"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <FaPlus /> Criar Produto
          </Link>
          <IconButton
            aria-label="Alternar tema"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
            color={colorMode === "light" ? "brand.light" : "brand.dark"}
          />
        </HStack>

        {/* Menu mobile (hambúrguer) */}
        <Box display={{ base: "block", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Menu"
              icon={<FaBars />}
              variant="outline"
              color={colorMode === "light" ? "brand.light" : "brand.dark"}
            />
            <MenuList>
              <MenuItem as={RouterLink} to="/" icon={<FaHome />}>
                Home
              </MenuItem>
              <MenuItem as={RouterLink} to="/create" icon={<FaPlus />}>
                Criar Produto
              </MenuItem>
              <MenuItem
                icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
              >
                Alternar Tema
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
