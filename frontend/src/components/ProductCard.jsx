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
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useEffect, useRef, useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isChanged, setIsChanged] = useState(false);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure(); // modal edição
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure(); // confirmação exclusão
  const {
    isOpen: isImageOpen,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure(); // imagem ampliada

  const cancelRef = useRef();

  // Sempre que o produto mudar (store atualizada), sincroniza estado local
  useEffect(() => {
    setUpdatedProduct(product);
    setIsChanged(false);
  }, [product]);

  // Verifica se houve alterações em relação ao produto original
  useEffect(() => {
    const hasChanges =
      updatedProduct.name !== product.name ||
      updatedProduct.price !== product.price ||
      updatedProduct.image !== product.image;

    setIsChanged(hasChanges);
  }, [updatedProduct, product]);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Sucesso" : "Erro",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const toastId = "update-product-toast";

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    if (success) {
      onClose();
    }

    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: success ? "Sucesso" : "Erro",
        description: message,
        status: success ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleConfirmDelete = async () => {
    await handleDeleteProduct(product._id);
    onConfirmClose();
  };

  // Força perda de foco para evitar tooltip "presa"
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
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
        cursor="pointer"
        onClick={onOpenImage}
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

      {/* Modal para edição */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setUpdatedProduct(product);
          setIsChanged(false);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
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
              <Input
                placeholder="URL da Imagem"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              isDisabled={!isChanged}
            >
              Atualizar
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setUpdatedProduct(product);
                setIsChanged(false);
                onClose();
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Dialogo de confirmação para deletar */}
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

      {/* Modal da imagem ampliada */}
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
