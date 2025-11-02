// ✅ ARQUIVO: frontend/src/App.jsx
//----------------------------------------------------------
// Descrição: Componente principal da aplicação React
//----------------------------------------------------------

import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import { ModalProvider } from "./context/ModalContext";

// Code splitting: carrega páginas sob demanda (melhora performance inicial)
const HomePage = lazy(() => import("./pages/HomePage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));

function App() {
  return (

    // Provider global de modais: mantém estado centralizado de qualquer modal aberto
    <ModalProvider>
      <Box
        minH="100vh"
        bg={useColorModeValue("gray.50", "gray.800")}
        pb="70px"
      >
        <Navbar />

        {/* Área principal da aplicação */}
        <Box as="main" p={4} mt="16">
          
          {/* Suspense aguarda carregamento das páginas lazy e exibe Loader */}
          <Suspense fallback={<Loader message="Carregando página..." />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
            </Routes>
          </Suspense>
        </Box>

        {/* Botão flutuante para voltar ao topo, ajustável via prop "bottom" */}
        <ScrollToTopButton bottom="90px" />

        <Footer />
      </Box>
    </ModalProvider>
  );
}

export default App;

//----------------------------------------------------------
// Fim do arquivo frontend/src/App.jsx
//----------------------------------------------------------
