// ✅ ARQUIVO: frontend/src/hooks/useNumberInput.js
//----------------------------------------------------------
// Descrição: Hook personalizado para validação e formatação
// de campos de entrada numéricos, permitindo apenas números
// e um separador decimal (ponto ou vírgula).
//----------------------------------------------------------

import { useCallback } from 'react';

// Hook customizado para validação e manipulação de inputs numéricos
export const useNumberInput = () => {

  // Valida a entrada, mantendo apenas números e um separador decimal
  const validateNumberInput = useCallback((value) => {
    // Se o valor estiver vazio, retorna vazio
    if (value === '') return '';
    
    // Remove tudo que não é número, ponto ou vírgula (não permite - ou +)
    let cleaned = value.replace(/[^\d,.]/g, '');
    
    // Permite apenas um separador decimal
    const hasComma = cleaned.includes(',');
    const hasDot = cleaned.includes('.');
    
    if (hasComma && hasDot) {
      // Se houver ambos, mantém apenas o último digitado
      const lastComma = cleaned.lastIndexOf(',');
      const lastDot = cleaned.lastIndexOf('.');
      
      if (lastComma > lastDot) {
        cleaned = cleaned.replace(/\./g, '');
      } else {
        cleaned = cleaned.replace(/,/g, '');
      }
    }
    
    // Remove zeros à esquerda desnecessários (exceto "0," ou "0.")
    if (cleaned.startsWith('0') && cleaned.length > 1 && !cleaned.startsWith('0,') && !cleaned.startsWith('0.')) {
      cleaned = cleaned.substring(1);
      // Se após remover ficar vazio ou começar com separador, mantém o zero
      if (cleaned === '' || cleaned.startsWith(',') || cleaned.startsWith('.')) {
        cleaned = '0' + cleaned;
      }
    }
    
    // Se começar com vírgula ou ponto, adiciona zero antes
    if ((cleaned.startsWith(',') || cleaned.startsWith('.')) && cleaned.length > 0) {
      cleaned = '0' + cleaned;
    }
    
    // Para valores com separador decimal, limita casas decimais a 2
    const separator = cleaned.includes(',') ? ',' : '.';
    if (cleaned.includes(separator)) {
      const parts = cleaned.split(separator);
      if (parts.length === 2) {
        // Limita a 2 casas decimais
        parts[1] = parts[1].slice(0, 2);
        cleaned = parts[0] + separator + parts[1];
      }
    }
    
    return cleaned;
  }, []);

  // Handler para usar diretamente em inputs controlados
  const handleNumberChange = useCallback((e, setValue) => {
    const rawValue = e.target.value;
    const validatedValue = validateNumberInput(rawValue);
    setValue(validatedValue);
  }, [validateNumberInput]);

  return {
    validateNumberInput,
    handleNumberChange
  };
};

//----------------------------------------------------------
// Fim do arquivo: frontend/src/hooks/useNumberInput.js
//----------------------------------------------------------