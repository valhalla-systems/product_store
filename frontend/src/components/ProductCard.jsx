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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const cancelRef = useRef();

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

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    toast({
      title: success ? "Sucesso" : "Erro",
      description: success ? "Produto atualizado com sucesso!" : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleConfirmDelete = async () => {
    await handleDeleteProduct(product._id);
    onConfirmClose();
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
          {/* Botão editar com tooltip */}
          <Tooltip label="Editar produto" hasArrow placement="top">
            <IconButton
              aria-label="Editar produto"
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="green" // ✅ Verde para editar
              variant="solid"
              tabIndex={-1}
            />
          </Tooltip>

          {/* Botão excluir com tooltip */}
          <Tooltip label="Excluir produto" hasArrow placement="top">
            <IconButton
              aria-label="Excluir produto"
              icon={<DeleteIcon />}
              onClick={onConfirmOpen}
              colorScheme="red" // ✅ Vermelho para excluir
              variant="solid"
              tabIndex={-1}
            />
          </Tooltip>
        </HStack>
      </Box>

      {/* Modal para edição */}
      <Modal isOpen={isOpen} onClose={onClose}>
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
              colorScheme="green" // ✅ verde para ação positiva
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              isDisabled={!isChanged}
            >
              Atualizar
            </Button>
            <Button variant="ghost" onClick={onClose}>
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
    </Box>
  );
};

export default ProductCard;
