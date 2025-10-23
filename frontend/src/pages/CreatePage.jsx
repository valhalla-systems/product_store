// ✅ ARQUIVO: frontend/src/pages/CreatePage.jsx
// ----------------------------------------------------------
// Página de criação de produtos com hook useImageUploader
// ----------------------------------------------------------

import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  useColorModeValue,
  useToast,
  VStack,
  Spinner,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useProductStore } from "../store/product";
import { useImageUploader } from "../hooks/useImageUploader";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { createProduct } = useProductStore();
  const fileInputRef = useRef(null);

  // 🪝 Hook customizado para upload e compressão
  const {
    preview,
    setPreview,
    file,
    setFile,
    isImageLoading,
    isCompressing,
    handleImageChange,
  } = useImageUploader();

  const handleAddProduct = async () => {
    if (!newProduct.name.trim() || !newProduct.price || !file) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, preço e selecione uma imagem.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    // 🔧 Conversão segura de preço para número
    const productToSend = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      image: file,
    };

    const { success, message } = await createProduct(productToSend);

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
      setNewProduct({ name: "", price: "" });

      // Reset do input e do hook
      if (fileInputRef.current) fileInputRef.current.value = "";
      setPreview(null);
      setFile(null);
    }

    setIsLoading(false);
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Criar Novo Produto
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={5} align="stretch">
            {/* Nome */}
            <FormControl isRequired>
              {/*<FormLabel htmlFor="name">Nome do Produto</FormLabel>*/}
              <Input
                id="name"
                name="name"
                placeholder="Nome do Produto"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </FormControl>

            {/* Preço */}
            <FormControl isRequired>
              {/*<FormLabel htmlFor="price">Preço</FormLabel>*/}
              <Input
                id="price"
                name="price"
                placeholder="Preço"
                type="number"
                min="0"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </FormControl>

            {/* Upload */}
            <FormControl isRequired>
              {/*<FormLabel htmlFor="image">Imagem do Produto</FormLabel>*/}
              <Input
                id="image"
                name="image"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>

            {/* Preview */}
            {preview && (
              <Box
                position="relative"
                w="full"
                h="200px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="md"
                overflow="hidden"
              >
                {isImageLoading && (
                  <Box
                    position="absolute"
                    inset="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(0,0,0,0.3)"
                    zIndex="1"
                  >
                    <VStack spacing={2}>
                      <Spinner size="xl" color="white" />
                      <Text color="white">Carregando imagem...</Text>
                    </VStack>
                  </Box>
                )}

                <Image
                  src={preview}
                  alt="Pré-visualização"
                  maxH="200px"
                  objectFit="contain"
                  borderRadius="md"
                  shadow="sm"
                  onLoad={() => {}}
                />
              </Box>
            )}

            {/* Botão de envio */}
            <Button
              colorScheme="blue"
              onClick={handleAddProduct}
              w="full"
              isLoading={isLoading || isCompressing}
              loadingText={isCompressing ? "Comprimindo..." : "Adicionando..."}
              isDisabled={
                !newProduct.name || !newProduct.price || !file || isCompressing
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
