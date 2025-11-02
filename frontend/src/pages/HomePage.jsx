// ✅ ARQUIVO: frontend/src/pages/HomePage.jsx
//----------------------------------------------------------
// Descrição: Componente da página inicial da aplicação
//----------------------------------------------------------

import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const HomePage = () => {
  
  // Obtém do Zustand as funções e estados globais relacionados a produtos
  const { fetchProducts, products, loading } = useProductStore();

  // Carrega os produtos assim que o componente for montado
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        
        {/* Título da página com gradiente de cor */}
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Produtos Disponíveis 🚀
        </Text>

        {/* Exibição condicional:
            - Se estiver carregando, mostra o componente Loader
            - Se houver produtos, exibe o grid
            - Caso contrário, exibe mensagem e link para criar novo produto
        */}
        {loading ? (
          <Loader message="Carregando produtos..." /> // Indicador de carregamento
        ) : products.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w={"full"}
          >
            {/* Renderiza cada produto como um card individual */}
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            Nenhum produto encontrado 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Criar um produto
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;

//----------------------------------------------------------
// Fim do arquivo frontend/src/pages/HomePage.jsx
//----------------------------------------------------------