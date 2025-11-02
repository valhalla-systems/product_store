// ✅ ARQUIVO: frontend/src/pages/CreatePage.jsx
//----------------------------------------------------------
// Descrição: Página para criar um novo produto
//----------------------------------------------------------

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
import { useNumberInput } from "../hooks/useNumberInput";

// Estado local para nome e preço do novo produto
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { createProduct } = useProductStore();
  const fileInputRef = useRef(null);

  // Hook customizado para upload, compressão e preview da imagem
  const {
    preview,
    setPreview,
    file,
    setFile,
    isImageLoading,
    isCompressing,
    handleImageChange,
  } = useImageUploader();

  // Hook customizado para validação de entrada numérica
  const { handleNumberChange } = useNumberInput();

  // Lida com alterações no campo preço usando validação
  const handlePriceChange = (e) => {
    handleNumberChange(e, (value) => {
      setNewProduct({ ...newProduct, price: value });
    });
  };

  // Cria o produto enviando para o store e exibe feedback
  const handleAddProduct = async () => {
    
    // Valida campos obrigatórios
    if (!newProduct.name.trim() || newProduct.price === "" || !file) {
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

    // Conversão segura de preço para número (suporta , e .)
    const priceValue = newProduct.price.includes(',') 
      ? parseFloat(newProduct.price.replace(',', '.'))
      : parseFloat(newProduct.price);

    const productToSend = {
      ...newProduct,
      price: priceValue,
      image: file, // arquivo selecionado pelo hook de upload
    };

    const { success, message } = await createProduct(productToSend);

    // Feedback visual usando Chakra Toast
    toast({
      title: success ? "Sucesso ✅" : "Erro ❌",
      description: success
        ? `O produto "${newProduct.name}" foi criado com sucesso!`
        : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    // Resetar campos se criação foi bem-sucedida
    if (success) {
      setNewProduct({ name: "", price: "" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setPreview(null);
      setFile(null);
    }

    setIsLoading(false);
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        
        {/* Título principal da página */}
        <Heading as="h1" size="2xl" textAlign="center">
          Criar Novo Produto
        </Heading>

        {/* Card do formulário */}
        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={5} align="stretch">
            
            {/* Campo: Nome do produto */}
            <FormControl isRequired>
              <Input
                id="name"
                name="name"
                placeholder="Nome do Produto"
                autoComplete="off"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </FormControl>

            {/* Campo: Preço do produto */}
            <FormControl isRequired>
              <Input
                id="price"
                name="price"
                placeholder="Preço (ex: 29.90 ou 29,90)"
                autoComplete="off"
                type="text" // ✅ Mudado para text para melhor controle
                inputMode="decimal" // ✅ Teclado numérico em dispositivos móveis
                value={newProduct.price}
                onChange={handlePriceChange} // ✅ Nova função de validação
              />
            </FormControl>

            {/* Campo: Upload de imagem do produto */}
            <FormControl isRequired>
              <Input
                id="image"
                name="image"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange} // Hook de upload e compressão
              />
            </FormControl>

            {/* Preview da imagem selecionada */}
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
              isLoading={isLoading || isCompressing} // Inclui estado de compressão
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

//----------------------------------------------------------
// Fim do arquivo frontend/src/pages/CreatePage.jsx
//----------------------------------------------------------
