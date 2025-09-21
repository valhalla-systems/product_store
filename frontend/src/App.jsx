import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { Suspense, lazy } from "react";

// Code splitting para melhor performance
const HomePage = lazy(() => import("./pages/HomePage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));

function App() {
  return (
    <Box minH="100vh">
      <Navbar />

      <Box as="main" p={4} mt="16">
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
          </Routes>
        </Suspense>
      </Box>

      <ScrollToTopButton />
    </Box>
  );
}

export default App;
