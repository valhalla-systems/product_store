import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));

function App() {
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
      pb="70px" // 🆕 Espaço extra para que o conteúdo não fique sob o footer
    >
      <Navbar />

      <Box as="main" p={4} mt="16">
        <Suspense fallback={<Loader message="Carregando página..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
          </Routes>
        </Suspense>
      </Box>

      {/* 🆕 Passamos a prop "bottom" para manter o botão acima do footer */}
      <ScrollToTopButton bottom="90px" />

      <Footer />
    </Box>
  );
}

export default App;
