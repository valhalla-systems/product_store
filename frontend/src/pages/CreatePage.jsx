import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    setIsLoading(true);

    const { success, message } = await createProduct(newProduct);

    toast({
      title: success ? "Sucesso ✅" : "Erro ❌",
      description: success
        ? `O produto "${newProduct.name}" foi criado com sucesso!`
        : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
    }

    setIsLoading(false);
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Criar Novo Produto
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Nome do Produto"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Preço"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="URL da Imagem"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button
              colorScheme="blue"
              onClick={handleAddProduct}
              w="full"
              isLoading={isLoading}
              loadingText="Adicionando..."
              isDisabled={
                !newProduct.name ||
                !newProduct.price ||
                !newProduct.image ||
                isLoading
              }
            >
              Adicionar Produto
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
