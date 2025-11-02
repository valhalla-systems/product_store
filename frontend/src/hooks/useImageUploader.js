// ✅ ARQUIVO: frontend/src/hooks/useImageUploader.js
//----------------------------------------------------------
// Descrição: Hook personalizado para upload de imagens com compressão,
// preview, feedback de progresso e tratamento de erros.
// Utiliza a biblioteca 'browser-image-compression' para compressão.
//----------------------------------------------------------

import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import imageCompression from "browser-image-compression";

export const useImageUploader = (customOptions = {}) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0); // progresso combinado (compressão + upload)

  const toast = useToast();

  // Remove automaticamente URLs temporárias quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Configuração padrão de compressão (pode ser sobrescrita via parâmetro)
  const defaultOptions = {
    maxSizeMB: 2.5, // Tamanho final máximo (ajustável)
    maxWidthOrHeight: 2560, // Mantém boa resolução em fotos grandes
    useWebWorker: true, // Evita travamento da interface durante a compressão
    initialQuality: 0.9, // Alta qualidade inicial
    onProgress: (p) => setProgress(p * 0.8), // compressão = 0–80%
    fileType: "image/jpeg",
  };

  // Seleciona, comprime e gera o preview da imagem
  const handleImageChange = async (e) => {
    const inputFile = e.target.files?.[0];
    if (!inputFile) {
      setPreview(null);
      setFile(null);
      return;
    }

    const MAX_SIZE_MB = 50;
    if (inputFile.size > MAX_SIZE_MB * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: `Por favor, selecione uma imagem de até ${MAX_SIZE_MB} MB.`,
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsImageLoading(true);
      setIsCompressing(true);
      setProgress(0);

      // Preview rápido da imagem original
      const tempUrl = URL.createObjectURL(inputFile);
      setPreview(tempUrl);
      setFile(inputFile);

      // Aguarda o próximo frame para suavizar a transição
      await new Promise((resolve) => requestAnimationFrame(resolve));

      // Realiza a compressão da imagem
      const options = { ...defaultOptions, ...customOptions };
      const compressedFile = await imageCompression(inputFile, options);

      // Atualiza preview e arquivo com a versão comprimida
      const compressedUrl = URL.createObjectURL(compressedFile);
      setPreview(compressedUrl);
      setFile(compressedFile);

      toast({
        title: "Imagem processada com sucesso",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      toast({
        title: "Erro ao processar imagem",
        description: "Verifique o formato e tente novamente.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setPreview(null);
      setFile(null);
    } finally {
      setIsCompressing(false);
      setIsImageLoading(false);
    }
  };

  // Realiza upload manual com barra de progresso (opcional)
  const uploadImage = async (url, formData) => {
    try {
      setIsUploading(true);
      setProgress(80); // compressão concluída, upload inicia a partir de 80%

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      return await new Promise((resolve, reject) => {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const uploadProgress = 80 + (event.loaded / event.total) * 20; // upload = 80–100%
            setProgress(uploadProgress);
          }
        };

        xhr.onload = () => {
          setIsUploading(false);
          setProgress(100);
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Erro ${xhr.status}: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => {
          setIsUploading(false);
          reject(new Error("Erro na requisição de upload."));
        };

        xhr.send(formData);
      });
    } catch (error) {
      console.error("Erro no upload:", error);
      toast({
        title: "Erro no upload",
        description: "Falha ao enviar a imagem. Tente novamente.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      throw error;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  // Redefine todo o estado do uploader
  const resetUploader = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    setProgress(0);
    setIsImageLoading(false);
    setIsCompressing(false);
    setIsUploading(false);
  };

  return {
    preview,
    setPreview,
    file,
    setFile,
    isImageLoading,
    isCompressing,
    isUploading,
    progress,
    handleImageChange,
    uploadImage,
    resetUploader,
  };
};

//----------------------------------------------------------
// Fim do arquivo useImageUploader.js
//----------------------------------------------------------