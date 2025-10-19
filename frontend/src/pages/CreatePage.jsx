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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useProductStore } from "../store/product";

/**
 * Página de criação de novos produtos.
 * Agora com pré-visualização da imagem e limpeza completa após o envio.
 */
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [preview, setPreview] = useState(null); // 🖼️ Estado para exibir a imagem
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { createProduct } = useProductStore();

  const fileInputRef = useRef(null);

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
      // 🧹 Limpa os campos e o preview após o envio
      setNewProduct({ name: "", price: "", image: "" });
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }

    setIsLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Cria um preview temporário com URL local
      setPreview(URL.createObjectURL(file));
      setNewProduct({ ...newProduct, image: file });
    } else {
      setPreview(null);
      setNewProduct({ ...newProduct, image: "" });
    }
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
            {/* Campo: Nome do produto */}
            <Input
              placeholder="Nome do Produto"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            {/* Campo: Preço */}
            <Input
              placeholder="Preço"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            {/* Campo: Upload da Imagem */}
            <Input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
            />

            {/* 🖼️ Pré-visualização da Imagem */}
            {preview && (
              <Image
                src={preview}
                alt="Pré-visualização"
                maxH="200px"
                borderRadius="md"
                objectFit="cover"
                shadow="sm"
              />
            )}

            {/* Botão de envio */}
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
