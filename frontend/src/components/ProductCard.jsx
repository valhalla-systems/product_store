// ✅ ARQUIVO: frontend/src/components/ProductCard.jsx
// ----------------------------------------------------------
// Card de exibição e edição de produto com suporte completo
// a upload, compressão, preview e spinner de processamento.
// ----------------------------------------------------------

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useProductStore } from "../store/product";
import { useImageUploader } from "../hooks/useImageUploader";

/**
 * Card de produto com suporte a edição e exclusão.
 * Inclui preview, compressão e spinner de carregamento da imagem.
 */
const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  // Modais
  const { isOpen, onOpen, onClose } = useDisclosure(); // edição
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure(); // exclusão
  const {
    isOpen: isImageOpen,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure(); // imagem ampliada

  const cancelRef = useRef();
  const fileInputRef = useRef(null);

  // Hook de upload e compressão
  const {
    preview,
    setPreview,
    file,
    setFile,
    isImageLoading,
    isCompressing,
    handleImageChange,
  } = useImageUploader();

  // Sincroniza produto inicial
  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  // Detecta se houve alteração
  useEffect(() => {
    const hasChanges =
      updatedProduct.name !== product.name ||
      updatedProduct.price !== product.price ||
      (file && file !== product.image);

    setIsChanged(hasChanges);
  }, [updatedProduct, product, file]);

  // Excluir produto
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Sucesso ✅" : "Erro ❌",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  // Atualizar produto (com imagem e compressão)
  const handleUpdateProduct = async () => {
    if (!updatedProduct.name || !updatedProduct.price) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e preço antes de atualizar.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    const productToSend = {
      ...updatedProduct,
      price: parseFloat(updatedProduct.price),
      ...(file && { image: file }), // só envia se houver nova imagem
    };

    const { success, message } = await updateProduct(
      product._id,
      productToSend
    );

    toast({
      title: success ? "Sucesso ✅" : "Erro ❌",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      onClose();
      if (fileInputRef.current) fileInputRef.current.value = "";
      setPreview(null);
      setFile(null);
    }

    setIsLoading(false);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteProduct(product._id);
    onConfirmClose();
  };

  const handleOpenEdit = (e) => {
    e.currentTarget.blur();
    onOpen();
  };

  const handleOpenDelete = (e) => {
    e.currentTarget.blur();
    onConfirmOpen();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      {/* Imagem principal */}
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
        cursor="pointer"
        onClick={onOpenImage}
      />

      {/* Corpo */}
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </Text>

        <HStack spacing={2}>
          <Tooltip label="Editar produto" hasArrow closeOnClick>
            <IconButton
              icon={<EditIcon />}
              onClick={handleOpenEdit}
              colorScheme="blue"
            />
          </Tooltip>
          <Tooltip label="Excluir produto" hasArrow closeOnClick>
            <IconButton
              icon={<DeleteIcon />}
              onClick={handleOpenDelete}
              colorScheme="red"
            />
          </Tooltip>
        </HStack>
      </Box>

      {/* 🧱 Modal de edição */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setUpdatedProduct(product);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Nome"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />

              <Input
                placeholder="Preço"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />

              {/* Upload da imagem */}
              <Input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
              />

              {/* Preview com overlay de carregamento */}
              {(preview || product.image) && (
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
                  {(isImageLoading || isCompressing) && (
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
                        <Text color="white">
                          {isCompressing
                            ? "Comprimindo imagem..."
                            : "Carregando..."}
                        </Text>
                      </VStack>
                    </Box>
                  )}

                  <Image
                    src={preview || product.image}
                    alt="Pré-visualização"
                    maxH="200px"
                    objectFit="contain"
                    borderRadius="md"
                    shadow="sm"
                  />
                </Box>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdateProduct}
              isDisabled={!isChanged || isLoading || isCompressing}
              isLoading={isLoading || isCompressing}
              loadingText={isCompressing ? "Comprimindo..." : "Atualizando..."}
            >
              Atualizar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 🗑️ Diálogo de confirmação */}
      <AlertDialog
        isOpen={isConfirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={onConfirmClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar exclusão
            </AlertDialogHeader>
            <AlertDialogBody>
              Tem certeza que deseja excluir o produto{" "}
              <strong>{product.name}</strong>? Essa ação não poderá ser
              desfeita.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onConfirmClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Apagar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* 🔍 Modal de imagem ampliada */}
      <Modal isOpen={isImageOpen} onClose={onCloseImage} isCentered>
        <ModalOverlay />
        <ModalContent maxW="90vw" maxH="90vh" bg="transparent" boxShadow="none">
          <Image
            src={product.image}
            alt={product.name}
            objectFit="contain"
            maxH="90vh"
            maxW="90vw"
            cursor="pointer"
            onClick={onCloseImage}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
