// ✅ ARQUIVO: frontend/src/context/ModalContext.jsx
//----------------------------------------------------------
// Descrição: Contexto para gerenciamento de modais
//----------------------------------------------------------

import { createContext, useContext, useState } from 'react';

// Contexto para gerenciar estado global de modais na aplicação
const ModalContext = createContext();

// Provider que envolve a aplicação e fornece estado de modais
export const ModalProvider = ({ children }) => {

  // Estado que indica se algum modal está aberto
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isAnyModalOpen, setIsAnyModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook customizado para acessar o estado de modais
export const useModal = () => {
  const context = useContext(ModalContext);
  
  // Garante que o hook seja usado apenas dentro do ModalProvider
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

//----------------------------------------------------------
// Fim do arquivo ModalContext.jsx
//----------------------------------------------------------