// ✅ ARQUIVO: frontend/src/components/ProductCard.jsx
//----------------------------------------------------------
// Descrição: Componente de cartão de produto com funções
// completas de exibição, edição e exclusão, incluindo upload
// de nova imagem e adaptação responsiva de modais.
//----------------------------------------------------------

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
  useBreakpointValue,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useProductStore } from "../store/product";
import { useImageUploader } from "../hooks/useImageUploader";
import { useNumberInput } from "../hooks/useNumberInput";
import { useModal } from "../context/ModalContext";

const ProductCard = ({ product }) => {
  
  // Estado local contendo os dados editáveis do produto
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price.toString().replace(".", ","),
  });
  
  // Indica se houve alterações no formulário de edição
  const [isChanged, setIsChanged] = useState(false);

  // Indica se houve alterações no formulário de edição
  const [isLoading, setIsLoading] = useState(false);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  // Detecta tamanho de tela para comportamento responsivo dos modais
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Acesso ao contexto global de modais (controla bloqueio de scroll)
  const { setIsAnyModalOpen } = useModal();

  // Estados de controle dos modais
  const { isOpen, onOpen, onClose } = useDisclosure(); // modal de edição
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure(); // diálogo de confirmação de exclusão
  const {
    isOpen: isImageOpen,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure(); // modal de imagem ampliada

  const cancelRef = useRef();
  const fileInputRef = useRef(null);

  // Hook personalizado para upload e compressão de imagens
  const {
    preview,
    setPreview,
    file,
    setFile,
    isImageLoading,
    isCompressing,
    handleImageChange,
  } = useImageUploader();
  
  // Hook para validação numérica de preços
  const { handleNumberChange } = useNumberInput();

  // --------------------------------------------------------
  // Abertura e fechamento dos modais (edição, imagem e exclusão)
  // --------------------------------------------------------
  const handleOpenEdit = (e) => {
    e.currentTarget.blur();
    setIsAnyModalOpen(true);
    onOpen();
  };

  const handleCloseEditModal = () => {
    setUpdatedProduct({
      name: product.name,
      price: product.price.toString().replace(".", ","),
    });
    setPreview(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsAnyModalOpen(false);
    onClose();
  };

  const handleOpenDelete = (e) => {
    e.currentTarget.blur();
    setIsAnyModalOpen(true);
    onConfirmOpen();
  };

  const handleCloseDeleteModal = () => {
    setIsAnyModalOpen(false);
    onConfirmClose();
  };

  const handleOpenImageModal = () => {
    setIsAnyModalOpen(true);
    onOpenImage();
  };

  const handleCloseImageModal = () => {
    setIsAnyModalOpen(false);
    onCloseImage();
  };

  // Atualiza o valor do preço, mantendo formato decimal local
  const handlePriceChange = (e) => {
    handleNumberChange(e, (value) => {
      setUpdatedProduct({ ...updatedProduct, price: value });
    });
  };

  // --------------------------------------------------------
  // Sincronizações e detecção de mudanças
  // --------------------------------------------------------

  // Quando o produto recebido via props muda, sincroniza os campos
  useEffect(() => {
    setUpdatedProduct({
      name: product.name,
      price: product.price.toString().replace(".", ","),
    });
  }, [product]);

  // Ao abrir o modal, reseta estados e campos
  useEffect(() => {
    if (isOpen) {
      setUpdatedProduct({
        name: product.name,
        price: product.price.toString().replace(".", ","),
      });
      setPreview(null);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [isOpen, product]);

  // Verifica se houve modificações no nome, preço ou imagem
  useEffect(() => {
    const currentPrice = updatedProduct.price.includes(",")
      ? parseFloat(updatedProduct.price.replace(",", "."))
      : parseFloat(updatedProduct.price);

    const priceChanged = currentPrice !== product.price;
    const nameChanged = updatedProduct.name !== product.name;
    const imageChanged = file !== null && file !== undefined;

    const hasChanges = priceChanged || nameChanged || imageChanged;
    setIsChanged(hasChanges);
  }, [updatedProduct, product, file]);

  // --------------------------------------------------------
  // Ações: atualizar e excluir produto
  // --------------------------------------------------------

  // Exclui o produto e exibe feedback
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

  // Atualiza produto no backend e trata feedback de sucesso/erro
  const handleUpdateProduct = async () => {
    if (
      !updatedProduct.name.trim() ||
      updatedProduct.price === "" ||
      updatedProduct.price === undefined
    ) {
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

    const priceValue = updatedProduct.price.includes(",")
      ? parseFloat(updatedProduct.price.replace(",", "."))
      : parseFloat(updatedProduct.price);

    const productToSend = {
      ...updatedProduct,
      price: priceValue,
      ...(file && { image: file }), // adiciona imagem apenas se houver nova
    };

    const { success, message } = await updateProduct(product._id, productToSend);

    toast({
      title: success ? "Sucesso ✅" : "Erro ❌",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      setUpdatedProduct({
        name: updatedProduct.name,
        price: updatedProduct.price,
      });
      handleCloseEditModal();
    }

    setIsLoading(false);
  };

  // Confirmação final antes de excluir definitivamente o produto
  const handleConfirmDelete = async () => {
    await handleDeleteProduct(product._id);
    handleCloseDeleteModal();
  };

  // --------------------------------------------------------
  // Renderização do componente
  // --------------------------------------------------------
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
        cursor="pointer"
        onClick={handleOpenImageModal}
      />

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

        {/* Botões de ação com tooltip */}
        <HStack spacing={2}>
          <Tooltip label="Editar produto" hasArrow>
            <IconButton icon={<EditIcon />} onClick={handleOpenEdit} colorScheme="blue" />
          </Tooltip>
          <Tooltip label="Excluir produto" hasArrow>
            <IconButton icon={<DeleteIcon />} onClick={handleOpenDelete} colorScheme="red" />
          </Tooltip>
        </HStack>
      </Box>

      {/* Modal de edição do produto */}
      <Modal
        isOpen={isOpen}
        onClose={handleCloseEditModal}
        size={isMobile ? "full" : "md"}
        scrollBehavior="inside"
        blockScrollOnMount={false}
        motionPreset="slideInBottom"
        isCentered={!isMobile}
      >
        <ModalOverlay />
        <ModalContent
          margin={isMobile ? "0" : "4"}
          borderRadius={isMobile ? "0" : "md"}
          height={isMobile ? "100dvh" : "auto"}
          maxHeight={isMobile ? "100dvh" : "auto"}
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <ModalHeader>Atualizar Produto</ModalHeader>
          <ModalCloseButton />

          {/* Corpo do modal com campos editáveis */}
          <ModalBody flex="1" overflowY="auto" overscrollBehavior="contain" pb={isMobile ? "140px" : "20px"}>
            <VStack spacing={4} align="stretch">
              
              {/* Nome do produto */}
              <Input
                id="name"
                name="name"
                placeholder="Nome"
                autoComplete="off"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                size={isMobile ? "lg" : "md"}
                fontSize="16px"
              />

              {/* Preço com formatação local */}
              <Input
                id="price"
                name="price"
                placeholder="Preço (ex: 29,90)"
                autoComplete="off"
                type="text"
                inputMode="decimal"
                value={updatedProduct.price}
                onChange={handlePriceChange}
                size={isMobile ? "lg" : "md"}
                fontSize="16px"
              />

              {/* Upload de imagem */}
              <Input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
              />

              {/* Pré-visualização da imagem (nova ou atual) */}
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
                          {isCompressing ? "Comprimindo imagem..." : "Carregando..."}
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

          {/* Footer sempre visível, inclusive em mobile */}
          <Divider />
          <ModalFooter
            position={"sticky"}
            bottom={0}
            bg={useColorModeValue("white", "gray.800")}
            borderTopWidth="1px"
            py={4}
            zIndex={1}
          >
            <Flex w="full" justify="space-between" gap={2}>
              <Button
                w={isMobile ? "50%" : "auto"}
                colorScheme="blue"
                onClick={handleUpdateProduct}
                isDisabled={!isChanged || isLoading || isCompressing}
                isLoading={isLoading || isCompressing}
                loadingText={isCompressing ? "Comprimindo..." : "Atualizando..."}
              >
                Atualizar
              </Button>
              <Button
                w={isMobile ? "50%" : "auto"}
                variant="ghost"
                onClick={handleCloseEditModal}
              >
                Cancelar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de confirmação para exclusão */}
      <AlertDialog
        isOpen={isConfirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCloseDeleteModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar exclusão
            </AlertDialogHeader>
            <AlertDialogBody>
              Tem certeza que deseja excluir o produto{" "}
              <strong>{product.name}</strong>? Essa ação não poderá ser desfeita.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCloseDeleteModal}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Apagar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Modal de visualização ampliada da imagem */}
      <Modal
        isOpen={isImageOpen}
        onClose={handleCloseImageModal}
        scrollBehavior="inside"
        preserveScrollBarGap
        motionPreset="scale"
        isCentered
        portalProps={{ appendToParentPortal: true }}
      >
        <ModalOverlay />
        <ModalContent 
          maxW="90vw" 
          maxH="90vh" 
          bg="transparent" 
          boxShadow="none"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={product.image}
            alt={product.name}
            objectFit="contain"
            maxH="90vh"
            maxW="90vw"
            cursor="pointer"
            onClick={handleCloseImageModal}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;

//----------------------------------------------------------
// Fim do arquivo frontend/src/components/ProductCard.jsx
//----------------------------------------------------------